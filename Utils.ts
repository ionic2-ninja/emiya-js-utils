'use strict'

export class Utils {

  public static notNull(value) {
    return typeof value != 'undefined' && value != null;
  }

  public static notNullStrAndObj(value) {
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
  }

  public static notBlankStrAndObj(value) {
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
  }

  public static notBlankStr(value) {
    if (typeof value == 'undefined')
      return false;
    if (value == null)
      return false;
    if (value === '')
      return false;
    if (typeof value == 'string' && value.trim() === '')
      return false;
    return true;
  }

  public static deepCopy(source) {
    if (!Utils.notBlankStr(source))
      return source;
    var result
    if (source instanceof Array) {
      result = [];
      for (var key in source) {
        result.push((Utils.notBlankStr(source[key]) && typeof source[key] === 'object' && source[key].toString() == '[object Object]') ? Utils.deepCopy(source[key]) : source[key]);
      }
    }
    else if (typeof source === 'object' && source.toString() != '[object Object]') {
      return source;
    }
    else if (typeof source === 'object') {
      result = {};
      for (var key in source) {
        result[key] = (Utils.notBlankStr(source[key]) && typeof source[key] === 'object' && source[key].toString() == '[object Object]') ? Utils.deepCopy(source[key]) : source[key];
      }
    }
    else
      return source;
    return result;
  }

  public static countStr(str, rex) {
    return (str.match(new RegExp(rex, "g"))).length;
  }

  public static sortObject(obj, list = null, order = null) {
    obj.sort((a, b)=> {
      return Utils.sortObj(a, b, list, order);
    })
    return obj
  }

  public static sortObj(a, b, list = null, order = null) {
    if (list == null) {
      list = []
      for (let e in a)
        list.push(e)
    } else if (!(list instanceof Array)) {
      list = [list]
    }
    if (order == null) {
      order = []
      for (let e in a)
        order.push(true)
    } else if (!(list instanceof Array)) {
      let org = order;
      order = [];
      for (let e in a)
        order.push(org)
    }
    let factor;
    for (let c in list) {
      factor = order[c] == false ? -1 : 1
      if (a[list[c]] < b[list[c]])
        return -1 * factor;
      else if (a[list[c]] > b[list[c]])
        return 1 * factor;
      else {
        let clone = Array.from(list)
        clone.splice(0, parseInt(c) + 1)
        let clone2 = Array.from(order)
        clone2.splice(0, parseInt(c) + 1)
        if (clone.length == 0)
          return 0
        else
          return Utils.sortObj(a, b, clone, clone2)
      }
    }
  }

  public static simple_array_filter(list, key, value) {
    var result = [];
    for (var y in list)
      if (list[y][key] == value)
        result.push(list[y]);
    return result;
  }

  public static mergeObject(org, ...add) {
    if (!Utils.notNull(org))
      org = {}
    for (let c in add)
      Utils._mergeObject(org, add[c])
    return org
  }

  private static _mergeObject(org, add) {
    if (!Utils.notNull(org))
      org = {}
    if (!Utils.notNull(add) || typeof add != 'object' || typeof org != 'object')
      return org;
    for (var c in add) {
      if (!Utils.notNull(org[c]))
        org[c] = add[c];
    }
    return org;
  }

  public static getParamUrl(url, addPrefix = null) {
    addPrefix = Utils.notBlankStr(addPrefix) ? addPrefix : false;
    return url.indexOf('?') != -1 ? ((addPrefix == true ? '?' : '') + url.substr(url.indexOf('?') + 1)) : '';
  }

  public static getLocationUrl(url) {
    return url.substr(0, url.indexOf('?') != -1 ? url.indexOf('?') : url.length);
  }

  public static replaceAll(str, sptr, sptr1) {
    return str.replace(new RegExp(sptr, 'gm'), sptr1)
  }

  public static injectRedirectedParams(params, bool = null, nodeepcopy = null) {
    if (!Utils.notNull(nodeepcopy) || nodeepcopy != true)
      params = Utils.deepCopy(params);
    if (!params || !Utils.notNull(params.isRedirectedByInterceptors)) {
      if (!params)
        params = {};
      params.isRedirectedByInterceptors = Utils.notNull(bool) ? bool : true;
    }
    return params;
  }

  public static timestampTransfer(c) {
    return new Date(new Date().setTime(c)).toLocaleDateString();
  }

  public static timeTransfer(past) {
    var nowtime = new Date().getTime();
    var count = Math.abs((past - nowtime) / 1000);
    console.log(count);
    if (0 <= count && count < 60) {
      return "刚刚";
    } else if (0 <= count && (count / 60) < 60) {
      return (count / 60).toFixed(0) + "分钟前";
    } else if (0 <= count && (count / 60 / 60) < 24) {
      return parseInt((count / 60 / 60).toFixed(0)) + "小时前";
    } else if (0 <= count && parseInt((count / 60 / 60 / 24).toFixed(0)) <= 1) {
      return "昨天";
    } else if (1 < count && parseInt((count / 60 / 60 / 24).toFixed(0)) <= 2) {
      return "前天";
    } else if (0 <= count) {
      return new Date(parseInt(past)).toLocaleDateString();
    }
  }

  public static getIframeWindow(obj) {
    return obj.contentWindow || obj.contentDocument.parentWindow;
  }

