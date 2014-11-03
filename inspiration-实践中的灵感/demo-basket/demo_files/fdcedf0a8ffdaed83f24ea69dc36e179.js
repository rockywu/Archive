/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 *
 * 这是框架核心主文件，需要用到框架，此文件必须要载入，
 *
 * 注意：全局变量 J 不能重复定义
 * 注意：此文件涉及到整站JS稳定正常运行的核心，请勿随意修改
 *
 *
 * @path: base/base.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/09/27
 *
 */


/**
 * 构造J对象
 *
 */

/**
 * change log
 *
 * @version: 1.0.1  By Jock
 * 2014.7.23
 * 增加 J.log 方法
 * 可以在各种版本下使用，高版本用console.log 低版本用 alert
 *
 *
 *
 */

(function (W) {
    var BaseStart = +new Date(), PageStart = W.PAGESTART || BaseStart, hs = 'hasOwnProperty', mix = function (l, r, w) {
            if(w){
                var N = {};
                for (var n in l){ if (l[hs](n))N[n] = l[n]}
                for (var n in r){if (r[hs](n))N[n] = r[n]}
                return N;
            }
            for (var p in r) {if (r[hs](p)) {l[p] = r[p];} }return l;
        }, base = {},slice = Array.prototype.slice,jsH = 'http://include.aifcdn.com/tjs/',cssH = 'http://include.aifcdn.com/tcss/', _ = {}, times = {
        PS:PageStart,
        BS:BaseStart,
        CL:PageStart
    };

    var version = 'fdcedf0a8ffdaed83f24ea69dc36e179', readyList = [], callList = [], jsModules = [], cssModules = [], D = W.document, h = D.getElementsByTagName('head')[0], dE = D.documentElement, A = arguments, U = A[2],  s = A[1].split(','), aL = s[0], rL = s[1], aT = s[2], dT = s[3], cL = s[4], sC = s[5], rS = s[6], C = s[7], ld = s[8], old = 'on' + ld, isReady = 0, bind = 0, sT = W.setTimeout,sI = W.setInterval, conf = {
            v:version, u:jsH, m:'/', c:'utf-8', s:cssH
        }, S = D[rS], Dt = D[aT], c2t = {}, IS = {}, nu = navigator.userAgent, R = RegExp, JS = 'js', CSS = 'css';


    /**
     * 增加引用，便于调用
     * @type {Object}
     */
    var link = {
        aL:aL,
        W:W,
        D:D,
        St:sT,
        Si:sI
    };


    /**
     * 遍历Object中所有元素。
     *
     * @param {Object} object 需要遍历的Object
     * @param {Function} callback 对每个Object元素进行调用的函数
     * @return {Object} 原对象
     *
     */
    function each(object, callback) {
        var i = 0, I, length = object.length, isObj = length === U, ret = true;
        if (isObj) {
            for (I in object) {
                if (callback.call(object[ I ], I, object[ I ]) === false) {
                    ret = false;
                    break;
                }
            }
        } else {
            for (; i < length;) {
                if (callback.call(object[ i ], i, object[ i++ ]) === false) {
                    ret = false;
                    break;
                }
            }
        }
        return ret;
    }

    function Tp( o ) {
        return o === null ? String( o ) : c2t[ Object.prototype.toString.call(o) ] || U;
    }

    /**
     * 扩展 IsString 、IsFunction .... 方法
     */
    (function(){
        each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
            var lowerName = name.toLowerCase();
            c2t[ "[object " + name + "]" ] = lowerName;
            IS['is'+name] = function(o){
                return Tp(o) === lowerName
            };
        });
        IS.isWindow = function( object ) {
            return object && object == object.window;
        };
        IS.isUndefined = function( object ){
            return object === U;
        }
    })();




    /**
     * 提供自定义模块支持， 注：为保证自定义模块名称与核心类库模块名称冲突，
     * 自定义模块命名规则为 “模块类别_用途”，中间用 “_” ，
     *
     *      注册模块    J.add('u_login',object);
     *      使用模块    J.u_log etc...
     *
     *
     */
    mix(base, {
        /**
         * 绑定mix方法
         */
        mix:mix,
        /**
         * 添加核心模块，如果添加的模块已经存在，原模块将被重写，
         * 可以利用此特性进行多态开发, 但是这存在一定的风险，禁止覆盖核心模块
         * @param {String} module 模块名称
         * @param {Object | Function} object 模块对象
         */
        add:function (module, object) {
            if(IS.isFunction(object)){
                _[module] = object;
                return;
            }
            var m = {};
            _.mix(m, object);
            return _.mix(_[module] = _[module] || {}, m);
        },
        ua:{
            ua:nu,
            chrome : /chrome\/(\d+\.\d+)/i.test(nu) ? + R.$1 : U,
            firefox : /firefox\/(\d+\.\d+)/i.test(nu) ? + R.$1 : U,
            ie : /msie (\d+\.\d+)/i.test(nu) ? (D.documentMode || + R.$1) : U,
            opera : /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(nu) ?  + ( R.$6 || R.$2 ) : U,
            safari : /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(nu) && !/chrome/i.test(nu) ? + (R.$1 || R.$2) : U
        }
    });

    /**
     * 绑定Ready事件
     */
    function bindReady() {
        if (bind)
            return;
        bind = 1;
        if (C === S)
            return finishRready();
        if (D[aL]) {
            D[aL](cL, function () {
                D[rL](cL, arguments.callee, 0), finishRready()
            }, 0);
            W[aL](ld, function () {
                W[rL](ld, arguments.callee, 0), finishRready(1)
            }, 0);
        } else if (Dt) {
            Dt(sC, function () {
                if (C === S)
                    D[dT](sC, arguments.callee), finishRready()
            });
            W[aT](old, function () {
                W[dT](old, arguments.callee), finishRready(1)
            });

            var fixDenied = false;

            try{
                fixDenied = null == W.frameElement
            }catch(e){}

            if (dE.doScroll && fixDenied) {
                (function () {
                    if (isReady)
                        return;
                    try {
                        dE.doScroll('left');
                    } catch (e) {
                        return sT(arguments.callee, 1);
                    }
                    finishRready();
                })()
            }
        }
    }

    /**
     * 加入任务队列，
     * 文档结构建立后会执行callback回调
     * @param {Function} callback
     */
    function ready(callback) {
        bindReady();
        isReady ? callback.call() : readyList.push(callback);
    }

    /**
     * 完成文档结构，如果队列有任务就执行任务
     */
    function finishRready(isLoad) {
        isLoad && (times.PL = getTime());
        if (!isReady) {
            if (!D.body) {
                return sT(finishRready, 1);
            }
            isReady = 1;
            times.CL = getTime();
            if (readyList) {
                var fn, i = 0;
                while (( fn = readyList[i++])) {
                    fn.call();
                }
                readyList = null;
            }
            return 0
        }
    }

    /**
     * 资源加载器，
     * 资源加载成功后会执行callback回调
     * @param {String} url 资源地址
     * @param {String} type 资源类型 || callback
     * @param {Function} callback
     */
    function loadResource(url, type, callback) {
        var n;
        IS.isFunction(type) && (callback = type);
        type = /\.(js|css)/g.exec(url.toLowerCase()), type = type ? type[1] : JS;
        if (JS === type) {
            n = D.createElement('script');
            n.type = 'text/javascript';
            n.src = url;
            n.async = 'true';
            n.charset = conf.c;
        } else if (CSS === type) {
            n = D.createElement('link');
            n.type = 'text/css';
            n.rel = 'stylesheet';
            n.href = url;
            h.appendChild(n);
            return;
        }

        n.onload = n[sC] = function () {
            var rs = this[rS];
            if (!rs || 'loaded' === rs || C === rs) {
                callback && callback();
                n.onload = n[sC] = null;
            }
        };
        h.appendChild(n);
    }

    /**
     * 获取模块资源地址
     * @param {Array} m 模块
     * @param {String} t 类型
     * @return {String} 资源地址
     */
    function buildUrl(m,t) {
        t || (t = JS);
        return conf[t == JS ? 'u':'s'] + m.join(conf.m) + conf.m + conf.v + '.' + t;
    }

    /**
     * 查看模块所否存在
     * @param {String} m 模块
     * @param {String} t 类型
     * @return {Boolean}
     */
    function moduleExits(m,t) {
        if(t == CSS) return inArray(m, cssModules) > -1;
        var o = m.split('.'), n = o.length, M = _[o[0]];
        return (n === 1 && M) ? true : (n === 2 && M && M[o[1]]) ? true : false;
    }

    /**
     * 过滤重复或已存在的模块
     * @param m 模块数组
     * @param {String} t 类型
     * @return {Array}
     */
    function filterModules(m,t){
        var l = m.length, M = [], R = [], re, K;
        while(l--){
            K = m[l];
            if(/^\w+$/.test(K)){
                M.push(K)
            }
        }
        l = m.length;
        while(l--){
            K = m[l];
            if(re = K.match(/^(\w+)\.\w+$/)){
                if(inArray(re[1], M) != -1){
                    m.splice(l,1);
                }
            }
        }
        l = m.length;
        while(l--){
            K = m[l];
            if(inArray(K, R) == -1 && ( t == CSS || !moduleExits(K,t) )){
                R.push(K);
            }
        }
        return R.sort();
    }

    function inArray( item, array ) {
        var i = 0, l;

        if ( array ) {
            l = array.length;

            for ( ; i < l; i++ ) {
                if ( array[ i ] === item ) {
                    return i;
                }
            }
        }

        return -1;
    }

    /**
     * 指定需要使用那些模块
     * @param {Array|String} require 依赖的模块，
     *         多个模块用数组的方式 ['module1','module2'] , 只依赖一个模块可直接传入模块字符串
     * @param {Function} callback 回调函数
     *         模块如果存在或加载完成后执行回调函数
     * @param {String} type 资源类型
     *         模块如果存在或加载完成后执行回调函数
     * @param {Boolean|Number} delay || undefined
     *         指定数字为延迟执行，单位毫秒，
     *         留空则等待ready后合并成一个请求
     *         ‘async’ 则立即请求，这样使用务必清楚所使用的核心模块安全可用，非特殊要求，否则不推荐这样使用
     * @return null
     */
    function use(require, callback, type, delay) {
        var mod, mods = [], cmods = [], i = 0, isJs;

        (type != JS && type != CSS) && (delay = type, type = JS), isJs = (type == JS);

        if (IS.isArray(require)) {
            while ((mod = require[i++])) (isJs ? mods : cmods).push(mod);
        } else if (IS.isString(require)) {
            (isJs ? mods : cmods).push(require);
        }

        mods = filterModules(isJs ? mods : cmods, type);

        if(IS.isNumber(delay)){
            ready(function () {
                var m, M = [], i = 0;
                while ((m = mods[i++]) && !moduleExits(m,type)) M.push(m);
                if (M.length) {
                    loadResource(buildUrl(M,type), type, callback)
                } else callback && callback.call()
            }.delay(delay));
        }else{
            if(!isReady && !delay){
                i = 0;
                while ((mod = mods[i++])) (isJs ? jsModules : cssModules).push(mod);
                callback && callList.push(callback);
            }else if(mods.length)
                loadResource(buildUrl(mods,type), type, callback)
            else callback && callback.call()
        }
    }


    /**
     * ready后执行队列任务
     */
    ready(function () {

        var mods = filterModules(jsModules, JS);
        function fCallbacks(){
            var fn , i = 0;
            while ( fn = callList[i++] ) fn.call();
            jsModules = callList = null;
        }
        if (mods.length) {
            loadResource(buildUrl(mods, JS), JS, fCallbacks);
            mods = [];
        }else fCallbacks();

        mods = filterModules(cssModules, CSS);
        if (mods.length) {
            loadResource(buildUrl(mods, CSS), CSS);
            cssModules = [];
        }

    });


    /**
     * 扩展ready方法
     */
    Function.prototype.ready = function () {
        ready.call(_,this)
    };

    /**
     * 扩展require方法
     */
    Function.prototype.require = function () {
        var a = arguments, args = slice.call(a), cssM = args[1];
        (IS.isArray(cssM) || IS.isString(cssM)) && (use.apply(_, [].concat([cssM], [null,CSS], slice.call(a,2))) , args.splice(1,1));
        args.splice(1,0,this,JS);
        use.apply(_, args)
    };

    /**
     * 扩展Function，延迟执行
     * @name delay
     * @function
     *
     */
    Function.prototype.delay = function(timeout){
        var m = this, args = slice.call(arguments, 1);
        sT(function() {
            return m.apply(m, args);
        }, timeout || 0);
    };


    /**
     * 在页面中插入 style 标签，设置特定的样式
     * @param cssText {String} 样式字符串
     * @param newStyle {Boolean} 使用新的Style标签添加
     */
    function rules(cssText, newStyle){
        var r = D.createTextNode(cssText),s;
        if(newStyle || !(s = D.getElementsByTagName('style')[0])){
            h.appendChild(s = D.createElement('style'));
            s.type = 'text/css';
        }
        s.styleSheet ? s.styleSheet.cssText += r.nodeValue : s.appendChild(r);
        return s;
    }

    function getTime(){
        return +new Date()
    }

    /**
     * 打印调试日志
     */
    function log(){
        var args = slice.call(arguments), cl;

        try{
            cl = console;
        }catch(e){
            cl = 0;
        }

        /**
         * 获取字符串拼接的前缀 eq abc: 123
         *
         * @param i 对象的键值
         * @param b 为了格式好看，会传入一定数量的空格
         * @returns {string} 拼接好的字符串
         */
        function getPrefix(i, b){
            return (b||'') + (IS.isString(i) ? i + ': ' : '');
        }

        /**
         * 将对象转成字符串
         *
         * @param o 对象
         * @param b 为了格式好看，会传入一定数量的空格
         * @returns {string} 拼接好的字符串
         */
        function getObjectString(o, b){
            var ar = [];
            b = b || '';
            each(o, function(i, v){
                if ( IS.isObject(v) ){
                    ar.push( getPrefix( IS.isNumber(i) ? 'Object' : i, b) + '{\n'+getObjectString(v, b + '    ') + '\n' + b + '}' )
                } else if ( IS.isFunction(v) ) {
                    ar.push( getPrefix(i, b) + getFunctionString(v) )
                } else {
                    ar.push( getPrefix(i, b) + v )
                }
            });
            return ar.join('\n');
        }

        /**
         * 将函数转成字符串
         *
         * @param o 函数
         * @returns {string} 字符串
         */
        function getFunctionString(o){
            return (o = o.toString().match(/^(.*)[\S\s]*\{/)) ? o[1] : '';
        }

        if (cl && cl.log) {
            cl.log.apply(cl, args);
        }else{
            alert( getObjectString(args) )
        }

    }


    /**
     * 公开的方法映射
     */
    _.base = mix(base, {
        ready:ready,
        finish:finishRready,
        load:loadResource,
        use:use,
        rules:rules,
        each:each,
        type:Tp,
        getTime:getTime,
        times:times,
        slice:slice,
        log:log
    });

    /**
     * 数据缓存
     * @type {}
     */
    _.data = {};


    _.undef = U;

    /**
     * 提升对象子集
     */
    mix(_, base);
    mix(_, IS);
    mix(_, link);

    W['J'] = _;

})(window, 'addEventListener,removeEventListener,attachEvent,detachEvent,DOMContentLoaded,onreadystatechange,readyState,complete,load', undefined);
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: logger/logger.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2013/07/26
 *
 */

