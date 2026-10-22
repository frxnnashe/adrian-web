"use client";

import { useEffect, useRef, useState } from "react";

import { createLungParticles } from "@/lib/lung-particles";
import type { LungScene } from "@/lib/lung-scene";

const stillParticles = createLungParticles(1200);

export function LungParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<LungScene | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let alive = true;
    let loading = false;
    let inView = false;

    const start = async () => {
      if (!alive || loading || sceneRef.current || !inView) return;
      loading = true;
      try {
        const { createLungScene } = await import("@/lib/lung-scene");
        if (!alive) return;
        sceneRef.current = createLungScene(canvas);
        sceneRef.current.setVisible(inView);
        setReady(true);
      } catch {
        setReady(false);
      } finally {
        loading = false;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      const wasInView = inView;
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      if (inView && !wasInView) sceneRef.current?.replay();
      sceneRef.current?.setVisible(inView);
      if (inView) void start();
    }, { threshold: [0, 0.15] });
    observer.observe(canvas.parentElement!);

    return () => {
      alive = false;
      observer.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div className="lung-visual" data-ready={ready}>
      <div
        className="lung-stage"
        role="img"
        aria-label="Partículas que se reúnen para formar unos pulmones tridimensionales, con un movimiento respiratorio suave"
      >
        <svg className="lung-still" viewBox="-1.75 -2 3.5 4" aria-hidden="true">
          {stillParticles.map((p, i) => (
            <circle
              key={i}
              cx={p.x.toFixed(5)}
              cy={(-p.y).toFixed(5)}
              r={p.airway ? 0.014 : 0.011}
              fill={p.airway ? "var(--lung-airway)" : "var(--lung-tissue)"}
              opacity={(0.65 + (p.z + 0.5) * 0.25).toFixed(3)}
            />
          ))}
        </svg>
        <canvas ref={canvasRef} className="lung-canvas" aria-hidden="true" />
      </div>
    </div>
  );
}
