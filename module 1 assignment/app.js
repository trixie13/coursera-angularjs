(function (){
	'use strict';

	angular.module('lunchChecker', [])
		.controller('lunchCheckerController', lunchCheckerController);
	
	lunchCheckerController.$inject = ['$scope'];

	function lunchCheckerController($scope) {
		$scope.message = "";
		$scope.numberOfItems = 0;
		$scope.list = "";

		$scope.checkFood = function() {
			$scope.message = "checked!";
			calculateNumber(splitAtComma($scope.list));
			if($scope.numberOfItems < 4){
				if($scope.numberOfItems == 0){
					$scope.message = "Please enter data first";
				}else{
					$scope.message = "Enjoy!";	
				}
			}else{
				$scope.message = "Too Much!";
			};
        }
        
        // function returns an array containing the words split
		var splitAtComma = function(string) {
			var stringsArray = string.split(',');
			return stringsArray;
		}

		var calculateNumber = function(stringsArray) {
			var sum = 0;
			for(var i = 0; i < stringsArray.length; i++){
				if(isValidInput(stringsArray[i] == true){
					sum++;
				};
			};
			$scope.numberOfItems = sum;
		}
        //checkes for empty string ""
        //and spaces string "   "
		var isValidInput = function (string) {
			if(string == "") return false;

			var stringValue = 0;
			var space = " ";
			for(var i = 0; i < string.length; i++) {
				stringValue += string.charCodeAt(i);
			}
			if(stringValue == space.charCode*string.length)
				return false;

			return true;
		};
	};


})();