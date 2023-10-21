import reducer from "./reducer";
import deepFreeze from "deep-freeze";

describe('noteReducers', () => {
    
    let state = []

    test('return new state with action NEWNOTE', () => {
        const newNote = {
            type:'NEWNOTE',
            payload: {
              content: 'The first note stored using redux',
              important: true,
              id:1
            }          
        }


        deepFreeze(state)
        const newState = reducer.noteReducer(state,newNote)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(newNote.payload)

    })

    test('returns new state with action TOGGLE_IMPORTANCE', () => {
        let state = []
        const newNote1 = {
                type:'NEWNOTE',
                payload: {
                  content: 'The first note stored using redux',
                  important: true,
                  id:1
                }          
            }
    
            const newNote2 = {
                type:'NEWNOTE',
                payload: {
                  content: 'The  second note stored using redux',
                  important: true,
                  id:2
                }          
            }

            const toggleImportant = {
                type: "TOGGLE_IMPORTANT",
                payload: {
                    id:2
                }
            }

            state = reducer.noteReducer(state,newNote1)
            state = reducer.noteReducer(state,newNote2)
            const modifiedNote = reducer.noteReducer(state,toggleImportant)
            
            expect(modifiedNote).toHaveLength(2)
            expect(modifiedNote[1].important).toEqual(!newNote2.payload.important)
        
    })
})