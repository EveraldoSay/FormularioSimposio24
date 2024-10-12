const express = require('express');
const router = express.Router();
const conexion = require('./database/db');
const Carreras = require('./Controllers/Carreras');
const Registros = require('./Controllers/Registro');

// RUTA PARA MOSTRAR TODOS LOS REGISTROS
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM carreras', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('verCarrera.ejs', { data: results });
        }
    });
});

// RUTA QUE NOS LLEVA AL FORMULARIO PARA DAR DE ALTA UN NUEVO REGISTRO
router.get('/create', (req, res) => {
    res.render('create');
});

// RUTA PARA EDITAR UN REGISTRO SELECCIONADO
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM carreras WHERE Idcarrera = ?', [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('edit.ejs', { user: results[0] });
        }
    });
});


// RUTA PARA ELIMINAR UN REGISTRO SELECCIONADO
router.post('/delete/:id', (req, res) => {
    crud.delete(req, res).catch(err => {
        console.error('Error al manejar la eliminación:', err); // Agrega log para depuración
        res.status(500).send('Error al procesar la solicitud de eliminación');
    });
});


// RUTA PARA ELIMINAR UN REGISTRO SELECCIONADO
router.get('/delete/:id', crud.delete);
// Invocamos los métodos para el CRUD
router.post('/save', crud.save);
router.post('/update', crud.update);


module.exports = router;



router.get('/Registro', Registro.list); 
router.get('/Registro/create', Registro.create); 
router.post('/Registro/save', Registro.save); 
router.get('/Registro/edit/:id', Registro.edit); 
router.post('/Registro/update', Registro.update); 
router.get('/Registro/delete/:id', Registro.delete);


router.post('/Registro/delete/:id', (req, res) => {
    crud.delete(req, res).catch(err => {
        console.error('Error al manejar la eliminación:', err); 
        res.status(500).send('Error al procesar la solicitud de eliminación');
    });
});





