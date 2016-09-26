(function() {
    'use strict';

    angular
        .module('app')
        .controller('SubSelectCtrl', SubSelectCntrl);

    SubSelectCntrl.$inject = ['$rootScope'];

    function SubSelectCntrl($rootScope) {
		var vm = this;
		$rootScope.subreddit = ""
		vm.entry = ""
		vm.error = ""
		vm.setSub = setSub
		vm.removeSub = removeSub


		function setSub() {
			if(vm.entry){
				$rootScope.subreddit = vm.entry;
				vm.entry = "";
				vm.error = "";
			}
			validateSub();
		}

		function removeSub(){
			vm.entry = $rootScope.subreddit
			$rootScope.subreddit = "";
		}

		function validateSub(){
			console.log($rootScope)
			if(false){
				vm.entry = $rootScope.subreddit;
				vm.error = "That's not a valid subreddit";
				$rootScope.subreddit = "";
			}
		}

	}
})();