import * as React from "react"
import Composite from "../components/composite"

const MobilePage = () => {

  function fn(v: number, min: number, max: number) {
  }

  return (

      <div className="row">
      <div className="col-md-8">
        <Composite id="comp" width={480} height={640} callback={fn} controls="off" />
        </div>
        <div className="col-md-4">
        
      </div>
      </div>
  )
}

export default MobilePage