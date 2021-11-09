

// format: 1 for full date, 0 for just name of day
export function unixDateBuilder(unix_timestamp) {
    let d = new Date(unix_timestamp*1000)
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    
    let hours = d.getHours()
    let minutes = ""+d.getMinutes()

    if(minutes==="0"){
      minutes="00"
    }

    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return {
      full: ""+day+" "+date+" "+month+" "+year,
      day: day.slice(0,3),
      hour: hours+":"+minutes

    }
    
 
  }

export function windDirectionConverter(wind_deg) {
    let val = Math.floor((wind_deg / 22.5) + 0.5);
    let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }

