import './App.css';
import React, { Component } from 'react'
import {useState} from 'react';
import Map from 'react-map-gl';

let baseURL = ""
if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = "Your heroku backend url here"
}
console.log("Current base URL: ", baseURL)

function App() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    longitude: -122.4,
    latitude: 37.8,
    zoom: 4
  })
  return (
    <Map
        initialViewState={{ ...viewport }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        transitionDuration="200"
         style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      />
  );
}

export default App