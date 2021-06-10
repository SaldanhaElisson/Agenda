

// exports.paginaInicial = (req, res) =>{
//     console.log(req.session.usuario) //-> vai ficar salvado no servidor durante 7 dias  mesmo se eu apagar
//     res.render('index')
// }

// exports.paginaInicial = (req, res) =>{
//     req.flash('info', 'Ola mundo!')
//     req.flash('error', 'aisisjs')
//     req.flash('success', 'Blaaaaaa') //-> assim que eu inicar a senssion vai criar essas mesagens e sempre que eu quiser acessar é so chamar 
//     res.render('index')
// }

exports.paginaInicial = (req, res) =>{
    res.render('index', {
        titulo: 'Este se´ra o titulo da página',
        numeros: [1, 2, 3, ,4, 5]
    })
}