import { useState } from "react"

export const useCounter = () => {

    const [value, setValue] = useState(0)

    const increase = () => setValue(value + 1)
    const decrease = () => setValue(value - 1)
    const reset = () => setValue(0)

    return({
        value,
        increase,
        decrease,
        reset
    })  
}

export const useField = (type) => {
    
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const style = {marginLeft:'10px'}
    return ({
        type,
        value,
        style,
        onChange
    })
}