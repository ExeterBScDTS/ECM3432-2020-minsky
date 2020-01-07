import * as React from "react"

import Layout from "../components/layout"
import TirCanv from "../components/tircanv"
import RgbCanv from "../components/rgbcanv"
import Composite from "../components/composite"

const CamerasPage = () => (
  <Layout>
    <div className="row">
      <RgbCanv id="rgb" />
      <TirCanv id="tir" />
    </div>
    <div>
      <Composite tir="tir" rgb="rgb" />
    </div>
  </Layout>
)

export default CamerasPage
