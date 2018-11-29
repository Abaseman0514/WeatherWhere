"use strict"; {
    angular.module('app', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    template: '<user-preferences></user-preferences>'
                })
                .when('/weather', {
                    template: '<weather></weather>'
                })
                .otherwise({
                    template: '<h1>404 Page Does Not Exist</h1>'
                })
        });


}