/* eslint-disable */
import React, { useState, useEffect } from 'react'

function Points() {
  //const [sessionData, setSessionData] = useState();
  const [points, setPoints] = useState(false)
  const [clientId, setClientId] = useState(null)
  useEffect(() => {
    fetch('/api/sessions?items=*')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        console.log(res.namespaces.profile?.id?.value)
        if (res.namespaces?.public?.isLoggedIn?.value) {
          setClientId(res.namespaces.profile.id.value)
          setPoints(res.namespaces.profile.points.value)
        }
      })
  })

  useEffect(() => {
    if (clientId) {
      fetch(`/_v/pvt/points/${clientId}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          if (
            res.profile?.public?.isLoggedIn?.value &&
            res.profile.points.value !== points
          ) {
            setPoints(res.profile.points.value)
          }
        })
    }
  })

  return <>{points && <div>Pontos: {points} </div>}</>
}

export default Points
