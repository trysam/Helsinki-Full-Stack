import { useDispatch } from "react-redux"
import { anecdoteFilter } from '../reducers/filterReducer'

const Filter = () => {     
    const dispatch = useDispatch()

    const handleChange = (event) => {    
        dispatch(anecdoteFilter(event.target.value))    
    }    

    return (
        <div style={{marginBottom:10}} >
            Search <input type="text" name="filter" onChange={handleChange}/>
        </div>
  )
}

export default Filter