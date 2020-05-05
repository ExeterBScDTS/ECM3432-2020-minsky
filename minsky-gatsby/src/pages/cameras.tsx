import * as React from "react"

import Layout from "../components/layout"
import { Link } from "gatsby"
import TirCanv from "../components/tircanv"
import RgbCanv from "../components/rgbcanv"
import Composite from "../components/composite"
import TemperaturePlot from "../components/temperatureplot"
import { useState } from "react"
import Slider from 'react-input-slider'

const CamerasPage = () => {
  const [sliderX, setSliderX] = useState(0)
  return (
    <Layout>
      <div className="row">
        <Link className="btn btn-outline-secondary" to="/updates">Check for updates</Link>
      </div>
      <div className="row">
        <Composite id="comp" tir="tir" rgb="rgb" controls="on" />
        <TemperaturePlot id="plot" width={300} height={200} pal={50} latest={sliderX} />
      </div>
      <div style={{ visibility: "hidden" }}>
        <RgbCanv id="rgb" />
        <TirCanv id="tir" pal={512} />
      </div>
      <Slider axis="x" x={sliderX} onChange={
        ({ x, y }) => {
          setSliderX(x)
          console.log(x, y)
        }
      } style={{ width: 640 }} />
    </Layout>
  )
}
export default CamerasPage
