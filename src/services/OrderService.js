const Order = require('../models/OrderProduct'); // Import model Order
const Cart = require('../models/CartModel')
const createOrderFromCart = async (userId) => {
    try {
        // Tìm giỏ hàng đã xác nhận dựa trên userId
        const confirmedCart = await Cart.findOne({ userId }).populate('products.product');
        if (!confirmedCart || !confirmedCart.confirmed) {
            return {
                status: 'ERR',
                message: 'Confirmed cart not found'
            };
        }

        // Trích xuất thông tin cần thiết từ giỏ hàng đã xác nhận để tạo một đơn hàng mới
        const orderItems = confirmedCart.products.map(product => ({
            name: product.name,
            amount: product.amount,
            image: product.image,
            price: product.price,
            product: product.product._id
        }));
        const { shippingAddress, paymentMethod, totalPrice, user } = confirmedCart;

        // Tạo một đơn hàng mới sử dụng thông tin đã trích xuất
        const order = await Order.create({
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            user
        });

        // Xóa giỏ hàng đã xác nhận
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
