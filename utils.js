//1573568256893
module.exports ={
    date: function(timestamp){
        //timestamp será o instructor.birth
        const date = new Date(timestamp);


        const year = date.getUTCFullYear();

        //usando metodo slice para configurar a data
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);

        const day = `0${date.getUTCDate()}`.slice(-2);


        return (`${year}-${month}-${day}`)
    }

}
