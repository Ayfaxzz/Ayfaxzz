import "./Todos.css"
import React, { useRef, useState } from 'react'
import Modal from './Modal'
import { v4 } from "uuid"

const Todos = () => {

  const[openModal, setOpenModal] = useState(false)

  // const[todos, setTodos] = useState([])
  const[todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || [])
  
  const[editId, setEditId] = useState(null)

  localStorage.setItem("todos", JSON.stringify(todos))

  const inputRef = useRef()
 
  const openEditModal = (id) => {
    setOpenModal(true)
    setEditId(id)
  }

  const handleTodoForm = (e) => {
    e.preventDefault()

    let todo = {
      id: v4(),
      text: inputRef.current.value, 
      isCompleted: false
    }

    setTodos([...todos, todo])
    inputRef.current.value = ""
  }

  const completedTodo = (id) => {
    let todo = todos.find(todo => todo.id === id)
    todo.isCompleted = !todo.isCompleted
    setTodos([...todos])
  }
  const deleteTodo = (id) => {
    let confirm = window.confirm("Rostdan ochirmoqchmisiz?")
    if(confirm) {
      setTodos(todos.filter(todo => todo.id !== id))
    }
  }
  const deleteCompletedTodo = () => {
    let confirm = window.confirm("Rostdan ochirmoqchmisiz?")
    if(confirm) {
      setTodos(todos.filter(todo => todo.isCompleted === false))
    }
  }



  return (
    <div className='content'>
      <h1 className="heading-top">TODOLIST</h1>
      <form onSubmit={handleTodoForm} action="" className="todo-form">
        <input ref={inputRef} type="text" className="todo-input" required/>
        <button className="todo-btn">+</button>
      </form>

      <ul className="todo-list">
        {
          todos.map(todo => {
            return (
              <li className="todo-item" key={todo.id}>
                  <input onChange={() => completedTodo(todo.id)} checked={todo.isCompleted} type="checkbox" className="complete-input"/>
                  <p className={todo.isCompleted ? "todo-text completed" : "todo-text"}>{todo.text}</p>
                  <div className="btn-box">
                      <button onClick={() => openEditModal(todo.id)} className="primary-btn edit-btn"></button>
                      <button className="primary-btn del-btn" onClick={() => deleteTodo(todo.id)}></button>
                  </div>
              </li>
            )
          })
        }
              
      </ul>

      <div className="bottom-box">
        <p style={{'--countChecked': `${(todos.filter(todo => todo.isCompleted === true).length / todos.length)*100}%`}} className="indicator-todo">{todos.filter(todo => todo.isCompleted === true).length} of {todos.length} tasks done</p>
        <button className="del-completed-btn" onClick={deleteCompletedTodo}>Remove Checked X</button>
      </div>

      {openModal && <Modal setOpenModal={setOpenModal} todos={todos} setTodos={setTodos} editId={editId}/>}

    </div>
  )
}

export default Todos
