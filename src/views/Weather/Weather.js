import "./Weather.css"
import WeatherList from "../../components/weather/WeatherList.js"
import HealthList from "../../components/health/HealthList.js"
import { useState, useRef } from "react"
import axios from "axios"


const Weather = () => {

    const [weather, setWeather] = useState([])
    const [city, setCity] = useState("")
    // const [long,setLong] = useState(null)
    // const [lat,setlat] = useState(null)
    const long = useRef(null)
    const lat = useRef(null)
    const [forecast, setForecast] = useState([])
    const [error, seterror] = useState(null)
    const fiveForecasts = forecast.slice(0, 5)

    const API_KEY = "f38da1927783f2c2f89896fd09011d11"

    async function getForecast() {
        await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q="hounslow"&limit=${1}&appid=${API_KEY}`).then((res) => {
            // setlat(res.data[0].lat)
            // setLong(res.data[0].long)
            lat.current = res.data[0].lat;
            long.current = res.data[0].lon

        }).catch((error) => {
            console.error("error fetching data ", error)
        })

        await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat.current}&lon=${long.current}&appid=${API_KEY}`).then((res) => {
            
            setForecast(res.data.list)
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
                <button onClick={getForecast}>test</button>
                <input type="text" placeholder="Enter City" className="city-inp" />


                <p>your City Forecast: </p>
                <div className="days-columns-container">
                
                    {
                        fiveForecasts.map((item) => {
                            return <div className="days-cont">
                                <h4>date: {getFormattedDate(item.dt)}</h4>
                                <h4>1</h4>
                                <h4>1</h4>
                                <h4>1</h4>
                                <h4>1</h4>
                            </div>

                        })
                    }
                </div>

            </div>


            <div className="list-cont">
                <WeatherList />
                <HealthList />
            </div>
        </div>
    )
}

export default Weather;