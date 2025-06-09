const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Actividad = require('./models/Actividad');

const app = express();
const port = process.env.PORT || 3001;

// ——— Aquí:
app.use(cors({
  origin: ['http://localhost:3000']   // permite sólo tu React en local
  // origin: '*'                       // o permitir todos (para producción, no recomendado)
}));
app.use(express.json());


// Conexión MongoDB Atlas
const uri = 'mongodb+srv://IglooLab:Igl00l48*.@igloobd-teramind.luyjrq6.mongodb.net/monitorDB?retryWrites=true&w=majority&appName=IglooBD-Teramind';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión:', err));

// Endpoint GET
app.get('/actividades', async (req, res) => {
  try {
    const actividades = await Actividad.find().sort({ timestamp: -1 }).limit(100);
    res.json(actividades);
  } catch (err) {
    console.error('Error en GET /actividades:', err);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// Endpoint POST
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
