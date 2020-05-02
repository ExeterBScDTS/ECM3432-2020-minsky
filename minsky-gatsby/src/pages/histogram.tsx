import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import HistSVG from "../components/histsvg"

const HistogramPage = () => (
  <Layout>
    <HistSVG id="hist" pal={50}/>
  </Layout>
)

export default HistogramPage
