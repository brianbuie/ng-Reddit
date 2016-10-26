(function() {
    'use strict';

    angular
        .module('app')
        .directive('postloader', postloader)

        function postloader(){
        	return{
        		restrict: "E",
                scope: {
                    url: '=',
                    domain: '='
                },
                template: '<iframe src=""></iframe><img src="" />'
                controller  : ['$scope','$http', function($scope, $http) {
                    $scope.$watch('url',
                        function(){
                            if($scope.domain === "youtube.com" || $scope.domain === "youtu.be"){
                                console.log('youtube video')
                                return
                            }
                            if($scope.domain === "imgur.com"){
                                console.log('imgur picture')
                                return
                            }
                            console.log('other : ' + $scope.domain)
                        }
                    )
                }]
        	}
        }

})();