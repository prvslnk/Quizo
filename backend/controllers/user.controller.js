import User from '../models/user.model.js';

// @desc    Get user profile by ID, email, name, rollNo, or standard
// @route   GET /api/users/profile
// @access  Private/Admin

export const getUserProfile = async (req, res) => {
    try {
        const { id, email, name, rollNo, standard } = req.query;

        const query = {};

        if (id) query._id = id;
        if (email) query.email = email;
        if (name) query.name = { $regex: name, $options: 'i' };
        if (rollNo) query.rollNo = rollNo;
        if (standard) query.standard = standard;

        // Use find for multiple or single result with filters
        const users = await User.find(query).select('-password -createdAt -updatedAt -__v');

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No Match Found.' });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin: Update any user by ID

export const updateUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const updates = {
            name: req.body.name,
            email: req.body.email,
            rollNo: req.body.rollNo,
            standard: req.body.standard,
            role: req.body.role,
        };

        if (req.file) {
            updates.avatar = `/uploads/avatars/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Delete any user by ID
export const deleteUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User: Update own profile (name, email, avatar)
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update allowed fields only
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.file) {
            user.avatar = `/uploads/avatars/${req.file.filename}`;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            rollNo: updatedUser.rollNo,
            standard: updatedUser.standard,
            role: updatedUser.role,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
