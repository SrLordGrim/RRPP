// index.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://Kevin:12345@cluster0.19asvsx.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Manejo de errores de la conexión a la base de datos
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function () {
  console.log('Conexión exitosa a MongoDB');
});

// Definir el modelo de mensaje
const mensajeSchema = new mongoose.Schema({
  departamento: {
    type: String,
    enum: ['Ventas', 'Tecnologia'],
    required: true,
  },
  asunto: String,
  mensaje: String,
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.post('/api/mensaje', async (req, res) => {
  const { departamento, asunto, mensaje } = req.body;

  try {
    const nuevoMensaje = new Mensaje({ departamento, asunto, mensaje });
    await nuevoMensaje.save();
    res.status(201).json({ message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
});

app.get('/api/mensaje/:departamento', async (req, res) => {
  const { departamento } = req.params;

  try {
    const mensajes = await Mensaje.find({ departamento });
    res.status(200).json(mensajes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los mensajes' });
  }
});

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

function showSection(section) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll('.inbox, .form-container');
  sections.forEach((section) => (section.style.display = 'none'));

  // Mostrar la sección seleccionada
  const selectedSection = document.getElementById(`${section}-section`);
  selectedSection.style.display = 'block';

  // Cargar los mensajes para la sección seleccionada
  cargarMensajes(section);
}
