express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')
const rules = require('../utils/rules')
const { authenticateJWT } = require('../middleware/auth')



router.post('/', blogController.addBlog)
router.put('/:id', blogController.updateBlog)

router.get('/', authenticateJWT, blogController.getAllBlogs)

router.delete('/:id', blogController.deleteBlog)

module.exports = router
