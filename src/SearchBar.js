import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as BookAPI from "./BooksAPI";
import Book from "./Book";

const SearchBar = ({ books, changeShelf }) => {
  const [searchBooks, setsearchBooks] = useState([]);

  const search = (query) => {
    if (query.trim() === "") {
      setsearchBooks([]);
    } else {
      BookAPI.search(query, 20).then((books) => {
        if (books.error) {
          setsearchBooks([]);
        } else {
          setsearchBooks(books);
        }
      });
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={(e) => search(e.target.value)}
            placeholder="Search by title, author, or ISBN"
          />
          <div>
            <ol className="books-grid">
              {searchBooks.map((book) => (
                <Book key={book.id} book={book} changeShelf={changeShelf} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
