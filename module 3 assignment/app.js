(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.directive('foundItems', FoundItemsDirective)
		.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

	function FoundItemsDirective () {
		var ddo = {
			templateUrl: "foundItems.html",
			scope: {
				found: "<",
				onRemove: "&"
			},
			controller: NarrowItDownController,
			controllerAs: "narrow",
			bindToController: true
		};
		return ddo;
	} //end FoundItemsDirective


	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController (MenuSearchService) {
		var narrow = this;
		narrow.found = []; //found items
		narrow.searchTerm = "";
		narrow.message = "";

		narrow.narrowItDown = function (searchTerm) {

			if (searchTerm != "") {

	                    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                
			   
			    promise
			    .then(function (foundItems) {
		            narrow.found = foundItems;
		            if(narrow.found.length == 0){
		            	narrow.message = "Nothing found!";
		            } else {
		            	narrow.message = "";
		            }
			    }) //end promise.then
			   .catch(function (error) {
		            console.log("oh no");
				});

		    } else {
		    	narrow.message = "Nothing found!";
			    narrow.found = [];
		    }

		} //end NarrowItDown function

		narrow.removeItem = function (itemIndex) {
			narrow.found.splice(itemIndex,1);
			if(narrow.found.length == 0)
				narrow.message = "Nothing else!";
		};

	} //end NarrowItDownController

	MenuSearchService.$inject = ['$http','ApiBasePath'];
	function MenuSearchService ($http, ApiBasePath){
		var service = this;

		service.getMatchedMenuItems = function (searchTerm) {
	        return $http({
	        	method: "GET",
	        	url: (ApiBasePath + "/menu_items.json")
	        }).then(function (result) {
	        	//process result and only keep items that match
                var foundItems = [];
             
                for (var i = result.data.menu_items.length - 1; i >= 0; i--) {
                	if (result.data.menu_items[i].description.indexOf(searchTerm) >= 0)
                		foundItems.push(result.data.menu_items[i]);
                }
                
                console.log(result.data);
                console.log(foundItems);
                console.log(foundItems.length);
                return foundItems;
            });
		} //end getMatchedMenuItems function

	} //end MenuSearchService
})();
