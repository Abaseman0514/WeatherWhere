"use strict"; {
    angular.module('app')
    .controller('futureController', function (weatherService, $timeout) {
        const $ctrl = this;
        // icons = [];
        weatherService.getWeather().then(result => {
            const skycons = new Skycons({ color: 'white' });
            $ctrl.userData = result;
            result.daily.data.forEach((day, index) => {
                $timeout(() => skycons.add(`icon${index}`, day.icon));
            });
            $ctrl.icons = skycons;
            skycons.play();
            $ctrl.begDay();
            // console.log($ctrl.icons)
            
            // return $ctrl.icons;
        });
        $ctrl.begDay = function(){
        
            // Unixtimestamp
            var unixTimeBeg = $ctrl.userData.daily.data[0].time;
            var unixTimeEnd = $ctrl.userData.daily.data[0].time;
            
        
            // Months array
            var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            
            // Convert timestamp to milliseconds
            var dateBeg = new Date(unixTimeBeg*1000);
            var dateEnd = new Date(unixTimeEnd*1000);
         
            // Month
            var monthBeg = months_arr[dateBeg.getMonth()];
            var monthEnd = months_arr[dateEnd.getMonth()];
            // Day
            var dayBeg = dateBeg.getDate();
            var dayEnd = dateEnd.getDate();
            
            
            // Display date time in MM-dd-yyyy h:m:s format
            var begDayTime = monthBeg+''+dayBeg;
            var EndDayTime = monthEnd+''+dayEnd;
        
            
            console.log(begDayTime);
            console.log(EndDayTime);
           
            
        }
    })
}



