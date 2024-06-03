const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select();
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID ' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const updatedUser = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'No thought created' })
            }
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body },
                { runValidators: true, new: true });
            if (!thought) {
                return res.status(404).json({
                    message: ' Thought could not be updated with that ID'
                });
            }
            res.status(200).json({ message: 'Thought updated' });
        } catch {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought could be found ' });
            }
            res.status(200).json({ message: ' thought deleted ' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } },
                { runValidators: true, new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No reaction created' })
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);

        }

    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.reactionId });
            if (!thought) {
                return res.status(404).json({ message: 'No reaction could be found ' });
            }
            res.status(200).json({ message: ' Reaction deleted ' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
}