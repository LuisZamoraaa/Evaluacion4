const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const profesores = require('./routes/profesores');
const estudiantes = require('./routes/estudiantes');
const cursos = require('./routes/cursos');

app.use('/api/profesores', profesores);
app.use('/api/estudiantes', estudiantes);
app.use('/api/cursos', cursos);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
