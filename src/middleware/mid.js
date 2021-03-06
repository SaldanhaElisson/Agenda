exports.middleware = function(req, res, next) {
     console.log('passei aqui')
     next()
 } // -> passando um middleware em todas as requisições

exports.checkCsrfError = (err, req, res, next) => {
    console.log('passei')
     if(err ){
         return res.render('404')
     }
     next()
 }

 // esse middleware está passando por todas as paginas
 exports.csrfMiddleware = (req, res, next) =>{
     res.locals.csrf = req.csrfToken()
     res.locals.success = req.flash('success') // -> enviando pelo back end uma mesagem de sucesso
     res.locals.erros = req.flash('erros');
     res.locals.user = req.session.user // -> estou dizendo que o usario está logado
     next()
 }

 exports.loginRequired = (req, res, next) => {
     if(!req.session.user){ //-> estou verificando se o usario não está logado
         req.flash('erros', 'Você precisa fazer login');
         req.session.save(()=> res.redirect('/'))
         return
     }

     next()
 }

 