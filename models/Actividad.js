// models/Actividad.js
const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  pc_name: String,
  ip: String,
  timestamp: { type: Date, default: Date.now },
  // puedes agregar más campos aquí si lo deseas
});

module.exports = mongoose.model('Actividad', actividadSchema);