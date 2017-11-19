console.log("in client.js")

$(document).ready(onReady);

function onReady() {
    console.log("jQuery is loaded");
    $('#calculateButton').on('click', calculateResult);
    $('#clearButton').on('click', startOver);
    $('#clearButton').hide();

    $.ajax({
        type: 'GET',
        url: '/welcome',
        success: function (data) {
            $('h1').text(data);
        },
        error: function (error) {
            console.log('The "/hello" ajax get request failed with error: ', error);
        }
    });
};

function calculateResult(x, y, z) {
    var num1 = $("#firstNumber").val();
    var num2 = $("#secondNumber").val();
    var operation = $("#operation").val();
    console.log("x:" + num1 + " y:" + num2 + " operation:" + operation);
    $.ajax({
        type: 'POST',
        url: '/calculate',
        data: {
            x: num1,
            y: num2,
            type: operation
        },
        success: function (response) {
            console.log('operations data recieved:', response);
            $('#result').replaceWith('<div id="result"><h4> The answer is ' + response.result + '!</h4></div>');
            $('#clearButton').show();
        },
        error: function (error) {
            console.log('The "/calculate" ajax post request failed with error: ', error);
        }
    });
}

function startOver() {
    $.ajax({
        method: 'POST',
        url: '/clear',
        success: function (response) {
            console.log('clear function called', response);
            $("#firstNumber").val("");
            $("#secondNumber").val("");
            $("#result").replaceWith('<div id="result"></div>');
            $('#clearButton').hide();
        },
        error: function (error) {
            console.log('The "/clear" ajax post request failed with error: ', error);
        }
    })
}