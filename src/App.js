import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // localStorage.clear()
  const listClasses = ["toDoItem", "arrayItems"];
  const initialArray = JSON.parse(localStorage.getItem('theArray')) || [];

  const [theArray, setArrayItem] = useState([...initialArray]);
  const [inputToAdd, setInputToAdd] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [itemToEdit, setEdit] = useState("");

  useEffect(() => {
    localStorage.setItem('theArray', JSON.stringify(theArray));
  }, [theArray])

  const handleSubmit = function (e) {
    e.preventDefault();

    const newToDo = {
      id: new Date().getTime(),
      text: inputToAdd,
    }
    
    setArrayItem([...theArray].concat(newToDo));
    setInputToAdd("");
  }

  const removeItem = function (index) {
    const newArray = [...theArray];
    newArray.splice(index, 1);
    setArrayItem(newArray);
  }

  function editItem(id) {
    const updatedTodos = [...theArray].map((item) => {
      if (item.id === id) {
        item.text = itemToEdit;
      }
      return item;
    })
    setArrayItem(updatedTodos);
    setTodoEditing(null);
    setEdit("");
  }

  return (
    <div className="App">

      {theArray.length === 1 ?
        <h1>you have {theArray.length} item on your to-do list</h1>
        :
        <h1>you have {theArray.length} items on your to-do list</h1>}

      <form className='input-container' onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setInputToAdd(e.target.value)} value={inputToAdd} />
        <button type="submit">add to list</button>
      </form>

      <ul className='listing'>
        
        {theArray.map((item, index) => (
          <li className={listClasses.join(" ")} key={item.id}>

            {todoEditing === item.id ? <input className='editedInput' type="text" onChange={(e) => setEdit(e.target.value)} value={itemToEdit}></input> : <span>{item.text}</span>}

            <div className='button-container'>
              {todoEditing === item.id ? 
              <button onClick={() => editItem(item.id)}>👍</button> :
              <button className='edit-button' onClick={() => setTodoEditing(item.id)}>✏️</button>}
              <button onClick={() => removeItem(index)}>✓</button>
            </div>

          </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;