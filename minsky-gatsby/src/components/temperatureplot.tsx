import * as React from "react"

import {Palette} from "./palette"
import {Timeline} from "./timeline"


// See https://blog.cloudboost.io/using-html5-canvas-with-react-ff7d93f5dc76
// And https://www.gatsbyjs.org/docs/static-folder/

export interface MyProps {
    id: string,
    pal: number,
  }

class TemperaturePlot extends React.Component<MyProps> {

    componentDidMount() {
        const svg:SVGSVGElement = this.refs.svg as SVGSVGElement;

        let p = new Palette(this.props.pal);
        let h = new Timeline(svg);
        h.redraw();
    }


    render() { 
        return(
        <canvas ref="canvas" width={320} height={240} id={this.props.id}/>
        )
    }
}

export default TemperaturePlot