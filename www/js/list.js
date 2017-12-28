var list = (function () {

    var $ordersCtr = $('#list');

    var init = function () {
        setClickable();
    }

    var showOrders = function (reset) {
        if(reset) {
            $ordersCtr.empty();
        }
        var data = db.orders();
        //console.log(data);
        var tots = new Array(4).fill(0),
            i,order,id;
        for (i=0;i<data.sequence.length;i++) {
            id = data.sequence[i];
            order = data.orders[id];
            tots[order.status]++;
            //console.log(id,order);
            $ordersCtr.append(
                `
<div class="row item st${order.status}" data-id="${id}">
<div class="col-sm-12 col-md-12">
    <div class="row">
        <div class="myHandle col-xs-2 col-sm-2" style="text-align:center;">
            ${order.time}<br><span class="glyphicon glyphicon-${control.statusDisp(order.status)}"></span>
        </div>
        <div class="itemInfo col-xs-10 col-sm-10">
            ${order.address}<span>${order.vendor}</span>
        </div>
    </div>
</div>
</div>
        `
            );
        }
        setSortable($ordersCtr);
        control.deliveryTotals(tots);
    }

    var setSortable = function ($ctr) {
        $ctr.sortable({
            handle: '.myHandle',
            placeholder: "ui-state-highlight",
            axis: 'y',
            update: function () {
                var order = [];
                $('#list > .item').each(function () {
                    order.push($(this).data('id'));
                });
                db.reorder(order);
            },
            start: function (e, ui) {
                $(".ui-state-highlight").height(ui.item.outerHeight());
            }
        });
    }

    var filterClicked = function (statusId) {
        var st = 'st' + statusId;
        if ($ordersCtr.is('.' + st)) {
            //console.log('hide status ', st);
            $ordersCtr.removeClass(st);
        } else {
            //console.log('show status ', st);
            $ordersCtr.addClass(st);
        }        
    }

    var setClickable = function () {
        $ordersCtr.on('click', function (e) {
            if($(e.target).attr('id')=='list') return;
            var i = $(e.target).closest('.item').data('id');
            console.log('clicked list item',i);            
            item.loadItem(i);
            $('body').toggleClass('item');
        });
    }

    var checkBlank = function() {
        if($('#list > .item:visible').length) {
            $('#list').removeClass('blank');
        }
        else {
            $('#list').addClass('blank');
        }
    }

    init();

    return {
        reloadList: function() { showOrders(true); },
        showOrders: showOrders,
        filter: filterClicked,
        checkBlank: checkBlank
    };

})();