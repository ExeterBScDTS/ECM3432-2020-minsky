import * as React from "react"

async function sleep(ms: number): Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export interface MyProps {
    id: string
}

class RgbCanv extends React.Component<MyProps>{

    private ctx: CanvasRenderingContext2D;
    private img: HTMLImageElement;
    private uri: string;



    private async draw() {
        await sleep(200).then(() => { });
        // Appending time to URL ensures the image is loaded, not read from cache.
        this.img.src = this.uri + "#" + new Date().getTime();
        this.img.onload = () => {
            // image is 640x480
            // These values could bre read as img.naturalHeight and img.naturalWidth
            // 
            // Scale image
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
            this.ctx.drawImage(this.img, 0, 0, 320, 240);


        }
        window.requestAnimationFrame(() => this.draw());
    }

    componentDidMount() {
        const canvas: HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement;
        this.uri = "/colourcam.png";
        this.ctx = canvas.getContext("2d");
        this.img = document.createElement("img");
        this.img.id = "bob";
        this.draw();

    }

    render() {
        return (
            <canvas style={{ transform: 'rotate(' + 180 + 'deg)' }} ref="canvas" width={320} height={240} id={this.props.id} />
        )
    }
}

export default RgbCanv