let asyncWrapper = require('../utils/asyncWrapper')




const getAllUsers = asyncWrapper((req, res) => {
    let users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'Jim Doe' }
    ]

    res.status(200).json({
        status: true,
        message: 'All Users Found',
        data: users
    })


    // res.status(400).json({
    //     status: false,
    //     message: 'No Users Found',
    // })

})

const createUser = asyncWrapper((req, res) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({
            status: false,
            message: 'Name is required'
        })
    }

    res.status(201).json({
        status: true,
        message: 'User Created',
        data: { id: 4, name }
    })

})

let getUserById = asyncWrapper((req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            status: false,
            message: 'ID is required'
        })
    }

    res.status(200).json({
        status: true,
        message: 'User Found',
        data: { id, name: 'John Doe' }
    })

})


module.exports = {
    createUser,
    getAllUsers,
    getUserById
}