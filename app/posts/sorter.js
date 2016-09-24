(function() {
    'use strict';

    angular
        .module('app.posts')
        .controller('Sorter', Sorter);

    function Sorter() {
    	var vm = this;
    	vm.tabOptions = ['New', 'Hot', 'Top'];
    	vm.activeTab = vm.tabOptions[0];
	}
})();