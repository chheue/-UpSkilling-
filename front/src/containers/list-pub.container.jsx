import React from 'react';
import { useTranslate } from 'react-polyglot';
import Navbar from '../components/navbar.component';

const ListPublications = () => {
  const t = useTranslate();
  return (
    <>
      <Navbar />
      <h1 className="title">{t('listPub')}</h1>
    </>
  );
};

export default ListPublications;
