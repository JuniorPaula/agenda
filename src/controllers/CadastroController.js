/** importar model de cadastro */
const Cadastro = require('../models/CadastroModel');

/** Controller da página de cadastro */
exports.index = (req, res) => {
    if(req.session.user) return res.redirect('/home');
    res.render('cadastro');
}

exports.register = async (req, res) => {
    try {
        const cadastro = new Cadastro(req.body);
        await cadastro.register();
    
        if(cadastro.errors.length > 0) {
            req.flash('errors', cadastro.errors);
            req.session.save(() => {
               return res.redirect('/cadastro');
            })
            return;
        }
       
        req.flash('success', 'Usuário criado com sucesso!');
        req.session.save(() => {
           return res.redirect('/cadastro');
        })

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}