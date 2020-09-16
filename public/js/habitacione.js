
//Conexion Web Socket
//const ws = new this.WebSocket("ws://localhost:8080")
const ws = new this.WebSocket("ws://192.168.1.73:8080")

const APAGADO = "🔴 Apagado"
const ENCENDIDO = "🟢 Encendido"

var EstadoFoco = document.getElementById('EstadoFoco')
var BtnEncenderFoco = document.getElementById('BtnEncFoco')
var BtnApagarFoco = document.getElementById('BtnApgFoco')
var EstadoCon = document.getElementById('ConEstado')
var BtnEncenderCon = document.getElementById('ConEncender')
var BtnApagarCon = document.getElementById('ConApagar')

BtnEncenderFoco.addEventListener("click", () => {
    EstadoFoco.innerHTML = ENCENDIDO
    ws.send("4")
})

BtnApagarFoco.addEventListener("click", () => {
    EstadoFoco.innerHTML = APAGADO
    ws.send("5")
})

BtnEncenderCon.addEventListener("click", () => {
    EstadoCon.innerHTML = ENCENDIDO
    ws.send("6")
})

BtnApagarCon.addEventListener("click", () => {
    EstadoCon.innerHTML = APAGADO
    ws.send("7")
})