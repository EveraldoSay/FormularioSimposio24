const db = require('../database/db');

exports.list = (req, res) => {
    db.query('SELECT * FROM carreras', (err, results) => {
        if (err) throw err;
        res.render('verCarrera', { data: results });
    });
};

exports.create = (req, res) => {
    res.render('create');
};

exports.save = (req, res) => {
    const { nombre, } = req.body;
    db.query('INSERT INTO carreras (nombre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [nombre], 
    (err) => {
        if (err) throw err;
        res.redirect('/');
    });
};

exports.edit = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM carreras WHERE Idcarrera = ?', [id], (err, results) => {
        if (err) throw err;
        res.render('edit', { user: results[0] });
    });
};

exports.update = (req, res) => {
    const { Idcarrera, nombre} = req.body;
    db.query('UPDATE carreras SET nombre = ?  WHERE Idcarrera = ?', 
    [nombre, Idcarrera], 
    (err) => {
        if (err) throw err;
        res.redirect('/');
    });
};


exports.delete = (req, res) => {
    const id = req.params.id; 
    db.query('DELETE FROM carreras WHERE Idcarrera = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la carrera:', err);
            return res.status(500).send('Error al eliminar la carrera');
        }
        res.redirect('/'); 
    });
};










