var control = (function () {

    var toastTime;

    var init = function () {
        setEvents();
        list.showOrders();
        // initial filter status
        $('#filters > div > .default').click();
    };

    var setEvents = function () {
        // 1 - set pages offset from menu
        $('#pages').css({
            "top": $('#menu').outerHeight() + "px",
            "height": "calc( 100vh - " + $('#menu').outerHeight() + "px )"
        }).show();
        // 2 - menu items
        $('#filters > div > button').on('click', function () {
            list.filter($(this).data('st'));
            $(this).toggleClass('btn-warning').toggleClass('btn-basic');
            list.checkBlank();
        });
        $('#menu > .list > button').on('click', function () {
            //console.log('click add');
            item.newItem();
            $('body').toggleClass('item editing');
        });
        $('#menu > .item > .edit').on('click', function () {
            //console.log('clicked top edit');
            item.setEditVals();
            $('body').toggleClass('editing');
        });
        $('#menu > .item > .save').on('click', function () {
            //console.log('clicked top save');  
            if(item.saveItem()) {
                $('body').toggleClass('editing');
            }
        });
        $('#menu > .item > .back').on('click', function () {
            //console.log('clicked top back');  
            if($('body').is('.editing')) {
                //console.log('creating',item.creating());
                $('body').toggleClass('editing');
                if(item.creating()) {
                    $('body').toggleClass('item');
                    list.checkBlank();
                }
            }
            else {
                $('body').toggleClass('item');
                list.checkBlank();
            }
        });
        // toast
        $('#toast > span').on('click',function() {
            clearTimeout(toastTime);
            $('#toast').removeClass('on');
        });
    };

    var statusDisp = function (s, full) {
        switch (s) {
            case 0:
                return full ? '<span class="glyphicon glyphicon-time"></span> הוזמן' : 'time';
            case 1:
                return full ? '<span class="glyphicon glyphicon-flash"></span> בתהליך' : 'flash';
            case 2:
                return full ? '<span class="glyphicon glyphicon-ok"></span> נשלח' : 'ok';
            case 3:
                return full ? '<span class="glyphicon glyphicon-remove-circle"></span> בוטל' : 'remove-circle';
            default:
                return full ? '<span class="glyphicon glyphicon-question-sign"></span> שגיאה' : 'question-sign';
        }
    }

    var deliveryTotals = function (tot) {
        //console.log(tot);
        $('#filters > div > button').each(function (i, o) {
            $(this).html('<i>' + tot[i] + '</i>');
        });
    }

    var toast = function(text) {
        $('#toast span').html(text);
        $('#toast').addClass('on');
        toastTime = setTimeout( function() {
            $('#toast').removeClass('on');
        },2500);
    }

    return { // interface
        deliveryTotals: deliveryTotals,
        statusDisp: statusDisp,
        run: init,
        toast: toast
    };

})();