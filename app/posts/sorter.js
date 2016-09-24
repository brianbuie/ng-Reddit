(function() {
    'use strict';

    angular
        .module('app.posts')
        .controller('Sorter', Sorter);

    function Sorter() {
    	var vm = this;
    	vm.options = ['New', 'Hot', 'Top'];
    	vm.active = vm.options[0];
	}
})();