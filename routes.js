const express = require('express');
const routes = express.Router();

// ========== INSTRUCTORS ========= //
//chamando arquivo de funções
const instructors = require("./controllers/instructors")

routes.get('/', function(req,res){
    return res.redirect("/home")
})

routes.get('/home', (req,res)=>{
    return res.render("home");
})

routes.get('/instructors', instructors.index)
routes.get('/instructors/create', function(req,res){
    return res.render("instructors/create")
})
//função importada para trazer dados dos instructors do back para o front
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
//post -> funcao importada de instructos.js para melhor visualização
routes.post('/instructors', instructors.post)

//VERBOS HTTP
// GET : receber RESOURCE
// POST : criar ou salvar NOVO RESOURCE com dados enviados
// PUT : atualizar RESOURCE
// DELETE : apagar RESOURCE

//rota para atualizar instructor após a edição
routes.put("/instructors", instructors.put)
//rota para deletar instructor
routes.delete("/instructors", instructors.delete)


module.exports = routes;