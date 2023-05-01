import { useEffect, useState } from "react";
import data from "./resources/node";
import ShowCountryInfo from "./components/showCountryInfo";
import ShowCountryWeather from "./components/showCountryWeather";
import InputCountry from "./components/inputCountry";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [country, setCountry] = useState(null); 
  const [weatherData, setWeatherData] = useState(null);

  const searchCountry = country
    ? countriesData.filter(data => data.name.common.toLowerCase().includes(country.toLowerCase()))
    :null;

  useEffect(() =>{data.getCountriesData().then(data => setCountriesData(data.map(country => country)))},[]);  
  useEffect(() =>
    {
      if(searchCountry && searchCountry.length === 1){
          data.getWeatherData(searchCountry[0].latlng).then(
            response => setWeatherData(response.data))
      } else setWeatherData(null)  
    
    }, [searchCountry]
  );

  const handleSearch = (event) => {
    setCountry(event.target.value);    
  }

  const handleClick = (event) => {
    setCountry(event.target.value);

    data.getWeatherData(searchCountry[0].latlng).then(
      response => setWeatherData(response.data));
  }
 
 
return (
    <div>    
      <InputCountry handleSearch={handleSearch}/>
      <ShowCountryInfo country={country} searchCountry={searchCountry} handleClick={handleClick}/>
      <ShowCountryWeather weatherData={weatherData} selectedCountry={searchCountry}/>      
    </div>    
  );
}

export default App;