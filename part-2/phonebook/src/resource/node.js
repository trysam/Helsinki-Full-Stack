import axios from 'axios'

const baseUrl = '/api/persons'

const getData = () => {
    return axios.get(baseUrl).then(
        response => response.data
    )
}

const addNewData = (newData) => {
    return axios.post(baseUrl, newData).then(
        response => response.data
    )
}

const deleteData = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateData = (update, id) => {
    return axios.put(`${baseUrl}/${id}`, update).then(
        response => response.data
    )
}

const server = {getData, addNewData, deleteData, updateData};
export default server

