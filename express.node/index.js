var port = 5000;
var express = require('express');
var bodyParser = require('body-parser');
var server = express();


var items = [];

server.use(bodyParser.json());

server.use('/', express.static('public'));

server.get('/test.json', (req, res) => {
    res.json({items});
});

server.all('/all_data', (req, res) => {
    res.send('All data OK');
})

server.post('/set_test', (req, res) => {
    console.log(req.body);
    res.json(req.body);
    items.push(req.body);
});

server.listen(port, () => {
    console.log('Server runned on port:', port);
});