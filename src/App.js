import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import './App.css';
import { FiThumbsUp } from "react-icons/fi";

const Span = styled.span`
  font-family: 'Bad Script', cursive;
  display: flex;
  justify-content: flex-end;
  width: 11.5rem;
  font-weight: 400;
  font-size: 1.5rem;
  color: white;
  text-decoration: "none";
  `;

const SpanDeco = styled.span`
  font-family: 'Bad Script', cursive;
  display: flex;
  justify-content: flex-end;
  width: 11.5rem;
  font-weight: 400;
  font-size: 1.5rem;
  color: white;
  text-decoration: "line-through";
  `;

function App() {

  // localStorage.clear()
  const listClasses = ["toDoItem", "arrayItems"];
  const initialArray = JSON.parse(localStorage.getItem('theArray')) || [];

  const [theArray, setArrayItem] = useState([...initialArray]);
  const [inputToAdd, setInputToAdd] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [itemToEdit, setEdit] = useState("");
  const [itemToDelete, setDelete] = useState("");

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

  const removeItem = function (id, item, index) {
    setDelete(item);
    console.log(itemToDelete);
    const updated = [...theArray].map((item, index) => {
      if (item.id === id) {
        setTimeout(function () {
          updated.splice(index, 1);
          setArrayItem(updated);
        }, 1000)
      }
      return item;
    })
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

            {todoEditing === item.id ? <input className='editedInput' type="text" onChange={(e) => setEdit(e.target.value)} value={itemToEdit}></input> : itemToDelete === item.id ? <SpanDeco>{item.text}</SpanDeco> : <Span>{item.text}</Span>}

            <div className='button-container'>
              {todoEditing === item.id ?
                <button onClick={() => editItem(item.id)}><FiThumbsUp /></button> :
                <button className='edit-button' onClick={() => setTodoEditing(item.id)}>✏️</button>}
              <button onClick={() => removeItem(item.id, item, index)}>✓</button>
            </div>

          </li>
        ))
        }
      </ul>
    </div>
  );
}

export default App;