(function() {
    'use strict'

    angular
        .module('app')
        .filter('html', html)

    html.$inject = ['$sce']

    function html($sce) {

    	return function(val){
            // if val is defined
            // create a textarea and put the value inside of it to unescape the escaped html entities
            // return that unescaped html as trusted html
            if(val){
                var txt = document.createElement("textarea");
                txt.innerHTML = val;
                return $sce.trustAsHtml(txt.value)
            }
    	}
    }
})()