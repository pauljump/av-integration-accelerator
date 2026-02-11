import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { webhookUrl, order } = await request.json();

    if (!webhookUrl || !order) {
      return NextResponse.json(
        { error: "Missing webhookUrl or order in request body" },
        { status: 400 }
      );
    }

    // Validate URL format
    let url: URL;
    try {
      url = new URL(webhookUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid webhook URL format" },
        { status: 400 }
      );
    }

    // Block obviously unsafe URLs
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return NextResponse.json(
        { error: "Only HTTP and HTTPS URLs are supported" },
        { status: 400 }
      );
    }

    // Proxy the request to the integrator's endpoint
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "AV-Integration-Toolkit/1.0",
        },
        body: JSON.stringify(order),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const responseText = await response.text();

      // Try to parse as JSON
      let body: unknown;
      try {
        body = JSON.parse(responseText);
      } catch {
        body = responseText;
      }

      return NextResponse.json({
        status: response.status,
        statusText: response.statusText,
        body,
      });
    } catch (fetchError) {
      clearTimeout(timeout);

      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json({
          error: "Request timed out after 15 seconds",
          status: null,
          body: null,
        });
      }

      return NextResponse.json({
        error: `Failed to reach endpoint: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`,
        status: null,
        body: null,
      });
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: `Server error: ${err instanceof Error ? err.message : String(err)}`,
      },
      { status: 500 }
    );
  }
}
