  import { createSlice } from "@reduxjs/toolkit";

  const initialState = []

  const generatedID = () => Number((Math.random(1)*100000).toFixed(0))

  const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
      createNote(state, action) {        
        return [...state, action.payload]
      },

      toggleImportantOf(state, action) {
        console.log(JSON.parse(JSON.stringify(state)))
        const id = action.payload
        const noteToModify = state.find(note => note.id === id)
        const modifiedNote = {...noteToModify, important : !noteToModify.important}
        return state.map(note => note.id === id ? modifiedNote : note)
      },

      appendNote(state, action) {
        return state.push(action.payload)
      },

      setNotes(state, action) {
        return action.payload 
      }
    }
  })
  
export const {createNote, toggleImportantOf, appendNote, setNotes} = noteSlice.actions

export default noteSlice.reducer;