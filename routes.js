const express = require('express');
const route = express.Router();
const home = require('./src/controllers/homeController')
const logginController = require('./src/controllers/loginControllers')
// Rota da home
const contatoController = require('./src/controllers/contatoController')
route.get('/', home.index);

const {loginRequired} =require('./src/middleware/mid') //-> fiz esse midlleware pois somente os usario logado podemo acessar a pasta de cadastratamento

// Rotas de logins
route.get('/login/index', logginController.index)
route.post('/login/register', logginController.register)
route.post('/login/login', logginController.login)
route.get('/login/logout', logginController.logout)

// Rata de contanto
route.get('/contato/index',loginRequired, contatoController.index)


// rota de cadastramento 
route.post('/contato/register',loginRequired, contatoController.register)


module.exports = route;