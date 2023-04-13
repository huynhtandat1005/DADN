const mongoose = require('mongoose')
const express = require("express");
const port = 3000;
const app = express();
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
    sensor: { type: String, required: true },
    value: { type: Number, require: true }
}, {
    timestamps: true,
}
)


const DataValue = mongoose.model('sensor', Data);


// const saveData = new DataValue({sensor: "Test1", value: 40});
let lastestValue;
function updateValue() {
    DataValue.find({ Sensor: 'Temperature' }).sort({ Timestamp: -1 }).limit(1).lean().then(
        data => {
            app.get('/api/data/temp', (req, res) => {
                res.json(data[0].Value);
            });
            console.log(data[0].Value);
        })
    DataValue.find({ Sensor: 'Light' }).sort({ Timestamp: -1 }).limit(1).lean().then(
        data => {
            app.get('/api/data/light', (req, res) => {
                res.json(data[0].Value);
            });
            console.log(data[0].Value);
        })
    DataValue.find({ Sensor: 'Humidity' }).sort({ Timestamp: -1 }).limit(1).lean().then(
        data => {
            app.delete('/api/data/humid', function (req, res) {
                res.send('DELETE request to homepage')
            })
            app.get('/api/data/humid', (req, res) => {
                
                res.json(data[0].Value);
                res.get()
            });
            console.log("Humidity: " ,data[0].Value);
        })
    
}
setInterval(updateValue,5000)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})







