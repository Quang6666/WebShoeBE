const CartService = require('../services/CartService');

const createCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
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
const deleteCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Gọi hàm xóa giỏ hàng từ service
        const response = await CartService.deleteCartByUserId(userId);

        // Trả về kết quả cho client
        return res.status(200).json(response);
    } catch (error) {
        // Bắt lỗi và trả về lỗi cho client nếu có vấn đề xảy ra
        console.error(error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error'
        });
    }
};
module.exports = {
    createCart,
    getCartByUserId,
    deleteCartByUserId
};
