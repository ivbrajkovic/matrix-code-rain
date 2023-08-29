import { useEffect, useRef } from "react";
import { Effect } from "../class/Effect";

export const useMatrixCodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const effect = new Effect(width, height);
    const stopEffect = effect.startEffect(ctx, 15);

    const resizeHandler = () => {
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);
      effect.resize(width, height);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      stopEffect();
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return { canvasRef };
};
