(function() {
    'use strict'

    angular
        .module('app')
        .filter('plural', plural)

    function plural() {

    	// add 's' to end of descriptor if value is not 1

    	return function(value, descriptor){
    		if(value !== 1){
                descriptor += 's'
            }
            return value + ' ' + descriptor
    	}
    }
})()