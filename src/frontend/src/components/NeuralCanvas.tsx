import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
}

interface PinchState {
  scale: number;
  lastDist: number;
}

const NODE_COUNT = 65;
const MAX_CONNECTION_DIST = 150;
const NODE_SPEED = 0.3;

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);
  const scaleRef = useRef<number>(1);
  const pinchRef = useRef<PinchState>({ scale: 1, lastDist: 0 });
  const { isDark } = useTheme();

  const initNodes = useCallback((w: number, h: number) => {
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * NODE_SPEED,
      vy: (Math.random() - 0.5) * NODE_SPEED,
      radius: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.5 + 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
    }));
  }, []);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(scaleRef.current, scaleRef.current);

      const scaledW = w / scaleRef.current;
      const scaledH = h / scaleRef.current;

      // Background gradient
      const bgGrad = ctx.createRadialGradient(
        scaledW * 0.5,
        scaledH * 0.4,
        0,
        scaledW * 0.5,
        scaledH * 0.4,
        scaledW * 0.7,
      );

      if (isDark) {
        bgGrad.addColorStop(0, "oklch(0.16 0.02 50)");
        bgGrad.addColorStop(0.5, "oklch(0.13 0.015 48)");
        bgGrad.addColorStop(1, "oklch(0.10 0.01 52)");
      } else {
        bgGrad.addColorStop(0, "oklch(0.98 0.012 75)");
        bgGrad.addColorStop(0.5, "oklch(0.96 0.015 70)");
        bgGrad.addColorStop(1, "oklch(0.94 0.01 65)");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, scaledW, scaledH);

      const nodes = nodesRef.current;

      // Update + wrap nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -20) node.x = scaledW + 20;
        if (node.x > scaledW + 20) node.x = -20;
        if (node.y < -20) node.y = scaledH + 20;
        if (node.y > scaledH + 20) node.y = -20;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_CONNECTION_DIST) {
            const opacity = (1 - dist / MAX_CONNECTION_DIST) * 0.4;
            const pulse =
              Math.sin(time * 0.002 + nodes[i].pulsePhase) * 0.1 + 0.9;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            if (isDark) {
              ctx.strokeStyle = `oklch(0.72 0.10 10 / ${opacity * pulse})`;
            } else {
              ctx.strokeStyle = `oklch(0.62 0.08 10 / ${opacity * pulse * 0.7})`;
            }
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * 0.003 + node.pulsePhase) * 0.3 + 0.7;
        const r = node.radius * pulse;

        // Outer glow
        const glowGrad = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          r * 8,
        );

        if (isDark) {
          const isSage = node.pulsePhase > Math.PI;
          if (isSage) {
            glowGrad.addColorStop(
              0,
              `oklch(0.60 0.11 145 / ${node.opacity * pulse * 0.8})`,
            );
            glowGrad.addColorStop(
              0.4,
              `oklch(0.55 0.09 145 / ${node.opacity * 0.25})`,
            );
            glowGrad.addColorStop(1, "transparent");
          } else {
            glowGrad.addColorStop(
              0,
              `oklch(0.75 0.14 10 / ${node.opacity * pulse * 0.8})`,
            );
            glowGrad.addColorStop(
              0.4,
              `oklch(0.65 0.12 10 / ${node.opacity * 0.25})`,
            );
            glowGrad.addColorStop(1, "transparent");
          }
        } else {
          glowGrad.addColorStop(
            0,
            `oklch(0.72 0.12 10 / ${node.opacity * pulse * 0.6})`,
          );
          glowGrad.addColorStop(
            0.4,
            `oklch(0.72 0.08 10 / ${node.opacity * 0.15})`,
          );
          glowGrad.addColorStop(1, "transparent");
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 8, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        if (isDark) {
          const isSage = node.pulsePhase > Math.PI;
          ctx.fillStyle = isSage
            ? `oklch(0.75 0.12 145 / ${node.opacity * pulse})`
            : `oklch(0.85 0.14 10 / ${node.opacity * pulse})`;
        } else {
          ctx.fillStyle = `oklch(0.62 0.12 10 / ${node.opacity * pulse * 0.9})`;
        }
        ctx.fill();
      }

      ctx.restore();
    },
    [isDark],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      initNodes(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    let startTime = performance.now();
    const animate = (now: number) => {
      const time = now - startTime;
      const dpr = window.devicePixelRatio || 1;
      draw(ctx, canvas.width / dpr, canvas.height / dpr, time);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    // Pinch gesture
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchRef.current.lastDist = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (pinchRef.current.lastDist > 0) {
          const delta = dist / pinchRef.current.lastDist;
          scaleRef.current = Math.min(
            Math.max(scaleRef.current * delta, 0.5),
            3,
          );
        }
        pinchRef.current.lastDist = dist;
      }
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [initNodes, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
