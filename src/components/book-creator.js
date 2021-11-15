const BookCreator = ({addNewBook, changeHandler, book}) => {

  return (
    <form action="" onSubmit={addNewBook}>
      <div className="grid">
        <h2>Add a new book</h2>
        <input placeholder="Name of the book" type="text" name="name" value={book.name} onChange={changeHandler} required/>
        <input placeholder="Genre" type="text" name="genre" value={book.genre} onChange={changeHandler} required/>
        <div><button type="submit" onClick={addNewBook}>Add new book</button></div>
      </div>
    </form>
  );
}

export default BookCreator;