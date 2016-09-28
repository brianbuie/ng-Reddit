(function() {
    'use strict';

    angular
        .module('app')
        .controller('settingsDisplayCtrl', settingsDisplayCtrl);

    function settingsDisplayCtrl() {
		var vm = this
		vm.paneState = "closed";
		vm.togglePane = togglePane;

		function togglePane() {
			vm.paneState = vm.paneState === "closed" ? "open" : "closed";
		}
	}
})();