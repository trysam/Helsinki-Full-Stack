
function App({store}) {

  return (
    <>
      <div></div>
      <div>
        <button onClick={() => store.dispatch({type:'GOOD'})}>good</button>
        <button onClick={() => store.dispatch({type:'OK'})}>ok</button>
        <button onClick={() => store.dispatch({type:'BAD'})}>bad</button>
        <button onClick={() => store.dispatch({type:'ZERO'})}>reset stats</button>
      </div>
      <div>{`good: ${store.getState().good}`}</div>
      <div>{`ok: ${store.getState().ok}`}</div>
      <div>{`bad: ${store.getState().bad}`}</div>
    </>
  )
}

export default App
