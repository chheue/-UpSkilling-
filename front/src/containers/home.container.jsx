import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-polyglot';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Navbar from '../components/navbar.component';
import publicationsAction from '../actions/publications.action';

const mapStateToProps = (state) => {
  const { publications } = state.getAllPublications;
  return { publications };
};

const mapDispatchToProps = (dispatch) => ({
  getAll: () => dispatch(publicationsAction.getAll()),
});

const Home = ({ publications, getAll }) => {
  useEffect(() => {
    getAll();
  }, []);

  const t = useTranslate();
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title">{t('home')}</h1>
        <div className="card-container">
          {publications.map((publication) => (
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
      </div>
    </>
  );
};

Home.propTypes = {
  getAll: PropTypes.func,
  publications: PropTypes.arrayOf(PropTypes.object),
};

Home.defaultProps = {
  getAll: () => {},
  publications: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
