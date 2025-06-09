// server.js o archivo donde tienes tu backend
const express = require('express');
const mongoose = require('mongoose');
const Actividad = require('./models/Actividad'); // importa tu modelo
const app = express();
const port = process.env.PORT || 3000;

// Conexión y demás código omitidos...

app.get('/actividades', async (req, res) => {
  try {
    const { pc_name, start, end } = req.query;
    const filter = {};

    if (pc_name) {
      filter.pc_name = pc_name;
    }

    if (start || end) {
      filter.timestamp = {};
      if (start) filter.timestamp.$gte = new Date(start);
      if (end) filter.timestamp.$lte = new Date(end);
    }

    const actividades = await Actividad.find(filter).sort({ timestamp: -1 }).limit(100);
    res.json(actividades);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Backend escuchando en http://localhost:${port}`);
});
