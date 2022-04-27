import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // localStorage.clear()
  const initialArray = JSON.parse(localStorage.getItem('theArray')) || [];

  const [theArray, setArrayItem] = useState(initialArray);
  const [inputToAdd, setInputToAdd] = useState("");

  useEffect(() => {
    localStorage.setItem('theArray', JSON.stringify(theArray));
  }, [theArray])

  const updateArray = function () {
    setArrayItem([...theArray, inputToAdd]);
    setInputToAdd("");
  }

  const removeItem = function (item) {
    theArray.splice(theArray.indexOf(item), 1);
    setArrayItem([...theArray]);
  }

  return (
    <div className="App">
      {theArray.length === 1 ? <h1>you have {theArray.length} item on your to-do list</h1> : <h1>you have {theArray.length} items on your to-do list</h1>}
      <div className='input-container'>
        <input type="text" onChange={(e) => setInputToAdd(e.target.value)} value={inputToAdd} />
        <button onClick={updateArray}>add to list</button>
      </div>
      <ul className='listing'>
        {theArray.map((item, index) => {
          return (
            <div className='toDoItem'>
              <li className="arrayItems">{index + 1} - {item}</li>
              <button className='edit-button'>✏️</button>
              <button onClick={() => { removeItem(item) }}>✓</button>
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;