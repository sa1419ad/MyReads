import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import * as BookAPI from "../BooksAPI";
import Book from "./Book";

const SearchBar = ({ changeShelf }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const searchQueryHanlder = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setSearchedBooks([]);
      return;
    }
  };

  const hnadleSearch = useCallback(async (query) => {
    if (query === "") {
      return;
    }

    const booksShlefed = await BookAPI.getAll();

    await BookAPI.search(query).then((fetchedBooks) => {
      if (fetchedBooks.length === 0 || fetchedBooks.error === "empty query") {
        setSearchedBooks([]);
        return;
      }

      fetchedBooks.forEach((fetchedBook) => {
        const bookFound = booksShlefed.find(
          (bookShlefed) => bookShlefed.id === fetchedBook.id
        );
        if (bookFound) {
          fetchedBook.shelf = bookFound.shelf;
          return;
        }
        fetchedBook.shelf = "none";
      });

      setSearchedBooks(fetchedBooks);
    });
  });

  useEffect(() => {
    const Timer = setTimeout(() => {
      hnadleSearch(searchQuery);
    }, 200);

    return () => clearTimeout(Timer);
  }, [searchQuery]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div>
          <input
            type="text"
            onChange={searchQueryHanlder}
            placeholder="Search by title, author, or ISBN"
          />
          <div>
            <ol className="books-grid">
              {searchedBooks.map((book) => (
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