(function(J){
    var a = '.anjuke', c = 'soj.dev.aifang', cm = '.com', h = J.D.location.host, http = 'http://', isDev = /dev|test/.test(h),
        logUrl = http + ( isDev ? c + cm : 'm' + a + cm ) + '/ts.html',
        sojUrl = http + (isDev ? c + cm : 's' + a + cm) + '/stb',
        s = h.match(/^(\w+)\.(\w+)\./), site = /iPad/.test(J.ua.ua) ? 'pad' : s ? s[1] === 'm' ? 'touch' : s[2] === 'fang' ? 'fang' : 'pc' : 'unknown', eC = encodeURIComponent;

    J.add('logger', {
        site: site,
        logUrl:logUrl,
        sojUrl:sojUrl,
        isDev:isDev,
        autoLogger:true,
        onError:null,
        log: log,
        setBackList: setBackList
    });

    var logger = J.logger, BLACKLIST = ['Player','baiduboxapphomepagetag','onTouchMoveInPage'];


    function getBackList(){
        return BLACKLIST;
    }

    /**
     * 添加黑名单
     * @param list Array|String
     * @param rewrite 重写默认的黑名单
     */
    function setBackList(list, rewrite){
        if(J.isString(list)){
            if(rewrite) return (BLACKLIST = [list]);
            BLACKLIST.push(list);
        }else if(J.isArray(list)){
            if(rewrite) return (BLACKLIST = list);
            BLACKLIST = BLACKLIST.concat(list);
        }
    }

    function log(message, customMessage){
        var m = getEx(message, customMessage);

        if(J.each(getBackList(),
            function(i, v){
                if((new RegExp(v,'g')).test(m)) return false;
            }
        ) == false) return;

        var errorInfo = '?tp=error'
            + '&site=' + site
            + '&v=' + (J.W.PHPVERSION || '')
            + '&msg=' + m;
        new Image().src = logUrl + errorInfo;
        logger.onError && logger.onError(m);
    }

    function getEx(ex, cM){
        cM = cM ? 'Custom:' +cM+ ',' : '';
        if(J.isString(ex)) return cM + ex;
        var m = [];
        J.each(['name','message','description','url','stack','fileName','lineNumber','number','line'], function(i, v){
            if(v in ex){
                if(v == 'stack'){
                    m.push( v + ':' + eC(ex[v].split(/\n/)[0]) )
                }else{
                    m.push( v + ':' + eC(ex[v]) )
                }
            }
        });
        return cM + m.join(',')
    }

    J.W.onerror = function(message, url, line){
        if(J.logger.autoLogger){
            log({
                message:message,
                url:url,
                line:line
            });
        }
    };

})(J);
/**
 * Aifang Javascript Framework.
 * Copyright 2014 ANJUKE Inc. All rights reserved.
 *
 * @path: logger/console.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2013/07/31
 *
 */

