import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addNewAnecdote = (event) =>{
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(createNotification(`You created ${content}`))
        setTimeout(() => dispatch(removeNotification(null)), 5000)
    }

    return (           
        <form onSubmit={addNewAnecdote}>
            <input name='anecdote' type='text' style={{marginTop:20}} />
            <button>create</button>
        </form>                
     )
}

export default AnecdoteForm