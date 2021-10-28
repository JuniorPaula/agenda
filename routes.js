const express = require('express');
const route = express.Router();

/** Importando os controllers*/
const HomeUSerController = require('./src/controllers/HomeUSerController');
const IndexController = require('./src/controllers/IndexController');

/** Logins controlhers */
const LoginController = require('./src/controllers/LoginController');
const CadastroController = require('./src/controllers/CadastroController');

/** Contato Controller */
const ContatoController = require('./src/controllers/ContatoController');

/** Impotar os middleware */
const { loginRequired } = require('./src/middlewares/middleware');


/** Rota index, vindo do IndexControllers */
route.get('/', IndexController.index);

/** Rotas da Home, vindo do HomeUSerController */
route.get('/home', loginRequired, HomeUSerController.home);

/** Rotas do login, vindo do LoginController */
route.get('/login', LoginController.index);
route.post('/login/singin', LoginController.login);
route.get('/login/logout', LoginController.logout);

/** Rotas de cadastro, vindo do cadastroController */
route.get('/cadastro', CadastroController.index);
route.post('/cadastro/register', CadastroController.register);

/** Rotas de contato / criar contato */
route.get('/contato', loginRequired, ContatoController.index);
route.post('/contato/register', loginRequired, ContatoController.register);
route.get('/contato/edit/:id', loginRequired, ContatoController.edit);
route.post('/contato/editar/:id', loginRequired, ContatoController.editarContato);
route.get('/contato/delete/:id', loginRequired, ContatoController.delete);

/** exportando o route */
module.exports = route;