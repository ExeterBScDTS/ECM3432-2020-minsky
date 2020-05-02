import * as React from "react"

import {Palette} from "./palette"
import {Histogram} from "./histogram"

export interface MyProps {
    id: string,
    pal: number,
  }
  
class HistSVG extends React.Component<MyProps> {

    componentDidMount() {
        const svg:SVGSVGElement = this.refs.svg as SVGSVGElement;

        let num_bins = 50;
        let max_height = 460;
      
        let h = new Histogram(svg,num_bins,max_height);
        //let p = new Palette(50);
        let p = new Palette(this.props.pal);
        h.setPalette(p);
        h.redraw();
    }

    render() { 
        return(
            <svg ref="svg" width={960} height={500}/>
        )
    }
}

export default HistSVG