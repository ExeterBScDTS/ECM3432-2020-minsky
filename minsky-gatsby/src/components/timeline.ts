import {Palette} from "./palette"

async function sleep(ms:number):Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Timeline{

    palette:Array<string>;

    constructor(svg:SVGSVGElement) {
      let p1 = this.line();
      svg.appendChild(p1);
    }

    line():SVGGElement{
      var NS="http://www.w3.org/2000/svg";
      var SVGGroup = <SVGGElement><any>document.createElementNS(NS,"g"); 
      var SVGObj= <SVGPathElement><any>document.createElementNS(NS,"path");
      SVGObj.style.fill="none"
      SVGObj.style.stroke="steelblue"
      SVGObj.style.strokeWidth="1.5"
      SVGObj.style.strokeLinejoin="round"
      SVGObj.style.strokeLinecap="round"
      SVGObj.setAttribute("d", "M 0 200 L 5 5 L 15 15 L 300 20")
      SVGGroup.appendChild(SVGObj)
      return SVGGroup;
    }

    update(newval:number){
      console.log("updating with", newval)
    }
 
   async redraw():Promise<void>{
     await sleep(200).then(()=>{});
     //let response = await fetch("/data-url");
     //let tir = await response.json();
   
     // use requestAnimationFrame() so we don't update when the browser page
     // is not visible.
     window.requestAnimationFrame(() => this.redraw());
   }
 
   setPalette(palette:Palette){
      this.palette=palette.data;
   }
 
   static main(selector:string) {
    let svg = <SVGSVGElement><any>document.querySelector(selector);
  
    let h = new Timeline(svg);
    let p = new Palette(50);
    h.setPalette(p);
    h.redraw();
  }
 
 }

 export {Timeline}
 
 