import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-polyglot';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import Navbar from '../components/navbar.component';
import ListArticles from '../components/list-articles.component';
import publicationsAction from '../actions/publications.action';

const mapStateToProps = () => {
};

const mapDispatchToProps = (dispatch) => ({
  insertPublication: (values) => dispatch(publicationsAction.insertPublication(values)),
});

const Admin = ({ insertPublication }) => {
  const t = useTranslate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalElement = (
    <Modal style={{ color: 'black' }} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ author: '', content: '', title: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.author) {
              errors.author = t('required');
            }
            if (!values.content) {
              errors.content = t('required');
            }
            if (!values.title) {
              errors.title = t('required');
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            try {
              insertPublication(values);
              resetForm();
              handleClose();
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
              <div className="add-container">
                <input type="text" name="author" placeholder={t('author')} onChange={handleChange} value={values.author} />
                {errors.author}
                <br />
                <input type="text" name="title" placeholder={t('title')} onChange={handleChange} value={values.title} />
                {errors.title}
                <br />
                <input type="text" name="content" placeholder={t('content')} onChange={handleChange} value={values.content} />
                {errors.content}
                <br />
                <button type="submit" style={{ width: 250, alignSelf: 'center' }} disabled={isSubmitting}>
                  {t('submit')}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title">Administration</h1>
        <Button variant="success" onClick={handleShow}>
          {t('add')}
        </Button>
        {modalElement}
        <ListArticles type="admin" />
      </div>
    </>
  );
};

Admin.propTypes = {
  insertPublication: PropTypes.func,
};

Admin.defaultProps = {
  insertPublication: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
