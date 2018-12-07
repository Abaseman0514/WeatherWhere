"use strict";{
    angular.module('app')
    .controller('postformController', function(weatherService){
        const $ctrl = this;
        $ctrl.addPost = function(){
            weatherService.boardMessages.push({name: $ctrl.textName, location: $ctrl.textLocation, message: $ctrl.textMessage});
            
        };
    });
    }