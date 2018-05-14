

var checkReg = function () {
    if (!localStorage.getItem('regArray')) {
        localStorage.setItem('regArray', JSON.stringify([]));
    }
}

// ==================LOGIC==========================




var addNumberPlatesFactory = function(platesArray){
    
    var tmpPlates = platesArray;
    console.log(tmpPlates);
    var addPlateElement = function(plate){
        var listItem = document.createElement("li");
        var plateText = document.createTextNode(plate);
        listItem.appendChild(plateText);
        document.getElementById('numberPlates').appendChild(listItem);
        tmpPlates.push(plateText);
        localStorage.setItem('regArray', JSON.stringify(tmpPlates));
        
    }; 
    var clearTextBox = function(){

        plateElement.value = "";
    }
    return{
        addPlateElement
    }
}
// ===================DOM===================================
var addNumberPlates = function(){
    checkReg();
    var plateElement = document.getElementById('inputBox');
    
    var addPlate  = addNumberPlatesFactory(JSON.parse(localStorage.getItem('userMap')));
    addPlate.addPlateElement(plateElement.value);
    clearTextBox();
    return false;
}