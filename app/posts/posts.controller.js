(function() {
    'use strict'

    angular
        .module('app')
        .controller('PostsCtrl', PostsCtrl)

    PostsCtrl.$inject = ['Settings']

    function PostsCtrl(Settings) {
        var vm = this
        vm.entry = ""
        vm.error = ""
        vm.sort = ""
        vm.settings = Settings
        vm.setSub = setSub
        vm.removeSub = removeSub
        vm.setSort = setSort
        vm.posts = []

        function setSub() {
            if(vm.entry){
                vm.subreddit = vm.entry
                vm.entry = ""
                vm.error = ""
            }
            console.log(vm)
            validateSub()
        }

        function removeSub(){
            vm.entry = vm.subreddit
            vm.subreddit = ""
        }

        function validateSub(){
            if(false){
                vm.entry = vm.subreddit
                vm.error = "That's not a valid subreddit"
                vm.subreddit = ""
            }
        }

        function setSort(option){
            // vm.sort !== option ? remove posts and get new ones
            vm.sort = option
            console.log(vm)
        }

        // temporary
        vm.posts = [
            {   
                id : 'a1',
                score : 13,
                comments: 25,
                title: 'This is the title of a post'
            },
            {   
                id : 'a2',
                score : 56,
                comments: 43,
                title: 'This is another awesome post'
            },
            {   
                id : 'a3',
                score : 0,
                comments: 67,
                title: 'This post sucks'
            },
        ]

    }
})()