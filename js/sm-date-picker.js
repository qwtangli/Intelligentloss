/*!
 * =====================================================
 * SUI Mobile - 日期控件自定义扩展
 * =====================================================
 */
+ function($) {
    "use strict";
    
    var today = new Date();
    
    var getDays = function(max) {
        var days = [];
        for(var i=1; i<= (max||31);i++) {
            days.push(i < 10 ? "0"+i : i);
        }
        return days;
    };

    var getDaysByMonthAndYear = function(month, year) {
        var int_d = new Date(year, parseInt(month)+1-1, 1);
        var d = new Date(int_d - 1);
        return getDays(d.getDate());
    };

    var formatNumber = function (n) {
        return n < 10 ? "0" + n : n;
    };

    var initMonthes = ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ');
    
    var initYears = function (min, max) {
    	var minYear = new Date(min.replace(new RegExp("-","gm"),"/")).getFullYear();
    	var maxYear = new Date(max.replace(new RegExp("-","gm"),"/")).getFullYear();
        var arr = [];
        for (var i = minYear; i <= maxYear; i++) { arr.push(i); }
        return arr;
    };
    
    var defaults = {
    		
    	change : null,
    	minDate : '1950-01-01',
    	maxDate : '2099-12-31',
    		
        rotateEffect: false,  //为了性能 

        value: [today.getFullYear(), formatNumber(today.getMonth()+1), formatNumber(today.getDate())],
        
        onChange: function (picker, values, displayValues) {
        	
            var days = getDaysByMonthAndYear(picker.cols[1].value, picker.cols[0].value);
            var currentValue = picker.cols[2].value;
            if(currentValue > days.length) currentValue = days.length;
            picker.cols[2].setValue(currentValue);
            
            var selectVal = picker.cols[0].value + '-' + picker.cols[1].value+ '-' + currentValue;
            
            var selectValTime = new Date(selectVal.replace(new RegExp("-","gm"),"/")).getTime();
            var getminTime = new Date(picker.params.minDate.replace(new RegExp("-","gm"),"/")).getTime();
            var getmaxTime = new Date(picker.params.maxDate.replace(new RegExp("-","gm"),"/")).getTime();
            
            if(selectValTime < getminTime){
            	 picker.cols[0].setValue(picker.params.minDate.split('-')[0]);
            	 picker.cols[1].setValue(picker.params.minDate.split('-')[1]);
            	 picker.cols[2].setValue(picker.params.minDate.split('-')[2]);
            	 selectVal = picker.params.minDate;
            }
            if(selectValTime > getmaxTime){
           	 	picker.cols[0].setValue(picker.params.maxDate.split('-')[0]);
           	 	picker.cols[1].setValue(picker.params.maxDate.split('-')[1]);
           	 	picker.cols[2].setValue(picker.params.maxDate.split('-')[2]);
           	 	selectVal = picker.params.maxDate;
            }
            if(picker.params.change){
            	picker.params.change(selectVal);
            }
            
        },

        formatValue: function (p, values, displayValues) {
            return displayValues[0] + '-' + values[1] + '-' + values[2];
        },

        cols: [
            
        ]
    };

    $.fn.datePicker = function(params) {
    	
        return this.each(function() {
            if(!this) return;
            var defaultsCopy = $.extend(true, {}, defaults);
            var p = $.extend(defaultsCopy, params);
            
            p.cssClass = 'customized-datePicker';
            
            p.cols = [{
                         values: initYears(p.minDate, p.maxDate)
                 },{
                     values: initMonthes
                 },{
                     values: getDays()
                 }];
            
            if(params.value){
            	p.value = [params.value.split('-')[0], params.value.split('-')[1], params.value.split('-')[2]];
            }
            $(this).picker(p);
            if (params.value) $(this).val(p.formatValue(p, p.value, p.value));
        });
    };

}(Zepto);


+ function($) {
    "use strict";

    var today = new Date();
    
    var formatNumber = function (n) {
        return n < 10 ? "0" + n : n;
    };

    var defaults = {
    		
    	change : null,
    	    
    	minTime : '00:00',
    	maxTime :'23:59',

        rotateEffect: false,  //为了性能

        value: [formatNumber(today.getHours()), formatNumber(today.getMinutes())],

        onChange: function (picker, values, displayValues) {
        	
        	var selectVal = picker.cols[0].value+":"+picker.cols[2].value;
            var selectValTime = new Date('1900/01/01 '+selectVal+":00").getTime();
            var getminTime = new Date('1900/01/01 '+picker.params.minTime+':00').getTime();
            var getmaxTime = new Date('1900/01/01 '+picker.params.maxTime+':00').getTime();
            
            if(selectValTime < getminTime){
            	 picker.cols[0].setValue(picker.params.minTime.split(':')[0]);
            	 picker.cols[2].setValue(picker.params.minTime.split(':')[1]);
            	 selectVal = picker.params.minTime;
            }
            if(selectValTime > getmaxTime){
           	 	picker.cols[0].setValue(picker.params.maxTime.split(':')[0]);
           	 	picker.cols[2].setValue(picker.params.maxTime.split(':')[1]);
           	 	selectVal = picker.params.maxTime;
            }
            
            if(picker.params.change){
            	picker.params.change(selectVal);
            }
        	
        },

        formatValue: function (p, values, displayValues) {
            return values[0] + ':' + values[1];
        },

        cols: []
    };

    $.fn.timePicker = function(params) {
        return this.each(function() {
            if(!this) return;
            var defaultsCopy = $.extend(true, {}, defaults);
            var p = $.extend(defaultsCopy, params);
            
            p.cssClass = 'customized-timePicker';
         
            p.cols = [
                      {
                          values: (function () {
                              var arr = [];
                              for (var i = 0; i <= 23; i++) { arr.push(i < 10 ? '0' + i : i); }
                              return arr;
                          })(),
                      },
                      // Divider
                      {
                          divider: true,
                          content: ':'
                      },
                      // Minutes
                      {
                          values: (function () {
                              var arr = [];
                              for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                              return arr;
                          })(),
                      }
                      ];
            
            if(params.value){
            	p.value = [params.value.split(':')[0], params.value.split(':')[1]];
            }
            
            $(this).picker(p);
            if (params.value) $(this).val(p.formatValue(p, p.value, p.value));
        });
    };

}(Zepto);




