(function() {
    'use strict';

    angular
        .module('app')
        .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['Settings']

    function SettingsCtrl(Settings) {
    	var vm = this
    	vm.paneState = "closed"
		vm.togglePane = togglePane
		vm.settings = Settings

		function togglePane() {
			vm.paneState = vm.paneState === "closed" ? "open" : "closed";
		}
	}
})();