
//Conexion Web Socket
//const ws = new this.WebSocket("ws://localhost:8080")
const ws = new this.WebSocket("ws://192.168.1.73:8080")

const APAGADO = "🔴 Apagado"
const ENCENDIDO = "🟢 Encendido"

var EstadoRiego = document.getElementById('EstadoRiego')
var BtnEncenderR = document.getElementById('EncenderRiego')
var BtnApagarR = document.getElementById('ApagarRiego')

BtnEncenderR.addEventListener("click", () => {
    EstadoRiego.innerHTML = ENCENDIDO
    ws.send("14")
})

BtnApagarR.addEventListener("click", () => {
    EstadoRiego.innerHTML = APAGADO
    ws.send("15")
})