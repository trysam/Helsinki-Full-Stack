import { useState } from "react";


const Button = ({text,onClick}) => {    
  return(
    <button onClick={onClick}>{text}</button>
  )  
}

const StatisticLine =({text, value}) => {
  return(   
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>   
  
  )
}

const Statistics = ({good, neutral, bad, total, avg, positive}) => {    
  return(
    <div> 
      {total===0
        ?<div>No feedback given</div>
        :
          <table>
            <tbody>    
              <StatisticLine text="good" value={good}/>
              <StatisticLine text="neutral" value={neutral}/>
              <StatisticLine text="bad" value={bad}/>
              <StatisticLine text="total" value={total}/>
              <StatisticLine text="average" value={avg}/>
              <StatisticLine text="positive" value={positive} unit="%"/>
            </tbody> 
          </table> 
        }  
    </div>   
  )  
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1)
  
  const total = good + neutral + bad
  const avg = ((good - bad)/total).toFixed(2)
  const positive = `${((good/total)*100).toFixed(2)}%`

  return (
      <>
        <h1>give feedback</h1>
        <Button onClick={handleGoodClick} text="good"/>
        <Button onClick={handleNeutralClick} text="neutral"/>
        <Button onClick={handleBadClick} text="bad"/>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} avg={avg} positive={positive} total={total} />
      </>                                  
  );
}

export default App;
