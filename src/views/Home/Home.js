import "./Home.css"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = () => {

    //const API_KEY = "f38da1927783f2c2f89896fd09011d11"

    const [weather, setWeather] = useState([])
    const [location, setLocation] = useState({})
    const [isloading, setIsLoading] = useState(true)
    const [toLocation, setToLocation] = useState([])

    const locationsLst = [
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





    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }


    }, [])

    useEffect(() => {
        function getWeather(){
            locationsLst.map((locations)=>(
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locations.latitude}&lon=${locations.longitude}&appid=${API_KEY}`).then((res) => {
                    console.log(res.data)
                    setIsLoading(false)
                    setToLocation(res.data)
                }).catch((error) => {
                    console.log("fuck off")
                })
            ))
            console.log(toLocation)
        }
        
        

    }, [API_KEY, locationsLst])


    if (isloading) {
        return (
            <h3>Loading.....</h3>
        )
    }





    return (
        <div className="main-cont">
            Welcome to Home page
            
            
                <div className="Weather-cont">

                    <h2>Weather</h2>
                    <button onClick={()=>getWeather()}
                    {
                toLocation.map((locData)=>(
                    <div className="diff-weather">
                        <h4>{locData.name}</h4>
                        <h4>{locData.main["temp"]}</h4>

                    </div>
                ))
            }
                    
                </div>
            



        </div>
    )
}


export default Home;