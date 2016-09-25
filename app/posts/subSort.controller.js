(function() {
    'use strict';

    angular
        .module('app')
        .controller('SubSortCtrl', SubSortCtrl);

    function SubSortCtrl() {
    	var vm = this;
    	vm.tabOptions = ['New', 'Hot', 'Top'];
    	vm.activeTab = vm.tabOptions[0];
	}
})();