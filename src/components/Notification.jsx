import { useContext } from "react"
import NotificationContext from "./notificationContext"


const Notification = () => {


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }  

  const [notification, _ ] = useContext(NotificationContext)
  
  return (
      <div style={notification ? style : null}>
        {notification}
      </div>

  )

}

export default Notification
