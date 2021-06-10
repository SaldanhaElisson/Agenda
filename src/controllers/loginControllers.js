const Login = require("../models/loginModel")

exports.index = (req, res, next) =>{
    res.render('login')
}

exports.register = async function(req, res) {
   try{
    const login = new Login(req.body)
    await login.register();
    console.log(req.body)

    if(login.erros.length >0) {
        req.flash('erros', login.erros);
        req.session.save(function () {
            return res.redirect('back') // -> redirecionando a pagina para voltar (pagina login)
        })   
        return;
    }
    req.flash('success', 'Seu usuario foi criado com sucesso');
        req.session.save(function () {
        res.redirect('back') // -> redirecionando a pagina para voltar (pagina login)
    });
    } catch (e){
        console.log(e)
        return res.render('404')
        
   }
   
   
}