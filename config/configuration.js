module.exports = {
  mongoDbURL: 'mongodb://localhost:27017/cms',
  PORT: process.env.PORT || 3000,

  globalVariables: (req, res, next) => {
    res.locals.success_message = req.flash('success-message');
    res.locals.error_message = req.flash('error-message');

    next();
  }
};
