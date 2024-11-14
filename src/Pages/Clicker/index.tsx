import { useEffect, useState } from "react"
import "./style.scss"
import { useLocation } from 'react-router-dom';
import React from 'react';
import axios from "axios";

export function Clicker() {
  const [count, setCount] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);  
  const [timeLeft, setTimeLeft] = useState(10); 
  const [started, setStarted] = useState(false);  
  const [gameOver, setGameOver] = useState(false);  
  const [p,setP] = useState('')

  const location = useLocation();
  const { data1, data2, data3 } = location.state || {};

  const handleClick = () => {
    if (!started) {
      setStarted(true); 
      setIsRunning(true); 
    }
    if (isRunning) {
      setCount(count + 1); 
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer); 
            setIsRunning(false); 
            setGameOver(true); 
            return 0;
          }
          return prevTime - 1; 
        });
      }, 1000);

      return () => clearInterval(timer); 
    }
  }, [isRunning, timeLeft]);


  const startNewGame = () => {
    setCount(0);  
    setTimeLeft(10);  
    setStarted(false);  
    setGameOver(false);  
    setIsRunning(false);  
  };


  const saveScore = () => {

    const Data = {
      email: data1, pass: data2, name : data3, score : count
  }
  console.log("send " + Data.score)
    axios.post('http://localhost:3000/save',Data)
    .then(res=>{
      const msg = res.data.message
      if(msg == "Update") {
        setP("Update score!")
      }
      if(msg == "Added") {
        setP('Added score!')
      }
      if(msg == "User not found!") {
        setP('You have to login to save score')
      }

    })
  };

  return (
    <div id="clicker">
      <h1>Clicker</h1>
      <h1>Hello {data3} !</h1>
      <p>Clicks: {count}</p>
      <p>Time left: {timeLeft}s</p>
      <button onClick={handleClick} disabled={!isRunning && started}>
        Click me!
      </button>
      {!isRunning && started && (
        <>
          <p>Time's up!</p>
          <button onClick={saveScore}>Save Score</button>
          <button onClick={startNewGame}>New Game</button>
        </>
      )}
      {p}
    </div>
  );
}