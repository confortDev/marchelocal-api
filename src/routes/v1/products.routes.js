const express = require('express');
const router = express.Router();

const products = require('../data/products');

let nextId = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;

// GET /products - liste de tous les produits
router.get('/', (req, res) => {
    res.status(200).json(products);
});

// GET /products/:id - un produit ou 404 s'il n'existe pas
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);
    if(!product) {
        return res.status(404).json({ error: `Produit ${id} introuvable` });
    }
    res.status(200).json(products);
});


// POST /products - cree un produit, renvoit 201 + entete Location
router.post('/', (req, res) => {
    const { name, price, category } = req.body;
    const product = { id: nextId++, name, price, category };
    products.push(product);
    res.status(201).location(`/products/${product.id}`).json(product);
});


// PUT /products/:id - remplace INTEGRALEMENT un produit, ou 404
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex((p) => p.id === id);
    if(index === -1) {
        return res.status(404).json({ error: `Produit ${id} introuvable` });
    }

    const { name, price, category } = req.body;
    products[index] = { id, name, price, category }; // Ecrase tout
    res.status(200).json(products[index]);
});


// PATCH /products/:id - On modifie PARTIELLEMENT un produit, ou 404
router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);
    if(!product) {
        return res.status(404).json({ error: `Produit ${id} introuvable` });
    }
    // On ne met a jour que les champs fournis; l'id n'est jamais modifiable
    const { name, price, category } = req.body;
    if(name != undefined) product.name = name;
    if(price != undefined) product.price = price;
    if(category != undefined) product.category = category;
    res.status(200).json(product);
});

// DELETE /products/:id - supprime un produit (204) ou 404
router.delete('/:id', (req, res) => {
    const id =  Number(req.params.id);
    const index = products.findIndex((p) => p.id === id);
    if(index === -1) {
        return res.status(404).json({ error: `Produit ${id} introuvable` });
    }
    products.splice(index, 1);
    res.status(204).end(); // 204 No Content : aucun corps renvoyé
});


module.exports = router;