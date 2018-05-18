
// ===================DOM===================================

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
//check for a redisttration array and create it if null
var checkReg = function () {
    if (!localStorage.getItem('regArray')) {
        localStorage.setItem('regArray', JSON.stringify([]));
    }
}
checkReg();
var stored = JSON.parse(localStorage.getItem('regArray'));
displayPlates(stored);

//function to run when the add button is clicked
var addNumberPlates = function () {
    checkReg();
    var addPlate = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    var plateElement = document.getElementById('inputBox').value;
    plateElement = plateElement.toUpperCase();

    if(plateElement.startsWith('CA') || plateElement.startsWith('CF') || plateElement.startsWith('CY')|| plateElement.startsWith('CL') ||plateElement.startsWith('CJ')){
    addPlate.addPlateElement(plateElement);
    document.getElementById('inputBox').value = "";
    displayPlates(JSON.parse(localStorage.getItem('regArray')));
    }else{
        document.getElementById('numberPlates').innerHTML = 'Please only enter number plates from the available towns on the drop down menu';
        document.getElementById('inputBox').value = "";

    }
    
    return false
}

//an event listener for the apply filter button that will run the filter function and display the filtered results

document.getElementById('filterButton').addEventListener('click', function filterPlates() {
    checkReg();
    var addPlate = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    var dropDvalue = document.getElementById('townDropD').value;
    displayPlates(addPlate.filterFunction(dropDvalue));
});
