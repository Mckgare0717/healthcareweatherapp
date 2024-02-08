import "./Profile.css"
import { AuthContext } from "../../components/ActionContext/ActionContext";
import { useContext } from "react";
import avatar from "../../assets/images.jfif"
import { useState, useEffect } from "react";
import axios from "axios";
import { BookA, Thermometer } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { SprayCan } from 'lucide-react';
import { Component } from 'lucide-react';
import CheckBox from "../../components/checkbox/CheckBox";
import { TitleTab } from "../../components/TitleTab";


const ProfilePage = () => {
    TitleTab("Health Advice Group | Profile")
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [health, setHealth] = useState(null)
    const [units,setUnits] = useState("metric")
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        getWeatherData(latitude, longitude);
                        getHealthData(latitude, longitude)
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
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`;

            try {
                const response = await axios.get(API_URL);
                setWeatherData(response.data);
            } catch (error) {
                setError("Error fetching weather data: " + error.message);
            } finally {
                setLoading(false);
            }
        };


        const getHealthData = async (latitude, longitude) => {
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
    }, [units]);

    return (
        <div className="profile-page">
        <div className="weatherMain-cont-prf">
      {loading && <p>Loading...</p>}
      <CheckBox text="Imperial" whenChecked={units==="imperial"} onchange={()=>setUnits(units==="metric"?"imperial":"metric")}/>
      {weatherData && (
        <div className="currentWeather">
          <h2>Current Weather</h2>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
          <div className="info-cont">
          <p><MapPin/>: {weatherData?.name}</p>
          <p><Thermometer/>: {weatherData.main.temp}{units=="imperial"?<>°F</>:<>°C</>}</p>
          <p><BookA/>: {weatherData.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
            <div className="profile-cont">
                <img src={avatar} alt="test-icon" />
                <h4>Name: {user.name}</h4>
                <h4>Email: {user.email}</h4>
            </div>
           

        <div className="healthMain-cont-prf">
          {health && (
            <div className="healthCont-prf">
            <h1>Air Quality</h1>
                <h2><MapPin/>: {weatherData?.name}</h2>
                <h2><SprayCan/>: {health.list[0].main.aqi}</h2>
                <h3><Component/>:</h3>
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
    )
}


export default ProfilePage;