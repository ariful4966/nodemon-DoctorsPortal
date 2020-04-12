var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

var app = express()
app.use(cors())
app.use(bodyParser.json())

// const userId = process.env.DB_USER;
// const pass = process.env.DB_PASS;



//MongoDB URI
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

//users
const users = ["Nasir", "Nobin", "Robiul", "Shofiqul", "Roqibul"];
//get
app.get('/patients', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("appointment").collection("patients");
        collection.find().limit(10).toArray((err, documents) => {

            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }else{
                res.send(documents);
            }
        })

        // console.log('Database Connect....') 
        client.close();
    });
});
app.get('/fruits', (req, res) => {
    res.send({ fruit: "Apple", quantity: 300, price: 3000 })
})
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.query.sort);
    const name = users[id];
    res.send({ name, id });
})
//post
app.post('/addPatients', (req, res) => {
  
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("appointment").collection("patients");
        collection.insertOne(product, (err, result) => {
            console.log('Successfully Inserted', result);
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }else{
                res.send(result.ops[0]);
            }
        })

        // console.log('Database Connect....')
        client.close();
    });

})




/*
client.connect(err => {
    const collection = client.db("onlineShop").collection("products");
    // perform actions on the collection object
    collection.insertOne({}, (err, res) => {
        console.log('Successfully Inserted');

        client.close();
    })
    console.log('Database Connect....')

});*/
const port = process.env.PORT || 4200;
app.listen(port, () => console.log("Listening Port 4200"))