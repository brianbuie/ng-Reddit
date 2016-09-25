(function() {
    'use strict';

    angular
    	.module('app')
        .service('Settings', Settings);

    Settings.$inject = ['$scope']

    function Settings($scope) {

        $scope.subreddit      = ""
        $scope.thread         = ""
        $scope.sound          = false
        $scope.timeout        = 10000
	
    }

    // todo: load defaults from JSON file

})();