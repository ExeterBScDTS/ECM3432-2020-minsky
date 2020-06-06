import {Palette} from "./palette"
import { SCHED_NONE } from "cluster";

async function sleep(ms:number):Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class TIRCanvas {
  private readonly ctx: CanvasRenderingContext2D
  private readonly pal: Palette
  private readonly uri: string
  private readonly callback: (v:number,min:number,max:number) => void
  private readonly canvas: HTMLCanvasElement
  private mint = 0.0
  private maxt = 50.0
  private cursor = {x:0,y:0}
  private data_w = 24
  private data_h = 32

  constructor(canvas: HTMLCanvasElement, palette: Palette , uri: string, callback: (v:number,min:number,max:number) => void) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.ctx.translate(120,  -160)
    this.ctx.rotate(Math.PI / 2)
    this.ctx.translate(160, -120)
    this.pal = palette
    this.uri = uri
    this.callback = callback
  }

  setCursor(c:{x:number, y:number}):void
  {
    this.cursor=c
  }

  getCanv(){
    return this.canvas
  }

  setMin(m:number){
    this.mint = m
  }

  setMax(m:number){
    this.maxt = m
  }

  palIdx(v:number):number{
    //if (v < this.mint) v=this.mint;
    //if (v > this.maxt) v=this.maxt;
    let p = (v-this.mint)/(this.maxt-this.mint)
    p = p * this.pal.getLength()
    //console.log(p,this.mint,this.maxt)
    if (p < 0) p = 0
    if (p >= this.pal.getLength()) p = this.pal.getLength()-1
    return ~~p
  }

  getColour(v:number):string{
    return this.pal.data[this.palIdx(v)];
  }

  async draw() {

    await sleep(200).then(()=>{});
    const response = await fetch(this.uri);
    const tir = await response.json();

    try{
      let x = (this.data_w-1) - ~~(this.cursor.x * this.data_w)
      let y = ~~(this.cursor.y * this.data_h)
      let value_at_cursor = tir[this.data_h*x + y]
      //console.log("TIRC xyv", x, y, value_at_cursor)
      this.callback(value_at_cursor,this.mint,this.maxt)
    }catch(e){
      console.log("No callback", e)
    }

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

}

export {TIRCanvas}