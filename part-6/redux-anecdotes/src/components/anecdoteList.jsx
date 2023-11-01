/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'




const NewAnecdotes = ({anecdote}) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdote) 

    const handleVote = () => {       
        const id = anecdote.id
        const anecdoteToVote = anecdotes.filter(anecdote => anecdote.id === id)
        const votedAnecdote = {...anecdoteToVote[0], votes: anecdoteToVote[0].votes + 1}
        dispatch(addVote(votedAnecdote))        
        dispatch(addNotification(`you voted "${anecdote.content}"`))
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