/** importar o mongoose */
const mongoose = require('mongoose');

const validator = require('validator');

/** criar Schema: mongoose schema para modelar os dados */
const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, default: 'Empty' },
    email: { type: String, default: 'Empty' },
    telefone: { type: String, default: 'Empty' },
    created_at: { type: Date, default: Date.now },

});


const ContatoModel = mongoose.model('Contato', ContatoSchema);

/** Criar class que vai tratar da regra de negocio */
class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    /** método responsável por registrar o contato */
    async register() {
        this.valid();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }

    /** método estático responsável por buscar o contato por id */
    static async getUserById(id) {
        if(typeof id !== 'string') return;
        const user = await ContatoModel.findById(id);
        return user;
    }

    /** método estático responsável por deletar um contato */
    static async delete(id) {
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findOneAndDelete({_id: id});
        return contato;
    }

    /** método estático responsável por buscar todos
     *  os contatos e listar na view */
    static async getContatos() {
        const contato = await ContatoModel.find()
            .sort({ created_at: -1 });
        return contato;
    }

    /** método responsável por editar os contatos */
    async editContato(id) {
        if(typeof id !== 'string') return;
        this.valid();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    /** método responsável por validar o dados */
    valid() {
        this.cleanUp();

        if (this.body.nome === '') this.errors.push('Nome não pode está vazio');
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if (!this.body.email && !this.body.telefone) {
            this.errors.push('Pelo menos um campo tem que ser enviado: email ou telefone');
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
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        }
    }
}

module.exports = Contato;