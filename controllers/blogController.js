let asyncWrapper = require('../utils/asyncWrapper')
let validate = require('../utils/validate')
let { blogModel } = require('../models/blogModel')


let getAllBlogs = asyncWrapper(async (req, res) => {
    let blogs = await blogModel.find({}).sort({ createdAt: -1 })

    if (!blogs || blogs.length === 0) {
        return res.status(400).json({
            status: false,
            message: 'No Blogs Found',
        })
    }


    return res.status(200).json({
        status: true,
        message: 'All Blogs Found',
        data: blogs,
    })
})

let addBlog = asyncWrapper(async (req, res) => {
    validate(req)

    const { title, description, blog, image } = req.body

    let isSaved = await blogModel.create({
        title: title,
        description: description,
        blog: blog,
        image: image,
        status: 'active'
    })

    if (!isSaved) {
        return res.status(400).json({
            status: false,
            message: 'Blog Not Created',
        })
    }
    return res.status(200).json({
        status: true,
        message: 'Blog Created Successfully'
    })

})

let updateBlog = asyncWrapper(async (req, res) => {


    const { title, description, blog, image } = req.body
    const { id } = req.params

    let isUpdated = await blogModel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        blog: blog,
        image: image,
        status: 'active'
    })

    if (!isUpdated) {
        return res.status(400).json({
            status: false,
            message: 'Blog Not Updated',
        })
    }
    return res.status(200).json({
        status: true,
        message: 'Blog Updated Successfully'
    })

})

let deleteBlog = asyncWrapper(async (req, res) => {
    const { id } = req.params

    let isDeleted = await blogModel.findByIdAndDelete(id)

    if (!isDeleted) {
        return res.status(400).json({
            status: false,
            message: 'Blog Not Deleted',
        })
    }
    return res.status(200).json({
        status: true,
        message: 'Blog Deleted Successfully'
    })

})

module.exports = {
    addBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog
}