/** Controllers da pagina inicial */
exports.paginaInicial = (req, res) => {
    /** ultilizando o render pra rendirizar a index.ejs na view */
    res.render('index', {
        titulo: 'Titulo da Pagina',
        numeros: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    });
    return;
}

/** Controlhers da rota de post */
exports.trataPost = (req, res) => {
    res.send(req.body);
    return;
};