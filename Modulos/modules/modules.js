const express = require('express');
const app = new express();
const router = express.Router();
const fs = require('fs');

app.get('/', (req, res) => {
    fs.readFile("/proc/201222615_ram", "utf-8" , (err, data) => {
  console.log(data);
  res.json({message:'entro'});
})

});

app.get('/process', (req, res) => {
    fs.readFile("/proc/cpu_201222615", "utf-8" , (err, data) => {
  console.log(data);
  res.json({message:'procesos'});
})

});

app.listen(80, function () {
console.log("Started application on port %d", 80);
});

