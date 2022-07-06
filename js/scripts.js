function getPrice(parentBlock) {
  payTable = parentBlock.find(".table");
  tableRow = payTable.find(".table_row");  
  price = 0;
  tableRow.each(function() {
    filterCheckbox = $(this).find(".ch_childrens input");
    if(filterCheckbox.is(":checked")) {
      radio = $(this).find(".radio input");
      radio.each(function() {
        if( $(this).is(":checked") ) {
          radioVal = parseInt($(this).val());
          console.log(radioVal);
          price += radioVal;
        }
      });
    } else {
      console.log(0);
    }
  });
  parentBlock.find(".priceVal").text(price);
}

function getIconsPostion() {
  if($("#big_chart").length > 0 ) {
    $(".big_chart_icons img").each(function() {
        iconIndex = $(this).index();
        icon = $(this);
        iconWidth = $(this).width() / 2;
        $("#big_chart svg .ct-labels foreignObject").each(function() {
          foreignObjectIndex = $(this).index();
          foreignObjectWidth = $(this).width() / 2;
          if(iconIndex == foreignObjectIndex) {
            offsetTop = $(this).offset().top + 15;
            offsetleft = $(this).offset().left + foreignObjectWidth - iconWidth;
            icon.offset({"left" : offsetleft, "top" : offsetTop});
          }
        });
      });
  }
}

function getBarsWidth() {
  if($("#chart_9").length > 0 ) {
    ctHorizontalLeftCoord1 = $("#chart_9 .ct-grid.ct-horizontal:eq(2)").offset().left;
    ctHorizontalLeftCoord2 = $("#chart_9 .ct-grid.ct-horizontal:eq(1)").offset().left;
    barWidth = parseInt( ctHorizontalLeftCoord1 - ctHorizontalLeftCoord2 - 1 );
  }
}

function getRespParams() {
  if($(".header_site").offset().top > 2) {
    $(".header_site").addClass("resp_bg");
  } else {
    $(".header_site").removeClass("resp_bg");
  }
}

