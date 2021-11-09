import '../css/cards.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {unixDateBuilder} from './utils';
import React, {useState, useEffect} from 'react';
//import card_icons from '../assets'


function ForecastCards (props){



    return(
  
                
                  <div className="container-fluid'">
                    <div className="row justify-content-center">
                   { props.weather.map((weather) => (
                      <div key={weather.sunrise} className="col-xs-12  col-sm-12 col-md-2 col-lg-2">
                        <div key="card" className="card-body">
                          <img key="icon" className="card-img-top" src={'images/card_icons/'+weather.weather[0].main+'.png'} alt="logo"></img>
                          <div key="card-body" className="card-body">
                            <h3 key="date" className="card-date">{unixDateBuilder(weather.dt).day}</h3>
                            <h3 key="temp" className="temp">{Math.round(weather.temp.day)}°C</h3>
                          </div>
                        </div>
                      </div>
                   ))}
                    </div>
                  </div>
                
    
    )

}


export default ForecastCards;
