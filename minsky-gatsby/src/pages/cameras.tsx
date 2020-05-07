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
  function fn(v:number){
    setSliderX(49) 
    setSliderX(50)
    console.log(v)
  }
  return (
    <Layout>
      <div className="row">
        <Link className="btn btn-outline-secondary" to="/updates">Check for updates</Link>
      </div>
      <div className="row">
        <Composite id="comp" rgb="rgb" controls="on" callback={fn} />
        <TemperaturePlot id="plot" width={300} height={200} pal={50} latest={sliderX} />
      </div>
      <div style={{ visibility: "visible" }}>
        <RgbCanv id="rgb" />
      </div>
    </Layout>
  )
}
export default CamerasPage
