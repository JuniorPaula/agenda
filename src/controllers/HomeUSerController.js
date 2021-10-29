const Contato = require("../models/ContatoModel");

/** Controllers da pagina inicial */
exports.home = async (req, res) => {
    const contatos = await Contato.getContatos(req.session.user._id);
    res.render('home', { contatos });
}
