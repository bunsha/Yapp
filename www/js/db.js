var db = (function () {

    var orders;
    var sequence;

    var init = function () {
        var ordersTxt = localStorage.getItem('ordersList');
        var sequenceTxt = localStorage.getItem('ordersSequence');
        orders = ordersTxt ? JSON.parse(ordersTxt) : {};
        sequence = sequenceTxt ? JSON.parse(sequenceTxt) : [];
    };

    var getOrders = function () {
        return {
            orders: orders,
            sequence: sequence
        }
    };

    var getItem = function(index) {
        return orders[index];
    };
    
    var saveItem = function(index,data) {
        if(!orders[index]) {
            sequence.unshift(index)
            reorder(sequence);
        }
        orders[index] = data;
        console.log(orders);
        localStorage.setItem('ordersList',JSON.stringify(orders));
    }

    var reorder = function(s) {
        sequence = s;
        localStorage.setItem('ordersSequence',JSON.stringify(sequence));
    }

    init();

    return { 
        reorder: reorder,
        orders: getOrders,
        getItem: getItem,
        saveItem: saveItem
    };

})();

/*
        orders = {
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
*/