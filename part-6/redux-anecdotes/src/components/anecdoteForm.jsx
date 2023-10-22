import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addNewAnecdote = (event) =>{
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    return (           
        <form onSubmit={addNewAnecdote}>
            <input name='anecdote' type='text' />
            <button>create</button>
        </form>                
     )
}

export default AnecdoteForm