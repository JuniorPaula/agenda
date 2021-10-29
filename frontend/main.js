import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/LoginValidate';
import Register from './modules/RegisterValidate';

import './assets/css/style.css';

const login = new Login('#form-login');
login.init();

const register = new Register('#form-register');
register.init();
