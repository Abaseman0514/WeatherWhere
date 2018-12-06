"use strict";
{
    angular.module('app')
    .component('post',{
        templateUrl:'components/message/post.html',
        controller: 'postController',
        bindings:{
            item:'<',
            
           
        }
    })
    
}