import * as React from "react"

import Layout from "../components/layout"
import TemperaturePlot from "../components/temperatureplot"

const TimelinePage = () => (
  <Layout>
    <TemperaturePlot id="plot" pal={50}/>
  </Layout>
)

export default TimelinePage
