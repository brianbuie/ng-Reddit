(function() {
    'use strict';

    angular
        .module('app')
        .controller('DisplayPostsCtrl', DisplayPostsCtrl);

    DisplayPostsCtrl.$inject = ['$scope'];

    function DisplayPostsCtrl($scope) {
    	var vm = this;
    	vm.posts = [
    		{ 	
    			id : 'a1',
    			score : 13,
    			comments: 25,
    			title: 'This is the title of a post'
    		},
    		{ 	
    			id : 'a2',
    			score : 56,
    			comments: 43,
    			title: 'This is another awesome post'
    		},
    		{ 	
    			id : 'a3',
    			score : 0,
    			comments: 67,
    			title: 'This post sucks'
    		},
    	];
    	
	}
})();