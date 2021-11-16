const Editor = ({editBook, changeHandler, editableBook, setShowEdit}) => {
  return (
    <div className="modal">
      <form action="" onSubmit={editBook}>
        <div className="grid">
          <h3>Edit book info</h3>
          <input type="text" name="name" value={editableBook.name} onChange={changeHandler} required/>
          <input type="text" name="genre" value={editableBook.genre} onChange={changeHandler} required/>
          <div className="grid two">
            <button className="save" type="submit" onClick={editBook}>Save changes</button>
            <button className="cancel" type="submit" onClick={() => setShowEdit(false)}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Editor;