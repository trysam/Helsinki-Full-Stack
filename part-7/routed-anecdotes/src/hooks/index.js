import { useState } from "react";

export const useField = (type='text') => {

    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const reset = () => {
        setValue('')
    }

    const style = {
        marginLeft:'2rem'        
    }

    return {
        reset,
        value,
        type,
        style,
        onChange,
    }
}