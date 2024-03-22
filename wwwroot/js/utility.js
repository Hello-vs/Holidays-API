function createRequest() {
    let request = new XMLHttpRequest();
    return request;
}

function ajaxCall(url) {
    let request = createRequest();
    if (request == null) {
        console.log("Unable to create request");
        return;
    }

    request.onreadystatechange = reloadRenderBody;
    request.open("GET", url, true);
    request.send(null);

    function reloadRenderBody() {
        if (request.readyState == 4) {
            console.log(request.readyState);
            if (request.status == 200) {
                querySelector('container body-content').innerHTML = request.responseText;
            }
        }
    }
}

function LookUpMonthEnd(month, day) {

    getMaxDay = {};
    getMaxDay['02'] = "28";
    getMaxDay['04'] = "30";
    getMaxDay['06'] = "30";
    getMaxDay['09'] = "30";
    getMaxDay['11'] = "30";

    limit = getMaxDay[month];
    if (typeof limit === "undefined") {
        if (day > limit) { day = 31; } 
    }
    else {
        if (day > limit) { day = limit; }
    }

    return day;
}

function DateHandler(selector, event, monthBegEnd, dayBegEnd, isValid, dateType) {

    const regDate = new RegExp('\\d{1,2}(\\/|\\-)\\d{1,2}(\\/|\\-)\\d{4}');
    const regYear = new RegExp('^(19|20)\\d{2}$');

    let date = $(selector).val();
    let len = $(selector).val().length;
    let spr = " ";
    if (date.indexOf('-') != -1) { spr = '-'; }
    if (date.indexOf('/') != -1) { spr = '/'; }
    let dateArray = $(selector).val().split(spr);
    let revisedDate = "";

    let month = dateArray[0] < 13 ? dateArray[0] : monthBegEnd;
    let day =  dateArray[1] < 32 ? dateArray[1] : dayBegEnd;  
    let year = dateArray[2];

    if (len >= 8) {

        isValid = isValid && regDate.test(date);
        if (isValid) {

            day =
                LookUpMonthEnd(month, day);
            revisedDate = month + '/' + day + '/' + year;
        };

    } else if (len >= 5 && len <= 7) {

        if (dateArray[0] != "undefined") {
            year = dateArray[0];
        }

        if (typeof dateArray[1] != "undefined") {
            year = dateArray[1];
        }     
        isValid = isValid && regYear.test(year);
        if (isValid) {
            
            if (dateArray[0] < 13 ? true : false) {
                day = LookUpMonthEnd(month, day);
                revisedDate = month + '/' + day + '/' + year;
            };
        };

    } else if (len === 4) {

        year = dateArray[0];
        isValid = regYear.test(year);
        if (isValid) {
            revisedDate = month + '/' + day + '/' + year;
        }

    } else if (len >= 1 && len <= 2) {

        let currentYear = "";
        let currentDay = "";
       
        if (month <= 12 ? true : false) {
            currentYear = (new Date).getFullYear();
            currentDay = LookUpMonthEnd(month, dayBegEnd);
            revisedDate = month + '/' + currentDay + '/' + currentYear;
        };
    };

    if (typeof revisedDate != "undefined") {
        $(selector).datepicker("setDate", revisedDate)
        date = revisedDate;
    }; 

    let parseDate = Date.parse(date);
    if (isNaN(parseDate) || !isValid) {
        isValid = false;
    };   

        return isValid;
    }

function DatePickerHandler(selectedValue, datepickerInput, datepickerRange) {
    
    let order = selectedValue.toUpperCase();

    if (order.indexOf("DATE") != -1) {

        $(function () {
            $(datepickerInput).datepicker();
            $(datepickerRange).datepicker();
            $(' .ui-datepicker-trigger ').attr('style', 'display:inline');
            $(' .ui-datepicker-append ').attr('style', 'display:inline');
        });
    }
    else {

        $(function () {
            $(datepickerInput).datepicker("destroy");
            $(datepickerRange).datepicker("destroy");
            $(' .ui-datepicker-trigger ').hide();
            $(' .ui-datepicker-append ').hide();     
        });
    }
}

function ApplyCurrency(selector) {

    $(selector).each(function () {

        var item = $(this).text();
        var num = Number(item).toLocaleString('en');

        if (Number(item) < 0) {
            num = num.replace('-', '');
            $(this).addClass('negMoney');
        } else {
            $(this).addClass('enMoney');
        }

        $(this).text(num);
    });
}

function TrimString(selector) {

    if ($(selector).val() != 'undefined') {
        let str = $(selector).val();
        $(selector).val(str.trim());
    }
}

function ToggleDisplay(_target, selector1, selector2, text1, text2) {

    if (selector1 != 'undefined') {
        var isHidden = $(selector1).hasClass('hideInfo');
    }
        
    if (isHidden) {
        if (typeof _target != 'undefined') {
            $(_target).val(text1);
        }

        if (selector1 != 'undefined') {
            $(selector1).removeClass("hideInfo");
            $(selector1).addClass('showInfo');
        }
        if (selector2 != 'undefined') {
            $(selector2).removeClass("hideInfo");
            $(selector2).addClass('showInfo');
        }
    }
    else {
        if (typeof _target != 'undefined') {
            $(_target).val(text2);
        }
        if (selector1 != 'undefined') {
            $(selector1).removeClass("showInfo");
            $(selector1).addClass('hideInfo');
        }
        if (selector2 != 'undefined') {
            $(selector2).removeClass("showInfo");
            $(selector2).addClass('hideInfo');
        }
    }
}


