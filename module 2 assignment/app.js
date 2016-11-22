(function () {
	'use strict';

	angular.module("ShoppingListApp", [])
		.controller("ShoppingListToBuyController", ShoppingListToBuyController)
		.controller("ShoppingListBoughtController", ShoppingListBoughtController)
		.provider("ShoppingListService", ShoppingListService)
		.config(Config);

	Config.$inject = ['ShoppingListServiceProvider'];
	function Config(ShoppingListServiceProvider){
		ShoppingListServiceProvider.defaults.initialList =
		[{
            "name": "Bananas",
            "quantity": "10"
         },
         {
            "name": "Chocolate",
            "quantity": "2"
         },
         {
            "name": "Kiwi",
            "quantity": "20"
         },
         {
            "name": "Oranges",
            "quantity": "100"
         },
         {
        	"name": "Coffee",
        	"quantity": "5"
         }
		];
	} //end Confing function

	ShoppingListToBuyController.$inject = ['ShoppingListService'];
    function ShoppingListToBuyController(ShoppingListService){
	    var toBuyList = this;

	    toBuyList.items = ShoppingListService.getToBuyItems();
	    console.log(toBuyList.items);

	    toBuyList.item_name = "";
	    toBuyList.item_quantity = "";

	    toBuyList.buyItem = function () {
	    	try {
	    		ShoppingListService.moveItem(itemIndex);
	    	} catch (error) {
	    		toBuyList.emptyMessage = error.message;
	    	}
	    };
	} //end ShoppingListToBuyController
    
    ShoppingListBoughtController.$inject = ['ShoppingListService'];
	function ShoppingListBoughtController(ShoppingListService){
	    var boughtList = this;

	    boughtList.items = ShoppingListService.getBoughtItems();

	    boughtList.item_name = "";
	    boughtList.item_quantity = "";
	} //end ShoppingListBoughtController

	function ShoppingListService(initialList){
		var service = this;

		var toBuyItems = initialList;
		var boughtItems = [];

		service.moveItem = function (itemIndex){
			//itemIndex is the index from toBuyItems
			//create the a copy item
			var item = {
				name: toBuyItems[itemIndex].name,
				quantity: toBuyItems[itemIndex].quantity
			};
			//push it to boughtItems list
			boughtItems.push(item);
			toBuyItems.splice(itemIndex,1);
			// create 'error' messages if list 1 is empty
			// or list 2 is full 
			if(toBuyItems.length == 0) 
				throw new Error("Everything is bought!");
			if(boughtItems.length == 0)
				throw new Error ("Nothing bought yet!");
        }

        service.getToBuyItems = function () {
        	return toBuyItems;
        };

        service.getBoughtItems = function () {
        	return boughtItems;
        };
	}

	function ShoppingListServiceProvider(){
		var provider = this;
		provider.defaults = {
			initialList: [
				{
		           "name": "item_name",
		           "quantity": "item_quantity"
		        }
		    ]
		};
		provider.$get = function () {
			var shoppingList = new ShoppingListService(provider.defaults.initialList);
													
			return shoppingList;
		};
	} // end ShoppingListServiceProvider

})();