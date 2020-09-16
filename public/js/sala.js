
//Conexion Web Socket
//const ws = new this.WebSocket("ws://localhost:8080")
const ws = new this.WebSocket("ws://192.168.1.73:8080")

const APAGADO = "🔴 Apagado"
const ENCENDIDO = "🟢 Encendido"

var EstadoFoco = document.getElementById('EstadoFoco')
var BtnEncenderFoco = document.getElementById('BtnEncFoco')
var BtnApagarFoco = document.getElementById('BtnApgFoco')

BtnEncenderFoco.addEventListener("click", () => {
    EstadoFoco.innerHTML = ENCENDIDO
    ws.send("12")
})

BtnApagarFoco.addEventListener("click", () => {
    EstadoFoco.innerHTML = APAGADO
    ws.send("13")
})