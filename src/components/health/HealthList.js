import "./healthList.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { SprayCan } from 'lucide-react';
import { MapPin } from 'lucide-react';

const HealthList = () => {
  const API_KEY = "f38da1927783f2c2f89896fd09011d11";

  const [isLoading, setIsLoading] = useState(false);
  const [health, setHealth] = useState([])


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


  function getHealth() {
    Promise.all(
      locationsList.map((location) =>
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`
          )
          .then((res) => ({ location, health: res.data }))
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            return null;
          })
      )
    )
      .then((data) => {
        setHealth(data.filter((item) => item !== null));

      })
      .finally(() => {
        setIsLoading(false);
      });


  }

  useEffect(() => {
    getHealth()
  }, [])


  if (isLoading) {
    return <h3>Loading.....</h3>;
  }

  return (

    <div className="Health-cont">
      <h2>Air Quality</h2>

      {/* <button onClick={() => getHealth()}>Test</button> */}

      <div className="health-cont">
        {health.map(({ location, health }) => (
          <div className="diff-health active" key={location.location}>
            <h4><MapPin />:{location.location}</h4>
            <div className="aqi">
              <SprayCan />
              <h4>Aqi: {health.list[0].main.aqi}</h4>
            </div>

            <Popup on={['hover', 'focus']} trigger={<button className="trigger-btn">View Components</button>} position="right center">

              <div className="health-popup">
                <h4>Components: </h4>
                <div className="popup-group">
                  <label for="co">CO:</label>
                  <h4 id="co">{health.list[0].components.co}</h4>
                  <progress id="co" value={health.list[0].components.co} max="300"> {health.list[0].components.co}% </progress>
                </div>
                <div className="popup-group">
                  <label for="nh3">NH3:</label>
                  <h4 id="nh3">{health.list[0].components.nh3}</h4>
                  <progress id="nh3" value={health.list[0].components.nh3} max="10"> {health.list[0].components.nh3}% </progress>
                </div>
                <div className="popup-group">
                  <label for="no">NO:</label>
                  <h4 id="no">{health.list[0].components.no}</h4>
                  <progress id="no" value={health.list[0].components.no} max="10"> {health.list[0].components.no}% </progress>
                </div>
                <div className="popup-group">
                <label for="no2">NO2:</label>
                <h4 id="no2">{health.list[0].components.n2o}</h4>
                <progress id="no2" value={health.list[0].components.no2} max="100"> {health.list[0].components.no2}% </progress>
              </div>
              <div className="popup-group">
                <label for="o3">O3:</label>
                <h4 id="o3">{health.list[0].components.o3}</h4>
                <progress id="o3" value={health.list[0].components.o3} max="100"> {health.list[0].components.o3}% </progress>
              </div>
              <div className="popup-group">
                <label for="pm2_5">PM25:</label>
                <h4 id="pm2_5">{health.list[0].components.pm2_5}</h4>
                <progress id="pm2_5" value={health.list[0].components.pm2_5} max="10"> {health.list[0].components.pm2_5}% </progress>
              </div>
              <div className="popup-group">
                <label for="pm10">PM10:</label>
                <h4 id="pm10">{health.list[0].components.pm10}</h4>
                <progress id="pm10" value={health.list[0].components.pm10} max="10"> {health.list[0].components.pm10}% </progress>
              </div>
              <div className="popup-group">
                <label for="so2">SO2:</label>
                <h4 id="so2">{health.list[0].components.so2}</h4>
                <progress id="so2" value={health.list[0].components.so2} max="10"> {health.list[0].components.so2}% </progress>
              </div>
          </div>
              
            </Popup>


    </div>
  ))
}
      </div >
    </div >
  )
}

export default HealthList;