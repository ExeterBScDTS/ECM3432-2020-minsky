import * as React from "react"
// https://www.npmjs.com/package/react-input-slider
import Slider from 'react-input-slider'
import { TIRCanvas } from "./tircanvas"
import { Palette } from "./palette"


async function sleep(ms: number): Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export interface MyProps {
    id: string
    rgb: string
    //tir: string;
    callback: (v:number,min:number,max:number) => void
    controls: string
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
        x: 50, y: 50, scale: 1.7,
        min: 0,
        max: 50,
        vis: "visible"
    }

    private tir_xy(x:number,y:number) : {x:number,y:number} {
        //this.state.x, this.state.y,this.state.scale
        let mov_y = (this.state.y) * this.width / 100
        let mov_x = (100 - this.state.x) * this.height / 100

        let tir_w = 320 * (this.state.scale)
        let tir_h = 240 * (this.state.scale)
        mov_y -= tir_w / 2
        mov_x -= tir_h / 2
        console.log(mov_x,mov_y, this.state.scale)
        return {x:x-mov_x,y:y-mov_y}
      }

    _onMouseMove(e: MouseEvent) {
        var rect = (e.target as Element).getBoundingClientRect()
        let x = e.clientX - ~~rect.left
        let y = e.clientY - ~~rect.top
        console.log("POSN",x,y, this.tir_xy(x,y))
    }


    private draw() {

        let mov_y = (this.state.y) * this.width / 100
        let mov_x = (100 - this.state.x) * this.height / 100

        let tir_w = 320 * (this.state.scale)
        let tir_h = 240 * (this.state.scale)
        mov_y -= tir_w / 2
        mov_x -= tir_h / 2
        this.ctx.save()
        this.ctx.clearRect(0, 0, 640, 480)
        this.tirC.setMin(this.state.min)
        this.tirC.setMax(this.state.max)
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

    tir_cb(v:number){
        console.log("CENTRE V", v)
    }

    componentDidMount() {

        const tir_canv = document.createElement('canvas')
        tir_canv.id = 'dummy'
        tir_canv.height = 240
        tir_canv.width = 320
        let p = new Palette(200)
        this.tirC = new TIRCanvas(tir_canv, p, "/tir.json", this.props.callback)
        this.tirC.draw()

        const canvas: HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement;
        this.ctx = canvas.getContext("2d")
        this.rgb = document.getElementById(this.props.rgb) as HTMLImageElement;
        //this.tir = document.getElementById(this.props.tir) as HTMLImageElement;
        if (this.props.controls == "off") {
            this.setState({ vis: "hidden" });
        }

        // Load settings from system database
        fetch('/settings', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log('Loaded:', data)
                this.setState({ "min": Number(data["tir.min"]) })
                this.setState({ "max": Number(data["tir.max"]) })
                this.setState({ "x": Number(data["tir.x"]) })
                this.setState({ "y": Number(data["tir.y"]) })
                this.setState({ "scale": Number(data["tir.scale"]) })
            })
            .catch((error) => {
                console.error('Error:', error)
            });

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
                        <canvas onMouseMove={this._onMouseMove.bind(this)} className="image_cw" ref="canvas" width={640} height={480} />
                    </div>
                    <div>
                        <Slider axis="x" x={this.state.x} onChange={
                            ({ x, y }) => { this.setState({ x: x }) }
                        } style={{ left: 30, width: 480, visibility: this.state.vis }} />
                    </div>
                    <div>
                        <Slider axis="x" x={this.state.scale} xmin={1.4} xmax={2.0} xstep={0.02} onChange={
                            ({ x, y }) => { this.setState({ scale: x }) }
                        } style={{ left: 30, width: 160, visibility: this.state.vis }} />
                    </div>
                    <div style={{ visibility: this.state.vis }}>
                        Min <Slider axis="x" x={this.state.min}
                            onChange={({ x, y }) => {
                                this.setState({ min: x })
                                this.tirC.setMin(x)
                                if (this.state.min > this.state.max) {
                                    this.setState({ max: this.state.min })
                                }
                            }}
                            style={{ left: 30, width: 160 }} />
                    </div>
                    <div style={{ visibility: this.state.vis }}>
                        Max <Slider axis="x" x={this.state.max}
                            onChange={({ x, y }) => {
                                this.setState({ max: x })
                                this.tirC.setMax(x)
                                if (this.state.max < this.state.min) {
                                    this.setState({ min: this.state.max })
                                }
                            }}
                            style={{ left: 30, width: 160 }} />
                    </div>
                    <div style={{ visibility: this.state.vis }}>
                        <form
                            onSubmit={event => {
                                event.preventDefault()
                                //fetch("/update?download="+latestVer).then(response => response.text()).then(text => {alert(text)})
                                // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

                                const data = {
                                    "tir.min": this.state.min, "tir.max": this.state.max,
                                    "tir.x": this.state.x, "tir.y": this.state.y, "tir.scale": this.state.scale,
                                };

                                fetch('/settings', {
                                    method: 'POST', // or 'PUT'
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(data),
                                })
                                    .then((response) => {
                                        return response.json()
                                    })
                                    .then((data) => {
                                        console.log('Success:', data);
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });


                            }}>
                            <input type="submit" value="save" />
                        </form>
                        <form
                            onSubmit={event => {
                                event.preventDefault()
                                //fetch("/update?download="+latestVer).then(response => response.text()).then(text => {alert(text)})
                                // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

                                fetch('/settings', {
                                    method: 'POST', // or 'PUT'
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                })
                                    .then((response) => {
                                        return response.json()
                                    })
                                    .then((data) => {
                                        console.log('Loaded:', data)
                                        this.setState({ "min": Number(data["tir.min"]) })
                                        this.setState({ "max": Number(data["tir.max"]) })
                                        this.setState({ "x": Number(data["tir.x"]) })
                                        this.setState({ "y": Number(data["tir.y"]) })
                                        this.setState({ "scale": Number(data["tir.scale"]) })
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error)
                                    });
                            }}>
                            <input type="submit" value="load" />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Composite