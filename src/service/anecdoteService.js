import axios from 'axios'
const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const createAnecdote = async (anecdoteObj) => {
    const response = await axios.post(baseURL, anecdoteObj)
    return response.data
}

const updateVoteCount = async (anecdote) => {
    const anecdoteObj = {...anecdote,  votes: anecdote.votes + 1}
    const response = await axios.put(`${baseURL}/${anecdoteObj.id}`, anecdoteObj)
    return response.data
}
 
export default { getAll, createAnecdote, updateVoteCount }