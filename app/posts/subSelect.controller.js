(function() {
    'use strict';

    angular
        .module('app')
        .controller('SubSelectCtrl', SubSelectCntrl);

    SubSelectCntrl.$inject = ['$scope'];

    function SubSelectCntrl($scope) {
		var vm = this;
		$scope.subreddit = ""
		vm.entry = ""
		vm.error = ""
		vm.setSub = setSub
		vm.removeSub = removeSub


		function setSub() {
			if(vm.entry){
				$scope.subreddit = vm.entry;
				vm.entry = "";
				vm.error = "";
			}
			validateSub();
		}

		function removeSub(){
			vm.entry = $scope.subreddit
			$scope.subreddit = "";
		}

		function validateSub(){
			console.log($scope)
			if(false){
				vm.entry = $scope.subreddit;
				vm.error = "That's not a valid subreddit";
				$scope.subreddit = "";
			}
		}

	}
})();