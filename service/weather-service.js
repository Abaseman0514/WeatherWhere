"use strict"; {
    angular.module('app')
        .service('weatherService', function ($http, $location) {
            // const service = this;
            // service.moviename = [];
            // service.movietitle = [];
            // service.watch = [];



            // service.newSearch = function (search, category) {
            //     let url = 'https://api.themoviedb.org/3/';
            //     let select = category
            //     let apiKey = '?api_key=33bfadcb23406507fb40ff261ed9828c';
            //     let key = 'query=' + search;
            //     let final = $http.get(url + select + apiKey + key);



            //     final.then((responseData) => {
            //         service.moviename = responseData.data.results;
            //         console.log("This is the data", responseData.data);
            //         $location.path('/movieList');
            //         return service.moviename;



            //     });

            // }
        });

}