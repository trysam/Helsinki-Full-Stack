import Counter from "./components/counter";
import Note from "./components/newNoteForm";
import Notes from "./components/noteListDisplay";
import VisibilityFilter from "./components/visbilityFilter";



const App = () => {

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