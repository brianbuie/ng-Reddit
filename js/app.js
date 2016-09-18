var redditApp = angular.module('redditApp', []);

redditApp.controller('subredditController', function subredditController($scope) {
	$scope.things = [
		{
			name: 'value 1'
		}, {
			name: 'value 2'
		}, {
			name: 'value 3'
		}
	];
});

redditApp.controller('settingsController', function settingsController($scope){
	$scope.settings =
		{
			sound		: 		false,
			timeout		:		100000,
			something	: 		'else'
		};

	$scope.modalStatus = "closed";

	$scope.toggleModal = function() {
		if($scope.modalStatus === "closed"){ 
			$scope.modalStatus = "open"; 
		} else { 
			$scope.modalStatus = "closed"; 
		}
	}
})