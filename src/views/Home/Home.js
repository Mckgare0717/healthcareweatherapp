import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const API_KEY = "f38da1927783f2c2f89896fd09011d11";

  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  const locationsList = [
    {
        "location": "London",
        "latitude": 51.509865,
        "longitude": -0.118092
    },
    {
        "location": "Manchester",
        "latitude": 53.483959,
        "longitude": -2.244644
    },
    {
        "location": "Edinburgh",
        "latitude": 55.953251,
        "longitude": -3.188267
    },
    {
        "location": "Birmingham",
        "latitude": 52.4862,
        "longitude": -1.8904
    },
    {
        "location": "Glasgow",
        "latitude": 55.8642,
        "longitude": -4.2518
    },
    {
        "location": "Bristol",
        "latitude": 51.4545,
        "longitude": -2.5879
    },
    {
        "location": "Cardiff",
        "latitude": 51.4816,
        "longitude": -3.1791
    },
    {
        "location": "Liverpool",
        "latitude": 53.4084,
        "longitude": -2.9916
    },
    {
        "location": "Oxford",
        "latitude": 51.7520,
        "longitude": -1.2577
    },
    {
        "location": "Cambridge",
        "latitude": 52.2053,
        "longitude": 0.1218
    }
]
  function getWeather() {
    setIsLoading(true);

    Promise.all(
      locationsList.map((location) =>
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`
          )
          .then((res) => res.data)
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            return null;
          })
      )
    )
      .then((data) => {
        setWeather(data.filter((item) => item !== null));
        
      })
      .finally(() => {
        setIsLoading(false);
      });

      
  }

  console.log(weather)
  

  

  if (isLoading) {
    return <h3>Loading.....</h3>;
  }

  return (
    <div className="main-cont">

    
      Welcome to Home page
      <div className="Weather-cont">
        <h2>Weather</h2>

        <button onClick={() => getWeather()}>Test</button>
        <div className="weather-cont">
        {weather.map((location) => (
          <div className="diff-weather active" key={location.id}>
            <h4>{location.name}</h4>
            <h4>Temp:{location.main.temp}</h4>
            <h4>{location.weather[0].description}</h4>
            <img src={ `https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`} alt={location.weather[0].description}/>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
