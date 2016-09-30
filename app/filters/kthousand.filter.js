(function() {
    'use strict'

    angular
        .module('app')
        .filter('kthousand', kthousand)

    function kthousand() {

    	// filter to convert number like 1500 to 1.5k

    	return function(number){
    		// parseInt in case number is passed as string
    		// if number is larger than 1000, divide by 1000, round to 1 decimal and append 'k'
    		var temp = parseInt(number)
    		if(temp > 1000){
    			temp = temp/1000
    			return temp.toFixed(1) + 'k'
    		}
    		return temp
    	}
    }
})()