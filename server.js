const express = require('express')
const path = require('path')
const mainRoute = require('./routes/main')
const hpRoute = require('./routes/hp')
const heRoute = require('./routes/he')
const entRoute = require('./routes/entrada')
const salaRoute = require('./routes/sala')
const jardinRoute = require('./routes/jardin')
const banoRoute = require('./routes/bano')
const http = require('http')
const five = require("johnny-five")
const socketIO = require("socket.io")
const WebSocket = require("ws");

var app = express()
const servidor = http.createServer(app)
const circuito = new five.Board()
const io = socketIO.listen(servidor)
const wSocket = new WebSocket.Server({port: 8080});

//iniciar Servidor
servidor.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000')
})

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


//Todo lo relacionado a Johnny-five

var hola = "Hola"

circuito.on("ready", () => {

    wSocket.on("connection", (ws, req) => {
        
        console.log("ws conectado...")

        ws.on("message", datos => {
            
            switch(datos)
            {
                case 0:
                    console.log("Ws hola mundo")
                    break;
            }

        })
    })

    ImprimirSensores()
})

function ImprimirSensores()
{
    Prueba()

    setTimeout(ImprimirSensores, "1000")
}

function Prueba()
{
    io.emit("Hola", hola)
}


