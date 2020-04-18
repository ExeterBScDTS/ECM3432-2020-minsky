import * as React from "react"
// https://www.npmjs.com/package/react-input-slider
import Slider from 'react-input-slider'
import {TIRCanvas} from "./tircanvas"
import {Palette} from "./palette"

async function sleep(ms: number): Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export interface MyProps {
    id: string;
    rgb: string;
    tir: string;
    controls: string;
}

class Composite extends React.Component<MyProps>{

    private width = 640;
    private height = 480;
    private ctx: CanvasRenderingContext2D;
    private rgb: HTMLImageElement;
    private tir: HTMLImageElement;
    private tirC: TIRCanvas;
    private tir_width = 320;
    private tir_height = 240;
    private uri: string;
    private mov_x: number = 10;
    private mov_y: number = 10;

    state = {
        x: 50, y: 50, scale: 50,
        min: 10, max: 10,
        vis: "visible"
    }

    

    private draw() {

        let mov_y = (this.state.y) * this.width / 100;
        let mov_x = (100 - this.state.x) * this.height / 100;

        let tir_w = 320 * (285 + this.state.scale) / 200;
        let tir_h = 240 * (285 + this.state.scale) / 200;
        mov_y -= tir_w / 2;
        mov_x -= tir_h / 2;
        this.ctx.save();
        this.ctx.clearRect(0, 0, 640, 480);
        //this.ctx.drawImage(this.tir, mov_y, mov_x, tir_w, tir_h);
        this.ctx.drawImage(this.tirC.getCanv(), mov_y, mov_x, tir_w, tir_h);
        this.ctx.restore();
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.drawImage(this.rgb, 0, 0, 640, 480);
        this.ctx.restore();
    }

    private async autoRefresh() {
        await sleep(200).then(() => { });
        this.draw();
        window.requestAnimationFrame(() => this.autoRefresh());
    }

    componentDidMount() {

        const tir_canv = document.createElement('canvas')
        tir_canv.id = 'dummy'
        tir_canv.height = 240
        tir_canv.width = 320
        let p = new Palette(100);
        this.tirC = new TIRCanvas(tir_canv, p, "/tir.json");
        this.tirC.draw();
       
        const canvas: HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement;
        this.ctx = canvas.getContext("2d")
        this.rgb = document.getElementById(this.props.rgb) as HTMLImageElement;
        //this.tir = document.getElementById(this.props.tir) as HTMLImageElement;
        if (this.props.controls == "off") {
            this.setState({ vis: "hidden" });
        }
        this.autoRefresh();
    }

    render() {
        return (
            <>
                <div>
                    <div>
                        <Slider axis="y" y={this.state.y} onChange={
                            ({ x, y }) => { this.setState({ y: y }) }
                        } style={{ height: 640, visibility: this.state.vis }} />
                        <canvas className="image_cw" ref="canvas" width={640} height={480} />
                    </div>
                    <div>
                        <Slider axis="x" x={this.state.x} onChange={
                            ({ x, y }) => { this.setState({ x: x }) }
                        } style={{ left: 30, width: 480, visibility: this.state.vis }} />
                    </div>
                    <div>
                        <Slider axis="x" x={this.state.scale} onChange={
                            ({ x, y }) => { this.setState({ scale: x }) }
                        } style={{ left: 30, width: 160, visibility: this.state.vis }} />
                    </div>
                    <div style={{ visibility: this.state.vis }}>
                        Min <Slider axis="x" x={this.state.min}
                            onChange={({ x, y }) => { this.setState({ min: x }) }}
                            style={{ left: 30, width: 160 }} />
                    </div>
                    <div style={{ visibility: this.state.vis }}>
                        Max <Slider axis="x" x={this.state.max}
                            onChange={({ x, y }) => { 
                                this.setState({ max: x })
                                this.tirC.printNum(x)
                             }}
                            style={{ left: 30, width: 160 }} />
                    </div>
                </div>
            </>
        )
    }
}

export default Composite