try {
    var cl = console;
    if (cl && cl.log) {
        cl.log("%c路有多远，只有心知道，\n最美的旅程，是不断的经历，\n坚持走下去，与梦想者同行！\n", "color:#f60");
        cl.log("请将简历发送至%c jockhu@anjukeinc.com（ 邮件标题：“姓名-应聘XX职位-来自console” ）\n\n", "color:red");
    }
} catch (e) {
};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: site/tracker.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/11/15
 *
 */

/// require('logger.logger');


(function (J) {

    var W = J.W, D = J.D, Logger = J.logger, EventTracker;

    /**
     * AA log && SOJ
     * @param s site
     * @param p page
     * @param u user Cookie Name
     * @returns Tracker Object
     */
    Logger.Tracker = function (s, p, u) {
        var o = {}, getCookie = J.getCookie, m = {
            track:track
        };
        s && (o.site = s);
        p && (o.page = p);
        o.referrer = D.referrer || '';

        J.each('Site Page PageName Referrer Uid Method NGuid NCtid NLiu NSessid NUid Cst CustomParam SendType Screen Href'.split(' '), function (i, v) {
            var a = v.substring(0, 1).toLowerCase() + v.substring(1);
            m['set' + v] = function (v) {
                o[a] = v
            }
        });

        function buildParams() {
            var ret = {
                p:o.page,
                h:o.href || D.location.href,
                r:o.referrer || D.referrer || '',
                sc:o.screen || '{'
                    + '"w":"'+ W.screen.width +'"'
                    + ',"h":"'+ W.screen.height +'"'
                    + ',"r":"'+(W.devicePixelRatio >= 2 ? 1 : 0)+'"'
                    + '}',
                site:o.site || '',
                guid:getCookie(o.nGuid || 'aQQ_ajkguid') || '',
                ctid:getCookie(o.nCtid || 'ctid') || '',
                luid:getCookie(o.nLiu || 'lui') || '',
                ssid:getCookie(o.nSessid || 'sessid') || '',
                uid:u || getCookie(o.nUid || 'ajk_member_id') || '0',
                t:+new Date()
            };
            o.method && (ret.m = o.method);
            (o.cst && /[0-9]{13}/.test(o.cst)) && (ret.lt = ret.t - parseInt(o.cst));
            o.pageName && (ret.pn = o.pageName);
            o.customParam && (ret.cp = o.customParam);
            return ret
        }

        function track(url) {
            var P = buildParams(), sojUrl = url || Logger.sojUrl;
            try{
                if(!o.sendType){
                    var src =sojUrl + (sojUrl.indexOf('?')>-1?'':'?')+ param(P);
                    o.sendType = src.length<2000 ? "get" : "post";
                }
                o.sendType === 'get' ? (new Image().src = (src||(sojUrl + '?' + param(P)))) : J.post({url:sojUrl, type:'jsonp', data:P});
            }catch(e){
                Logger.log(e,'TrackError')
            }
        }

        function param(a) {
            var s = [],encode = encodeURIComponent;
            function add(key, value) {
                s[s.length] = encode(key) + '=' + encode(value);
            }
            for (var j in a)
                add(j, a[j]);
            return s.join("&").replace(/%20/g, "+");
        }

        return m;
    };

    /**
     * @param o.site site
     * @param o.page page
     * @param o.referrer referrer
     * @param o.options options
     */
    Logger.trackEvent = function(o){
        EventTracker = EventTracker || new Logger.Tracker();
        EventTracker.setSendType('get');
        EventTracker.setSite(o.site);
        o.page && EventTracker.setPage(o.page);
        o.href && EventTracker.setHref(o.href);
        o.page && EventTracker.setPageName(o.page);
        o.referrer && EventTracker.setReferrer(o.referrer);
        o.customparam ? EventTracker.setCustomParam(o.customparam) : EventTracker.setCustomParam("");
        EventTracker.track();
    }


})(J);/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 *
 * 这是cookie核心文件，
 *
 *
 * @path: cookie/cookie.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/02/10
 *
 */

