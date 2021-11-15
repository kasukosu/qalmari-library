import { useState } from "react";
import axios from 'axios';
import Editor from "./editor";
import { faHome, faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Book = ({book, deleteBook, books, setBooks}) => {
  const apiUrl = 'http://localhost:3000/api/books';
  const {name, id, genre} = book
  const [editableBook, setEditableBook] = useState({
    name: book.name,
    genre: book.genre,
    id: book.id,
    isLoaned: book.isLoaned
  })
  const [showEdit, setShowEdit] = useState(false);

  const editBook = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put(`${apiUrl}/${editableBook.id}`, editableBook)
      console.log(res);
      const changedBooks = books.map(book => book.id === editableBook.id ?
        { ...book, name:editableBook.name, genre:editableBook.genre } :
        book)
      setBooks(changedBooks);
      setShowEdit(false)
    } catch (error) {
      console.log(error)
    }
  }
  const changeHandler = (e) => {
    const value = e.target.value;
    setEditableBook({
      ...editableBook,
      [e.target.name]: value
    });
  }

  const changeLoanStatus = async(e) => {
    try {
      console.log(editableBook);
      let url = `${apiUrl}/loan/${editableBook.id}`;
      if(editableBook.isLoaned){
        url = `${apiUrl}/return/${editableBook.id}`;
        setEditableBook({...editableBook, isLoaned:false})

      }else{
        setEditableBook({...editableBook, isLoaned:true})

      }
      const res = await axios.put(url, editableBook.id)
      console.log(res);
      const changedBooks = books.map(book => book.id === editableBook.id ? { ...book, isLoaned:editableBook.isLoaned } : book)
      setBooks(changedBooks);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <article className="grid">
      <div className="head">
        <div className="title">
          <h2>{name}</h2>
          <span>{genre}</span>
        </div>
        <div className="actions">
          <button onClick={() => setShowEdit(true)}><FontAwesomeIcon icon={faPen}/></button>
          <button onClick={() => deleteBook(id)}><FontAwesomeIcon icon={faTimes}/></button>
        </div>
      </div>
      <div>
        {editableBook.isLoaned && editableBook.isLoaned ? <p>This book is loaned</p>:<p>This book is free</p>}
        <button className="toggle-btn" type="checkbox" onClick={changeLoanStatus}>
          {editableBook.isLoaned && editableBook.isLoaned ? <p>Return</p>:<p>Loan</p>}
        </button>
      </div>
      {showEdit &&
        <Editor
          id={id}
          editableBook={editableBook}
          editBook={editBook}
          changeHandler={changeHandler}
          setShowEdit={setShowEdit}
        />
      }
    </article>
  );
}

export default Book;