  public static getIframeHeight(obj) {
    var idoc = Utils.getIframeWindow(obj).document;
    if (idoc.body) {
      return Math.max(idoc.body.scrollHeight, idoc.body.offsetHeight);
    } else if (idoc.documentElement) {
      return Math.max(idoc.documentElement.scrollHeight, idoc.documentElement.offsetHeight);
    }
  }

  public static checkMobile(str) {
    var re = /^1\d{10}$/
    if (re.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  public static genUrlParams(params) {
    let str = '';
    for (let c in params) {
      if (params[c] instanceof Array) {
        for (let d in params[c]) {
          if (typeof params[c][d] == 'object')
            str += '&' + c + '=' + encodeURIComponent(JSON.stringify(params[c][d]))
          else
            str += '&' + c + '=' + encodeURIComponent(params[c][d])
        }
      } else {
        if (typeof params[c] == 'object')
          str += '&' + c + '=' + encodeURIComponent(JSON.stringify(params[c]))
        else
          str += '&' + c + '=' + encodeURIComponent(params[c])
      }
    }
    if (str.substr(0, 1) == '&')
      str = '?' + str.substr(1)

    return str
  }

  public static tryParseJSON(str) {
    try {
      return JSON.parse(decodeURIComponent(str))
    } catch (e) {
      return decodeURIComponent(str)
    }
  }

  public static getUrlParam(url, key = null) {
    var param = {};//returnurl;callback
    if (url.indexOf("?") >= 0) {
      var str = url.substr(url.indexOf("?") + 1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        if (Utils.notNull(param[strs[i].split("=")[0]])) {
          if (param[strs[i].split("=")[0]] instanceof Array)
            param[strs[i].split("=")[0]].push(Utils.tryParseJSON(strs[i].split("=")[1]))
          else {
            param[strs[i].split("=")[0]] = [param[strs[i].split("=")[0]]]
            param[strs[i].split("=")[0]].push(Utils.tryParseJSON(strs[i].split("=")[1]))
          }
        } else
          param[strs[i].split("=")[0]] = Utils.tryParseJSON(strs[i].split("=")[1]);
      }
    }
    return key ? param[key] : param;
  }

  public static matchUrlSchema(pre, com) {
    if (!Utils.notNull(pre) || !Utils.notNull(com))
      return {result: false, restful: null}

    let stk1 = [], restful = {}, spl1, spl2

    if (pre.substr(0, 1) == '/')
      pre = pre.substr(1)
    if (pre.substr(pre.length - 1) == '/')
      pre = pre.substr(0, pre.length - 1)

    if (com.substr(0, 1) == '/')
      com = com.substr(1)
    if (com.substr(com.length - 1) == '/')
      com = com.substr(0, com.length - 1)

    spl1 = pre.split('/')
    spl2 = com.split('/')

    for (let c in spl1) {
      if (spl1[c].substr(0, 1) == ':')
        stk1.push({isRestful: true, key: spl1[c].substr(1)})
      else
        stk1.push({isRestful: false, key: spl1[c]})
    }

    if (stk1.length != spl2.length)
      return {result: false, restful: null}


    for (let c in stk1) {
      if (stk1[c].isRestful == true) {
        if (Utils.notNull(restful[stk1[c].key])) {
          if (!(restful[stk1[c].key] instanceof Array))
            restful[stk1[c].key] = [restful[stk1[c].key]]
          restful[stk1[c].key].push(Utils.tryParseJSON(spl2[c]))
        } else
          restful[stk1[c].key] = Utils.tryParseJSON(spl2[c])
      } else if (spl2[c] != stk1[c].key)
        return {result: false, restful: null}
    }

    return {result: true, restful: restful}


  }

  public static fillRestfulUrl(pre, params) {
    if (!Utils.notNull(pre))
      return

    let stk1 = [], restful = {}, spl1, spl2

    if (pre.substr(0, 1) == '/')
      pre = pre.substr(1)
    if (pre.substr(pre.length - 1) == '/')
      pre = pre.substr(0, pre.length - 1)

    spl1 = pre.split('/')

    for (let c in spl1) {
      if (spl1[c].substr(0, 1) == ':')
        stk1.push(spl1[c].substr(1))
    }

    if (pre.substr(0, 1) != '/')
      pre = '/' + pre
    if (pre.substr(pre.length - 1) != '/')
      pre = pre + '/'

    if (params)
      for (let c in stk1) {
        pre = Utils.replaceAll(pre, '/:' + stk1[c] + '/', '/' + encodeURIComponent(JSON.stringify(params[stk1[c]])) + '/')
        //console.log('/:' + stk1[c] + '/')
        delete params[stk1[c]]
      }

    if (pre.substr(pre.length - 1) == '/')
      pre = pre.substr(0, pre.length - 1)

    return pre

  }

  public static matchUrlPath(pre, com) {
    if (!Utils.notNull(pre) || !Utils.notNull(com))
      return false

    if (pre.substr(0, 1) != '/')
      pre = '/' + pre
    if (pre.substr(pre.length - 1) != '/')
      pre = pre + '/'

    if (com.substr(0, 1) != '/')
      com = '/' + com
    if (com.substr(com.length - 1) != '/')
      com = com + '/'

    return pre == com

  }

  public static getUrlPath(url) {
    if (url.indexOf('?') >= 0)
      return url.substr(url.indexOf('#') + 1, url.indexOf('?') - url.indexOf('#') - 1)
    else
      return url.substr(url.indexOf('#') + 1)
  }

}
