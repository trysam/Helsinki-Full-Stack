import { useEffect } from "react";
import Counter from "./components/counter";
import Note from "./components/newNoteForm";
import Notes from "./components/noteListDisplay";
import VisibilityFilter from "./components/visbilityFilter";
import { useDispatch} from "react-redux";
import { initializeNote } from "./reducers/noteReducer.js";


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNote())
  }, [])

  return( 
    <>
      <Counter />
      <Note />
      <VisibilityFilter />
      <Notes />
    </>
  )
}

export default App