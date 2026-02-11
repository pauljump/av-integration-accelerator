/**
 * Code snippets for POS integrators in 4 languages.
 * Each language has 3 blocks: Parse, Display, Edge Cases.
 */

export type Language = "node" | "python" | "java" | "csharp";

export interface CodeBlock {
  title: string;
  description: string;
  code: string;
}

export interface LanguageSnippets {
  label: string;
  blocks: CodeBlock[];
}

export const codeSnippets: Record<Language, LanguageSnippets> = {
  node: {
    label: "Node.js",
    blocks: [
      {
        title: "Parse AV Fields",
        description:
          "Extract autonomous vehicle fields from the incoming order webhook payload.",
        code: `// Extract AV fields from an incoming order webhook
function extractAVFields(order) {
  const results = [];

  for (const delivery of order.deliveries) {
    const { vehicle } = delivery;

    results.push({
      deliveryId: delivery.id,
      isAutonomous: vehicle.is_autonomous,
      passcode: vehicle.passcode || null,
      handoffInstructions: vehicle.handoff_instructions || null,
    });
  }

  return results;
}

// Usage with Express webhook handler
app.post('/webhook/orders', (req, res) => {
  const order = req.body;
  const avFields = extractAVFields(order);

  for (const field of avFields) {
    if (field.isAutonomous) {
      console.log(\`AV Delivery \${field.deliveryId}\`);
      console.log(\`  Passcode: \${field.passcode}\`);
      console.log(\`  Instructions: \${field.handoffInstructions}\`);
    }
  }

  res.json({ received: true, avFields });
});`,
      },
      {
        title: "Display on KDS",
        description:
          "Show the passcode and handoff instructions prominently on the Kitchen Display System.",
        code: `// Render AV delivery info for Kitchen Display System
function renderKDSDisplay(delivery) {
  const { vehicle } = delivery;

  if (!vehicle.is_autonomous) {
    return {
      type: 'STANDARD',
      driverName: delivery.first_name,
      vehicle: \`\${vehicle.color} \${vehicle.make} \${vehicle.model}\`,
      licensePlate: vehicle.license_plate,
    };
  }

  // AV delivery - passcode is critical
  return {
    type: 'AUTONOMOUS',
    alert: 'ROBOT DELIVERY',
    passcode: vehicle.passcode,
    passcodeDisplay: \`Enter code: \${vehicle.passcode}\`,
    handoffInstructions: vehicle.handoff_instructions,
    vehicleInfo: \`\${vehicle.color} \${vehicle.make} \${vehicle.model}\`,
  };
}

// Example: highlight AV orders differently
function isHighPriority(delivery) {
  return delivery.vehicle.is_autonomous
    && delivery.current_state === 'ARRIVED_AT_PICKUP';
}`,
      },
      {
        title: "Edge Cases",
        description:
          "Handle missing fields, multiple deliveries, and CREATED state orders.",
        code: `// Handle missing passcode gracefully
function getPasscode(vehicle) {
  if (vehicle.is_autonomous && !vehicle.passcode) {
    console.warn('AV delivery missing passcode!');
    return 'PENDING'; // Display "pending" on KDS
  }
  return vehicle.passcode;
}

// Handle mixed deliveries (human + AV in same order)
function processOrderDeliveries(order) {
  const avDeliveries = order.deliveries
    .filter(d => d.vehicle.is_autonomous);
  const humanDeliveries = order.deliveries
    .filter(d => !d.vehicle.is_autonomous);

  return { avDeliveries, humanDeliveries };
}

// Handle CREATED state (AV not yet assigned)
function handleOrderUpdate(order) {
  for (const delivery of order.deliveries) {
    if (delivery.current_state === 'CREATED') {
      // Robot not assigned yet - don't show AV UI
      continue;
    }

    if (delivery.vehicle.is_autonomous) {
      // Robot assigned - show passcode and instructions
      updateKDS(delivery);
    }
  }
}`,
      },
    ],
  },
  python: {
    label: "Python",
    blocks: [
      {
        title: "Parse AV Fields",
        description:
          "Extract autonomous vehicle fields from the incoming order webhook payload.",
        code: `# Extract AV fields from an incoming order webhook
def extract_av_fields(order: dict) -> list[dict]:
    results = []

    for delivery in order["deliveries"]:
        vehicle = delivery["vehicle"]

        results.append({
            "delivery_id": delivery["id"],
            "is_autonomous": vehicle["is_autonomous"],
            "passcode": vehicle.get("passcode"),
            "handoff_instructions": vehicle.get("handoff_instructions"),
        })

    return results


# Usage with Flask webhook handler
@app.route("/webhook/orders", methods=["POST"])
def handle_order():
    order = request.get_json()
    av_fields = extract_av_fields(order)

    for field in av_fields:
        if field["is_autonomous"]:
            print(f"AV Delivery {field['delivery_id']}")
            print(f"  Passcode: {field['passcode']}")
            print(f"  Instructions: {field['handoff_instructions']}")

    return jsonify({"received": True, "av_fields": av_fields})`,
      },
      {
        title: "Display on KDS",
        description:
          "Show the passcode and handoff instructions prominently on the Kitchen Display System.",
        code: `# Render AV delivery info for Kitchen Display System
def render_kds_display(delivery: dict) -> dict:
    vehicle = delivery["vehicle"]

    if not vehicle["is_autonomous"]:
        return {
            "type": "STANDARD",
            "driver_name": delivery["first_name"],
            "vehicle": f"{vehicle['color']} {vehicle['make']} {vehicle['model']}",
            "license_plate": vehicle.get("license_plate"),
        }

    # AV delivery - passcode is critical
    return {
        "type": "AUTONOMOUS",
        "alert": "ROBOT DELIVERY",
        "passcode": vehicle.get("passcode"),
        "passcode_display": f"Enter code: {vehicle.get('passcode')}",
        "handoff_instructions": vehicle.get("handoff_instructions"),
        "vehicle_info": f"{vehicle['color']} {vehicle['make']} {vehicle['model']}",
    }


# Example: highlight AV orders differently
def is_high_priority(delivery: dict) -> bool:
    return (
        delivery["vehicle"]["is_autonomous"]
        and delivery["current_state"] == "ARRIVED_AT_PICKUP"
    )`,
      },
      {
        title: "Edge Cases",
        description:
          "Handle missing fields, multiple deliveries, and CREATED state orders.",
        code: `# Handle missing passcode gracefully
def get_passcode(vehicle: dict) -> str:
    if vehicle["is_autonomous"] and not vehicle.get("passcode"):
        logger.warning("AV delivery missing passcode!")
        return "PENDING"  # Display "pending" on KDS
    return vehicle.get("passcode", "")


# Handle mixed deliveries (human + AV in same order)
def process_order_deliveries(order: dict) -> tuple[list, list]:
    av_deliveries = [
        d for d in order["deliveries"]
        if d["vehicle"]["is_autonomous"]
    ]
    human_deliveries = [
        d for d in order["deliveries"]
        if not d["vehicle"]["is_autonomous"]
    ]
    return av_deliveries, human_deliveries


# Handle CREATED state (AV not yet assigned)
def handle_order_update(order: dict):
    for delivery in order["deliveries"]:
        if delivery["current_state"] == "CREATED":
            # Robot not assigned yet - don't show AV UI
            continue

        if delivery["vehicle"]["is_autonomous"]:
            # Robot assigned - show passcode and instructions
            update_kds(delivery)`,
      },
    ],
  },
  java: {
    label: "Java",
    blocks: [
      {
        title: "Parse AV Fields",
        description:
          "Extract autonomous vehicle fields from the incoming order webhook payload.",
        code: `// Extract AV fields from an incoming order webhook
public record AVFields(
    String deliveryId,
    boolean isAutonomous,
    String passcode,
    String handoffInstructions
) {}

public List<AVFields> extractAVFields(JsonObject order) {
    List<AVFields> results = new ArrayList<>();
    JsonArray deliveries = order.getJsonArray("deliveries");

    for (int i = 0; i < deliveries.size(); i++) {
        JsonObject delivery = deliveries.getJsonObject(i);
        JsonObject vehicle = delivery.getJsonObject("vehicle");

        results.add(new AVFields(
            delivery.getString("id"),
            vehicle.getBoolean("is_autonomous"),
            vehicle.getString("passcode", null),
            vehicle.getString("handoff_instructions", null)
        ));
    }

    return results;
}

// Usage with Spring Boot webhook handler
@PostMapping("/webhook/orders")
public ResponseEntity<Map<String, Object>> handleOrder(
        @RequestBody JsonObject order) {
    List<AVFields> avFields = extractAVFields(order);

    for (AVFields field : avFields) {
        if (field.isAutonomous()) {
            log.info("AV Delivery {}", field.deliveryId());
            log.info("  Passcode: {}", field.passcode());
            log.info("  Instructions: {}", field.handoffInstructions());
        }
    }

    return ResponseEntity.ok(Map.of(
        "received", true, "avFields", avFields));
}`,
      },
      {
        title: "Display on KDS",
        description:
          "Show the passcode and handoff instructions prominently on the Kitchen Display System.",
        code: `// Render AV delivery info for Kitchen Display System
public record KDSDisplay(
    String type,
    String alert,
    String passcode,
    String passcodeDisplay,
    String handoffInstructions,
    String vehicleInfo
) {}

public KDSDisplay renderKDSDisplay(JsonObject delivery) {
    JsonObject vehicle = delivery.getJsonObject("vehicle");

    if (!vehicle.getBoolean("is_autonomous")) {
        return new KDSDisplay(
            "STANDARD", null, null, null, null,
            String.format("%s %s %s",
                vehicle.getString("color"),
                vehicle.getString("make"),
                vehicle.getString("model"))
        );
    }

    // AV delivery - passcode is critical
    String passcode = vehicle.getString("passcode", null);
    return new KDSDisplay(
        "AUTONOMOUS",
        "ROBOT DELIVERY",
        passcode,
        "Enter code: " + passcode,
        vehicle.getString("handoff_instructions", null),
        String.format("%s %s %s",
            vehicle.getString("color"),
            vehicle.getString("make"),
            vehicle.getString("model"))
    );
}

// Example: highlight AV orders differently
public boolean isHighPriority(JsonObject delivery) {
    return delivery.getJsonObject("vehicle")
            .getBoolean("is_autonomous")
        && "ARRIVED_AT_PICKUP".equals(
            delivery.getString("current_state"));
}`,
      },
      {
        title: "Edge Cases",
        description:
          "Handle missing fields, multiple deliveries, and CREATED state orders.",
        code: `// Handle missing passcode gracefully
public String getPasscode(JsonObject vehicle) {
    if (vehicle.getBoolean("is_autonomous")
            && !vehicle.containsKey("passcode")) {
        log.warn("AV delivery missing passcode!");
        return "PENDING"; // Display "pending" on KDS
    }
    return vehicle.getString("passcode", "");
}

// Handle mixed deliveries (human + AV in same order)
public record SplitDeliveries(
    List<JsonObject> avDeliveries,
    List<JsonObject> humanDeliveries
) {}

public SplitDeliveries processOrderDeliveries(JsonObject order) {
    JsonArray deliveries = order.getJsonArray("deliveries");
    List<JsonObject> av = new ArrayList<>();
    List<JsonObject> human = new ArrayList<>();

    for (int i = 0; i < deliveries.size(); i++) {
        JsonObject d = deliveries.getJsonObject(i);
        if (d.getJsonObject("vehicle").getBoolean("is_autonomous")) {
            av.add(d);
        } else {
            human.add(d);
        }
    }

    return new SplitDeliveries(av, human);
}

// Handle CREATED state (AV not yet assigned)
public void handleOrderUpdate(JsonObject order) {
    JsonArray deliveries = order.getJsonArray("deliveries");
    for (int i = 0; i < deliveries.size(); i++) {
        JsonObject delivery = deliveries.getJsonObject(i);

        if ("CREATED".equals(delivery.getString("current_state"))) {
            continue; // Robot not assigned yet
        }

        JsonObject vehicle = delivery.getJsonObject("vehicle");
        if (vehicle.getBoolean("is_autonomous")) {
            updateKDS(delivery); // Show passcode and instructions
        }
    }
}`,
      },
    ],
  },
  csharp: {
    label: "C#",
    blocks: [
      {
        title: "Parse AV Fields",
        description:
          "Extract autonomous vehicle fields from the incoming order webhook payload.",
        code: `// Extract AV fields from an incoming order webhook
public record AVFields(
    string DeliveryId,
    bool IsAutonomous,
    string? Passcode,
    string? HandoffInstructions
);

public List<AVFields> ExtractAVFields(JsonDocument order)
{
    var results = new List<AVFields>();
    var deliveries = order.RootElement.GetProperty("deliveries");

    foreach (var delivery in deliveries.EnumerateArray())
    {
        var vehicle = delivery.GetProperty("vehicle");

        results.Add(new AVFields(
            delivery.GetProperty("id").GetString()!,
            vehicle.GetProperty("is_autonomous").GetBoolean(),
            vehicle.TryGetProperty("passcode", out var p)
                ? p.GetString() : null,
            vehicle.TryGetProperty("handoff_instructions", out var h)
                ? h.GetString() : null
        ));
    }

    return results;
}

// Usage with ASP.NET Core webhook handler
[HttpPost("webhook/orders")]
public IActionResult HandleOrder([FromBody] JsonDocument order)
{
    var avFields = ExtractAVFields(order);

    foreach (var field in avFields.Where(f => f.IsAutonomous))
    {
        _logger.LogInformation("AV Delivery {Id}", field.DeliveryId);
        _logger.LogInformation("  Passcode: {Code}", field.Passcode);
        _logger.LogInformation("  Instructions: {Inst}",
            field.HandoffInstructions);
    }

    return Ok(new { received = true, avFields });
}`,
      },
      {
        title: "Display on KDS",
        description:
          "Show the passcode and handoff instructions prominently on the Kitchen Display System.",
        code: `// Render AV delivery info for Kitchen Display System
public record KDSDisplay(
    string Type,
    string? Alert,
    string? Passcode,
    string? PasscodeDisplay,
    string? HandoffInstructions,
    string VehicleInfo
);

public KDSDisplay RenderKDSDisplay(JsonElement delivery)
{
    var vehicle = delivery.GetProperty("vehicle");
    var isAV = vehicle.GetProperty("is_autonomous").GetBoolean();

    var vehicleInfo = string.Format("{0} {1} {2}",
        vehicle.GetProperty("color").GetString(),
        vehicle.GetProperty("make").GetString(),
        vehicle.GetProperty("model").GetString());

    if (!isAV)
    {
        return new KDSDisplay("STANDARD",
            null, null, null, null, vehicleInfo);
    }

    // AV delivery - passcode is critical
    var passcode = vehicle.TryGetProperty("passcode", out var p)
        ? p.GetString() : null;

    return new KDSDisplay(
        "AUTONOMOUS",
        "ROBOT DELIVERY",
        passcode,
        $"Enter code: {passcode}",
        vehicle.TryGetProperty("handoff_instructions", out var h)
            ? h.GetString() : null,
        vehicleInfo
    );
}

// Example: highlight AV orders differently
public bool IsHighPriority(JsonElement delivery) =>
    delivery.GetProperty("vehicle")
        .GetProperty("is_autonomous").GetBoolean()
    && delivery.GetProperty("current_state").GetString()
        == "ARRIVED_AT_PICKUP";`,
      },
      {
        title: "Edge Cases",
        description:
          "Handle missing fields, multiple deliveries, and CREATED state orders.",
        code: `// Handle missing passcode gracefully
public string GetPasscode(JsonElement vehicle)
{
    var isAV = vehicle.GetProperty("is_autonomous").GetBoolean();
    if (isAV && !vehicle.TryGetProperty("passcode", out _))
    {
        _logger.LogWarning("AV delivery missing passcode!");
        return "PENDING"; // Display "pending" on KDS
    }

    return vehicle.TryGetProperty("passcode", out var p)
        ? p.GetString() ?? "" : "";
}

// Handle mixed deliveries (human + AV in same order)
public (List<JsonElement> AV, List<JsonElement> Human)
    ProcessOrderDeliveries(JsonDocument order)
{
    var av = new List<JsonElement>();
    var human = new List<JsonElement>();

    foreach (var d in order.RootElement
        .GetProperty("deliveries").EnumerateArray())
    {
        if (d.GetProperty("vehicle")
            .GetProperty("is_autonomous").GetBoolean())
            av.Add(d);
        else
            human.Add(d);
    }

    return (av, human);
}

// Handle CREATED state (AV not yet assigned)
public void HandleOrderUpdate(JsonDocument order)
{
    foreach (var delivery in order.RootElement
        .GetProperty("deliveries").EnumerateArray())
    {
        if (delivery.GetProperty("current_state").GetString()
            == "CREATED")
            continue; // Robot not assigned yet

        var vehicle = delivery.GetProperty("vehicle");
        if (vehicle.GetProperty("is_autonomous").GetBoolean())
            UpdateKDS(delivery); // Show passcode
    }
}`,
      },
    ],
  },
};
