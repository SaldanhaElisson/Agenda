const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    email: {type: String, required:true}, //-> tipo string e obrigatorio
    sobrenome: {type: String, required: false, default:''},
    email: {type: String, required: false, default:''},
    telefone: {type: String, required: false, default:''},
    criadoEm: {type: Date, default: Date.now}

})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.contanto=null;
    }

    async register(){
        try{
            this.valida();

            if(this.erros.length > 0 ) return;
            this.contato = await ContatoModel.create(this.body) // -> salvando o contato no banco de dados e enviando a infomração para this.contato
        } catch(err){
            console.log(err);
        }
       
    }

    valida(){
        this.cleanUp();

        // validação 
        // o e-mail precisa ser válido 
        if(this.body.email && !validator.isEmail(this.body.email)) {this.erros.push("erro") }

        if(!this.body.nome) this.erros.push('Nome é um campo obrigatório')
        if(!this.body.email && !this.body.telefone){ 
            this.erros.push('Pelo menos 1')
        }
    }
    
    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ""
            }
        }


        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }

    
    }
}

module.exports = Contato