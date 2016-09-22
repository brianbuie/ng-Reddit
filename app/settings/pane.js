(function() {
    'use strict';

    angular
        .module('app.settings')
        .controller('Pane', Pane);

    function Pane() {
		var vm = this;
		vm.paneState = "closed";
		vm.togglePane = togglePane;


		function togglePane() {
			vm.paneState = vm.paneState === "closed" ? "open" : "closed";
		}
	}
})();