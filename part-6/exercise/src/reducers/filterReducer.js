import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    filterByImportant(state, action){
      return action.payload
    }
  }
})
  
export const {filterByImportant} = filterSlice.actions
export default filterSlice.reducer;