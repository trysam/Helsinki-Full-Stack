import { useSelector, useDispatch } from "react-redux";
import { changeCounterState } from "../reducers/counterReducer";

const Counter = () => {
    const counterState = useSelector(state => state.counter)
    const dispatch = useDispatch()

    return (
        <>
            <div>{`Counter: ${counterState}`}</div>
            <div>
                <button onClick={() => dispatch(changeCounterState('INCREMENT'))}>INCREMENT</button>
                <button onClick={() => dispatch(changeCounterState('DECREMENT'))}>DECREMENT</button>
                <button onClick={() => dispatch(changeCounterState('ZERO'))}>RESET</button>
            </div>
        </>

    )
}

export default Counter