describe('Registration Number function', function () {


    it('should add registrations using the addPlateElement function', function () {
        var registrations = ['CA 12345', 'CF 12345', 'CY 12345', 'CJ 12345'];
        var addPlate = addNumberPlatesFactory(registrations);
        addPlate.addPlateElement('cf 54321');
        addPlate.addPlateElement('cf 54322');
        assert.deepEqual(["CA 12345", "CF 12345", "CY 12345", "CJ 12345", "CF 54321", "CF 54322"], addPlate.filterFunction('alltowns'));

    });
        
    it('should filter number plates based on town',function(){
        var registrations = ['CA 12345','CA 54321', 'CF 12345', 'CY 12345', 'CJ 12345','CF 565656'];
        var addPlate = addNumberPlatesFactory(registrations);
        assert.deepEqual(addPlate.filterFunction('CA'),['CA 12345','CA 54321']);
        assert.deepEqual(addPlate.filterFunction('CJ'),['CJ 12345']);
        assert.deepEqual(addPlate.filterFunction('CF'),['CF 12345','CF 565656']);
        
        
    });

});
