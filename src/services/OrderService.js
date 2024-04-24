const Order = require('../models/OrderProduct'); // Import model Order

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItem, shippingAddress, paymentMethod,itemsPrice,shippingPrice,taxPrice,totalPrice,user,isPaid,paidAt,isDelivered,deliveredAt} = newOrder
        try {
            const checkOrder = await Order.findOne({
                orderItem: orderItem,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice:shippingPrice,
                taxPrice:taxPrice,
                user:user,
                isPaid:isPaid,
                paidAt:paidAt,
                isDelivered:isDelivered,
                deliveredAt:deliveredAt,

                totalPrice: totalPrice
            })
            if (checkOrder !== null){
                resolve({
                    status: 'OK',
                    message: 'The order is already'
                })
            }

            const createOrder = await Order.create({
                orderItem, shippingAddress, paymentMethod,itemsPrice,shippingPrice,taxPrice,totalPrice,user,isPaid,paidAt,isDelivered,deliveredAt
            });
            if (createOrder) {
                resolve({
                    status: 'OK',
                    message: 'Order created successfully',
                    data: createOrder
                });
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

const getOrderById = async (orderId) => {
    try {
        // Implementation of getOrderById function
    } catch (error) {
        throw new Error('Failed to fetch order');
    }
}

module.exports = { createOrder, getOrderById };
