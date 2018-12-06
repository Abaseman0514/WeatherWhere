"use strict"; {
    angular.module('app')
        .controller('userPrefsController', function (weatherService, $timeout) {
            const $ctrl = this;
            weatherService.getWeather().then(result => {
              $ctrl.userData = result
            })
            
            $ctrl.user = function() {
              //const usernum = 70;
              const dayLightTemp = [{temp: 0, dayTime: 0, activity:"Stay Inside"},{temp: 20, dayTime: 8, activity:"Drink Hot Chocolate" },
              {temp: 40, dayTime: 10,activity:"Go Axe Throwing"},{temp: 60, dayTime: 12, activity:"Go Bike Riding"}, {temp: 80, dayTime: 14, activity:"Get Ice Cream"},
              {temp: 100, dayTime: 16, activity:"Drink Water"}, {temp: 120, dayTime: 24, activity:"Drink Water"},];
             
              // let tempDescription;
              // for (const userInfo of dayLightTemp) {
              //     if ($ctrl.dayValue <= userInfo.temp) {
              //         tempDescription = userInfo.activity
              //         console.log(userInfo.activity);
              //         break;
              //     }
              //     }

// console.log(tempDescription);
//               if ($ctrl.dayValue >= $ctrl.dayLightTime[1] && $ctrl.dayValue <= $ctrl.dayLightTime[2] && $ctrl.total <= 14 ){
                
//                 console.log($ctrl.weatherTemp[1] + 'Values Matching');
//                     };
//             console.log($ctrl.dayValue);
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
                var totalHours = (endTotalHours-begTotalHours);
                console.log(begDayTime);
                console.log(EndDayTime);
                console.log(endTotalHours);
                console.log(begTotalHours);
                console.log(totalHours);
                $ctrl.total = totalHours;
               }
function initComparisons(className) {
            var x, i;
            /*find all elements with an "overlay" class:*/
            x = document.getElementsByClassName(className);
            for (i = 0; i < x.length; i++) {
              /*once for each "overlay" element:
              pass the "overlay" element as a parameter when executing the compareImages function:*/
              compareImages(x[i]);
            }
            function compareImages(img) {
              var slider, img, clicked = 0, w, h;
              /*get the width and height of the img element*/
              w = img.offsetWidth;
              h = img.offsetHeight;
              /*set the width of the img element to 50%:*/
              img.style.width = (w / 2) + "px";
              /*create slider:*/
              slider = document.createElement("DIV");
              slider.setAttribute("class", "daylight");
              /*insert slider*/
              img.parentElement.insertBefore(slider, img);
              /*position the slider in the middle:*/
              slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
              slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
              /*execute a function when the mouse button is pressed:*/
              slider.addEventListener("mousedown", slideReady);
              /*and another function when the mouse button is released:*/
              window.addEventListener("mouseup", slideFinish);
              /*or touched (for touch screens:*/
              slider.addEventListener("touchstart", slideReady);
               /*and released (for touch screens:*/
              window.addEventListener("touchstop", slideFinish);
              function slideReady(e) {
                /*prevent any other actions that may occur when moving over the image:*/
                e.preventDefault();
                /*the slider is now clicked and ready to move:*/
                clicked = 1;
                /*execute a function when the slider is moved:*/
                window.addEventListener("mousemove", slideMove);
                window.addEventListener("touchmove", slideMove);
              }
              function slideFinish() {
                /*the slider is no longer clicked:*/
                const percent = (img.offsetWidth/img.parentElement.offsetWidth) * 100
                $timeout(() => {
                  $ctrl[className] = `${Math.round(percent)}`
                  console.log($ctrl[className], $ctrl);
                  weatherService.userdaypref = $ctrl.daytime; 
                  weatherService.usertemppref = $ctrl.temperature;
                  clicked = 0;
                });
              }
              function slideMove(e) {
                var pos;
                /*if the slider is no longer clicked, exit this function:*/
                if (clicked == 0) return false;
                /*get the cursor's x position:*/
                pos = getCursorPos(e)
                /*prevent the slider from being positioned outside the image:*/
                if (pos < 0) pos = 0;
                if (pos > w) pos = w;
                /*execute a function that will resize the overlay image according to the cursor:*/
                slide(pos);
              }
              function getCursorPos(e) {
                var a, x = 0;
                e = e || window.event;
                /*get the x positions of the image:*/
                a = img.getBoundingClientRect();
                /*calculate the cursor's x coordinate, relative to the image:*/
                x = e.pageX - a.left;
                /*consider any page scrolling:*/
                x = x - window.pageXOffset;
                return x;
              }
              function slide(x) {
                /*resize the image:*/
                img.style.width = x + "px";
                /*position the slider:*/
                slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
              }
              
            }
          }

          $ctrl.$onInit = function(){
            initComparisons('daytime');
            initComparisons('temperature');
          }

        });
}