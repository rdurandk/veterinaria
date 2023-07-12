const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const mascotaShema = new Shema({
  nombreDuenio: String,
  nombreMascota: String,
  tipo: String,
  razon: String,
});

const MascotaDB = mongoose.model("mascotas", mascotaShema);

module.exports = MascotaDB;
