import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [quote, setQueto] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(true)



  const quoteDisplayElement = document.getElementById('quote')

  
  useEffect(()=>{
    fetch('http://api.quotable.io/random')
    .then(response => response.json())
    .then(data => setQueto(data.content))
    setHasLoaded(true)
  },[correct])

  useEffect(() => {
    if(timerOn){
      const interval = setInterval(() => {
        setTime(time => time + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timerOn])
  
  function SplitQuote(){
    
    return(    
      hasLoaded? quote.split('').map((char)=><span>{char}</span>): null
    )
  }

  function textChange(e){
      const arrayQuote = quoteDisplayElement.querySelectorAll('span')
      const arrayValue = e.target.value.split('')
      
      
      arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
          characterSpan.classList.remove('correct')
          characterSpan.classList.remove('incorrect')
          setCorrect(false)

        } else if (character === characterSpan.innerText) {
          characterSpan.classList.add('correct')
          characterSpan.classList.remove('incorrect')
        } else {
          characterSpan.classList.remove('correct')
          characterSpan.classList.add('incorrect')
          setCorrect(false)

        }
      })

      if(e.target.value === quote){
        setTimerOn(false)
        setCorrect(true)
        e.target.value = null
      }


  }

  return (
    <div className="App">
      <div className="timer" id="timer">{time}</div>
      <div className='quote--container' id='quote'>
        {hasLoaded?<SplitQuote/>:null}
      </div>
      <textarea name="type" id="type" className='type' onChange={textChange}></textarea>
    </div>
  )
}

export default App
