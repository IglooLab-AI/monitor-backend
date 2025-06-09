const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  pc_name: String,
  ip: String,
  keylogs: [String],
  clicks: Number,
  aplicaciones: [String],
  screenshot: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Actividad', actividadSchema);
