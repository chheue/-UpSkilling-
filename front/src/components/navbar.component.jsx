import React from 'react';
import { useTranslate } from 'react-polyglot';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const t = useTranslate();

  return (
    <div className="my-navbar">
      <Link to="/" className="nav-link">
        {t('home')}
      </Link>
      <Link to="/publication/list" className="nav-link">
        {t('listPub')}
      </Link>
    </div>
  );
};

export default Navbar;
