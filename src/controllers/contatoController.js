const Contato = require('../models/contatoModel')

exports.Contato = Contato

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    })
}

exports.register = async (req, res) => {
    
    try {
        const contato = new Contato(req.body);
        await contato.register()



        if (contato.erros.length > 0) {
            console.log(contato.erros.length)
            req.flash('erros', contato.erros);
            req.session.save(() => res.redirect('back'))
            return
        }

        req.flash('success', ' Contato registrado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`)); // -> redirecionando a pagina para editar o contato pelo id
        return
    } catch (e) {
        // console.log(e)
        res.render('404')
    }


}

exports.editIndex = async function (req, res) { // -> permitindo que o usario possa editar 
    if (!req.params.id) return res.render('404')

    const contato = await Contato.buscaPorId(req.params.id) // -> buscando o usario no banco de dados
    if (!contato) return res.render('404') 
    res.render('contato', { contato }) //-> rederizando a tela de edição com os input e os valores correspodente daquele banco de dados
}

exports.edit = async function (req, res) { // -> salvando as edições
    try {
        if (!req.params.id) return res.render('404')
        
        const contato = new Contato(req.body)
        

        await contato.edit(req.params.id);

        if (contato.erros.length > 0) {
            console.log(contato.erros.length)
            req.flash('erros', contato.erros);
            req.session.save(() => res.redirect('back'))
            return
        }

        req.flash('success', ' Contato registrado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`)) // -> redirecionando a pagina para editar o contato pelo id
        return 
    } catch (e) { 
        console.log(e)
        res.render('404')
    }

}

exports.delete = async function (req, res) { 
    if (!req.params.id) return res.render('404')

    const contato = await Contato.delete(req.params.id) // -> buscando o usario no banco de dados
    if (!contato) return res.render('404') 
    req.flash('success', ' Contato deletado com sucesso.');
    req.session.save(() => res.redirect(`back`)); //-> rederizando a tela de edição com os input e os valores correspodente daquele banco de dados
}


