import { useState } from 'react'

const Display = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
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
      <Display text={"good"} value={good} />
      <Display text={"neutral"} value={neutral} />
      <Display text={"bad"} value={bad} />
      <Display text={"all"} value={all} />
      <Display text={"average"} value={average} />
      <Display text={"positive"} value={positive} />

    </div>
  )
}

export default App