const express = require('express');
const route = express.Router();

/** Importando os controllers*/
const HomeUSerController = require('./src/controllers/HomeUSerController');
const IndexController = require('./src/controllers/IndexController');

/** Logins controlhers */
const LoginController = require('./src/controllers/LoginController');
const CadastroController = require('./src/controllers/CadastroController');
const { Router } = require('express');

/** Rota index, vindo do IndexControllers */
route.get('/', IndexController.index);

/** Rotas da Home, vindo do HomeUSerController */
route.get('/home', HomeUSerController.home);

/** Rotas do login, vindo do LoginController */
route.get('/login', LoginController.index);

/** Rotas de cadastro, vindo do cadastroController */
route.get('/cadastro', CadastroController.index);
route.post('/cadastro/register', CadastroController.register);

/** exportando o route */
module.exports = route;