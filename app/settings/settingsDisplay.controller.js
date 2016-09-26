(function() {
    'use strict';

    angular
        .module('app')
        .controller('settingsDisplayCtrl', settingsDisplayCtrl);

   	settingsDisplayCtrl.$inject = ['$rootScope']

    function settingsDisplayCtrl($rootScope) {
		var vm = this
		vm.paneState = "closed";
		vm.togglePane = togglePane;

		function togglePane() {
			vm.paneState = vm.paneState === "closed" ? "open" : "closed";
			console.log($rootScope.subreddit)
		}
	}
})();