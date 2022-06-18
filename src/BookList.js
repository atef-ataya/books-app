import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

function BookList({ books, handleUpdate }) {
  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            books={books}
            query="currentlyReading"
            shelfTitle="Currently Reading"
            handleUpdate={handleUpdate}
          />
          <BookShelf
            books={books}
            query="wantToRead"
            shelfTitle="Want To Read"
            handleUpdate={handleUpdate}
          />
          <BookShelf
            books={books}
            query="read"
            shelfTitle="Read"
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default BookList;