function getLocPosition() {
  if($(".locRow").width() > $(".location_wrapp").width()) {
    $(".location_wrapp").addClass("rewAlign");
  } else {
    $(".location_wrapp").removeClass("rewAlign");
  }
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;


var barWidth;

$(window).resize(function() {
  bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
  getIconsPostion();
  getBarsWidth();
  getRespParams();
  getLocPosition();
  $("#chart_9 .ct-bar").attr('style', 'stroke-width: '+barWidth+'px !important');
});

$(document).scroll(function() {
  getRespParams();
});

function clearForm(popupName){
    $('#'+popupName)[0].reset();
    $('#'+popupName).find("[data-validate]").each(function(){
      if($(this).hasClass('emptyfield')){
          $(this).removeClass('emptyfield');
      }
    });
    if(popupName == "addReportForm"){
        if($("#weekSchedules")){
            $("#weekSchedules").hide();
        }
        if($("#monthSchedules")){
            $("#monthSchedules").hide();
        }
    }
    if(popupName == "popupForm_5"){
        var radioField = $('#'+popupName).find(".radios_wrapp");
        if(radioField.hasClass('emptyfield')){
             radioField.removeClass('emptyfield');
        }
        $('#'+popupName).find(".input_wrapp_select > select").each(function() {
          if($(this).hasClass('emptyfield')){
              $(this).removeClass('emptyfield');
           }
        });
        if($('#locationInput').hasClass('emptyfield')){
          $('#locationInput').removeClass('emptyfield');
        }
        if($('#locations-datalist').val() == ''){
            $('#locations-datalist').empty();
        }
    }
    if(popupName == "popupForm_6"){
      if (document.getElementById('wrongGroupName').style.display == "block") {
          document.getElementById('wrongGroupName').style.display = "none";
      }
      if($('#groupId').val() != ''){
          $('#groupId').val('');
      }
    }
    if(popupName == "popupForm_9"){
        var radioField = $('#'+popupName).find(".radios_wrapp_3");
        if(radioField.hasClass('emptyfield')){
             radioField.removeClass('emptyfield');
        }
    }
    if(popupName == "popupForm_10"){
        document.getElementById("resultForm").innerHTML = "";
    }
    if(popupName == "popupForm_11"){
      if($('#domainId').val() != ''){
          $('#domainId').val('');
      }
      if (document.getElementById('wrongDomainName').style.display == "block") {
          document.getElementById('wrongDomainName').style.display = "none";
      }
    }
    if(popupName == "popupForm_12"){
      if (document.getElementById('wrongGroupNameForDelete').style.display == "block") {
          document.getElementById('wrongGroupNameForDelete').style.display = "none";
      }
      if($('#groupIdForDelete').val() != ''){
          $('#groupIdForDelete').val('');
      }
    }
    if(popupName == "popupForm_13"){
      var nothingSelected = document.getElementById('nothingSelected');
      if ( (nothingSelected.style.display == 'block') && (nothingSelected.style.color == 'red') ) {
          nothingSelected.style.color = 'black';
      }
      if(document.getElementById('selectedElements').innerText != ''){
        if($('#'+popupName).find(".tableSettings").hasClass('emptyfield')){
             $('#'+popupName).find(".tableSettings").removeClass('emptyfield');
        }
        document.getElementById('selectedElements').innerText = '';
        nothingSelected.style.display = 'block';
      }
    }
    if(popupName == "popupForm_14"){
        var checkedElemens = [];
        $('[name = wrappForCheckbox]').each(function() {
          checkedElemens.unshift($(this).html());  
        });
        sessionStorage.setItem('checkedElemens', checkedElemens);
        var checkboxField = $('#'+popupName).find(".tableSettings");
        checkboxField.empty();
    }
    if(popupName == "popupForm_15"){
        document.getElementById('popupForm_15').setAttribute("action", "http://ranker.com/nav/deleteReport/");
        document.getElementById("nameExplanation").textContent = startContent;
    }
}
var startContent
$(document).ready(function() {
    getRespParams();
    getLocPosition();
    
    if(document.getElementById("nameExplanation")){
        startContent = document.getElementById("nameExplanation").textContent;
    }
    $(".dropdown_title").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dropdown_box");
      if(parent.hasClass("active")) {
        parent.removeClass("active");
      } else {
        $(".dropdown_box").removeClass("active");
        parent.addClass("active");
      }
    });

    $(".val").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dropdown_box");
      activeVal = parent.find(".active_val");
      parent.find(".hide_val").val($(this).html());
      activeVal.html($(this).html());
    });
    
    $('#langDropdown > .val').on("click", function(){
        window.location.href = location.origin + '/lang/' + activeVal.text().toLowerCase();
    })
    
    $(this).keydown(function(eventObject){
      if (eventObject.which == 27) {
        $(".dropdown_box").removeClass("active");
      }
    });

    $(document).on("mouseup", function(e) {
        e.preventDefault();
        hide_element = $(".dropdown_box");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0
            && hide_element.hasClass("active")) {
          hide_element.removeClass("active")
        }
    });

    // -----------

    if($(".chart_1").length > 0) {
      new Chartist.Line('.chart_1', {
        labels: [4, 5, 6, 7, 8],
        series: [
          [0, 1, 0, 1, 0]
          ]
        }, {
          fullWidth: true,
          chartPadding: {
            right: 40,
            left: -15
          },
          axisX: {
            labelInterpolationFnc: function(value, index) {
              return value + " sep";
            }
          },
          height: '80px'
      });
    }

    // ------------

    $(".ch_childrens input").on("change", function() {
      parentBlock = $(this).closest(".checkboxes_array");
      chChildrens = parentBlock.find(".ch_childrens input");
      mainCheckbox = parentBlock.find(".main_checkbox input");
      chChildrens.each(function() {
        if (!$(this).is(":checked")) {
          mainCheckbox.prop("checked", false);
          return false;
        } else {
          mainCheckbox.prop("checked", true);
        }
      });
      getPrice(parentBlock);
    });

    $(".main_checkbox input").on("change", function() {
      parentBlock = $(this).closest(".checkboxes_array");
      chChildrens = parentBlock.find(".ch_childrens input");
      if (!$(this).is(":checked")) {
        chChildrens.prop("checked", false);
      } else {
        chChildrens.prop("checked", true);
      }
    });

    // ------------

    $('.info_table').on('mouseover', '.cell', function() {
      index = $(this).index();
      parentTable = $(this).closest(".info_table");
      tableRow = parentTable.find(".table_row");
      tableRow.find(".cell").removeClass("bg");
      tableRow.find(".cell:eq("+index+")").addClass("bg");
    });

    $('.info_table').on('mouseleave', '.cell', function() {
      parentTable.find(".cell").removeClass("bg");
    });

    // ------------

    $(".show_pass").on("click", function(e) {
      e.preventDefault();
      parentBlock = $(this).closest(".input_wrapp");
      parentBlock.toggleClass("show_password");
    });

    $(".pass_back").on("keyup", function(e) {
      e.preventDefault();
      parentBlock = $(this).closest(".input_wrapp");
      passFront = parentBlock.find(".pass_front");
      passFront.val($(this).val());
    });

    $(".pass_front").on("keyup", function(e) {
      e.preventDefault();
      parentBlock = $(this).closest(".input_wrapp");
      passBack = parentBlock.find(".pass_back");
      passBack.val($(this).val());
    });

    // ------------

    if($("#chart_2").length> 0) {
      new Chartist.Line('#chart_2', {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          series: [
            [5, 9, 7, 8, 5, 3, 5, 4]
          ]
        }, {
          low: 0,
          showArea: true,
          height: '55px',
          showLine: true,
          showPoint: false,
          fullWidth: true,
          showLabel: false,
          axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0
          },
          axisY: {
            showGrid: false,
            showLabel: false,
            offset: 0
          }
        });
      }

    if($("#chart_3").length> 0) {
      new Chartist.Line('#chart_3', {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          series: [
            [5, 9, 7, 8, 5, 3, 5, 4]
          ]
        }, {
          low: 0,
          showArea: true,
          height: '55px',
          showLine: true,
          showPoint: false,
          fullWidth: true,
          showLabel: false,
          axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0
          },
          axisY: {
            showGrid: false,
            showLabel: false,
            offset: 0
          }
        });
      }

    if($("#chart_4").length> 0) {
      new Chartist.Line('#chart_4', {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          series: [
            [5, 9, 7, 8, 5, 3, 5, 4]
          ]
        }, {
          low: 0,
          showArea: true,
          height: '55px',
          showLine: true,
          showPoint: false,
          fullWidth: true,
          showLabel: false,
          axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0
          },
          axisY: {
            showGrid: false,
            showLabel: false,
            offset: 0
          }
        });
      }

      if($(".pie").length > 0) {
        window.addEventListener('DOMContentLoaded', () => {
          const circle = new CircularProgressBar('pie');
        });
      }

      if($("#chart_5").length> 0) {
        new Chartist.Line('#chart_5', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
              [5, 9, 7, 8, 5, 3, 5, 4]
            ]
          }, {
            low: 0,
            showArea: false,
            height: '35px',
            showLine: true,
            fullWidth: true,
            showLabel: false,
            axisX: {
              showGrid: false,
              showLabel: false,
              offset: 0
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            }
          });
      }

      if($("#chart_6").length> 0) {
        new Chartist.Line('#chart_6', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
              [5, 9, 7, 8, 5, 3, 5, 4]
            ]
          }, {
            low: 0,
            showArea: false,
            height: '35px',
            showLine: true,
            fullWidth: true,
            showLabel: false,
            axisX: {
              showGrid: false,
              showLabel: false,
              offset: 0
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            }
          });
      }

      if($("#chart_7").length> 0) {
        new Chartist.Line('#chart_7', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
              [5, 9, 7, 8, 5, 3, 5, 4]
            ]
          }, {
            low: 0,
            showArea: false,
            height: '35px',
            showLine: true,
            fullWidth: true,
            showLabel: false,
            axisX: {
              showGrid: false,
              showLabel: false,
              offset: 0
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            }
          });
      }

      if($("#chart_8").length> 0) {
        new Chartist.Line('#chart_8', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
              [5, 9, 7, 8, 5, 3, 5, 4]
            ]
          }, {
            low: 0,
            showArea: false,
            height: '35px',
            showLine: true,
            fullWidth: true,
            showLabel: false,
            axisX: {
              showGrid: false,
              showLabel: false,
              offset: 0
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            }
          });
      }

      // --------------

      if($("#pie_chart").length > 0) {
        new Chartist.Pie('#pie_chart', {
          series: [20, 10]
        }, {
          donut: true,
          donutWidth: 2,
          startAngle: 270,
          total: 60,
          showLabel: false
        });
      }

      // --------------

      if($("#chart_9").length > 0) {
        new Chartist.Bar('#chart_9', {
          labels: [0, 2, 4, 6, 8, 10],
          series: [
            [0, 0, 2, 2, 10, 0, 0],
            [6, 6, 6, 6, 6, 6, 6],
            [3, 3, 3, 3, 3, 3, 3]
            ]
          }, {
            fullWidth: true,
            chartPadding: {
              right: 0,
              left: 0
            },
            axisX: {
              labelInterpolationFnc: function(value, index) {
                return "Sep " + value;
              }
            },
            height: '250px',
            stackBars: true,
        }).on('created', function(data) {
          getBarsWidth();
          $("#chart_9 .ct-bar").attr('style', 'stroke-width: '+barWidth+'px !important');
        });
      }

      // ------------

      if($("#big_chart").length > 0) {

        new Chartist.Bar('#big_chart', {
          labels: ['icon1', 'icon2', 'icon3', 'icon4', 'icon5', 'icon6', 'icon7', 'icon8', 'icon9', 'icon10', 'icon11', 'icon12', 'icon13', 'icon14', 'icon15', 'icon16'],
          series: [
            [1, 10, 2, 4, 1, 10, 2, 4, 1, 10, 2, 4, 1, 10, 2, 4],
            [0, 8, 4, 3, 9, 3, 5, 1, 10, 1, 4, 5, 2, 3, 5, 7],
            [10, 3, 4, 6, 3, 7, 8, 9, 10, 4, 5, 6, 3, 5, 6, 10],
          ]
        }, {
          stackBars: true,
          height: '210px'
        }).on('draw', function(data) {
          if(data.type === 'bar') {
            data.element.attr({
              style: 'stroke-width: 40px'
            });
          }
        }).on('created', function() {
          getIconsPostion();
        });
      }

      // ----------
    var labelVal;
    $(document).on("click", "[data-popup-link]",  function(e) {
      e.preventDefault();
      popupName = $(this).attr("data-popup-link");
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      $("body").addClass("fixed");
      $("body").css({
          "position" : "fixed",
          "top" :  -$(document).scrollTop() + "px",
          "overflow" : "hidden",
          "right" : 0,
          "left" : 0,
          "bottom" : 0,
          "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup = '"+ popupName +"']").fadeIn(300);
      if(popupName == "popup_3"){
        labelVal = document.querySelector('.input_file-button-text').innerText;
      }
    });
    $(document).on("click", ".close_popup, .popup_bg", function(e) {
      e.preventDefault();
      popupName = $(this).parent().attr("id");
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").attr("style", "");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").removeClass("fixed");
      $(".popup_bg").fadeOut(300);
      $("[data-popup]").fadeOut(300);
      
      //Clear forms, remove error classes
      clearForm(popupName);   
      if(popupName == "popupForm_3"){
        document.querySelector(".input_file-button-text").innerText = labelVal;
      }   
    });
    $(this).keydown(function(eventObject){
      if (eventObject.which == 27 && $("body").hasClass("fixed")) {
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").attr("style", "");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").removeClass("fixed");
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").fadeOut(300);
        
        var forms = document.querySelectorAll(".popup");
        forms.forEach(function(elem){
            if(elem.style.display == "block"){
                var popupName = elem.querySelector("form").getAttribute('id');
                clearForm(popupName);   
                if(popupName == "popupForm_3"){
                  document.querySelector(".input_file-button-text").innerText = labelVal;
                }  
            }
        });
      }
    });
    $(document).on("mouseup", function(e) {
      if($(".popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed");
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
            
            var forms = document.querySelectorAll(".popup");
            forms.forEach(function(elem){
                if(elem.style.display == "block"){
                    var popupName = elem.querySelector("form").getAttribute('id');
                    clearForm(popupName);   
                    if(popupName == "popupForm_3"){
                      document.querySelector(".input_file-button-text").innerText = labelVal;
                    } 
                }
            });
        }        
      }
    });

    // -------------

    $(".del_btn_2, .del_btn_3").on("click", function(e) {
      parentBlock = $(this).closest(".domain_tooltip");
      parentBlock.remove();
    });

    // -------------

    $(".respmenubtn").click(function(e) {
      e.preventDefault();
      if( $("#resp_nav").is(":hidden") ) {
          $("#resp_nav").fadeIn(300);
          $(this).addClass("active");
      } else {
          $("#resp_nav").fadeOut(300);
          $(this).removeClass("active");
      }
    });

    $(".close_nav").click(function(e) {
      e.preventDefault();
      $("#resp_nav").fadeOut(300);
    });
    
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#resp_nav").is(":visible") &&
            bodyWidth <= 767) {
                $("#resp_nav").fadeOut(300);
                $(".respmenubtn").removeClass("active");
        }
    });

    // ----------------

    $(".icons_list li").on("mouseover", function() {
      tooltip = $(this).children(".icon_tooltip, .tooltip");
      h = tooltip.height();
      parent = $(this).closest(".table_10");
      parentBottomCoord = parent.offset().top + parent.height();
      tooltipBottomCoord = tooltip.offset().top + tooltip.height();
      if(tooltipBottomCoord > parentBottomCoord) {
        tooltip.addClass("topPosition");
      }
    });

    $(".icons_list li").on("mouseleave", function() {
      tooltip = $(this).children(".icon_tooltip, .tooltip");
      tooltip.removeClass("topPosition");
    });

    // --------

    $(".inpirtant_icon").on("mouseover", function() {
      tooltip = $(this).children(".tooltip");
      parent = $(this).closest(".row");
      rightParentCoord = parent.offset().left + parent.width();
      rightTooltipCoord = tooltip.offset().left + tooltip.width();
      if(rightTooltipCoord >= rightParentCoord) {
        tooltip.addClass("rightPosition");
      }
    });

    $(".inpirtant_icon").on("mouseleave", function() {
      tooltip = $(this).children(".tooltip");
      tooltip.removeClass("rightPosition");
    });

    // --------
    
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
    if(params['page']){
        
        var apply = document.getElementById('datepickerApply');
        
        apply.setAttribute("href", apply.getAttribute("href")+"&page="+params['page']);
        
        var dateStart = params['dateStart'];
        var dateEnd = params['dateEnd'];
        
        if(dateStart && dateEnd){
            apply.setAttribute("href", apply.getAttribute("href")+"&dateStart="+dateStart+"&dateEnd="+dateEnd);
        }
        
    }
    var prevPageBut = document.getElementById("prevpage");
    var nextPageBut = document.getElementById("nextpage");
    
    if(params['dateStart'] && params['dateEnd']){
        
        if(prevPageBut){     
            var href = prevPageBut.getAttribute("href");
            prevPageBut.setAttribute("href", href+"&dateStart="+params['dateStart']+"&dateEnd="+params['dateEnd']);
        }
        if(nextPageBut){
            var hrefNext = nextPageBut.getAttribute("href");
            nextPageBut.setAttribute("href", hrefNext+"&dateStart="+params['dateStart']+"&dateEnd="+params['dateEnd']);
        }
        
    }else{
        
        if(document.getElementById("p_date_start") && document.getElementById("p_date_end")){
            var dateStart = document.getElementById("p_date_start").value;
            var dateEnd = document.getElementById("p_date_end").value;
        }
        
        if(prevPageBut){
            var href = prevPageBut.getAttribute("href");
            prevPageBut.setAttribute("href", href+"&dateStart="+dateStart+"&dateEnd="+dateEnd);
        }
        if(nextPageBut){
            var hrefNext = nextPageBut.getAttribute("href");
            nextPageBut.setAttribute("href", hrefNext+"&dateStart="+dateStart+"&dateEnd="+dateEnd);
        }
        
    }
    
    document.querySelectorAll('a[data-page]').forEach(function(elem){
        if(params['page']){
            
            if(elem.dataset.page == params['page']){
                elem.classList.add('active');
            }
            
        }else{
            if(elem.dataset.page == "1"){
                elem.classList.add('active');
            }
        }
        if(params['dateStart'] && params['dateEnd']){
            var href = elem.getAttribute("href");
            elem.setAttribute("href", href+"&dateStart="+params['dateStart']+"&dateEnd="+params['dateEnd']);
        }else{
            var href = elem.getAttribute("href");
            var dateStart = document.getElementById("p_date_start").value;
            var dateEnd = document.getElementById("p_date_end").value;
            elem.setAttribute("href", href+"&dateStart="+dateStart+"&dateEnd="+dateEnd);
        }
    });

    // -----------

  $(".pill_dr").each(function() {
    drContent = $(this).find(".pill_dr_content");
    if($(this).hasClass("active")) {      
      drContent.slideDown(300);
    } else {
      drContent.slideUp(300);
    }
  });

  $(".pill_dr_title").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".pill_dr");
    sl = parent.find(".pill_dr_content");
    $(".pill_dr").each(function() {
      if($(this) != parent && $(this).hasClass("active")) {
        $(this).removeClass("active");
        sl2 = $(this).find(".pill_dr_content").slideUp(300);
      }
    });
    if(sl.is(":hidden")) {
      parent.addClass("active");
      sl.slideDown(300);
    } else {
      parent.removeClass("active");
      sl.slideUp(300);
    }
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
        $(".pill_dr_content").slideUp(300);
        $(".pill_dr_title").removeClass("active");
    }
  });

  $(document).mouseup(function(e) {
    hide_element = $(".pill_dr");
    if (!hide_element.is(e.target)
        && hide_element.has(e.target).length === 0) {
        hide_element.removeClass("active");
        hide_element.find(".pill_dr_content").slideUp(300);
      }
  });

  
    
});