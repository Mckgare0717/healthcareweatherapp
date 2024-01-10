import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import WeatherList from "../../components/weather/WeatherList";
import HealthList from "../../components/health/HealthList";



const Home = () => {
  
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [health,setHealth] = useState(null) 

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherData(latitude, longitude);
            getHealthData(latitude,longitude)
          },
          (error) => {
            setError("Error getting location: " + error.message);
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser");
        setLoading(false);
      }
    };

    const getWeatherData = async (latitude, longitude) => {
      const API_KEY = "f38da1927783f2c2f89896fd09011d11";
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

      try {
        const response = await axios.get(API_URL);
        setWeatherData(response.data);
      } catch (error) {
        setError("Error fetching weather data: " + error.message);
      } finally {
        setLoading(false);
      }
    };


    const getHealthData = async (latitude,longitude)=>{
      const API_KEY = "f38da1927783f2c2f89896fd09011d11";
      const API_URL = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`

      try {
        const response = await axios.get(API_URL);
        setHealth(response.data);
      } catch (error) {
        setError("Error fetching weather data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    
    
    getLocation();
  }, []); 

console.log(weatherData)
console.log(health)
  return (
    <div className="main-cont">

    
      Welcome to Home page
      <div className="current-cont">
      <div className="weatherMain-cont">
      {loading && <p>Loading...</p>}
      
      {weatherData && (
        <div className="currentWeather">
          <h2>Current Weather</h2>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
          <div className="info-cont">
          <p>Location: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>

        <div className="healthMain-cont">
          {health && (
            <div className="healthCont">
            <h1>Air Quality</h1>
                <h2>Location: {weatherData.name}</h2>
                <h2>AQI: {health.list[0].main.aqi}</h2>
                <h3>Components in the air:</h3>
                <div className="components-cont">
                <h4>co: {health.list[0].components.co}</h4>
                <h4>nh3: {health.list[0].components.nh3}</h4>
                <h4>no: {health.list[0].components.no}</h4>
                <h4>o3: {health.list[0].components.o3}</h4>
                <h4>pm25: {health.list[0].components.pm2_5}</h4>
                <h4>pm10: {health.list[0].components.pm10}</h4>
                <h4>so2: {health.list[0].components.so2}</h4>
                </div>
                

            </div>
          )

          }
        </div>
        </div>
      <div className="weatherHealth-cont">
      <WeatherList/>
      <HealthList/>
      </div>
      
        
        
      
    </div>
  );
};

export default Home;
