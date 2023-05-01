const ShowCountryWeather = ({weatherData,selectedCountry}) => {
    const weather = weatherData && selectedCountry       
        ?<div>        
            <h3>Weather in {weatherData.name}</h3>
            <div>temperature {weatherData.main.temp} celsius</div> 
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather-img"/>
            <div>wind {weatherData.wind.speed} m/s</div>
        </div>    
  : null

  return <div>{weather}</div>
  
}

export default ShowCountryWeather;