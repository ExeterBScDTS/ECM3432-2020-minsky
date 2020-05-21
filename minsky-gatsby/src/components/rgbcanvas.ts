import {Palette} from "./palette"

async function sleep(ms:number):Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class RGBCanvas {
  private readonly ctx: CanvasRenderingContext2D
  private readonly pal: Palette
  private readonly uri: string
  private readonly canvas: HTMLCanvasElement
  private img:HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, uri: string) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.uri = uri
    this.img = document.createElement("img");
    this.img.id = "bob";
  }


  getCanv(){
    return this.canvas
  }


  async draw() {
    await sleep(200).then(()=>{});
    // Appending time to URL ensures the image is loaded, not read from cache.
    this.img.src = this.uri + "#" + new Date().getTime();
    this.img.onload = () => {
        // image is 640x480
        // These values could be read as img.naturalHeight and img.naturalWidth
        // 
        // Scale image
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        this.ctx.drawImage(this.img, 0, 0, 320, 240);
    }
    window.requestAnimationFrame(() => this.draw());
  }

}

export {RGBCanvas}