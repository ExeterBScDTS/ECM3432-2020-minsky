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
  
  let lineData:number[] 
  lineData = new Array()
  const buffer_size = 20
  const [sliderX, setSliderX] = useState(lineData)

  function fn(v:number, min:number, max:number){
    console.log("ARGS",v, min, max)
    let len = lineData.push(v)
    if(len > buffer_size){
      lineData.shift()
    }
    // Use spread operator to copy the array. Otherwise react won't know the value
    // has changed.
    setSliderX([...lineData])
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
