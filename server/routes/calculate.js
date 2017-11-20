var express = require('express');
var router = express.Router();
var calculate_data = require('../modules/calculate_data');

router.post('/new', function (req, res) {
    console.log('req.body in calculate function', req.body);
    // calculations done below
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
    // Set up result below as an object with five key-values, the fourth is always an = sign, but that's ok.
    var result_to_send = {
        numberOne: req.body.x,
        operation: operationSymbol,
        numberTwo: req.body.y,
        equals: "=",
        result: answer
    }
    console.log(result_to_send);
    res.send(result_to_send)
});

router.post('/data', function (req, res) {
    console.log("This route is working it is actually getting here");
    console.log('req.body in new calculation post', req.body);
    // Step 1: add the new calculation data to the data store
    calculate_data.push([req.body.firstNum, req.body.operation, req.body.secondNum, req.body.equals, req.body.result]);
    console.log(calculate_data);
    // Step 2: send back this particular calculation for the user display
    var thisCalc = [req.body.firstNum, req.body.operation, req.body.secondNum, req.body.equals, req.body.result];
    res.send(thisCalc);
});

// straight-up simple callback function
router.get('/all', function (req, res) {
    res.send(calculate_data);
});

module.exports = router;