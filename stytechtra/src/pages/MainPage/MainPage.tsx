import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Book from '../../components/Book/Book';
import axios from 'axios';
import { IAuthor, IBook } from '../../types/Book';
import { API_HTTP } from '../../constants';

interface MainProps {
  isAuth: boolean;
  books: IBook[];
  authors: Array<{
    _id: string;
    name: string;
  }>;
  setAuthors: React.Dispatch<React.SetStateAction<IAuthor[]>>;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
}

function MainPage({ isAuth, books, setBooks, authors, setAuthors }: MainProps) {
  const [selectedAuthor, setSelectedAuthor] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${API_HTTP}/books`);
        setBooks(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <Header
        isAuth={isAuth}
        authors={authors}
        setAuthors={setAuthors}
        selectedAuthor={selectedAuthor}
        setSelectedAuthor={setSelectedAuthor}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          height: 'inherit',
        }}
      >
        {selectedAuthor
          ? books
              .filter((book) => book.author === selectedAuthor)
              .map((book) => (
                <Book
                  key={book.title}
                  {...book}
                  isAuth={isAuth}
                  books={books}
                  setBook={setBooks}
                />
              ))
          : books.map((book) => (
              <Book
                key={book.title}
                {...book}
                isAuth={isAuth}
                books={books}
                setBook={setBooks}
              />
            ))}
      </div>
    </div>
  );
}

export default MainPage;
