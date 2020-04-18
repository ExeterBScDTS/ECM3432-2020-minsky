import * as React from "react"

import {Palette} from "./palette"
import {TIRCanvas} from "./tircanvas"


// See https://blog.cloudboost.io/using-html5-canvas-with-react-ff7d93f5dc76
// And https://www.gatsbyjs.org/docs/static-folder/

export interface MyProps {
    id: string,
    pal: number,
  }

class TirCanv extends React.Component<MyProps> {

    componentDidMount() {
        const canvas:HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement;

        let p = new Palette(this.props.pal);
        let t:TIRCanvas = new TIRCanvas(canvas, p, "/tir.json");
        t.draw();
    }

    printNum(v:number){
        console.log("TirCanv, printNum:", v);
    }

    render() { 
        return(
        <canvas ref="canvas" width={320} height={240} id={this.props.id}/>
        )
    }
}

export default TirCanv