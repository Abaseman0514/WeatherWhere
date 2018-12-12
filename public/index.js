"use strict"; {
    angular.module('app', ['ngRoute', 'ngAnimate'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    template: '<user-Prefs></user-Prefs>'
                })
                .when('/weather', {
                    template: '<weather></weather>'
                })
                .otherwise({
                    template: '<h1>404 Page Does Not Exist</h1>'
                })
        });


}