const express = require('express');
const cors = require('cors');

const app = express();

// cors : autorise seulement le http://localhost:5173
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API MarcheLocal - Bienvenu', version: '1.0.0' });
});

const productsRoutes1 = require('./routes/v1/products.routes');
app.use('/api/v1/products', productsRoutes1);

module.exports = app;