const CartService = require('../services/CartService');

const createCart = async (req, res) => {
    try {
        const { userId, products } = req.body;

        if (!userId || !products) {
            return res.status(400).json({
                status: 'ERR',
                message: 'User ID and products are required'
            });
        } 

        const response = await CartService.createCart(req.body);
        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Create cart failed'
        });
    }
};
const removeProductFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const result = await CartService.removeProductFromCart(userId, productId);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'ERR', message: 'Internal server error' });
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

        const response = await CartService.deleteCartByUserId(userId);

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error'
        });
    }
};
const deleteCarts = async (req, res) => {
    try {
        const { userIds } = req.body; // Đọc danh sách userId từ body request

        // Lặp qua từng userId và gọi hàm xóa giỏ hàng tương ứng
        const deleteResponses = await Promise.all(userIds.map(userId => CartService.deleteCartByUserId(userId)));

        // Trả về kết quả cho client
        return res.status(200).json(deleteResponses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal Server Error'
        });
    }
};
const getAllCarts = async (req, res) => {
    try {
        const carts = await CartService.getAllCarts();

        // Trả về kết quả cho client
        return res.status(200).json({
            status: 'OK',
            message: 'All carts retrieved successfully',
            data: carts
        });
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
    deleteCartByUserId,
    deleteCarts,
    getAllCarts,
    removeProductFromCart
};
