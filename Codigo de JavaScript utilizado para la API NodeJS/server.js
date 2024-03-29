const express = require('express');
const app = new express();
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const DB_URI = 'mongodb://mongodb/base/labso1?retryWrites=true&w=majority';
const fs = require('fs');
var db;
MongoClient.connect(DB_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    db = client.db("labso1");
});
  

app.use(express.json({ limit: '5mb', extended: true }));

app.post('/', async (req, res) => {
    const data = req.body;
        try {
        let collection = db.collection("personita2");
        let result = await collection.insertOne(data);
        res.json(result.ops[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }   
});



app.get('/', (req, res) => {
    fs.readFile("/proc/201222615_ram" , (err, data) => {
  console.log(data);
  res.json({message:'entro'});
})

});


app.listen(5000);


