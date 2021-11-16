import Book from './book'
import BookCreator from './book-creator';
import Filter from './filter'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Feed = () => {

  const apiUrl = 'http://localhost:3000/api/books';
  const [showFilter, setShowFilter] = useState(true)
  const [books, setBooks] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [sortMethod, setSortMethod] = useState(0)
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
  });

  const sortingFunc = (a,b) => {
    if(sortMethod===0){
      if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
    }else if(sortMethod===1){
      if ( a.name > b.name ){
        return -1;
      }
      if ( a.name < b.name ){
        return 1;
      }
      return 0;
    }else if(sortMethod===2){
      if ( a.genre > b.genre ){
        return -1;
      }
      if ( a.genre < b.genre ){
        return 1;
      }
      return 0;
    }
    else if(sortMethod===3){
      if ( a.genre < b.genre ){
        return -1;
      }
      if ( a.genre > b.genre ){
        return 1;
      }
      return 0;
    }
  }

  //Sort functionality
  const booksToShow = showAll
  ? books.sort(sortingFunc)
  : books.sort(sortingFunc).filter(book => (
      book.name.toLowerCase().includes(newSearch) || book.genre.toLowerCase().includes(newSearch)
  ));

  const searchHandler = (e) => {
    let newValue = e.target.value
    if(newValue.length){
      setShowAll(false);
    }else{
      setShowAll(true)
    }
    console.log(newValue)
    setNewSearch(newValue);
  }

  const changeHandler = (e) => {
    const value = e.target.value;
    setNewBook({
      ...newBook,
      [e.target.name]: value
    });
  }

  const getBooks = async () => {
    try {
      const response = await axios.get(apiUrl);
      setBooks(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const addNewBook = async(e) => {
    try {
      e.preventDefault();
      if(newBook.name.length===0 || newBook.genre.length===0){
        alert("Name and genre fields are required")
        return
      }
      await axios.post(apiUrl, newBook)
      getBooks()
      setNewBook({
        name: "",
        genre: "",
      })
    } catch (error) {
      console.error(error)
    }

  }

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      const filteredBooks = books.filter((book) => {return (book.id !== id)})
      setBooks(filteredBooks);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBooks();
  }, [])

  return (
    <section className="feed">
      <div className="actions">
        <button onClick={() => setShowFilter(false)}><FontAwesomeIcon icon={faPlus}/></button>
        <button onClick={() => setShowFilter(true)}><FontAwesomeIcon icon={faSearch}/></button>
      </div>
      {showFilter ?
      <Filter
        searchHandler={searchHandler}
        newSearch={newSearch}
        setSortMethod={setSortMethod} /> :
      <BookCreator
        book={newBook}
        changeHandler={changeHandler}
        addNewBook={addNewBook}/>
      }

      {booksToShow && booksToShow.map( book => {
          return(
            <Book
              key={book.id}
              book={book}
              books={books}
              setBooks={setBooks}
              deleteBook={deleteBook}
            />
          )
        })
      }
    </section>
  );
}

export default Feed;