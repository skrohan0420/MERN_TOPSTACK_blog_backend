express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')
const rules = require('../utils/rules')


router.post('/', blogController.addBlog)
router.put('/:id', blogController.updateBlog)
router.get('/', blogController.getAllBlogs)
router.delete('/:id', blogController.deleteBlog)

module.exports = router
