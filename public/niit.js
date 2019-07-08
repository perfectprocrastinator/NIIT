//console.log("script connected");

$(function() {
    $('input[name="date"]').daterangepicker({
        maxDate: moment().endOf("day"),
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'),10)
    }, function(start, end, label) {
        //console.log(start.format('DD-MM-YYYY'));
        // var years = moment().diff(start, 'years');
        // alert("You are " + years + " years old!");
    });
});