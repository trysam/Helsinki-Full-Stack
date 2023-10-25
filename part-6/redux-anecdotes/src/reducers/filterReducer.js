import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: null,
    reducers:{
        anecdoteFilter(state, action) {
            return action.payload
        }
    }
})

export const {anecdoteFilter} = filterSlice.actions
export default filterSlice.reducer