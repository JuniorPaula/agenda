/** importar o mongoose */
const mongoose = require('mongoose');

const validator = require('validator');
const bcryptjs = require('bcryptjs');

/** criar Schema: mongoose schema para modelar os dados */
const CadastroSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    
});

const CadastroModel = mongoose.model('Cadastro', CadastroSchema);

/** Criar class que vai tratar da regra de negocio */
class Cadastro {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    /** método resposável por registrar o usuario na base de dados */
    async register() {
        this.valid();
        if(this.errors.length > 0) return;
        
        await this.userExist();
        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

        this.user =  await CadastroModel.create(this.body);
            
    }

    /** método responsável por checar se o usuário existe na base de dados */
    async userExist() {
        const user = await CadastroModel.findOne({ email: this.body.email });
        if(user) this.errors.push('Usuário já existe!');
    }

    /** método responsável por validar o dados */
    valid() {
        this.cleanUp();

        if(this.body.nome === '') this.errors.push('Nome não pode está vazio');
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if(this.body.senha.length < 3 || this.body.senha.length > 50) {
            this.errors.push('Senha precisar ter entre 3 e 50 caracteres!');
        }


    }

    /** metodo responsável por garantir que, o que está vindo 
     * do formulário é uma string
     */
    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            senha: this.body.senha,
        }
    }
}

module.exports = Cadastro;