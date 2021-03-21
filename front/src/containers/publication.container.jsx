import React from 'react';
import { useTranslate } from 'react-polyglot';
import Navbar from '../components/navbar.component';

const Publication = () => {
  const t = useTranslate();
  return (
    <>
      <Navbar />
      <h1 className="title">{t('pub')}</h1>
    </>
  );
};

export default Publication;
