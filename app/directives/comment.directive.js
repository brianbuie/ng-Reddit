(function() {
    'use strict';

    angular
        .module('app')
        .directive('comment', comment)

        function comment(){
        	return{
        		restrict: "E",
        		templateUrl: "app/templates/tabs.html"
        	}
        }

})();