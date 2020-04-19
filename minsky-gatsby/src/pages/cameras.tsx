import * as React from "react"

import Layout from "../components/layout"
import { Link } from "gatsby"
import TirCanv from "../components/tircanv"
import RgbCanv from "../components/rgbcanv"
import Composite from "../components/composite"

const CamerasPage = () => ( 
  <Layout>
    <div className="row">
      <Link className="btn btn-outline-secondary" to="/updates">Check for updates</Link>
    </div>
    <div className="row">
      <Composite id="comp" tir="tir" rgb="rgb" controls="on" />    
    </div>
    <div style={{visibility:"hidden"}}>
      <RgbCanv id="rgb" />
      <TirCanv id="tir" pal={512} />
    </div>
  </Layout>
)

export default CamerasPage
