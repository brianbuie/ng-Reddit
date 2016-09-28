(function() {
    'use strict';

    angular
        .module('app')
        .controller('SubSelectCtrl', SubSelectCtrl);

    SubSelectCtrl.$inject = ['$scope']

    function SubSelectCtrl($scope) {
		var vm = this;
		vm.entry = ""
		vm.error = ""
		vm.sort = ""
		vm.setSub = setSub
		vm.removeSub = removeSub
		vm.setSort = setSort


		function setSub() {
			if(vm.entry){
				$scope.$parent.values.subreddit = vm.entry;
				vm.entry = "";
				vm.error = "";
			}
			console.log($scope.$parent.values)
			validateSub();
		}

		function removeSub(){
			vm.entry = $scope.$parent.values.subreddit
			$scope.$parent.values.subreddit = "";
		}

		function validateSub(){
			if(false){
				vm.entry = $scope.$parent.values.subreddit;
				vm.error = "That's not a valid subreddit";
				$scope.$parent.values.subreddit = "";
			}
		}

		function setSort(option){
			vm.sort = option
			console.log(vm)
		}

	}
})();