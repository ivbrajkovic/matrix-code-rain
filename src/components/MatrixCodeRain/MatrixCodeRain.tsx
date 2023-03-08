import { forwardRef, memo } from "react";
import { useMatrixCodeRain } from "./hooks/useMatrixCodeRain";
import styles from "./MatrixCodeRain.module.css";

// type MatrixCodeRainProps = ComponentProps<typeof Canvas>;

const Canvas = memo(
  forwardRef<HTMLCanvasElement>((_, ref) => (
    <canvas ref={ref} className={styles.canvas} />
  )),
);

Canvas.displayName = "Canvas";

const MatrixCodeRain = () => {
  const { canvasRef } = useMatrixCodeRain();
  return <Canvas ref={canvasRef} />;
};
export default MatrixCodeRain;
