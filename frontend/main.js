import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/LoginValidate';

import './assets/css/style.css';

const login = new Login('#form-login');
login.init();
