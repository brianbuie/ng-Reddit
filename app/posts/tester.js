(function() {
    'use strict';

    angular
        .module('app.posts')
        .controller('Tester', Tester);

    Tester.$inject = ['Tab']

    function Tester(Tab) {
    	var vm = this;
    	vm.options = ['something', 'something else', 'shit', 'fuck'];

    	Tab.start(vm.options)

    	// Tab.start(['something', 'something else', 'shit', 'fuck'])

    	// console.log(Tab)

	}
})();