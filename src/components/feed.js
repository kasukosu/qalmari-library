import Book from './book'
import BookCreator from './book-creator';
import Filter from './filter'
import {useState, useEffect} from 'react';
import axios from 'axios';
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

  const sortingFunc = (a, b) => {
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
      console.log(error)
    }
  }

  const addNewBook = async(e) => {
    try {
      e.preventDefault();
      if(newBook.name.length===0 || newBook.genre.length===0){
        alert("Name and genre fields are required")
        return
      }
      const res = await axios.post(apiUrl, newBook)
      getBooks()
      setNewBook({
        name: "",
        genre: "",
      })
    } catch (error) {
      console.log(error)
    }

  }

  const deleteBook = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/${id}`)
      console.log(`${apiUrl}/${id}`);
      const filteredBooks = books.filter((book) => {return (book.id !== id)})
      setBooks(filteredBooks);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBooks();
  }, [0])

  return (
    <section className="feed">
      <div className="grid">
        <button onClick={() => setShowFilter(false)}>Add new book</button>
        <button onClick={() => setShowFilter(true)}>Search</button>
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