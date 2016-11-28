(function () {
'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  narrow.searchTerm = "";

  narrow.narrowItDown = function (searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      promise.then(function (response) {
          console.log(response.data);
      })
      .catch(function (error) {
          console.log(error);
      })
  };
} //end NarrowItDownController


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function () {
    $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
        //process result and only keen items that match
        var foundItems = result.data;
        return foundItems;
    });
  
  }; //end getMatchedMenuItems
} //end MenuSearchService

})();