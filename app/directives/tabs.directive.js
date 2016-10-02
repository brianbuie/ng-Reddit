(function() {
    'use strict';

    angular
        .module('app')
        .directive('tabs', tabs)

        function tabs(){
        	return{
        		restrict: "E",
        		templateUrl: "app/templates/tabs.html"
        	}
        }

})();