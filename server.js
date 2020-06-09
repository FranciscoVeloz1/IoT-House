const express = require('express')
const path = require('path')
const mainRoute = require('./routes/main')
const hpRoute = require('./routes/hp')
const heRoute = require('./routes/he')
const entRoute = require('./routes/entrada')
const salaRoute = require('./routes/sala')
const jardinRoute = require('./routes/jardin')
const banoRoute = require('./routes/bano')

var app = express()

//archivos estaticos 
app.use('/', express.static('public'))

//configuracion
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

//Routes
app.use('/', mainRoute)
app.use('/habitacionprincipal', hpRoute)
app.use('/habitacionextra', heRoute)
app.use('/entrada', entRoute)
app.use('/sala', salaRoute)
app.use('/jardin', jardinRoute)
app.use('/bano', banoRoute)

//iniciar Servidor
app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000')
})

