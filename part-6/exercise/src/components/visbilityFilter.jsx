import { filterByImportant } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const VisibilityFilter = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <input type="radio" name="filter" onChange={() => dispatch(filterByImportant('ALL'))}/> All 
            <input type="radio" name="filter" onChange={() => dispatch(filterByImportant('IMPORTANT'))}/> Important 
            <input type="radio" name="filter" onChange={() => dispatch(filterByImportant('NOT IMPORTANT'))}/> Not Important
        </div>
     )
}

export default VisibilityFilter