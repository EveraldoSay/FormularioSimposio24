const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Para manejar datos de formularios
app.use(bodyParser.json()); // Para manejar datos JSON si es necesario
app.use(express.static(path.join(__dirname, 'public'))); // Para servir archivos estáticos

// Rutas
app.use('/', router); 

// Puerto PARA USAR SISTEMA
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
