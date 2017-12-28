var item = (function () {

    var focusId = null;
    var order = null;
    var params = document.forms[0].elements;

    var init = function () {
        setEvents();
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
    }

    var loadItem = function (index) {
        focusId = index;
        order = db.getItem(index);
        // status
        $('#item .status').html(control.statusDisp(order.status, true));
        // vendor
        $('#item .vendor').html(order.vendor);
        // time
        $('#item .time').html(order.time);
        // address
        $('#item .address').html(order.address);
        // by
        $('#item .byName').html(order.byName);
        $('#item .byPhone').html(order.byPhone);
        // to
        $('#item .toName').html(order.toName);
        $('#item .toPhone').html(order.toPhone);
        // details        
        $('#item .details').html(order.details.replace(/\n/g, '<br>'));
    }

    var setEditVals = function () {
        var t;
        // status        
        $('#item button[data-st]').removeClass('btn-warning').addClass('btn-default');
        $('#item button[data-st="' + order.status + '"').removeClass('btn-default').addClass('btn-warning');
        params.status.value = order.status;
        // vendor
        params.vendor.value = order.vendor;
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
            vendor: params.vendor.value.trim(),
            time: params.hour.value + ':' + params.minute.value,
            address: params.address.value.trim(),
            byName: params.byName.value.trim(),
            byPhone: params.byPhone.value.trim(),
            toName: params.toName.value.trim(),
            toPhone: params.toPhone.value.trim(),
            details: params.details.value
        }
        var e = false;
        if (o.vendor == '') {
            e = true;
            $(params.vendor).addClass('error');
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
            loadItem(focusId);
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
            vendor: '',
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