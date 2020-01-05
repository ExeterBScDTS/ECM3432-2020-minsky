import {Palette} from "./palette"

async function sleep(ms:number):Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Histogram{

    palette:Array<string>;
    num_bins:number;
    max_height:number;

    constructor(svg:SVGSVGElement, num_bins:number,max_height:number) {
        this.num_bins=num_bins;
        this.max_height=max_height;
        for(let i=0; i<num_bins; i++){
            let r1 = this.rect(i,1,"white",max_height); 
                svg.appendChild(r1);
            let t1 = this.tick(i,"black",max_height);
              svg.appendChild(t1);
            }
    }

    tick(n:number,fill:string,max_height:number):SVGGElement{
      var NS="http://www.w3.org/2000/svg";
      var SVGGroup = <SVGGElement><any>document.createElementNS(NS,"g"); 
      var SVGObj= <SVGPathElement><any>document.createElementNS(NS,"path");
      //SVGObj.style.fill=fill;
      SVGObj.style.stroke=fill;
      SVGObj.style.strokeWidth="2";
      SVGObj.setAttribute("d", "M0 0L0 4");
      SVGGroup.appendChild(SVGObj);
      var SVGText1= <SVGTextElement><any>document.createElementNS(NS,"text");
      var SVGText2= <SVGTextElement><any>document.createElementNS(NS,"text");
      SVGText1.style.fill=fill;
      SVGText2.style.fill=fill;
      let temp = "" + (1000 + n);
      temp = temp[2] + temp[3];
      SVGText1.textContent= "" + temp[0];
      SVGText1.setAttribute("y","20");
      SVGText1.setAttribute("x","-4");
      SVGText2.textContent= "" + temp[1];
      SVGText2.setAttribute("y","34");
      SVGText2.setAttribute("x","-4"); 
      SVGGroup.appendChild(SVGText1);
      SVGGroup.appendChild(SVGText2);
      SVGGroup.setAttribute("transform","translate(" + (9+ n * 18) + "," + (max_height) + ")");
      return SVGGroup;
    }

    rect(n:number,h:number,fill:string,max_height:number):SVGRectElement{
      var NS="http://www.w3.org/2000/svg";
      var SVGObj= <SVGRectElement><any>document.createElementNS(NS,"rect");
      SVGObj.id="r_" + n;
      SVGObj.width.baseVal.value=17;
      SVGObj.height.baseVal.value=h;
      SVGObj.x.baseVal.value=1;
      SVGObj.style.fill=fill;
      SVGObj.setAttribute("transform","translate(" + (n * 18) + "," + (max_height - h) + ")");
      return SVGObj;
   }
 
   setheight(n:number,h:number,fill:string,max_height:number){
      var SVGObj= <SVGRectElement><any>document.getElementById("r_" + n);
      //SVGObj.width.baseVal.value=17;
      SVGObj.height.baseVal.value=h;
      //SVGObj.x.baseVal.value=1;
      SVGObj.style.fill=fill;
      SVGObj.setAttribute("transform","translate(" + (n * 18) + "," + (max_height - h) + ")");
   }
 
   async redraw():Promise<void>{
     await sleep(200).then(()=>{});
     let response = await fetch("/hist.json?bins=" + this.num_bins + "&height=" + this.max_height);
     let tir = await response.json();
     for(let i=0; i<tir.length; i++){
        this.setheight(i,tir[i],this.palette[i],this.max_height); 
     }
     // use requestAnimationFrame() so we don't update when the browser page
     // is not visible.
     window.requestAnimationFrame(() => this.redraw());
   }
 
   setPalette(palette:Palette){
      this.palette=palette.data;
   }
 
   static main(selector:string) {
    let svg = <SVGSVGElement><any>document.querySelector(selector);
    let num_bins = 50;
    let max_height = 460;
  
    let h = new Histogram(svg,num_bins,max_height);
    let p = new Palette(50);
    h.setPalette(p);
    h.redraw();
  }
 
 }

 export {Histogram}
 
 