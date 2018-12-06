"use strict";{
    angular.module('app')
    .controller('postformController', function(){
        const $ctrl = this;
        $ctrl.addPost = function(){
            $ctrl.onSubmit({title: $ctrl.textTitle, thought: $ctrl.textThought});
            console.log('test')
        };
    });
    }