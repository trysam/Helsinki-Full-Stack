  import { createSlice } from "@reduxjs/toolkit";

  const initialState = [
    {
      content: 'reducer defines how redux store works',
      important: true,
      id: 1,
    },
    {
      content: 'state of store can contain any data',
      important: false,
      id: 2,
    },
  ]

  const generatedID = () => Number((Math.random(1)*100000).toFixed(0))

  const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
      createNote(state, action) {
        const content = action.payload
        return state.push({
          content:content,
          important: false,
          id: generatedID
        })
      },

      toggleImportantOf(state, action) {
        console.log(JSON.parse(JSON.stringify(state)))
        const id = action.payload
        const noteToModify = state.find(note => note.id === id)
        const modifiedNote = {...noteToModify, important : !noteToModify.important}
        return state.map(note => note.id === id ? modifiedNote : note)
      }
    }
  })
  
export const {createNote, toggleImportantOf} = noteSlice.actions

export default noteSlice.reducer;