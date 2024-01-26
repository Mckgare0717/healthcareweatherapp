import "./Weather.css"
import WeatherList from "../../components/weather/WeatherList.js"
import HealthList from "../../components/health/HealthList.js"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Droplets, Thermometer,Sun } from 'lucide-react';
import { Search } from 'lucide-react';


const Weather = () => {

    const [weather, setWeather] = useState([])
    const [currentSlide, setCurrentslide] = useState(0)
    const long = useRef(null)
    const lat = useRef(null)
    const [forecast, setForecast] = useState([])
    const [error, setError] = useState(null)
    const [input, setInput] = useState("")
    const [fiveForecasts,setFiveForecasts] = useState([])
    const inputArray = input.split(",")
    const [location, setLocation] = useState([])
    const [loading,setLoading] = useState(true)

    const API_KEY = "f38da1927783f2c2f89896fd09011d11"
    async function getForecast(e) {
        e.preventDefault()
        let city = inputArray[0];
        let country = inputArray[1];
        // setCity(inputArray[0])
        // setCountry(inputArray[1])


        // alert(`city: ${city}   coutry: ${country}`)
        let path = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${API_KEY}`;
        

        await axios.get(path).then((res) => {
            

            lat.current = res.data[0].lat;
            long.current = res.data[0].lon
            

            setLocation(res.data)


        }).catch((error) => {
            console.error("error fetching data ", error)
        })

        
        await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat.current}&lon=${long.current}&exclude="hourly,minutely"&appid=${API_KEY}&units=metric`).then((res) => {
            
        
            setForecast(res.data.daily)
            setFiveForecasts(res.data.daily)
            setWeather(res.data)
            setLoading(false)
            
        }).catch((error) => {
            console.error("error fetching data", error)
        })


    }
    
    function slideNext() {
        setCurrentslide((pervSlide) => (pervSlide + 1) % fiveForecasts.length)
    }

    function slidePrev() {
        const count =0 
        if (count <0){
            setCurrentslide((count) => (count + 1) % fiveForecasts.length)
        }else{
            setCurrentslide((count) => (count - 1) % fiveForecasts.length)
        }
        
    }

    const getFormattedDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };


    useEffect(() => {
        const getLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherData(latitude, longitude);
                
              },
              (error) => {
                setError("Error getting location: " + error.message);
                setLoading(false)
              }
            );
          } else {
            setError("Geolocation is not supported by your browser");
            setLoading(false)
          }
        };
    
        const getWeatherData = async (latitude, longitude) => {
         
          const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude="hourly,minutely"&appid=${API_KEY}&units=metric`;
          const locApi = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}`
    
          try {
            const response = await axios.get(API_URL);
            setFiveForecasts(response.data.daily);

            const locResponse = await axios.get(locApi)
            setLocation(locResponse.data)
          } catch (error) {
            setError("Error fetching weather data: " + error.message);
          } finally {
            setLoading(false);
          }
        }


        getLocation()
    }, []); 


    if (loading) {
        return(
            <div> Loading... </div>
        )
    }



    return (
        <div className="weatherpage-cont">
            <div className="forecast-cont">
            <h1>Forecast: </h1>
                <form onSubmit={(e) => getForecast(e)} class="search-container">
                    <h4>Enter your city: </h4>
                    <input type="text" name="City" placeholder="Enter City" value={input} onChange={(e) => setInput(e.target.value)} class="search-input" />
                    <button type="submit" class="search-btn">
                        <Search color="#4BCCDE" />
                    </button>
                </form>
                
                {
                    fiveForecasts ? <>
                        
                        <h1> {location[0]?.name} </h1>
                        <h1>{location[0]?.country}</h1>
                        <div className="days-columns-container-full">
                        <button onClick={slidePrev}>Prev Day</button>
                        <div className="days-columns-container">
                            <h4>Date: {getFormattedDate(fiveForecasts[currentSlide]?.dt)} </h4>
                            <img src={`https://openweathermap.org/img/wn/${fiveForecasts[currentSlide]?.weather[0]?.icon}@2x.png`} alt={fiveForecasts[currentSlide]?.weather[0]?.description} />
                            <h4><Thermometer/>temp during morning: {fiveForecasts[currentSlide]?.temp?.morn}°C</h4>
                            <h4><Thermometer/>temp during day: {fiveForecasts[currentSlide]?.temp?.day}°C</h4>
                            <h4><Thermometer/>temp during evening: {fiveForecasts[currentSlide]?.temp?.eve}°C</h4>
                            <h4><Thermometer/>temp during night: {fiveForecasts[currentSlide]?.temp?.night}°C</h4>
                            <h4><Droplets/>Humidity: {fiveForecasts[currentSlide]?.humidity}°C</h4>
                            <h4><Sun/>UVI: {fiveForecasts[currentSlide]?.uvi}UV</h4>
                            <p>Summary: {fiveForecasts[currentSlide]?.summary}</p>
                            
    
                        </div>
                        <button onClick={slideNext}>Next Day</button>
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
