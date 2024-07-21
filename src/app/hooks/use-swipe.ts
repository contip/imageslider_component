import { useState, useEffect, useCallback } from "react";
import type { RefObject } from "react";

export enum SWIPE_DIR {
  RIGHT = "right",
  LEFT = "left",
  UP = "up",
  DOWN = "down",
}

const useSwipe = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
  threshold: number = 50
): SWIPE_DIR | null => {
  const [position, setPosition] = useState<{
    x1: number | null;
    y1: number | null;
    x2: number | null;
    y2: number | null;
  }>({ x1: null, y1: null, x2: null, y2: null });

  const [swipe, setSwipe] = useState<SWIPE_DIR | null>(null);

  const processSwipe = useCallback(() => {
    if (
      position.x1 !== null &&
      position.x2 !== null &&
      position.y1 !== null &&
      position.y2 !== null
    ) {
      const dx = position.x2 - position.x1;
      const dy = position.y2 - position.y1;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        setSwipe(dx > 0 ? SWIPE_DIR.RIGHT : SWIPE_DIR.LEFT);
      } else if (Math.abs(dy) > threshold) {
        setSwipe(dy > 0 ? SWIPE_DIR.DOWN : SWIPE_DIR.UP);
      }
    }
  }, [position, threshold]);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.targetTouches[0];
      setPosition({ x1: touch.clientX, y1: touch.clientY, x2: null, y2: null });
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.targetTouches[0];
      setPosition((prev) => ({
        ...prev,
        x2: touch.clientX,
        y2: touch.clientY,
      }));
    };

    const handleMouseDown = (event: MouseEvent) => {
      setPosition({ x1: event.clientX, y1: event.clientY, x2: null, y2: null });
    };

    const handleMouseMove = (event: MouseEvent) => {
      setPosition((prev) => ({
        ...prev,
        x2: event.clientX,
        y2: event.clientY,
      }));
    };

    const element = elementRef.current;
    if (element) {
      if (window.matchMedia("(pointer: coarse)").matches) {
        element.addEventListener("touchstart", handleTouchStart);
        element.addEventListener("touchmove", handleTouchMove);
        element.addEventListener("touchend", processSwipe);
      } else {
        element.addEventListener("mousedown", handleMouseDown);
        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseup", processSwipe);
      }
    }

    return () => {
      if (element) {
        if (window.matchMedia("(pointer: coarse)").matches) {
          element.removeEventListener("touchstart", handleTouchStart);
          element.removeEventListener("touchmove", handleTouchMove);
          element.removeEventListener("touchend", processSwipe);
        } else {
          element.removeEventListener("mousedown", handleMouseDown);
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseup", processSwipe);
        }
      }
    };
  }, [elementRef, processSwipe]);

  useEffect(() => {
    if (swipe !== null) {
      const timer = setTimeout(() => {
        setSwipe(null);
      }, 100); // Reset after 100ms
      return () => clearTimeout(timer);
    }
  }, [swipe]);

  return swipe;
};

export default useSwipe;
