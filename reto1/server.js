const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const studentRoutes=require('./routes/student.js');

const app=express();
const port=process.env.PORT || 3000;
// MIDDLEWARE
app.use(express.json());
app.use('/api', studentRoutes);
// FUNIONES APP
app.get('/', (req, res)=>{
    res.send('Bienvenido a este CRUD de credencial de estudiantes');
});
// CONECCIÓN A MONGODB
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log('Conectado estás a la base de datos'))
    .catch((error)=>console.error(error));

app.listen(port, ()=> console.log('Se está escuchando en el puerto '+port));
