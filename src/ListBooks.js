import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
const ListBooks = ({ books, changeShelf, options }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div>
        {options.map((option) => (
          <Bookshelf
            key={option.id}
            books={books}
            options={options}
            option={option}
            changeShelf={changeShelf}
          />
        ))}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
