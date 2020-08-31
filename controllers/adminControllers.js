const post = require('../models/post');
const category = require('../models/category');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
        //req.flash('info', 'hello!');
    },

    getPosts: (req, res) => {
        post.find().lean().populate('category').then(posts => {
            res.render('admin/posts/index', { posts: posts });
        });
    },

    submitPosts: (req, res) => {
        const commentAllowed = req.body.allowComments ? true : false;
        const newPost = new post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            allowComments: commentAllowed,
            category: req.body.category
        });

        newPost.save().then((post) => {
            console.log(post);
            req.flash('success-message', 'Post Created Successfully');
            res.redirect('/admin/posts');
        });
    },

    createPost: (req, res) => {
        category.find().lean().then(cats => {
            res.render('admin/posts/create', { categories: cats });
        });

    },

    editPost: (req, res) => {
        const id = req.params.id;

        post.findById(id).lean().then(post => {
            category.find().lean().then(cats => {
                res.render('admin/posts/edit', { post: post, categories: cats });
            })

        });

    },

    submitEditedPost: (req, res) => {
        const id = req.params.id;
        const commentAllowed = req.body.allowComments ? true : false;

        post.findById(id).then(editedPost => {
            editedPost.title = req.body.title;
            editedPost.description = req.body.description;
            editedPost.status = req.body.status;
            editedPost.allowComments = commentAllowed;
            editedPost.category = req.body.category;

            editedPost.save().then(post => {
                console.log(post);
                req.flash('success-message', 'Post Updated Successfully');
                res.redirect('/admin/posts');
            });
        });

    },


    deletePost: (req, res) => {
        const id = req.params.id;

        post.findByIdAndDelete(id).then(deletedPost => {
            req.flash('success-message', `Post ${deletedPost.title} Deleted Successfully`);
            res.redirect('/admin/posts');
        });
    },

    getCategory: (req, res) => {
        category.find().lean().then(cats => {
            res.render('admin/category/index', { categories: cats });
        });
    },

    //with refreshing the page
    /*createCategory: (req, res) => {
        const newCategory = new category({
            title: req.body.categoryTitle,
        });
        newCategory.save().then((category) => {
            console.log(category);
            req.flash('success-message', 'Category Created Successfully');
            res.redirect('../../admin/category');
        });
    }*/

    //without refreshing, using ajax
    createCategory: (req, res) => {
        var categoryName = req.body.name;
        if (categoryName) {
            const newCategory = new category({
                title: categoryName
            });
            newCategory.save().then(category => {
                //console.log(category);
                res.status(200).json(category);
            });
        }
    },

    getEditCategory: async (req, res) => {
        const id = req.params.id;

        const cat = await category.findById(id).lean();
        const cats = await category.find().lean();

        res.render('admin/category/edit', { category: cat, categories: cats });
    },

    postEditCategory: (req, res) => {
        console.log("HERE!");
        const id = req.params.id;
        const newTitle = req.body.name;

        category.findById(id).then(cat => {
            cat.title = newTitle;

            cat.save().then(updated => {
                res.status(200).json({ url: 'admin/category' });
            })
        })
    },

    deleteCategory: (req, res) => {
        var id = req.params.id;

        category.findByIdAndDelete(id).then(deletedCategory => {
            req.flash('success-message', `Category ${deletedCategory.title} Deleted Successfuly`);
            res.redirect('/admin/category');
        });
    }

};