import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../service/anecdote'

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }


const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers:{
      getAnecdote(state,action) {
        return action.payload
      },

      createAnecdote(state, action) {
        return [...state, action.payload]
      },

      vote(state, action) {
        const votedAnecdote = action.payload
        return state.map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote)
      }

    }
})

export const { createAnecdote, vote, getAnecdote } = anecdoteSlice.actions

export const initializeAnecdote = () => {  
  return async dispatch => {
      const allAnecdote = await anecdoteService.getAnecdote()
      dispatch(getAnecdote(allAnecdote))
  }
}

export const addAnecdote = (anecdoteToAdd) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.storeAnecdote(anecdoteToAdd)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const newVote = await anecdoteService.updateVote(anecdote)
    dispatch(vote(newVote))
  }
}

export default anecdoteSlice.reducer