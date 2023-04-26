import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Auth from './pages/Auth/Auth';
import Topic from './pages/Topic/Topic';
import { IAuthor, IBook } from './types/Book';
import AddPostForm from './components/Form/Form';

function App() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem('isAuth')
      ? Boolean(localStorage.getItem('isAuth'))
      : false
  );
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              isAuth={isAuth}
              books={books}
              setBooks={setBooks}
              authors={authors}
              setAuthors={setAuthors}
            />
          }
        />
        <Route path="/auth" element={<Auth setIsAuth={setIsAuth} />} />
        <Route
          path="/topic/:id"
          element={
            <Topic
              isAuth={isAuth}
              books={books}
              authors={authors}
              setBooks={setBooks}
              setAuthors={setAuthors}
            />
          }
        />
        <Route
          path="/addpost"
          element={<AddPostForm setBooks={setBooks} setAuthors={setAuthors} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
