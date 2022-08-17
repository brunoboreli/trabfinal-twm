// ARQUIVO PARA ARMAZENAR FUNÇÕES

const fs = require('fs');
const data = require("../data.json")

//puxando função de converter datas
//por meio da desestruturação de objetos
const { date } = require("../utils.js");


//função para mostrar dados do instrutor no FRONT via ID
exports.show = function(req,res){
    //req.query.id -> pega id direto da url com id?x
    //req.body pega o corpo da requisição do formulario com do metodo post
    //agora usaremos req.params.id = /:id

    const {id} = req.params;

    const foundInstructor = data.instructors.find(function(instructor){
        return (instructor.id == id)
    })

    if(!foundInstructor) return res.send("ERROR: Instructor not found!")


    //ajustando dados com Spread Operator
    const instructor = {
        ...foundInstructor,
        services: foundInstructor.services.split(','),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    }


    return res.render("instructors/show", {instructor})
}



//funcao para o create
exports.post = function(req,res){
    //req.query.id recebia o dado id da requisição na url
    //usaremos req.body pois os dados são originados da inserção
    //no create.njk

    //fazendo com que todos os campos sejam obrigatorios
    const keys = Object.keys(req.body);//construtor de objetos que 
    //pega a "key" de cada elemento do objeto req.body

    for(key of keys){

        //verificando cada key do objeto req.body
        if(req.body[key] == ""){
            return res.send("Please, fill out all fields!")
        }
    }


    //desestruturação do objeto req.body
    let {name,description,services} = req.body;

    //criando chave no objeto req.body com
    //constructor de data de agora -> 'now()'
    const created_at = Date.now();
    const status = false;
    
    //colocando chave id em cada objeto
    const id = Number(data.instructors.length + 1);

    //array de objetos req.body guardados no JSON
    data.instructors.push({
        id,
        name,
        description,
        services,
        status,
        created_at
    })

    //usando node fs para escrever o objeto de informações
    // em arquivo externo
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
             return res.send("Write file ERROR");
        }
        
        return res.redirect("/home")                
    })

}



//função para preencher campos do instructor edit
exports.edit = function(req,res){
    const {id} = req.params;

    const foundInstructor = data.instructors.find(function(instructor){
        return (instructor.id == id)
    })

    if(!foundInstructor) return res.send("ERROR: Request not found!");

    const instructor = {
        ...foundInstructor,
    }


    return res.render('instructors/edit', {instructor})
}


//função para atualizar objeto
exports.put = function(req,res){

    const {id} = req.body;
    let index = 0;

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if(instructor.id == id){
            index = foundIndex;
            return true
        }
    })

    if(!foundInstructor) return res.send("ERROR: Instructor not found!");

    const instructor ={
        ...foundInstructor,
        ...req.body,
        status: req.body.status,
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err) return res.send("ERROR: write file: PUT")

        return res.redirect(`/instructors/${id}`)
    })
}

//função para deletar instructor/objeto
exports.delete = function(req,res){
    const {id} = req.body;

    const filteredInstructors = data.instructors.filter(function(instructor){
        return (instructor.id != id)
    })

    data.instructors = filteredInstructors;

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err) return res.send("ERROR : WRITE FILE : DELETE")

        return res.redirect("/instructors")
    })
}


exports.index = function(req,res){
    return res.render("instructors/index", {instructors: data.instructors})
}