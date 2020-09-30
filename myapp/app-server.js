
/**
 * 
 *
 */

//####################################
const PORT = 80;
//####################################

const TRANS_FILE = "data_temp1.txt";
const COMP_FILE = "data_trans_temp1.txt";
//const COMP_FILE = "test.txt"

var FILE_NAME = '';

//include express server
var express = require('express');
var bodyParser = require('body-parser');

var app = express();//instantiate

//CORS Middleware, causes Express to allow Cross-Origin Requests
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers',
    'Content-Type');

  next();
}
app.use(allowCrossDomain);


//include file system, needed to read from and write a file
var fs = require('fs');

//needed for post operation to parse request.body
app.use(bodyParser.json({
    extended: false,
    parameterLimit: 100000,
    limit: 1024 * 1024 * 10
}));

app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: 1024 * 1024 * 10
}));

//adding satic resources
app.use(express.static(__dirname));// __dirname current directory
app.use('/scripts', express.static(__dirname + '/scripts'));//subfolder
app.use('/css', express.static(__dirname + '/css'));


//now start the server, listening to the port
var server = app.listen(PORT, function () {
    console.log('Listening on port %d',
        server.address().port);
});

//#############################################
app.post('/saveInput', function (request, response) {

    console.log("saveInput being executed in " + __dirname);
    console.log(request.body['trialNo'] + " " + request.body['msg']);

    if(request.body['transOn'] == 'true') {
        FILE_NAME = TRANS_FILE;
    } else {
        FILE_NAME = COMP_FILE;
    }
    console.log(FILE_NAME);
    
    var content;

    fs.readFile("./"+FILE_NAME, function (err, data)
    {
        if(err)
        {
            return console.log(err, data);
        } 

        content = data.toString('utf8');   
        
        var input;
        if(content.length == 0)
        {
            input = [];
        }
        else
        {
            input = JSON.parse(content);
        }

        input.push(request.body);

        var inputText = JSON.stringify(input);
        fs.writeFile("./"+FILE_NAME, inputText, function(err)
        {
            if(err)
            {
                return console.log(err);
            }
            return response.send(200, "");
            console.log("The file was saved.");
        });

    });
});
//#############################################
