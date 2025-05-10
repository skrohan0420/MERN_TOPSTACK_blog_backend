const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: [15, 'Name cannot exceed 15 characters'],
        },
        email: {
            type: String,
            trim: true,
            required: [true, 'Email is required'],
            unique: true,
            validate: {
                validator: (value) =>
                    value === null ||
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        value
                    ),
                message: 'Invalid email format.',
            },
        },
        age: {
            type: Number,
            min: [0, 'Age cannot be negative'],
            max: [120, 'Age cannot exceed 120'],
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'Password is required'],
            validate: {
                validator: (value) =>
                   value.length >= 6,
                message: 'Password must be at least 6 characters long.',
            },
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'pending', 'suspended'],
            default: 'active',
        },
    },
    { timestamps: true }
);

const usersModel = mongoose.model('users', UsersSchema);

module.exports = {
    usersModel,
};
