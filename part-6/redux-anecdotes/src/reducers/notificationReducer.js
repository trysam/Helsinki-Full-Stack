import {createSlice} from "@reduxjs/toolkit"


const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers:{
        createNotification(state, action){
            return action.payload
        },
        removeNotification(state, action){
            return action.payload
        },
    }
})

export const {createNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer