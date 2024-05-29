const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select();
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID ' });
            }
            res.status(200).json({ message: 'User found' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            if(!user) {
                return res.status(404).json({ message: 'No user created' })
            }
            res.status(200).json({ message: 'user created' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { users: req.params.userId } },
                { runValidators: true, new: true });
            if (!user) {
                return res.status(404).json({
                    message: ' User could not be updated with that ID'
                });
            }
            res.status(200).json({ message: 'user updated' });
        } catch {
            res.status(500).json(err);
        }
    },
    async deleteUser(req,res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if(!user) {
                return res.status(404).json( { message: 'No user could be found '});
            }
            res.status(200).json({ message: ' User deleted '});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } },
                { runValidators: true, new: true });
            if(!user) {
                return res.status(404).json({ message: 'No friend created' })
            }
            res.status(200).json({ message: 'friend created' });
        } catch (err) {
            res.status(500).json(err);
        }
        
    },
    async deleteFriend(req,res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.friendId });
            if(!user) {
                return res.status(404).json( { message: 'No friend could be found '});
            }
            res.status(200).json({ message: ' friend deleted '});
        } catch (err) {
            res.status(500).json(err);
        }
    },
}