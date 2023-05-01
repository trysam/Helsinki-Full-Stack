import axios from 'axios'

const countryBaseUrl = "https://restcountries.com/v3.1/all"

const weather_api_key = process.env.REACT_APP_API_KEY

const getCountriesData = () => axios.get(countryBaseUrl).then(resource => resource.data)

const getWeatherData = async (latlng) =>{
    const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${weather_api_key}`
    return await axios.get(weatherBaseUrl)//.then(resource => resource.data)
}

const data = {getCountriesData, getWeatherData}
export default data;