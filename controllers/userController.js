let asyncWrapper = require('../utils/asyncWrapper')
let validate = require('../utils/validate')
let { usersModel } = require('../models/userModel')
let bycrypt = require('bcryptjs')


const getAllUsers = asyncWrapper(async (req, res) => {
    validate(req)

    let users = await usersModel.find();

    if (!users || users.length === 0) {
        return res.status(400).json({
            status: false,
            message: 'No Users Found',
        })
    }

    return res.status(200).json({
        status: true,
        message: 'All Users Found',
        data: users
    })
})

const createUser = asyncWrapper(async (req, res) => {
    validate(req)

    const { name, email, password } = req.body

    let isUserExist = await usersModel.findOne({ email: email })
    if (isUserExist) {
        return res.status(400).json({
            status: false,
            message: 'User Already Exist',
        })
    }


    let isSaved = usersModel.create({
        name: name,
        email: email,
        password: password,
        status: 'active'
    })


    if (!isSaved) {
        return res.status(400).json({
            status: false,
            message: 'User Not Created',
        })
    }
    return res.status(200).json({
        status: true,
        message: 'User Created Successfully'
    })


})

const getUserById = asyncWrapper(async (req, res) => {
    validate(req)

    const { id } = req.params

    let user = await usersModel.findById(id)

    if (!user) {
        return res.status(400).json({
            status: false,
            message: 'User Not Found',
        })
    }
    return res.status(200).json({
        status: true,
        message: 'User Found',
        data: user
    })
})


const updateUser = asyncWrapper(async (req, res) => {


    const { id } = req.params
    const { name, email, password } = req.body

    if(password.length < 6) {
        return res.status(400).json({
            status: false,
            message: 'Password must be at least 6 characters long',
        })
    }

    let user = await usersModel.findById(id)
    if (!user) {
        return res.status(400).json({
            status: false,
            message: 'User Not Found',
        })
    }
    if (user.email !== email) {
        let isUserExist = await usersModel.findOne({ email: email })
        if (isUserExist) {
            return res.status(400).json({
                status: false,
                message: 'Email Already Exist',
            })
        }
    }


    let isUpdated = await usersModel.findByIdAndUpdate(id, {
        name: name,
        email: email,
        password: await bycrypt.hash(password, 10)
    }, { new: true })

    if (!isUpdated) {
        return res.status(400).json({
            status: false,
            message: 'User Not Updated',
        })
    }
    return res.status(200).json({
        status: true,
        message: 'User Updated Successfully'
    })

})


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser
}