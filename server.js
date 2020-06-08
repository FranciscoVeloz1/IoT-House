var express = require('express')
var path = require('path')
var app = express()

//archivos estaticos 
app.use('/', express.static('public'))

//configuracion
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

//metodo get
app.get('/', (req,res) => {
    res.render('index')
})

app.get('/habitacionprincipal', (req,res) => {
    res.render('habitacionp')
})

app.get('/habitacionextra', (req,res) => {
    res.render('habitacione')
})

app.get('/entrada', (req,res) => {
    res.render('entradap')
})

app.get('/sala', (req,res) => {
    res.render('salap')
})

app.get('/jardin', (req,res) => {
    res.render('jardinp')
})

app.get('/bano', (req,res) => {
    res.render('banop')
})

//iniciar Servidor
app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000')
})

