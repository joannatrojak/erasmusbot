const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

app.use(express.static('public'))

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am EinsteinBot!.')
})

app.post('/emc2/', function (req, res) {
    //console.log(JSON.stringify(req.body));
    var intent = req.body.queryResult.intent.displayName; 
    switch(intent){
        case "floor plan":
            pattern = /[0-9]/; 
            var room = req.body.queryResult.parameters.room;
            var result = room.match(pattern);
            console.log(room.match(pattern)[0]);
            break; 
        case "location of the class": 
            console.log("location of the class"); 
            break; 
        case "office hours": 
            console.log("office hours"); 
        case "professors": 
            console.log("professors"); 
        default: 
            console.log("something went wrong");
    }

    /*
    var weight = req.body.queryResult.parameters.weight;
    var m = weight.amount;
    var weight_unit = weight.unit;
    //convert weight into kg
    if (weight_unit == 'g'){
        m = m/1000.0;
    }
    var c2 = 9 * 10^16; //in m^2/s^2
    var e = m * c2;
    
    res.setHeader('Content-Type', 'application/json');
    
    var botSpeech = "Energy that the system can create is " + e 
    + " Joules.";
    
    out = {fulfillmentText: botSpeech
            };
    
    var outString = JSON.stringify(out);
    console.log('Out:' + outString);
    res.send(outString);
    */
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})