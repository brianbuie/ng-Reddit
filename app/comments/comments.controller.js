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
        vm.comments = {}
        vm.thread = {}
        vm.settings = Settings // settings service
        vm.timeoutPromise = ""

        // methods
        vm.setThread = setThread
        vm.removeThread = removeThread
        vm.setSort = setSort
        vm.cleanUp = cleanUp
        vm.getComments = getComments
        vm.nestReplies = nestReplies

        function setThread() {
            // if value in form text input
            // set current thread
            // clear form entry and any possible error message
            // start getting comments
            if(vm.entry){
                vm.cleanUp()
                vm.settings.threadUrl = vm.entry
                vm.entry = ""
                vm.error = ""
                vm.getComments()
            }
        }

        function removeThread(){
            // remove comments and thread
            vm.cleanUp()
            vm.settings.threadUrl = ""
            vm.settings.threadId = ""
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

        $scope.$watch(angular.bind(this, function(){
            return this.settings.threadUrl
        }), function(value){
            vm.cleanUp()
            vm.thread = {}
            vm.getComments()
        })

        function getComments(){
            // if thread is set (prevents function from looping after thread has been removed)
            if(vm.settings.threadUrl){
                var url = vm.settings.threadUrl + '.json?sort=' + vm.sort
                $http.get(url).then(function(response){

                    // make sure thread hasn't been removed since sending request
                    if(vm.settings.threadUrl){

                        //translate data into more shallow and usable object
                        vm.thread = response.data[0].data.children[0].data

                        vm.settings.threadId = vm.thread.id
                        var rawComments = response.data[1].data.children

                        // object for processed comments, so vm.comments can be replaced all at once
                        var temp = {}

                        // loop through response and set each post to it's own keyed object in temp object
                        // iterate through responses to make shallow
                        angular.forEach(rawComments, function(comment){
                            temp[comment.data.id] = comment.data
                            if(comment.data.replies){
                                comment.data.replies = vm.nestReplies(comment.data.replies)
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
            var tempReplies = {}

            // loop through replies
            angular.forEach(replies.data.children, function(reply){

                // if comment has no author (been deleted or removed), return nothing
                if(!reply.data.author){ return }

                tempReplies[reply.data.id] = reply.data

                // if the reply has replies, recurse through those
                if(reply.data.replies){
                    reply.data.replies = vm.nestReplies(reply.data.replies)
                }
            })
            return tempReplies
        }
    }
})()