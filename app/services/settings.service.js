(function() {
    'use strict';

    angular
    	.module('app')
        .service('Settings', Settings);

    Settings.$inject = ['$rootScope']

    function Settings($rootScope) {

        $rootScope.subreddit      = ""
        $rootScope.thread         = ""
        $rootScope.sound          = false
        $rootScope.timeout        = 10000
    
        console.log($rootScope)
    }
})();