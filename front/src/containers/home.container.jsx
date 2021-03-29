import React from 'react';
import { useTranslate } from 'react-polyglot';
import Navbar from '../components/navbar.component';
import ListArticles from '../components/list-articles.component';

const Home = () => {
  const t = useTranslate();

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title">{t('home')}</h1>
        <ListArticles type="home" />
      </div>
    </>
  );
};
export default Home;
