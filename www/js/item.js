var item = (function () {

    var focusId = null;
    var order = null;
    var params = document.forms[0].elements;
    var vendors = {};

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
        var vs = db.getVendors();
        vendors = {};
        $('#vendorsList').empty();
        for (var i in vs) {
            vendors[vs[i].name] = vs[i].phone;
            $('#vendorsList').append('<option value="' + vs[i].name + '">');
        }
    }

    var loadItem = function (index) {
        focusId = index;
        order = db.getItem(index);
        // status
        $('#item .status').html(control.statusDisp(order.status, true));
        // sms button        
        if (order.status == 2) {
            var validphone = new RegExp("^05[0-9]{8}$");
            var validByphone = validphone.test(order.byPhone) ? order.byPhone : null;
            var validVendorPhone = validphone.test(order.vendorPhone) ? order.vendorPhone : null;
            if (validByphone || validVendorPhone) {
                $('<button type="button" class="btn btn-primary pull-right glyphicon glyphicon-phone"></button>')
                    .on('click', function () {
                        sms.open(validVendorPhone, validByphone);
                        control.page('sms');
                    })
                    .appendTo('#item .status');
            }
        }
        // vendor
        $('#item .vendorName').html(order.vendorName);
        $('#item .vendorPhone').html('<a href="tel:' + order.vendorPhone + '">' + order.vendorPhone + '</a>');
        // time
        $('#item .time').html(order.time);
        // address   
        $('#item .address').html('<a href="https://waze.com/ul?q=' + encodeURIComponent(order.address) + '">' + order.address + '</a>');
        // by
        if (order.byName == '' && order.byPhone == '') {
            $('#item .byName').html('אין פרטים');
        } else {
            $('#item .byName').html(order.byName);
            $('#item .byPhone').html('<a href="tel:' + order.byPhone + '">' + order.byPhone + '</a>');
        }
        // to
        if (order.toName == '' && order.toPhone == '') {
            $('#item .toName').html('אין פרטים');
        } else {
            $('#item .toName').html(order.toName);
            $('#item .toPhone').html('<a href="tel:' + order.toPhone + '">' + order.toPhone + '</a>');
        }
        // details
        if (order.details != '') {
            $('#item .details').html(order.details.replace(/\n/g, '<br>'));
        } else {
            $('#item .details').html('אין');
        }
        // history
        if (order.history && order.history.length > 0) {
            var buff = '';
            for (var i = 0; i < order.history.length; i++) {
                buff += '<li><i>' + order.history[i].time + '</i> ' + order.history[i].text + '</li>';
            }
            $('#item .history ul').html(buff);
            $('#item .history').show();
        } else {
            $('#item .history').hide();
        }
    }

    var setEditVals = function () {
        setVendors();
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
        $('#item .history').hide();
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
            details: params.details.value,
            history: order.history ? order.history : []
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
        // if (o.byPhone == '') {
        //     e = true;
        //     $(params.byPhone).addClass('error');
        // }
        // if (o.toPhone == '') {
        //     e = true;
        //     $(params.toPhone).addClass('error');
        // }
        if (e) {
            control.toast('נא להשלים את כל הפרטים',true);
        } else {
            control.toast('פרטים נשמרו');
            if (focusId === null) {
                focusId = +new Date();
                o.history.push({
                    time: historyTime(),
                    text: control.statusDisp(o.status, true)
                });
            } else if (order.status != o.status) {
                o.history.push({
                    time: historyTime(),
                    text: control.statusDisp(o.status, true)
                });
            }
            db.saveItem(focusId, o);
            db.addVendor(o.vendorName, o.vendorPhone, undefined === vendors[o.vendorName]);
            loadItem(focusId);
            setVendors();
            list.reloadList();
        }
        return !e;
    }

    var historySmsAdd = function (recipients) {
        order.history.push({
            time: historyTime(),
            text: 'SMS נשלח ל' + recipients.join(' + ')
        });
        loadItem(focusId);
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

    var historyTime = function () {
        var dt = new Date();
        var day = dt.getDate(),
            mnth = dt.getMonth() + 1,
            hr = dt.getHours(),
            mn = dt.getMinutes();
        if (hr < 10) hr = '0' + hr;
        if (mn < 10) mn = '0' + mn;
        return hr + ':' + mn + ' ' + day + '/' + mnth;
    }

    init();

    return { // interface
        loadItem: loadItem,
        saveItem: saveItem,
        setEditVals: setEditVals,
        newItem: newItem,
        historySmsAdd: historySmsAdd
    };

})();