const Notification = ({errorMessage, successMssage}) => {
    if(errorMessage === null && successMssage === null){
        return null
    }

    return(
        errorMessage 
            ? <div className="error" style={{border:"solid #ff0000", backgroundColor:"#ffbfbf", color:"#b30000"}}>{errorMessage }</div>
            : <div className="successs" style={{border:"solid #00a800", backgroundColor:"#bfffbf", color:"#007600"}}>{successMssage}</div>
    )

}

export default Notification