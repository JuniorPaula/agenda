/** importar o mongoose */
const mongoose = require('mongoose');

/** criar Schema: mongoose schema para modelar os dados */
const LoginSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: String
});

const LoginModel = mongoose.model('Login', LoginSchema);

/** Criar class que vai tratar da regra de negocio */
class Login {

}

module.exports = Login;