/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-polyglot';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import format from 'date-fns/format';
import { en, fr } from 'date-fns/locale';
import parseJSON from 'date-fns/parseJSON';

import publicationsAction from '../actions/publications.action';
import Navbar from '../components/navbar.component';
import LocaleContext from '../helpers/locale.context';

const mapStateToProps = (state) => {
  const { publication } = state.getPublication;
  const { comments } = state.getComments;
  return { publication, comments };
};

const mapDispatchToProps = (dispatch) => ({
  getById: (id) => dispatch(publicationsAction.getById(id)),
  commentPublication: (values, id) => dispatch(publicationsAction.commentPublication(values, id)),
  getComments: (id) => dispatch(publicationsAction.getComments(id)),
});

const Publication = ({
  publication, comments, getById, commentPublication, getComments,
}) => {
  const { id } = useParams();
  const { locale } = useContext(LocaleContext);
  const [lang, setLang] = useState(en);

  useEffect(() => {
    getById(id);
  }, []);

  useEffect(() => {
    getComments(id);
  }, [comments.size]);

  useEffect(() => {
    setLang(locale === 'en' ? en : fr);
  }, [locale]);

  const t = useTranslate();
  return (
    <>
      <Navbar />
      <>
        <div className="article-container">
          <h1>
            {publication.title}
          </h1>
          <h5>
            <i>
              {/* {todo Check format string (Normalement même que les autres mais format fonctionne pas)} } */}
              {/* {`${t('by')} ${publication.author}, ${format(parseJSON(publication.creationDate).toString(), 'PPP', { locale: lang })}`} */}
              {`${t('by')} ${publication.author}, ${publication.creationDate}`}
            </i>
          </h5>
          <br />
          <div className="text-container">
            {publication.content}
          </div>
        </div>
        <div className="comment-container">
          <h4>{t('comments')}</h4>
          <br />
          {comments.map((comm) => (
            <div key={comm.id}>
              <p>{comm.comment}</p>
              <p><i>{`${comm.comment_author}`}</i></p>
              <hr className="separation-line" />
            </div>
          ))}
        </div>
        <Formik
          initialValues={{ author: '', comment: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.author) {
              errors.author = t('required');
            }
            if (!values.comment) {
              errors.comment = t('required');
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            try {
              commentPublication(values, id);
              resetForm();
            } catch (e) {
              console.log(e);
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                <input type="text" name="author" placeholder={t('author')} onChange={handleChange} value={values.author} />
                {errors.author}
                <br />
                <input type="text" name="comment" placeholder={t('comment')} onChange={handleChange} value={values.comment} />
                {errors.comment}
                <br />
                <button type="submit" style={{ width: 250, alignSelf: 'center' }} disabled={isSubmitting}>
                  {t('submit')}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </>
    </>
  );
};

Publication.propTypes = {
  getById: PropTypes.func,
  commentPublication: PropTypes.func,
  getComments: PropTypes.func,
  publication: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object),
};

Publication.defaultProps = {
  getById: () => {},
  commentPublication: () => {},
  getComments: () => {},
  publication: {},
  comments: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Publication);
