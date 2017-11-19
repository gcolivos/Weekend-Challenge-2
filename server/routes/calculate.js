function calculateInput(req, res) {
    console.log('req.body in calculate function', req.body);
    if (req.body.type == "add") {
        console.log(req.body.x);
        console.log(Number(req.body.x));
        var answer = Number(req.body.x) + Number(req.body.y)
    } else if (req.body.type == "subtract") {
        var answer = req.body.x - req.body.y
    } else if (req.body.type == "multiply") {
        var answer = req.body.x * req.body.y
    } else if (req.body.type == "divide") {
        var answer = req.body.x / req.body.y
    }
    var result_to_send = {
        result: answer
    }
    console.log (result_to_send);
    res.send(result_to_send)
};


module.exports = calculateInput;