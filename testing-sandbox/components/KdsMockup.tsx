"use client";

interface KdsMockupProps {
  passcode?: string | null;
  instructions?: string | null;
  isAutonomous: boolean;
  status?: string;
  vehicleInfo?: string;
  driverName?: string;
}

export default function KdsMockup({
  passcode,
  instructions,
  isAutonomous,
  status = "ARRIVED_AT_PICKUP",
  vehicleInfo = "Yellow Serve Robotics Rover",
  driverName,
}: KdsMockupProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {/* KDS Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-gray-400 text-xs font-mono">
            Kitchen Display System
          </span>
        </div>
        <span className="text-gray-500 text-xs">Order #42851</span>
      </div>

      {/* KDS Content */}
      <div className="p-4">
        {isAutonomous ? (
          <>
            {/* AV Alert Banner */}
            <div className="bg-amber-500 text-black px-3 py-2 rounded-md text-center font-bold text-sm mb-3">
              ROBOT DELIVERY
            </div>

            {/* Status */}
            <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
              Status
            </div>
            <div className="text-white text-sm mb-3">{status}</div>

            {/* Vehicle Info */}
            <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
              Vehicle
            </div>
            <div className="text-white text-sm mb-3">{vehicleInfo}</div>

            {/* Passcode - prominent display */}
            {passcode ? (
              <div className="bg-blue-600 rounded-lg p-4 mb-3">
                <div className="text-blue-200 text-xs uppercase tracking-wider mb-1">
                  Enter This Code on Robot
                </div>
                <div className="text-white text-4xl font-bold font-mono tracking-[0.3em] text-center">
                  {passcode}
                </div>
              </div>
            ) : (
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-3 mb-3">
                <div className="text-red-300 text-sm font-medium">
                  Passcode not available
                </div>
                <div className="text-red-400 text-xs mt-1">
                  Contact support if robot has arrived
                </div>
              </div>
            )}

            {/* Handoff Instructions */}
            {instructions ? (
              <div>
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                  Loading Instructions
                </div>
                <div className="text-green-400 text-sm bg-gray-800 rounded p-2">
                  {instructions}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                  Loading Instructions
                </div>
                <div className="text-gray-500 text-sm bg-gray-800 rounded p-2">
                  No specific instructions provided
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Standard delivery display */}
            <div className="bg-gray-700 px-3 py-2 rounded-md text-center font-medium text-sm text-gray-300 mb-3">
              COURIER DELIVERY
            </div>

            <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
              Driver
            </div>
            <div className="text-white text-sm mb-3">
              {driverName || "John"}
            </div>

            <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
              Vehicle
            </div>
            <div className="text-white text-sm mb-3">
              {vehicleInfo || "Silver Toyota Camry"}
            </div>

            <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
              Status
            </div>
            <div className="text-white text-sm">{status}</div>
          </>
        )}
      </div>
    </div>
  );
}
