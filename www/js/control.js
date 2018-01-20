var control = (function () {

    var toastTime;
    var listItemObj;
    var backtoitem;

    var init = function () {
        showPage('list');
        setEvents();
        list.showOrders();
        // initial filter status
        $('#filters > div > .default').click();
    };

    var setEvents = function () {
        // set pages offset from top bar
        var offsettop = $('#menu').height();// + $('#logo').height();
        $('#pages').css({
            "top": offsettop + "px",
            "height": "calc( 100vh - " + offsettop + "px )"
        }).show();
        // list page > click add
        $('#menu > .list > .add').on('click', function () {
            item.newItem();
            $('#item').scrollTop(0);
            showPage('editing');
        });
        // list page > click setting
        $('#menu > .list > .setting').on('click', function () {
            setSettingPage();
            showPage('setting');
        });
        // item edit
        $('#menu > .item > .edit').on('click', function () {
            $('#item').scrollTop(0);
            item.setEditVals();
            showPage('editing', true);
        });
        // item save
        $('#menu > .item > .save').on('click', function () {
            $('#item').scrollTop(0);
            if (item.saveItem()) {
                showPage('item');
            }
        });
        // item back
        $('#menu > .item > .back').on('click', function () {
            showPage(backtoitem ? 'item' : 'list');
        });
        // sms back 
        $('#menu > .sms > .back').on('click', function () {
            showPage('item');
        });
        // sms send 
        $('#menu > .sms > .send').on('click', function () {
            sms.send();
        }); 
        // setting back
        $('#menu > .setting > .back').on('click', function () {
            showPage('list');
        });
        // bottom filter
        $('#filters > div > button').on('click', function () {
            list.filter($(this).data('st'));
            $(this).toggleClass('btn-warning').toggleClass('btn-basic');
            list.checkBlank();
        });
        // toast
        $('#toast > span').on('click', function () {
            clearTimeout(toastTime);
            $('#toast').removeClass('on persist');
        });
    };

    var showPage = function (page, isbacktoitem) {
        backtoitem = isbacktoitem ? true : false;
        switch (page) {
            case 'list':
                list.checkBlank();
            case 'sms':
            case 'setting':
            case 'item':
                $('body').attr('class', page);
                curpage = page;
                break;
            case 'editing':
                $('body').attr('class', 'item editing');
                curpage = page;
                break;
            default:
                alert('error unknow page ' + page)
        }
    }

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
        $('#filters > div > button').each(function (i, o) {
            $(this).html('<i>' + tot[i] + '</i>');
        });
    }

    var toast = function (text,closeBtn) {
        clearTimeout(toastTime);
        if(closeBtn===true) {
            $('#toast').addClass('persist');
            text += '<br><span>סגור</span>';
        }
        else {
            toastTime = setTimeout(function () {
                $('#toast').removeClass('on');
            }, 2500);
        }
        $('#toast span').html(text);
        $('#toast').addClass('on');
    }

    var setSettingPage = function () {
        var vendors = db.getVendors();
        var msgs = db.getMsgs();
        var $v = $('#setting .vendors');
        var $m = $('#setting .msgs');
        var totvendors = vendors.length;
        var totmsgs = msgs.length;
        var i;
        $v.empty();
        if (!totvendors) {
            $v.append('<li>אין חנויות שמורות</li>');
        } else {
            for (i = 0; i < totvendors; i++) {
                $v.append('<li><button type="button" class="btn btn-sm btn-danger glyphicon glyphicon-trash pull-right""></button>' + vendors[i].name + '<br>' + vendors[i].phone + '</li>');
            }
            $('button', $v).on('click', function () {
                db.removeVendor($(this).parent().index());
                $(this).parent().remove();
                if (--totvendors == 0) {
                    $v.append('<li>אין חנויות שמורות</li>');
                }
            });
        }
        $m.empty();
        if (!totmsgs) {
            $m.append('<li>אין הודעות שמורות</li>');
        } else {
            for (i = 0; i < totmsgs; i++) {
                $m.append('<li><button type="button" class="btn btn-sm btn-danger glyphicon glyphicon-trash pull-right""></button>' + msgs[i] + '</li>');
            }
            $('button', $m).on('click', function () {
                db.removeMsg($(this).parent().index());
                $(this).parent().remove();
                if (--totmsgs == 0) {
                    $m.append('<li>אין הודעות שמורות</li>');
                }
            });
        }
    }

    /* TBD - consider blinking last edited / added item when getting back to list */

    var blink = function () {
        var o = $('[data-id="1514552997888"]');
        o.addClass('flash');
        setTimeout(function () {
            o.addClass('noflash');
            setTimeout(function () {
                o.removeClass('flash noflash');
            }, 1000);
        }, 100);
    };


    return { // interface
        deliveryTotals: deliveryTotals,
        statusDisp: statusDisp,
        run: init,
        toast: toast,
        page: showPage
    };

})();