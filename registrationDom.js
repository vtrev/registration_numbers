
// ===================DOM===================================

var displayPlates = function (platesArray) {

    if (platesArray.length == 0) {
        document.getElementById('numberPlates').innerHTML = 'No plates yet';
    } else {
        document.getElementById('numberPlates').innerHTML = '<h2>Registrations without handlebars</h2>';

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


var displayHandlebarPlates = function (platesArray) {    
    var platesData = {};
    platesData['plates'] = platesArray;

    console.log(platesData);
    // platesData.plates = platesArray;
    if(platesArray.length == 0){
        platesData.arrayEmpty = true ;
    }

    var platesDataElement = document.getElementById("regAreaHandlebars");
    var platesDataTemplateSource = document.getElementById("platesTemplate").innerHTML;
    var platesTemplate = Handlebars.compile(platesDataTemplateSource);
    var platesHTML = platesTemplate(platesData);
    platesDataElement.innerHTML = platesHTML;

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
displayHandlebarPlates(stored);
//check for numberplate validity
var validate = function(plateToVadidate){ 
    if(!JSON.parse(localStorage.getItem('regArray')).includes(plateToVadidate)){
    plates = ['CA','CF','CY','CJ','CL']
     //for listItem in plates
     return plates.some(function(numberplate){
        return   plateToVadidate.startsWith(numberplate)  
    });
    }else{
        // document.getElementById('numberPlates').innerHTML = 'That numberplate has already been registered to the database';

    } 
}



//function to run when the add button is clicked
var addNumberPlates = function () {
    checkReg();
    var addPlate = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    var plateElement = document.getElementById('inputBox').value;
    plateElement = plateElement.toUpperCase();
    


    if(validate(plateElement)){
    addPlate.addPlateElement(plateElement);
    document.getElementById('inputBox').value = "";
    displayPlates(JSON.parse(localStorage.getItem('regArray')));
    displayHandlebarPlates(JSON.parse(localStorage.getItem('regArray')));

    }else{
        document.getElementById('numberPlates').innerHTML = 'Please only enter number plates from the available towns on the drop down menu <br> Duplicate entries will be ignored' ;
        document.getElementById('inputBox').value = "";

    }
    
    return false
}

//an event listener for the apply filter button that will run the filter function and display the filtered results

document.getElementById('filterButtonHandlebars').addEventListener('click', function filterPlates() {
    checkReg();
    var addPlate = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    var dropDvalue = document.getElementById('townDropD').value;
    displayPlates(addPlate.filterFunction(dropDvalue));
    displayHandlebarPlates(addPlate.filterFunction(dropDvalue));
});
