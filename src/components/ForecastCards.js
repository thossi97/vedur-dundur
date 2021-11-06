import '../css/cards.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import unixDateBuilder from './utils';
import React, {useState, useEffect} from 'react';


function ForecastCards (props){




    return(
        <div className="container">

            <div className="row my-4">
              <div className="col">
                
                  <div className="container-fluid">
                    <div className="row">
                   { props.weather.map((weather) => (
                      <div key={weather.dt} className="col-sm d-flex">
                        <div key={weather.moonrise} className="card card-body flex-fill">
                          <h3 key="date" className="weather">{unixDateBuilder(weather.dt)}</h3>
                          <img key="icon" src="#" alt="logo"></img>
                        </div>
                      </div>
                   ))}
                    </div>
                  </div>
                </div>
              </div>
    
            </div>


    )

}


export default ForecastCards;
