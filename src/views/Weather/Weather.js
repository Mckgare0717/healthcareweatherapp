import "./Weather.css"
import WeatherList from "../../components/weather/WeatherList.js"
import HealthList from "../../components/health/HealthList.js"
import { useState, useRef } from "react"
import axios from "axios"

import { Search } from 'lucide-react';


const Weather = () => {

    const [weather, setWeather] = useState([])
    const [city, setCity] = useState("")
    // const [long,setLong] = useState(null)
    // const [lat,setlat] = useState(null)
    const long = useRef(null)
    const lat = useRef(null)
    const [forecast, setForecast] = useState([])
    const [error, seterror] = useState(null)
    const [input, setInput] = useState("")
    const fiveForecasts = forecast.slice(0, 5)

    const API_KEY = "f38da1927783f2c2f89896fd09011d11"


    async function getForecast(e) {
        e.preventDefault()
        setCity(input)
        


        await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`).then((res) => {
            // setlat(res.data[0].lat)
            // setLong(res.data[0].long)
            lat.current = res.data[0].lat;
            long.current = res.data[0].lon

        }).catch((error) => {
            console.error("error fetching data ", error)
        })

        await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat.current}&lon=${long.current}&exclude="hourly,minutely"&appid=${API_KEY}&units=metric`).then((res) => {

            setForecast(res.data.daily)
            const fiveForecasts = forecast.slice(0, 5)
            console.log(fiveForecasts)
            setWeather(res.data)
            console.log(weather)
        }).catch((error) => {
            console.error("error fetching data", error)
        })
    }



    const getFormattedDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };


    return (
        <div className="weatherpage-cont">
            <div className="forecast-cont">
                <form onSubmit={(e) => getForecast(e)} class="search-container">
                    <h4>Enter your city: </h4>
                    <input type="text" name="City" placeholder="Enter City" value={input} onChange={(e) => setInput(e.target.value)} class="search-input" />
                    <button type="submit" class="search-btn">
                        <Search color="#4BCCDE" />
                    </button>
                </form>
                {/* <div className="input-field">
                    <input type="text" placeholder="Enter City" className="city-inp" />
                    <button onClick={getForecast}>test</button>
                </div> */}
                {
                    fiveForecasts!== null && <>
                    <p>your City Forecast: </p>
                        <div className="days-columns-container">
                        
                            {
                                fiveForecasts.map((item) => {
                                    return <div className="days-cont">
                                        <h4>date: {getFormattedDate(item.dt)}</h4>
                                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description}/>
                                        <h4>temp during morning: {item.temp.morn}</h4>
                                        <h4>temp during day: {item.temp.day}</h4>
                                        <h4>temp during evening: {item.temp.eve}</h4>
                                        <h4>temp during night: {item.temp.night}</h4>
                                        <h4>Summary: {item.summary}</h4>
                                    </div>

                                })
                            }
                        </div>
                    </>
                }

            </div>


            <div className="list-cont">
                <WeatherList />
                <HealthList />
            </div>
        </div>
    )
}

export default Weather;