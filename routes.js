const express = require('express');
const route = express.Router();
const home = require('./src/controllers/homeController')
const logginController = require('./src/controllers/loginControllers')
// Rota da home
route.get('/', home.index);

// Rotas de logins
route.get('/login/index', logginController.index)
route.post('/login/register', logginController.register)


module.exports = route;