const Contato = require("../models/ContatoModel");

/** Controllers da pagina inicial */
exports.home = async (req, res) => {
    const contatos = await Contato.getContatos();
    res.render('home', { contatos });
}
