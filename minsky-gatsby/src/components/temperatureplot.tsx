import * as React from "react"

import {Palette} from "./palette"
import {Timeline} from "./timeline"


// See https://blog.cloudboost.io/using-html5-canvas-with-react-ff7d93f5dc76
// And https://www.gatsbyjs.org/docs/static-folder/

export interface MyProps {
    id: string,
    width: number,
    pal: number,
    latest: number
  }

class TemperaturePlot extends React.Component<MyProps> {

    h:Timeline

    componentDidMount() {
        const svg:SVGSVGElement = this.refs.svg as SVGSVGElement;

        let p = new Palette(this.props.pal);
        this.h = new Timeline(svg);
    }


    render() { 
        if(this.h) this.h.update(this.props.latest)
        return(
            <svg ref="svg" width={this.props.width} height={150}/>
        )
    }
}

export default TemperaturePlot