// ===================DOM===================================
//display plates with no handlebars
var displayPlates = function (platesArray) {
    if (platesArray.length == 0) {
        document.getElementById('numberPlates').innerHTML = 'No plates yet';
    } else {
        document.getElementById('numberPlates').innerHTML = '';
        platesArray.reverse();
        for (var i = 0; i < platesArray.length; i++) {
            var plate = platesArray[i];
            var listItem = document.createElement("li");
            var plateText = document.createTextNode(plate);
            listItem.appendChild(plateText);
            document.getElementById('numberPlates').appendChild(listItem);
        }
    }
}

//display plates to screen using handlebars
var displayHandlebarPlates = function (platesArray) {
    var platesData = {};
    platesData['plates'] = platesArray.reverse();
    //condition for empty plate array
    if (platesArray.length == 0) {
        document.getElementById('regAreaHandlebars').innerHTML = 'No plates yet';
    } else {
        var platesDataElement = document.getElementById("regAreaHandlebars");
        var platesDataTemplateSource = document.getElementById("platesTemplate").innerHTML;
        var platesTemplate = Handlebars.compile(platesDataTemplateSource);
        var platesHTML = platesTemplate(platesData);
        platesDataElement.innerHTML = platesHTML;
    }

}

//check for a redisttration array and create it if null
var checkReg = function () {
    if (!localStorage.getItem('regArray')) {
        localStorage.setItem('regArray', JSON.stringify([]));
    }
}

//check for numberplate validity
var validate = function (plateToVadidate) {
    if (!JSON.parse(localStorage.getItem('regArray')).includes(plateToVadidate)) {
        plates = ['CA ', 'CF ', 'CY ', 'CJ ', 'CL ', 'CAW']
        return plates.some(function (numberplate) {
            return plateToVadidate.startsWith(numberplate)
        });
    }
}

//ensure an array exists in storage and display the registrations on page load
checkReg();
var stored = JSON.parse(localStorage.getItem('regArray'));
displayPlates(stored);
displayHandlebarPlates(stored);

// ==========================================LISTENERS=========================================================

//function to run when the add button is clicked
var addNumberPlates = function () {
    checkReg();
    var addPlate = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    var plateElement = document.getElementById('inputBox').value;
    plateElement = plateElement.toUpperCase();
    if (validate(plateElement)) {
        addPlate.addPlateElement(plateElement);
        document.getElementById('inputBox').value = "";
        displayPlates(JSON.parse(localStorage.getItem('regArray')));
        displayHandlebarPlates(JSON.parse(localStorage.getItem('regArray')));
    } else {
        document.getElementById('numberPlates').innerHTML = 'Please only enter number plates from the available towns on the drop down menu <br> Duplicate entries will be ignored';
        document.getElementById('regAreaHandlebars').innerHTML = 'Please only enter number plates from the available towns on the drop down menu <br> Duplicate entries will be ignored';

        document.getElementById('inputBox').value = "";
    }
    return false
}

//an event listener for the first filter button with handlebars
document.getElementById('filterButton1').addEventListener('click', function filterHandlebarsPlates() {
    checkReg();
    let addPlate = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    let dropDvalue = document.getElementById('townDropD1').value;
    displayHandlebarPlates(addPlate.filterFunction(dropDvalue));
});

//an event listener for the first filter button with no handlebars

document.getElementById('filterButton2').addEventListener('click', function filterPlates() {
    checkReg();
    let addPlate = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    let dropDvalue = document.getElementById('townDropD2').value;
    displayPlates(addPlate.filterFunction(dropDvalue));
});


document.getElementById('resetButton').addEventListener('click', function run() {

    localStorage.setItem('regArray', JSON.stringify([]));
    document.getElementById('regAreaHandlebars').innerHTML = 'No plates yet';
    document.getElementById('numberPlates').innerHTML = 'No plates yet';



})

// =====================================================EOF============================================== //