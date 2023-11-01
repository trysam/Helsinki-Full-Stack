import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addNewAnecdote = async(event) =>{
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''       
        dispatch(addAnecdote(content))
        dispatch(addNotification(`You created "${content}"`))       
    }

    return (           
        <form onSubmit={addNewAnecdote}>
            <input name='anecdote' type='text' style={{marginTop:20}} />
            <button>create</button>
        </form>                
     )
}

export default AnecdoteForm