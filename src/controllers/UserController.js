const UserService = require('../services/UserService');

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email);

        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format'
            });
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The password does not match confirmPassword'
            });
        }

        const response = await UserService.createUser(req.body);
        return res.status(201).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Server Error'
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email);

        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format'
            });
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The password does not match confirmPassword'
            });
        }

        const response = await UserService.loginUser(req.body);
        return res.status(201).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Server Error'
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ status: 'ERR', message: 'The userId is required' });
        }
        
        const response = await UserService.updateUser(userId, req.body);
        return res.status(201).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Server Error' });
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ status: 'ERR', message: 'The userId is required' });
        }
        
        const response = await UserService.deleteUser(userId);
        return res.status(201).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Server Error' });
    }
};
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser
};
