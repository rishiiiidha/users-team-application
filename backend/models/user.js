const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        min: 1
    },
    first_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address'
        }
    },
    gender: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
        validate: {
            validator: validator.isURL,
            message: 'Invalid avatar URL'
        }
    },
    domain: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
