console.log('🚀 Server.js está corriendo, versión correcta');
require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Actividad = require('./models/Actividad');

const app = express();
const port = process.env.PORT || 3001;

// Conexión a MongoDB Atlas
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión:', err));

app.use(cors());
app.use(express.json());

app.get('/actividades', async (req, res) => {
  try {
    const actividades = await Actividad.find().sort({ timestamp: -1 }).limit(100);
    res.json(actividades);
  } catch (err) {
    console.error('Error en GET /actividades:', err);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

app.post('/upload', async (req, res) => {
  try {
    const nuevaActividad = new Actividad(req.body);
    await nuevaActividad.save();
    res.status(201).json({ mensaje: 'Datos guardados correctamente' });
  } catch (err) {
    console.error('Error en POST /upload:', err);
    res.status(500).json({ error: 'Error al guardar datos' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});
