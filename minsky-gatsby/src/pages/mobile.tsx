import * as React from "react"
import Layout from "../components/layout"
import RgbCanv from "../components/rgbcanv"
import Composite from "../components/composite"
import TemperaturePlot from "../components/temperatureplot"
import { useState } from "react"

const MobilePage = () => {
  let lineData: number[], rawData: number[]
  const buffer_size = 20
  rawData = new Array()
  lineData = new Array(buffer_size)

  const [plotData, setPlotData] = useState(lineData)
  const [plotMin, setPlotMin] = useState(0)
  const [plotMax, setPlotMax] = useState(100)

  function fn(v: number, min: number, max: number) {
    let len = rawData.push(v)
    if (len > buffer_size) {
      rawData.shift()
    }
    // Use spread operator to copy the array. Otherwise React won't know the value
    // has changed.
    for (let i in rawData) {
      lineData[i] = ~~((rawData[i] - min) * (100 / (max - min)))
      if (lineData[i] > 100) lineData[i] = 100
    }
    setPlotData([...lineData])
    setPlotMin(min)
    setPlotMax(max)
  }

  // <TemperaturePlot id="plot" width={100} height={200} pal={200} latest={plotData} min={plotMin} max={plotMax} />
  return (

    <Layout>

      <div className="row">
      <div className="col-md-8">
        <Composite id="comp" width={480} height={640} callback={fn} controls="off" />
        </div>
        <div className="col-md-4">
        
      </div>
      </div>

    </Layout>
  )
}

export default MobilePage