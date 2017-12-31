var db = (function () {

    var orders;
    var sequence;
    var vendors;

    var init = function () {
        var ordersTxt = localStorage.getItem('ordersList');
        var sequenceTxt = localStorage.getItem('ordersSequence');
        var vendorsTxt = localStorage.getItem('vendorsList');
        orders = ordersTxt ? JSON.parse(ordersTxt) : {};
        sequence = sequenceTxt ? JSON.parse(sequenceTxt) : [];
        vendors = vendorsTxt ? JSON.parse(vendorsTxt) : [];
    };

    var getOrders = function () {
        return {
            orders: orders,
            sequence: sequence
        }
    };

    var getItem = function (index) {
        return orders[index];
    };

    var saveItem = function (index, data) {
        if (!orders[index]) {
            sequence.unshift(index)
            reorder(sequence);
        }
        orders[index] = data;
        //console.log(orders);
        localStorage.setItem('ordersList', JSON.stringify(orders));
    }

    var reorder = function (s) {
        sequence = s;
        localStorage.setItem('ordersSequence', JSON.stringify(sequence));
    }

    var getVendors = function() {
        return vendors;
    }
    var addVendor = function(name,phone) {
        vendors[name] = phone;
        localStorage.setItem('vendorsList', JSON.stringify(vendors));
    }

    var initDebug = function () {
        var i,vendorsTemp = {};
        orders = debugOrders();
        sequence = [];
        vendors = {};        
        for (i in orders) {
            sequence.push(i);
            vendors[orders[i].vendorName] = orders[i].vendorPhone;
        }
        localStorage.setItem('ordersList', JSON.stringify(orders));
        localStorage.setItem('ordersSequence', JSON.stringify(sequence));
        localStorage.setItem('vendorsList', JSON.stringify(vendors));
    }

    var debugOrders = function () {
        return {
            1: {
                status: 0,
                vendorName: "פרחי משה",
                vendorPhone: "092-1232345",
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
                vendorName: "חיים ופרחיו",
                vendorPhone: "092-1232345",
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
                vendorName: "מתנות בעמ",
                vendorPhone: "092-1232345",
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
                vendorName: "חיים ופרחיו",
                vendorPhone: "092-1232345",
                time: "13:30",
                address: "פלטין נפתלי 12, ראשון לציון",
                byName: "אלון גרונבאום",
                byPhone: "077-7894568",
                toName: "ליאת גרונבאום",
                toPhone: "065-5478585",
                details: "גע דגכ ע גדכע דגכ ע דגכ ע דגכ עד גכע דג כע דגכ ע גכ עדגכ ע דגכ ע דגכע גכד עגכ \nדגכ שדגכ דש גכ דשג כד שגכ שדג כ דג כ"
            },
            5: {
                status: 0,
                vendorName: "מתנות ודברים",
                vendorPhone: "092-1232345",
                time: "12:00",
                address: "הרצל 20, רחובות",
                byName: "חיים לוי",
                byPhone: "021-1231234",
                toName: "מלכה לוי",
                toPhone: "085-7415265",
                details: "דגכ שדגכ  כד שגכ כע י ס הבז ג כש11\nגכ דגכע דגכ עדג כע ע חל כח ש כע יגכ עי  כעי גכ עי"
            },
            6: {
                status: 1,
                vendorName: "פרחים",
                vendorPhone: "092-1232345",
                time: "13:00",
                address: "מרכז ספיר 5, ירושלים",
                byName: "ציון בללי",
                byPhone: "052-7895478",
                toName: "שלומית הכהן",
                toPhone: "047-4524157",
                details: "ףךל  ילח כ טא  רק יבי בי  חל מח ך חפ םןפ  ן י יו ון י ןוי\nלכגחילחי לחגכ ילחגכ ישדלגכ"
            },
            7: {
                status: 1,                
                vendorName: "מתנות",
                vendorPhone: "092-1232345",
                time: "13:00",
                address: "ארלוזורוב 10, רחובות",
                byName: "ירחמיאל זוכמאייר",
                byPhone: "059-7862415",
                toName: "ציפה לאה",
                toPhone: "047-7418526",
                details: "בס הנבנ הב סנ בה נב ה דגכ דגכ\nכדשג ככ גד דגכ דג כ דגכ דג כ דג כ דשגכ ד גכ דג כשד גכ"
            },
            8: {
                status: 2,
                vendorName: "דברים מגניבים",
                vendorPhone: "092-1232345",
                time: "13:30",
                address: "פלטין נפתלי 12, ראשון לציון",
                byName: "אלון גרונבאום",
                byPhone: "077-7894568",
                toName: "ליאת גרונבאום",
                toPhone: "065-5478585",
                details: "גע דגכ ע גדכע דגכ ע דגכ ע דגכ עד גכע דג כע דגכ ע גכ עדגכ ע דגכ ע דגכע גכד עגכ \nדגכ שדגכ דש גכ דשג כד שגכ שדג כ דג כ"
            },
            9: {
                status: 0,
                vendorName: "פרחי משה",
                vendorPhone: "092-1232345",
                time: "12:00",
                address: "הרצל 20, רחובות",
                byName: "חיים לוי",
                byPhone: "021-1231234",
                toName: "מלכה לוי",
                toPhone: "085-7415265",
                details: "דגכ שדגכ  כד שגכ כע י ס הבז ג כש11\nגכ דגכע דגכ עדג כע ע חל כח ש כע יגכ עי  כעי גכ עי"
            },
            10: {
                status: 1,
                vendorName: "פרחים",
                vendorPhone: "092-1232345",
                time: "13:00",
                address: "מרכז ספיר 5, ירושלים",
                byName: "ציון בללי",
                byPhone: "052-7895478",
                toName: "שלומית הכהן",
                toPhone: "047-4524157",
                details: "ףךל  ילח כ טא  רק יבי בי  חל מח ך חפ םןפ  ן י יו ון י ןוי\nלכגחילחי לחגכ ילחגכ ישדלגכ"
            },
            11: {
                status: 1,
                vendorName: "מתנות בעמ",
                vendorPhone: "092-1232345",
                time: "13:00",
                address: "ארלוזורוב 10, רחובות",
                byName: "ירחמיאל זוכמאייר",
                byPhone: "059-7862415",
                toName: "ציפה לאה",
                toPhone: "047-7418526",
                details: "בס הנבנ הב סנ בה נב ה דגכ דגכ\nכדשג ככ גד דגכ דג כ דגכ דג כ דג כ דשגכ ד גכ דג כשד גכ"
            },
            12: {
                status: 2,
                vendorName: "חיים ופרחיו",
                vendorPhone: "092-1232345",
                time: "13:30",
                address: "פלטין נפתלי 12, ראשון לציון",
                byName: "אלון גרונבאום",
                byPhone: "077-7894568",
                toName: "ליאת גרונבאום",
                toPhone: "065-5478585",
                details: "גע דגכ ע גדכע דגכ ע דגכ ע דגכ עד גכע דג כע דגכ ע גכ עדגכ ע דגכ ע דגכע גכד עגכ \nדגכ שדגכ דש גכ דשג כד שגכ שדג כ דג כ"
            }

        }
    }

    //initDebug();
    init();

    return {
        reorder: reorder,
        orders: getOrders,
        getItem: getItem,
        saveItem: saveItem,
        getVendors: getVendors,
        addVendor: addVendor
    };

})();