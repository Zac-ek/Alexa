require('dotenv').config(); // <-- también aquí

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tareasRoutes = require('./routes/tareas');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/tareas', tareasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
