import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
const ACTIONS = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_REQUEST:
      return { ...state, loading: true };
    case ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case ACTIONS.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default function HomeScreen() {
  const [{ products, loading, error }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ACTIONS.FETCH_REQUEST });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: result.data });
      } catch (err) {
        dispatch({ type: ACTIONS.FETCH_FAIL, payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
