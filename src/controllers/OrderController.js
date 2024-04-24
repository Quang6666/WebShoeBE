const orderService = require('../services/OrderService');
const createOrder = async (req, res) => {
    try {
        const orderData = req.body;

        // Check if orderData exists
        if (!orderData) {
            return res.status(400).json({ error: 'Missing order data in request body' });
        }

        const newOrder = await orderService.createOrder(orderData);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { createOrder };
