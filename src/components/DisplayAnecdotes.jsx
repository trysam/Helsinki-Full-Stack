import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../service/anecdoteService'
import { useContext } from 'react'
import NotificationContext from './notificationContext'

const DisplayNotes = () => {

    const queryClient = useQueryClient()
    const [_, dispatch] = useContext(NotificationContext)

    const anecdoteQuery = useQuery({
        queryKey: ['anecdote'],
        queryFn: anecdoteService.getAll,
        retry: false,
        refetchOnWindowFocus: false   
    })

    const anecdoteVoteMutation = useMutation({
        mutationFn: anecdoteService.updateVoteCount,
        onSuccess: (vote) => {
            const allAnecdotes = queryClient.getQueryData()           
            const modifiedAnecdotes = allAnecdotes.map(
                anec => anec.id === vote.id 
                    ? {...anec, votes: anec.votes + 1} 
                    : anec
            )
            queryClient.setQueryData(['anecdote'],modifiedAnecdotes)
            dispatch({ type:'NEW_VOTE', payload: vote.content })
            setTimeout(() => dispatch({type:'RESET'}), 5000)
        }
    })

    if (anecdoteVoteMutation.isError) {
        return <div>`Error : ${anecdoteVoteMutation.error}`</div>
    }
    
    if (anecdoteQuery.isLoading){
        return <div>Loading.....</div>
    }
    
    if (anecdoteQuery.isError){
        return <div>{`There is error: ${anecdoteQuery.error} `}</div>
    }
      
    const anecdotes = anecdoteQuery.data
    
    const handleVote = (anecdote) => {
        anecdoteVoteMutation.mutate(anecdote)
    }

    return (
        <div>
            {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )      
}

export default DisplayNotes
