let asyncWrapper = require('../utils/asyncWrapper')
let validate = require('../utils/validate')
let { usersModel } = require('../models/userModel')


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


module.exports = {
    createUser,
    getAllUsers,
    getUserById
}