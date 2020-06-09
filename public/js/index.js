
const APAGADO = "🔴 Apagado"
const ENCENDIDO = "🟢 Encendido"

var H1FSt = document.getElementById('HFSt')
var BtnEFH1 = document.getElementById('BEFH1')
var BtnAFH1 = document.getElementById('BAFH1')

BtnEFH1.addEventListener("click", () => {
    H1FSt.innerHTML = ENCENDIDO
})

BtnAFH1.addEventListener("click", () => {
    H1FSt.innerHTML = APAGADO
})