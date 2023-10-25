import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    changeCounterState(state, action){
      switch (action.payload){
        case 'INCREMENT':
          return state + 1;
        
        case 'DECREMENT':
          return state - 1;
        
        case 'ZERO':
          return 0;
      
        default:
          return state;
      } 
    },
  }
})

export const {changeCounterState} = counterSlice.actions
export default counterSlice.reducer;