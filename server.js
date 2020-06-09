const express = require('express')
const path = require('path')
const mainRoute = require('./routes/main')
const hpRoute = require('./routes/hp')
const heRoute = require('./routes/he')
const entRoute = require('./routes/entrada')
const salaRoute = require('./routes/sala')
const jardinRoute = require('./routes/jardin')
const banoRoute = require('./routes/bano')
const sensorRoute = require('./routes/sensor');
const http = require('http')
const five = require("johnny-five")
const socketIO = require("socket.io")
const WebSocket = require("ws");
const sensor = require('./settings/Sensores');

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
app.use('/sensor', sensorRoute)


//Todo lo relacionado a Johnny-five

var gas, luz, temp

circuito.on("ready", () => {

    //Entradas...
    luz = new five.Sensor(sensor.luz)
    gas = new five.Sensor(sensor.gas)
    temp = new five.Thermometer(sensor.temp)

    //Salida Habitacion Principal
    var focoHP = new five.Relay(8);
    var ConHP = new five.Relay(9);

    //Estatus relevador
    focoHP.off()
    ConHP.off()

    //Conexion con WebSockets
    wSocket.on("connection", (ws, req) => {
        
        console.log("ws conectado...")

        ws.on("message", Lectura)

        function Lectura(data) 
        {
            var datos = parseInt(data)
            switch(datos)
            {
                case 0:
                    focoHP.on()
                    break;

                case 1:
                    focoHP.off()
                    break;
            }
        }
    })

    ImprimirSensores()
})

function ImprimirSensores()
{
    SensorGas()
    SensorLuz()

    setTimeout(ImprimirSensores, "1000")
}

function SensorGas()
{
    io.emit("gas", parseInt(gas.value))
}

function SensorLuz()
{
    io.emit("luz", parseInt(luz.value))
}


