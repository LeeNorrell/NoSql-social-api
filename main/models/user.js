const { Schema, model } = require('mongoose');
const userSchema = new Schema(
    {
        username: {
            type: String, 
            trim: true,
            unique: true,
            required: true,
             
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thoughts'}],

        friends: [{ type: Schema.Types.ObjectId, ref: 'users'}]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);


userSchema.virtual('friendsCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;