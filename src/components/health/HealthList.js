import "./healthList.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { SprayCan } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { HelpCircle } from 'lucide-react';

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
                  <label for="co">Carbon Monoxide :<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Carbon Monoxide</h3>Carbon monoxide (chemical formula CO) is a poisonous, flammable gas that is colorless, odorless, tasteless, and slightly less dense than air.
                    Carbon monoxide consists of one carbon atom and one oxygen atom connected by a triple bond. It is the simplest carbon oxide.
                    In coordination complexes, the carbon monoxide ligand is called carbonyl. It is a key ingredient in many processes in industrial chemistry.[5]
                    [7]
                    .</p></Popup></label>
                  <h4 id="co">{health.list[0].components.co}μg/m3</h4>
                  <progress id="co" value={health.list[0].components.co} max="300"> {health.list[0].components.co}% </progress>
                </div>
                <div className="popup-group">
                  <label for="nh3">Ammonia:<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Ammonia</h3>Ammonia is an inorganic chemical compound of nitrogen and hydrogen with the formula NH3. A stable binary hydride and the simplest pnictogen hydride, ammonia is a colourless gas with a distinct pungent smell. Biologically, it is a common nitrogenous waste, and it contributes significantly to the nutritional needs of terrestrial organisms by serving as a precursor to fertilisers.[12] Around 70% of ammonia produced industrially is used to make fertilisers[13] in various forms and composition, such as urea and diammonium phosphate.
                    Ammonia in pure form is also applied directly into the soil.</p></Popup></label>
                  <h4 id="nh3">{health.list[0].components.nh3}μg/m3</h4>
                  <progress id="nh3" value={health.list[0].components.nh3} max="10"> {health.list[0].components.nh3}% </progress>
                </div>
                <div className="popup-group">
                  <label for="no">Nitrogen Monoxide:<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Nitrogen Monoxide</h3>Nitric oxide (nitrogen oxide or nitrogen monoxide[1]) is a colorless gas with the formula NO. It is one of the principal oxides of nitrogen. Nitric oxide is a free radical: it has an unpaired electron, which is sometimes denoted by a dot in its chemical formula (•N=O or •NO). Nitric oxide is also a heteronuclear diatomic molecule,
                    a class of molecules whose study spawned early modern theories of chemical bonding.</p></Popup></label>
                  <h4 id="no">{health.list[0].components.no}μg/m3</h4>
                  <progress id="no" value={health.list[0].components.no} max="10"> {health.list[0].components.no}% </progress>
                </div>
                <div className="popup-group">
                  <label for="no2">Nitrogen Dioxide:<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Nitrogen Dioxide</h3>Nitrogen dioxide is a chemical compound with the formula NO2. One of several nitrogen oxides, nitrogen dioxide is a reddish-brown gas. It is a paramagnetic, bent molecule with C2v point group symmetry. Industrially, NO2 is an intermediate in the synthesis of nitric acid, millions of tons of which are produced each year,
                    primarily for the production of fertilizers.</p></Popup></label>
                  <h4 id="no2">{health.list[0].components.n2o}μg/m3</h4>
                  <progress id="no2" value={health.list[0].components.no2} max="100"> {health.list[0].components.no2}% </progress>
                </div>
                <div className="popup-group">
                  <label for="o3">Ozone:<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Ozone</h3>Ozone (/ˈoʊzoʊn/) (or trioxygen) is an inorganic molecule with the chemical formula O
                    3. It is a pale blue gas with a distinctively pungent smell. It is an allotrope of oxygen that is much less stable than the diatomic allotrope O
                    2, breaking down in the lower atmosphere to O
                    2 (dioxygen). Ozone is formed from dioxygen by the action of ultraviolet (UV) light and electrical discharges within the Earth's atmosphere. It is present in very low concentrations throughout the atmosphere, with its highest concentration high in the ozone layer of the stratosphere,
                    which absorbs most of the Sun's ultraviolet (UV) radiation.</p></Popup></label>
                  <h4 id="o3">{health.list[0].components.o3}μg/m3</h4>
                  <progress id="o3" value={health.list[0].components.o3} max="100"> {health.list[0].components.o3}% </progress>
                </div>
                <div className="popup-group">
                  <label for="pm2_5">Fine Particles Matter:<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Fine Particles Matter</h3>Particulates or atmospheric particulate matter (see below for other names) are microscopic particles of solid or liquid matter suspended in the air. The term aerosol commonly refers to the particulate/air mixture, as opposed to the particulate matter alone.[1] Sources of particulate matter can be natural or anthropogenic.[2] They have impacts on climate and precipitation that adversely affect human health, 
                  in ways additional to direct inhalation.</p></Popup></label>
                  <h4 id="pm2_5">{health.list[0].components.pm2_5}μg/m3</h4>
                  <progress id="pm2_5" value={health.list[0].components.pm2_5} max="10"> {health.list[0].components.pm2_5}% </progress>
                </div>
                <div className="popup-group">
                  <label for="pm10">Coarse Particles Matter:<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Coarse Particles Matter</h3>Particulates or atmospheric particulate matter (see below for other names) are microscopic particles of solid or liquid matter suspended in the air. The term aerosol commonly refers to the particulate/air mixture, as opposed to the particulate matter alone.[1] Sources of particulate matter can be natural or anthropogenic.[2] They have impacts on climate and precipitation that adversely affect human health, in ways additional to direct inhalation.</p></Popup></label>
                  <h4 id="pm10">{health.list[0].components.pm10}μg/m3</h4>
                  <progress id="pm10" value={health.list[0].components.pm10} max="10"> {health.list[0].components.pm10}% </progress>
                </div>
                <div className="popup-group">
                  <label for="so2">Sulpher dioxide:<Popup on={['hover', 'focus']} trigger={<HelpCircle />} position="right center"><p><h3>Sulpher dioxide</h3>Sulfur dioxide (IUPAC-recommended spelling) or sulphur dioxide (traditional Commonwealth English) is the chemical compound with the formula SO
2. It is a toxic gas responsible for the odor of burnt matches. It is released naturally by volcanic activity and is produced as a by-product of copper extraction and the burning of sulfur-bearing fossil fuels.[8] It was known to alchemists as "volatile spirit of sulfur" since at least 16th century.[9]</p></Popup></label>
                  <h4 id="so2">{health.list[0].components.so2}μg/m3</h4>
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