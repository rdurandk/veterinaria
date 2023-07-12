const express = require("express");
const router = express.Router();
const Mascota = require("../models/shemaMascota");

router.get("/", async (req, res) => {
  const MascotaDB = await Mascota.find();
  //console.log(MascotaDB);
  res.render("inicio", {
    mascota: MascotaDB,
  });
});

router.get("/creditos", (req, res) => {
  res.render("creditos");
});

router.get("/crear", (req, res) => {
  res.render("crear");
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    await Mascota.create(body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const mascota = await Mascota.findOne({
      _id: id,
    });
    console.log(mascota);
    res.render("detalle", {
      mascota,
      error: false,
    });
  } catch (e) {
    res.render("detalle", {
      error: true,
      mensaje: "No se pudo encontrar el id",
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const mascota = await Mascota.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });
    console.log(mascota);
    res.json({
      estado: true,
      mensaje: "editado",
    });
  } catch (e) {
    res.json({
      estado: false,
      mensaje: "error al editar",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const mascota = await Mascota.findByIdAndDelete({ _id: id });
    res.json({
      estado: true,
      mensaje: "eliminado",
    });
  } catch (error) {
    res.json({
      estado: false,
      mensaje: "error al eliminar",
    });
  }
});

module.exports = router;
