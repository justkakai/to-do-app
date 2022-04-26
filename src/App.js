import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const initialArray = JSON.parse(localStorage.getItem('theArray')) || [];

  const [theArray, setArrayItem] = useState(initialArray);
  const [inputToAdd, setInputToAdd] = useState("");

  useEffect(() => {
    localStorage.setItem('theArray', JSON.stringify(theArray));
  }, [theArray])

  const removeItem = function (item) {
    theArray.splice(theArray.indexOf(item), 1);
    setArrayItem([...theArray]);
  }

  return (
    <div className="App">
      <h1>you have {theArray.length} items on your to-do list</h1>
      <div className='input-container'>
        <input type="text" onChange={(e) => setInputToAdd(e.target.value)} value={inputToAdd} />
        <button onClick={() => setArrayItem([...theArray, inputToAdd])}>add item</button>
      </div>
      <ul className='listing'>
        {theArray.map(item => {
          return (
            <div className='toDoItem'>
              <li className="arrayItems">{item}</li>
              <button onClick={() => {removeItem(item)}}>✓</button>
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;


