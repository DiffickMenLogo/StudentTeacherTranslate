import React, { useState } from 'react';
import Translator from '../../components/Translator/Translator';
import { IAuthor, IBook } from '../../types/Book';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // import delete icon
import axios from 'axios';
import { API_HTTP } from '../../constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 1200px;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const HomeLink = styled.div`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: aquamarine;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin: 16px 0;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 32px 0 16px;
`;

const MainSection = styled.main`
  display: flex;
  padding: 16px;
`;

const LeftCol = styled.div`
  width: 70%;
  margin-right: 32px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 32px;
  }
`;

const RightCol = styled.div`
  width: 30%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TranslatorContainer = styled.div`
  margin-top: 32px;
`;

const BookText = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 32px;
  letter-spacing: 0.06em;

  span {
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease-in-out;

    &:hover {
      border-color: #007acc;
    }
  }
`;
interface TopicProps {
  books: IBook[];
  isAuth: boolean;
  authors: IAuthor[];
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
  setAuthors: React.Dispatch<React.SetStateAction<IAuthor[]>>;
}

const TopicPage = ({
  books,
  isAuth,
  setBooks,
  setAuthors,
  authors,
}: TopicProps) => {
  const navigate = useNavigate();
  const id = window.location.href.split('/')[4];
  const book = books.find((book) => book._id === id);

  const [text, setText] = useState('');

  function removeById() {
    const newBooks = books;
    for (let i = 0; i < newBooks.length; i++) {
      if (newBooks[i]._id === id) {
        newBooks.splice(i, 1);
        break;
      }
    }
    setBooks(books);
  }

  function removeAuthorIfNoBooks(author: string) {
    const existBooks = books.filter((book) => book.author === author);
    if (existBooks.length == 0) {
      const newAuthors = authors.filter((aut) => aut.name !== author);
      setAuthors(newAuthors);
    }
  }

  async function handleDeleteBook(e: any) {
    axios
      .delete(`${API_HTTP}/books/${id}`)
      .then(function (response) {
        console.log('Successfully deleted data:', response.data);
        removeAuthorIfNoBooks(response.data.author);
        setBooks((prevBooks: IBook[]) => {
          const newBooks = prevBooks.filter((book) => book._id !== id);
          return newBooks;
        });
      })
      .catch(function (error) {
        console.error('Error deleting data:', error);
      });
    removeById();
    navigate('/');
  }

  const handleAddText = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setText(text + e.currentTarget.innerText);
  };

  return (
    <Container>
      <Header>
        <HomeLink onClick={() => navigate('/')}>Home</HomeLink>
        <div style={{ marginLeft: 'auto' }}>
          {isAuth ? (
            <FaTrash
              onClick={(e) => handleDeleteBook(e)}
              style={{
                color: 'red',
                cursor: 'pointer',
                margin: '0 20px',
              }}
            />
          ) : (
            ''
          )}
        </div>
      </Header>
      <Title>{book?.title}</Title>
      <MainSection>
        <LeftCol>
          <SectionTitle>Description</SectionTitle>
          <BookText>{book?.description}</BookText>
          <SectionTitle>Text</SectionTitle>
          <BookText>
            {book?.text.split(' ').map((word, index) => (
              <span key={index} onClick={(e) => handleAddText(e)}>
                {word}{' '}
              </span>
            ))}
          </BookText>
        </LeftCol>
        <RightCol>
          <TranslatorContainer>
            <Translator text={text} setText={setText} />
          </TranslatorContainer>
        </RightCol>
      </MainSection>
    </Container>
  );
};

export default TopicPage;
