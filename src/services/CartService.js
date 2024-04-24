const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

const createCart = async (newCart) => {
    const { userId, products } = newCart;
    try {
        const checkCart = await Cart.findOne({ userId: userId });
        if (checkCart !== null) {
            const updatedProducts = await Promise.all(products.map(async (product) => {
                const existingProduct = checkCart.products.find(p => p.product.toString() === product.productId.toString());
                if (existingProduct) {
                    const productInfo = await Product.findById(existingProduct.product);
                    if (productInfo.countInStock > existingProduct.quantity) {
                        existingProduct.quantity += 1;
                        return existingProduct;
                    } else {
                        return existingProduct;
                    }
                } else {
                    const productInfo = await Product.findById(product.productId);
                    if (productInfo.countInStock > 0) {
                        return {
                            name: productInfo.name,
                            image: productInfo.image,
                            price: productInfo.price,
                            product: productInfo,
                            quantity: 1
                        };
                    } else {
                        return null;
                    }
                }
            }));
            const filteredProducts = updatedProducts.filter(product => product !== null);
            checkCart.products = filteredProducts;
            await checkCart.save();
            return {
                status: 'OK',
                message: 'Cart updated successfully',
                data: checkCart
            };
        }
        const cartProducts = await Product.find({ _id: { $in: products.map(product => product.productId) }});
        const productsForCart = cartProducts.map(product => ({
            product: product,
            name: product.name,
            image: product.image,
            price: product.price,
            
            quantity: 1
        }));

        const createCart = await Cart.create({
            userId: userId,
            products: productsForCart,
            confirmed: false 
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

const confirmCartByUserId = async (userId) => {
    try {
        // Tìm giỏ hàng của người dùng dựa trên userId
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return {
                status: 'ERR',
                message: 'Cart not found'
            };
        }

        // Đặt trạng thái xác nhận thành true
        cart.confirmed = true;
        await cart.save();

        return {
            status: 'OK',
            message: 'Cart confirmed successfully'
        };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to confirm cart');
    }
};

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
const updateCartByUserId = (userId, updatedCartData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCart = await Cart.findOne({ userId });

            if (!checkCart) {
                resolve({
                    status: 'ERR',
                    message: 'No cart found for the specified user'
                });
            }

            const updatedCart = await Cart.updateOne({ userId }, updatedCartData);

            // Kiểm tra xem có lỗi khi cập nhật hay không
            if (updatedCart.nModified === 0) {
                resolve({
                    status: 'ERR',
                    message: 'Failed to update cart'
                });
            }

            // Trả về phản hồi cho client
            resolve({
                status: 'OK',
                message: 'Cart updated successfully',
                data: updatedCartData // Trả về dữ liệu giỏ hàng đã cập nhật
            });
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    createCart,
    getCartByUserId,
    deleteCartByUserId,
    deleteCarts,
    getAllCarts,
    updateCartByUserId,
    confirmCartByUserId
};
