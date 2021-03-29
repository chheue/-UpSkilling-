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
      <Link to="/search" className="nav-link">
        {t('search')}
      </Link>
      <Link to="/admin" className="nav-link">
        Administration
      </Link>
    </div>
  );
};

export default Navbar;
