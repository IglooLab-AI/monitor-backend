const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  deviceId: String,
  timestamp: Number,
  eventType: String,
  appName: String,
  url: String,
  details: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Log', logSchema);