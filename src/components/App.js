import '../css/common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowMoreText from "react-show-more-text";
import './ForecastCards.js'
import {unixDateBuilder, windDirectionConverter} from './utils';
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

const warningicon = 'images/alert/warningicon.png'

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
        setLoc(result.data[0].name)
      })
      .catch(err => {
        console.error('Error', err)
        alert("no resuts")
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


  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  }

  
  const breakLine = (input) => {

    const arr = input.split('\n');
    const resultArr = [];
    arr.forEach((item, i) => {
      if(i%2===1) resultArr.push(<br />);
      resultArr.push(item);  
    });
    return (
      <p key="alert"className="alert-text"> {resultArr} </p>)
    }

  
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
        {typeof weather.alerts != "undefined" ? (
        <div className="alert-box">
          <div className="container-fluid'">
            <div className="row justify-content-center">
              <div  className="col-xs-12  col-sm-12 col-md-10 col-lg-10">
                <div className="card">
                  <img  className="card-img " src={warningicon} alt="logo"></img>
                  <div className="card-body">
                    <ShowMoreText
                        // Default options 
                        lines={1}
                        more="Show more"
                        less="Show less"
                        className="card-text"
                        anchorClass="my-anchor-css-class"
                        onClick={executeOnClick}
                        expanded={false}
                        width={/*breyta*/ 0}
                        truncatedEndingComponent={"... "}
                    >
                      {breakLine(weather.alerts[0].description ) }
                    </ShowMoreText>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>      
        </div>
 ): ('')}
        {typeof weather.current != "undefined" ? (
        <div>

          <div className="location-box">  
            <div className="date">{unixDateBuilder(weather.current.dt).full}</div>
            <div className="location">{loc}</div>
          </div>

          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.current.temp)}°C
            </div>
            <div className="weather">
            {weather.current.weather[0].main}
            </div>
            <div className="details">
              <div className="wind">
                <p>{windDirectionConverter(weather.current.wind_deg)+" "+weather.current.wind_speed+" m/s"}</p>
              </div>
              <div className="humidity">
                <p>{weather.current.humidity+"%"}</p>
              </div>
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
