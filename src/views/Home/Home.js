import "./Home.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import { BookA, Thermometer } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { SprayCan } from 'lucide-react';
import { Component } from 'lucide-react';
import 'reactjs-popup/dist/index.css';
import WeatherList from "../../components/weather/WeatherList";
import HealthList from "../../components/health/HealthList";
import { AuthContext } from "../../components/ActionContext/ActionContext";
import CheckBox from "../../components/checkbox/CheckBox"
import { HelpCircle } from "lucide-react";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme



const Home = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [health, setHealth] = useState(null)
  const { user } = useContext(AuthContext)
  const [units, setUnits] = useState("metric")
  const [rowData,setRowData] = useState([
    {"Quality":1,"description":"Good"},
    {"Quality":2,"description":"Fair"},
  {"Quality":3,"description":"Moderate"},
  {"Quality":4,"description":"Poor"},
  {"Quality":5,"description":"Very Poor"}])

  const [colData,setColData] = useState([{"field":"Quality"},{"field":"description"}])

  //this fetches data and stores it in a variable to display on the page
  useEffect(() => {
    //this gets the current location
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


    //this function gets weather data using the latitude and longitude from the above function
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

    //this function gets air quality data from API using the latitude and longitude from the getLocation() function
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
    <div className="main-cont">


      {user ? <h1>Welcome {user.name}</h1> : null}






      <div className="current-cont">

        <div className="weatherMain-cont">
          {loading && <p>Loading...</p>}


          {weatherData && (
            <div className="currentWeather">
              <CheckBox text="Imperial" whenChecked={units === "imperial"} onchange={() => setUnits(units === "metric" ? "imperial" : "metric")} />
              <h2>Current Weather</h2>
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
              <div className="info-cont">
                <p><MapPin />: {weatherData?.name}</p>
                <p><Thermometer />: {weatherData.main.temp}{units == "imperial" ? <>°F</> : <>°C</>}</p>
                <p><BookA />: {weatherData.weather[0].description}</p>
              </div>
            </div>
          )}
        </div>

        <div className="healthMain-cont">
          {health && (
            <div className="healthCont">
              <h1>Air Quality</h1>
              <h2><MapPin />: {weatherData?.name}</h2>
              <h2><SprayCan />: {health.list[0].main.aqi}<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="top center"><h3>Air Quality Index</h3><div className="ag-theme-quartz"><AgGridReact rowData={rowData} columnDefs={colData}/></div></Popup></h2>
              <h3><Component />:</h3>
              
              <div className="components-cont">
                <h4><span>Carbon Monoxide <Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Carbon Monoxide</h3>Carbon monoxide (chemical formula CO) is a poisonous, flammable gas that is colorless, odorless, tasteless, and slightly less dense than air.
                  Carbon monoxide consists of one carbon atom and one oxygen atom connected by a triple bond. It is the simplest carbon oxide.
                  In coordination complexes, the carbon monoxide ligand is called carbonyl. It is a key ingredient in many processes in industrial chemistry.[5]
                  [7]
                  .</p></Popup></span>{health.list[0].components.co}μg/m3</h4>
                <h4><span>Ammonia<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Ammonia</h3>Ammonia is an inorganic chemical compound of nitrogen and hydrogen with the formula NH3. A stable binary hydride and the simplest pnictogen hydride, ammonia is a colourless gas with a distinct pungent smell. Biologically, it is a common nitrogenous waste, and it contributes significantly to the nutritional needs of terrestrial organisms by serving as a precursor to fertilisers.[12] Around 70% of ammonia produced industrially is used to make fertilisers[13] in various forms and composition, such as urea and diammonium phosphate.
                  Ammonia in pure form is also applied directly into the soil.</p></Popup> </span>{health.list[0].components.nh3}μg/m3</h4>
                <h4><span>Nitrogen Monoxide<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Nitrogen Monoxide</h3>Nitric oxide (nitrogen oxide or nitrogen monoxide[1]) is a colorless gas with the formula NO. It is one of the principal oxides of nitrogen. Nitric oxide is a free radical: it has an unpaired electron, which is sometimes denoted by a dot in its chemical formula (•N=O or •NO). Nitric oxide is also a heteronuclear diatomic molecule,
                  a class of molecules whose study spawned early modern theories of chemical bonding.</p></Popup> </span>{health.list[0].components.no}μg/m3</h4>
                <h4><span>Ozone<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Ozone</h3>Ozone is an inorganic molecule with the chemical formula O
                  3. It is a pale blue gas with a distinctively pungent smell. It is an allotrope of oxygen that is much less stable than the diatomic allotrope O
                  2, breaking down in the lower atmosphere to O
                  2 (dioxygen). Ozone is formed from dioxygen by the action of ultraviolet (UV) light and electrical discharges within the Earth's atmosphere. It is present in very low concentrations throughout the atmosphere, with its highest concentration high in the ozone layer of the stratosphere,
                  which absorbs most of the Sun's ultraviolet (UV) radiation.</p></Popup></span> {health.list[0].components.o3}μg/m3</h4>
                <h4><span>Fine Particles Matter<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Fine Particles Matter</h3>Particulates or atmospheric particulate matter (see below for other names) are microscopic particles of solid or liquid matter suspended in the air. The term aerosol commonly refers to the particulate/air mixture, as opposed to the particulate matter alone.[1] Sources of particulate matter can be natural or anthropogenic.[2] They have impacts on climate and precipitation that adversely affect human health,
                  in ways additional to direct inhalation.</p></Popup></span> {health.list[0].components.pm2_5}μg/m3</h4>
                <h4><span>Coarse Particles Matter<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Coarse Particles Matter</h3>Particulates or atmospheric particulate matter (see below for other names) are microscopic particles of solid or liquid matter suspended in the air. The term aerosol commonly refers to the particulate/air mixture, as opposed to the particulate matter alone.[1] Sources of particulate matter can be natural or anthropogenic.[2] They have impacts on climate and precipitation that adversely affect human health, in ways additional to direct inhalation.</p></Popup></span> {health.list[0].components.pm10}μg/m3</h4>
                <h4><span>Sulpher dioxide<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Sulpher dioxide</h3>Sulfur dioxide (IUPAC-recommended spelling) or sulphur dioxide (traditional Commonwealth English) is the chemical compound with the formula SO
                  2. It is a toxic gas responsible for the odor of burnt matches. It is released naturally by volcanic activity and is produced as a by-product of copper extraction and the burning of sulfur-bearing fossil fuels.[8] It was known to alchemists as "volatile spirit of sulfur" since at least 16th century.[9]</p></Popup></span> {health.list[0].components.so2}μg/m3</h4>
              </div>


            </div>
          )

          }
        </div>
      </div>
      <div className="weatherHealth-cont">
        <WeatherList />
        <HealthList />
      </div>




    </div>
  );
};

export default Home;
