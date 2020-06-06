import * as React from "react"

import {Palette} from "./palette"
import {TIRCanvas} from "./tircanvas"


// See https://blog.cloudboost.io/using-html5-canvas-with-react-ff7d93f5dc76
// And https://www.gatsbyjs.org/docs/static-folder/

export interface MyProps {
    id: string,
    pal: number,
    callback: (v:number) => void
  }

class TirCanv extends React.Component<MyProps> {

    
    componentDidMount() {
        const canvas:HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement;

        let p = new Palette(this.props.pal);
        let t:TIRCanvas = new TIRCanvas(canvas, p, "/tir.json", this.props.callback);
        t.draw();
    }


    render() { 
        return(
        <canvas ref="canvas" width={320} height={240} id={this.props.id}/>
        )
    }
}

export default TirCanv