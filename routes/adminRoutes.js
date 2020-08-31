const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const { route } = require('./defaultRoutes');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';

    next();
})

router.route('/')
    .get(adminController.index);

router.route('/posts')
    .get(adminController.getPosts);


router.route('/posts/create')
    .get(adminController.createPost)
    .post(adminController.submitPosts);

router.route('/posts/edit/:id')
    .get(adminController.editPost)
    .put(adminController.submitEditedPost);

router.route('/posts/delete/:id')
    .delete(adminController.deletePost);

router.route('/category')
    .get(adminController.getCategory);

router.route('/category/create')
    .post(adminController.createCategory);


router.route('/category/edit/:id')
    .get(adminController.getEditCategory)
    .post(adminController.postEditCategory);


router.route('/category/delete/:id')
    .delete(adminController.deleteCategory);


module.exports = router;