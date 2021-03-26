import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-polyglot';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import publicationsAction from '../actions/publications.action';
import Navbar from '../components/navbar.component';

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
  const t = useTranslate();
  const { id } = useParams();

  useEffect(() => {
    getById(id);
  }, []);

  useEffect(() => {
    getComments(id);
  }, [comments.size]);

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
              <p><i>{`${comm.author}`}</i></p>
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
  publication: PropTypes.arrayOf(PropTypes.object),
  comments: PropTypes.arrayOf(PropTypes.object),
};

Publication.defaultProps = {
  getById: () => {},
  commentPublication: () => {},
  getComments: () => {},
  publication: [],
  comments: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Publication);
