const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  pc_name: String,
  ip: String,
  keylogs: [String],
  clicks: Number,
  aplicaciones: [String],
  screenshot: String, // base64 o URL si las estás guardando
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Actividad', actividadSchema);
