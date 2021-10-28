const express = require('express');
const route = express.Router();

/** Importando o HomeControllers */
const HomeController = require('./src/controllers/HomeController');
const LoginController = require('./src/controllers/LoginController');


/** Rotas da Home, vinda do HomeController */
route.get('/', HomeController.index);

/** Rotas do login, vindo do LoginController */
route.get('/login', LoginController.index);


/** exportando o route */
module.exports = route;