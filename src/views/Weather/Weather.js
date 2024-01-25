import "./Weather.css"
import WeatherList from "../../components/weather/WeatherList.js"
import HealthList from "../../components/health/HealthList.js"
import { useState, useRef, useEffect } from "react"
import axios from "axios"

import { Search } from 'lucide-react';


const Weather = () => {

    const [weather, setWeather] = useState([])
    // const [city, setCity] = useState("")
    const [currentSlide, setCurrentslide] = useState(0)
    const long = useRef(null)
    const lat = useRef(null)
    const [forecast, setForecast] = useState([])
    const [error, seterror] = useState(null)
    const [input, setInput] = useState("")
    const [fiveForecasts,setFiveForecasts] = useState([])
    // const [country, setCountry] = useState("")
    const inputArray = input.split(",")
    const [location, setLocation] = useState([])

    


    const API_KEY = "f38da1927783f2c2f89896fd09011d11"


    async function getForecast(e) {
        e.preventDefault()
        let city = inputArray[0];
        let country = inputArray[1];
        // setCity(inputArray[0])
        // setCountry(inputArray[1])


        alert(`city: ${city}   coutry: ${country}`)
        let path = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${API_KEY}`;
        // alert(path)

        await axios.get(path).then((res) => {
            // setlat(res.data[0].lat)
            // setLong(res.data[0].long)

            lat.current = res.data[0].lat;
            long.current = res.data[0].lon
            console.log(res.data)
            setLocation(res.data)


        }).catch((error) => {
            console.error("error fetching data ", error)
        })

        console.log(`lat: ${lat.current} long: ${long.current}`)
        await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat.current}&lon=${long.current}&exclude="hourly,minutely"&appid=${API_KEY}&units=metric`).then((res) => {
            console.log("inside the forecast api")
            setForecast(res.data.daily)
            setFiveForecasts(res.data.daily.slice(0,5))
            console.log(res.data.daily.slice(0,5))
            setWeather(res.data)
            console.log(res.data)

            
        }).catch((error) => {
            console.error("error fetching data", error)
        })



    }


    
    function slideNext() {
        setCurrentslide((pervSlide) => (pervSlide + 1) % fiveForecasts.length)
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
                
                {
                    fiveForecasts ? <>
                        <p> {location[0]?.name} </p>
                        <h4>{location[0]?.country}</h4>
                        <div className="days-columns-container-full">
                        <div className="days-columns-container">
                            <h4>Date: {getFormattedDate(fiveForecasts[currentSlide]?.dt)} </h4>
                            <img src={`https://openweathermap.org/img/wn/${fiveForecasts[currentSlide]?.weather[0]?.icon}@2x.png`} alt={fiveForecasts[currentSlide]?.weather[0]?.description} />
                            <h4>temp during morning: {fiveForecasts[currentSlide]?.temp?.morn}</h4>
                            <h4>temp during day: {fiveForecasts[currentSlide]?.temp?.day}</h4>
                            <h4>temp during evening: {fiveForecasts[currentSlide]?.temp?.eve}</h4>
                            <h4>temp during night: {fiveForecasts[currentSlide]?.temp?.night}</h4>
                            <h4>Summary: {fiveForecasts[currentSlide]?.summary}</h4>
                            
                            
                        </div>
                        <button onClick={slideNext}>next</button>
                        </div>
                    </>
                    : <>
                     null
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






<div id="openweathermap-widget-15"></div>


{/* <script>window.myWidgetParam ? window.myWidgetParam : 
window.myWidgetParam = [];  
window.myWidgetParam.push({id: 15,cityid: '2643743',appid: 'f38da1927783f2c2f89896fd09011d11',units: 'metric',containerid: 'openweathermap-widget-15',  });  
(function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();
</script> */}