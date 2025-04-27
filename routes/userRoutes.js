express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const rules = require('../utils/rules')




router.get('/', userController.getAllUsers)
router.get(
    '/:id', 
    rules.id,
    userController.getUserById
)


router.post(
    '/', 
    [rules.name, rules.email, rules.password],
    userController.createUser
)
module.exports = router;
