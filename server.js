const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.post('/registrar-monto', (req, res) => {
  const { monto } = req.body;

  if (!monto) {
    return res.status(400).json({ mensaje: 'El monto es requerido' });
  }

  const sql = 'INSERT INTO montos_base (monto) VALUES (?)';

  db.query(sql, [monto], (err, resultado) => {
    if (err) {
      console.error('Error al insertar:', err);
      return res.status(500).json({ mensaje: 'Error del servidor' });
    }

    res.status(201).json({ mensaje: 'Monto base registrado exitosamente' });
  });
});
// Ruta para consultar el último monto base registrado
app.get('/consultar-monto', (req, res) => {
  const sql = 'SELECT * FROM montos_base ORDER BY id DESC';

  db.query(sql, (err, resultados) => {
    if (err) {
      console.error('Error al consultar:', err);
      return res.status(500).json({ mensaje: 'Error al consultar monto base' });
    }

    if (resultados.length > 0) {
      res.status(200).json({ montos: resultados });
    } else {
      res.status(404).json({ mensaje: 'No hay montos registrados' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
