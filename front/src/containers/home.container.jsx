/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-polyglot';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

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
  // const cards = [
  //   {
  //     title: 'Title 1',
  //     content: 'Contenu 1 Etiam egestas ac mauris sit amet interdum. Integer quis felis imperdiet, tincidunt augue sit amet, dignissim sapien. Quisque elementum iaculis efficitur. Vivamus et arcu pulvinar, euismod velit tincidunt, egestas erat. Donec elementum sit amet nisl ut aliquet. Nam convallis, nisi quis vulputate laoreet, odio dui bibendum mauris, eget rhoncus sapien odio aliquam nulla. Vivamus quis pretium mauris. Suspendisse aliquam ipsum nec purus tristique, ac tempor nisl elementum. Donec ornare ultrices metus, ac porta lacus gravida sed.',
  //   },
  //   {
  //     title: 'Title 2',
  //     content: 'Contenu 2',
  //   },
  //   {
  //     title: 'Title 3',
  //     content: 'Contenu 3 Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam gravida velit et pretium posuere. Duis condimentum feugiat dignissim. Etiam quis mauris non erat hendrerit sollicitudin eget et neque. Sed tortor tellus, molestie ut suscipit ut, vehicula ac leo. Donec cursus tellus luctus odio sagittis, sit amet euismod nibh interdum. Curabitur scelerisque, libero sit amet dignissim varius, sapien nisi mattis lacus, vitae rutrum libero magna in lectus. In pharetra sagittis magna, eget feugiat erat tempor sagittis. Sed feugiat ligula sed mauris condimentum aliquam.',
  //   },
  //   {
  //     title: 'Title 4',
  //     content: 'Contenu 4',
  //   },
  //   {
  //     title: 'Title 5',
  //     content: 'Contenu 5 Phasellus quis nunc laoreet, lobortis enim a, dapibus tellus. In lobortis aliquet massa et euismod. Nunc lobortis dolor a tellus mollis venenatis. Sed dignissim ex vitae massa finibus tincidunt. Fusce nec lectus et tellus interdum pharetra. Donec viverra, risus non convallis vulputate, neque urna vestibulum leo, sit amet accumsan metus velit vel lectus. Sed consequat velit nisi, at fermentum tortor dapibus nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus consectetur posuere leo, in sagittis dui iaculis consequat. In felis urna, elementum a odio ut, rutrum faucibus tellus. Nunc gravida urna sit amet felis venenatis blandit.',
  //   },
  // ];
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
                    {t('by')}
                    {' '}
                    {publication.author}
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
                <Card.Link href="#" className="card-link">{t('moreInfo')}</Card.Link>
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
