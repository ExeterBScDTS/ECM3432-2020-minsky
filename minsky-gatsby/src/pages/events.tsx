import * as React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { useState, useEffect } from "react"


const EventsPage = () => {

  const [msg, setMsg] = useState("dummy")
  const [active, setActive] = useState(true);
  const [progress, setProgress] = useState(0.0);
  
  return (
    <Layout>
      <div>
        <p>Message is {msg}</p>
      </div>
      <div>
        <form
          onSubmit={event => {
            event.preventDefault()
            var evtSource = new EventSource('/event')
            setActive(false)
            console.log(evtSource)
            // Wrapped like this so that Gatsby build doesn't try and run this.
            if (typeof window !== `undefined`) {
              evtSource.onmessage = function (e) {
                setMsg(e.data)
                if(e.data ==  "DONE"){
                  evtSource.close()
                  setActive(true)
                  alert("It's done")
                }
                else{
                  setProgress(e.data / 100)
                }
                console.log(msg)
              }
            }
          }}>
          <input type="submit" value="Submit" disabled={!active} />
        </form>
        <progress id="progress1" value={progress}></progress>
      </div>
    </Layout>
  )
}

export default EventsPage