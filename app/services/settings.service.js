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
            postUrl : "",
            postId: "",
            sound : false,
            timeout : 10000,
            delay : 0
        }

        return values

    }
})();