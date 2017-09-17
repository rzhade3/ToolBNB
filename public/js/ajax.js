$(document).on('click', 'a', function() {
    var nextId = "l" + this.id;
    $('.hid').hide();
    $('.' + nextId).show();
});