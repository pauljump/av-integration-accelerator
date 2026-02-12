"use client";

import { useState, useEffect } from "react";
import { getAVConfig, type AVProvider } from "@/lib/mock-orders";
import {
  sampleOrderItems,
  kdsStates,
  annotations,
  type KdsState,
} from "@/lib/kds-data";

// ============================================================================
// Types
// ============================================================================

interface SimulationModeProps {
  mode: "simulation";
  kdsState: KdsState;
  provider?: AVProvider;
  passcode?: string;
  animatePasscode?: boolean;
}

interface InteractiveModeProps {
  mode: "interactive";
}

type KdsReferenceProps = SimulationModeProps | InteractiveModeProps;

// ============================================================================
// KDS Screen Sub-Component
// ============================================================================

interface KdsScreenProps {
  state: KdsState;
  provider: AVProvider;
  passcode: string;
  showAnnotations?: boolean;
  animatePasscode?: boolean;
  compact?: boolean;
}

function KdsScreen({
  state,
  provider,
  passcode,
  showAnnotations = false,
  animatePasscode = false,
  compact = false,
}: KdsScreenProps) {
  const avConfig = getAVConfig(provider);
  const vehicleInfo = `${avConfig.color} ${avConfig.make} ${avConfig.model}`;

  return (
    <div
      className={`bg-surface rounded-lg overflow-hidden border ${
        state.isAV && state.showPasscode
          ? "border-accent/40 animate-pulse-glow"
          : "border-border"
      }`}
    >
      {/* KDS Header */}
      <div className="bg-surface-2 px-4 py-2 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              state.urgency === "high"
                ? "bg-amber-500"
                : state.isAV
                ? "bg-accent"
                : "bg-text-tertiary"
            }`}
          />
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
        {/* Delivery Type Badge */}
        <div className="relative" data-annotation-target="delivery-type">
          {state.isAV ? (
            <div
              className={`bg-accent text-black px-3 py-2 rounded-md text-center font-bold text-sm mb-3 ${
                animatePasscode ? "animate-fade-slide-up" : ""
              }`}
            >
              {state.statusText}
            </div>
          ) : (
            <div className="bg-surface-2 px-3 py-2 rounded-md text-center font-medium text-sm text-text-secondary mb-3 border border-border">
              {state.statusText}
            </div>
          )}
          {showAnnotations && (
            <AnnotationBubble targetId="delivery-type" />
          )}
        </div>

        {/* Vehicle Info */}
        {state.isAV && (
          <div className="relative mb-3" data-annotation-target="vehicle-info">
            <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1">
              Vehicle
            </div>
            <div className="text-white text-sm">{vehicleInfo}</div>
            {showAnnotations && (
              <AnnotationBubble targetId="vehicle-info" />
            )}
          </div>
        )}

        {!state.isAV && (
          <>
            <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1">
              Driver
            </div>
            <div className="text-white text-sm mb-3">John</div>
            <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1">
              Vehicle
            </div>
            <div className="text-white text-sm mb-3">Silver Toyota Camry</div>
          </>
        )}

        {/* Passcode */}
        {state.showPasscode && (
          <div
            className="relative bg-accent/10 border border-accent/30 rounded-lg p-4 mb-3"
            data-annotation-target="passcode"
          >
            <div className="text-accent text-xs uppercase tracking-wider mb-1">
              Enter This Code on Robot
            </div>
            <div className="text-white text-4xl font-bold font-mono tracking-[0.3em] text-center">
              {animatePasscode
                ? passcode.split("").map((digit, i) => (
                    <span
                      key={i}
                      className={`inline-block animate-digit-reveal animate-digit-reveal-${i + 1}`}
                    >
                      {digit}
                    </span>
                  ))
                : passcode}
            </div>
            {showAnnotations && (
              <AnnotationBubble targetId="passcode" />
            )}
          </div>
        )}

        {/* Handoff Instructions */}
        {state.showInstructions && (
          <div className="relative" data-annotation-target="instructions">
            <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1">
              Loading Instructions
            </div>
            <div className="text-accent text-sm bg-surface-2 rounded p-2 border border-border">
              {avConfig.handoffInstructions}
            </div>
            {showAnnotations && (
              <AnnotationBubble targetId="instructions" />
            )}
          </div>
        )}

        {/* Order Items */}
        {!compact && (
          <div className="mt-4 pt-3 border-t border-border">
            <div className="text-text-tertiary text-xs uppercase tracking-wider mb-2">
              Items
            </div>
            <div className="space-y-1.5">
              {sampleOrderItems.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <div>
                    <span className="text-white">
                      {item.quantity}x {item.name}
                    </span>
                    {item.modifiers && (
                      <span className="text-text-tertiary text-xs ml-2">
                        ({item.modifiers.join(", ")})
                      </span>
                    )}
                  </div>
                  <span className="text-text-secondary font-mono text-xs">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-semibold mt-2 pt-2 border-t border-border">
              <span className="text-white">Total</span>
              <span className="text-white font-mono">
                $
                {sampleOrderItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Annotation Bubble
// ============================================================================

function AnnotationBubble({ targetId }: { targetId: string }) {
  const annotation = annotations.find((a) => a.target === targetId);
  if (!annotation) return null;

  return (
    <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full z-10 max-w-[200px] hidden lg:block">
      <div className="bg-accent/10 border border-accent/30 rounded-lg px-3 py-2 text-xs text-accent relative">
        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-accent/10 border-l border-b border-accent/30 rotate-45" />
        {annotation.text}
      </div>
    </div>
  );
}

// ============================================================================
// Provider Tabs
// ============================================================================

const providers: { id: AVProvider; label: string }[] = [
  { id: "serve", label: "Serve" },
  { id: "nuro", label: "Nuro" },
  { id: "waymo", label: "Waymo" },
  { id: "coco", label: "Coco" },
  { id: "avride", label: "AvRide" },
];

// ============================================================================
// Main Component
// ============================================================================

export default function KdsReference(props: KdsReferenceProps) {
  if (props.mode === "simulation") {
    return (
      <KdsScreen
        state={props.kdsState}
        provider={props.provider || "serve"}
        passcode={props.passcode || "4829"}
        animatePasscode={props.animatePasscode}
        compact
      />
    );
  }

  return <InteractiveKds />;
}

// ============================================================================
// Interactive Mode
// ============================================================================

function InteractiveKds() {
  const [selectedProvider, setSelectedProvider] = useState<AVProvider>("serve");
  const [selectedStateIdx, setSelectedStateIdx] = useState(3); // "arrived" by default
  const [showComparison, setShowComparison] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);

  const currentState = kdsStates[selectedStateIdx];

  return (
    <div>
      {/* Provider Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {providers.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProvider(p.id)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
              selectedProvider === p.id
                ? "bg-accent text-black"
                : "bg-surface-2 text-text-secondary border border-border hover:border-accent/40"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* State Toggle Bar */}
      <div className="flex flex-wrap gap-1 mb-4 bg-surface rounded-lg p-1 border border-border">
        {kdsStates.map((state, idx) => (
          <button
            key={state.id}
            onClick={() => setSelectedStateIdx(idx)}
            className={`flex-1 min-w-[80px] px-2 py-1.5 rounded text-xs font-medium transition ${
              selectedStateIdx === idx
                ? "bg-accent text-black"
                : "text-text-secondary hover:text-white hover:bg-surface-2"
            }`}
          >
            {state.label}
          </button>
        ))}
      </div>

      {/* Toggle Controls */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition border ${
            showComparison
              ? "bg-accent/10 border-accent/30 text-accent"
              : "bg-surface-2 border-border text-text-secondary hover:border-accent/40"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          Compare
        </button>
        <button
          onClick={() => setShowAnnotations(!showAnnotations)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition border ${
            showAnnotations
              ? "bg-accent/10 border-accent/30 text-accent"
              : "bg-surface-2 border-border text-text-secondary hover:border-accent/40"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          Annotate
        </button>
      </div>

      {/* KDS Display(s) */}
      <div className={`grid gap-4 ${showComparison ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-lg"}`}>
        {showComparison && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-surface-2 text-text-secondary text-xs font-medium rounded border border-border">
                Without AV
              </span>
            </div>
            <KdsScreen
              state={kdsStates[0]}
              provider={selectedProvider}
              passcode="4829"
            />
          </div>
        )}
        <div>
          {showComparison && (
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded border border-accent/20">
                With AV
              </span>
            </div>
          )}
          <KdsScreen
            state={currentState}
            provider={selectedProvider}
            passcode="4829"
            showAnnotations={showAnnotations && currentState.isAV}
          />
        </div>
      </div>
    </div>
  );
}
