const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

const createCart = async (newCart) => {
    const { userId, products } = newCart;
    try {
        // Kiểm tra xem giỏ hàng đã tồn tại chưa
        const checkCart = await Cart.findOne({ userId: userId });
        if (checkCart !== null) {
            return {
                status: 'OK',
                message: 'The cart already exists'
            };
        }
        const productId =  products.map(product => product.productId)
        // Tạo giỏ hàng mới
        const cartProducts = await Product.find({ _id: { $in: productId }});
        const productsForCart = cartProducts.map(product => ({
            product: product,
            name: product.name,
            image: product.image,
            amount: product.amount,
            price: product.price,
            countInStock: product.countInStock,
            rating: product.rating
        }));
        
        const createCart = await Cart.create({
            userId: userId,
            products: productsForCart
        });

        if (createCart) {
            return {
                status: 'OK',
                message: 'Cart created successfully',
                data: createCart
            };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = createCart;



const getCartByUserId = async (userId) => {
    try {
        const cart = await Cart.findOne({ userId }).populate('products');
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
        const result = await Cart.deleteOne({ userId });

        if (result.deletedCount === 0) {
            return {
                status: 'ERR',
                message: 'No cart found for the specified user'
            };
        }

        if (result.deletedCount === 1) {
            return {
                status: 'OK',
                message: 'Cart deleted successfully'
            };
        } else {
            return {
                status: 'ERR',
                message: 'Multiple carts were deleted unexpectedly'
            };
        }
    } catch (error) {
        throw error; 
    }
};

const deleteCarts = async (userIds) => {
    try {
        const result = await Cart.deleteMany({ userId: { $in: userIds } });
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllCarts = async () => {
    try {
        const carts = await Cart.find({});
        return carts;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    createCart,
    getCartByUserId,
    deleteCartByUserId,
    deleteCarts,
    getAllCarts
};
