const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); //forms
app.use(bodyParser.json()); //json

require("dotenv").config();

app.set("view engine", "ejs"); //vistas
app.set("views", __dirname + "/vistas");

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.wjb4v.mongodb.net/veterinaria?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((e) => console.log("Conextion Exitosa"))
  .catch((e) => console.log("Ocurrio un error en la conexion"));

app.use(express.static(__dirname + "/public"));
const mascotas = require("./router/mascotas");
app.use("/", mascotas);

app.listen(port, (req, res) => {
  console.log("Solicitud en el puerto..." + port);
});
