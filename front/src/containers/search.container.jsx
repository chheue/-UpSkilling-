import React from 'react';
import { useTranslate } from 'react-polyglot';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Formik } from 'formik';
import publicationsAction from '../actions/publications.action';
import Navbar from '../components/navbar.component';

const mapStateToProps = (state) => {
  const { search, searchItems } = state.searchPublication;
  return { search, searchItems };
};

const mapDispatchToProps = (dispatch) => ({
  searchPublication: (title) => dispatch(publicationsAction.searchPublication(title)),
});

const SearchPublications = ({ search, searchItems, searchPublication }) => {
  const t = useTranslate();
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title">{t('search')}</h1>
        <Formik
          initialValues={{ title: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = t('required');
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            try {
              searchPublication(values.title);
              resetForm();
            } catch (e) {
              console.log(e);
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="search-container">
                <input type="text" name="title" placeholder={t('title')} onChange={handleChange} value={values.title} />
                <br />
                <button type="submit" disabled={isSubmitting}>
                  {t('submit')}
                </button>
              </div>
            </form>
          )}
        </Formik>
        {search && (
          <div className="card-container">
            {searchItems.map((publication) => (
              <Card
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
                      {publication.creationDate}
                    </div>
                  </Card.Subtitle>
                </Card.Header>

                <Card.Body className="card-content">
                  {publication.content}
                </Card.Body>
                <Card.Footer>
                  <Link to={`/publication/${publication.id}`} className="card-link">{t('moreInfo')}</Link>
                </Card.Footer>
              </Card>
            ))}
          </div>
        )}

      </div>
    </>
  );
};

SearchPublications.propTypes = {
  searchPublication: PropTypes.func,
  search: PropTypes.bool,
  searchItems: PropTypes.arrayOf(PropTypes.object),
};

SearchPublications.defaultProps = {
  searchPublication: () => {},
  search: false,
  searchItems: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPublications);
