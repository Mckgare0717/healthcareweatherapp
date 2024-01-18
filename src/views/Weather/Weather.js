import "./Weather.css"
import WeatherList from "../../components/weather/WeatherList.js"
import HealthList from "../../components/health/HealthList.js"


const Weather=()=>{
    return(
        <div className="weatherpage-cont">
            <div className="forecast-cont">
           <input type="text" placeholder="Enter City" className="city-inp"/>
           <p>your City: </p>
           <h4>day 1</h4>
           
           </div>
            <div className="list-cont">
            <WeatherList/>
            <HealthList/>
            </div>
        </div>
    )
}

export default Weather;