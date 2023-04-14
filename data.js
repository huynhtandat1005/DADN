const mongoose = require('mongoose')
const express = require("express");
var expressWs = require('express-ws')

const port = 3000;
const app = express();
expressWs(app)
const cors = require('cors');
app.use(cors());




mongoose.connect('mongodb://127.0.0.1:27017/IoT', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error(err);
});

const Schema = mongoose.Schema

const Data = new Schema({
    Sensor: { type: String, required: true },
    Value: { type: Number, require: true }
}
)


const DataValue = mongoose.model('sensor', Data);


// const createNewDate = new DataValue({
//     sensor: "Humidity",
//     value: 35,
// })

// createNewDate.save()

// const saveData = new DataValue({sensor: "Test1", value: 40});

app.use(function (req, res, next) {
  
    return next();
});
app.get('/', function(req, res, next){
    res.end();
  });

app.ws('/ws', (ws, req) => {
    console.log('WebSocket connection established');
    const sensorData = {
        humid: 0,
        temp: 0,
        light: 0
    }
    // Send a message to the client every second
    const intervalId = setInterval(() => {
        DataValue.find({ Sensor: 'Humidity' }).sort({Timestamp: -1}).limit(1).lean()
            .then(data => sensorData.humid = data[0].Value);
        DataValue.find({ Sensor: 'Tempurature' }).sort({Timestamp: -1}).limit(1).lean()
            .then(data =>data => sensorData.temp = data[0].Value);
        DataValue.find({ Sensor: 'Light' }).sort({Timestamp: -1}).limit(1).lean()
            .then(data =>data => sensorData.ligt = data[0].Value);
        ws.send(JSON.stringify(sensorData))
    }, 3000);

    ws.on('close', () => {
    console.log('WebSocket connection closed');
    clearInterval(intervalId);
    });
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})






