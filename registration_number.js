
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

    //parse in an array to filter with the town
    var getTown = function(town){
        var addPlate  = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    
        var filter = addPlate.filterFunction(JSON.parse(localStorage.getItem('regArray')));
    
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


var checkReg = function () {
    if (!localStorage.getItem('regArray')) {
        localStorage.setItem('regArray', JSON.stringify([]));
    }
}


var addNumberPlates = function(){
    checkReg();
    var addPlate  = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    var plateElement = document.getElementById('inputBox').value;
    console.log(addPlate);
    addPlate.addPlateElement(plateElement);
    function clearTextBox(){

        plateElement.value = "";
    }    
    // clearTextBox();
    return false
}


var filterBtn = document.getElementById('filterButton');

filterBtn.addEventListener('click',function filterPlates(){

    var addPlate  = addNumberPlatesFactory(JSON.parse(localStorage.getItem('regArray')));
    var dropD = document.getElementById('townDropD');
    var dropDvalue = dropD.options[dropD.selectedIndex].value
    filteredPlate = addPlate.getTown(dropDvalue);
    document.getElementById('numberPlates').innerHTML = '';
    for(let i=0;i < filteredPlate.length ; i++ ){
        var plate = filteredPlate[i];
        plate = plate.toUpperCase();
        var listItem = document.createElement("li");
        var plateText = document.createTextNode(plate);
        listItem.appendChild(plateText);
        document.getElementById('numberPlates').appendChild(listItem); 
    }
});


