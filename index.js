const express = require('express')
const app = express();   

//database 

const path = require('path') 
const dataStore = require('nedb'); 
const pathToData = path.resolve(__dirname, "db/db" );
const db = new dataStore({filename:pathToData}); 
db.loadDatabase();

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

// const postosRecarga = [
//     {bairro:"Pernambues", local:"Atakadao"}, 
//     {bairro:"Narandiba", local:"Extra"}, 
//     {bairro:"Boca do River", local:"Atakarejo"}
// ]   

//HOME
app.get("/", (request, response) =>{ 
    response.sendFile(__dirname + '/index.html')
    // response.send("Test")
});  

//LIST ALL

app.get("/listAll", (request, response)=>{ 
    db.find({}, (err, docs) =>{ 
        if(err){ 
            return err
        } 
        response.json(docs)
    })
});  

//POST 

app.post("/add", (request, response)=>{ 
    const newData = Object.assign(request.body) 
    
    db.insert(newData, (err, docs)=>{ 
        if(err){
            return err
        } 
        response.json(docs)
    })
    
})



app.listen(3000, ()=>{ 
    console.log("Server running on PORT 3000");
}); 

