import { useCallback, useEffect, useRef } from "react";

export type SwipeDirection = "left" | "right" | "up" | "down";

export interface GestureCallbacks {
  onSwipe?: (direction: SwipeDirection) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onDoubleTap?: (e: TouchEvent) => void;
  onTwoFingerTap?: (e: TouchEvent) => void;
  onPinch?: (scale: number, delta: number) => void;
  onShake?: () => void;
}

export interface GestureOptions {
  minSwipeDistance?: number;
  doubleTapDelay?: number;
  enabled?: boolean;
}

const DEFAULT_MIN_SWIPE = 50;
const DEFAULT_DOUBLE_TAP_DELAY = 300;

function getTouchDistance(t1: Touch, t2: Touch): number {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

export function useGesture(
  elementRef: React.RefObject<HTMLElement | null>,
  callbacks: GestureCallbacks,
  options: GestureOptions = {},
) {
  const {
    minSwipeDistance = DEFAULT_MIN_SWIPE,
    doubleTapDelay = DEFAULT_DOUBLE_TAP_DELAY,
    enabled = true,
  } = options;

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );
  const lastTapRef = useRef<number>(0);
  const pinchStartDistanceRef = useRef<number>(0);
  const shakeLastTimeRef = useRef<number>(0);
  const shakeLastAccelRef = useRef<{ x: number; y: number; z: number }>({
    x: 0,
    y: 0,
    z: 0,
  });

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;

      if (e.touches.length === 2) {
        pinchStartDistanceRef.current = getTouchDistance(
          e.touches[0],
          e.touches[1],
        );
      } else if (e.touches.length === 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now(),
        };
      }
    },
    [enabled],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;
      if (e.touches.length === 2 && callbacks.onPinch) {
        const currentDist = getTouchDistance(e.touches[0], e.touches[1]);
        if (pinchStartDistanceRef.current > 0) {
          const scale = currentDist / pinchStartDistanceRef.current;
          const delta = currentDist - pinchStartDistanceRef.current;
          callbacks.onPinch(scale, delta);
        }
      }
    },
    [enabled, callbacks],
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;

      // Two-finger tap
      if (e.changedTouches.length === 2 && callbacks.onTwoFingerTap) {
        callbacks.onTwoFingerTap(e);
        return;
      }

      if (!touchStartRef.current) return;
      const start = touchStartRef.current;
      const now = Date.now();
      const endX = e.changedTouches[0]?.clientX ?? 0;
      const endY = e.changedTouches[0]?.clientY ?? 0;

      const deltaX = endX - start.x;
      const deltaY = endY - start.y;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      const elapsed = now - start.time;

      // Determine if it's a swipe or tap
      const isSwipe =
        Math.max(absDeltaX, absDeltaY) >= minSwipeDistance && elapsed < 500;

      if (isSwipe) {
        let direction: SwipeDirection;
        if (absDeltaX > absDeltaY) {
          direction = deltaX < 0 ? "left" : "right";
        } else {
          direction = deltaY < 0 ? "up" : "down";
        }

        callbacks.onSwipe?.(direction);
        if (direction === "left") callbacks.onSwipeLeft?.();
        if (direction === "right") callbacks.onSwipeRight?.();
        if (direction === "up") callbacks.onSwipeUp?.();
        if (direction === "down") callbacks.onSwipeDown?.();
      } else {
        // Check for double tap
        const timeSinceLastTap = now - lastTapRef.current;
        if (timeSinceLastTap < doubleTapDelay && callbacks.onDoubleTap) {
          callbacks.onDoubleTap(e);
          lastTapRef.current = 0;
        } else {
          lastTapRef.current = now;
        }
      }

      touchStartRef.current = null;
    },
    [enabled, minSwipeDistance, doubleTapDelay, callbacks],
  );

  // Shake detection via devicemotion
  useEffect(() => {
    if (!enabled || !callbacks.onShake) return;

    const SHAKE_THRESHOLD = 15;

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const now = Date.now();
      const x = acc.x ?? 0;
      const y = acc.y ?? 0;
      const z = acc.z ?? 0;

      const last = shakeLastAccelRef.current;
      const dx = Math.abs(x - last.x);
      const dy = Math.abs(y - last.y);
      const dz = Math.abs(z - last.z);

      shakeLastAccelRef.current = { x, y, z };

      if (Math.max(dx, dy, dz) > SHAKE_THRESHOLD) {
        if (now - shakeLastTimeRef.current > 1000) {
          shakeLastTimeRef.current = now;
          callbacks.onShake?.();
        }
      }
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [enabled, callbacks]);

  useEffect(() => {
    if (!enabled) return;
    const el = elementRef.current;
    if (!el) return;

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, elementRef, handleTouchStart, handleTouchMove, handleTouchEnd]);
}
