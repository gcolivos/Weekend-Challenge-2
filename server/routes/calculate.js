var express = require('express');
var router = express.Router();
var calculate_data = require('../modules/calculate_data');

function calculateInput(req, res) {
    console.log('req.body in calculate function', req.body);
    if (req.body.type == "add") {
        var operationSymbol = "+";
        var answer = Number(req.body.x) + Number(req.body.y)
    } else if (req.body.type == "subtract") {
        var operationSymbol = "-";
        var answer = req.body.x - req.body.y
    } else if (req.body.type == "multiply") {
        var operationSymbol = "*";
        var answer = req.body.x * req.body.y
    } else if (req.body.type == "divide") {
        var operationSymbol = "/";
        var answer = req.body.x / req.body.y
    }
    var result_to_send = {
        numberOne: req.body.x,
        operation: operationSymbol,
        numberTwo: req.body.y,
        equals: "=",
        result: answer
    }
    console.log (result_to_send);
    res.send(result_to_send)
};

router.post('/new', function(req, res){
    console.log("we hit the post");
    console.log('req.body in new quote post', req.body);
    quotes_data.push({quoteText: req.body.quote_to_add})
    console.log(quotes_data);
    res.sendStatus(200);
});

module.exports = calculateInput;