// https://javascript.plainenglish.io/leaflet-map-with-react-part-i-4ef4ecbdcc1b
// https://account.mapbox.com/

import React, { useEffect, useContext } from "react"
import ReactDOM from "react-dom"
import { useImmer } from "use-immer"

// Context
import StateContext from "./StateContext"
import ActionContext from "./ActionContext"

// Components
import Map from "./components/Map"
import Search from "./components/Search"
import Loading from "./components/Loading"

function Main() {
  const [information, setInformation] = useImmer({
    data: {
      ip: "...",
      location: "...",
      timezone: "...",
      isp: "..."
    },
    location: {
      lat: 0,
      lng: 0
    },
    requestCount: 0,
    mapRenderCount: 0,
    mapIsReady: false
  })

  return (
    <StateContext.Provider value={information}>
      <ActionContext.Provider value={setInformation}>
        <div className="header">
          <div className="container">
            <h1>IP Adress Tracker</h1>
            <Search />
          </div>
        </div>
        {information.mapIsReady ? <Map /> : <Loading />}
      </ActionContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept()
}
