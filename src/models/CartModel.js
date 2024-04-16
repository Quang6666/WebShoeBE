
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // trường dùng để lưu trữ ID của người dùng. Dùng để xác định người dùng nào sở hữu giỏ hàng này.
        ref: 'User',// cho biết rằng giá trị của trường này là một ObjectId tham chiếu tới model User 
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
