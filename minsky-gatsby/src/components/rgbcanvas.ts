import {Palette} from "./palette"

async function sleep(ms:number):Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class RGBCanvas {
  private readonly ctx: CanvasRenderingContext2D
  private readonly uri: string
  private readonly canvas: HTMLCanvasElement
  private buffer_canv: HTMLCanvasElement
  private readonly buffer_ctx: CanvasRenderingContext2D
  private img:HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, uri: string) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.uri = uri
    this.img = document.createElement("img");
    this.img.id = "bob";
    this.buffer_canv = document.createElement('canvas')
    this.buffer_canv.id = 'dummyC'
    this.buffer_canv.height =  600
    this.buffer_canv.width = 600
    this.buffer_ctx = this.buffer_canv.getContext('2d')
    this.buffer_ctx.translate(120,  -160)
    this.buffer_ctx.rotate(Math.PI / 2)
    this.buffer_ctx.translate(160, -120)
  }


  getCanv(){
    return this.canvas
  }


  async draw() {
    await sleep(200).then(()=>{});
    // Appending time to URL ensures the image is loaded, not read from cache.
    this.img.src = this.uri + "#" + new Date().getTime()
    this.img.onload = () => {
        // image is 640x480
        // These values could be read as img.naturalHeight and img.naturalWidth
        // 
        // Scale image
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        this.buffer_ctx.drawImage(this.img, 0, 0, 320, 240)
        //this.buffer_ctx.rotate(Math.PI / 20)
        //this.buffer_ctx.translate(0, -240)
         // Reset transformation matrix to the identity matrix
        //this.buffer_ctx.setTransform(1, 0, 0, 1, 0, 0)
        //this.buffer_ctx.restore()
        this.ctx.drawImage(this.buffer_canv, 0, 0)
    }
    window.requestAnimationFrame(() => this.draw())
  }

}

export {RGBCanvas}