
//Conexion Web Socket
//const ws = new this.WebSocket("ws://localhost:8080")
const ws = new this.WebSocket("ws://192.168.1.73:8080")

const APAGADO = "🔴 Apagado"
const ENCENDIDO = "🟢 Encendido"
const CERRADO = "🔴 Cerrada"
const ABIERTO = "🟢 Abierta"

var EstadoFoco = document.getElementById('EstadoFocoIn')
var BtnEncenderFoco = document.getElementById('BtnEncFocoIn')
var BtnApagarFoco = document.getElementById('BtnApgFocoIn')
var PuertaEstado = document.getElementById('PuertaEstado')
var BtnAbrirPuerta = document.getElementById('AbrirPuerta')
var BtnCerrarPuerta = document.getElementById('CerrarPuerta')

BtnEncenderFoco.addEventListener("click", () => {
    EstadoFoco.innerHTML = ENCENDIDO
    ws.send("8")
})

BtnApagarFoco.addEventListener("click", () => {
    EstadoFoco.innerHTML = APAGADO
    ws.send("9")
})

BtnAbrirPuerta.addEventListener("click", () => {
    PuertaEstado.innerHTML = ABIERTO
    ws.send("10")
})

BtnCerrarPuerta.addEventListener("click", () => {
    PuertaEstado.innerHTML = CERRADO
    ws.send("11")
})