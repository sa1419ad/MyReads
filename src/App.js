import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import * as BookAPI from "./BooksAPI";
import ListBooks from "./components/ListBooks";
import SearchBar from "./components/SearchBar";
const options = [
  { name: "Currently Reading", id: "currentlyReading" },
  { name: "Want to Read", id: "wantToRead" },
  { name: "Read", id: "read" },
];
function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      const result = await BookAPI.getAll();
      setBooks(result);
    };
    getAllBooks();
  }, []);

  // console.log("cheeck", options);
  const changeShelf = (book, shelf) => {
    book.shelf = shelf;
    BookAPI.update(book, shelf).then(() => {
      BookAPI.getAll().then((books) => setBooks(books));
    });
    setBooks([...books.filter((b) => b.id !== book.id), book]);
  };
  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ListBooks
              books={books}
              changeShelf={changeShelf}
              options={options}
            />
          }
        />
        <Route
          exact
          path="/search"
          element={
            <SearchBar
              books={books}
              changeShelf={changeShelf}
              options={options}
            />
          }
        />
      </Routes>
    </div>
  );
}
export default App;
