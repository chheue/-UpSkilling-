import React from 'react';
import { useTranslate } from 'react-polyglot';

const Publication = () => {
  const t = useTranslate();
  return (
    <>
      <h1>{t('pub')}</h1>
    </>
  );
};

export default Publication;
