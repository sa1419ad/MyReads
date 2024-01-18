import React, { useEffect } from'react';
import * as BooksAPI from './BooksAPI';
const SearchBar = () => {
  const  
    useEffect(() => {
        BooksAPI.search("re", 10)
            .then((data) => {
              books=data;
            })
            .catch((e)=> {
                console.log(e);
            });
    }, []);
    
    return (
        <div></div>
    )
}

export default SearchBar;