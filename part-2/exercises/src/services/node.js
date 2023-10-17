import axios from "axios";

const baseUrl = "/api/notes";
let token = null;

const setToken = newToken => token = `Bearer ${newToken}`


const getAllResource = async () => {
    const promise = await axios.get(baseUrl);
    return promise.data  
}

const addResource = async newObject => {
    const config = { headers: {'Authorization': token} };
    const promise = await axios.post(baseUrl, newObject, config);
    return promise.data;   
}

const updateResource = async (id, obj) => {
    const promise = await axios.put(`${baseUrl}/${id}`, obj);
    return promise.data;
}

const deleteResource = (id) => {
    return axios.delete(`${baseUrl}/${id}`);    
}

const noteService = {getAllResource, addResource, updateResource, deleteResource, setToken}
export default noteService;