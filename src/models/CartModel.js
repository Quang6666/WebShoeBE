const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    products: [{
        name: { type: String, required: true },
        image: { type: String, required: false },
        price: { type: Number, required: true },
        product: {
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
},
{
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
