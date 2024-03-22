
window.onload = InitPage;

function InitPage() { 

    $('#txtCountryCode').on('blur', function (e) {
        TrimString('#txtCountryCode');
        let result = $('#txtCountryCode').val();
        if ($('#txtCountryCode').val() === '') {
            $('#errMsg').addClass('error-message');
            $('#txtCountryCode').addClass('error-highlight');
            $('#errMsg').html("Must not be blank");
            e.preventDefault();
        }
        else {
            $('#errMsg').removeClass('error-message');
            $('#txtCountryCode').removeClass('error-highlight');
        }
    }).trigger('blur');

    console.log('In Site.js')
}