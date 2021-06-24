import React, { useState, useRef, useEffect } from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [allTodos, setTodos] = useState([]);
  // useRef hook allows us to reference elements in HTML
  const todoNameRef = useRef();

  // empty array of dependencies means this useEffect will only be called ONCE
  // LOAD our saved todos
  useEffect(()=>{
    const savedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(savedTodos){
      setTodos(savedTodos)
    }
  }, []);


  // STORE TODO
  // everytime our array of "allTodos" changes the callback function is executed
  // callback function saves to local storage
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allTodos));
  }, [allTodos]);

  function addTodo(e) {
    const name = todoNameRef.current.value;
    // don't do anything if empty
    if (name === '') {
      return
    }
    setTodos(prevTodos => {
      // uuidv4 genereates random ids
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    });
    // clear input after clicking "add todo button"
    todoNameRef.current.value = '';
  }

  return (
    // empty elements is a fragment (can only return 1 element)
    <>
      <TodoList todos={allTodos} />
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add Todo</button>
      <button>Clear Completed Todos</button>
      <div>0 left to do</div>
    </>
  );
}

export default App;
