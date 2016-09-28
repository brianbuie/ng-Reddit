(function() {
    'use strict';

    angular
        .module('app')
        .directive('tabs', tabs)

        function tabs(){
        	return{
        		restrict: "E",
        		templateUrl: "app/templates/tabs.html",
        		controller: function(){
        			this.tabOptions = ["New", "Hot", "Top"]
        			this.tab = this.tabOptions[0]
        			this.isSet = function(checkTab){
        				return this.tab === checkTab
        			}
        			this.setTab = function(activeTab){
        				this.tab = activeTab
        			}
        		},
        		controllerAs: "tab"
        	}
        }

})();