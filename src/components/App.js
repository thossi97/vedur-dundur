import '../css/common.css';
import '../css/cards.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ForecastCards.js'
import unixDateBuilder from './utils';
import config from '../config'

import axios from 'axios';

import React, {useState, useEffect} from 'react';
import ForecastCards from './ForecastCards.js';


const api = {
  key_weather: config.weather_key,
  key_geoloc: config.geoloc_key,


  base_pt1: 'https://api.openweathermap.org/data/2.5/onecall?',
  base_pt2: '&exclude=minutely&units=metric&appid=75166bb3bd012843bc1f970bb48fcbe4',
  geoloc: 'https://api.positionstack.com/v1/forward?access_key='

}



function App() {

  const [query, setQuery] = useState("")
  const [coordinates, setCoordinates] = useState({lat: 64.09, long: -21.86})
  const [weather, setweather] = useState({})
  const [forecast, setForecast] = useState([])
  const [loc, setLoc] = useState("Reykjavík")


  const search = evt => {
    if(evt.key === "Enter"){
      axios.get(`${api.geoloc}${api.key_geoloc}&query=${query}`)
      .then((response) => {
        const result = response.data
        setCoordinates({lat:result.data[0].latitude, long: result.data[0].longitude})
        console.log(coordinates)
        setLoc(query)
      })
      .catch(err => {
        console.error('Error', err)
      })
    
    }
  }

  


  useEffect(() => {
    axios.get(`${api.base_pt1}lat=${coordinates.lat}&lon=${coordinates.long}${api.base_pt2}`)
    .then((response) => {
      const result = response.data
      setweather(result)
      setForecast(result.daily.slice(1,6))
      console.log(result)
    })
    .catch(err => {
      console.error('Error', err)
    });
     }, [coordinates]);




  return (
    
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="e.g. Vík, IS"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.current != "undefined" ? (
        <div>

          <div className="location-box">  
            <div className="date">{unixDateBuilder(weather.current.dt)}</div>
            <div className="location">{loc}</div>
          </div>

          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.current.temp)}°C
            </div>
            <div className="weather">
            {weather.current.weather[0].main}
            </div>
          </div> 

        </div>

      
        ): ('')}
    {typeof forecast != "undefined" ? (
     
      <ForecastCards weather={forecast}/>
      ): ('')}

 
      </main>
    </div>
  );
  
}


export default App;
