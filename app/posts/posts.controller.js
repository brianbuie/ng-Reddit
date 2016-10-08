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
        vm.posts = []
        vm.settings = Settings // settings service
        vm.timeoutPromise = ""

        // methods
        vm.setSub = setSub
        vm.removeSub = removeSub
        vm.setSort = setSort
        vm.removePosts = removePosts
        vm.getPosts = getPosts
        vm.setPost = setPost

        function setPost(permalink){
            vm.settings.postUrl = 'https://www.reddit.com/' + permalink
        }

        function setSub() {
            // if value in subSelectForm text input
            // cancel running timeout instance (prevent duplicate)
            // set current subreddit
            // clear form entry and any possible error message
            // start getting posts
            if(vm.entry){
                vm.removePosts()
                vm.subreddit = vm.entry
                vm.entry = ""
                vm.getPosts()
            }
        }

        function removeSub(){
            // cancel running timeout instance (prevent duplicate)
            // set form input to subreddit (seamless switch)
            // remove posts and subreddit
            vm.removePosts()
            vm.entry = vm.subreddit
            vm.subreddit = ""
        }

        function setSort(option){
            // if the option selected isn't already the current sort option
            // cancel running timeout instance
            // set current sort option
            // remove all current posts
            // get posts
            if(vm.sort !== option){
                vm.removePosts()
                vm.sort = option
                vm.getPosts()
            }
        }

        function removePosts(){
            // cancel timeout and delete posts
            $timeout.cancel(vm.timeoutPromise)
            vm.posts = []
            vm.error = ""
        }

        function getPosts(){

            // make sure subreddit hasn't been unset 
            if(vm.subreddit){

                // create url from reddit url, subreddit, and sort
                var url = 'https://www.reddit.com/r/' + vm.subreddit + '/' + vm.sort + '.json'

                // perform ajax request
                $http.get(url).then(function successCallback(response){

                    // check again to make sure subreddit is still set and instance generated uniqueId is still equal to active syncId
                    if(vm.subreddit){

                        //translate data into more shallow and usable object
                        var values = response.data.data.children

                        // set temp container so posts object can be replaced on completion
                        var temp = []

                        // loop through response and set each post to its own keyed object in temp object
                        angular.forEach(values, function(value){
                            temp.push(value.data)
                        })

                        // set posts to temp object
                        vm.posts = temp

                        // set timer to get posts again, time based on timeout value in settings
                        // assigned to vm.timeoutPromise so $timeout.cancel can reference it
                        vm.timeoutPromise = $timeout(vm.getPosts, vm.settings.timeout)
                    }
                }, function errorCallback(response){
                    vm.subreddit = ""
                    vm.error = "Are you sure that's a subreddit?"
                })
            }
        }
    }
})()