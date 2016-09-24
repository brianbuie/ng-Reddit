(function() {
    'use strict';

    angular
    	.module('app')
        .service('Tab', Tab);

    Tab.$inject = ['$http']

    function Tab($http) {
    	var service = {}
    	service.options = []
    	service.active = ""
    	service.start = start
    	service.display = display
    	service.set = set

    	function start(arr){
    		service.options = arr
    		service.active = service.options[0]
    	}

    	function display(){
    		return $http({
    			method: 'GET',
    			url: 'app/templates/tabs.html'
    		})
    	}

    	function set(opt){
    		active = opt;
    	}

    	return service;
	}
})();