(function(J){
    var D = document,
        millisecond = 24 * 60 * 60 * 1000,
        encode = encodeURIComponent,
        decode = decodeURIComponent;

    /**
     * 验证字符串是否合法的cookie值
     *
     * @param {String} val cookie值
     * @return {Boolean} 是否合法的cookie值
     */
    function validString(val){
        return J.isString(val) && '' !== val;
    }

    /**
     * 设置cookie
     *
     * @param {String} name cookie名称
     * @param {String} value cookie值
     * @param {String} date cookie过期时间
     * @param {String} path cookie path
     * @param {String} domain cookie domain
     * @param {String} secure cookie secure
     * @return null
     */
    function setCookie(name, value, date, domain, path, secure){
        D.cookie = decode(name) + "=" + String(encode( value )) +
                ((date) ? ";expires=" + date.toGMTString() : "") +
                ";path=" + (validString(path) ? path : "/") +
                (validString(domain) ? ";domain=" + domain : "" ) +
                ((secure) ? ";secure" : "" );
    }

    var cookie = {
        /**
         * 获取cookie值
         *
         * @param {String} name cookie名称
         * @return {String} cookie值
         */
        getCookie: function (name) {
            var ret = null, m, result;
            if (validString(name)) {
                m = new RegExp("(?:^|)" + decode(name) + "=([^;]*)(?:;|$)",'ig');
                while((result = m.exec(D.cookie)) != null){
                    ret = decode(result[1])||null;
                }
            }
            return ret;
        },
        /**
         * 设置cookie
         *
         * @param {String} name cookie名称
         * @param {String} value cookie值
         * @param {String} expires cookie过期时间 （单位天）
         * @param {String} path cookie path
         * @param {String} domain cookie domain
         * @param {String} secure cookie secure
         * @return null
         */
        setCookie: function(name, value, expires, domain, path, secure) {
            var date = '';
            if (expires) {
                date = new Date();
                date.setTime(date.getTime() + expires * millisecond);
            }
            setCookie(name, value, date, domain, path, secure)
        },
        /**
         * 删除cookie
         *
         * @param {String} name cookie名称
         * @return null
         */
        rmCookie: function(name, domain, path, secure){
            if ( cookie.getCookie( name ) ) D.cookie = decode(name) + "=" +
                ";path=" + (validString(path) ? path : "/") +
                ( ( domain ) ? ";domain=" + domain : "" ) +
                ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        }
    };

    J.add('cookie', cookie);

    J.mix(J, cookie);

})(J);

/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: site/site.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/11/15
 *
 */


J.add('site');/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: utils/utils.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/11/15
 *
 */


J.add('utils');/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: utils/uuid.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2013/09/12
 *
 */

/// require('utils.utils');
(function(J) {
    "use strict";

    function pad(source) {
        return ('00' + source).match(/\d{2}$/)[0]
    }

    function Uuid(sType) {
        sType = sType || 'T';
        var date = new Date(), month = date.getMonth() + 1, date2 = date.getDate(), hours = date.getHours(),
            minutes = date.getMinutes(), d = date.getTime();
        var uuid = ('xxxxxxxx-yxxx-yxxx-yxxx-'+ sType +'xxx').replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/0x3);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return (uuid + pad(month) + pad(date2) + pad(hours) + pad(minutes)).toUpperCase();
    };
    J.utils.uuid = Uuid;
})(J);/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: site/init.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/11/15
 *
 */

/// require('site.site');
/// require('utils.uuid');

