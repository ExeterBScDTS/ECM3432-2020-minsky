import { Palette } from "./palette"

async function sleep(ms: number): Promise<number> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Timeline {

  palette: Array<string>
  linePath: SVGPathElement
  lineData: Array<number>
  scaleObj: SVGGElement
  backgroundObj: SVGGElement
  width: number
  height: number
  svg: SVGSVGElement

  constructor(svg: SVGSVGElement, pal: Palette) {
    this.palette = pal.data
    this.width = svg.width.baseVal.value
    this.height = svg.height.baseVal.value
    this.backgroundObj = this.background()
    svg.appendChild(this.backgroundObj)
    svg.appendChild(this.line())
    this.scaleObj = this.scale(0, 100)
    svg.appendChild(this.scaleObj)

    this.lineData = new Array()
    //svg.removeChild(this.scaleObj)
    this.svg = svg
  }

  line(): SVGGElement {
    var NS = "http://www.w3.org/2000/svg";
    var SVGGroup = <SVGGElement><any>document.createElementNS(NS, "g")
    var SVGObj = <SVGPathElement><any>document.createElementNS(NS, "path")
    this.linePath = SVGObj
    SVGObj.style.fill = "none"
    SVGObj.style.stroke = "gray"
    SVGObj.style.strokeWidth = "4"
    SVGObj.style.strokeLinejoin = "round"
    SVGObj.style.strokeLinecap = "round"
    SVGGroup.appendChild(SVGObj)
    return SVGGroup
  }

  scale(min: number, max: number): SVGGElement {
    let colour = "gray"
    let NS = "http://www.w3.org/2000/svg";
    let SVGGroup = <SVGGElement><any>document.createElementNS(NS, "g")
    let SVGObj = <SVGPathElement><any>document.createElementNS(NS, "path")
    let x_coord = this.width - 30
    SVGObj.style.fill = "none"
    SVGObj.style.stroke = colour
    SVGObj.style.strokeWidth = "1.5"
    SVGObj.style.strokeLinejoin = "round"
    SVGObj.style.strokeLinecap = "round"
    SVGObj.setAttribute("d", "M " + x_coord + " 0 L " + x_coord + " " + this.height)
    SVGGroup.appendChild(SVGObj)

    let SVGTextMin = <SVGTextElement><any>document.createElementNS(NS, "text")
    SVGTextMin.style.fill = colour
    if (min != undefined) {
      SVGTextMin.textContent = min.toString()
    }
    SVGTextMin.setAttribute("x", "" + (x_coord + 2))
    SVGTextMin.setAttribute("y", this.height.toString())
    SVGGroup.appendChild(SVGTextMin)

    let SVGTextMax = <SVGTextElement><any>document.createElementNS(NS, "text")
    SVGTextMax.style.fill = colour
    if (max != undefined) {
      SVGTextMax.textContent = max.toString()
    }
    SVGTextMax.setAttribute("x", "" + (x_coord + 2))
    SVGTextMax.setAttribute("y", "0")
    SVGTextMax.setAttribute("dy", "1em")
    SVGGroup.appendChild(SVGTextMax)

    let SVGTextMid = <SVGTextElement><any>document.createElementNS(NS, "text")
    SVGTextMid.style.fill = colour
    if (max != undefined && min != undefined) {
      SVGTextMid.textContent = (~~((max + min) / 2)).toString()
    }
    SVGTextMid.setAttribute("x", "" + (x_coord + 2))
    SVGTextMid.setAttribute("y", "0")
    SVGTextMid.setAttribute("dy", "50%")
    SVGGroup.appendChild(SVGTextMid)

    return SVGGroup;
  }

  background(): SVGGElement {
    let NS = "http://www.w3.org/2000/svg";
    let SVGGroup = <SVGGElement><any>document.createElementNS(NS, "g")

    let incr = 100 / this.palette.length
    let incr_pc = incr.toString() + "%"
    this.palette.forEach((v, i) => {
      let SVGRect = <SVGRectElement><any>document.createElementNS(NS, "rect")
      //SVGRect.width.baseVal.value = 100
      //SVGRect.height.baseVal.value = 20
      SVGRect.setAttribute("height", incr_pc)
      SVGRect.setAttribute("width", "100%")
      SVGRect.setAttribute("y", (100 - i * incr).toString() + "%")
      SVGRect.x.baseVal.value = 0
      SVGRect.style.fill = this.palette[i]
      SVGGroup.appendChild(SVGRect)

    }
    )

    return SVGGroup
  }

  // newval elements are between 0 and 100
  update(newval: number[], min: number, max: number) {
    let path = "M 0 " + (100 - newval[0]) * 0.01 * this.height + " "
    for (let i = 1; i < newval.length; i++) {
      path += "L " + i * (this.width / newval.length) + " " + (100 - newval[i]) * 0.01 * this.height
    }
    this.linePath.setAttribute("d", path)
    try {
      this.svg.removeChild(this.scaleObj)
    } catch{

    }
    this.scaleObj = this.scale(min, max)
    this.svg.appendChild(this.scaleObj)
  }

  setPalette(palette: Palette) {
    this.palette = palette.data;
  }

  static main(selector: string) {
    let svg = <SVGSVGElement><any>document.querySelector(selector);

    let p = new Palette(50);
    let h = new Timeline(svg, p);
    h.setPalette(p);
  }

}

export { Timeline }

