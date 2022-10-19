import React, { useState } from 'react'
import "./NewList.css"

const NewList = ({onCreate}) => {
    const [isEdit, setIsEdit] = useState(false);
    function FormCreateList() {
        const [newValue, setNewValue] = useState('');
        function handleSubmit(e) {
          e.preventDefault();
        }
        function handleChange(e) {
          const value = e.target.value;
          setNewValue(value);
        }
        function handleClickCreate() {
          onCreate( newValue);
          setIsEdit(false);
        }
        return (

            <form className="NewListForm" onSubmit={handleSubmit}>
              <input
                type="text"
                label='new list'
                placeholder='List name...'
                className="listInput"
                onChange={handleChange}
                value={newValue}
              />
              <button className="buttonListcreate" onClick={handleClickCreate}>
                Create List
              </button>
            </form>

          );}
    function ButtonNewLIst(){
        return(
          <div className='ButtonNewLIstContainer'>
        <button className='ButtonNewLIst' onClick={() => setIsEdit(true)}><svg width="28" height="28" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
      </svg></button></div>)
    }
  return (
    <>
      {isEdit?<FormCreateList/>:<ButtonNewLIst/>}
    </>
  )
}

export default NewList
