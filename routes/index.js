const Router = require('express').Router({ mergeParams: true });

Router.use('/users', require('./users.routes'));

Router.use('*', (req, res) =>
  res.status(404).json({
    message: 'not found in users routes',
  })
);

module.exports = Router;
