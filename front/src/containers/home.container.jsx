import React from 'react';
import { useTranslate } from 'react-polyglot';

const Home = () => {
  const t = useTranslate();
  return (
    <>
      <h1>{t('home')}</h1>
    </>
  );
};

export default Home;
