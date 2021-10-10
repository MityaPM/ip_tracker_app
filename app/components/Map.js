import React, { useEffect, useContext, useRef } from "react"
import L from "leaflet"

// Context
import StateContext from "../StateContext"
import ActionContext from "../ActionContext"

// Vars

function Map() {
  const map = useRef(null)
  const appState = useContext(StateContext)
  const setState = useContext(ActionContext)
  const lat = appState.location.lat
  const lng = appState.location.lng

  useEffect(() => {
    if (appState.mapIsReady) {
      let mymap = L.map(map.current).setView([lat, lng], 13)

      L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWl0ZWFsZWtzIiwiYSI6ImNrdWw2ZGUxejA2bTAybnRoNXRwYXJyNWgifQ.MWlj7dULlfS2WpKKshNH3g", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoibWl0ZWFsZWtzIiwiYSI6ImNrdWw2ZGUxejA2bTAybnRoNXRwYXJyNWgifQ.MWlj7dULlfS2WpKKshNH3g"
      }).addTo(mymap)

      let myIcon = L.icon({
        iconUrl: "./images/icon-location.svg",
        iconSize: [55, 70]
      })

      L.marker([lat, lng], { icon: myIcon }).addTo(mymap)

      console.log("Rendering map")
    }
  }, [appState.mapRenderCount])

  return <div id="mapid" ref={map}></div>
}

export default Map
