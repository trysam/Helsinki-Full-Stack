  import { createSlice } from "@reduxjs/toolkit";
  import noteService from '../services/notes'

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
        const id = action.payload.id
        return state.map(note => note.id === id ? action.payload : note ) 
        //console.log(JSON.parse(JSON.stringify(state)))
        //const id = action.payload
        //const noteToModify = state.find(note => note.id === id)
        //const modifiedNote = {...noteToModify, important : !noteToModify.important}
        //return state.map(note => note.id === id ? modifiedNote : note)
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

export const initializeNote = () => {
  return async dispatch => {
    const allNotes = await noteService.getAll()
    dispatch(setNotes(allNotes))
  }
}

export const createNewNote  = (note) => {
  return async dispatch => {
    const newNote = await noteService.saveNote(note)
    dispatch(createNote(newNote))
  }
}

export const toggleImportant = (id, noteToToggle) => {
  return async dispatch => {
    const modifiedNote = await noteService.changeNote(id, noteToToggle)
    dispatch(toggleImportantOf(modifiedNote))
  }
}

export default noteSlice.reducer;