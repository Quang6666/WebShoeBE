const Cart = require('../models/CartModel');

const createCart = (newCart) => {
    return new Promise(async (resolve, reject) => {
        const { userId, productId, totalPrice} = newCart
        try {
            const checkCart = await Cart.findOne({
                userId: userId,
                productId: productId,
                totalPrice: totalPrice
            })
            if (checkCart !== null){
                resolve({
                    status: 'OK',
                    message: 'The cart is already'
                })
            }

            const createCart = await Cart.create({
                userId, productId, totalPrice
            });
            if (createCart) {
                resolve({
                    status: 'OK',
                    message: 'Cart created successfully',
                    data: createCart
                });
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};
const getCartByUserId = async (userId) => {
    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return {
                status: 'ERR',
                message: 'Cart not found'
            };
        }
        return {
            status: 'OK',
            message: 'Cart found',
            data: cart
        };
    } catch (error) {
        throw error;
    }
};
const deleteCartByUserId = async (userId) => {
    try {
        // Tìm giỏ hàng của người dùng dựa trên userId và xóa nó
        const result = await Cart.deleteOne({ userId: userId });

        
        if (result.deletedCount === 0) {
            return {
                status: 'ERR',
                message: 'No cart found for the specified user'// Kiểm tra xem có giỏ hàng nào được xóa không
            };
        }

        return {
            status: 'OK',
            message: 'Cart deleted successfully'
        };
    } catch (error) {
        throw error; 
    }
};

module.exports = {
    createCart,
    getCartByUserId,
    deleteCartByUserId
};
