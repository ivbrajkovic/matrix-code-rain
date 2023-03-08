const characters =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getRandomCharacter = () =>
  characters.charAt(~~(Math.random() * characters.length));

export class Symbol {
  constructor(
    x: number,
    private y: number,
    private fontSize: number,
    private canvasHeight: number,
    private xOffset = x * fontSize,
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    const char = getRandomCharacter();
    ctx.fillText(char, this.xOffset, this.y);

    if (this.y > this.canvasHeight && Math.random() > 0.975) this.y = 0;
    else this.y += this.fontSize;
  }
}
