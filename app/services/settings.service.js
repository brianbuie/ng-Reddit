(function() {
    'use strict';

    angular
    	.module('app')
        .service('Settings', Settings);

    function Settings() {

        var values = {}

        // todo: load config.json file

        values = 
        {
            thread : "",
            threadTitle: "",
            sound : false,
            timeout : 10000,
            delay : 0
        }

        return values

    }
})();