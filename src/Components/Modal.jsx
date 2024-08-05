import React, { useRef } from 'react'

const Modal = ({setOpenModal, todos, setTodos, editId}) => {

  let todo = todos.find(todo => todo.id === editId)

  let editInputRef = useRef()

  const saveChange = () => {
    todo.text = editInputRef.current.value
    setTodos([...todos])
    setOpenModal(false)
  }
  return (
    <div className='modal'>
      <div className="modal-body">
        <button onClick={() =>setOpenModal(false)} className="close-modal">X</button>
        <input ref={editInputRef} type="text" className='edit-input' defaultValue={todo.text}/>
        <button onClick={saveChange} className="save-edit-btn">Save Changes</button>
      </div>
    </div>
  )
}

export default Modal
