'use strict';
exports.__esModule = true;
var Utils = (function () {
    function Utils() {
    }
    Utils.notNull = function (value) {
        return typeof value != 'undefined' && value != null;
    };
    Utils.notNullStrAndObj = function (value) {
        if (typeof value == 'undefined')
            return false;
        if (value == null)
            return false;
        if (value === '')
            return false;
        if (typeof value == 'object') {
            for (var c in value) {
                return true;
            }
            return false;
        }
        return true;
    };
    Utils.notBlankStrAndObj = function (value) {
        if (typeof value == 'undefined')
            return false;
        if (value == null)
            return false;
        if (value === '')
            return false;
        if (typeof value == 'string' && value.trim() === '')
            return false;
        if (typeof value == 'object') {
            for (var c in value) {
                return true;
            }
            return false;
        }
        return true;
    };
    Utils.notBlankStr = function (value) {
        if (typeof value == 'undefined')
            return false;
        if (value == null)
            return false;
        if (value === '')
            return false;
        if (typeof value == 'string' && value.trim() === '')
            return false;
        return true;
    };
    Utils.deepCopy = function (source) {
        if (!Utils.notBlankStr(source))
            return source;
        var result;
        if (source instanceof Array) {
            result = [];
            for (var key in source) {
                result.push((Utils.notBlankStr(source[key]) && typeof source[key] === 'object' && ((source[key] instanceof Array) || source[key].toString() == '[object Object]')) ? Utils.deepCopy(source[key]) : source[key]);
            }
        }
        else if (typeof source === 'object' && source.toString() != '[object Object]') {
            return source;
        }
        else if (typeof source === 'object') {
            result = {};
            for (var key in source) {
                result[key] = (Utils.notBlankStr(source[key]) && typeof source[key] === 'object' && ((source[key] instanceof Array) || source[key].toString() == '[object Object]')) ? Utils.deepCopy(source[key]) : source[key];
            }
        }
        else
            return source;
        return result;
    };
    Utils.countStr = function (str, rex) {
        return (str.match(new RegExp(rex, "g"))).length;
    };
    Utils.sortObject = function (obj, list, order) {
        if (list === void 0) { list = null; }
        if (order === void 0) { order = null; }
        obj.sort(function (a, b) {
            return Utils.sortObj(a, b, list, order);
        });
        return obj;
    };
    Utils.sortObj = function (a, b, list, order) {
        if (list === void 0) { list = null; }
        if (order === void 0) { order = null; }
        if (list == null) {
            list = [];
            for (var e in a)
                list.push(e);
        }
        else if (!(list instanceof Array)) {
            list = [list];
        }
        if (order == null) {
            order = [];
            for (var e in a)
                order.push(true);
        }
        else if (!(list instanceof Array)) {
            var org = order;
            order = [];
            for (var e in a)
                order.push(org);
        }
        var factor;
        for (var c in list) {
            factor = order[c] == false ? -1 : 1;
            if (a[list[c]] < b[list[c]])
                return -1 * factor;
            else if (a[list[c]] > b[list[c]])
                return 1 * factor;
            else {
                var clone = Array['from'](list);
                clone.splice(0, parseInt(c) + 1);
                var clone2 = Array['from'](order);
                clone2.splice(0, parseInt(c) + 1);
                if (clone.length == 0)
                    return 0;
                else
                    return Utils.sortObj(a, b, clone, clone2);
            }
        }
    };
    Utils.simple_array_filter = function (list, key, value) {
        var result = [];
        for (var y in list)
            if (list[y][key] == value)
                result.push(list[y]);
        return result;
    };
    Utils.mergeObject = function (org) {
        var add = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            add[_i - 1] = arguments[_i];
        }
        if (!Utils.notNull(org))
            org = {};
        for (var c in add)
            Utils._mergeObject(org, add[c]);
        return org;
    };
    Utils._mergeObject = function (org, add) {
        if (!Utils.notNull(org))
            org = {};
        if (!Utils.notNull(add) || typeof add != 'object' || typeof org != 'object')
            return org;
        for (var c in add) {
            if (!Utils.notNull(org[c]))
                org[c] = add[c];
        }
        return org;
    };
    Utils.getParamUrl = function (url, addPrefix) {
        if (addPrefix === void 0) { addPrefix = null; }
        addPrefix = Utils.notBlankStr(addPrefix) ? addPrefix : false;
        return url.indexOf('?') != -1 ? ((addPrefix == true ? '?' : '') + url.substr(url.indexOf('?') + 1)) : '';
    };
    Utils.getLocationUrl = function (url) {
        return url.substr(0, url.indexOf('?') != -1 ? url.indexOf('?') : url.length);
    };
    Utils.replaceAll = function (str, sptr, sptr1) {
        return str.replace(new RegExp(sptr, 'gm'), sptr1);
    };
    Utils.injectRedirectedParams = function (params, bool, nodeepcopy) {
        if (bool === void 0) { bool = null; }
        if (nodeepcopy === void 0) { nodeepcopy = null; }
        if (!Utils.notNull(nodeepcopy) || nodeepcopy != true)
            params = Utils.deepCopy(params);
        if (!params || !Utils.notNull(params.isRedirectedByInterceptors)) {
            if (!params)
                params = {};
            params.isRedirectedByInterceptors = Utils.notNull(bool) ? bool : true;
        }
        return params;
    };
    Utils.timestampTransfer = function (c) {
        return new Date(new Date().setTime(c)).toLocaleDateString();
    };
    Utils.timeTransfer = function (past) {
        var nowtime = new Date().getTime();
        var count = Math.abs((past - nowtime) / 1000);
        console.log(count);
        if (0 <= count && count < 60) {
            return "刚刚";
        }
        else if (0 <= count && (count / 60) < 60) {
            return (count / 60).toFixed(0) + "分钟前";
        }
        else if (0 <= count && (count / 60 / 60) < 24) {
            return parseInt((count / 60 / 60).toFixed(0)) + "小时前";
        }
        else if (0 <= count && parseInt((count / 60 / 60 / 24).toFixed(0)) <= 1) {
            return "昨天";
        }
        else if (1 < count && parseInt((count / 60 / 60 / 24).toFixed(0)) <= 2) {
            return "前天";
        }
        else if (0 <= count) {
            return new Date(parseInt(past)).toLocaleDateString();
        }
    };
    Utils.getIframeWindow = function (obj) {
        return obj.contentWindow || obj.contentDocument.parentWindow;
    };
    Utils.getIframeHeight = function (obj) {
        var idoc = Utils.getIframeWindow(obj).document;
        if (idoc.body) {
            return Math.max(idoc.body.scrollHeight, idoc.body.offsetHeight);
        }
        else if (idoc.documentElement) {
            return Math.max(idoc.documentElement.scrollHeight, idoc.documentElement.offsetHeight);
        }
    };
    Utils.checkMobile = function (str) {
        var re = /^1\d{10}$/;
        if (re.test(str)) {
            return true;
        }
        else {
            return false;
        }
    };
    Utils.genUrlParams = function (params) {
        var str = '';
        for (var c in params) {
            if (params[c] instanceof Array) {
                for (var d in params[c]) {
                    if (typeof params[c][d] == 'object')
                        str += '&' + c + '=' + encodeURIComponent(JSON.stringify(params[c][d]));
                    else
                        str += '&' + c + '=' + encodeURIComponent(params[c][d]);
                }
            }
            else {
                if (typeof params[c] == 'object')
                    str += '&' + c + '=' + encodeURIComponent(JSON.stringify(params[c]));
                else
                    str += '&' + c + '=' + encodeURIComponent(params[c]);
            }
        }
        if (str.substr(0, 1) == '&')
            str = '?' + str.substr(1);
        return str;
    };
    Utils.tryParseJSON = function (str) {
        try {
            return JSON.parse(decodeURIComponent(str));
        }
        catch (e) {
            return decodeURIComponent(str);
        }
    };
    Utils.getUrlParam = function (url, key) {
        if (key === void 0) { key = null; }
        var param = {}; //returnurl;callback
        if (url.indexOf("?") >= 0) {
            var str = url.substr(url.indexOf("?") + 1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                if (Utils.notNull(param[strs[i].split("=")[0]])) {
                    if (param[strs[i].split("=")[0]] instanceof Array)
                        param[strs[i].split("=")[0]].push(Utils.tryParseJSON(strs[i].split("=")[1]));
                    else {
                        param[strs[i].split("=")[0]] = [param[strs[i].split("=")[0]]];
                        param[strs[i].split("=")[0]].push(Utils.tryParseJSON(strs[i].split("=")[1]));
                    }
                }
                else
                    param[strs[i].split("=")[0]] = Utils.tryParseJSON(strs[i].split("=")[1]);
            }
        }
        return key ? param[key] : param;
    };
    Utils.matchUrlSchema = function (pre, com) {
        if (!Utils.notNull(pre) || !Utils.notNull(com))
            return { result: false, restful: null };
        var stk1 = [], restful = {}, spl1, spl2;
        if (pre.substr(0, 1) == '/')
            pre = pre.substr(1);
        if (pre.substr(pre.length - 1) == '/')
            pre = pre.substr(0, pre.length - 1);
        if (com.substr(0, 1) == '/')
            com = com.substr(1);
        if (com.substr(com.length - 1) == '/')
            com = com.substr(0, com.length - 1);
        spl1 = pre.split('/');
        spl2 = com.split('/');
        for (var c in spl1) {
            if (spl1[c].substr(0, 1) == ':')
                stk1.push({ isRestful: true, key: spl1[c].substr(1) });
            else
                stk1.push({ isRestful: false, key: spl1[c] });
        }
        if (stk1.length != spl2.length)
            return { result: false, restful: null };
        for (var c in stk1) {
            if (stk1[c].isRestful == true) {
                if (Utils.notNull(restful[stk1[c].key])) {
                    if (!(restful[stk1[c].key] instanceof Array))
                        restful[stk1[c].key] = [restful[stk1[c].key]];
                    restful[stk1[c].key].push(Utils.tryParseJSON(spl2[c]));
                }
                else
                    restful[stk1[c].key] = Utils.tryParseJSON(spl2[c]);
            }
            else if (spl2[c] != stk1[c].key)
                return { result: false, restful: null };
        }
        return { result: true, restful: restful };
    };
    Utils.fillRestfulUrl = function (pre, params) {
        if (!Utils.notNull(pre))
            return;
        var stk1 = [], restful = {}, spl1, spl2;
        if (pre.substr(0, 1) == '/')
            pre = pre.substr(1);
        if (pre.substr(pre.length - 1) == '/')
            pre = pre.substr(0, pre.length - 1);
        spl1 = pre.split('/');
        for (var c in spl1) {
            if (spl1[c].substr(0, 1) == ':')
                stk1.push(spl1[c].substr(1));
        }
        if (pre.substr(0, 1) != '/')
            pre = '/' + pre;
        if (pre.substr(pre.length - 1) != '/')
            pre = pre + '/';
        if (params)
            for (var c in stk1) {
                pre = Utils.replaceAll(pre, '/:' + stk1[c] + '/', '/' + encodeURIComponent(JSON.stringify(params[stk1[c]])) + '/');
                //console.log('/:' + stk1[c] + '/')
                delete params[stk1[c]];
            }
        if (pre.substr(pre.length - 1) == '/')
            pre = pre.substr(0, pre.length - 1);
        return pre;
    };
    Utils.matchUrlPath = function (pre, com) {
        if (!Utils.notNull(pre) || !Utils.notNull(com))
            return false;
        if (pre.substr(0, 1) != '/')
            pre = '/' + pre;
        if (pre.substr(pre.length - 1) != '/')
            pre = pre + '/';
        if (com.substr(0, 1) != '/')
            com = '/' + com;
        if (com.substr(com.length - 1) != '/')
            com = com + '/';
        return pre == com;
    };
    Utils.getUrlPath = function (url) {
        if (url.indexOf('?') >= 0)
            return url.substr(url.indexOf('#') + 1, url.indexOf('?') - url.indexOf('#') - 1);
        else
            return url.substr(url.indexOf('#') + 1);
    };
    Utils.uuid = function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++)
                uuid[i] = chars[0 | Math.random() * radix];
        }
        else {
            // rfc4122, version 4 form
            var r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map