import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { I18n } from 'react-polyglot';

import LocaleContext from './helpers/locale.context';
import fr from './translations/fr.json';
import en from './translations/en.json';
import Home from './containers/home.container';
import SearchPublications from './containers/search.container';
import Publication from './containers/publication.container';
import Admin from './containers/admin.container';
import NotFound from './containers/not-found.container';

import './main.css';

const App = () => {
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState({});

  useEffect(
    () => {
      sessionStorage.setItem('lang', locale);
      const result = locale === 'fr' ? fr : en;
      setMessages(result);
    },
  );

  useEffect(
    () => {
      setLocale(sessionStorage.getItem('lang'));
    },
    [sessionStorage.getItem('lang')],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <I18n locale={locale} messages={messages}>
        <>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/search" component={SearchPublications} />
              <Route exact path="/publication/:id" component={Publication} />
              <Route exact path="/admin" component={Admin} />
              <Route path="*" component={NotFound} />
            </Switch>
          </BrowserRouter>
          {locale !== 'fr'
            ? <button type="button" className="footer footer-btn" onClick={() => setLocale('fr')}>French</button>
            : <button type="button" className="footer footer-btn" onClick={() => setLocale('en')}>Anglais</button>}
        </>
      </I18n>
    </LocaleContext.Provider>
  );
};

export default App;
