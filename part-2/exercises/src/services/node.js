import axios from "axios";

const baseUrl = "http://localhost:3001/api/notes"

const getAllResourse = () => {
    const promise = axios.get(baseUrl);
    return promise.then(resource => resource.data);  
}

const addResource = obj => {
    const promise = axios.post(baseUrl, obj);
    return promise.then(resource => resource.data);   
}

const updateResource = (id, obj) => {
    const promise = axios.put(`${baseUrl}/${id}`, obj);
    return promise.then(resource => resource.data);
}

const deleteResource = (id) => {
    return axios.delete(`${baseUrl}/${id}`);    
}

const nodeService = {getAllResourse, addResource, updateResource, deleteResource}
export default nodeService;