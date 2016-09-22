(function() {
    'use strict';

    angular
        .module('app.settings')
        .controller('Values', Values);

    function Values() {
		var vm = this;
		vm.getTimeout = getTimeout;

		vm.settings =
			{
				sound		: 		false,
				refresh		:		10,
			};

		function getTimeout(){
			// reset refresh to 10 if value is lower
			vm.settings.refresh = vm.settings.refresh < 10 ? 10 : vm.settings.refresh;

			// convert seconds to ms
			return vm.settings.refresh * 1000;
		}

	}
})();