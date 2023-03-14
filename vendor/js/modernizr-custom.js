/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-arrow-es6array-es6object-es6string-setclasses !*/
! function(window, document, undefined) {
    function is(e, r) { return typeof e === r }

    function testRunner() {
        var e, r, n, o, t, s, i;
        for (var a in tests)
            if (tests.hasOwnProperty(a)) {
                if (e = [], r = tests[a], r.name && (e.push(r.name.toLowerCase()), r.options && r.options.aliases && r.options.aliases.length))
                    for (n = 0; n < r.options.aliases.length; n++) e.push(r.options.aliases[n].toLowerCase());
                for (o = is(r.fn, "function") ? r.fn() : r.fn, t = 0; t < e.length; t++) s = e[t], i = s.split("."), 1 === i.length ? Modernizr[i[0]] = o : (!Modernizr[i[0]] || Modernizr[i[0]] instanceof Boolean || (Modernizr[i[0]] = new Boolean(Modernizr[i[0]])), Modernizr[i[0]][i[1]] = o), classes.push((o ? "" : "no-") + i.join("-"))
            }
    }

    function setClasses(e) {
        var r = docElement.className,
            n = Modernizr._config.classPrefix || "";
        if (isSVG && (r = r.baseVal), Modernizr._config.enableJSClass) {
            var o = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
            r = r.replace(o, "$1" + n + "js$2")
        }
        Modernizr._config.enableClasses && (r += " " + n + e.join(" " + n), isSVG ? docElement.className.baseVal = r : docElement.className = r)
    }
    var classes = [],
        tests = [],
        ModernizrProto = {
            _version: "3.6.0",
            _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
            _q: [],
            on: function(e, r) {
                var n = this;
                setTimeout(function() { r(n[e]) }, 0)
            },
            addTest: function(e, r, n) { tests.push({ name: e, fn: r, options: n }) },
            addAsyncTest: function(e) { tests.push({ name: null, fn: e }) }
        },
        Modernizr = function() {};
    Modernizr.prototype = ModernizrProto, Modernizr = new Modernizr, Modernizr.addTest("es6array", !!(Array.prototype && Array.prototype.copyWithin && Array.prototype.fill && Array.prototype.find && Array.prototype.findIndex && Array.prototype.keys && Array.prototype.entries && Array.prototype.values && Array.from && Array.of)), Modernizr.addTest("arrow", function() { try { eval("()=>{}") } catch (e) { return !1 } return !0 }), Modernizr.addTest("es6object", !!(Object.assign && Object.is && Object.setPrototypeOf)), Modernizr.addTest("es6string", !!(String.fromCodePoint && String.raw && String.prototype.codePointAt && String.prototype.repeat && String.prototype.startsWith && String.prototype.endsWith && String.prototype.includes));
    var docElement = document.documentElement,
        isSVG = "svg" === docElement.nodeName.toLowerCase();
    testRunner(), setClasses(classes), delete ModernizrProto.addTest, delete ModernizrProto.addAsyncTest;
    for (var i = 0; i < Modernizr._q.length; i++) Modernizr._q[i]();
    window.Modernizr = Modernizr
}(window, document);