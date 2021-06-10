require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./routes') 
const path = require('path')
const mongoose =  require('mongoose') //-> configurar a base dados
// const helmet = require('helmet') 
const csrf = require('csurf') //-> criação de tolkins fazendo com que nehum site externo posso entrar na aplicação
const {middleware, checkCsrfError, csrfMiddleware} = require('./src/middleware/mid')
// const helmete = require('helmet')

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    console.log('conectado a base de dados')
    app.emit('pronto') //-> vai emitir um sinal
})
.catch((e)=> console.log(e)) //-> ligando a base de dados sem colocar a senha no git caso enviar por causa do env

const session = require('express-session') // -> identificar o cliente 
const MongoStore = require('connect-mongo') // ->salvar a session na date base
const flash= require('connect-flash') // -> mesagnes autodrestutivas salvas em session

// app.use(helmet)

app.use(express.urlencoded({extended: true})) //-> permitir postar formularios para dentro da aplicação

app.use(express.json()) // -> estou dizendo que pode ter arquivos json dentro da aplicação

app.use(express.static(path.resolve(__dirname, 'public'))) //-> aqui estou dizendo somente o que está em publi pode ser mostrado

const sessionOptions = session({
    secret: 'ajijijriejriejr  qwqwq qwqw qw qw',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cooki:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}) // -> opções do session

app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs') // -> existem vários tipos de engine. Com ejs podemos controlar a aplicação

app.use(csrf()) //-> verificar o tolkin, se não tiver não vai fruncionar

app.use(middleware) //-> quando não tem especificação de caminho, estou enviando para todo os caminhos
app.use(checkCsrfError) //-> quando não tem especificação de caminho, estou enviando para todo os caminhos
app.use(csrfMiddleware) //-> quando não tem especificação de caminho, estou enviando para todo os caminhos
app.use(routes)

app.on('pronto',() =>{
    app.listen(9000, () =>{
        console.log('olá mundo terminal')
    })
    
}) //-> vai receber o sinal quando mandar

