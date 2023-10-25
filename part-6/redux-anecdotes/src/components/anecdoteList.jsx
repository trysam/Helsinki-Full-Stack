/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'



const NewAnecdotes = ({anecdote}) => {
    const dispatch = useDispatch()

    const handleVote = () => {
        dispatch(vote(anecdote.id))
        dispatch(createNotification(`you voted "${anecdote.content}"`))
        setTimeout(() => dispatch(removeNotification(null)), 5000)
    }

    return (
        <div>
            <div> {anecdote.content} </div>
            <div> 
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    ) 
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote) 
    const wordToSearch = useSelector(state => state.filter) 
    
    return (            
        <div>
            {wordToSearch
               ? [...anecdotes].filter(item => item.content.toLowerCase().includes(wordToSearch)).sort(
                (a,b) => b.votes - a.votes
                ).map(
                    anecdote => <NewAnecdotes anecdote={anecdote} key={anecdote.id}/>
                )
              : [...anecdotes].sort(
                (a,b) => b.votes - a.votes
                ).map(
                    anecdote => <NewAnecdotes anecdote={anecdote} key={anecdote.id}/>
                )
            }
        </div>
    )
}

export default AnecdoteList;