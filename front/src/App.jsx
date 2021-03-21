import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { I18n } from 'react-polyglot';

import fr from './translations/fr.json';
import en from './translations/en.json';
import Home from './containers/home.container';
import ListPublications from './containers/list-pub.container';
import Publication from './containers/publication.container';
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
    <I18n locale={locale} messages={messages}>
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/publication/list" component={ListPublications} />
            <Route exact path="/publication/:id" component={Publication} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
        {locale !== 'fr'
          ? <button type="button" className="footer footer-btn" onClick={() => setLocale('fr')}>French</button>
          : <button type="button" className="footer footer-btn" onClick={() => setLocale('en')}>Anglais</button>}
      </>
    </I18n>
  );
};

export default App;
