"use strict";
{
    angular.module('app')
        .service('SkyconsService', function(){
            this.skycons = new Skycons({color: "white"});
        })
}