exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Esta é uma variavel local';
    next();
}

exports.checkCsrfToken = (err, req, res, next) => {
    if(err) {
       return res. render('404');
    }

    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}