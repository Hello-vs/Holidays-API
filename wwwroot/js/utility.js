

function TrimString(selector) {

    if ($(selector).val() != 'undefined') {
        let str = $(selector).val();
        $(selector).val(str.trim());
    }
}




