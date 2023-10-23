const counterReducer = (state=0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      
      case 'DECREMENT':
        return state - 1;
      
      case 'ZERO':
        return 0;
    
      default:
        return state;
    }
  }
  
const noteReducer = (state=[], action) => {
    switch (action.type) {
      case 'NEWNOTE':      
        return [...state, action.payload];

      case 'TOGGLE_IMPORTANT':
        const id = action.payload.id
        const noteToModify = state.find(note => note.id === id)      
        const modifiedNote = {...noteToModify, important: !noteToModify.important}
        return state.map(note => note.id === id ? modifiedNote : note)
        
      default:
        return state;
    }
}

const generatedID = () => Number((Math.random(1)*100000).toFixed(0))

export const createNote = (content) => {
    return({
      type:'NEWNOTE',
      payload: {
        content: content,
        important: false,
        id:generatedID()
      }
    })
}

export const toggleAction = (id) => {
    return ({
      type:"TOGGLE_IMPORTANT",
      payload: { id }
    })
}

export default {noteReducer, counterReducer}