var sms = (function () {

    var newMsg;

    var init = function (vendorPhone, byPhone) {
        setRecipients(vendorPhone, byPhone);
        setMsgOptions();
    }

    var setMsgOptions = function () {
        newMsg = false;
        var msgs = db.getMsgs();
        $ctr = $('#sms .msgoptions');
        $ctr.empty();
        for (var i = 0; i < msgs.length; i++) {
            $ctr.append('<li><textarea readonly>' + msgs[i] + '</textarea></li>');
        }
        $ctr.append('<li><textarea class="newmsg"></textarea></li>');
        $('textarea', $ctr).on('click', function () {
            $('textarea', $ctr).removeClass('thisone');
            $(this).toggleClass('thisone');
            newMsg = $(this).is('.newmsg');
        });
    }

    var setRecipients = function (vendorPhone, byPhone) {
        if (vendorPhone && byPhone) {
            $('#sms .recipient label.tovendor').show();
            $('#sms .recipient label.tovendor input').prop('checked', false).data('ph', vendorPhone).show();
            $('#sms .recipient label.toby').show();
            $('#sms .recipient label.toby input').prop('checked', false).data('ph', byPhone).show();
        } else {
            if (vendorPhone) {
                $('#sms .recipient label.tovendor').show();
                $('#sms .recipient label.tovendor input').prop('checked', true).data('ph', vendorPhone).hide();
                $('#sms .recipient label.toby').hide();
                $('#sms .recipient label.toby input').prop('checked', false).data('ph', byPhone).hide();
            }
            if (byPhone) {
                $('#sms .recipient label.tovendor').hide();
                $('#sms .recipient label.tovendor input').prop('checked', false).data('ph', vendorPhone).hide();
                $('#sms .recipient label.toby').show();
                $('#sms .recipient label.toby input').prop('checked', true).data('ph', byPhone).hide();
            }
        }
    }

    var prepareSend = function () {
        var sendTo = [];
        var sendToType = [];
        var smsText = null;
        $('#sms .recipient label input:checked').each(function (i, o) {
            sendTo.push($(this).data('ph'));
            sendToType.push($(this).data('type'));
        });
        var $msgobj = $('#sms textarea.thisone');
        if ($msgobj[0]) {
            smsText = $.trim($msgobj.val());
        }
        if (sendTo.length == 0) {
            control.toast('נא לבחור למי לשלוח SMS', true);
        } else if (!smsText) {
            control.toast('יש לבחור הודעה קיימת<br>או להכניס טקסט חדש', true);
        } else {
            smsSender(sendTo, smsText, sendToType);
            // add message to db
            if (newMsg) {
                db.saveMsg(smsText);
            }
        }
    }

    var smsSender = function (phones, message, sendToType) {
        control.toast('שולח SMS, המתן...');
        $.ajax({
                url: "http://alondelivey.com/dzey4kqooc3shiq1qod-ln3rza8f3duf_vtuf-8eed2ehrviod.php",
                dataType: 'json',
                method: "POST",
                data: {
                    phones: phones,
                    msg: message
                }
            }).done(function (data) {
                //console.log('sms request completed successfuly', data);
                if (data.success) {
                    control.toast('SMS נשלח');
                    item.historySmsAdd(sendToType);
                    control.page('item');
                } else {
                    control.toast('<b>שגיאה!!!</b><br>' + data.error + '<br>SMS לא נשלח', true);
                }
            }).fail(function () {
                control.toast('<b>שגיאה בשרת!!!</b><br>SMS לא נשלח', true);
            });
    }

    return {
        open: init,
        send: prepareSend
    }

})();