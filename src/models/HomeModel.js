const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
    titulo: {type: String, required: true} //-> tipo string e obrigatorio
}) //-> organizar o banco de dados e criando como se fosse uma função construtura

const HomeModel = mongoose.model('Home', HomeSchema)

class Home {
    
}

module.exports = HomeModel