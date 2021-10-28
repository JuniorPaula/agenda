const Contato = require("../models/ContatoModel");

/** ContatoController */
exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    });
}

/** método responsavel por verificar e enviar o formulario */
exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato'));
            return;
        }
    
        req.flash('success', 'Contato registrado com sucesso!');
        req.session.save(() => res.redirect(`/contato/edit/${contato.contato._id}`));
        return;

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

/** método responsável por esitar os contatos */
exports.edit = async (req, res) => {
    if(!req.params.id) return res.redirect('404');

    try {
        const contato = await Contato.getUserById(req.params.id);
        if(!contato) return res.redirect('404');
        
        res.render('editar', { contato });

    } catch (e) {
        console.log(e);
    }

}

exports.editarContato = async (req, res) => {
    
    try {

        if(!req.params.id) return res.redirect('404');
        const contato = new Contato(req.body);
        await contato.editContato(req.params.id);
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato'));
            return;
        }
    
        req.flash('success', 'Contato editado com sucesso!');
        req.session.save(() => res.redirect('/home'));
        return;

    } catch (e) {
        console.log(e);
        return res.render('404');
    }

   
}

/** método responsavel por deletar os contatos */
exports.delete = async (req, res) => {
    
    try {
        if(!req.params.id) return res.redirect('404');

        const contato = await Contato.delete(req.params.id);
        if(!contato) return res.redirect('404');
        
        req.flash('success', 'Contato apagado com sucesso!');
        req.session.save(() => res.redirect('/home'));

    } catch (e) {
        console.log(e);
    }
}