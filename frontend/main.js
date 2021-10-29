import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/LoginValidate';
import Register from './modules/RegisterValidate';
import Contact from './modules/ContactValidate';

import './assets/css/style.css';

const login = new Login('#form-login');
login.events();

const register = new Register();
register.events();

const contact = new Contact('#form-contact');
contact.events();

