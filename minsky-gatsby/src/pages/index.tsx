import * as React from "react"
import Layout from "../components/layout"
import TirCanv from "../components/tircanv"
import RgbCanv from "../components/rgbcanv"
import Composite from "../components/composite"

const IndexPage = () => (

<Layout>
  
            <div className="row" style={{visibility:"hidden",height:"0px"}} >
              <RgbCanv id="rgb" />
              <TirCanv id="tir" />
            </div>
              <div>
                <Composite tir="tir" rgb="rgb" controls="off"/>
              </div>
</Layout>
)

export default IndexPage