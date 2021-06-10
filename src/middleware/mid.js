exports.middleware = function(req, res, next) {
     console.log('passei aqui')
     next()
 } // -> passando um middleware em todas as requisições

exports.checkCsrfError = (err, req, res, next) => {
    console.log('passei')
     if(err && 'EBADCSRFTOKEN' === err.code){
         return res.render('404')
     }
     next()
 }

 exports.csrfMiddleware = (req, res, next) =>{
     res.locals.csrf = req.csrfToken()
     next()
 }