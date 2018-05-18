// ==================LOGIC==========================

var addNumberPlatesFactory = function (platesArray) {
   
    //    var platesArray = platesArray;
    var tmpPlates = platesArray;
    var addPlateElement = function (plate) {
        plate = plate.toUpperCase();
        tmpPlates.push(plate);
        checkReg();
        localStorage.setItem('regArray', JSON.stringify(tmpPlates));
    };
    var filterFunction = function (town) {
        var unsortedPlates = platesArray;
        var holdingArray = [];
        if (town == 'alltowns') {
            //          
            return unsortedPlates
        } else {
            for (let i = 0; i < unsortedPlates.length; i++) {
                if (unsortedPlates[i].startsWith(town)) {
                    holdingArray.push(unsortedPlates[i]);
                }
            }

            return holdingArray
        }
    }
    var checkReg = function () {
        if (!localStorage.getItem('regArray')) {
            localStorage.setItem('regArray', JSON.stringify([]));
        }
    }

    return {
        addPlateElement,
        filterFunction
    }
}
