const User = require('../models/userModel');

/**
 * Get current user info
 */
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        console.log(req.userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Get all users
 */
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

/**
 * Edit user info
 */
const editUser = async (req, res, next) => {
    try {
        const { userName, address,userImg } = req.body; // Adjust according to your user schema
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            {userName, address,userImg }, // Fields to update
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete user
 */
const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndDelete(userId); // Make sure to use the correct model.
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUser,
    getUsers,
    editUser,
    deleteUser
};
