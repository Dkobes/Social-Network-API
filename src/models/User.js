import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reaction',
    },
],
    fiends : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USer',
    },
],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lostLogin: {
        type: Date,
    },
});

const User = mongoose.model('User', userSchema);

export default User;