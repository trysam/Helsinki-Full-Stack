import { useEffect } from "react";
import Counter from "./components/counter";
import Note from "./components/newNoteForm";
import Notes from "./components/noteListDisplay";
import VisibilityFilter from "./components/visbilityFilter";
import { useDispatch} from "react-redux";
import nodeService from './services/notes.js'
import { setNotes } from './reducers/noteReducer.js'


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    nodeService.getAll().then(data => dispatch(setNotes(data)))
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