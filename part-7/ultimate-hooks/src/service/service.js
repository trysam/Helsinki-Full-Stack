import axios from "axios";


const setToken = newToken => {
    return `Bearer ${newToken}`
  }

const getAll = async(baseUrl) => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async(baseUrl, objToCreate, token ) => {
    const config = {
        headers: { "Authorization": token }    
    }
    const response = await axios.post(baseUrl,objToCreate, config)
    return response.data
}

const update = async(baseUrl, objToUpdate, id) => {
    const response = axios.put(`${baseUrl}/${id}`, objToUpdate)
    return response.data
}


const routeService = {setToken, getAll, create, update}
export default routeService