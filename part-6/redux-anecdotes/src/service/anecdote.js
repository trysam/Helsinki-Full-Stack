import axios from 'axios'
const baseURL = 'http://localhost:3001/anecdotes'

const  getAnecdote = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const storeAnecdote = async (anecdote) => {
    const obj = {
        content: anecdote,
        votes: 0
    }

    const response = await axios.post(baseURL, obj)
    return response.data
}

const updateVote = async (anecdote) =>  {
    const response = await axios.put(`${baseURL}/${anecdote.id}`, anecdote)
    return response.data
}

export default {getAnecdote, storeAnecdote, updateVote}