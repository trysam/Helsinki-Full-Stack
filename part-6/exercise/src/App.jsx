import Note from "./components/newNoteForm";
import Notes from "./components/noteListDisplay";

const App = () => {

  return <>
  {/* <div>{`Counter: ${counterStore.getState()}`}</div>
    <div>
      <button onClick={() => counterStore.dispatch({type: 'INCREMENT'})}>INCREMENT</button>
      <button onClick={() => counterStore.dispatch({type: 'DECREMENT'})}>DECREMENT</button>
      <button onClick={() => counterStore.dispatch({type:'ZERO'})}>RESET</button>
    </div> */}
    <Note />
    <Notes />
  </>
}

export default App