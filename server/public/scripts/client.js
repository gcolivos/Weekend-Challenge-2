console.log("in client.js")

$(document).ready(onReady);

function onReady() {
    console.log("jQuery is loaded");
    $('#firstNumButton').on('click', firstNumFunc)
    $('#operationButton').on('click', operationFunc)
    $('#secondNumButton').on('click', secondNumFunc)
    $('#calculateButton').on('click', calculateResult)
    $('#clearButton').on('click', startOver);
    // For the pro mode process change, I set up as four different divs with buttons 
    // and fields that I'm hiding and showing
    // depending on what part of the equation entry  process the user is
    $('#operationDiv').hide();
    $('#secondNumberDiv').hide();
    $('#finalEquationDiv').hide();
    $('#clearButton').hide();
    //this part is unnecessary but I wanted to ease into ajax on this, just uploaded a welcome message
    //similar to the rocket router rascal rocky raccoon thing
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

    function firstNumFunc() {
        var num1 = $("#firstNumber").val();
        $('#firstNumberDiv').hide();
        $('#operationDiv').show();
        $('#equationToSolveTBody').append(
            "<td>" + num1 + "</td>")
        return num1
    }

    function operationFunc() {
        var operation = $("#operation").val();
        // Have to convert the words to symbols...could have used symbols in my selector but it didn't look as clean
        if (operation == "add") {
            var operationSymbol = "+";
        } else if (operation == "subtract") {
            var operationSymbol = "-";
        } else if (operation == "multiply") {
            var operationSymbol = "*";
        } else if (operation == "divide") {
            var operationSymbol = "/";
        }
        $('#operationDiv').hide();
        $('#secondNumberDiv').show();
        $('#equationToSolveTBody').append(
            "<td>" + operationSymbol + "</td>")
        return operation
    }

    function secondNumFunc() {
        var num2 = $("#secondNumber").val();
        $('#secondNumberDiv').hide();
        $('#equationToSolveTBody').append(
            "<td>" + num2 + "</td> + <td> = ?!?! </td>")
        $('#finalEquationDiv').show();
        return num2
    }

    function calculateResult(x, y, z) {
        $('#finalEquationDiv').hide();
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
                $('#result').replaceWith('<div id="result"><H1> The answer is ' + response.result + '!!!!</H1></div>');
                $('#clearButton').show();
                var currentCalculation = [response.numberOne, response.operation, response.numberTwo, response.equals, response.result];
                addCalculation(currentCalculation);
            }
        })
    }
};
function startOver() {
    $.ajax({
        method: 'POST',
        url: '/clear',
        success: function (response) {
            console.log('clear function called', response);
            // Set the currently hidden input value fields to blanks
            $("#firstNumber").val("");
            $("#secondNumber").val("");
            // Replace the result div with an empty result div
            $("#result").replaceWith('<div id="result"></div>');
            //replace the equation to be solved table data with an empty equationToSolve table
            $("#equationToSolveTBody").replaceWith("<tbody id='equationToSolveTBody'></tbody>")
            //hide the clear button, show the div for entering the first number
            $('#clearButton').hide();
            $('#firstNumberDiv').show();
        }
    })
}

function addCalculation(calc) {
    console.log("We are now going to add " + calc + "to the data store.")
    //so when this gets called above on Line 89, it is with the five part array returned from solving the equation.
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
            // #allResults is the DOM div with the historical record of all of the calculations, this adds
            // new calculations to the display after they are pushed to calculations_data on the route
            $("#allResults").append('<h4>' + response[0] + " " + response[1] + " " + response[2] + " " + response[3] + " " + response[4] + "</h4>");
        }
    })
}

// this allCalculations() function is called during onReady, this makes sure to populate the #allResults 
// div with the full record of historical calculations stored on the Server. 
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