"use strict";{
    angular.module('app')
    .controller('boardController', function(weatherService){
        
        const $ctrl = this;
        $ctrl.hide = true;
        $ctrl.list = weatherService.boardMessages;
       

        $ctrl.addText = function(){
                        $ctrl.hide = false;
                        $ctrl.show = true;
        
                    };
                
        $ctrl.addPost = function(post){
            weatherService.boardMessages.unshift(post);
            $ctrl.show = false;
            $ctrl.hide = true;

        }


        }

        
            
   

    )};
    
    