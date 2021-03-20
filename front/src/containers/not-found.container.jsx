import React from 'react';
import { useTranslate } from 'react-polyglot';

const NotFound = () => {
  const t = useTranslate();
  return (
    <>
      <h1>{t('404notFound')}</h1>
    </>
  );
};

export default NotFound;
