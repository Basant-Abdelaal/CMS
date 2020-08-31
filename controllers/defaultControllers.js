const category = require('../models/category');
const post = require('../models/post');

module.exports = {
  index: async (req, res) => {

    const posts = await post.find().lean();
    const categories = await category.find().lean();

    res.render('default/index', { posts: posts, categories: categories });
  },

  loginGet: (req, res) => {
    res.render('default/login');
  },

  loginPost: (req, res) => {
    res.send('You have logged in successfuly');
  },

  registerGet: (req, res) => {
    res.render('default/register');
  },

  registerPost: (req, res) => {
    res.send('You have registered in successfuly');
  }
};
