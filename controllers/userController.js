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
            const user = await User.findOne({ _id: req.params.userId }).populate('friends').populate('thoughts')
                
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID ' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId }, 
                { $set: req.body},
                { runValidators: true, new: true }
            );


            if (!user) {
                return res.status(404).json({
                    message: ' User could not be updated with that ID'
                });
            }
            res.status(200).json(user);
        } catch (err) {
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
                return res.status(404).json({ message: 'Cant find a user with that ID' })
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
        
    },
    async deleteFriend(req,res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true });
            if(!user) {
                return res.status(404).json( { message: 'No friend could be found '});
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}