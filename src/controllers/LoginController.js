/** importar model de cadastro */
const Cadastro = require('../models/CadastroModel');

exports.index = (req, res) => {
    if(req.session.user) return res.redirect('/home');
    res.render('login');
    return;
}

exports.login = async (req, res) => {
    try {
        const login = new Cadastro(req.body);
        await login.login();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
               return res.redirect('/login');
            })
            return;
        }
       
        req.flash('success', 'Usuário logado com sucesso!');
        req.session.user = login.user;
        req.session.save(() => {
           return res.redirect('/home');
        })

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}