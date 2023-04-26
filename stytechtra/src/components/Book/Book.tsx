import React from 'react';

import { IBook } from '../../types/Book';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_HTTP } from '../../constants';

interface BookProps {
  _id: string;
  title: string;
  author: string;
  description?: string;
  coverImage?: string;
  text?: string;
  isAuth: boolean;
  books: IBook[];
  setBook: React.Dispatch<React.SetStateAction<IBook[]>>;
}

function Book({ title, author, books, setBook, _id }: BookProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/topic/${_id}`);
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '20px',
        width: 'calc(25% - 1rem)',
        backgroundColor: '#F0F4F8',
        border: '1px solid #E4E4E7',
        borderRadius: '5px',
        boxShadow: '1px 1px 10px #E4E4E7',
        padding: '10px',
        cursor: 'pointer',
      }}
    >
      <div>
        <h2>{title}</h2>
        <p>By {author}</p>
      </div>
    </div>
  );
}

export default Book;
