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
        vm.settings = Settings // settings service
        vm.timeoutPromise = ""

        // methods
        vm.setThread = setThread
        vm.removeThread = removeThread
        vm.setSort = setSort
        vm.cleanUp = cleanUp
        vm.getComments = getComments

        function setThread() {
            // if value in form text input
            // set current thread
            // clear form entry and any possible error message
            // start getting comments
            if(vm.entry){
                vm.cleanUp()
                vm.settings.thread.permalink = vm.entry
                vm.entry = ""
                vm.getComments()
            }
        }

        function removeThread(){
            // remove comments and thread
            vm.cleanUp()
            vm.settings.thread = ""
        }

        function setSort(option){
            // if the option selected isn't already the current sort option
            // set current sort option
            // remove all current comments
            // get comments
            if(vm.sort !== option){
                vm.cleanUp()
                vm.sort = option
                vm.getComments()
            }
        }

        function cleanUp(){
            // cancel timeout and delete comments
            $timeout.cancel(vm.timeoutPromise)
            vm.comments = {}
            vm.error = ""
        }

        function getComments(){

            // if thread is set (prevents function from looping after thread has been removed)
            if(vm.settings.thread){

                // create url from reddit url, subreddit, and sort
                var url = 'https://www.reddit.com/' + vm.settings.thread.permalink + '.json?sort=' + vm.sort

                // perform ajax request
                $http.get(url).then(function(response){

                    // check again to make sure thread is still set
                    if(vm.settings.thread){

                        console.log(response);

                        //translate data into more shallow and usable object
                        vm.settings.thread = response.data[0].data.children[0].data
                        var comments = response.data[1].data.children

                        // set temp container, so new posts aren't appended to the end of vm.posts
                        var temp = {}

                        // loop through response and set each post to it's own keyed object in temp object
                        angular.forEach(comments, function(comment){
                            temp[comment.data.id] = comment.data
                        })
                        // set posts to temp object
                        vm.comments = temp

                        // set timer to get posts again, time based on timeout value in settings
                        vm.timeoutPromise = $timeout(vm.getComments, vm.settings.timeout)
                    }
                })
            }
        }
    }
})()