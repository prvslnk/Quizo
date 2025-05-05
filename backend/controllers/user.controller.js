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


// @desc    PUT Update own profile (name, email, avatar) through bearer token
// @route   PUT /api/user/myprofile
// @access  Private

export const updateUserProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        if (req.file) {
            const avatar = `/uploads/avatars/${req.file.filename}`;
            user.avatar = avatar;  // Update the avatar path
        }

        await user.save();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            rollNo: user.rollNo,
            standard: user.standard,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
