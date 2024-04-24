const Order = require('../models/OrderProduct');
const Cart = require('../models/CartModel')
const createOrderFromCart = async (userId) => {
    try {
        const confirmedCart = await Cart.findOne({ userId }).populate('products.product');
        if (!confirmedCart || !confirmedCart.confirmed) {
            return {
                status: 'ERR',
                message: 'Confirmed cart not found'
            };
        }
        const orderItems = confirmedCart.products.map(product => ({
            name: product.name,
            amount: product.amount,
            image: product.image,
            price: product.price,
            product: product.product._id
        }));
        const { shippingAddress, paymentMethod, totalPrice, user } = confirmedCart;
        const order = await Order.create({
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            user
        });
        await Cart.deleteOne({ userId });

        return {
            status: 'OK',
            message: 'Order created successfully',
            data: order
        };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create order from cart');
    }
};
module.exports = { createOrderFromCart };
