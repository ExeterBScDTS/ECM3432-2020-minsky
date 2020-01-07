import {Palette} from "./palette"

async function sleep(ms:number):Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class TIRCanvas {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly pal: Palette;
  private readonly uri: string;
  private mint = 0.0;
  private maxt = 100.0;

  constructor(canvas: HTMLCanvasElement, palette: Palette , uri: string) {
    this.ctx = canvas.getContext('2d');
    this.pal = palette;
    this.uri = uri;
  }

  getMinTemp():number {
      return this.mint;
  }

  getMaxTemp():number {
      return this.maxt;
  }

  setMinTemp(n:number) {
      this.mint=n;
  }

  setMaxTemp(n:number) {
      this.maxt=n;
  }

  palIdx(v:number):number{
    if (v < window.mint) v=window.mint;
    if (v > window.maxt) v=window.maxt;
    let p = (v-window.mint) * (this.pal.getLength()/(window.maxt-window.mint));
    return ~~p;
  }

  getColour(v:number):string{
    return this.pal.data[this.palIdx(v)];
  }

  async draw() {

    await sleep(200).then(()=>{});
    const response = await fetch(this.uri);
    const tir = await response.json();

    for(let row=0; row<32; row++){
      let y=row*10;
      for(let col=0; col<24; col++){
          let x=col*10;
          let v = tir[col*32 + row];
          this.ctx.fillStyle = this.getColour(v);
          this.ctx.fillRect(y, x, 10, 10);
      }
    }
    window.requestAnimationFrame(() => this.draw());
  }

  static main(selector:string, uri:string) {

    let p = new Palette(512);
    //let c = <HTMLCanvasElement> document.querySelector(selector);
    //let t = new TIRCanvas(c,p,uri);
    //t.draw();
  }
}

export {TIRCanvas}
