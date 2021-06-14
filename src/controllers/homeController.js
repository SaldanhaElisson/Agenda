const Contato = require('./contatoController')
const contatobug = Contato.Contato

exports.index = async(req, res) =>{
    const contatos = await contatobug.buscaClients()
    res.render('index', {contatos})
};