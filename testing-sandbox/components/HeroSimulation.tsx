"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { simulationSteps, generateOrderForStep } from "@/lib/simulation-steps";
import { kdsStates } from "@/lib/kds-data";
import KdsReference from "@/components/KdsReference";

const DEFAULT_DURATION = 3500;
const MAX_LOOPS = 2;

// Map simulation step index to kdsStates index
const stepToKdsState = [0, 1, 2, 3, 4, 5];

// Stable timestamp so JSON diffs don't show false changes on estimated_pickup_time
const STABLE_PICKUP_TIME = "2025-07-15T14:35:00.000Z";

function stabilizeOrder(order: ReturnType<typeof generateOrderForStep>) {
  return {
    ...order,
    deliveries: order.deliveries.map((d) => ({
      ...d,
      estimated_pickup_time: STABLE_PICKUP_TIME,
    })),
  };
}

function PayloadView({ currentStep }: { currentStep: number }) {
  const { currentLines, changedIndices } = useMemo(() => {
    const currentOrder = stabilizeOrder(
      generateOrderForStep(simulationSteps[currentStep])
    );
    const curLines = JSON.stringify(currentOrder, null, 2).split("\n");

    if (currentStep === 0) {
      return { currentLines: curLines, changedIndices: new Set<number>() };
    }

    const prevOrder = stabilizeOrder(
      generateOrderForStep(simulationSteps[currentStep - 1])
    );
    const prevLines = JSON.stringify(prevOrder, null, 2).split("\n");

    const changed = new Set<number>();
    const maxLen = Math.max(curLines.length, prevLines.length);
    for (let i = 0; i < maxLen; i++) {
      if (curLines[i] !== prevLines[i]) {
        changed.add(i);
      }
    }

    return { currentLines: curLines, changedIndices: changed };
  }, [currentStep]);

  return (
    <div className="bg-[#0d1117] rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-surface-2/50">
        <span className="text-[10px] text-text-tertiary font-mono">
          webhook payload — step {currentStep + 1}
        </span>
        {changedIndices.size > 0 && (
          <span className="text-[10px] text-accent font-mono">
            {changedIndices.size} field{changedIndices.size !== 1 ? "s" : ""} changed
          </span>
        )}
      </div>
      <div className="overflow-auto max-h-[200px]">
        <pre className="py-1.5">
          {currentLines.map((line, i) => {
            const isChanged = changedIndices.has(i);
            return (
              <div
                key={i}
                className={`px-3 font-mono text-xs leading-5 ${
                  isChanged
                    ? "bg-accent/10 border-l-2 border-accent"
                    : ""
                }`}
              >
                <span className={isChanged ? "text-accent" : "text-text-secondary"}>
                  {line}
                </span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

export default function HeroSimulation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [animatePasscode, setAnimatePasscode] = useState(false);
  const [activeTab, setActiveTab] = useState<"action" | "payload">("action");
  const loopCountRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = simulationSteps[currentStep];
  const kdsState = kdsStates[stepToKdsState[currentStep]];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const advanceStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      if (next >= simulationSteps.length) {
        loopCountRef.current += 1;
        if (loopCountRef.current >= MAX_LOOPS) {
          setIsPlaying(false);
          return prev;
        }
        return 0;
      }
      return next;
    });
  }, []);

  // Trigger passcode animation when entering step 2 (index 1)
  useEffect(() => {
    if (currentStep === 1) {
      setAnimatePasscode(true);
      const timeout = setTimeout(() => setAnimatePasscode(false), 1500);
      return () => clearTimeout(timeout);
    }
    setAnimatePasscode(false);
  }, [currentStep]);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    const duration = step.heroDuration || DEFAULT_DURATION;
    timerRef.current = setTimeout(advanceStep, duration);

    return clearTimer;
  }, [isPlaying, currentStep, step.heroDuration, advanceStep, clearTimer]);

  const handleStepClick = (index: number) => {
    clearTimer();
    setHasInteracted(true);
    setCurrentStep(index);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setHasInteracted(true);
    if (isPlaying) {
      clearTimer();
      setIsPlaying(false);
    } else {
      // Reset loop count when user resumes
      loopCountRef.current = 0;
      setIsPlaying(true);
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setHasInteracted(true);
        setIsPlaying(false);
        clearTimer();
        setCurrentStep((prev) =>
          Math.min(prev + 1, simulationSteps.length - 1)
        );
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setHasInteracted(true);
        setIsPlaying(false);
        clearTimer();
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlayPause();
      }
    },
    [clearTimer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        {/* Left Panel: Step Info */}
        <div className="p-6 lg:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border">
          <div key={currentStep} className="animate-fade-slide-up">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-accent/10 text-accent text-xs font-mono px-2 py-0.5 rounded border border-accent/20">
                Step {step.id} of {simulationSteps.length}
              </span>
              {step.kdsDisplay.highlight && (
                <span className="bg-accent text-black text-xs font-bold px-2 py-0.5 rounded">
                  AV FIELDS ACTIVE
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">{step.title}</h3>
            <p className="text-text-secondary text-sm mb-4">{step.subtitle}</p>

            {/* Tabs */}
            <div className="flex gap-1 mb-3">
              <button
                onClick={() => setActiveTab("action")}
                className={`px-3 py-1 text-xs font-medium rounded transition ${
                  activeTab === "action"
                    ? "bg-surface-2 text-white border border-border"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                What Happens
              </button>
              <button
                onClick={() => setActiveTab("payload")}
                className={`px-3 py-1 text-xs font-medium rounded transition ${
                  activeTab === "payload"
                    ? "bg-surface-2 text-white border border-border"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                Payload
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "action" ? (
              <div className="bg-surface-2 rounded-lg p-4 border border-border">
                <div className="text-text-tertiary text-xs uppercase tracking-wider mb-1.5">
                  Crew Action
                </div>
                <p className="text-sm text-text-secondary">{step.crewAction}</p>
              </div>
            ) : (
              <PayloadView currentStep={currentStep} />
            )}
          </div>
        </div>

        {/* Right Panel: KDS */}
        <div className="p-6 lg:p-8 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-sm">
            <KdsReference
              mode="simulation"
              kdsState={kdsState}
              passcode={step.orderState.passcode || undefined}
              animatePasscode={animatePasscode}
            />
          </div>
        </div>
      </div>

      {/* Bottom: Progress Bar */}
      <div className="bg-surface-2 border-t border-border px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Play/Pause */}
          <button
            onClick={togglePlayPause}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-surface border border-border hover:border-accent/40 transition text-text-secondary hover:text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            )}
          </button>

          {/* Step Indicators */}
          <div className="flex items-center gap-2 flex-1">
            {simulationSteps.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleStepClick(idx)}
                className="group flex items-center gap-1.5 flex-1"
                title={s.title}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition flex-shrink-0 ${
                    idx === currentStep
                      ? "bg-accent animate-step-pulse"
                      : idx < currentStep
                      ? "bg-accent/50"
                      : "bg-border-light group-hover:bg-text-tertiary"
                  }`}
                />
                <span
                  className={`text-xs truncate hidden sm:block ${
                    idx === currentStep
                      ? "text-accent font-medium"
                      : "text-text-tertiary group-hover:text-text-secondary"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
