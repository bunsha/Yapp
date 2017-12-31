var item = (function () {

    var focusId = null;
    var order = null;
    var params = document.forms[0].elements;
    var vendors;

    var init = function () {
        setEvents();
        setVendors();

    }

    var setEvents = function () {
        $('#item button[data-st]').on('click', function () {
            var v = $(this).data('st');
            var p = document.forms[0].elements.status;
            if (p.value != v) {
                p.value = v;
                $(this)
                    .removeClass('btn-default')
                    .addClass('btn-warning')
                    .siblings('.btn-warning')
                    .removeClass('btn-warning')
                    .addClass('btn-default');
            }
        });
        $(params.vendorName).on('input', function () {
            if (vendors[params.vendorName.value]) {
                params.vendorPhone.value = vendors[params.vendorName.value];
            }
        });
        $(params).on('focus', function () {
            $(this).removeClass('error');
        });
    }

    var setVendors = function () {
        vendors = db.getVendors();
        $('#vendorsList').empty();
        for (var i in vendors) {
            $('#vendorsList').append('<option value="' + i + '">');
        }
    }

    var loadItem = function (index) {
        focusId = index;
        order = db.getItem(index);
        // status
        $('#item .status').html(control.statusDisp(order.status, true));
        // vendor
        $('#item .vendorName').html(order.vendorName);
        $('#item .vendorPhone').html('<a href="tel:' + order.vendorPhone + '">' + order.vendorPhone + '</a>');
        // time
        $('#item .time').html(order.time);
        // address   
        $('#item .address').html('<a href="https://waze.com/ul?q=' + encodeURIComponent(order.address) + '">' + order.address + '</a>');
        // by
        $('#item .byName').html(order.byName);
        $('#item .byPhone').html('<a href="tel:' + order.byPhone + '">' + order.byPhone + '</a>');
        // to
        $('#item .toName').html(order.toName);
        $('#item .toPhone').html('<a href="tel:' + order.toPhone + '">' + order.toPhone + '</a>');
        // details        
        $('#item .details').html(order.details.replace(/\n/g, '<br>'));
    }

    var setEditVals = function () {
        $(params).removeClass('error');
        var t;
        // status        
        $('#item button[data-st]').removeClass('btn-warning').addClass('btn-default');
        $('#item button[data-st="' + order.status + '"').removeClass('btn-default').addClass('btn-warning');
        params.status.value = order.status;
        // vendor
        params.vendorName.value = order.vendorName;
        params.vendorPhone.value = order.vendorPhone;
        // time
        t = order.time.split(':');
        params.hour.value = t[0];
        params.minute.value = t[1];
        // address
        params.address.value = order.address;
        // by
        params.byName.value = order.byName;
        params.byPhone.value = order.byPhone;
        // to
        params.toName.value = order.toName;
        params.toPhone.value = order.toPhone;
        // details        
        params.details.value = order.details;
    }

    var saveItem = function () {
        $(params).removeClass('error');
        var o = {
            status: Number(params.status.value),
            vendorName: params.vendorName.value.trim(),
            vendorPhone: params.vendorPhone.value.trim(),
            time: params.hour.value + ':' + params.minute.value,
            address: params.address.value.trim(),
            byName: params.byName.value.trim(),
            byPhone: params.byPhone.value.trim(),
            toName: params.toName.value.trim(),
            toPhone: params.toPhone.value.trim(),
            details: params.details.value
        }
        var e = false;
        if (o.vendorName == '') {
            e = true;
            $(params.vendorName).addClass('error');
        }
        if (o.address == '') {
            e = true;
            $(params.address).addClass('error');
        }
        if (o.byPhone == '') {
            e = true;
            $(params.byPhone).addClass('error');
        }
        if (o.toPhone == '') {
            e = true;
            $(params.toPhone).addClass('error');
        }
        if (e) {
            control.toast('נא להשלים את כל הפרטים');
        } else {
            control.toast('פרטים נשמרו');
            if (focusId === null) {
                focusId = +new Date();
            }
            db.saveItem(focusId, o);
            db.addVendor(o.vendorName, o.vendorPhone);
            loadItem(focusId);
            setVendors();
            list.reloadList();
        }
        return !e;
    }

    var newItem = function () {
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        m = Math.ceil(m / 15) * 15;
        if (m == 60) {
            m = 0;
            h++;
        }
        order = {
            status: 0,
            vendorName: '',
            vendorPhone: '',
            time: (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m,
            address: '',
            byName: '',
            byPhone: '',
            toName: '',
            toPhone: '',
            details: ''
        }
        focusId = null;
        setEditVals();
    }

    var creating = function () {
        return focusId === null;
    }

    init();

    return { // interface
        loadItem: loadItem,
        saveItem: saveItem,
        setEditVals: setEditVals,
        newItem: newItem,
        creating: creating
    };

})();