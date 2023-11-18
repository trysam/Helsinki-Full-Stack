import { useCounter } from "./customHook";

const DisplayCounter = () => {
    const counter = useCounter()
    
    return(
        <div>
            <h3>Counter Using useCounter custom Hook Function </h3>
            <h4>{counter.value}</h4>
            <button onClick={counter.increase}>Increment</button>
            <button onClick={counter.decrease}>decrement</button>
            <button onClick={counter.reset}>reset</button>

        </div>
    )
}

export default DisplayCounter