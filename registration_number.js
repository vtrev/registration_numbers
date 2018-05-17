// ==================LOGIC==========================

var addNumberPlatesFactory = function(platesArray){

    // var platesArray = platesArray;
    var tmpPlates = platesArray;
    var addPlateElement = function(plate){
        plate = plate.toUpperCase();
        tmpPlates.push(plate);
        localStorage.setItem('regArray', JSON.stringify(tmpPlates));
    }; 
    var filterFunction  =  function(unsortedPlates){
        var capetown = [];var bellville = [];var stellies = [];var paarl = [];
    
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

    //filter the stored array and return sorted arrays  based on town
    var getTown = function(town){
        var addPlate  = addNumberPlatesFactory(platesArray);
    
        var filter = addPlate.filterFunction(platesArray);
    
        if(town == 'alltowns'){
            return JSON.parse(localStorage.getItem('regArray'))
        }
        
        if( town == 'capetown'){
        return filter.capetown
        }
        if( town == 'paarl'){
            return filter.paarl   
        
        }
        if( town == 'bellville'){
            return filter.bellville    
        }
        if(town == 'stellies'){
            return filter.stellies
        }
        
    
    }
            
        return{
            addPlateElement,
            filterFunction,
            getTown
        }

}


// ===================DOM===================================

var displayPlates = function(platesArray){
    document.getElementById('numberPlates').innerHTML = '';
    platesArray.reverse();
for( var i = 0 ; i < platesArray.length ; i++ ){
    var plate = platesArray[i];
        plate = plate.toUpperCase();
        var listItem = document.createElement("li");
        var plateText =document.createTextNode(plate);
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
var addNumberPlates = function(){
    checkReg();
    var addPlate  = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    var plateElement = document.getElementById('inputBox').value;
    addPlate.addPlateElement(plateElement);
    document.getElementById('inputBox').value= "";
    displayPlates(JSON.parse(localStorage.getItem('regArray')));
    
    return false
}
//an event listener for the apply filter button that will run the filter function and display the filtered results

document.getElementById('filterButton').addEventListener('click',function filterPlates(){
    checkReg();
    var addPlate  = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    var dropDvalue = document.getElementById('townDropD').value;
    filteredPlate = addPlate.getTown(dropDvalue);
    displayPlates(filteredPlate);
});


