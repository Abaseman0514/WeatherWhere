"use strict"; {
    angular.module('app', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    template: '<user-Prefs></user-Prefs>'
                })
                .when('/weather', {
                    template: '<weather></weather>'
                })
                .when('/social', {
                    template: '<social></social>'
                })
                .when('/future', {
                    template: '<future></future>'
                })
                
                .otherwise({
                    template: '<h1>404 Page Does Not Exist</h1>'
                })
        });


}