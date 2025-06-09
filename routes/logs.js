const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

router.post('/', async (req, res) => {
  try {
    await Log.insertMany(req.body);
    res.status(200).send("Guardados " + req.body.length + " logs");
  } catch (error) {
    console.error("Error al guardar logs:", error);
    res.status(500).send("Error");
  }
});

module.exports = router;