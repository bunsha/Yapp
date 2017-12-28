//$(function () {

var $ordersCtr = $('#list');
var orders = {
    1: {
        status: 0,
        vendor: "פרחי משה",
        time: "12:00",
        address: "הרצל 20, רחובות",
        byName: "חיים לוי",
        byPhone: "021-1231234",
        toName: "מלכה לוי",
        toPhone: "085-7415265",
        details: "דגכ שדגכ  כד שגכ כע י ס הבז ג כש11\nגכ דגכע דגכ עדג כע ע חל כח ש כע יגכ עי  כעי גכ עי"
    },
    2: {
        status: 1,
        vendor: "חיים ופרחיו",
        time: "13:00",
        address: "מרכז ספיר 5, ירושלים",
        byName: "ציון בללי",
        byPhone: "052-7895478",
        toName: "שלומית הכהן",
        toPhone: "047-4524157",
        details: "ףךל  ילח כ טא  רק יבי בי  חל מח ך חפ םןפ  ן י יו ון י ןוי\nלכגחילחי לחגכ ילחגכ ישדלגכ"
    },
    3: {
        status: 1,
        vendor: "מתנות בעמ",
        time: "13:00",
        address: "ארלוזורוב 10, רחובות",
        byName: "ירחמיאל זוכמאייר",
        byPhone: "059-7862415",
        toName: "ציפה לאה",
        toPhone: "047-7418526",
        details: "בס הנבנ הב סנ בה נב ה דגכ דגכ\nכדשג ככ גד דגכ דג כ דגכ דג כ דג כ דשגכ ד גכ דג כשד גכ"
    },
    4: {
        status: 2,
        vendor: "חיים ופרחיו",
        time: "13:30",
        address: "פלטין נפתלי 12, ראשון לציון",
        byName: "אלון גרונבאום",
        byPhone: "077-7894568",
        toName: "ליאת גרונבאום",
        toPhone: "065-5478585",
        details: "גע דגכ ע גדכע דגכ ע דגכ ע דגכ עד גכע דג כע דגכ ע גכ עדגכ ע דגכ ע דגכע גכד עגכ \nדגכ שדגכ דש גכ דשג כד שגכ שדג כ דג כ"
    }
}

function showOrders() {
    for (var i in orders) {
        $ordersCtr.append(
            `
<div class="row item st${orders[i].status}" data-id="${i}">
<div class="col-sm-12 col-md-12">
    <div class="row">
        <div class="myHandle col-xs-2 col-sm-2" style="text-align:center;">
            ${orders[i].time}<br><span class="glyphicon glyphicon-${statusDisp(orders[i].status)}"></span>
        </div>
        <div class="itemInfo col-xs-10 col-sm-10">
            ${orders[i].address}<span>${orders[i].vendor}</span>
        </div>
    </div>
</div>
</div>
    `
        );
    }
}

function statusDisp(s, full) {
    switch (s) {
        case 0:
            return full ? '<span class="glyphicon glyphicon-time"></span> הוזמן' : 'time';
        case 1:
            return full ? '<span class="glyphicon glyphicon-flash"></span> בתהליך' : 'flash';
        case 2:
            return full ? '<span class="glyphicon glyphicon-ok"></span> נשלח' : 'ok';
        default:
            return full ? '<span class="glyphicon glyphicon-question-sign"></span> שגיאה' : 'question-sign';
    }
}

function loadItem(index) {
    var o = orders[index];
    var params = document.forms[0].elements;
    console.log(params);
    var t;
    // status
    $('#item button[data-st]').removeClass('btn-warning').addClass('btn-default');
    $('#item button[data-st="' + o.status + '"').removeClass('btn-default').addClass('btn-warning');
    $('#item .status').html(statusDisp(o.status, true));
    params.status.value = o.status;
    // vendor
    $('#item .vendor').html(o.vendor);
    params.vendor.value = o.vendor;
    // time
    $('#item .time').html(o.time);
    t = o.time.split(':');
    console.log(t);
    params.hour.value = t[0];
    params.minute.value = t[1];
    // address
    $('#item .address').html(o.address);
    params.address.value = o.address;
    // by
    $('#item .byName').html(o.byName);
    params.byName.value = o.byName;
    $('#item .byPhone').html(o.byPhone);
    params.byPhone.value = o.byPhone;
    // to
    $('#item .toName').html(o.toName);
    params.toName.value = o.toName;
    $('#item .toPhone').html(o.toPhone);
    params.toPhone.value = o.toPhone;
    // details        
    $('#item .details').html(o.details.replace(/\n/g, '<br>'));
    params.details.value = o.details;
}

function saveItem(index) {
    var o = orders[index];
    var params = document.forms[0].elements;
    //console.log(params);
    var t;
    // status
    console.log(params.status.value);
    o.status = Number(params.status.value);
    $('#item .status').html(statusDisp(o.status, true));
    // vendor
    o.vendor = params.vendor.value;
    $('#item .vendor').html(o.vendor);
    // time
    o.time = params.hour.value + ':' + params.minute.value;
    $('#item .time').html(o.time);
    // address
    o.address = params.address.value;
    $('#item .address').html(o.address);
    // by
    o.byName = params.byName.value;
    $('#item .byName').html(o.byName);
    o.byPhone = params.byPhone.value;
    $('#item .byPhone').html(o.byPhone);
    // to
    o.toName = params.toName.value;
    $('#item .toName').html(o.toName);
    o.toPhone = params.toPhone.value;
    $('#item .toPhone').html(o.toPhone);
    // details        
    o.details = params.details.value;
    $('#item .details').html(o.details.replace(/\n/g, '<br>'));
}

// 1 - set pages offset from menu
$('#pages').css({
    "top": $('#menu').outerHeight() + "px",
    "height": "calc( 100vh - " + $('#menu').outerHeight() + "px )"
}).show();

// 2 - menu items

$('#menu > .list > div > button').on('click', function () {
    var st = 'st' + $(this).data('st');
    if ($ordersCtr.is('.' + st)) {
        console.log('hide status ', st);
        $ordersCtr.removeClass(st);
        $(this).removeClass('btn-warning').addClass('btn-default');
    } else {
        console.log('show status ', st);
        $ordersCtr.addClass(st);
        $(this).removeClass('btn-default').addClass('btn-warning');
    }
});

$('#menu > .list > button').on('click', function () {
    console.log('click add');
});

$('#menu > .item > .save').on('click', function () {
    if ($('#item').is('.editing')) {
        console.log('click save, saving');
        saveItem($('#item').data('id'));
    } else {
        console.log('click save, opening to edit');
    }
    $('#item').toggleClass('editing');
});

$('#menu > .item > .back').on('click', function () {
    $('body').toggleClass('item');
});

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

// 3 - dump all orders

for (i = 0; i < 20; i++)
    showOrders();
// 4 - sortable 

$ordersCtr.sortable({
    handle: '.myHandle',
    placeholder: "ui-state-highlight",
    axis: 'y',
    update: function () {
        //var $listItem = $(elem),
        //newIndex = $listItem.index();
    },
    start: function (e, ui) {
        $(".ui-state-highlight").height(ui.item.outerHeight());
    }
}).on('click', function (e) {
    var i = $(e.target).closest('.item').data('id');
    console.log(i);
    $('#item').data('id', i);
    loadItem(i);
    $('body').toggleClass('item');
});

//});