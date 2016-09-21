var redditApp = angular.module('redditApp', []);


redditApp.controller('postsController', function postsController(){
	this.subreddit = '';
	this.subInput = '';
	this.formVisibility = '';

	this.subSelect = function(){
		this.subreddit = this.subInput;
		this.subInput = '';
		this.formVisibility = 'hidden';
	}

	this.removeSub = function(){
		this.subreddit = '';
		this.formVisibility = '';
	}
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
		$scope.modalStatus = $scope.modalStatus === "closed" ? "open" : "closed";
	}
})