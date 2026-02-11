"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "/", label: "Learn", description: "Understand AV orders" },
  { href: "/build", label: "Build", description: "Code snippets" },
  { href: "/test", label: "Test", description: "Send test orders" },
  { href: "/simulate", label: "Simulate", description: "Walk through a delivery" },
  { href: "/validate", label: "Validate", description: "Run compliance suite" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <span className="font-semibold text-gray-900 hidden sm:block">
              RoboBuilder
            </span>
          </div>

          <div className="flex items-center">
            <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
              {sections.map((section, index) => {
                const isActive =
                  pathname === section.href ||
                  (section.href !== "/" && pathname.startsWith(section.href));

                return (
                  <Link
                    key={section.href}
                    href={section.href}
                    className={`
                      relative px-3 py-1.5 rounded-md text-sm font-medium transition-all
                      flex items-center gap-1.5
                      ${
                        isActive
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }
                    `}
                  >
                    <span className="text-xs text-gray-400 font-mono">
                      {index + 1}
                    </span>
                    <span>{section.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
