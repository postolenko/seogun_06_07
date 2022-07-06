$(document).ready(function () {
    //import {localeEn} from 'locale/en.js';
    // Instead of En - var
    var localeEn = {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'dd.MM.yyyy',
        timeFormat: 'hh:mm aa',
        firstDay: 0
    };
    var localeRu = {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
        daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        today: 'Сегодня',
        clear: 'Очистить',
        dateFormat: 'dd.MM.yyyy',
        timeFormat: 'HH:mm',
        firstDay: 1
    }
    var lang;
     document.getElementById('lang').addEventListener('change', function() {
        //console.log('changed');
        lang = document.getElementById('lang').getAttribute('data-lang');
    });
    lang = document.getElementById('lang').getAttribute('data-lang');
    if(lang.toLowerCase() == "ru"){
        var locale = localeRu;
    }else{
        var locale = localeEn;
    }
    var params = window
    .location
    .search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );
    
    if(!params['dateStart'] && !params['dateEnd']){
        var rangeTo = new Date(); 
        var rangeFrom = new Date();
        rangeFrom.setDate(rangeTo.getDate() - 7);
    }else{
        var splitedEnd = params['dateEnd'].split('-');
        var splitedStart = params['dateStart'].split('-');
        var monthEnd = Number(splitedEnd[1])-1;
        var monthStart = Number(splitedStart[1])-1;
        var rangeTo = new Date(splitedEnd[0], monthEnd, splitedEnd[2]); 
        var rangeFrom = new Date(splitedStart[0], monthStart, splitedStart[2]);
    }
    
    new AirDatepicker('#datepickerRange', {
        range: true,
        multipleDatesSeparator: ' - ',
        position: 'bottom right',
        inline: true,
        locale: locale,
        selectedDates: [rangeFrom, rangeTo],
        onSelect: function(date) {
          if(date.formattedDate.length == 0){
            var rangeTo = new Date(); 
            var rangeFrom = new Date();
            rangeFrom.setDate(rangeTo.getDate() - 7);
            
            var monthEnd = Number(rangeTo.getMonth())+1;
            var monthStart = Number(rangeFrom.getMonth())+1;
            
            $('#p_date').text(rangeFrom.getFullYear()+'-'+monthStart+'-'+rangeFrom.getDate()+' - '+rangeTo.getFullYear()+'-'+monthEnd+'-'+rangeTo.getDate());
            return false;
          }
          var str = $("#datepickerRange").val();
          var result = str.replace(/[\.\/]/g,'-');
          $("#datepickerRange").attr("value", result);
          let arr = date.formattedDate[0].split('.');
          let stat = arr[2] + '-' + arr[1] + '-' + arr[0];
          $("[name=dateStart]").attr("value", stat);
          if(date.formattedDate[1]){
            let arr = date.formattedDate[1].split('.');
            let end = arr[2] + '-' + arr[1] + '-' + arr[0];
            $("[name=dateEnd]").attr("value", end);
          }else{
            $("[name=dateEnd]").attr("value", '');
          }
          if($("[name=dateEnd]").attr("value")){
             $("#p_date").text($("[name=dateStart]").attr("value")+' - '+$("[name=dateEnd]").attr("value"));   
          }else{
              $("#p_date").text($("[name=dateStart]").attr("value"));
          }
          
        }
    });
     
});