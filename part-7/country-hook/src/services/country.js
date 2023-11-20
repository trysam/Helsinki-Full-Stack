import axios from "axios"
const baseURL = 'https://studies.cs.helsinki.fi/restcountries'

const allCountries = (name) => {
    return axios.get(`${baseURL}/api/name/${name}`)
}

const countryService = { allCountries }
export default countryService