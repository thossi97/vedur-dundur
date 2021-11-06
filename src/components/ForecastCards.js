import '../css/cards.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import unixDateBuilder from './utils';
import React, {useState, useEffect} from 'react';

/**
 * 
 * Setja þær uppl sem eiga að vera í hverju cardi
 * Gera eventhandler fyrir mismunandi klst
 * Læra betur á cards, col og rows til að gera cördin responsive
 *   Helst þannig að það eru alltaf 5 í röð lóð eða lárétt
 */


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
