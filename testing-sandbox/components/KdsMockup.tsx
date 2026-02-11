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
    <div className="bg-surface rounded-lg overflow-hidden border border-border">
      {/* KDS Header */}
      <div className="bg-surface-2 px-4 py-2 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-text-tertiary text-xs font-mono">
            Kitchen Display System
          </span>
        </div>
        <span className="text-text-tertiary text-xs font-mono">
          Order #42851
        </span>
      </div>

      {/* KDS Content */}
      <div className="p-4">
        {isAutonomous ? (
          <>
            <div className="bg-accent text-black px-3 py-2 rounded-md text-center font-bold text-sm mb-3">
              ROBOT DELIVERY
            </div>

            <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1">
              Status
            </div>
            <div className="text-white text-sm mb-3">{status}</div>

            <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1">
              Vehicle
            </div>
            <div className="text-white text-sm mb-3">{vehicleInfo}</div>

            {passcode ? (
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-3">
                <div className="text-accent text-xs uppercase tracking-wider mb-1">
                  Enter This Code on Robot
                </div>
                <div className="text-white text-4xl font-bold font-mono tracking-[0.3em] text-center">
                  {passcode}
                </div>
              </div>
            ) : (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-3">
                <div className="text-red-400 text-sm font-medium">
                  Passcode not available
                </div>
                <div className="text-red-400/70 text-xs mt-1">
                  Contact support if robot has arrived
                </div>
              </div>
            )}

            {instructions ? (
              <div>
                <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1">
                  Loading Instructions
                </div>
                <div className="text-accent text-sm bg-surface-2 rounded p-2 border border-border">
                  {instructions}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1">
                  Loading Instructions
                </div>
                <div className="text-text-tertiary text-sm bg-surface-2 rounded p-2 border border-border">
                  No specific instructions provided
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="bg-surface-2 px-3 py-2 rounded-md text-center font-medium text-sm text-text-secondary mb-3 border border-border">
              COURIER DELIVERY
            </div>

            <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1">
              Driver
            </div>
            <div className="text-white text-sm mb-3">
              {driverName || "John"}
            </div>

            <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1">
              Vehicle
            </div>
            <div className="text-white text-sm mb-3">
              {vehicleInfo || "Silver Toyota Camry"}
            </div>

            <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1">
              Status
            </div>
            <div className="text-white text-sm">{status}</div>
          </>
        )}
      </div>
    </div>
  );
}
