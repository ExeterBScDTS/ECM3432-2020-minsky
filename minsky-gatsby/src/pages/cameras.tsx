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

  let lineData: number[], rawData: number[]
  const buffer_size = 20
  rawData = new Array()
  lineData = new Array(buffer_size)

  const [plotData, setPlotData] = useState(lineData)

  function fn(v: number, min: number, max: number) {
    console.log("ARGS", v, min, max)
    let len = rawData.push(v)
    if (len > buffer_size) {
      rawData.shift()
    }
    // Use spread operator to copy the array. Otherwise React won't know the value
    // has changed.
    for (let i in rawData) {
      lineData[i] = ((rawData[i] - min) * (100 / (max - min)))
      if (lineData[i] > 100) lineData[i] = 100
    }
    setPlotData([...lineData])
  }

  return (
    <Layout>
      <div className="row">
        <Link className="btn btn-outline-secondary" to="/updates">Check for updates</Link>
      </div>
      <div className="row">
        <Composite id="comp" rgb="rgb" controls="on" callback={fn} />
        <TemperaturePlot id="plot" width={300} height={400} pal={50} latest={plotData} />
      </div>
      <div style={{ visibility: "visible" }}>
        <RgbCanv id="rgb" />
      </div>
    </Layout>
  )
}
export default CamerasPage
