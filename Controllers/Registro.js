const db = require('../database/db');

exports.list = (req, res) => {
    db.query('SELECT * FROM registro', (err, results) => {
        if (err) throw err;
        res.render('verRegistro', { data: results });
    });
};

// Renderizar el formulario 
exports.create = (req, res) => {
    // Obtener  para el selector
    db.query('SELECT * FROM registro', (err, registros) => {
        if (err) throw err;
        res.render('createRegistro', { registros });
    });
};

exports.save = (req, res) => {
    const { Idcarrera, Correlativo, Nombre, Apellido, Fecharegistro } = req.body;
    db.query('INSERT INTO carreras (Idcarrera, Correlativo, Nombre, Apellido, Fecharegistro) VALUES (?, ?, ?, ?, ?)', 
    [Idcarrera, Correlativo, Nombre, Apellido, Fecharegistro], 
    (err) => {
        if (err) throw err;
        res.redirect('/verRegistro');
    });
};


exports.edit = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM registro WHERE Idregistro = ?', [id], (err, results) => {
        if (err) throw err;
        // Obtener para el selector
        db.query('SELECT * FROM carreras', (err, carreras) => {
            if (err) throw err;
            res.render('editRegistro', { sucursal: results[0], carreras });
        });
    });
};


exports.update = (req, res) => {
    const { Idcarrera, Idregistro, Correlativo, Nombre, Apellido, fecharegistro } = req.body;
    db.query('UPDATE registro SET Idcarrera = ?, Correlativo = ?, Nombre = ?, Apellido = ?, FechaRegistro = ? WHERE Idregistro = ?', 
    [Idcarrera, Idregistro, Correlativo, Nombre, Apellido, fecharegistro], 
    (err) => {
        if (err) throw err;
        res.redirect('/verRegistro');
    });
};

exports.delete = (req, res) => {
    const id = req.params.id; 
    db.query('DELETE FROM registros WHERE Idregistro = ?', [id], (err) => {
        if (err) {
            console.error('Error al eliminar la registro:', err);
            return res.status(500).send('Error al eliminar registro');
        }
        res.redirect('/verRegistro'); 
    });
};
