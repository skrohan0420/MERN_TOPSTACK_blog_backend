let asyncWrapper = require('../utils/asyncWrapper')
let validate = require('../utils/validate')
let { usersModel } = require('../models/userModel')
let bycrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let config = require('../config/config')

const signUp = asyncWrapper(async (req, res) => {
    validate(req)

    const { name, email, password } = req.body

    // Check if user already exists
    let isUserExist = await usersModel.find({ email: email })
    if (isUserExist.length > 0) {
        return res.status(400).json({
            status: false,
            message: 'Email Already Exist',
        })
    }

    // Create new user
    let newUser = await usersModel.create({
        name: name,
        email: email,
        password: await bycrypt.hash(password, 10),
        status: 'active',
    })

    if (!newUser) {
        return res.status(400).json({
            status: false,
            message: 'User Not Created',
        })
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET_KEY, {
        expiresIn: '24h',
    })

    return res.status(200).json({
        status: true,
        message: 'User Created Successfully',
        data: newUser,
        token: token,
    })


})

const signIn = asyncWrapper(async (req, res) => {
    validate(req)

    const { email, password } = req.body

    // Check if user already exists
    let isUserExist = await usersModel.find({ email: email })
    if (isUserExist.length === 0) {
        return res.status(400).json({
            status: false,
            message: 'Email Not Found',
        })
    }

    // Check if password is correct
    let isPasswordCorrect = await bycrypt.compare(password, isUserExist[0].password)
    if (!isPasswordCorrect) {
        return res.status(400).json({
            status: false,
            message: 'Invalid Password',
        })
    }
    // Generate JWT token
    const token = jwt.sign({ id: isUserExist[0]._id }, config.JWT_SECRET_KEY, {
        expiresIn: '24h',
    })

    return res.status(200).json({
        status: true,
        message: 'User Signed In Successfully',
        data: isUserExist[0],
        token: token,
    })

})




module.exports = {
    signUp,
    signIn
}