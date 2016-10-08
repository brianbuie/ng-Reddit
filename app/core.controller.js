(function() { 
    'use strict' 
 
    angular 
        .module('app') 
        .controller('CoreCtrl', CoreCtrl) 
 
    CoreCtrl.$inject = ['$http', '$scope', '$timeout', 'Settings'] 
 
    function CoreCtrl($http, $scope, $timeout, Settings) { 
 
        var vm = this 
         
        /** 
        * Properties 
        */ 
        // form entry 
        vm.entry = "" 
        // error message 
        vm.error = ""
        // main head value (subreddit or selected post)
        vm.head = ""
        // either "comments" or "posts", used to trigger differences in getCollection method
        vm.controllerType = ""
        // the reddit url for getting collection
        vm.url = ""
        // tab sort options for collection
        vm.sortOptions = ["new", "hot", "top"] 
        // current sort (init default) 
        vm.sort = vm.sortOptions[0] 
        // collection of items (posts or comments) 
        vm.collection = []
        // global settings (from Settings service) 
        vm.global = Settings 
        // timeout promise for $http get 
        vm.timeoutPromise = "" 
 
        /** 
        * Methods 
        */
        // set controller type on init
        vm.setControllerType = setControllerType
        // create Header object (subreddit or thread) 
        vm.setHead = setHead
        // unset Header object 
        vm.unsetHead = unsetHead
        // set value in global variable
        vm.setData = setData
        // change collection sort
        vm.setSort = setSort 
        // unset collection 
        vm.removeCollection = removeCollection 
        // $http get collection items 
        vm.getCollection = getCollection
        // nest collection items (comments)
        vm.nestReplies = nestReplies
 

        /** 
         * set controller type on init
         */ 
        function setControllerType(type) { 
            vm.controllerType = type
            if(type === "comments"){
                vm.url = vm.global.postUrl
            }
        }

        /** 
         * Use form value to set head object and get collection
         */ 
        function setHead() {
            if(!vm.entry){ return }
            vm.removeCollection()
            vm.error = ""
            if(vm.controllerType === "posts"){
                vm.head = vm.entry
                vm.url = 'https://www.reddit.com/r/' + vm.head
                vm.getCollection()
            }
            if(vm.controllerType === "comments"){
                vm.setData('postUrl', vm.entry)
            }
            vm.entry = ""
        }

        /** 
         * Monitors change to postUrl
         * if controller is for comments, it refreshes collection
         */
        $scope.$watch(
            function(){
                return vm.global.postUrl
            }, function(){
            if(vm.controllerType === "comments"){
                vm.url = vm.global.postUrl
                vm.removeCollection()
                vm.getCollection()
            }
        })

        /** 
         * Unsets the head object (subreddit or active post) 
         * Unsets the collection 
         */ 
        function unsetHead(){ 
            vm.removeCollection() 
            vm.head = ""
            vm.url = ""
            if(vm.controllerType === "comments"){
                vm.setData('postUrl', "")
                vm.setData('postId', "")
            }
        }

        /** 
         * Set global data value
         * @param {string} prop - The property to change
         * @param {any} value - The value to be set
         */ 
        function setData(prop, value){ 
            vm.global[prop] = value
        }
 
        /** 
         * Set the sort option for the collection 
         * @param {string} option - The sort option 
         */ 
        function setSort(option){
            if(vm.sort === option){ return }
            vm.removeCollection() 
            vm.sort = option 
            vm.getCollection()
        } 
 
        /** 
         * Unset the collection 
         * Cancel the timeout responsible for updating collection 
         */ 
        function removeCollection(){ 
            $timeout.cancel(vm.timeoutPromise) 
            vm.collection = []
            vm.error = "" 
        } 
 
        /** 
         * Sends request for collection 
         * Invokes a timeout based on Settings to perform this method again
         */ 
        function getCollection(){ 
            if(!vm.url){ return }
            if(vm.controllerType === "posts"){
                var url = vm.url + '/' + vm.sort + '.json'
            }
            if(vm.controllerType === "comments"){
                var url = vm.url + '.json?sort=' + vm.sort
            }
            $http.get( url ).then(function successCallback(response){
                if(!vm.url){ return } 
                if(vm.controllerType === "posts"){
                    var rawCollection = response.data.data.children
                }
                if (vm.controllerType === "comments"){
                    vm.head = response.data[0].data.children[0].data
                    vm.global.postId = vm.head.id
                    var rawCollection = response.data[1].data.children
                }
                var tempCollection = []
                angular.forEach(rawCollection, function(item){
                    if(!item.data.author){ return }
                    tempCollection.push(item.data)
                    if(item.data.replies){
                        item.data.replies = vm.nestReplies(item.data.replies)
                    }
                })
                vm.collection = tempCollection
                vm.timeoutPromise = $timeout( vm.getCollection, vm.global.timeout)
            }, function errorCallback(response){
                vm.unsetHead()
                vm.error = "there was an error :(" 
            })
        }

        /** 
         * Nests replies to collection item at proper depth for use elsewhere, returns formatted replies
         * @param {array} replies - The raw replies array from response
         */ 
        function nestReplies(replies){
            if(!replies.data.children){ return }
            var tempReplies = []
            angular.forEach(replies.data.children, function(reply){
                if(!reply.data.author){ return }
                tempReplies.push(reply.data)
                if(reply.data.replies){
                    reply.data.replies = vm.nestReplies(reply.data.replies)
                }
            })
            return tempReplies
        }
    } 
})()