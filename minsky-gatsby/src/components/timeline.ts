import { Palette } from "./palette"

async function sleep(ms: number): Promise<number> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Timeline {

  palette: Array<string>
  linePath: SVGPathElement
  lineData: Array<number>
  width: number
  height: number

  constructor(svg: SVGSVGElement) {
    this.width = svg.width.baseVal.value
    this.height = svg.height.baseVal.value
    let p1 = this.line()
    svg.appendChild(p1)
    this.lineData = new Array()
  }

  line(): SVGGElement {
    var NS = "http://www.w3.org/2000/svg";
    var SVGGroup = <SVGGElement><any>document.createElementNS(NS, "g")
    var SVGObj = <SVGPathElement><any>document.createElementNS(NS, "path")
    this.linePath = SVGObj
    SVGObj.style.fill = "none"
    SVGObj.style.stroke = "steelblue"
    SVGObj.style.strokeWidth = "1.5"
    SVGObj.style.strokeLinejoin = "round"
    SVGObj.style.strokeLinecap = "round"
    SVGGroup.appendChild(SVGObj)
    return SVGGroup;
  }

  // newval elements are between 0 and 100
  update(newval: number[]) {
    let path = "M 0 " + (100 - newval[0])* 0.01 * this.height + " "
    for (let i = 1; i < newval.length; i++) {
      path += "L " + i * (this.width / newval.length) + " " + (100 - newval[i]) * 0.01 * this.height
    }
    this.linePath.setAttribute("d", path)
  }

  setPalette(palette: Palette) {
    this.palette = palette.data;
  }

  static main(selector: string) {
    let svg = <SVGSVGElement><any>document.querySelector(selector);

    let h = new Timeline(svg);
    let p = new Palette(50);
    h.setPalette(p);
  }

}

export { Timeline }

