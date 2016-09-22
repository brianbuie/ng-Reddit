(function() {
    'use strict';

    angular
        .module('app.settings')
        .controller('Pane', Pane);

    function Pane() {
		var vm = this;
		vm.paneStatus = "closed";
		vm.togglePane = togglePane;


		function togglePane() {
			vm.paneStatus = vm.paneStatus === "closed" ? "open" : "closed";
		}
	}
})();