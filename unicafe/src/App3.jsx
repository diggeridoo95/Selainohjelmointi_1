import { useState } from 'react'

const StatisticLine = ({ text, value }) => (
        <tr> 
            
            <td>{text}</td>
            <td>{value}</td>
           
        </tr> 
)
const Header = ({header}) => {
  return(
    <div>
      <h1>
        {header}
      </h1>
  </div> 
  )
}

const Button = props => (
    <button onClick={props.onClick}>
        {props.text}
    </button>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
    if (all===0){
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

  return (
    <table> 
    <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = 
  all === 0
    ? 0
    :(good-bad)/all
  const positive =
  all === 0
    ? 0 +"%"
    : (good / all) * 100 + "%"


  return (
    <div>
      <Header header='give feedback'/>
      <p> </p>
      <Button onClick={() => setGood(good+1)} text="good" />
      <Button onClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button onClick={() => setBad(bad+1)} text="bad" />
      <p> </p>
      <Header header='statistics'/>
      <p> </p>
      
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
        />
    </div>
  )
}

export default App