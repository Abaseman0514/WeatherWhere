"use strict"; {
    angular.module('app')
        .controller('userPrefsController', function (weatherService) {
            const $ctrl = this;
            weatherService.getWeather().then(result => {
                $ctrl.userData = result
            })
            $ctrl.user = function() {
           
            console.log($ctrl.dayValue);
            }
         

              $ctrl.begDay = function(){

                // Unixtimestamp
                var unixTimeBeg = $ctrl.userData.daily.data[0].sunriseTime;
                var unixTimeEnd = $ctrl.userData.daily.data[0].sunsetTime;
               
                // Months array
                var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
               
                // Convert timestamp to milliseconds
                var dateBeg = new Date(unixTimeBeg*1000);
                var dateEnd = new Date(unixTimeEnd*1000);
                // Year
                var yearBeg = dateBeg.getFullYear();
                var yearEnd = dateEnd.getFullYear();
                // Month
                var monthBeg = months_arr[dateBeg.getMonth()];
                var monthEnd = months_arr[dateEnd.getMonth()];
                // Day
                var dayBeg = dateBeg.getDate();
                var dayEnd = dateEnd.getDate();
                // Hours
                var hoursBeg = dateBeg.getHours();
                var hoursEnd = dateEnd.getHours();
               
                // Minutes
                var minutesBeg = "0" + dateBeg.getMinutes();
                var minutesEnd = "0" + dateEnd.getMinutes();
                // Seconds
                var secondsBeg = "0" + dateBeg.getSeconds();
                var secondsEnd = "0" + dateEnd.getSeconds();
               
                // Display date time in MM-dd-yyyy h:m:s format
                var begDayTime = monthBeg+'-'+dayBeg+'-'+yearBeg+' '+hoursBeg + ':' + minutesBeg.substr(-2) + ':' + secondsBeg.substr(-2);
                var EndDayTime = monthEnd+'-'+dayEnd+'-'+yearEnd+' '+hoursEnd + ':' + minutesEnd.substr(-2) + ':' + secondsEnd.substr(-2);
                var begTotalHours = hoursBeg;
                var endTotalHours = hoursEnd;
                console.log(begDayTime);
                console.log(EndDayTime);
                console.log(endTotalHours);
                console.log(begTotalHours);
                console.log(endTotalHours-begTotalHours);
               }
               




        });
    

}