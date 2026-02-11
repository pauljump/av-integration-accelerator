"use client";

const steps = [
  {
    title: "Order Placed",
    description: "Customer places an order through the platform",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
    avField: null,
  },
  {
    title: "Robot Assigned",
    description: "AV provider assigns a delivery robot to the order",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    avField: "is_autonomous → true",
  },
  {
    title: "Robot Arrives",
    description: "Robot arrives at the restaurant for pickup",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    avField: "passcode needed",
  },
  {
    title: "Crew Loads Food",
    description: "Crew enters passcode and loads food into robot",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    avField: "handoff_instructions",
  },
  {
    title: "Robot Departs",
    description: "Robot leaves for customer delivery",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
    avField: null,
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Connection line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200" />

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-start gap-4">
            {/* Icon circle */}
            <div
              className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.avField
                  ? "bg-blue-100 text-blue-600 ring-2 ring-blue-200"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {step.icon}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-gray-900">{step.title}</h4>
                {step.avField && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-mono rounded">
                    {step.avField}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
