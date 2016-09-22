(function() {
    'use strict';

    angular
        .module('app.posts')
        .controller('Setter', Setter);

    function Setter() {
		var vm = this;
		vm.subreddit = "";
		vm.entry = "";
		vm.error = "";
		vm.setSub = setSub;
		vm.removeSub = removeSub;


		function setSub() {
			if(vm.entry){
				vm.subreddit = vm.entry;
				vm.entry = "";
				vm.error = "";
			}
			validateSub();
		}

		function removeSub(){
			vm.subreddit = "";
		}

		function validateSub(){
			if(vm.subreddit != "nba"){
				vm.entry = vm.subreddit;
				vm.error = "That's not r/nba";
				vm.subreddit = "";
			}
		}
	}
})();