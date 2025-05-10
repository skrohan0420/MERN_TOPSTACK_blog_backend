const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            maxlength: [30, 'Blog Title cannot exceed 30 characters'],
        },
        description: {
            type: String,
            trim: true,
        },
        blog: {
            type: String,
            trim: true,
            required: [true, 'Blog content is required'],
        },
        image: {
            type: String,
            default: 'https://placehold.co/600x200',
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'pending', 'suspended'],
            default: 'active',
        },
    },
    { timestamps: true }
);

const blogModel = mongoose.model('blogs', BlogSchema);

module.exports = {
    blogModel,
};
