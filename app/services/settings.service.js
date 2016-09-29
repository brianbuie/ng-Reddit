(function() {
    'use strict';

    angular
    	.module('app')
        .service('Settings', Settings);

    Settings.$inject = ['$http']

    function Settings($http) {

        var values = {}

        // todo: load config.json file
        
        values = 
        {
            subreddit : "",
            thread : "",
            sound : false,
            timeout : 10000,
            delay : 0
        }

        return values

    }
})();