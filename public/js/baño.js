
//Conexion Web Socket
//const ws = new this.WebSocket("ws://localhost:8080")
const ws = new this.WebSocket("ws://192.168.1.73:8080")

const APAGADO = "🔴 Apagado"
const ENCENDIDO = "🟢 Encendido"

var EstadoRegadera = document.getElementById('EstadoRegadera')
var EncenderRegadera = document.getElementById('EncenderRegadera')
var ApagarRegadera = document.getElementById('ApagarRegadera')

EncenderRegadera.addEventListener("click", () => {
    EstadoRegadera.innerHTML = ENCENDIDO
    ws.send("16")
})

ApagarRegadera.addEventListener("click", () => {
    EstadoRegadera.innerHTML = APAGADO
    ws.send("17")
})