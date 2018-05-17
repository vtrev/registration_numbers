describe('Numberplates function',function(){


    it('should be able to add registrations using the addPlate function',function(){
        //clear the storage for tests to run on a clean sheet
        var registrations = ['CA12345','CF12345','CY12345','CJ12345'];
        var addPlate  = addNumberPlatesFactory(registrations);
        addPlate.addPlateElement('cf54321');
        addPlate.addPlateElement('cf54322');
        assert.deepEqual(["CA12345","CF12345", "CY12345", "CJ12345", "CF54321", "CF54322"] , addPlate.getTown('alltowns'));

    });
    
    it('should return only the registrations form selected towns',function(){
        //clear the storage for tests to run on a clean sheet
        var registrations = ['CA12345','CA565656','CF12345','CY12345','CJ12345'];
        var addPlate  = addNumberPlatesFactory(registrations);
        
        assert.deepEqual(['CA12345','CA565656'],addPlate.getTown('capetown'));
        assert.deepEqual(['CJ12345'],addPlate.getTown('paarl'));

    });


});