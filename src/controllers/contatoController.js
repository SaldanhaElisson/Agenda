const Contato = require('../models/contatoModel')

exports.index = (req, res)=>{
    res.render('contato')
}

exports.register = async (req, res)=>{
    console.log('ola')
    try{
        const contato = new Contato(req.body);
        await contato.register()
        
        

        if(contato.erros.length > 0){
            console.log(contato.erros.length)
            req.flash('erros', contato.erros);
            req.session.save(()=> res.redirect('back'))
            return
    }

    req.flash('success', ' Contato registrado com sucesso.');
    req.session.save(()=> res.redirect('back')); // -> redirecionando a pagina para voltar (pagina login))
    return
    } catch(e){
        // console.log(e)
        res.render('404')
    }
    

}