+ function($) {
    "use strict";

    var today = new Date();
    
    var getDays = function(max) {
        var days = [];
        for(var i=1; i<= (max||31);i++) {
            days.push(i < 10 ? "0"+i : i);
        }
        return days;
    };

    var getDaysByMonthAndYear = function(month, year) {
        var int_d = new Date(year, parseInt(month)+1-1, 1);
        var d = new Date(int_d - 1);
        return getDays(d.getDate());
    };

    var formatNumber = function (n) {
        return n < 10 ? "0" + n : n;
    };

    var initMonthes = ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ');

    var initYears = function (min, max) {
    	var minYear = new Date(min.replace(new RegExp("-","gm"),"/")).getFullYear();
    	var maxYear = new Date(max.replace(new RegExp("-","gm"),"/")).getFullYear();
        var arr = [];
        for (var i = minYear; i <= maxYear; i++) { arr.push(i); }
        return arr;
    };

    var defaults = {

        rotateEffect: false,  //为了性能
        
        change : null,
	    
        minDateTime : '1950-01-01 00:00',
        maxDateTime : '2099-12-31 23:59',

        value: [today.getFullYear(), formatNumber(today.getMonth()+1), formatNumber(today.getDate()), formatNumber(today.getHours()), formatNumber(today.getMinutes())],

        onChange: function (picker, values, displayValues) {
            var days = getDaysByMonthAndYear(picker.cols[1].value, picker.cols[0].value);
            var currentValue = picker.cols[2].value;
            if(currentValue > days.length) currentValue = days.length;
            picker.cols[2].setValue(currentValue);
            
            var selectVal = picker.cols[0].value + '-' + picker.cols[1].value+ '-' + currentValue+ ' ' + picker.cols[4].value+ ':' + picker.cols[6].value;
            
            var selectValTime = new Date(selectVal.replace(new RegExp("-","gm"),"/")).getTime();
            var getminTime = new Date(picker.params.minDateTime.replace(new RegExp("-","gm"),"/")).getTime();
            var getmaxTime = new Date(picker.params.maxDateTime.replace(new RegExp("-","gm"),"/")).getTime();
            
            if(selectValTime < getminTime){
           	    picker.cols[0].setValue(picker.params.minDateTime.split(' ')[0].split('-')[0]);
           	    picker.cols[1].setValue(picker.params.minDateTime.split(' ')[0].split('-')[1]);
           	    picker.cols[2].setValue(picker.params.minDateTime.split(' ')[0].split('-')[2]);
           	    picker.cols[4].setValue(picker.params.minDateTime.split(' ')[1].split(':')[0]);
           	    picker.cols[6].setValue(picker.params.minDateTime.split(' ')[1].split(':')[1]);
           	    selectVal = picker.params.minDateTime;
            }
            if(selectValTime > getmaxTime){
            	 picker.cols[0].setValue(picker.params.maxDateTime.split(' ')[0].split('-')[0]);
            	 picker.cols[1].setValue(picker.params.maxDateTime.split(' ')[0].split('-')[1]);
            	 picker.cols[2].setValue(picker.params.maxDateTime.split(' ')[0].split('-')[2]);
            	 picker.cols[4].setValue(picker.params.maxDateTime.split(' ')[1].split(':')[0]);
            	 picker.cols[6].setValue(picker.params.maxDateTime.split(' ')[1].split(':')[1]);
            	 selectVal = picker.params.maxDateTime;
            }
            if(picker.params.change){
            	picker.params.change(selectVal);
            }
            
        },

        formatValue: function (p, values, displayValues) {
            return displayValues[0] + '-' + values[1] + '-' + values[2] + ' ' + values[3] + ':' + values[4];
        },

        cols: []
    };

    $.fn.dateAndTimePicker = function(params) {
        return this.each(function() {
        	
            if(!this) return;
            var defaultsCopy = $.extend(true, {}, defaults);
            var p = $.extend(defaultsCopy, params);
            
            p.cssClass = 'customized-dateAndTimePicker';
       
            p.cols = [
                      // Years
                      {
                          values: initYears(p.minDateTime, p.maxDateTime)
                      },
                      // Months
                      {
                          values: initMonthes
                      },
                      // Days
                      {
                          values: getDays()
                      },

                      // Space divider
                      {
                          divider: true,
                          content: '  '
                      },
                      // Hours
                      {
                          values: (function () {
                              var arr = [];
                              for (var i = 0; i <= 23; i++) { arr.push(i < 10 ? '0' + i : i); }
                              return arr;
                          })(),
                      },
                      // Divider
                      {
                          divider: true,
                          content: ':'
                      },
                      // Minutes
                      {
                          values: (function () {
                              var arr = [];
                              for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                              return arr;
                          })(),
                      }
                ];
            
            if(params.value){
            	var dateTime = params.value.split(' ');
            	p.value = [dateTime[0].split('-')[0], dateTime[0].split('-')[1], dateTime[0].split('-')[2], dateTime[1].split(':')[0], dateTime[1].split(':')[1]];
            }
            
            $(this).picker(p);
            if (params.value) $(this).val(p.formatValue(p, p.value, p.value));
        });
    };

}(Zepto);

