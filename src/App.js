import React, { useState, useEffect } from 'react';
import './App.css';
import getAllApod from './services/apod';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col } from 'react-grid-system';
import chunk from 'lodash/chunk';

function App() {
  const [apodData, setApodData] = useState([]);
  const initialURL =
    'https://api.nasa.gov/planetary/apod?thumbs=true&count=10&api_key=yZpWm7zfM3TSbfxIPNPGCJkkpB1ZRbvnEUK8m9XG';

  async function fetchData() {
    const response = await getAllApod(initialURL);
    const temporary = [...apodData, ...response];
    setApodData(temporary);
  }

  useEffect(async () => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="App-body">
        <InfiniteScroll
          dataLength={apodData.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Container fluid>
            {chunk(apodData, 3).map((item, itemIndex) => {
              return (
                <Row key={itemIndex} debug style={{ paddingRight: '60px' }}>
                  {item.map((apod, apodIndex) => {
                    return (
                      <Col
                        key={itemIndex * 3 + apodIndex + 1}
                        xs={4}
                        md={4}
                        xl={4}
                        xxl={3}
                      >
                        <div className="card">
                          <div className="card-head">
                            <img
                              src={apod.thumbnail_url || apod.url}
                              alt={apod.title}
                              style={{ width: '100%', height: '200px' }}
                            />
                          </div>
                          <div className="card-body">
                            <h4>
                              <b>{apod.title}</b>
                            </h4>
                            <p>{apod.date}</p>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
          </Container>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
