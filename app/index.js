const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const fs = require('fs');
let rawdata = fs.readFileSync('professors.json');
let professors = JSON.parse(rawdata);

const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

app.use(express.static('public'))

// Index route
app.get('/', function (req, res) {
    res.send(professors);
})

app.post('/emc2/', function (req, res) {
    //console.log(JSON.stringify(req.body));
    var intent = req.body.queryResult.intent.displayName; 
    switch(intent){
        case "location of the class": 
        pattern = /[0-9]/; 
        var room = req.body.queryResult.parameters.room;
        var result = room.match(pattern);
        if (result != null){
            var floor = result[0]; 
            switch(floor){
                case '1': 
                    var botSpeech = "The room " + room + " located on the ground floor.";
                break; 
                case '2': 
                    var botSpeech = "The room " + room + " located on the first floor.";
                break; 
                case '3': 
                    var botSpeech = "The room " + room + " located on the second floor.";
                break; 
                case 4: 
                    var botSpeech = "The room " + room + " located on the third floor.";
                break; 
                default: 
                    var botSpeech ="something went wrong";
            }
            res.setHeader('Content-Type', 'application/json');
            out = {fulfillmentText: botSpeech
            };
    
            var outString = JSON.stringify(out);
            console.log('Out:' + outString);
            res.send(outString);
        }
            break; 
        case "office hours": 
            var professor = req.body.queryResult.parameters.professor;
            //console.log("Professor: "+professor);
            splitProfessor = professor.split(" ");
            console.log(professors);
            break;
        case "professors": 
            console.log("professors"); 
            break;
        default: 
            console.log("something went wrong");
            break;
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