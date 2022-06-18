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
    if (newShelf === 'none') {
      setBooks((prevState) => prevState.filter((b) => b.id !== book.id));
    } else {
      book.shelf = newShelf;
      setBooks((prevState) =>
        prevState.filter((b) => b.id !== book.id).concat(book)
      );
    }
  };

  const handleSearch = async (query, maxResult) => {
    if (query.length) {
      BooksAPI.search(query.trim(), maxResult).then((result) => {
        if (result !== undefined && result.error !== 'empty query') {
          const updatedBooks = result.map((book) => {
            books.map((b) => {
              if (b.id === book.id) {
                book.shelf = b.shelf;
              }
              return b;
            });
            return book;
          });
          setSearchBooks(updatedBooks);
        }
      });
    } else {
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
