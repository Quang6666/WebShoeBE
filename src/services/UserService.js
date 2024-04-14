const User = require('../models/UserModel');
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require('./JwtService');


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, phone} = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null){
                resolve({
                    status: 'OK',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)

            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            });
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'User created successfully',
                    data: createdUser
                });
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, phone} = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser == null){
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            console.log('comparePassword', comparePassword)
                if(!comparePassword)
                resolve({
                    status: 'OK',
                    message: 'The password or user is incorrect',
                })
                const access_token = await generalAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                });
                
                const refresh_token = await generalRefreshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                });
                
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token,
                    refresh_token
                })
            }
         catch (e) {
            
            reject(e);
        }
    });
};
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            })
        } catch (e) {
            reject(e)
        }
    })
}
const deleteUser = (id) => {
    return new Promise(async(resolve, reject)=>{
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null){
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status:'OK',
                message:'Delete user success',
            })
        } catch(e){
            reject(e)
        }
    })
    
};
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser

};
