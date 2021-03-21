import React from 'react';
import { useTranslate } from 'react-polyglot';
import Navbar from '../components/navbar.component';

const Home = () => {
  const t = useTranslate();
  return (
    <>
      <Navbar />
      <h1 className="title">{t('home')}</h1>
    </>
  );
};

export default Home;
