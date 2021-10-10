import React, { useEffect, useState, useContext, useRef } from "react"
import Axios from "axios"

// Context
import StateContext from "../StateContext"
import ActionContext from "../ActionContext"

function Search() {
  const appState = useContext(StateContext)
  const setState = useContext(ActionContext)
  const [formField, setFormField] = useState("")
  const [domain, setDomain] = useState("")
  const search = useRef(null)

  useEffect(() => {
    search.current.focus()
    setState(draft => {
      draft.requestCount++
    })
  }, [])

  useEffect(() => {
    if (appState.requestCount) {
      try {
        async function fecthData() {
          Axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_5BWXLctm4VuiClA6CR5aGgOEleM29&ipAddress=${formField}&domain=${domain}`)
            .then(response => {
              setState(draft => {
                draft.data.ip = response.data.ip
                ;(draft.data.location = response.data.location.city + ", " + response.data.location.country), (draft.data.timezone = response.data.location.timezone)
                draft.data.isp = response.data.isp
                draft.location.lat = response.data.location.lat
                draft.location.lng = response.data.location.lng
                draft.mapIsReady = true
                draft.mapRenderCount++
              })
            })
            .catch(() => {
              alert("Invalid request. Please try again!")
              setFormField("")
              setDomain("")
              setState(draft => {
                draft.requestCount++
              })
            })
        }
        fecthData()
      } catch (e) {
        alert("Something went wrong. Please try again")
      }
    }
  }, [appState.requestCount])

  //functions
  function formHandler(e) {
    e.preventDefault()

    if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(formField)) {
      let cleanedSearch = formField
      if (/https:/.test(cleanedSearch)) {
        cleanedSearch = cleanedSearch.replace("https://", " ")
      }

      if (/\//.test(cleanedSearch)) {
        cleanedSearch = cleanedSearch.replace("/", " ")
      }

      setDomain(cleanedSearch)
      setFormField("")
    }
    setState(draft => {
      draft.requestCount++
      draft.mapIsReady = false
    })
  }

  return (
    <>
      <div className="search">
        <form onSubmit={formHandler}>
          <input onChange={e => setFormField(e.target.value)} type="text" name="search" placeholder="Search for any IP address or domain" value={formField} ref={search} />
          <button className="button"></button>
        </form>
      </div>
      <div className="information-fields">
        <div className="field">
          <div className="info-name">IP ADDRESS</div>
          <div className="info">{appState.data.ip}</div>
        </div>
        <div className="field">
          <div className="info-name">LOCATION</div>
          <div className="info">{appState.data.location}</div>
        </div>
        <div className="field">
          <div className="info-name">TIMEZONE</div>
          <div className="info">{appState.data.timezone}</div>
        </div>
        <div className="field">
          <div className="info-name">ISP</div>
          <div className="info">{appState.data.isp}</div>
        </div>
      </div>
    </>
  )
}

export default Search
