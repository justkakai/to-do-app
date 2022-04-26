import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // localStorage.clear()
  const initialArray = JSON.parse(localStorage.getItem('theArray')) || [];

  const [theArray, setArrayItem] = useState(initialArray);
  const [inputToAdd, setInputToAdd] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    localStorage.setItem('theArray', JSON.stringify(theArray));
  }, [theArray])

  const clearInput = function () {
    setArrayItem([...theArray, inputToAdd]);
    setInputToAdd("");
  }

  const removeItem = function (item) {
    theArray.splice(theArray.indexOf(item), 1);
    setArrayItem([...theArray]);
  }
  /*
  const editItem = function (item) {
    setToggle(!toggle);
    if (toggle) {
      console.log(theArray.indexOf(item));
      theArray.splice(theArray.indexOf(item), 1, <input className='editedInput' type="text" value={item}></input>);
      setArrayItem([...theArray]);
    } else {
      theArray.splice(theArray.indexOf(<input className='editedInput' type="text" value={item}></input>), 1, item);
      setArrayItem([...theArray]);
    }
  }
  */

  /*
    return (
      <div className="App">
        {theArray.length === 1? <h1>you have {theArray.length} item on your to-do list</h1> : <h1>you have {theArray.length} items on your to-do list</h1>}
        <div className='input-container'>
          <input type="text" onChange={(e) => setInputToAdd(e.target.value)} value={inputToAdd} />
          <button onClick={clearInput}>add to list</button>
        </div>
        <ul className='listing'>
          {theArray.map((item, index) => {
            return (
              <div className='toDoItem'>
                <li className="arrayItems">{index + 1} - {item}</li>
                <button className='edit-button'>✏️</button>
                <button onClick={() => {removeItem(item)}}>✓</button>
              </div>
            )
          })}
        </ul>
      </div>
    );
  */
  return (
    <div className="App">
      {theArray.length === 1 ? <h1>you have {theArray.length} item on your to-do list</h1> : <h1>you have {theArray.length} items on your to-do list</h1>}
      <div className='input-container'>
        <input type="text" onChange={(e) => setInputToAdd(e.target.value)} value={inputToAdd} />
        <button onClick={clearInput}>add to list</button>
      </div>
      <ul className='listing'>
        {theArray.map((item, index) => {
          return (
            <div className='toDoItem'>
              {/* <li className="arrayItems">{index + 1} - {item}</li> */}
              {toggle ? <input className='editedInput' type="text" value={item}></input> : <li className="arrayItems">{index + 1} - {item}</li>}
              <button className='edit-button' onClick={() => setToggle(!toggle)}>✏️</button>
              <button onClick={() => { removeItem(item) }}>✓</button>
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;


