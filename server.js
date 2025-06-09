const express = require('express');
const mongoose = require('mongoose'); // ✅ Solo una vez
const app = express();
const port = 3000;

// Conexión a MongoDB Atlas
const uri = 'mongodb+srv://IglooLab:Igl00l48*.@igloobd-teramind.luyjrq6.mongodb.net/monitorDB?retryWrites=true&w=majority&appName=IglooBD-Teramind';
;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado a MongoDB Atlas');
})
.catch(err => {
  console.error('❌ Error de conexión:', err);
});

// Resto de tu código...
// Endpoint para recibir datos del cliente
app.post('/upload', async (req, res) => {
  try {
    const nuevaActividad = new Actividad(req.body);
    await nuevaActividad.save();
    res.status(201).json({ mensaje: 'Datos guardados correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar datos' });
  }
});

// Endpoint para ver todas las actividades
app.get('/actividades', async (req, res) => {
  try {
    const actividades = await Actividad.find().sort({ timestamp: -1 }).limit(100);
    res.json(actividades);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Backend escuchando en http://localhost:3000');
});
