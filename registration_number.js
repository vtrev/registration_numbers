// ==================LOGIC==========================

var addNumberPlatesFactory = function (platesArray) {

    var platesArray = platesArray;
    var tmpPlates = platesArray;
    var addPlateElement = function (plate) {
        plate = plate.toUpperCase();
        tmpPlates.push(plate);
        localStorage.setItem('regArray', JSON.stringify(tmpPlates));
    };   
    var filterFunction = function (town) {
        var unsortedPlates = JSON.parse(localStorage.getItem('regArray'));
        if (town == 'alltowns') {
            return unsortedPlates
        } else {
            var holdingArray = [];
            for (let i = 0; i < unsortedPlates.length; i++) {
                if (unsortedPlates[i].startsWith(town)) {
                    holdingArray.push(unsortedPlates[i]);
                }
            }
            return holdingArray
        }
    }

    return {
        addPlateElement,
        filterFunction
    }

}

// ===================DOM===================================

var displayPlates = function (platesArray) {
    document.getElementById('numberPlates').innerHTML = '';
    platesArray.reverse();
    for (var i = 0; i < platesArray.length; i++) {
        var plate = platesArray[i];
        plate = plate.toUpperCase();
        var listItem = document.createElement("li");
        var plateText = document.createTextNode(plate);
        listItem.appendChild(plateText);
        document.getElementById('numberPlates').appendChild(listItem);
    }

}
//check for a redisttration array and create it if null
var checkReg = function () {
    if (!localStorage.getItem('regArray')) {
        localStorage.setItem('regArray', JSON.stringify([]));
    }
}

//function to run when the add button is clicked
var addNumberPlates = function () {
    checkReg();
    var addPlate = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    var plateElement = document.getElementById('inputBox').value;
    addPlate.addPlateElement(plateElement);
    document.getElementById('inputBox').value = "";
    displayPlates(JSON.parse(localStorage.getItem('regArray')));

    return false
}

//an event listener for the apply filter button that will run the filter function and display the filtered results

document.getElementById('filterButton').addEventListener('click', function filterPlates() {
    checkReg();
    var addPlate = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    var dropDvalue = document.getElementById('townDropD').value;
    displayPlates(addPlate.filterFunction(dropDvalue));
});
