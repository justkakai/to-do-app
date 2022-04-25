import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [theArray, setArrayItem] = useState([]);
  const [inputToAdd, setInputToAdd] = useState("");

  // useEffect(() => {
  //   array.push(listItem);
  // }, [listItem])

  return (
    <div className="App">
      <h1>You have {theArray.length} items on your to-do list</h1>
      <div className='inputContainer'>
        <input type="text" onChange={(e) => setInputToAdd(e.target.value)} value={inputToAdd} />
        <button onClick={() => setArrayItem([...theArray, inputToAdd])}>Add item</button>
      </div>
      <ul>
        {theArray.map(item => {
          return (
            <div className='toDoItem'>
              <li className="arrayItems">{item}</li>
              <button>done!</button>
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
