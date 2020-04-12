import * as React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { useState, useEffect } from "react"

/*

  https://www.gatsbyjs.org/docs/data-fetching/

*/

const UpdatesPage = () => {
  const installedVer = "unknown";
  const [latestVer, setLatestVer] = useState(0);
  const [msg, setMsg] = useState("dummy")
  const [progress, setProgress] = useState(0.0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    // get data
    fetch(`/version.json`)
      .then(response => response.json())
      .then(resultData => {
        setLatestVer(resultData.latest)
      })
  }, [])

  return (
    <Layout>
      <div>
        <p>{msg}</p>
      </div>
      <div>
        <p>Installed version is {installedVer}</p>
      </div>
      <div>
        <p>Latest version is {latestVer}</p>
      </div>
      <div>
        <form
          onSubmit={event => {
            event.preventDefault()
            //fetch("/update?download="+latestVer).then(response => response.text()).then(text => {alert(text)})
            setActive(false)
            var evtSource = new EventSource("/update?download=" + latestVer)
            evtSource.onmessage = function (e) {
              //setMsg(e.data)
              if(e.data ==  "DONE"){
                evtSource.close()
                setActive(true)
                alert("It's done")
              }
              else{
                setProgress(e.data / 100)
              }
            }
          }}>
          <input type="submit" value="download" disabled={!active} />
          <progress id="progress1" value={progress}></progress>
        </form>
      </div>
      <div>
        <p></p>
      </div>
      <div>
        <Link className="btn btn-outline-secondary" to="/updates">Update</Link>
      </div>
    </Layout>
  )
}

export default UpdatesPage