import React, { useState } from 'react';

function BookShelf({ books, query, shelfTitle, handleUpdate }) {
  const shelfBooks = query
    ? books.filter((book) => book.shelf === query)
    : books;

  const [options, setOptions] = useState([
    { name: 'Move to...', value: null },
    { name: 'Currently Reading', value: 'currentlyReading' },
    { name: 'Want to Read', value: 'wantToRead' },
    { name: 'Read', value: 'read' },
    { name: 'None', value: 'none' },
  ]);

  const booksElement = shelfBooks.map((book) => (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${book.imageLinks?.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              id="shelf"
              defaultValue={book.shelf}
              onChange={(e) => handleUpdate(book, e.target.value)}
            >
              {options.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  ));
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{booksElement}</ol>
      </div>
    </div>
  );
}

export default BookShelf;
