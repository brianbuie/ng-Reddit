(function() {
    'use strict';

    angular
        .module('app')
        .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['$scope']

    function SettingsCtrl($scope) {

    	$scope.values = {
    		subreddit : "",
    		thread : "",
    		sound : false,
    		timeout: 10000
    	}
	}
})();