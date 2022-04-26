import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const initialArray = JSON.parse(localStorage.getItem('theArray')) || [];

  const [theArray, setArrayItem] = useState(initialArray);
  const [inputToAdd, setInputToAdd] = useState("");

  useEffect(() => {
    localStorage.setItem('theArray', JSON.stringify(theArray));
  }, [theArray])

  /*
  useEffect(() => {
    console.log(theArray.indexOf(itemToRemove));
    theArray.splice(theArray.indexOf(itemToRemove), 1);
    setArrayItem(theArray);
    console.log('itemToRemove', itemToRemove);
    console.log(theArray);
  }, [itemToRemove])
  */

  const removeItem = function (item) {
    theArray.splice(theArray.indexOf(item), 1);
    setArrayItem([...theArray]);
  }

  return (
    <div className="App">
      <h1>You have {theArray.length} items on your to-do list</h1>
      <div className='input-container'>
        <input type="text" onChange={(e) => setInputToAdd(e.target.value)} value={inputToAdd} />
        <button onClick={() => setArrayItem([...theArray, inputToAdd])}>Add item</button>
      </div>
      <ul className='listing'>
        {theArray.map(item => {
          return (
            <div className='toDoItem'>
              <li className="arrayItems">{item}</li>
              <button onClick={() => {removeItem(item)}}>remove</button>
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;


