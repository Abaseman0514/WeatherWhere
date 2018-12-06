"use strict";
{
    angular.module('app')
    .component('postform',{
        templateUrl:'components/postForm/postForm.html',
        
        bindings:{
            onSubmit: '<'
           
        }
    })
    
}