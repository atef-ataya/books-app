import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

function BookSearch({ books, handleUpdate, handleSearch }) {
  const handleChange = (query) => {
    if (query) {
      handleSearch(query, 10);
    }
  };
  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Add a book
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books && <BookShelf books={books} handleUpdate={handleUpdate} />}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default BookSearch;
