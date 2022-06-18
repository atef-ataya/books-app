import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookSearch from './BookSearch';
import BookList from './BookList';

function App() {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  const handleUpdate = async (book, newShelf) => {
    BooksAPI.update(book, newShelf);
    const res = await BooksAPI.getAll();
    setBooks(res);
  };

  const handleSearch = async (query, maxResult) => {
    if (query.length) {
      BooksAPI.search(query.trim(), maxResult).then((result) => {
        if (result !== undefined && result.error !== 'empty query') {
          setSearchBooks(result);
        } else {
          setSearchBooks([]);
        }
      });
    } else {
      console.log('empty query');
      setSearchBooks([]);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<BookList books={books} handleUpdate={handleUpdate} />}
      />
      <Route
        exact
        path="/search"
        element={
          <BookSearch
            books={searchBooks}
            handleUpdate={handleUpdate}
            handleSearch={handleSearch}
          />
        }
      />
    </Routes>
  );
}

export default App;
