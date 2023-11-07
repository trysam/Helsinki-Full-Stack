/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return `Anecdote "${action.payload}" added`
        case 'NEW_VOTE':
            return `Anecdote "${action.payload}" voted` 
        case 'ERROR':
            return `Error: "${action.payload}" `     
        
        case 'RESET':
            return null

      default:
        return state
    }
  }
  

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {

    const [notification, dispatchNotification] = useReducer(notificationReducer, null)

   return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
        {props.children}
    </NotificationContext.Provider>
   ) 
}


export default NotificationContext  
