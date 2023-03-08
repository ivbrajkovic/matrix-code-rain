import { Symbol } from "./Symbol";

export class Effect {
  fontSize: number;
  #columns: number;
  #canvasWidth: number;
  #canvasHeight: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  #symbols: Symbol[];

  constructor(canvasWidth: number, canvasHeight: number) {
    this.#canvasWidth = canvasWidth;
    this.#canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.#columns = this.#canvasWidth / this.fontSize;
    this.#symbols = [];
    this.#initialize();
  }

  #initialize() {
    for (let i = 0; i < this.#columns; i++) {
      this.#symbols.push(new Symbol(i, 0, this.fontSize, this.#canvasHeight));
    }
  }

  resize(canvasWidth: number, canvasHeight: number) {
    this.#canvasWidth = canvasWidth;
    this.#canvasHeight = canvasHeight;
    this.#columns = this.#canvasWidth / this.fontSize;
    this.#symbols = [];
    this.#initialize();
  }

  startEffect(ctx: CanvasRenderingContext2D, fps = 30) {
    const nextFrameTime = 1000 / fps;
    let isEffectRunning = true;
    let lastTime = 0;
    let timer = 0;

    const start: FrameRequestCallback = (timeStamp) => {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      if (timer <= nextFrameTime) timer += deltaTime;
      else {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, this.#canvasWidth, this.#canvasHeight);
        ctx.textAlign = "center";
        ctx.font = `${this.fontSize}px monospace`;
        // ctx.fillStyle = "#0aff0a";
        ctx.fillStyle = "#0affff";
        this.#symbols.forEach((symbol) => symbol.draw(ctx));
        timer = 0;
      }

      isEffectRunning && requestAnimationFrame(start);
    };

    start(0);

    return () => {
      isEffectRunning = false;
    };
  }
}
