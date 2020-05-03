import * as React from "react"
// https://www.npmjs.com/package/react-input-slider
import Slider from 'react-input-slider'
import Layout from "../components/layout"
import TemperaturePlot from "../components/temperatureplot"
import {useState} from "react"

const TimelinePage = () => {
  
  const [sliderX, setSliderX] = useState(0)

  return (

    <Layout>
      <Slider axis="x" x={sliderX} onChange={
        ({ x, y }) => {
          setSliderX(x)
          console.log(x, y)
        }
      } style={{ width: 640 }} />
      <TemperaturePlot id="plot" pal={50} latest={sliderX}/>
    </Layout>
  )
}
export default TimelinePage
