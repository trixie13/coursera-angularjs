// ShoppingListCheckOffService
(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController (ShoppingListCheckOffService) {
	    var toBuy = this;

	    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
	    toBuy.message = ShoppingListCheckOffService.getToBuyMessage();

	    toBuy.updateMessage = function () {
	    	toBuy.message = ShoppingListCheckOffService.getToBuyMessage();
	    }
	
		toBuy.checkOff = function (itemIndex) {
			ShoppingListCheckOffService.checkOff(itemIndex);
			toBuy.updateMessage();
        }

	} //end ToBuyController

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController (ShoppingListCheckOffService) {
		var bought = this;

		bought.items = ShoppingListCheckOffService.getBoughtItems();
		bought.message = ShoppingListCheckOffService.getBoughtMessage();

		bought.updateMessage = function () {
			bought.message = ShoppingListCheckOffService.getBoughtMessage();
			return bought.message;
		};
	
	} //end AlreadyBoughtController

	function ShoppingListCheckOffService () {
		var service = this;

		// shopping lists
		var toBuyItems = [
		{
            name: "Bananas",
            quantity: "10"
         },
         {
            name: "Chocolate",
            quantity: "2"
         },
         {
            name: "Kiwi",
            quantity: "20"
         },
         {
            name: "Oranges",
            quantity: "100"
         },
         {
        	name: "Coffee",
        	quantity: "5"
         }
		];
		var boughtItems = [];
		
		//messages
		var toBuyMessage = "";
		var boughtMessage = "Nothing bought yet";
        
        // service functions
		service.checkOff = function (itemIndex) {
	        var boughtItem = {
	        	name: toBuyItems[itemIndex].name,
	        	quantity: toBuyItems[itemIndex].quantity
	        };
	        boughtItems.push(boughtItem);
	        toBuyItems.splice(itemIndex, 1);

	        // setting messages for display
	        if(boughtItems.length > 0)
	        	boughtMessage = "";
	        
	        if(toBuyItems.length < 1)
	        	toBuyMessage = "Everything is bought!";
	            
	    } //end checkOff function
        
        service.getToBuyItems = function () {
        	return toBuyItems;
        }
        service.getBoughtItems = function () {
        	return boughtItems;
        }

        service.getToBuyMessage = function () {
			return toBuyMessage;
		}
		service.getBoughtMessage = function () {
			return boughtMessage;
		}
	}

})();