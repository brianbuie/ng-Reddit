(function() {
    'use strict'

    angular
        .module('app')
        .controller('PostsCtrl', PostsCtrl)

    PostsCtrl.$inject = ['$http', '$timeout', 'Settings']

    function PostsCtrl($http, $timeout, Settings) {
        var vm = this
        
        // properties
        vm.entry = "" // subSelectForm text input value
        vm.error = ""
        vm.sortOptions = ["new", "hot", "top"]
        vm.sort = vm.sortOptions[0]
        vm.posts = {}
        vm.settings = Settings // settings service

        // methods
        vm.setSub = setSub
        vm.removeSub = removeSub
        vm.setSort = setSort
        vm.getPosts = getPosts

        function setSub() {
            // if value in subSelectForm text input
            // set current subreddit
            // clear form entry and any possible error message
            // start getting posts
            if(vm.entry){
                vm.subreddit = vm.entry
                vm.entry = ""
                vm.error = ""
            }
            getPosts() 
        }

        function removeSub(){
            // set form input to subreddit (seamless switch)
            // remove posts and subreddit
            vm.entry = vm.subreddit
            vm.posts = {}
            vm.subreddit = ""
        }

        function setSort(option){
            // if the option selected isn't already the current sort option
            // set current sort option
            // remove all current posts
            // get posts
            if(vm.sort !== option){
                vm.sort = option
                vm.posts = {}
                vm.getPosts()
            }
        }

        function getPosts(){
            // if subreddit is set (prevents function from looping after subreddit has been removed)
            if(vm.subreddit){
                // create url from reddit url, subreddit, and sort
                var url = 'https://www.reddit.com/r/' + vm.subreddit + '/' + vm.sort + '.json'
                // perform ajax request
                $http.get(url).then(function(response){
                    // check again to make sure subreddit is still set
                    if(vm.subreddit){
                        //translate data into more shallow and usable object
                        var values = response.data.data.children
                        // set temp container, so new posts aren't appended to the end of vm.posts
                        var temp = {}
                        // loop through response and set each post to it's own keyed object in temp object
                        angular.forEach(values, function(value){
                            temp[value.data.id] = value.data
                        })
                        // set posts to temp object
                        vm.posts = temp
                        // set timer to get posts again, time based on timeout value in settings
                        $timeout(vm.getPosts, vm.settings.timeout)
                    }
                })
            }
        }
    }
})()