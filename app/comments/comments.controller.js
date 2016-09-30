(function() {
    'use strict'

    angular
        .module('app')
        .controller('CommentsCtrl', CommentsCtrl)

    CommentsCtrl.$inject = ['$http', '$timeout', 'Settings']

    function CommentsCtrl($http, $timeout, Settings) {
        var vm = this
        
        // properties
        vm.entry = ""
        vm.error = ""
        vm.sortOptions = ["new", "hot", "top"]
        vm.sort = vm.sortOptions[0]
        vm.comments = {}
        vm.threadInfo = {}
        vm.settings = Settings // settings service

        // methods
        vm.setThread = setThread
        vm.removeThread = removeThread
        vm.setSort = setSort
        vm.getComments = getComments

        function setThread() {
            // if value in form text input
            // set current thread
            // clear form entry and any possible error message
            // start getting comments
            if(vm.entry){
                vm.settings.thread = vm.entry
                vm.entry = ""
                vm.error = ""
            }
            getComments() 
        }

        function removeThread(){
            // remove comments and thread
            vm.comments = {}
            vm.settings.thread = ""
        }

        function setSort(option){
            // if the option selected isn't already the current sort option
            // set current sort option
            // remove all current comments
            // get comments
            if(vm.sort !== option){
                vm.sort = option
                vm.comments = {}
                vm.getComments()
            }
        }

        function getComments(){
            // if thread is set (prevents function from looping after thread has been removed)
            if(vm.settings.thread){
                // create url from reddit url, subreddit, and sort
                var url = vm.settings.thread + '.json?sort=' + vm.sort
                // perform ajax request
                $http.get(url).then(function(response){
                    // check again to make sure thread is still set
                    if(vm.settings.thread){

                        console.log(response);

                        //translate data into more shallow and usable object
                        vm.threadInfo = response.data[0].data.children[0].data
                        vm.threadTitle = vm.threadInfo.title
                        var rawComments = response.data[1].data.children

                        // set temp container, so new posts aren't appended to the end of vm.posts
                        var tempComments = {}
                        // loop through response and set each post to it's own keyed object in temp object
                        angular.forEach(rawComments, function(rawComments){
                            tempComments[rawComments.data.id] = rawComments.data
                        })
                        // set posts to temp object
                        vm.comments = tempComments
                        // set timer to get posts again, time based on timeout value in settings
                        // $timeout(vm.getComments, vm.settings.timeout)
                        console.log(vm.comments)
                    }
                })
            }
        }
    }
})()