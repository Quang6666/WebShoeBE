const CartService = require('../services/CartService');

const createCart = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'User ID is required'
            });
        } 

        const response = await CartService.createCart(req.body);
        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error'
        });
    }
};

const getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const response = await CartService.getCartByUserId(userId);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    createCart,
    getCartByUserId
};
