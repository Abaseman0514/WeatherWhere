"use strict";{
    angular.module('app')
    .controller('boardController', function(){
        
        const $ctrl = this;
        $ctrl.hide = true;
        $ctrl.list= [
                        {title: 'Devin Scillian', 
                        thought: 'Roads are icy today.'}, 
                        {title: 'Kim Gill',
                        thought: 'Make sure to bring hats and gloves'},
                        {title: 'Rhonda Walker',
                        thought: 'First one to post here! '}, 

                    ];

        $ctrl.addText = function(){
                        $ctrl.hide = false;
                        $ctrl.show = true;
        
                    };
                
        $ctrl.addPost = function(post){
            $ctrl.list.unshift(post);
            $ctrl.show = false;
            $ctrl.hide = true;

        }


        }

        
            
   

    )};
    
    