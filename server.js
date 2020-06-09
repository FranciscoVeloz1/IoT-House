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
    var FocoHP = new five.Relay(8)
    var ConHP = new five.Relay(9)

    //Salida Habitacion Extra
    var FocoHE = new five.Relay(10)
    var ConHE = new five.Relay(11)

    //Salida Entrada
    var FocoInterior = new five.Relay(12)
    var Cerradura = new five.Relay(13)

    //Salida Sala
    var FocoSala = new five.Relay(7)

    //Salida Jardin
    var BombaJardin = new five.Relay(6)
    var Valvula = new five.Relay(5)

    //Salida Ducha
    var BombaDucha = new five.Relay(4)

    //Estatus relevador
    FocoHP.off()
    ConHP.off()
    FocoHE.off
    ConHE.off
    FocoInterior.off()
    Cerradura.off()
    FocoSala.off()
    BombaJardin.off()
    Valvula.off()
    BombaDucha.off()

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
                    FocoHP.on()
                    break;

                case 1:
                    FocoHP.off()
                    break;

                case 2:
                    ConHP.on()
                    break;

                case 3:
                    ConHP.off()
                    break;

                case 4:
                    FocoHE.on()
                    break;

                case 5:
                    FocoHE.off()
                    break;

                case 6:
                    ConHE.on()
                    break;

                case 7:
                    ConHE.off()
                    break;

                case 8:
                    FocoInterior.on()
                    break;

                case 9:
                    FocoInterior.off()
                    break;

                case 10:
                    Cerradura.on()
                    break;

                case 11:
                    Cerradura.off()
                    break;

                case 12:
                    FocoSala.on()
                    break;

                case 13:
                    FocoSala.off()
                    break;

                case 14:
                    BombaJardin.on()
                    Valvula.on()
                    break;

                case 15:
                    BombaJardin.off()
                    Valvula.off()
                    break;

                case 16:
                    BombaDucha.on()
                    break;

                case 17:
                    BombaDucha.off()
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


