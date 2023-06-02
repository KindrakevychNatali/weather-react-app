import React, {useState} from "react";
import axios from "axios";

function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')
  const [error, setError] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e8fad470edd67a377963b4f789708516`

  //const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e8fad470edd67a377963b4f789708516`

  const searchLocation = (event) => {
    
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        setLocation('');
      })
      .catch((error) => {
        setError(error.response.status);
        console.log(error);
      });
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input 
        tabIndex="0"
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='Enter Location'
        type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
          </div>
          <div className="temp">
          {data.main ? <h1>{Math.round(data.main.temp - 273.5)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{Math.round(data.main.feels_like - 273.5)}°C</p> : null}
            <p>
              Feels like
            </p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>
              Humidity
            </p>
          </div>
          <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed}MPH</p> : null}
            <p>
              Wind speed
            </p>
           </div>
         </div>
        }
      <div>
       {error === 404 && <p className="error">Wrong location name. Check if name is correct and try again please...</p>}
      </div>
      </div>
    </div>
  );
}

export default App;
