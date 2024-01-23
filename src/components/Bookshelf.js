import Book from "./Book";

const Bookshelf = ({ options, option, books, changeShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{option.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books
            .filter((book) => book.shelf === option.id)
            .map((book) => (
              <Book
                key={book.id}
                book={book}
                options={options}
                changeShelf={changeShelf}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};
export default Bookshelf;
