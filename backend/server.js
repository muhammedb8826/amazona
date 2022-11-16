import express from 'express';
import Data from './Data.js';

const app = express();
app.get('/api/products', (req, res) => {
  res.send(Data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = Data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'product not found' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = Data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'product not found' });
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
