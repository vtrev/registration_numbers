

var checkReg = function () {
    if (!localStorage.getItem('regArray')) {
        localStorage.setItem('regArray', JSON.stringify([]));
    }
}

// ==================LOGIC==========================




var addNumberPlatesFactory = function(platesArray){
    
    var tmpPlates = platesArray;
    //console.log(tmpPlates);
    var addPlateElement = function(plate){
        plate = plate.toUpperCase();
        var listItem = document.createElement("li");
        var plateText = document.createTextNode(plate);
        listItem.appendChild(plateText);
        document.getElementById('numberPlates').appendChild(listItem);
        tmpPlates.push(plate);
        localStorage.setItem('regArray', JSON.stringify(tmpPlates));
        
    }; 
    
    

    var filterFunction  =  function(unsortedPlates){
        var capetown = [];
        var bellville = [];
        var stellies = [];
        var paarl = [];

        for( let i = 0; i < unsortedPlates.length ;  i++ ){
            if(unsortedPlates[i].startsWith('CA')){
                capetown.push(unsortedPlates[i]);
            }
            if(unsortedPlates[i].startsWith('CY')){
                bellville.push(unsortedPlates[i]);
            }
            if(unsortedPlates[i].startsWith('CL')){
                stellies.push(unsortedPlates[i]);
            }
            if(unsortedPlates[i].startsWith('CJ')){
                paarl.push(unsortedPlates[i]);
            }



            
        }
        return {
            capetown,
            bellville,
            stellies,
            paarl
        }
    }
        
        return{
            addPlateElement,
            filterFunction
        }

    




}


// ===================DOM===================================

var addNumberPlates = function(){
    var addPlate  = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));

    checkReg();
    var plateElement = document.getElementById('inputBox').value;
    console.log(addPlate);
    addPlate.addPlateElement(plateElement);
    
    var clearTextBox = function(){

        plateElement.value = "";
    }    
    clearTextBox();
    return false;
}


var filterBtn = document.getElementById('filterButton');

filterBtn.addEventListener('click',function(){
    var addPlate  = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));

    
    var dropD = document.getElementById('townDropD');
    var dropDvalue = dropD.options[dropD.selectedIndex].value
    var arrayFromCache = JSON.parse(localStorage.getItem('regArray'));    
    var filter = addPlate.filterFunction(arrayFromCache).dropDvalue;
    // console.log(dropDvalue);
    console.log(filter);

}
);