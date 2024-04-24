const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock,rating,description } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null){
                resolve({
                    status: 'OK',
                    message: 'The name of product is already'
                })
            }

            const createProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                countInStock,
                rating,
                description
            });
            if (createProduct) {
                resolve({
                    status: 'OK',
                    message: 'User created successfully',
                    data: createProduct
                });
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = Product.find().limit(limit).skip(page * limit);

            if (filter) {
                const filterField = filter[0];
                const filterValue = filter[1];
                const filterObject = {};
                filterObject[filterField] = filterValue;
                query = query.where(filterObject);
            }

            
            if (sort) {
                const sortField = sort[0];
                const sortOrder = sort[1] === 'desc' ? -1 : 1;// Nếu hướng sắp xếp là 'desc' (giảm dần), sử dụng -1; nếu không, sẽ là 1 (tăng dần)
                const sortObject = {};
                sortObject[sortField] = sortOrder;
                query = query.sort(sortObject);
            }

            const totalProduct = await Product.countDocuments();
            const allProduct = await query.exec(); // Thực thi truy vấn và trả về kết quả

            resolve({
                status: 'OK',
                message: 'Search Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalProduct / limit)
            });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
    

};
