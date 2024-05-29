const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const { timeStamp } = require('console');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => formatDate(timestamp)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        timestamps: true,
        toJSON: { getters: true, virtuals: true },
});

thoughtSchema.virtual('reactionsCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;