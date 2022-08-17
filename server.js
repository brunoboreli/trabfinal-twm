// TRABALHO FINAL TWM BRUNO BORELI FERNANDES 11921ECP005

//criação do servidor
const express = require('express');
const nunjucks = require('nunjucks');
//puxando arquivo que contém as rotas
const routes = require("./routes");
 
//method override permite o uso de put e delete nos formularios html
const methodOverride = require('method-override');

const server = express();

//MIDDLEWARES

//responsável por habilitar que os dados se transfiram para 
//o req body como objeto
server.use(express.urlencoded({extended:true}));

//arquivos para servir as requisições
server.use(express.static('public'));

//sobrescrevendo metodo do edit com /instructors?_method=PUT
server.use(methodOverride('_method'));

//criação do middleware de uso das rotas no server
server.use(routes);

//configurando view engine - nunjucks
server.set("view engine","njk");
 
nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})


//colocando servidor online na porta 5000
server.listen(5000,function(){
    console.log("server is running");
})
