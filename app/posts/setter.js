(function() {
    'use strict';

    angular
        .module('app.posts')
        .controller('Setter', Setter);

    Setter.$inject = ['$templateRequest'];

    function Setter($templateRequest) {
		var vm = this;
		vm.subreddit = "";
		vm.display = display;


		function display() {
			if(vm.subreddit === ""){
				var template = $templateRequest('app/posts/form.html')
				return template;
			} else {
				return '<h2>'+vm.subreddit+'</h2>';
			}
		}
	}
})();