(function() {
    'use strict'

    angular
        .module('app')
        .controller('CommentsCtrl', CommentsCtrl)

    CommentsCtrl.$inject = ['$http', '$timeout', '$scope', 'Settings']

    function CommentsCtrl($http, $timeout, $scope, Settings) {
        var vm = this
        
        // properties
        vm.entry = ""
        vm.error = ""
        vm.sortOptions = ["new", "hot", "top"]
        vm.sort = vm.sortOptions[0]
        vm.comments = []
        vm.post = {}
        vm.settings = Settings // settings service
        vm.timeoutPromise = ""

        // methods
        vm.setPost = setPost
        vm.removePost = removePost
        vm.setSort = setSort
        vm.removeComments = removeComments
        vm.getComments = getComments
        vm.nestReplies = nestReplies

        function setPost() {
            // if value in form text input
            // set current post
            // clear form entry and any possible error message
            // start getting comments
            if(vm.entry){
                vm.removeComments()
                vm.settings.postUrl = vm.entry
                vm.entry = ""
                vm.error = ""
                vm.getComments()
            }
        }

        function removePost(){
            // remove comments and post
            vm.removeComments()
            vm.settings.postUrl = ""
            vm.settings.postId = ""
        }

        function setSort(option){
            // if the option selected isn't already the current sort option
            // set current sort option
            // remove all current comments
            // get comments
            if(vm.sort !== option){
                vm.removeComments()
                vm.sort = option
                vm.getComments()
            }
        }

        function removeComments(){
            // cancel timeout and delete comments
            $timeout.cancel(vm.timeoutPromise)
            vm.comments = []
            vm.error = ""
        }

        $scope.$watch(angular.bind(this, function(){
            return this.settings.postUrl
        }), function(value){
            vm.removeComments()
            vm.post = {}
            vm.getComments()
        })

        function getComments(){
            // if post is set (prevents function from looping after post has been removed)
            if(vm.settings.postUrl){
                var url = vm.settings.postUrl + '.json?sort=' + vm.sort
                $http.get(url).then(function(response){

                    // make sure post hasn't been removed since sending request
                    if(vm.settings.postUrl){

                        //translate data into more shallow and usable object
                        vm.post = response.data[0].data.children[0].data

                        vm.settings.postId = vm.post.id
                        var rawComments = response.data[1].data.children

                        // object for processed comments, so vm.comments can be replaced all at once
                        var temp = []

                        // loop through response and set each post to it's own keyed object in temp object
                        // iterate through responses to make shallow
                        angular.forEach(rawComments, function(comment){
                            if(comment.data.author){
                                temp.push(comment.data)
                                if(comment.data.replies){
                                    comment.data.replies = vm.nestReplies(comment.data.replies)
                                }
                            }
                        })
                        // set posts to temp object
                        vm.comments = temp

                        // set timer to get posts again, time based on timeout value in settings
                        vm.timeoutPromise = $timeout(vm.getComments, vm.settings.timeout)
                    }
                })
            }
        }

        function nestReplies(replies){
            // iterates through all replies and makes them the same depth as the rest of the comments/replies
            // allows for directive in view to iterate through replies and process the same as normal comments

            // if the replies property doesn't have replies, return nothing
            if(!replies.data.children){ return }

            // create temp object to hold reformated replies
            var tempReplies = []

            // loop through replies
            angular.forEach(replies.data.children, function(reply){

                // if comment has no author (been deleted or removed), return nothing
                if(!reply.data.author){ return }

                tempReplies.push(reply.data)

                // if the reply has replies, recurse through those
                if(reply.data.replies){
                    reply.data.replies = vm.nestReplies(reply.data.replies)
                }
            })
            return tempReplies
        }
    }
})()