(function (J) {
    J.iN = 0;
    var site = J.site, D = J.D,
        expire = 365 * 5,
        location = D.location,
        host = location.host,
        href = location.href,
        isDev = /dev|test/.test(href),
        domain = host.match(/\w+\.\w+$/),
        baseDomain = domain ? domain[0] : 'anjuke.com',
        createGuid = J.utils.uuid,
        setCookie = J.setCookie, getCookie = J.getCookie;

    site.info = {
        pageName:'',
        baseDomain:baseDomain,
        host:host,
        href:href,
        dev:isDev
    };

    /**begin
     * Get domain
     * @param string url.
     *  e.g.: shanghai.anjuke.com or shanghai.yourname.dev.anjuke.com
     * @return string domain. e.g.: anjuke.com or anjuke.test.
     */
    function getDomain(url) {
        return url.match(/\w+.(com|com.cn|cn|org|net|test|html)$/g)[0];
    }

    /**
     * Get host name.
     * @return string hostname.
     *  e.g.: shanghai.anjuke.com or shanghai.yourname.dev.anjuke.com
     */
    function getHostname() {
        var hostname = '';
        // referrer e.g.: http://www.example.com/refer.html or http://www.example.com/
        var referrer = document.referrer;
        try{
            // e.g.: shanghai.anjuke.com
            hostname = window.top.location.hostname;
        }catch(e){
            // e.g.: www.example.com
            hostname = referrer.match(/([0-9a-zA-Z.]+)/g)[1];
        }
        return hostname;
    }

    site.createGuid = createGuid;

    site.init = function(p){
        // check environment before init.
        p = p || {};
        var cks = site.cookies, ckGuid = cks.guid, ckCity = cks.ctid, ckSession = cks.ssid, cityId = p.city_id || '';

        getCookie(ckGuid) || (J.iN = 1, setCookie(ckGuid, createGuid(), expire, baseDomain));
        getCookie(ckSession) || setCookie(ckSession, createGuid(), 0, baseDomain);
        (cityId && (cityId != getCookie(ckCity))) && setCookie(ckCity, cityId, expire, baseDomain);

        site.info.ctid = cityId || getCookie(ckCity);
        p.cityAlias && (site.info.cityAlias = p.cityAlias);
        p.includePrefix && (site.info.includePrefix = p.includePrefix);

        var head = D.head || D.getElementsByTagName( "head" )[0], 
            pageName = head.getAttribute('data-page'),
            pageppc=head.getAttribute("data-ppc"),
            style = head.getAttribute('data-style'),
            soj_random = head.getAttribute('data-sojrandom'),
            rent_search = head.getAttribute('data-kw'),
            sale_php = head.getAttribute("data-soj-php"),
            appVersion=head.getAttribute("app-version");
        if(pageName){
            site.tracked = true;
            site.info.pageName = pageName;

            var userid='';  //房东点击自己的房源不再收费
            if(J.getCookie("ajk_member_id")){
                userid='&userid='+J.getCookie("ajk_member_id");
            }

            //ppc扣费 不可删除
            pageppc && ((new Image()).src = pageppc+userid);

            var soj = {site:'m_anjuke', page:pageName};
            var customparam = {};
            //app增强测试 1弹层3秒
            if (appVersion=="1") {
                customparam.test = 'test_'+pageName+"_0721_a1";
            }else if(appVersion=="0"){
                customparam.test = 'test_'+pageName+"_0721_a0";
            }
            //楼盘单页
            if(pageName=='Xinfang_Loupan_View'){
               if (soj_random=="1") { //新盘回拨样式abtest
                    customparam.test = pageName+"_0319_b";
                }else if(soj_random=="0"){
                    customparam.test = pageName+"_0319_a";
                } 
            }
            if(pageName==="Xinfang_Loupan_List"){
            	customparam.found=head.getAttribute("data-found");
            }
            //楼盘付费用户页面soj
            if (style!="") {
                customparam.style = style;
            }
            //好租列表页联想词
            if (rent_search!="") { //好租列表页搜索
                customparam.kw = rent_search;
            }
            //二手房单页php abtest
            if (sale_php) {
                customparam.test = sale_php;
            }
            //定位成功进入列表页
            var url = location.href;
            if ((url.indexOf("lat")!=-1)&&(url.indexOf("lng")!=-1)&&(url.indexOf("map")==-1)) {
                customparam.locate = "locate";
            }

            soj.customparam = JSON.stringify(customparam);
            J.logger.trackEvent(soj);
        }
        site.setRef();

    };

    /**
     * 为刷新版本返回记录当前的Herf，供历史返回后用作soj referrer
     */
    site.setRef = function(url){
        setCookie('Ref',url||href,expire,baseDomain);
    }

    /**
     * 获取 referrer
     */
    site.getRef = function(){
        return getCookie('Ref')
    }

    // 重写 onError 增加自定义错误监听
    J.logger.onError = function(message){
        J.logger.isDev && alert( decodeURIComponent( (message+'').replace(/,/g,'\n') ));
    }

    site.cookies = {
        ctid:'ctid',
        guid:'aQQ_ajkguid',
        ssid:'sessid'
    };
})(J);
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: string/trim.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/24
 *
 */


/**
 * 删除目标字符串两端的空白字符
 *
 * @param {string} source 目标字符串
 * @returns {string} 删除两端空白字符后的字符串
 *
 */
String.prototype.trim = function () {
    return this.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g,'');
};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: dom/dom.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/23
 *
 */

/// require('string.trim');

/**
 * @namespace J.dom
 */

/**
 * change log
 *
 * @version: 1.0.1 By Jock
 * 2014.7.23
 * J.g('id') 所有扩展的方法做了容错处理，哪怕ID不存在也不会有问题
 * J.s('.abc') 扩展了所有单个元素的方法，解决了以前只可以通过 each 使用
 *
 * 2014.08.28
 * setStyle 增加2个参数的用法支持， .setStyle(color,red)
 *
 *
 */


