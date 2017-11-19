console.log("in client.js")

$(document).ready(onReady);

function onReady() {
    console.log("jQuery is loaded");
    $('#calculateButton').on('click', calculateResult)
    $('#clearButton').on('click', startOver);
    $('#clearButton').hide();
    //test ajax ability, just upload a welcome message
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
    allCalculations();
    function calculateResult(x, y, z) {
        var num1 = $("#firstNumber").val();
        var num2 = $("#secondNumber").val();
        var operation = $("#operation").val();
        console.log("x:" + num1 + " y:" + num2 + " operation:" + operation);
        $.ajax({
            type: 'POST',
            url: '/calculate/new',
            data: {
                x: num1,
                y: num2,
                type: operation
            },
            success: function (response) {
                console.log('In success in the calculateResult function:', response);
                $('#result').replaceWith('<div id="result"><h4> The answer is ' + response.result + '!</h4></div>');
                $('#clearButton').show();
                var currentCalculation = [response.numberOne, response.operation, response.numberTwo, response.equals, response.result];
                console.log("This is what is going into currentCalculation: " + currentCalculation)
                addCalculation(currentCalculation);
            }
            // })
            // console.log("This is currentCalculation after AJAX: " + currentCalculation)
            // addCalculation();
        })
    };
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

    function addCalculation(calc) {
        console.log("We are now going to add " + calc + "to the data store.")
        $.ajax({
            method: 'POST',
            url: '/calculate/data',
            data: {
                firstNum: calc[0],
                operation: calc[1],
                secondNum: calc[2],
                equals: calc[3],
                result: calc[4]
            },
            success: function (response) {
                console.log('this is what pops out of the addCalculation function:', response);
                $("#allResults").append('<h4>' + response[0] + " " + response[1] + " " + response[2] + " " + response[3] + " " + response[4] + "</h4>");
            },
            error: function (error) {
                console.log('The "/calculate/data" ajax post request failed with error: ', error);
            }
        })
    }

    function allCalculations() {
        $.ajax({
            method: 'GET',
            url: '/calculate/all',
            success: function (response) {
                console.log('all calculations array', response);
                for (i = 0; i < response.length; i++) {
                    var thisResponse = response[i]
                    $("#allResults").append('<h4>' + thisResponse[0] + " " + thisResponse[1] + " " + thisResponse[2] + " " + thisResponse[3] + " " + thisResponse[4] + "</h4>");
                }
            }
        })
    }
}