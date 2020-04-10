import * as React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { useState, useEffect } from "react"

/*

  https://www.gatsbyjs.org/docs/data-fetching/

*/

  // Wrapped like this so that Gatsby build doesn't try and run this.
  if (typeof window !== `undefined`) {
    
    var evtSource = new EventSource('/event');
    console.log(evtSource)
  }


const EventsPage = () => {  

  const [msg, setMsg] = useState("dummy");

if (typeof window !== `undefined`) {
    evtSource.onmessage = function(e) {
      setMsg(e.data)
      console.log(msg)
    }
  }
return (
<Layout>
    <div>
        <p>Message is {msg}</p>
    </div>
</Layout>
)
}

export default EventsPage