import React, { useState } from "react";

const Post = ({post, onUpdate, onDelete}) => {
 // const dispatch = useDispatch();
 let user = JSON.parse(sessionStorage.getItem('user'))
  const [isEdit, setIsEdit] = useState(false);

  function ShowPost({post}) {
    return (
      <>
        <span>{post.post.content}</span>
        {user?
        user.id===post.post.userId?
          <>
        <button
          className="edit"
          aria-label="edit"
          onClick={() => setIsEdit(true)}
        >
          <svg
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
        </button>
        <button
          className="delete"
          aria-label="delete"
          onClick={() => onDelete(post.post.id)}
        >
          <svg
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </button></>:null:null}
      </>
    );
  }

  function EditPost({ post }) {
    const [newValue, setNewValue] = useState(post.post.content);

    function handleSubmit(e) {
      e.preventDefault();
    }
    function handleChange(e) {
      const value = e.target.value;
      setNewValue(value);
    }
    function handleClickUpdate() {
      onUpdate(post.post.id, newValue);
      setIsEdit(false);
    }
    return (
      <form className="postUpdateForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="postContentInput"
          onChange={handleChange}
          value={newValue}
        />
        <button className="buttonUpdate" onClick={handleClickUpdate}>
          Save
        </button>
      </form>
    );
  }

  return (

      <div className="post-conteiner">
          <h4 key={post.post.userId}>{post.username}</h4>
          <div className="post-content">
            {isEdit ? <EditPost post ={post} /> : <ShowPost post ={post} />}
          </div>
      </div>

  );
};

export default Post;
