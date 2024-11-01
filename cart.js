const express = require('express');
const router = express.Router();

const carts = {};

// Add Item to Cart Route
router.post('/add', (req, res) => {
    const { username, item } = req.body;

    if (!carts[username]) {
        carts[username] = [];
    }

    carts[username].push(item);
    res.status(201).json({ message: 'Item added to cart', cart: carts[username] });
});

// Get Cart Items Route
router.get('/:username', (req, res) => {
    const { username } = req.params;
    res.status(200).json({ cart: carts[username] || [] });
});

module.exports = router;
