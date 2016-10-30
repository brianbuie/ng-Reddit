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
    		var num = parseInt(number)
    		if(num > 999){
    			num = (num/1000).toFixed(1) + 'k'
    		} else {
                num = num.toString()
            }
    		return num
    	}
    }
})()