(function (J, W, D) {

    var undef = J.undef, fn = {
        show: function () {
            this.get().style.display = '';
            return this
        },

        hide: function () {
            this.get().style.display = 'none';
            return this
        },

        visible: function () {
            return this.get().style.display != 'none';
        },

        remove: function () {
            var element = this.get();
            element.parentNode && element.parentNode.removeChild(element);
            return this
        },

        attr: function (key, value) {
            var element = this.get();
            if(!element) return arguments.length <= 1 ? undef : this;

            if ('style' === key) {
                if (U(value)) return element.style.cssText; else element.style.cssText = value;
                return this;
            }
            key = Fix_ATTS[key] || key;
            if (J.isString(key))
                if (U(value)) return element.getAttribute(key); else (value === null) ? this.removeAttr(key) : element.setAttribute(key, value);
            else {
                for (var k in key) {
                    this.attr(k, key[k]);
                }
            }
            return this;
        },

        /**
         * 移除属性
         * @param key
         */
        removeAttr: function (key) {
            this.get().removeAttribute(key);
            return this;
        },

        /**
         * 为元素添加className
         * @param className
         * @return this
         */
        addClass: function (className) {
            var element = this.get();
            if (!this.hasClass(className))
                element.className += (element.className ? ' ' : '') + className;
            return this;
        },

        /**
         * 移除目标元素的className
         * @param className
         * @return this
         */
        removeClass: function (className) {
            var element = this.get();
            element.className = element.className.replace(
                new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').trim();
            return this;
        },

        /**
         * 判断元素是否拥有指定的className
         * @param className
         * @return {Boolean}
         */
        hasClass: function (className) {
            var element = this.get();
            var elementClassName = element.className;
            return (elementClassName.length > 0 && (elementClassName == className ||
                new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
        },

        /**
         * 获取样式
         * @param style
         * @returns {*}
         */
        getStyle: function (style) {
            var element = this.get(), css;
            style = style == float ? cssFloat : style;
            var value = element.style[style];
            if (!value || value == 'auto') {
                if (J.ua.ie) {
                    css = element.currentStyle; //use currentStyle to get real style for ie
                } else {
                    css = D.defaultView.getComputedStyle(element, null);
                }
                value = css ? css[style] : null;
            }
            if (style == opacity) return value ? parseFloat(value) : 1.0;
            return value == 'auto' ? null : value;
        },

        /**
         * 设置样式
         * @param style "color:#ccc; background:#fff" | {color:"#ccc",background:"#fff"} | color
         * @param value "red"
         * @returns {dom}
         */
        setStyle: function (style, value) {
            var element = this.get(), elementStyle = element.style, argumentsLength = arguments.length;
            if( argumentsLength === 2 ){
                elementStyle.cssText += ';' + style + ':' + value;
            }else if (J.isString(style)) {
                elementStyle.cssText += ';' + style;
                style.indexOf(opacity) > 0 && this.setOpacity(style.match(/opacity:\s*(\d?\.?\d*)/)[1]);
            }
            for (var property in style)
                if (property == opacity) this.setOpacity(style[property]);
                else
                    elementStyle[(property == float || property == cssFloat) ?
                        (elementStyle.styleFloat ? 'styleFloat' : cssFloat) :
                        property] = style[property];

            return this;
        },

        getOpacity: function () {
            return this.getStyle(opacity);
        },

        setOpacity: function (value) {
            this.get().style.opacity = (value == 1 || value === '') ? '' : (value < 0.00001) ? 0 : value;
            return this;
        },

        append: function (element) {
            this.get().appendChild(element.nodeType === 1 ? element : element.get());
            return this;
        },

        appendTo: function (element) {
            g(element).append(this.get());
            return this;
        },

        html: function (value) {
            var element = this.get(), argumentsLength = arguments.length;
            if(!element) return argumentsLength === 0 ? undef : this;

            if (argumentsLength > 0) {
                if (value && value.nodeType === 1)
                    return this.append(value)
                element.innerHTML = value;
                return this;
            }
            return element.innerHTML;
        },

        val: function (value) {
            var element = this.get(), argumentsLength = arguments.length, V;
            if(!element) return argumentsLength === 0 ? undef : this;

            V = valFix[element.tagName.toLowerCase() || element.type];
            V = V ? V(element, value) : undef;
            return (argumentsLength === 0) ? V : this;
        },

        s: function(selector){
            return s(selector, this.get())
        },

        get: function (index) {
            var index = index || 0, elm = this[index];
            return elm;
        },

        width: function () {
            return getWH(this).width
        },

        height: function () {
            return getWH(this).height
        },

        offset: function () {
            var target = this.get();
            if (target && J.isUndefined(target.offsetLeft)) {
                target = target.parentNode;
            }
            var pageCoord = (function (element) {
                var coord = {
                    x: 0,
                    y: 0
                };
                while (element) {
                    coord.x += element.offsetLeft;
                    coord.y += element.offsetTop;
                    element = element.offsetParent;
                }
                return coord;
            })(target);
            return {
                x: pageCoord.x,
                y: pageCoord.y
            };
        },

        /**
         * 将目标元素添加到基准元素之后
         * @param element 插入的元素
         */
        insertAfter: function (element) {
            var self = this.get(), parent = self.parentNode;
            if (parent) {
                parent.insertBefore(element.nodeType === 1 ? element : element.get(), self.nextSibling);
            }
            return this;
        },

        /**
         * 将目标元素添加到基准元素之前
         * @param element 插入的元素
         */
        insertBefore: function (element) {
            var self = this.get(), parent = self.parentNode;
            if (parent) {
                parent.insertBefore(element.nodeType === 1 ? element : element.get(), self);
            }
            return this;
        },

        /**
         * 将目标元素添加到基准元素第一个子节点之前
         * @param element 插入的元素
         */
        insertFirst: function (element) {
            var first = this.first();
            first ? first.insertBefore(element) : this.append(element);
            return this;
        },

        insertFirstTo: function (element) {
            getRealElement(element).insertFirst(this.get());
            return this;
        },

        /**
         * 将目标元素添加到基准元素最后一个子节点之后
         * @param element 插入的元素
         */
        insertLast: function (element) {
            return this.append(element)
        },

        /**
         * 获取目标元素的第一个元素节点
         */
        first: function () {
            return matchNode(this, 'nextSibling', 'firstChild');
        },

        /**
         * 获取目标元素的最后一个元素节点
         */
        last: function () {
            return matchNode(this, 'previousSibling', 'lastChild');
        },

        /**
         * 获取目标元素的下一个兄弟元素节点
         */
        next: function () {
            return matchNode(this, 'nextSibling', 'nextSibling');
        },

        /**
         * 获取目标元素的上一个兄弟元素节点
         */
        prev: function () {
            return matchNode(this, 'previousSibling', 'previousSibling');
        },

        /**
         *
         * @param expression '.className' | 'tagName' | '.className tagName'
         * @return {DOMObject}
         */
        up: function (expression) {
            var element = this.get();
            if (arguments.length == 0) return dom(element.parentNode);
            var i = 0, isNumber = J.isNumber(expression), R;
            isNumber || (R = expression.match(/^(\.)?(\w+)$/));
            while (element = element['parentNode']) {
                if (element.nodeType == 1)
                    if (isNumber && i == expression) return g(element);
                    else if (R && ((R[1] && R[2] == element.className) || R[2].toUpperCase() == element.tagName)) return g(element);
                i++;
            }
            return fnExtNull(this);
        },

        /**
         *
         * @param expression '.className' | 'tagName' | '.className tagName'
         * @return {DOMObject}
         */
        down: function (expression) {
            var element = this.get();
            if (arguments.length === 0 || expression === 0) return this.first();
            return J.isNumber(expression) ? s('*', element).eq(expression) : s(expression, element);
        },

        /**
         * 提交表单
         */
        submit: function () {
            this.get().submit();
        },

        eq: eq,

        empty: function () {
            return this.html('');
        },

        each: each,

        length: 0,
        splice: [].splice
    };

    function eq(i) {
        i = i || 0;
        var item = this[ i === -1 ? this.length - 1 : i ];
        return item ? g(item) : fnExtNull();
    }

    function each(callback) {
        var i = 0, length = this.length;
        for (; i < length;) {
            if (callback.call( g( this[ i ] ), i, g( this[ i++ ]) ) === false) {
                break;
            }
        }
        return this;
    }

    function g(id) {
        var domElm = new elem(id);
        !domElm.length && fnExtNull(domElm);
        return domElm
    }

    function s(selector, element) {
        var domElms = new select(selector, element);
        return (domElms.length ? fnExt : fnExtNull)(domElms);
    }

    /**
     * 空方法重写
     * @param domElm
     * @return {*}
     */
    function fnExtNull(domElm){
        domElm = domElm || g();
        for(var f in fn){
            (f !== 'length' && f !== 'get' && f !== 'val' && f !== 'html' && f !== 'attr') && (domElm[f] = function () {
                return domElm;
            });
        }
        return domElm
    }

    /**
     * 空方法重写
     * @param domElms
     * @return {*}
     */
    function fnExt(domElms){
        for(var f in fn){
            (function(f){
                (f !== 'length' && f !== 'get' && f !== 'eq' && f !== 's' && f !== 'each') && (domElms[f] = function () {
                    var i = 0, length = domElms.length;
                    for (; i < length;) {
                        g( domElms[i] )[f].apply(domElms[i++], arguments);
                    }
                    return domElms;
                })
            })(f);
        }
        return domElms
    }

    function elem(id) {
        var selector = id;
        if (id === "body" && D.body) {
            this[0] = D.body;
            this.length = 1;
            this.selector = selector;
            return this
        }

        if (id instanceof elem) {
            return id
        }

        if (id = ( id && id.nodeType ) ? id : D.getElementById(id)) {
            this[0] = id;
            this.length = 1;
        }
        this.selector = selector;
        return this;
    }

    var T = 'getElementsByTagName', C = 'getElementsByClassName', dom = g, float = 'float', cssFloat = 'cssFloat', opacity = 'opacity', U = J.isUndefined,

        Fix_ATTS = (function () {
            var result = {};
            if (J.ua.ie < 8) {
                result['for'] = 'htmlFor';
                result['class'] = 'className';
            } else {
                result['htmlFor'] = 'for';
                result['className'] = 'class';
            }
            return result;
        })(),

        valFix = (function () {
            function input(element, value) {
                switch (element.type.toLowerCase()) {
                    case 'checkbox':
                    case 'radio':
                        return inputSelector(element, value);
                    default:
                        return valueSelector(element, value);
                }
            }

            function inputSelector(element, value) {
                if (U(value))  return element.checked ? element.value : null;
                else element.checked = !!value;
            }

            function valueSelector(element, value) {
                if (U(value)) return element.value; else element.value = value;
            }

            function select(element, value) {
                if (U(value))
                    return selectOne(element);
            }

            function selectOne(element) {
                var index = element.selectedIndex;
                return index >= 0 ? optionValue(element.options[index]) : null;
            }

            function optionValue(opt) {
                return (!U(opt['value'])) ? opt.value : opt.text;
            }

            return {
                input: input,
                textarea: valueSelector,
                select: select,
                button: valueSelector
            };
        })();


    elem.prototype = fn;

    J.mix(dom, {
        dom: dom,
        create: create,
        fn: fn,
        s: s,
        g: g
    });

    function getRealElement(element) {
        return J.isString(element) ? dom(element) : element
    }

    function matchNode(element, direction, start) {
        for (var node = element.get()[start]; node; node = node[direction]) {
            if (node.nodeType == 1) {
                return g(node);
            }
        }
        return fnExtNull(element);
    }

    function getWH(element) {
        var el = element.get();

        if (element.visible()) {
            return { width: el.offsetWidth, height: el.offsetHeight }
        }

        var sty = el.style, stys, wh, ostys = {
            visibility: sty.visibility,
            position: sty.position,
            display: sty.display
        };

        stys = {
            visibility: 'hidden',
            display: 'block'
        };
        if (ostys.position !== 'fixed')
            stys.position = 'absolute';

        element.setStyle(stys);

        wh = {
            width: el.offsetWidth,
            height: el.offsetHeight
        };

        element.setStyle(ostys);

        return wh;
    }

    function create(tagName, attributes) {
        var el = D.createElement(tagName), jEl = dom(el);
        return (U(attributes)) ? jEl : jEl.attr(attributes);
    }

    /**
     * class 选择器查询
     * @param selector '.className' | 'tagName' | '.className tagName'
     * @param element content | null
     * @return []
     */
    function select(selector, element) {
        this.selector = selector;
        // J.sizzle
        if (J.sizzle) return merge(this, J.sizzle(selector, element));

        var match = selector ? selector.match(/^(\.)?(\w+)(\s(\w+))?/) : null, result = [], len, i, elements, node, tagName;
        element = element || D;

        // div       -> [  "div"  ,   undefined  ,   "div"  ,   undefined  ,   undefined  ]
        // .ttt      -> [  ".ttt"  ,   "."  ,   "ttt"  ,   undefined  ,   undefined  ]
        // .ttt span -> [  ".ttt span"  ,   "."  ,   "ttt"  ,   " span"  ,   "span"  ]
        if (match && match[1]) {
            // 初始化tagName参数
            tagName = match[4] ? match[4].toUpperCase() : '';
            // 查询元素, 如果支持getElementsByClassName
            if (element[C]) {
                elements = element[C](match[2]);
                len = elements.length;
                for (i = 0; i < len; i++) {
                    node = elements[i];
                    if (tagName && node.tagName != tagName) {
                        continue;
                    }
                    result.push(node);
                }
            } else {
                var className = new RegExp("(^|\\s)" + match[2] + "(\\s|$)");
                elements = tagName ? element[T](tagName) : (element.all || element[T]("*"));
                len = elements.length;
                for (i = 0; i < len; i++) {
                    node = elements[i];
                    className.test(node.className) && result.push(node);
                }
            }
        } else {
            result = element[T](selector)
        }

        return merge(this, result)

    }

    select.prototype = {
        /*
         在新的版本中已经被重写
         each: each,
         get: function (i) {
         return this.eq(i);
         },
         eq: function (i) {
         var i = i || 0;
         return this[ i === -1 ? this.length - 1 : i ];
         },*/
        each: each,
        s: function(selector){
            return s(selector, this.eq().get())
        },
        eq: eq,
        length: 0,
        splice: [].splice
    };


    function merge(first, second){
        var i = first.length, l, j = 0;
        for ( l = second.length; j < l; j++ ) {
            first[ i++ ] = g(second[ j ]);
        }
        first.length = i;
    }

    J.mix(J, {
        dom: dom,
        create: create,
        s: s,
        g: g
    });

})(J, window, document);
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/event.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 *
 *
 *
 */

/**
 *
KEY_BACKSPACE:8,
KEY_TAB:9,
KEY_RETURN:13,
KEY_ESC:27,
KEY_LEFT:37,
KEY_UP:38,
KEY_RIGHT:39,
KEY_DOWN:40,
KEY_DELETE:46,
KEY_HOME:36,
KEY_END:35,
KEY_PAGEUP:33,
KEY_PAGEDOWN:34,
KEY_INSERT:45,
 */

(function (J, W, D) {

    J.add('event', {
        DA:'dataavailable',
        LO:'losecapture',
        ME:'mouseenter',
        ML:'mouseleave',
        CACHE:[],
        fix:getResponder,
        fixName:fixEventName,
        getKeyCode:function (event) {
            return event.which || event.keyCode;
        },
        g:function(element){
            return (!element) ? '' : J.isString(element) ? D.getElementById(element) : (element && (element === W || element === D || (element.nodeType && element.nodeType === 1))) ? element : element.get(0);
        }
    });

    var E = J.event, dom = J.dom, ME = E.ME, ML = E.ML, U= 'unload', docEl = D.documentElement, isIE = J.ua.ie;
    E.MMES = 'on'+ ME in docEl && 'on'+ ML in docEl;

    dom && dom.fn && J.each('on un once fire'.split(' '), function(i, v){
        dom.fn[v] = function(){
            E[v].apply(null, [this.get()].concat(J.slice.call(arguments)));
            return this;
        }
    });

    function extend(event, element, data, preventDefault, stopPropagation) {
        if (!event) return false;
        var d = 'preventDefault',p = 'stopPropagation',c = 'currentTarget';

        event[c] || (event[c] = element);
        event[d] || (event[d] = function () {
            event.returnValue = false;
        });
        event[p] || (event[p] = function () {
            event.cancelBubble = true;
        });
        event.stop = function () {
            event[d]();
            event[p]()
        };

        if (preventDefault) event[d]();
        if (stopPropagation) event[p]();

        return event;
    }

    function getResponder(element, type, handler, data, preventDefault, stopPropagation) {
        return function (event) {
            if (type.indexOf(':') > -1 && event && event.eventName !== type) return false;
            if (!E.MMES && (type === ME || type === ML)) {
                var a = event.currentTarget || element, b = event.relatedTarget;
                //火狐支持compareDocumentPosition(), 其他浏览器支持 contains();
                if (!(a != b && !(a.contains ? a.contains(b) : !!(a.compareDocumentPosition(b) & 16) ))) return false;
            }
            extend(event, element, data, preventDefault, stopPropagation);
            handler.call(element, event, data);
        };
    }

    function fixEventName(e) {
        var translations = { mouseenter:"mouseover", mouseleave:"mouseout" };
        return (translations[e] || e);
    }

    // 释放内存，防止造成内存泄漏
    if (isIE)
        W.attachEvent('on'+U, function(){
            var e, E = J.event, a = E.CACHE, l = a.length, dE = 'detachEvent';
            while (l--) {
                e = a[l];
                e.e[dE]('on' + e.t, e.r, false);
                if (e.t.indexOf(':') > -1) {
                    e.e[dE]("on"+ E.DA, e.r);
                    e.e[dE]("on"+ E.LO, e.r);
                }
                a.splice(l, 1);
            }
        });
    // else
    //     W.addEventListener(U, function () {}, false);

})(J, window, document);
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/fire.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */

/// require('event.event');

/**
 * 触发已经注册的事件。
 * @name J.event.fire
 * @function
 * @grammar J.fire(element, type, [,data [,bubble]])
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Object} data 需要传递的数据 ，通过 event.data 获取
 * @param {Boolean} bubble || true 是否冒泡
 *
 * @shortcut fire
 * @meta standard
 *
 * @returns {Event}
 */
J.fire = J.event.fire = function(element, type, data, bubble) {

    var event, E = J.event, DA = E.DA, LO = E.LO, D = document;

    if( !(element = E.g(element)) ) return false;

    bubble = bubble || true;

    if (element == D && D.createEvent && !element.dispatchEvent)
        element = D.documentElement;


    if (D.createEvent) {
        event = D.createEvent('HTMLEvents');
        event.initEvent(DA, bubble, true);
    } else {
        event = D.createEventObject();
        event.eventType = bubble ? 'on'+DA : 'on'+LO;
    }

    event.eventName = type;
    event.data = data || { };

    if (D.createEvent)
        element.dispatchEvent(event); else
        element.fireEvent(event.eventType, event);

    return event;
};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/getPageX.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/31
 *
 */


/**
 * 获取鼠标事件的鼠标x坐标
 * @name J.event.getPageX
 * @function
 * @grammar J.event.getPageX(event)
 * @param {Event} event 事件对象
 *
 * @returns {number} 鼠标事件的鼠标x坐标
 */
J.event.getPageX = function (event) {
    var doc = document, docEl = doc.documentElement,  body = doc.body || { scrollLeft:0 };
    return event.pageX || (event.clientX + (docEl.scrollLeft || body.scrollLeft) - (docEl.clientLeft || 0));
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/getPageY.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/31
 *
 */


/**
 * 获取鼠标事件的鼠标y坐标
 * @name J.event.getPageY
 * @function
 * @grammar J.event.getPageY(event)
 * @param {Event} event 事件对象
 *
 * @returns {number} 鼠标事件的鼠标y坐标
 */
J.event.getPageY = function (event) {
    var doc = document, docEl = doc.documentElement, body = doc.body || { scrollTop:0 };
    return  event.pageY || (event.clientY + (docEl.scrollTop || body.scrollTop) - (docEl.clientTop || 0));
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/on.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');

/**
 * 为目标元素添加事件监听器
 * @name J.event.on
 * @function
 * @grammar J.on(element, type, handler [,data [,preventDefault [,stopPropagation]]])
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要添加的监听器
 * @param {Object} data 需要传递的数据 ，通过 event.data 获取
 * @param {Boolean} preventDefault 阻止事件默认行为
 * @param {Boolean} stopPropagation 停止事件冒泡
 *
 * @shortcut on
 * @meta standard
 * @see J.event.un
 *
 * @returns {HTMLElement|window} 目标元素
 */

J.on = J.event.on = function (element, type, handler, data, preventDefault, stopPropagation) {

    var E = J.event, a = E.CACHE, responder, isFire = type.indexOf(':') > -1, aD = 'addEventListener', aT = 'attachEvent', DA = E.DA, LO = E.LO;

    if( !(element = E.g(element)) ) return false;

    responder = E.fix(element, type, handler, data, preventDefault, stopPropagation);

    if (!E.MMES) type = E.fixName(type);

    if (element[aD])
        element[aD](isFire ? DA : type, responder, false); else {
        if (isFire) {
            element[aT]("on" + DA, responder);
            element[aT]("on" + LO, responder);
        } else element[aT]("on" + type, responder);
    }

    a.push({
        e:element,
        t:type,
        h:handler,
        r:responder
    });

    return element;
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/un.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');


/**
 * 为目标元素移除事件监听器
 * @name J.event.un
 * @function
 * @grammar J.un(element, type, handler)
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要移除的监听器
 *
 * @shortcut un
 * @meta standard
 * @see J.event.on
 *
 * @returns {HTMLElement|window} 目标元素
 */

J.un = J.event.un = function (element, type, handler) {

    var E = J.event, a = E.CACHE,  DA = E.DA, LO = E.LO, l = a.length, e, elmAll = !type, typeAll = !handler, isFire , rE = 'removeEventListener', dT = 'detachEvent';

    if( !(element = E.g(element)) ) return false;

    element = E.g(element);

    if (!E.MMES && !type) {
        type = E.fixName(type);
    }

    while (l--) {
        e = a[l];
        if (e.e == element && (elmAll || e.t == type) && (typeAll || e.h == handler)) {
            isFire = e.t.indexOf(':') > -1;
            if (element[rE])
                element[rE](isFire ? DA : (type || e.t), e.r, false); else {
                if (isFire) {
                    element[dT]("on"+DA, e.r);
                    element[dT]("on"+LO, e.r);
                } else element[dT]("on" + (type || e.t), e.r);
            }
            a.splice(l, 1);
        }

    }

    return element;

};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/once.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');
/// require('event.on');
/// require('event.un');

/**
 * 为目标元素添加一次事件绑定
 * @name J.event.once
 * @function
 * @grammar J.once(element, type, handler)
 * @param {HTMLElement|string} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要添加的监听器
 * @see J.event.un,J.event.on
 *             
 * @returns {HTMLElement} 目标元素
 */
J.once = J.event.once = function(element, type, handler){
    function onceListener(event){
        handler.call(element,event);
        J.event.un(element, type, onceListener);
    } 
    J.event.on(element, type, onceListener);
    return element;
};
