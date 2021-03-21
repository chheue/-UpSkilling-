import React from 'react';
import { useTranslate } from 'react-polyglot';
import Navbar from '../components/navbar.component';

const NotFound = () => {
  const t = useTranslate();
  return (
    <>
      <Navbar />
      <h1 className="title">{t('404notFound')}</h1>
    </>
  );
};

export default NotFound;
