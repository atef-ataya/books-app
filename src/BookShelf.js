import React from 'react';

function BookShelf({ books, query, shelfTitle, handleUpdate }) {
  const shelfBooks = query
    ? books.filter((book) => book.shelf === query)
    : books;

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
              onChange={(e) => handleUpdate(book, e.target.value)}
              defaultValue={book.shelf ? book.shelf : 'none'}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
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
