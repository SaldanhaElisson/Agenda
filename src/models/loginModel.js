const mongoose = require('mongoose')
const validator = require('validator') //-> verificar se email é valido
const bcryptjs = require('bcryptjs') // -> tranforma a senha rash (parece com criptografia)

const loginSchema = new mongoose.Schema({
   email: {type: String, required:true}, //-> tipo string e obrigatorio
   password: {type: String, required:true} //-> tipo string e obrigatorio
}) //-> organizar o banco de dados e criando como se fosse uma função construtura

const LoginModel = mongoose.model('login', loginSchema)

class Login { // validar os dados
    constructor(body){
        this.body = body;
        this.erros = [] // vai verificar se o usario pode ser criado na base dados
        this.user = null
    }

    async login(){
        this.valida()
        if(this.erros.length > 0) return //-> se tiver algum erro vai dá ruim
        
        this.user = await LoginModel.findOne({email:this.body.email}); //-> verificar se existe o usuario no banco de dados

        if(!this.user){
            this.erros.push('Usuario não existe');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.erros.push('Senha inválida')
            this.user = null;
            return;
        } //verificando se a senha que foi enviada no login é a mesma senha no banco de dados

    }

    async register(){
        
        this.valida();
        
        if(this.erros.length > 0) return //-> se tiver algum erro vai dá ruim
        console.log(this.erros.length)

        await this.userExists(); //_. checar se o usario existe

        const salt = bcryptjs.genSaltSync(); //- gerando rash (parece com criptografada)
        this.body.password = bcryptjs.hashSync(this.body.password, salt)  // -> fazendo com que nossa senha seja gerada um rash
        this.use = await LoginModel.create(this.body) // -> criando o usuario 
    } 

    async userExists(){
        this.user = await LoginModel.findOne({email:this.body.email}) // verificando se tem aquele email no bando dedados 
        if(this.user) this.erros.push('Usuario já existe.')

    }

    valida(){
        this.cleanUp()
        // validação
        //O e-mail precisa ser válido
        if(!validator.isEmail(this.body.email)) this.erros.push('E-mail inválido')
       
        // a senha precisa ter entre 3 e 50
        if(this.body.password.length < 3 || this.body.password.length > 50){
            this.erros.push('A senha precisa ter entre 3 e 50 caracteres.')
        }
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ""
            } // -> limpando os campos
        }


        this.body = {
            email: this.body.email,
            password: this.body.password
        } //-> garantindo que o campo irá receber corretamente os dados

    
    }
}

module.exports = Login