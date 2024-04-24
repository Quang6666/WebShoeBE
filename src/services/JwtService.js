const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.ACCESS_TOKEN;
const resecretKey = process.env.REFRESH_TOKEN;

const generalAccessToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, secretKey, { expiresIn: '30s' });

    return access_token;
};

const generalRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, resecretKey, { expiresIn: '365d' });

    return refresh_token;
};

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, resecretKey, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'The authentication'
                    });
                }
                const access_token = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                });
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService
};
