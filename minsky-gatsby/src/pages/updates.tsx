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
                <p>Installed version is {installedVer}</p>
            </div>
            <div>
                <p>Latest version is {latestVer}</p>
            </div>
            <div>
                <Link className="btn btn-outline-secondary" to={"/update?download="+latestVer}>Download latest</Link>
  <form
    onSubmit={event => {
      event.preventDefault()
      fetch("/update?download="+latestVer).then(response => response.text()).then(text => {alert(text)})
    }}
  >
    {/* (skip form inputs for brevity) */}
    <input type="submit" value="Submit" />
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