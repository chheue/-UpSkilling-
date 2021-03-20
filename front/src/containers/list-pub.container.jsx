import React from 'react';
import { useTranslate } from 'react-polyglot';

const ListPublications = () => {
  const t = useTranslate();
  return (
    <>
      <h1>{t('listPub')}</h1>
    </>
  );
};

export default ListPublications;
