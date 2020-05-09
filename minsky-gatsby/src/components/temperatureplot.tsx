import * as React from "react"

import {Palette} from "./palette"
import {Timeline} from "./timeline"


// See https://blog.cloudboost.io/using-html5-canvas-with-react-ff7d93f5dc76
// And https://www.gatsbyjs.org/docs/static-folder/

export interface MyProps {
    id: string,
    width: number,
    height: number,
    pal: number,
    latest: number[],
    min: number,
    max: number
  }

class TemperaturePlot extends React.Component<MyProps> {

    h:Timeline

    componentDidMount() {
        const svg:SVGSVGElement = this.refs.svg as SVGSVGElement;

        let p = new Palette(this.props.pal);
        this.h = new Timeline(svg, p);
    }


    render() { 
        if(this.h) this.h.update(this.props.latest,this.props.min,this.props.max)
        return(
            <svg ref="svg" width={this.props.width} height={this.props.height}/>
        )
    }
}

export default TemperaturePlot