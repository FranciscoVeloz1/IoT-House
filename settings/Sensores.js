const sensor = {}

sensor.luz = {
    pin: "A5", 
    freq: 50
}

sensor.temp = {
    controller: "LM35",
    pin: "A0"
}

sensor.gas = {
    pin: "A2"
}

module.exports = sensor