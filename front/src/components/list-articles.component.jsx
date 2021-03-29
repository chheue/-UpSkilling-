import React, { useEffect, useContext, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-polyglot';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { en, fr } from 'date-fns/locale';
import parseJSON from 'date-fns/parseJSON';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import publicationsAction from '../actions/publications.action';
import LocaleContext from '../helpers/locale.context';

const mapStateToProps = (state) => {
  const { publications, publicationsLoading, publicationsFetched } = state.getAllPublications;
  const { publicationInserted } = state.insertPublication;
  const { publicationDeleted } = state.deletePublication;
  return {
    publications, publicationsLoading, publicationsFetched, publicationInserted, publicationDeleted,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAll: () => dispatch(publicationsAction.getAll()),
  deletePublication: (id) => dispatch(publicationsAction.deletePublication(id)),
});

const ListArticles = ({
  type,
  publicationInserted,
  publications,
  publicationsLoading,
  publicationsFetched,
  publicationDeleted,
  getAll,
  deletePublication,
}) => {
  const { locale } = useContext(LocaleContext);
  const [lang, setLang] = useState(en);
  useEffect(() => {
    getAll();
  }, [publicationDeleted]);

  useEffect(() => {
    getAll();
  }, [publicationInserted]);

  useEffect(() => {
    setLang(locale === 'en' ? en : fr);
  }, [locale]);

  const t = useTranslate();
  const loadingElement = <p>{t('loading')}</p>;
  const errorElement = <p>{t('errorFetch')}</p>;

  const publicationsElement = (
    <div className="card-container">
      {publicationsFetched
        ? publications.map((publication) => (
          <Card
            key={publication.publication_id}
            bg="dark"
            style={{
              width: 450, height: 'fit-content', maxHeight: 400, margin: 25,
            }}
          >
            <Card.Header>
              <h3>{publication.title}</h3>
              <Card.Subtitle className="card-subtitle">
                <div>
                  {`${t('by')} ${publication.author}`}
                </div>
                <div>
                  {format(parseJSON(publication.creationDate), 'PPP', { locale: lang })}
                </div>
              </Card.Subtitle>
            </Card.Header>
            <Card.Body className="card-content">
              {publication.content}
            </Card.Body>
            <Card.Footer>
              {type === 'admin'
                ? <Card.Text><button type="button" onClick={() => { deletePublication(publication.publication_id); }} style={{ backgroundColor: 'transparent', border: 0, color: 'red' }}>{t('delete')}</button></Card.Text>
                : <Link to={`/publication/${publication.publication_id}`} className="card-link">{t('moreInfo')}</Link>}
            </Card.Footer>
          </Card>
        )) : errorElement }
    </div>
  );

  return (
    <>
      {publicationsLoading
        ? loadingElement
        : publicationsElement}
    </>
  );
};

ListArticles.propTypes = {
  type: PropTypes.string,
  publicationInserted: PropTypes.bool,
  getAll: PropTypes.func,
  deletePublication: PropTypes.func,
  publicationsLoading: PropTypes.bool,
  publicationDeleted: PropTypes.bool,
  publicationsFetched: PropTypes.bool,
  publications: PropTypes.arrayOf(PropTypes.object),
};

ListArticles.defaultProps = {
  type: '',
  publicationInserted: false,
  getAll: () => {},
  deletePublication: () => {},
  publications: [],
  publicationsLoading: true,
  publicationsFetched: false,
  publicationDeleted: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListArticles);
