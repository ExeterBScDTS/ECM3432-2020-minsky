import * as React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { useState, useEffect } from "react"


const EventsPage = () => {

  const [msg, setMsg] = useState("dummy")
  
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
            console.log(evtSource)
            // Wrapped like this so that Gatsby build doesn't try and run this.
            if (typeof window !== `undefined`) {
              evtSource.onmessage = function (e) {
                setMsg(e.data)
                if(e.data ==  "DONE"){
                  evtSource.close()
                  alert("It's done")
                }
                console.log(msg)
              }
            }
          }}>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </Layout>
  )
}

export default EventsPage