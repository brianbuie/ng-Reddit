(function() {
    'use strict';

    angular
        .module('app')
        .controller('settingsDisplayCtrl', settingsDisplayCtrl);

   	settingsDisplayCtrl.$inject = ['$scope']

    function settingsDisplayCtrl($scope) {
		var vm = this
		vm.paneState = "closed";
		vm.togglePane = togglePane;

		function togglePane() {
			vm.paneState = vm.paneState === "closed" ? "open" : "closed";
			console.log($scope.subreddit)
		}
	}
})();