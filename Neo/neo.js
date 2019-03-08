'use strict';

// ---------------------
// UIL PANEL COMPONENTS
// ---------------------
var UMC = UMC || function () {
    var a = document,
        b = a.getElementsByTagName("head")[0],
        c = "height width top left bottom right margin-left margin-right margin-top margin-bottom".split(" "),
        d = "pattern defs transform stop animate radialGradient linearGradient animateMotion".split(" "),
        e = "rect circle path polygon text g line foreignObject".split(" "),
        f = a.createDocumentFragment();
    UMC = function () { };
    UMC.frag = function () {
        return f
    };
    UMC.setSvg = function (a, b, c, d) {
        -1 === d ? a.setAttributeNS(null, b, c) : a.childNodes[d ||

            0].setAttributeNS(null, b, c)
    };
    UMC.setDom = function (a, b, d) {
        var e = -1 !== c.indexOf(b) ? "px" : "";
        a.style[b] = d + e
    };
    UMC.clear = function (a) {
        for (UMC.purge(a); a.firstChild;) a.firstChild.firstChild && UMC.clear(a.firstChild), a.removeChild(a.firstChild)
    };
    UMC.purge = function (a) {
        var b = a.attributes,
            c, d;
        if (b)
            for (c = b.length; c--;) d = b[c].name, "function" === typeof a[d] && (a[d] = null);
        if (b = a.childNodes)
            for (c = b.length; c--;) UMC.purge(a.childNodes[c])
    };
    UMC.dom = function (b, c, k, f, l, n) {
        c = c || "div"; - 1 !== d.indexOf(c) || -1 !== e.indexOf(c) ? (void 0 ===

            l && (l = a.createElementNS("http://www.w3.org/2000/svg", "svg")), UMC.add(l, c, f, n)) : l = void 0 === l ? a.createElementNS("http://www.w3.org/1999/xhtml", c) : l.appendChild(a.createElementNS("http://www.w3.org/1999/xhtml", c));
        b && l.setAttribute("class", b);
        k && (l.style.cssText = k);
        return void 0 === n ? l : l.childNodes[n || 0]
    };
    UMC.cc = function (c, d, e) {
        e = void 0 === e ? "." : "";
        "*" === c && (e = "");
        var f = a.createElement("style");
        f.type = "text/css";
        b.appendChild(f);
        (f.sheet || {}).insertRule ? f.sheet.insertRule(e + c + "{" + d + "}", 0) : (f.styleSheet ||

            f.sheet).addRule(e + c, d)
    };
    UMC.clone = function (a, b) {
        void 0 === b && (b = !0);
        return a.cloneNode(b)
    };
    UMC.add = function (a, b, c, d) {
        var f = document.createElementNS("http://www.w3.org/2000/svg", b);
        this.set(f, c);
        this.get(a, d).appendChild(f); - 1 !== e.indexOf(b) && (f.style.pointerEvents = "none");
        return f
    };
    UMC.set = function (a, b) {
        for (var c in b) "txt" === c && (a.textContent = b[c]), a.setAttributeNS(null, c, b[c])
    };
    UMC.get = function (a, b) {
        if (void 0 === b) return a;
        if (!isNaN(b)) return a.childNodes[b];
        if (b instanceof Array) {
            if (2 === b.length) return a.childNodes[b[0]].childNodes[b[1]];

            if (3 === b.length) return a.childNodes[b[0]].childNodes[b[1]].childNodes[b[2]]
        }
    };
    return UMC
}();
var define, module, exports, UIL = function () {
    UIL = function () { };
    UIL.REVISION = 0.96;
    UIL.main = null;
    UIL.DEF = !1;
    UIL.WIDTH = 300;
    UIL.P = 30;
    UIL.UNS = "-o-user-select:none; -ms-user-select:none; -khtml-user-select:none; -webkit-user-select:none; -moz-user-select:none;";
    UIL.TXT = 'font-family:"Lucida Console", Monaco, monospace; font-size:11px; color:#CCC; padding:2px 10px; left:0; top:2px; height:16px; width:100px; overflow:hidden; white-space: nowrap;';
    UIL.frag = UMC.frag;
    UIL.DOM = UMC.dom;
    UIL.CC = UMC.cc;
    UIL.clear = UMC.clear;

    UIL.setSvg = UMC.setSvg;
    UIL.listens = [];
    UIL.COLOR = "N";
    UIL.BASECOLOR = "#C0C0C0";
    UIL.SELECT = "#035fcf";
    UIL.MOVING = "#03afff";
    UIL.SELECTDOWN = "#024699";
    UIL.SVGB = "rgba(0,0,0,0.3)";
    UIL.SVGC = "rgba(120,120,120,0.6)";
    UIL.Border = "#4f4f4f";
    UIL.BorderSelect = UIL.SELECT;
    UIL.PNG = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA";
    UIL.PNGP = "oAAAAKAgMAAADwXCcuAAAACVBMVEVMaXHi4uLi4uLDusitAAAAAnRSTlMAgJsrThgAAAA";
    UIL.GroupBG = UIL.PNG + "MAAAADAQMAAABs5if8AAAABlBMVEVMaXH///+a4ocPAAAAAnRSTlMAM8lDrC4AAAAOSURBVHicY2BgcGBgAAAAxgBBOTEMSwAAAABJRU5ErkJggg==)";

    UIL.SlideBG = UIL.PNG + "UAAAAFAQMAAAC3obSmAAAABlBMVEVMaXH///+a4ocPAAAAAnRSTlMAM8lDrC4AAAASSURBVHicY3BgaGDgYBBgUAAABkIA+fbHMRYAAAAASUVORK5CYII=)";
    UIL.SlideBG_NN = UIL.PNG + "UAAAAFCAYAAACNbyblAAAALElEQVQImV3MsQ0AIAwDwUsmYTRGyeg0SAi7eekKF8bbwu4ETCdAJ0Ddfr8H+wEEqTj7jz0AAAAASUVORK5CYII=)";
    UIL.F0 = UIL.PNG + UIL.PNGP + "kSURBVHicY2BkYGBgc2BgYJwAZKSwMDBIckIwkA0SA8sxMAAAN24CxaaVoKMAAAAASUVORK5CYII=)";
    UIL.F1 = UIL.PNG + UIL.PNGP + "kSURBVHicY2CAAgEGB4YUxokMkmxuDGyRnAyMS1gYGAJgsgwAPlADDRCT8ZwAAAAASUVORK5CYII=)";
    UIL.X0 = UIL.PNG +

        UIL.PNGP + "lSURBVHicYxBgcGBIYZzIIMnmxsAWycnAuIQFjEFskBhIDqgGAGxoBXlOWpMvAAAAAElFTkSuQmCC)";
    UIL.classDefine = function () {
        UIL.CC("UIL", UIL.UNS + " position:absolute; pointer-events:none; box-sizing:border-box; margin:0; padding:0; border:none; overflow:hidden; background:none;");
        UIL.CC("UIL.text", UIL.TXT);
        UIL.CC("UIL.number", UIL.TXT + "letter-spacing:-1px; padding:2px 5px;");
        UIL.CC("UIL.textSelect", UIL.TXT + "pointer-events:auto; padding:2px 5px; outline:none; -webkit-appearance:none; -moz-appearance:none; border:1px dashed " +

            UIL.Border + "; -ms-user-select:element;");
        UIL.CC("UIL.listItem", "position:relative; background:rgba(0,0,0,0.2); margin-bottom:1px; pointer-events:auto; cursor:pointer;" + UIL.TXT);
        UIL.CC("UIL.listItem:hover", "background:" + UIL.SELECT + "; color:#FFFFFF;")
    };
    UIL.classDefine();
    return UIL
}();
(function (a) {
    "function" === typeof define && define.amd ? define("uil", UIL) : "undefined" !== typeof exports && "undefined" !== typeof module ? module.exports = UIL : a.UIL = UIL
})(this);

UIL.add = function () {
    var a = arguments,
        b, c, d = !1;
    "string" === typeof a[0] ? (b = a[0][0].toUpperCase() + a[0].slice(1), c = a[1] || {}) : "object" === typeof a[0] && (d = !0, void 0 === a[2] && [].push.call(a, {}), b = UIL.autoType.apply(this, a), c = a[2], c.name = a[1], c.value = a[0][a[1]]);
    b = new UIL[b](c);
    d && b.setReferency(a[0], a[1]);
    return b
};
UIL.autoType = function () {
    var a = arguments,
        b = "Slide";
    a[2].type && (b = a[2].type);
    return b
};
UIL.update = function () {
    for (var a = UIL.listens.length; a--;) UIL.listens[a].listening()
};
UIL.bgcolor = function (a, b, c) {
    var d = 44,
        e = 44,
        f = 44;
    b = b || 0.66;
    if (a) switch (a) {
        case "r":
        case "R":
        case "S":
            d = 160;
            f = 68;
            break;
        case "g":
        case "G":
        case "E":
            e = 120;
            f = 68;
            break;
        case "b":
        case "B":
        case "T":
            f = 120;
            e = 68;
            break;
        case "no":
        case "NO":
            b = 0
    }
    c && (d -= 20, e -= 20, f -= 20);
    a = "rgba(" + d + "," + e + "," + f + "," + b + ")";
    0 === b && (a = "none");
    return a
};
UIL.ColorLuma = function (a, b) {
    a = String(a).replace(/[^0-9a-f]/gi, "");
    6 > a.length && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]);
    b = b || 0;
    var c = "#",
        d, e;
    for (e = 0; 3 > e; e++) d = parseInt(a.substr(2 * e, 2), 16), d = Math.round(Math.min(Math.max(0, d + d * b), 255)).toString(16), c += ("00" + d).substr(d.length);
    return c
};
UIL.findDeepInver = function (a) {
    return 0.6 >= 0.3 * a[0] + 0.59 * a[1] + 0.11 * a[2]
};
UIL.hexToHtml = function (a) {
    return "#" + ("000000" + (void 0 === a ? 0 : a).toString(16)).substr(-6)
};
UIL.htmlToHex = function (a) {
    return a.toUpperCase().replace("#", "0x")
};
UIL.u255 = function (a, b) {
    return parseInt(a.substring(b, b + 2), 16) / 255
};
UIL.u16 = function (a, b) {
    return parseInt(a.substring(b, b + 1), 16) / 15
};
UIL.unpack = function (a) {
    if (7 == a.length) return [UIL.u255(a, 1), UIL.u255(a, 3), UIL.u255(a, 5)];
    if (4 == a.length) return [UIL.u16(a, 1), UIL.u16(a, 2), UIL.u16(a, 3)]
};
UIL.htmlRgb = function (a) {
    return "rgb(" + Math.round(255 * a[0]) + "," + Math.round(255 * a[1]) + "," + Math.round(255 * a[2]) + ")"
};
UIL.rgbToHex = function (a) {
    return "#" + ("000000" + (255 * a[0] << 16 ^ 255 * a[1] << 8 ^ 255 * a[2] << 0).toString(16)).slice(-6)
};
UIL.hueToRgb = function (a, b, c) {
    0 > c && (c += 1);
    1 < c && (c -= 1);
    return c < 1 / 6 ? a + 6 * (b - a) * c : 0.5 > c ? b : c < 2 / 3 ? a + 6 * (b - a) * (2 / 3 - c) : a
};
UIL.rgbToHsl = function (a) {
    var b = a[0],
        c = a[1];
    a = a[2];
    var d = Math.min(b, c, a),
        e = Math.max(b, c, a),
        f = e - d,
        h = 0,
        g = 0,
        d = (d + e) / 2;
    0 < d && 1 > d && (g = f / (0.5 > d ? 2 * d : 2 - 2 * d));
    0 < f && (e == b && e != c && (h += (c - a) / f), e == c && e != a && (h += 2 + (a - b) / f), e == a && e != b && (h += 4 + (b - c) / f), h /= 6);
    return [h, g, d]
};
UIL.hslToRgb = function (a) {
    var b, c = a[0];
    b = a[1];
    a = a[2];
    if (0 === b) return [a, a, a];
    b = 0.5 >= a ? a * (b + 1) : a + b - a * b;
    a = 2 * a - b;
    return [UIL.hueToRgb(a, b, c + 0.33333), UIL.hueToRgb(a, b, c), UIL.hueToRgb(a, b, c - 0.33333)]
};

UIL.Proto = function (a) {
    a = a || {};
    this.p = a.p || a.tPercent || 0;
    this.autoWidth = !0;
    this.isGroup = !1;
    this.parentGroup = null;
    this.autoHeight = !1;
    this.isUI = a.isUI || !1;
    this.mono = this.isNumber = !1;
    this.simple = a.simple || !1;
    this.setSize(a.size);
    void 0 !== a.sa && (this.sa = a.sa);
    void 0 !== a.sb && (this.sb = a.sb);
    this.sc = void 0 === a.sc ? 47 : a.sc;
    this.val = this.parent = null;
    this.isSend = !1;
    var b = 20;
    this.isUI && (b = UIL.main.height);
    this.h = a.height || b;
    this.h = 11 > this.h ? 11 : this.h;
    this.bgcolor = UIL.COLOR || a.bgcolor;
    this.titleColor = a.titleColor ||

        UIL.BASECOLOR;
    this.fontColor = a.fontColor || UIL.BASECOLOR;
    this.colorPlus = UIL.ColorLuma(this.fontColor, 0.3);
    this.txt = a.name || "Proto";
    this.target = a.target || null;
    this.callback = void 0 === a.callback ? null : a.callback;
    this.endCallback = null;
    null === this.callback && this.isUI && null !== UIL.main.callback && (this.callback = UIL.main.callback);
    this.c = [];
    this.s = [];
    this.c[0] = UIL.DOM("UIL", "div", "position:relative; height:20px; float:left;");
    this.s[0] = this.c[0].style;
    this.isUI && (this.s[0].marginBottom = "1px");
    this.simple || (this.c[1] =

        UIL.DOM("UIL text"), this.s[1] = this.c[1].style, this.c[1].textContent = this.txt, this.s[1].color = this.titleColor);
    if (a.pos) {
        this.s[0].position = "absolute";
        for (var c in a.pos) this.s[0][c] = a.pos[c];
        this.mono = !0
    }
    a.css && (this.s[0].cssText = a.css)
};
UIL.Proto.prototype = {
    constructor: UIL.Proto,
    init: function () {
        var a = this.s;
        a[0].height = this.h + "px";
        this.isUI && (this.s[0].background = UIL.bgcolor(this.bgcolor));
        this.autoHeight && (this.s[0].transition = "height 0.1s ease-out");
        void 0 !== this.c[1] && this.autoWidth && (a[1] = this.c[1].style, a[1].height = this.h - 4 + "px", a[1].lineHeight = this.h - 8 + "px");
        for (var b = UIL.frag(), c = 1, d = this.c.length; c !== d; c++) void 0 !== this.c[c] && (b.appendChild(this.c[c]), a[c] = this.c[c].style);
        null !== this.target ? this.target.appendChild(this.c[0]) :

            this.isUI ? UIL.main.inner.appendChild(this.c[0]) : document.body.appendChild(this.c[0]);
        this.c[0].appendChild(b);
        this.rSize();
        this.addEvent()
    },
    listen: function () {
        UIL.listens.push(this);
        return this
    },
    listening: function () {
        null === this.parent || this.isSend || (this.value = this.isNumber ? this.numValue(this.parent[this.val]) : this.parent[this.val], this.update())
    },
    setValue: function (a) {
        this.value = this.isNumber ? this.numValue(a) : a;
        this.update()
    },
    update: function () { },
    onChange: function (a) {
        this.callback = a;
        return this
    },
    onFinishChange: function (a) {
        this.callback =

            null;
        this.endCallback = a;
        return this
    },
    send: function (a) {
        this.isSend = !0;
        this.callback && this.callback(a || this.value);
        null !== this.parent && (this.parent[this.val] = a || this.value);
        this.isSend = !1
    },
    sendEnd: function (a) {
        this.endCallback && this.endCallback(a || this.value);
        null !== this.parent && (this.parent[this.val] = a || this.value)
    },
    clear: function () {
        this.clearEvent();
        UIL.clear(this.c[0]);
        null !== this.target ? this.target.removeChild(this.c[0]) : this.isUI ? UIL.main.inner.removeChild(this.c[0]) : document.body.removeChild(this.c[0]);

        this.target = this.callback = this.s = this.c = null
    },
    setSize: function (a) {
        this.autoWidth && (this.size = a || UIL.WIDTH, this.p || (this.p = UIL.P), this.simple ? (this.sa = 0, this.sb = this.size) : (a = this.p / 100 * this.size, this.sa = ~~a, this.sb = ~~this.size - a - 10))
    },
    rSize: function () {
        this.autoWidth && (this.s[0].width = this.size + "px", this.simple || (this.s[1].width = this.sa + "px"))
    },
    setTypeNumber: function (a) {
        this.isNumber = !0;
        this.value = 0;
        void 0 !== a.value && (this.value = "string" === typeof a.value ? 1 * a.value : a.value);
        this.min = void 0 === a.min ?

            -Infinity : a.min;
        this.max = void 0 === a.max ? Infinity : a.max;
        this.precision = void 0 === a.precision ? 2 : a.precision;
        var b;
        switch (this.precision) {
            case 0:
                b = 1;
                break;
            case 1:
                b = 0.1;
                break;
            case 2:
                b = 0.01;
                break;
            case 3:
                b = 0.001;
                break;
            case 4:
                b = 1E-4
        }
        this.step = void 0 === a.step ? b : a.step;
        this.range = this.max - this.min;
        this.value = this.numValue(this.value)
    },
    numValue: function (a) {
        return 1 * Math.min(this.max, Math.max(this.min, a)).toFixed(this.precision)
    },
    addEvent: function () {
        for (var a = this.c.length, b, c; a--;)
            if (c = this.c[a], void 0 !== c &&

                void 0 !== c.events)
                for (b = c.events.length; b--;) c.addEventListener(c.events[b], this, !1)
    },
    clearEvent: function () {
        for (var a = this.c.length, b, c; a--;)
            if (c = this.c[a], void 0 !== c && void 0 !== c.events)
                for (b = c.events.length; b--;) c.removeEventListener(c.events[b], this, !1)
    },
    handleEvent: function (a) { },
    setReferency: function (a, b) {
        this.parent = a;
        this.val = b
    },
    display: function (a) {
        this.s[0].display = a ? "block" : "none"
    }
};

UIL.String = function (a) {
    UIL.Proto.call(this, a);
    this.value = a.value || "";
    this.allway = a.allway || !1;
    this.c[2] = UIL.DOM("UIL textSelect", "div", "height:" + (this.h - 4) + "px; line-height:" + (this.h - 8) + "px; color:" + this.fontColor);
    this.c[2].name = "input";
    this.c[2].textContent = this.value;
    this.c[2].events = ["mousedown", "keydown", "keyup", "blur", "focus"];
    this.init()
};
UIL.String.prototype = Object.create(UIL.Proto.prototype);
UIL.String.prototype.constructor = UIL.String;
UIL.String.prototype.handleEvent = function (a) {
    switch (a.type) {
        case "mousedown":
            this.down(a);
            break;
        case "blur":
            this.blur(a);
            break;
        case "focus":
            this.focus(a);
            break;
        case "keydown":
            this.keydown(a);
            break;
        case "keyup":
            this.keyup(a)
    }
};
UIL.String.prototype.down = function (a) {
    a.target.contentEditable = !0;
    a.target.focus();
    a.target.style.cursor = "auto"
};
UIL.String.prototype.blur = function (a) {
    a.target.style.borderColor = UIL.Border;
    a.target.contentEditable = !1
};
UIL.String.prototype.focus = function (a) {
    a.target.style.borderColor = UIL.BorderSelect
};
UIL.String.prototype.keydown = function (a) {
    a.stopPropagation();
    13 === a.keyCode && (a.preventDefault(), this.value = a.target.textContent, a.target.blur(), this.send())
};
UIL.String.prototype.keyup = function (a) {
    a.stopPropagation();
    this.value = a.target.textContent;
    this.allway && this.send()
};
UIL.String.prototype.rSize = function () {
    UIL.Proto.prototype.rSize.call(this);
    this.s[2].left = this.sa + "px";
    this.s[2].width = this.sb + "px"
};

UIL.Number = function (a) {
    UIL.Proto.call(this, a);
    this.type = "number";
    this.setTypeNumber(a);
    this.allway = a.allway || !1;
    this.isDrag = void 0 === a.drag ? !0 : a.drag;
    this.value = [0];
    this.toRad = 1;
    this.isNumber = !0;
    this.isSelect = this.isVector = this.isAngle = !1;
    void 0 !== a.value && (isNaN(a.value) ? a.value instanceof Array ? (this.value = a.value, this.isNumber = !1) : a.value instanceof Object && (this.value = [], a.value.x && (this.value[0] = a.value.x), a.value.y && (this.value[1] = a.value.y), a.value.z && (this.value[2] = a.value.z), a.value.w && (this.value[3] =

        a.value.w), this.isVector = !0) : this.value = [a.value]);
    this.length = this.value.length;
    a.isAngle && (this.isAngle = !0, this.toRad = Math.PI / 180);
    this.w = (UIL.BW + 5) / this.length - 5;
    this.current = void 0;
    for (var b = this.length; b--;) this.isAngle && (this.value[b] = (180 * this.value[b] / Math.PI).toFixed(this.precision)), this.c[2 + b] = UIL.DOM("UIL textSelect", "div", "letter-spacing:-1px; cursor:pointer; height:" + (this.h - 4) + "px; line-height:" + (this.h - 8) + "px;"), this.c[2 + b].name = b, this.isDrag && (this.c[2 + b].style.cursor = "move"), a.center &&

        (this.c[2 + b].style.textAlign = "center"), this.c[2 + b].textContent = this.value[b], this.c[2 + b].style.color = this.fontColor, this.c[2 + b].events = ["keydown", "keyup", "mousedown", "blur", "focus"];
    this.init()
};
UIL.Number.prototype = Object.create(UIL.Proto.prototype);
UIL.Number.prototype.constructor = UIL.Number;
UIL.Number.prototype.handleEvent = function (a) {
    switch (a.type) {
        case "mousedown":
            this.down(a);
            break;
        case "keydown":
            this.keydown(a);
            break;
        case "keyup":
            this.keyup(a);
            break;
        case "blur":
            this.blur(a);
            break;
        case "focus":
            this.focus(a);
            break;
        case "mouseup":
            this.up(a);
            break;
        case "mousemove":
            this.move(a)
    }
};
UIL.Number.prototype.setValue = function (a, b) {
    b = b || 0;
    this.value[b] = this.numValue(a);
    this.c[2 + b].textContent = this.value[b]
};
UIL.Number.prototype.keydown = function (a) {
    a.stopPropagation();
    13 === a.keyCode && (a.preventDefault(), this.testValue(parseFloat(a.target.name)), this.validate(), a.target.blur())
};
UIL.Number.prototype.keyup = function (a) {
    a.stopPropagation();
    this.allway && (this.testValue(parseFloat(a.target.name)), this.validate())
};
UIL.Number.prototype.blur = function (a) {
    this.isSelect = !1;
    a.target.style.borderColor = UIL.Border;
    a.target.contentEditable = !1;
    a.target.style.cursor = this.isDrag ? "move" : "pointer"
};
UIL.Number.prototype.focus = function (a) {
    this.isSelect = !0;
    this.current = void 0;
    a.target.style.borderColor = UIL.BorderSelect;
    this.isDrag && (a.target.style.cursor = "auto")
};
UIL.Number.prototype.down = function (a) {
    this.isSelect || (a.preventDefault(), this.current = parseFloat(a.target.name), this.prev = {
        x: a.clientX,
        y: a.clientY,
        d: 0,
        id: this.current + 2
    }, this.prev.v = this.isNumber ? parseFloat(this.value) : parseFloat(this.value[this.current]), document.addEventListener("mouseup", this, !1), this.isDrag && document.addEventListener("mousemove", this, !1))
};
UIL.Number.prototype.up = function (a) {
    a.preventDefault();
    document.removeEventListener("mouseup", this, !1);
    this.isDrag && document.removeEventListener("mousemove", this, !1);
    void 0 !== this.current && this.current === parseFloat(a.target.name) && (a.target.contentEditable = !0, a.target.focus())
};
UIL.Number.prototype.move = function (a) {
    a.preventDefault();
    void 0 !== this.current && (this.prev.d += a.clientX - this.prev.x - (a.clientY - this.prev.y), this.value[this.current] = this.numValue(this.prev.v + this.prev.d * this.step), this.c[2 + this.current].textContent = this.value[this.current], this.validate(), this.prev.x = a.clientX, this.prev.y = a.clientY)
};
UIL.Number.prototype.testValue = function (a) {
    if (isNaN(this.c[2 + a].textContent)) this.c[2 + a].textContent = this.value[a];
    else {
        var b = this.numValue(this.c[2 + a].textContent);
        this.c[2 + a].textContent = b;
        this.value[a] = b
    }
};
UIL.Number.prototype.validate = function () {
    for (var a = [], b = this.length; b--;) a[b] = this.value[b] * this.toRad;
    this.isNumber ? this.send(a[0]) : this.send(a)
};
UIL.Number.prototype.rSize = function () {
    UIL.Proto.prototype.rSize.call(this);
    this.w = ~~((this.sb + 5) / this.length) - 5;
    for (var a = this.s, b = this.length; b--;) a[2 + b].left = ~~(this.sa + this.w * b + 5 * b) + "px", a[2 + b].width = this.w + "px"
};

UIL.Color = function (a) {
    UIL.Proto.call(this, a);
    this.autoHeight = !0;
    this.type = a.type || "array";
    this.width = this.sb;
    this.oldWidth = 0;
    this.side = a.side || "down";
    this.holdTop = 0;
    this.wheelWidth = 0.1 * this.width;
    this.decal = this.h + 2;
    this.radius = 0.5 * (this.width - this.wheelWidth) - 1;
    this.square = Math.floor(0.7 * (this.radius - 0.5 * this.wheelWidth)) - 1;
    this.mid = Math.floor(0.5 * this.width);
    this.markerSize = 0.3 * this.wheelWidth;
    this.baseH = this.h;
    this.c[2] = UIL.DOM("UIL text", "div", "height:" + (this.h - 4) + "px;border-radius:6px; pointer-events:auto; cursor:pointer; border:1px solid " +

        UIL.Border + "; line-height:" + (this.h - 8) + "px;");
    this.s[2] = this.c[2].style;
    "up" === this.side && (this.decal = 5, this.s[2].top = "auto", this.s[2].bottom = "2px");
    this.c[3] = UIL.DOM("UIL", "div", "display:none");
    this.c[4] = UIL.DOM("UIL", "canvas", "display:none;");
    this.c[5] = UIL.DOM("UIL", "canvas", "pointer-events:auto; cursor:pointer; display:none;");
    this.s[3] = this.c[3].style;
    this.s[5] = this.c[5].style;
    "up" === this.side && (this.s[5].pointerEvents = "none");
    this.c[4].width = this.c[4].height = this.width;
    this.c[5].width = this.c[5].height =

        this.width;
    this.ctxMask = this.c[4].getContext("2d");
    this.ctxOverlay = this.c[5].getContext("2d");
    this.ctxMask.translate(this.mid, this.mid);
    this.ctxOverlay.translate(this.mid, this.mid);
    this.hsl = null;
    this.value = "#ffffff";
    void 0 !== a.value && (a.value instanceof Array ? this.value = UIL.rgbToHex(a.value) : isNaN(a.value) ? this.value = a.value : this.value = UIL.hexToHtml(a.value));
    this.bcolor = null;
    this.isShow = this.isDown = !1;
    this.c[2].events = ["click"];
    this.c[5].events = ["mousedown", "mousemove", "mouseup", "mouseout"];
    this.setColor(this.value);

    this.init()
};
UIL.Color.prototype = Object.create(UIL.Proto.prototype);
UIL.Color.prototype.constructor = UIL.Color;
UIL.Color.prototype.handleEvent = function (a) {
    a.preventDefault();
    a.stopPropagation();
    switch (a.type) {
        case "click":
            this.click(a);
            break;
        case "mousedown":
            this.down(a);
            break;
        case "mousemove":
            this.move(a);
            break;
        case "mouseup":
            this.up(a);
            break;
        case "mouseout":
            this.out(a)
    }
};
UIL.Color.prototype.click = function (a) {
    this.isShow ? this.hide() : this.show()
};
UIL.Color.prototype.up = function (a) {
    this.isDown = !1
};
UIL.Color.prototype.out = function (a) {
    this.hide()
};
UIL.Color.prototype.down = function (a) {
    if (this.isShow) return this.isDown = !0, this.move(a), !1
};
UIL.Color.prototype.move = function (a) {
    if (this.isDown) {
        this.offset = this.c[5].getBoundingClientRect();
        var b = a.pageX - this.offset.left - this.mid;
        a = a.pageY - this.offset.top - this.mid;
        (this.circleDrag = Math.max(Math.abs(b), Math.abs(a)) > this.square + 2) ? (b = Math.atan2(b, -a) / 6.28, this.setHSL([(b + 1) % 1, this.hsl[1], this.hsl[2]])) : (b = Math.max(0, Math.min(1, -(b / this.square * 0.5) + 0.5)), a = Math.max(0, Math.min(1, -(a / this.square * 0.5) + 0.5)), this.setHSL([this.hsl[0], b, a]))
    }
};
UIL.Color.prototype.redraw = function () {
    this.oldWidth = this.width;
    this.drawCircle();
    this.drawMask();
    this.drawMarkers()
};
UIL.Color.prototype.show = function () {
    this.oldWidth !== this.width && this.redraw();
    this.isShow = !0;
    this.h = this.width + this.baseH + 10;
    this.s[0].height = this.h + "px";
    "up" == this.side && (this.holdTop = 1 * this.s[0].top.substring(0, this.s[0].top.length - 2) || "auto", isNaN(this.holdTop) || (this.s[0].top = this.holdTop - (this.h - 20) + "px"), setTimeout(function () {
        this.s[5].pointerEvents = "auto"
    }.bind(this), 100));
    this.s[3].display = "block";
    this.s[4].display = "block";
    this.s[5].display = "block";
    null !== this.parentGroup && this.parentGroup.calc(this.h -

        this.baseH);
    this.isUI && UIL.main.calc(this.h - this.baseH)
};
UIL.Color.prototype.hide = function () {
    null !== this.parentGroup && this.parentGroup.calc(-(this.h - this.baseH));
    this.isUI && UIL.main.calc(-(this.h - this.baseH));
    this.isShow = !1;
    this.h = this.baseH;
    "up" === this.side && (isNaN(this.holdTop) || (this.s[0].top = this.holdTop + "px"), this.s[5].pointerEvents = "none");
    this.s[0].height = this.h + "px";
    this.s[3].display = "none";
    this.s[4].display = "none";
    this.s[5].display = "none"
};
UIL.Color.prototype.update = function (a) {
    this.s[3].background = UIL.rgbToHex(UIL.hslToRgb([this.hsl[0], 1, 0.5]));
    this.drawMarkers();
    this.value = this.bcolor;
    this.s[2].background = this.bcolor;
    this.c[2].textContent = UIL.htmlToHex(this.bcolor);
    this.invert = UIL.findDeepInver(this.rgb);
    this.s[2].color = this.invert ? "#fff" : "#000";
    a && ("array" === this.type && this.send(this.rgb), "rgb" === this.type && this.send(UIL.htmlRgb(this.rgb)), "hex" === this.type && this.send(UIL.htmlToHex(this.value)), "html" === this.type && this.send())
};
UIL.Color.prototype.setColor = function (a) {
    var b = UIL.unpack(a);
    this.bcolor != a && b && (this.bcolor = a, this.rgb = b, this.hsl = UIL.rgbToHsl(this.rgb), this.update());
    return this
};
UIL.Color.prototype.setHSL = function (a) {
    this.hsl = a;
    this.rgb = UIL.hslToRgb(a);
    this.bcolor = UIL.rgbToHex(this.rgb);
    this.update(!0);
    return this
};
UIL.Color.prototype.calculateMask = function (a, b, c) {
    for (var d = 1 / a, e = 1 / b, f = 0; f <= b; ++f)
        for (var h = 1 - f * e, g = 0; g <= a; ++g) {
            var k = 1 - g * d,
                k = 1 - 2 * Math.min(h * k, (1 - h) * k);
            c(g, f, 0 < k ? 0.5 * (2 * h - 1 + k) / k : 0, k)
        }
};
UIL.Color.prototype.drawMask = function () {
    var a = this.square,
        b = Math.floor(2 * this.square / 2),
        c = document.createElement("canvas");
    c.width = c.height = b + 1;
    var d = c.getContext("2d"),
        e = d.getImageData(0, 0, b + 1, b + 1),
        f = 0;
    this.calculateMask(b, b, function (a, b, c, d) {
        e.data[f++] = e.data[f++] = e.data[f++] = 255 * c;
        e.data[f++] = 255 * d
    });
    d.putImageData(e, 0, 0);
    this.ctxMask.drawImage(c, 0, 0, b + 1, b + 1, -a, -a, 2 * a, 2 * a)
};
UIL.Color.prototype.drawCircle = function () {
    var a = this.radius,
        b = this.wheelWidth,
        c = 8 / a / 24 * Math.PI,
        d = this.ctxMask,
        e = 0,
        f, h, g, k;
    d.save();
    d.lineWidth = b / a;
    d.scale(a, a);
    for (var m = 0; 24 >= m; ++m) k = m / 24, a = k * Math.PI * 2, b = [Math.sin(e), -Math.cos(e), Math.sin(a), -Math.cos(a)], h = 0.5 * (e + a), g = 1 / Math.cos(0.5 * (a - e)), e = Math.sin(h) * g, h = -Math.cos(h) * g, k = UIL.rgbToHex(UIL.hslToRgb([k, 1, 0.5])), 0 < m && (g = d.createLinearGradient(b[0], b[1], b[2], b[3]), g.addColorStop(0, f), g.addColorStop(1, k), d.strokeStyle = g, d.beginPath(), d.moveTo(b[0],

        b[1]), d.quadraticCurveTo(e, h, b[2], b[3]), d.stroke()), e = a - c, f = k;
    d.restore()
};
UIL.Color.prototype.drawMarkers = function () {
    var a = this.markerSize,
        b = this.radius,
        c = this.width,
        d = Math.ceil(a / 4),
        e = a - d + 1,
        f = this.invert ? "#fff" : "#000",
        h = this.invert ? "#000" : "#fff",
        g = 6.28 * this.hsl[0],
        b = [Math.sin(g) * b, -Math.cos(g) * b, 2 * this.square * (0.5 - this.hsl[1]), 2 * this.square * (0.5 - this.hsl[2])],
        a = [{
            x: b[2],
            y: b[3],
            r: a,
            c: f,
            lw: d
        }, {
            x: b[2],
            y: b[3],
            r: e,
            c: h,
            lw: d + 1
        }, {
            x: b[0],
            y: b[1],
            r: a,
            c: "#fff",
            lw: d
        }, {
            x: b[0],
            y: b[1],
            r: e,
            c: "#000",
            lw: d + 1
        }];
    this.ctxOverlay.clearRect(-this.mid, -this.mid, c, c);
    for (c = a.length; c--;) d = a[c],

        this.ctxOverlay.lineWidth = d.lw, this.ctxOverlay.strokeStyle = d.c, this.ctxOverlay.beginPath(), this.ctxOverlay.arc(d.x, d.y, d.r, 0, 2 * Math.PI, !0), this.ctxOverlay.stroke()
};
UIL.Color.prototype.rSize = function () {
    UIL.Proto.prototype.rSize.call(this);
    this.width = this.sb;
    this.wheelWidth = 0.1 * this.width;
    "up" === this.side && (this.decal = 5);
    this.radius = 0.5 * (this.width - this.wheelWidth) - 1;
    this.square = Math.floor(0.7 * (this.radius - 0.5 * this.wheelWidth)) - 1;
    this.mid = Math.floor(0.5 * this.width);
    this.markerSize = 0.3 * this.wheelWidth;
    var a = this.s;
    a[2].width = this.sb + "px";
    a[2].left = this.sa + "px";
    a[3].width = 2 * this.square - 1 + "px";
    a[3].height = 2 * this.square - 1 + "px";
    a[3].top = this.mid + this.decal - this.square +

        "px";
    a[3].left = this.mid + this.sa - this.square + "px";
    this.c[4].width = this.c[4].height = this.width;
    a[4].left = this.sa + "px";
    a[4].top = this.decal + "px";
    this.c[5].width = this.c[5].height = this.width;
    a[5].left = this.sa + "px";
    a[5].top = this.decal + "px";
    this.ctxMask.translate(this.mid, this.mid);
    this.ctxOverlay.translate(this.mid, this.mid);
    this.isShow && (this.redraw(), this.h = this.width + 30, this.c[0].height = this.h + "px", this.isUI && UIL.main.calc())
};

UIL.List = function (a) {
    UIL.Proto.call(this, a);
    this.autoHeight = !0;
    var b = a.align || "center";
    this.c[2] = UIL.DOM("UIL", "div", "box-sizing:content-box; border:20px solid transparent; border-bottom:10px solid transparent top:0px; height:90px; cursor:s-resize; pointer-events:auto; display:none;");
    this.c[3] = UIL.DOM("UIL", "div", "border:1px solid " + UIL.Border + "; top:1px; pointer-events:auto; cursor:pointer; background:" + UIL.bgcolor(UIL.COLOR) + "; height:" + (this.h - 2) + "px;");
    this.c[4] = UIL.DOM("UIL", "div", "position:absolute; width:10px; height:10px; left:" +

        (this.sa + this.sb - 5) + "px; top:" + (~~(0.5 * this.h) - 5) + "px; background:" + UIL.F0);
    this.c[5] = UIL.DOM("UIL text", "div", "text-align:" + b + "; height:" + (this.h - 4) + "px; line-height:" + (this.h - 8) + "px;");
    this.c[6] = UIL.DOM("UIL", "div", "right:14px; top:" + this.h + "px; height:16px; width:10px; pointer-events:none; background:#666; display:none;");
    this.c[2].name = "list";
    this.c[3].name = "title";
    this.c[2].style.borderTop = this.h + "px solid transparent";
    this.c[5].style.color = this.fontColor;
    this.c[2].events = ["mousedown", "mousemove",

        "mouseup", "mouseout", "mousewheel"
    ];
    this.c[3].events = ["click", "mousedown", "mouseover", "mouseout"];
    this.list = a.list || [];
    a.value ? isNaN(a.value) ? this.value = a.value : this.value = this.list[a.value] : this.value = this.list[0];
    this.baseH = this.h;
    this.show = !1;
    this.maxItem = a.maxItem || 5;
    this.itemHeight = a.itemHeight || this.h - 3;
    this.length = this.list.length;
    if (this.full = a.full || !1) this.maxItem = this.length;
    this.maxHeight = this.maxItem * (this.itemHeight + 1);
    this.max = this.length * (this.itemHeight + 1);
    this.ratio = this.maxHeight /

        this.max;
    this.sh = this.maxHeight * this.ratio;
    20 > this.sh && (this.sh = 20);
    this.range = this.maxHeight - this.sh;
    this.c[6].style.height = this.sh + "px";
    this.py = 0;
    this.w = this.sb;
    this.isDown = this.scroll = !1;
    this.side = a.side || "down";
    this.holdTop = 0;
    "up" === this.side && (this.c[2].style.top = "auto", this.c[3].style.top = "auto", this.c[4].style.top = "auto", this.c[5].style.top = "auto", this.c[2].style.bottom = "10px", this.c[3].style.bottom = "2px", this.c[4].style.bottom = "2px", this.c[5].style.bottom = "2px");
    this.max > this.maxHeight && (this.w =

        this.sb - 20, this.scroll = !0);
    this.listIn = UIL.DOM("UIL", "div", "left:0; top:0; width:100%; background:rgba(0,0,0,0.2); ");
    this.listIn.name = "list";
    this.c[2].style.height = this.maxHeight + "px";
    this.c[2].appendChild(this.listIn);
    for (var c = 0; c < this.length; c++) b = this.list[c], a = UIL.DOM("UIL listItem", "div", "width:" + this.w + "px; height:" + this.itemHeight + "px; line-height:" + (this.itemHeight - 5) + "px;"), a.textContent = b, a.style.color = this.fontColor, a.name = "item", this.listIn.appendChild(a);
    this.c[5].textContent = this.value;

    this.init()
};
UIL.List.prototype = Object.create(UIL.Proto.prototype);
UIL.List.prototype.constructor = UIL.List;
UIL.List.prototype.handleEvent = function (a) {
    a.preventDefault();
    var b = a.target.name || "";
    switch (a.type) {
        case "click":
            this.click(a);
            break;
        case "mouseover":
            this.mode(1);
            break;
        case "mousedown":
            "title" === b ? this.mode(2) : this.listdown(a);
            break;
        case "mouseup":
            "title" === b ? this.mode(0) : this.listup(a);
            break;
        case "mouseout":
            "title" === b ? this.mode(0) : this.listout(a);
            break;
        case "mousemove":
            this.listmove(a);
            break;
        case "mousewheel":
            this.listwheel(a)
    }
};
UIL.List.prototype.mode = function (a) {
    var b = this.s;
    switch (a) {
        case 0:
            b[5].color = this.fontColor;
            b[3].background = UIL.bgcolor(UIL.COLOR);
            break;
        case 1:
            b[5].color = "#FFF";
            b[3].background = UIL.SELECT;
            break;
        case 2:
            b[5].color = this.fontColor, b[3].background = UIL.SELECTDOWN
    }
};
UIL.List.prototype.click = function (a) {
    this.show ? this.listHide() : this.listShow()
};
UIL.List.prototype.listdown = function (a) {
    var b = a.target.name;
    "list" !== b && void 0 !== b ? (this.value = a.target.textContent, this.c[5].textContent = this.value, this.send(), this.listHide()) : "list" === b && this.scroll && (this.isDown = !0, this.listmove(a), this.listIn.style.background = "rgba(0,0,0,0.6)", this.s[6].background = "#AAA", a.preventDefault())
};
UIL.List.prototype.listmove = function (a) {
    if (this.isDown) {
        var b = this.c[2].getBoundingClientRect();
        this.update(a.clientY - b.top - this.baseH - 0.5 * this.sh)
    }
};
UIL.List.prototype.listup = function (a) {
    this.isDown = !1;
    this.listIn.style.background = "rgba(0,0,0,0.2)";
    this.s[6].background = "#666"
};
UIL.List.prototype.listout = function (a) {
    this.isUI && (UIL.main.lockwheel = !1);
    this.listup();
    void 0 === a.relatedTarget.name && this.listHide()
};
UIL.List.prototype.listwheel = function (a) {
    if (this.scroll) {
        this.isUI && (UIL.main.lockwheel = !0);
        var b = 0;
        a.wheelDeltaY ? b = 0.04 * -a.wheelDeltaY : a.wheelDelta ? b = 0.2 * -a.wheelDelta : a.detail && (b = 4 * a.detail);
        this.py += b;
        this.update(this.py)
    }
};
UIL.List.prototype.update = function (a) {
    this.scroll && (a = 0 > a ? 0 : a, a = a > this.range ? this.range : a, this.listIn.style.top = -~~(a / this.ratio) + "px", this.s[6].top = ~~a + this.baseH + "px", this.py = a)
};
UIL.List.prototype.listShow = function () {
    this.update(0);
    this.show = !0;
    this.h = this.maxHeight + this.baseH + 10;
    this.scroll ? this.s[6].display = "block" : (this.h = this.baseH + 10 + this.max, this.s[6].display = "none", this.c[2].removeEventListener("mousewheel", this, !1), this.c[2].removeEventListener("mousemove", this, !1));
    this.s[0].height = this.h + "px";
    this.s[2].display = "block";
    this.s[4].background = "up" === this.side ? UIL.F0 : UIL.F1;
    this.rSizeContent();
    null !== this.parentGroup && this.parentGroup.calc(this.h - this.baseH);
    this.isUI &&

        UIL.main.calc(this.h - this.baseH)
};
UIL.List.prototype.listHide = function () {
    null !== this.parentGroup && this.parentGroup.calc(-(this.h - this.baseH));
    this.isUI && UIL.main.calc(-(this.h - this.baseH));
    this.show = !1;
    this.h = this.baseH;
    this.s[0].height = this.h + "px";
    this.s[2].display = "none";
    this.s[4].background = UIL.F0
};
UIL.List.prototype.text = function (a) {
    this.c[5].textContent = a
};
UIL.List.prototype.rSizeContent = function () {
    for (var a = this.length; a--;) this.listIn.children[a].style.width = this.w + "px"
};
UIL.List.prototype.rSize = function () {
    UIL.Proto.prototype.rSize.call(this);
    var a = this.s;
    a[2].width = this.sb + "px";
    a[2].left = this.sa - 20 + "px";
    a[3].width = this.sb + "px";
    a[3].left = this.sa + "px";
    a[4].left = this.sa + this.sb - 17 + "px";
    a[5].width = this.sb + "px";
    a[5].left = this.sa + "px";
    this.w = this.sb;
    this.max > this.maxHeight && (this.w = this.sb - 20);
    this.show && this.rSizeContent()
};

UIL.Bool = function (a) {
    UIL.Proto.call(this, a);
    this.value = a.value || !1;
    a = ~~(0.5 * this.h) - 8;
    this.c[2] = UIL.DOM("UIL", "div", "background:" + UIL.Border + "; height:18px; width:36px; top:" + a + "px; border-radius:8px; pointer-events:auto; cursor:pointer;");
    this.c[3] = UIL.DOM("UIL", "path", "width:17px; top:" + (a + 1) + "px;", {
        width: 17,
        height: 17,
        d: "M 4 9 L 6 12 14 4",
        "stroke-width": 2,
        stroke: "#000",
        fill: "none",
        "stroke-linecap": "butt"
    });
    this.c[4] = UIL.DOM("UIL", "div", "height:16px; width:16px; top:" + (a + 1) + "px; border-radius:8px; background:" +

        UIL.bgcolor(UIL.COLOR, 1) + "; transition:margin 0.1s ease-out;");
    this.value && (this.c[4].style.marginLeft = "18px", this.c[2].style.background = this.fontColor, this.c[2].style.borderColor = this.fontColor);
    this.c[2].events = ["click"];
    this.init()
};
UIL.Bool.prototype = Object.create(UIL.Proto.prototype);
UIL.Bool.prototype.constructor = UIL.Bool;
UIL.Bool.prototype.handleEvent = function (a) {
    a.preventDefault();
    switch (a.type) {
        case "click":
            this.click(a)
    }
};
UIL.Bool.prototype.click = function (a) {
    a = this.s;
    this.value ? (this.value = !1, a[4].marginLeft = "0px", a[2].background = UIL.Border, a[2].borderColor = UIL.Border) : (this.value = !0, a[4].marginLeft = "18px", a[2].background = this.fontColor, a[2].borderColor = this.fontColor);
    this.send()
};
UIL.Bool.prototype.rSize = function () {
    UIL.Proto.prototype.rSize.call(this);
    var a = this.s;
    a[2].left = this.sa + "px";
    a[3].left = this.sa + 1 + "px";
    a[4].left = this.sa + 1 + "px"
};

UIL.Button = function (a) {
    UIL.Proto.call(this, a);
    this.value = a.value || !1;
    this.c[2] = UIL.DOM("UIL", "div", "border:1px solid " + UIL.Border + "; top:1px; pointer-events:auto; cursor:pointer; background:" + UIL.bgcolor(UIL.COLOR) + "; height:" + (this.h - 2) + "px;");
    this.c[3] = UIL.DOM("UIL text", "div", "text-align:center; height:" + (this.h - 4) + "px; line-height:" + (this.h - 8) + "px;");
    this.c[3].style.color = this.fontColor;
    this.c[2].events = ["click", "mouseover", "mousedown", "mouseup", "mouseout"];
    void 0 !== this.c[1] && (this.c[1].textContent =

        "");
    this.c[3].innerHTML = this.txt;
    this.init()
};
UIL.Button.prototype = Object.create(UIL.Proto.prototype);
UIL.Button.prototype.constructor = UIL.Button;
UIL.Button.prototype.handleEvent = function (a) {
    a.preventDefault();
    switch (a.type) {
        case "click":
            this.click(a);
            break;
        case "mouseover":
            this.mode(1);
            break;
        case "mousedown":
            this.mode(2);
            break;
        case "mouseup":
            this.mode(0);
            break;
        case "mouseout":
            this.mode(0)
    }
};
UIL.Button.prototype.mode = function (a) {
    var b = this.s;
    switch (a) {
        case 0:
            b[3].color = this.fontColor;
            b[2].background = UIL.bgcolor(UIL.COLOR);
            break;
        case 1:
            b[3].color = "#FFF";
            b[2].background = UIL.SELECT;
            break;
        case 2:
            b[3].color = this.fontColor, b[2].background = UIL.SELECTDOWN
    }
};
UIL.Button.prototype.click = function (a) {
    this.send()
};
UIL.Button.prototype.label = function (a) {
    this.c[3].textContent = a
};
UIL.Button.prototype.icon = function (a, b) {
    this.s[3].padding = (b || 0) + "px 0px";
    this.c[3].innerHTML = a
};
UIL.Button.prototype.rSize = function () {
    UIL.Proto.prototype.rSize.call(this);
    var a = this.s;
    a[2].left = this.sa + "px";
    a[3].left = this.sa + "px";
    a[2].width = this.sb + "px";
    a[3].width = this.sb + "px"
};



// --------------
// NEO TIMELINE
// --------------
var UMC, UIL, define, exports, module, NEO_ARRAY_TYPE;
NEO_ARRAY_TYPE || (NEO_ARRAY_TYPE = "undefined" !== typeof Uint32Array ? Uint32Array : Array);
Object.keys || (Object.keys = function (a) {
    var b = [],
        c;
    for (c in a) a.hasOwnProperty(c) && b.push(c);
    return b
});

var NEO = NEO || function () {
    NEO = function () { };
    NEO.REVISION = 0.78;
    NEO.DID = 0;
    NEO.Doc = document;
    NEO.TMPJSON = "";
    NEO.main = null;
    NEO.frag = UMC.frag;
    NEO.DOM = UMC.dom;
    NEO.CC = UMC.cc;
    NEO.clear = UMC.clear;
    NEO.setSvg = UMC.setSvg;
    NEO.FPS = 60;
    NEO.frameTime = 1 / 60;
    NEO.frameSize = 1;
    NEO.frameMax = 1;
    NEO.frameTrack = 0;
    NEO.visible = !0;
    NEO.play = !1;
    NEO.SELECT = "#035fcf";
    NEO.KCOLOR = "rgba(86,175,178,1)";
    NEO.KCOLOR2 = "rgba(86,175,178,0.6)";
    NEO.KCOLOR3 = "rgba(86,175,178,0.5)";
    NEO.ACOLOR = "rgba(86,175,178,0.1)";
    NEO.SCOLOR = "rgba(178,175,86, 1)";
    NEO.SCOLOR3 =

        "rgba(178,175,86,0.5)";
    NEO.classDefine = function () {
        NEO.CC("NEO", UIL.UNS + "position:absolute; pointer-events:none; box-sizing:border-box; margin:0; padding:0; border:none; background:none; ");
        NEO.CC("NEO.track", "position:absolute; left:0; top:20px; width:100px; height:60px; overflow:hidden; pointer-events:auto; cursor:pointer; background:none; border-top:1px solid transparent; border-bottom:1px solid transparent;");
        NEO.CC("NEO.track:hover", "border-top:1px solid #035fcf; border-bottom:1px solid #035fcf;");

        UIL.CC("NEO.text", UIL.TXT)
    };
    NEO.liner = function (a, b, c) {
        return NEO.DOM("NEO", "div", "width:100%; height:1px; border-top:1px solid " + (void 0 === b ? "#888" : b) + "; top:" + (a - 1) + "px; opacity:" + (void 0 === c ? "1" : c) + ";")
    };
    NEO.vliner = function (a, b) {
        void 0 === b && (b = "#888");
        return NEO.DOM("NEO", "div", "width:1px; height:100%; background:" + b + ";" + a)
    };
    NEO.linerBottom = function (a) {
        a = NEO.DOM("NEO", "div", "width:100%; height:" + (a + 1) + "px; bottom:0; background:none; pointer-events:auto; cursor:n-resize; border-top:1px solid rgba(128,128,128,0.5); border-bottom:1px solid #888;");

        NEO.DOM("NEO", "div", "width:100%; height:3px; top:2px; background:" + UIL.SlideBG, null, a);
        a.name = "scaleBar";
        return a
    };
    NEO.pins = function (a) {
        var b = ~~(0.5 * (a - 10));
        a = NEO.DOM("NEO", "div", "width:20px; height:" + a + "px; pointer-events:auto; cursor:pointer;");
        NEO.DOM("NEO", "div", "width:10px; height:10px; border-radius:5px; border:2px solid #ccc; top:" + b + "px; left:5px;", null, a);
        a.name = "pins";
        return a
    };
    NEO.dels = function (a) {
        a = NEO.DOM("NEO", "div", "width:10px; height:10px; right:5px; top:" + (a || 5) + "px; pointer-events:auto; cursor:pointer; background:" +

            UIL.X0);
        a.name = "dels";
        return a
    };
    NEO.classDefine();
    return NEO
}();
(function (a) {
    "function" === typeof define && define.amd ? define("neo", NEO) : "undefined" !== typeof exports && "undefined" !== typeof module ? module.exports = NEO : a.NEO = NEO
})(this);

(function () {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (b, c) {
        var f = (new Date).getTime(),
            g = Math.max(0, 16 - (f - a)),
            h = window.setTimeout(function () {
                b(f + g)
            }, g);
        a = f + g;
        return h
    });
    window.cancelAnimationFrame || (window.cancelAnimationFrame =

        function (a) {
            clearTimeout(a)
        })
})();
NEO.PI = 3.141592653589793;
NEO.PI90 = 1.570796326794896;
NEO.PI270 = 4.712388980384689;
NEO.TwoPI = 6.283185307179586;
NEO.degtorad = 0.017453292519943295;
NEO.radtodeg = 57.29577951308232;
NEO.sqrt = Math.sqrt;
NEO.abs = Math.abs;
NEO.max = Math.max;
NEO.pow = Math.pow;
NEO.floor = Math.floor;
NEO.round = Math.round;
NEO.asin = Math.asin;
NEO.sin = Math.sin;
NEO.cos = Math.cos;
NEO.lerp = function (a, b, c) {
    return a + (b - a) * c
};
NEO.rand = function (a, b) {
    return NEO.lerp(a, b, Math.random())
};
NEO.randInt = function (a, b, c) {
    return 1 * NEO.lerp(a, b, Math.random()).toFixed(c || 0)
};
NEO.int = function (a) {
    return a << 0
};
NEO.fix = function (a, b) {
    return 1 * a.toFixed(b || 0)
};
NEO.seed = function (a) {
    return function () {
        a = 1E4 * NEO.sin(a);
        return a - NEO.floor(a)
    }
};
NEO.ARRAY32 = "undefined" !== typeof Float32Array ? Float32Array : Array;
NEO.ARRAY8 = "undefined" !== typeof Uint8Array ? Uint8Array : Array;
NEO.Tween = function (a, b, c, d, e, f) {
    d = (d - e) / (f - e);
    c = NEO.Ease[c](1 < d ? 1 : d);
    return a > b ? a - (a - b) * c : a + (b - a) * c
};
NEO.Ease = {
    getNum: function (a) {
        var b;
        switch (a.substring(0, 4)) {
            case "quad":
                b = 7;
                break;
            case "cubi":
                b = 7;
                break;
            case "quar":
                b = 7;
                break;
            case "quin":
                b = 7;
                break;
            case "sine":
                b = 7;
                break;
            case "expo":
                b = 11;
                break;
            case "circ":
                b = 21;
                break;
            case "back":
                b = 11;
                break;
            case "elas":
                b = 11;
                break;
            case "boun":
                b = 21
        }
        return b
    },
    linear: function (a) {
        return a
    },
    "quad-in": function (a) {
        return a * a
    },
    "quad-out": function (a) {
        return a * (2 - a)
    },
    "quad-in-out": function (a) {
        return 1 > (a *= 2) ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1)
    },
    "cubic-in": function (a) {
        return a * a * a
    },
    "cubic-out": function (a) {
        return --a *

            a * a + 1
    },
    "cubic-in-out": function (a) {
        return 1 > (a *= 2) ? 0.5 * a * a * a : 0.5 * ((a -= 2) * a * a + 2)
    },
    "quart-in": function (a) {
        return a * a * a * a
    },
    "quart-out": function (a) {
        return 1 - --a * a * a * a
    },
    "quart-in-out": function (a) {
        return 1 > (a *= 2) ? 0.5 * a * a * a * a : -0.5 * ((a -= 2) * a * a * a - 2)
    },
    "quint-in": function (a) {
        return a * a * a * a * a
    },
    "quint-out": function (a) {
        return --a * a * a * a * a + 1
    },
    "quint-in-out": function (a) {
        return 1 > (a *= 2) ? 0.5 * a * a * a * a * a : 0.5 * ((a -= 2) * a * a * a * a + 2)
    },
    "sine-in": function (a) {
        return 1 - NEO.cos(a * NEO.PI90)
    },
    "sine-out": function (a) {
        return NEO.sin(a *

            NEO.PI90)
    },
    "sine-in-out": function (a) {
        return 0.5 * (1 - NEO.cos(NEO.PI * a))
    },
    "expo-in": function (a) {
        return 0 === a ? 0 : NEO.pow(1024, a - 1)
    },
    "expo-out": function (a) {
        return 1 === a ? 1 : 1 - NEO.pow(2, -10 * a)
    },
    "expo-in-out": function (a) {
        return 0 === a ? 0 : 1 === a ? 1 : 1 > (a *= 2) ? 0.5 * NEO.pow(1024, a - 1) : 0.5 * (-NEO.pow(2, -10 * (a - 1)) + 2)
    },
    "circ-in": function (a) {
        return 1 - NEO.sqrt(1 - a * a)
    },
    "circ-out": function (a) {
        return NEO.sqrt(1 - --a * a)
    },
    "circ-in-out": function (a) {
        return 1 > (a *= 2) ? -0.5 * (NEO.sqrt(1 - a * a) - 1) : 0.5 * (NEO.sqrt(1 - (a -= 2) * a) + 1)
    },
    "elastic-in": function (a) {
        var b,

            c = 0.1;
        if (0 === a) return 0;
        if (1 === a) return 1;
        !c || 1 > c ? (c = 1, b = 0.1) : b = 0.4 * NEO.asin(1 / c) / NEO.TwoPI;
        return -(c * NEO.pow(2, 10 * (a -= 1)) * NEO.sin((a - b) * NEO.TwoPI / 0.4))
    },
    "elastic-out": function (a) {
        var b, c = 0.1;
        if (0 === a) return 0;
        if (1 === a) return 1;
        !c || 1 > c ? (c = 1, b = 0.1) : b = 0.4 * NEO.asin(1 / c) / NEO.TwoPI;
        return c * NEO.pow(2, -10 * a) * NEO.sin((a - b) * NEO.TwoPI / 0.4) + 1
    },
    "elastic-in-out": function (a) {
        var b, c = 0.1;
        if (0 === a) return 0;
        if (1 === a) return 1;
        !c || 1 > c ? (c = 1, b = 0.1) : b = 0.4 * NEO.asin(1 / c) / NEO.TwoPI;
        return 1 > (a *= 2) ? -0.5 * c * NEO.pow(2, 10 * (a -=

            1)) * NEO.sin((a - b) * NEO.TwoPI / 0.4) : c * NEO.pow(2, -10 * (a -= 1)) * NEO.sin((a - b) * NEO.TwoPI / 0.4) * 0.5 + 1
    },
    "back-in": function (a) {
        return a * a * (2.70158 * a - 1.70158)
    },
    "back-out": function (a) {
        return --a * a * (2.70158 * a + 1.70158) + 1
    },
    "back-in-out": function (a) {
        return 1 > (a *= 2) ? 0.5 * a * a * (3.5949095 * a - 2.5949095) : 0.5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2)
    },
    "bounce-in": function (a) {
        return 1 - this["bounce-out"](1 - a)
    },
    "bounce-out": function (a) {
        return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) *

            a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
    },
    "bounce-in-out": function (a) {
        return 0.5 > a ? 0.5 * this["bounce-in"](2 * a) : 0.5 * this["bounce-out"](2 * a - 1) + 0.5
    }
};
NEO.hexToHtml = UIL.hexToHtml;
NEO.numToHex = function (a) {
    a || (a = 0);
    return "0x" + ("000000" + a.toString(16)).substr(-6)
};
NEO.hexFormat = function (a) {
    return a.toUpperCase().replace("#", "0x")
};
NEO.lerpColor = function (a, b, c) {
    a = [(a >> 16 & 255) / 255, (a >> 8 & 255) / 255, (a & 255) / 255];
    b = [(b >> 16 & 255) / 255, (b >> 8 & 255) / 255, (b & 255) / 255];
    a[0] += (b[0] - a[0]) * c;
    a[1] += (b[1] - a[1]) * c;
    a[2] += (b[2] - a[2]) * c;
    return 255 * a[0] << 16 ^ 255 * a[1] << 8 ^ 255 * a[2] << 0
};
NEO.invertColor = function (a) {
    return 16777215 ^ a
};
NEO.Sine = function (a, b, c, d) {
    return NEO.sin(c * a + b * NEO.degtorad) * d
};
NEO.Perlin = function (a) {
    this.F2 = 0.5 * (Math.sqrt(3) - 1);
    this.G2 = (3 - Math.sqrt(3)) / 6;
    var b = Math.random;
    a && (b = NEO.seed(a), b = NEO.seed(b()), b = NEO.seed(b()));
    this.p = new NEO.ARRAY8(256);
    this.perm = new NEO.ARRAY8(512);
    this.permMod12 = new NEO.ARRAY8(512);
    for (a = 0; 256 > a; a++) this.p[a] = 256 * b();
    for (a = 0; 512 > a; a++) this.perm[a] = this.p[a & 255], this.permMod12[a] = this.perm[a] % 12
};
NEO.Perlin.prototype = {
    grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]),
    noise: function (a, b) {
        var c = this.permMod12,
            d = this.perm,
            e = this.grad3,
            f = 0,
            g = 0,
            h = 0,
            l = (a + b) * this.F2,
            k = Math.floor(a + l),
            m = Math.floor(b + l),
            l = (k + m) * this.G2,
            p = a - (k - l),
            n = b - (m - l),
            z, v;
        p > n ? (z = 1, v = 0) : (z = 0, v = 1);
        var q = p - z + this.G2,
            t = n - v + this.G2,
            l = p - 1 + 2 * this.G2,
            x = n - 1 + 2 * this.G2,
            k = k & 255,
            m = m & 255,
            r = 0.5 - p * p - n * n;
        0 <= r && (f = 3 * c[k + d[m]], r *= r, f = r * r * (e[f] * p + e[f + 1] * n));
        p = 0.5 - q * q - t * t;
        0 <= p && (g = 3 * c[k + z +

            d[m + v]], p *= p, g = p * p * (e[g] * q + e[g + 1] * t));
        q = 0.5 - l * l - x * x;
        0 <= q && (c = 3 * c[k + 1 + d[m + 1]], q *= q, h = q * q * (e[c] * l + e[c + 1] * x));
        return 70 * (f + g + h)
    }
};
NEO.saveJson = function (a) {
    for (var b = {
        frameMax: NEO.frameMax,
        track: {}
    }, c = a.length, d, e = 0; e < c; e++) d = a[e], b.track[d.name] = {
        type: d.type,
        frame: d.getFrame()
    };
    a = JSON.stringify(b, null);
    a = a.replace('"frameMax"', '\n"frameMax"');
    a = a.replace('"track":{', '\n"track":{\n    ');
    a = a.replace(/}},/g, "}},\n    ");
    a = a.replace("}}}}", "}}\n    }\n}");
    NEO.TMPJSON = a;
    console.log(a);
    a = new Blob([a], {
        type: "text/plain"
    });
    a = window.URL.createObjectURL(a);
    window.open(a, "_blank");
    window.focus()
};
NEO.loadJson = function () {
    NEO.fromJson(NEO.TMPJSON)
};
NEO.fromJson = function (a) {
    NEO.main.clear();
    if ("" !== a) {
        a = JSON.parse(a);
        var b, c;
        for (c in a.track) b = a.track[c], NEO.main.add(b.type, {
            name: c,
            frame: b.frame
        })
    }
};
NEO.loadVideo = function (a, b) {
    var c = document.createElement("VIDEO"),
        d = document.createElement("source");
    d.setAttribute("src", "video/" + a);
    d.setAttribute("type", "video/mp4");
    c.appendChild(d);
    c.load();
    c.addEventListener("loadeddata", function () {
        c.autoplay = !1;
        var a = Math.floor(c.duration.toFixed(0) * b.frameRate * 2);
        b.totalFrame = Math.floor(c.duration.toFixed(0) * NEO.FPS);
        b.reSize();
        b.video = c;
        console.log(c.videoWidth, c.videoHeight, b.totalFrame, a)
    }, !1);
    document.body.insertBefore(c, document.body.firstChild);
    c.style.cssText =

        "pointer-events:none; position:absolute, width:100%; height:100%; "
};
NEO.Sound = new (window.AudioContext || window.webkitAudioContext || window.MozAudioContext || window.oAudioContext || window.msAudioContext);
NEO.loadSound = function (a, b) {
    var c = new XMLHttpRequest;
    c.open("GET", "sound/" + a, !0);
    c.responseType = "arraybuffer";
    c.onload = function (a) {
        NEO.Sound.decodeAudioData(c.response, function (a) {
            var c = Math.round(a.duration * NEO.FPS);
            NEO.clear(b.key);
            NEO.soundToImg(NEO.soundPeaks(a, !0), b.key);
            b.totalFrame = c;
            b.buffer = a;
            b.reSize()
        })
    };
    c.onerror = function (a) {
        console.log(a)
    };
    c.send()
};
NEO.soundPeaks = function (a, b) {
    for (var c = Math.round(a.duration * NEO.FPS), d = a.length / c, e = ~~(d / 10) || 1, f = a.numberOfChannels, g = [], h = [], l = 0; l < f; l++)
        for (var k = g[l] = [], m = a.getChannelData(l), p = 0; p < c; p++) {
            for (var n = ~~(p * d), z = ~~(n + d), v = 0; n < z; n += e) {
                var q = m[n];
                q > v ? v = q : -q > v && (v = -q)
            }
            k[p] = v;
            if (0 == l || v > h[p]) h[p] = v
        }
    return b ? g : h
};
NEO.soundToImg = function (a, b) {
    var c = a[0],
        d = a[1],
        e = void 0 === d ? !0 : !1,
        f = c.length,
        g = ~~(f / 500),
        h = f - 500 * g,
        l = 5E4 / f,
        f = 100 * h / f,
        k = document.createElement("canvas");
    k.height = 100;
    k.width = 500;
    var m = document.createElement("canvas");
    m.height = 100;
    m.width = h;
    var p = ["rgba(86,175,178,0.3)", "rgba(86,175,178,0.75)"],
        n = k.getContext("2d"),
        z = m.getContext("2d"),
        v = 0,
        q, t, x, r = e ? 50 : 25,
        u;
    for (q = 0; q <= g; q++) {
        x = 500;
        q === g && (x = h, l = f, k = m, n = z);
        n.clearRect(0, 0, 500, 100);
        n.beginPath();
        for (t = 0; t < x; t++) u = Math.round(c[t + v] * r), n.fillStyle = p[0],

            n.fillRect(t, r - u, 1, 2 * u), n.fillStyle = p[1], n.fillRect(t, r - u, 1, 1), n.fillRect(t, r + u, 1, 1), e || (u = Math.round(d[t + v] * r), n.fillStyle = p[0], n.fillRect(t, 75 - u, 1, 2 * u), n.fillStyle = p[1], n.fillRect(t, 75 - u, 1, 1), n.fillRect(t, 75 + u, 1, 1));
        v += 500;
        t = document.createElement("img");
        t.src = k.toDataURL();
        t.style.cssText = "image-rendering:pixelated; pointer-events:none; position:relative; width:" + l + "%; height:100%; display:inline-block; ";
        b.appendChild(t)
    }
};
NEO.computeControlPoints = function (a) {
    var b = [],
        c = [],
        d = [],
        e = [],
        f = [],
        g = [],
        h, l, k = a.length - 1;
    d[0] = 0;
    e[0] = 2;
    f[0] = 1;
    g[0] = a[0] + 2 * a[1];
    for (h = 1; h < k - 1; h++) d[h] = 1, e[h] = 4, f[h] = 1, g[h] = 4 * a[h] + 2 * a[h + 1];
    d[k - 1] = 2;
    e[k - 1] = 7;
    f[k - 1] = 0;
    g[k - 1] = 8 * a[k - 1] + a[k];
    for (h = 1; h < k; h++) l = d[h] / e[h - 1], e[h] -= l * f[h - 1], g[h] -= l * g[h - 1];
    b[k - 1] = 1 * (g[k - 1] / e[k - 1]).toFixed(2);
    for (h = k - 2; 0 <= h; h--) b[h] = 1 * ((g[h] - f[h] * b[h + 1]) / e[h]).toFixed(2);
    for (h = 0; h < k - 1; h++) c[h] = 1 * (2 * a[h + 1] - b[h + 1]).toFixed(2);
    c[k - 1] = 1 * (0.5 * (a[k] + b[k - 1])).toFixed(2);
    return [b, c]
};

NEO.Track = function (a) {
    a = void 0 === a ? {} : a;
    this.autoName = void 0 === a.name ? !0 : !1;
    this.name = a.name || this.type;
    this.select = !1;
    this.w = 10;
    this.maxw = 200;
    this.acolor = NEO.ACOLOR;
    this.drag = !1;
    this.current = null;
    this.id = 0;
    this.loadframe = a.frame || {};
    this.items = [];
    this.frame = {};
    this.lng = 0;
    this.show = !0;
    this.isMedia = this.needTimer = this.needTop = this.needNext = this.needPrev = !1;
    this.timer = null;
    this.top = 0;
    this.tt = 16;
    this.tb = 8;
    this.oldH = this.h = 50;
    var b = ~~(0.5 * (this.tt - 10));
    this.target = void 0 === a.target ? void 0 : a.target;
    a =

        [];
    a[0] = NEO.DOM("NEO", "div", "position:relative; overflow:hidden;");
    a[1] = NEO.DOM("NEO text", "div", "left:20px; padding:2px 0px; height:14px; top:1px; pointer-events:auto; cursor:pointer;");
    a[2] = NEO.liner(this.tt + 1, "#888", 0.5);
    a[3] = NEO.pins(this.tt);
    a[4] = NEO.dels(b);
    a[5] = NEO.DOM("NEO track", "div", "top:" + this.tt + "px;");
    a[6] = NEO.linerBottom(this.tb);
    a[7] = NEO.DOM("NEO", "div", "height:" + this.tt + "px;  width:100%; overflow:hidden; border-left:1px solid #555; border-right:1px solid #555; display:none;");
    a[1].name =

        "trackTitle";
    this.c = a
};
NEO.Track.prototype = {
    constructor: NEO.Track,
    getFrame: function () {
        for (var a = {}, b = this.items.length, c = 0; c < b; c++) a[this.items[c].frame] = this.items[c].getValue();
        return a
    },
    init: function () {
        var a = [];
        a[0] = this.c[0].style;
        a[0].height = this.h + "px";
        for (var b = NEO.frag(), c = 1, d = this.c.length; c !== d; c++) b.appendChild(this.c[c]), a[c] = this.c[c].style;
        this.c[1].textContent = this.name;
        this.c[5].name = this.type;
        this.c[6].id = this.id;
        this.c[1].id = this.id;
        void 0 !== this.target && this.target.appendChild(this.c[0]);
        this.c[0].appendChild(b);

        this.s = a;
        this.addFrame();
        this.setHeight();
        this.addEvent()
    },
    draw: function () { },
    showHide: function () {
        this.show ? this.close() : this.open()
    },
    editName: function () {
        this.s[1].display = "none";
        this.tmpName = UIL.add("string", {
            target: this.c[0],
            value: this.name,
            size: 80,
            height: 14,
            simple: !0,
            pos: {
                left: "20px",
                top: "1px"
            }
        }).onChange(this.endEditName.bind(this))
    },
    endEditName: function (a) {
        this.tmpName.clear();
        this.name = a;
        this.autoName = !1;
        this.c[1].textContent = this.name;
        this.s[1].display = "block"
    },
    selected: function () {
        this.select =

            !0;
        this.s[1].color = "#CC0";
        this.show || (this.c[3].childNodes[0].style.background = "#CC0");
        this.c[3].childNodes[0].style.borderColor = "#CC0";
        this.s[7].display = "block"
    },
    unSelected: function () {
        this.select = !1;
        this.s[1].color = "#CCC";
        this.show || (this.c[3].childNodes[0].style.background = "#CCC");
        this.c[3].childNodes[0].style.borderColor = "#CCC";
        this.s[7].display = "none";
        this.unselectAllKey()
    },
    update: function (a) {
        this.v = this.frame[a];
        void 0 !== this.v && (this.needPrev && (this.prev = this.v), this.needNext && (this.next = this.v <

            this.lng - 1 ? this.v + 1 : void 0))
    },
    reset: function (a) {
        a = this.resetLevel(a, this.frame, this.lng);
        this.prev = a[0];
        this.next = a[1]
    },
    resetLevel: function (a, b, c) {
        var d, e, f, g;
        f = b[a];
        if (void 0 !== f) d = 0 < f ? f - 1 : void 0, e = f + 1 < c ? f + 1 : void 0;
        else {
            if (!this.needPrev && !this.needNext) return [];
            g = Object.keys(b);
            if (this.needPrev && a > g[0])
                for (f = a; void 0 === d;) f-- , d = b[f];
            if (this.needNext && a < g[c - 1])
                for (f = a; void 0 === e;) f++ , e = b[f]
        }
        return [d, e]
    },
    setHeight: function (a) {
        a && (this.h = a);
        this.oldH = this.h;
        this.s[0].height = this.h + "px";
        this.s[5].height =

            this.h - this.tt - this.tb + "px";
        this.changeHeight()
    },
    applyHeight: function () {
        this.s[0].height = this.h + "px";
        NEO.main.calc()
    },
    changeHeight: function () { },
    rename: function (a) {
        this.id = a;
        this.c[6].id = this.id;
        this.c[1].id = this.id;
        this.autoName && (this.name = this.type + this.id, this.c[1].textContent = this.name)
    },
    open: function () {
        this.show = !0;
        this.h = this.oldH;
        this.c[3].childNodes[0].style.background = "none";
        this.s[5].display = "block";
        this.s[6].display = "block";
        this.s[2].opacity = 0.5;
        this.applyHeight()
    },
    close: function () {
        this.show =

            !1;
        this.h = this.tt + 1;
        this.c[3].childNodes[0].style.background = this.select ? "#CC0" : "#CCC";
        this.s[5].display = "none";
        this.s[6].display = "none";
        this.s[2].opacity = 1;
        this.applyHeight()
    },
    syncroTrack: function (a, b) {
        this.s[5].left = -a + "px";
        b && (this.maxw = b, this.w = NEO.frameSize, this.s[5].width = b + "px", this.setSize())
    },
    setID: function (a) {
        this.id = a;
        this.c[6].id = this.id;
        this.c[1].id = this.id
    },
    clear: function () {
        this.clearEvent();
        NEO.clear(this.c[0]);
        void 0 !== this.target && this.target.removeChild(this.c[0]);
        NEO.main.remove(this.id);

        this.c = null;
        this.target = void 0
    },
    selectKey: function (a) {
        this.unselectAllKey();
        this.items[a].selected();
        return this.items[a]
    },
    unselectAllKey: function () {
        for (var a = this.items.length; a--;) this.items[a].unSelected()
    },
    setSize: function () {
        for (var a = this.items.length; a--;) this.items[a].reSize(this.w);
        "lfo" !== this.type && "audio" !== this.type || this.draw()
    },
    addFrame: function () {
        var a, b = this.loadframe;
        for (a in b) this.addItem(parseInt(a), b[a]);
        this.sort()
    },
    addItem: function (a, b, c) {
        var d = this.type[0].toUpperCase() + this.type.slice(1);

        "Bang" === d && (d = "");
        "Curve" === d && (c = void 0 === c ? this.currentLevel : c);
        "Module" === d && (c = this.name);
        a = new NEO["Key" + d](a, b, c);
        a.parent = this;
        a.reSize();
        this.c[5].appendChild(a.content);
        "Curve" === d ? (1 === this.nAxe && a.pcolor(NEO.KCOLOR), this.items[c].push(a)) : this.items.push(a);
        return a
    },
    removeID: function (a, b) {
        var c = void 0 !== b ? this.items[b] : this.items;
        this.c[5].removeChild(c[a].content);
        c[a].clear();
        c.splice(a, 1);
        this.sort(!0)
    },
    sort: function (a) {
        this.items.sort(function (a, b) {
            return a.frame - b.frame
        });
        for (var b =

            this.lng = this.items.length, c, d = {}; b--;) c = this.items[b], c.setID(b), d[c.frame] = b;
        this.frame = d;
        this.draw();
        a && this.showUpdate()
    },
    showUpdate: function () {
        NEO.play || NEO.main.goTo()
    },
    down: function (a) {
        var b = a.which,
            c = a.target.name;
        NEO.main.selected(this);
        if ("input" !== c && "colorselect" !== c) {
            var d = NEO.main.getFrameClick(a.clientX);
            if ("key" === c.substring(0, 3)) {
                var c = a.target.id,
                    e;
                "curve" === this.type && (e = a.target.level);
                1 === b && (this.current = this.selectKey(c, e), void 0 !== this.current && (this.drag = this.current.first =

                    !0, this.move(a)));
                3 === b && this.removeID(c, e)
            } else 1 === b && void 0 === this.frame[d] && (this.current = this.addItem(d), "curve" === this.type && (this.current.py = a.clientY - (this.top + this.tt)), this.sort(!0), this.selectKey(this.current.getID()), this.drag = this.current.first = !0, this.move(a, 1))
        }
    },
    up: function (a) {
        this.drag && (this.drag = !1, this.s[5].cursor = "pointer", this.sort(!0));
        this.current = void 0
    },
    move: function (a, b) {
        if (this.drag && void 0 !== this.current) {
            var c = NEO.main.getFrameClick(a.clientX);
            "curve" === this.type ? (this.s[5].cursor =

                "move", this.current.move(c, a.clientY - (this.top + this.tt))) : (this.s[5].cursor = "e-resize", this.current.move(c, b));
            this.needTimer && (clearTimeout(this.timer), this.timer = setTimeout(this.sort.bind(this), 0, !0))
        }
    },
    click: function (a) {
        a.target.name && (a = a.target.name, "pins" === a && (this.show ? this.close() : this.open()), "dels" === a && this.clear())
    },
    doubleClick: function (a) {
        this.editName()
    },
    addEvent: function () {
        this.c[1].addEventListener("dblclick", this, !1);
        this.c[3].addEventListener("click", this, !1);
        this.c[4].addEventListener("click",

            this, !1);
        this.c[5].addEventListener("mousedown", this, !1);
        this.c[5].addEventListener("mousemove", this, !1);
        NEO.Doc.addEventListener("mouseup", this, !1)
    },
    clearEvent: function () {
        this.c[1].addEventListener("dblclick", this, !1);
        this.c[3].removeEventListener("click", this, !1);
        this.c[4].removeEventListener("click", this, !1);
        this.c[5].removeEventListener("mousedown", this, !1);
        this.c[5].removeEventListener("mousemove", this, !1);
        NEO.Doc.removeEventListener("mouseup", this, !1)
    },
    handleEvent: function (a) {
        switch (a.type) {
            case "dblclick":
                this.doubleClick(a);

                break;
            case "click":
                this.click(a);
                break;
            case "mousedown":
                this.down(a);
                break;
            case "mousemove":
                this.move(a);
                break;
            case "mouseup":
                this.up(a)
        }
    }
};

NEO.Key = function (a) {
    this.parent = null;
    this.value = 1;
    this.co = ["#6BB", "#BB6", "#F66"];
    this.select = !1;
    this.frame = a;
    this.df = 0;
    this.first = !1;
    this.cct = "background";
    this.w = NEO.frameSize;
    this.content = NEO.DOM("NEO", "div", "width:1px; height:100%; left:0px; top:0; overflow:visible;");
    this.key = NEO.DOM("NEO", "div", "width:100%; height:100%; opacity:0.5; left:0; top:0; pointer-events:auto; cursor:e-resize; background:" + this.co[0]);
    this.content.appendChild(this.key);
    this.ks = this.key.style;
    this.cs = this.content.style;

    this.key.name = "key";
    this.key.addEventListener("mouseover", this, !1);
    this.key.addEventListener("mouseout", this, !1)
};
NEO.Key.prototype = {
    constructor: NEO.Key,
    selected: function () {
        this.select = !0;
        this.ks[this.cct] = this.co[1];
        NEO.main.showPannel(this)
    },
    unSelected: function () {
        this.select = !1;
        this.ks[this.cct] = this.co[0]
    },
    getValue: function () {
        return this.value
    },
    getID: function () {
        return this.key.id
    },
    setID: function (a) {
        this.key.id = a
    },
    handleEvent: function (a) {
        switch (a.type) {
            case "mousemove":
                this.mmove(a);
                break;
            case "mouseover":
                this.over(a);
                break;
            case "mouseout":
                this.out(a)
        }
    },
    over: function (a) {
        this.ks[this.cct] = this.co[1]
    },
    out: function (a) {
        this.ks[this.cct] =

            this.select ? this.co[1] : this.co[0]
    },
    mmove: function (a) { },
    down: function (a) { },
    up: function (a) { },
    clear: function () {
        this.key.removeEventListener("mouseover", this, !1);
        this.key.removeEventListener("mouseout", this, !1);
        NEO.clear(this.content);
        this.content = null
    },
    move: function (a) {
        this.first && (this.first = !1, this.df = a - this.frame);
        a -= this.df;
        a = 0 > a ? 0 : a;
        var b = this.parent.frame[a];
        void 0 !== b && b !== this.key.id && (a = this.frame);
        this.ks[this.cct] = this.co[2];
        this.frame = a;
        this.l = NEO.int(this.frame * this.w);
        this.cs.left = this.l +

            "px"
    },
    reSize: function (a) {
        this.w = void 0 === a ? this.w : a;
        this.l = NEO.int(this.frame * this.w);
        this.sx = NEO.int(this.w);
        this.sx = 6 > this.sx ? 6 : this.sx;
        this.cs.width = this.sx + "px";
        this.cs.left = this.l + "px"
    },
    getX: function () {
        return this.l + 0.5 * this.w
    }
};

NEO.Bang = function (a) {
    NEO.Track.call(this, a);
    this.init()
};
NEO.Bang.prototype = Object.create(NEO.Track.prototype);
NEO.Bang.prototype.constructor = NEO.Bang;
NEO.Bang.prototype.type = "bang";
NEO.Bang.prototype.update = function (a) {
    a = void 0 === this.frame[a] ? !1 : !0;
    this.select && (this.c[5].style.background = a ? this.acolor : "none");
    return a
};

NEO.Color = function (a) {
    NEO.DID++;
    this.degradId = "deg" + NEO.DID;
    this.degrad = [];
    this.linear = [];
    this.degNumber = 5;
    NEO.Track.call(this, a);
    this.needTop = this.needNext = this.needPrev = this.needTimer = !0;
    this.createDegrad();
    this.init()
};
NEO.Color.prototype = Object.create(NEO.Track.prototype);
NEO.Color.prototype.constructor = NEO.Color;
NEO.Color.prototype.type = "color";
NEO.Color.prototype.update = function (a) {
    NEO.Track.prototype.update.call(this, a);
    var b = void 0 === this.v ? void 0 : this.items[this.v].value,
        c = this.items[this.prev],
        d = this.items[this.next];
    void 0 === b && (void 0 === c && void 0 !== d ? b = d.value : void 0 === d && void 0 !== c ? b = c.value : void 0 !== d && void 0 !== c && (b = NEO.lerpColor(c.value, d.value, (a - c.frame) / (d.frame - c.frame))));
    return NEO.numToHex(b)
};
NEO.Color.prototype.createDegrad = function () {
    var a, b, c;
    for (a = this.degNumber; a--;) b = NEO.DOM("NEO", "defs", "position:absolute; top:0px; left:100px; width:100px; height:100%;", {}), c = NEO.DOM(null, "linearGradient", "", {
        id: this.degradId + a,
        x1: "0%",
        y1: "0%",
        x2: "100%",
        y2: "0%"
    }, b, 0), NEO.DOM(null, "rect", "", {
        width: "100%",
        height: "100%",
        stroke: "none",
        x: 0,
        fill: "url(#" + (this.degradId + a) + ")"
    }, b), this.c[5].appendChild(b), this.degrad[a] = b, this.linear[a] = c
};
NEO.Color.prototype.draw = function () {
    for (var a = NEO.frameMax, b = a / this.degNumber, c = 100 / this.degNumber, d = this.linear.length, e; d--;)
        for (e = this.linear[d].childNodes[0]; e.firstChild;) e.removeChild(e.firstChild);
    for (d = this.linear.length; d--;) this.reset(b * d), NEO.DOM(null, "stop", "", {
        offset: 0,
        "stop-color": NEO.hexToHtml(this.update(b * d)),
        "stop-opacity": 1
    }, this.linear[d], 0);
    e = this.items.length;
    for (var f, g, d = 0; d < e; d++) f = (100 * this.items[d].frame / a).toFixed(4), g = Math.floor(f / c), NEO.DOM(null, "stop", "", {
        offset: f / c -

            g,
        "stop-color": NEO.hexToHtml(this.items[d].value),
        "stop-opacity": 1
    }, this.linear[g], 0);
    for (d = this.linear.length; d--;) this.reset(b * (d + 1) - 1), NEO.DOM(null, "stop", "", {
        offset: 1,
        "stop-color": NEO.hexToHtml(this.update(b * (d + 1) - 1)),
        "stop-opacity": 1
    }, this.linear[d], 0)
};
NEO.Color.prototype.moveDegrad = function (a, b) {
    this.keys[a] = b;
    this.draw()
};
NEO.Color.prototype.setSize = function () {
    for (var a = this.items.length, b; a--;) b = this.items[a], b.reSize(this.w);
    b = Math.floor(NEO.frameMax / this.degNumber * NEO.frameSize);
    for (a = this.degrad.length; a--;) this.degrad[a].style.width = b + "px", this.degrad[a].style.left = b * a + "px"
};

NEO.KeyColor = function (a, b) {
    NEO.Key.call(this, a);
    this.value = void 0 === b ? 255 : b;
    this.ks.background = "none";
    this.ks.width = "16px";
    this.ks.marginLeft = "-8px";
    this.ks.left = "50%";
    this.ks.borderRadius = "7px";
    this.ks.boxShadow = "0 0 0 1px " + NEO.hexToHtml(NEO.invertColor(this.value));
    this.ks.border = "4px solid " + this.co[0];
    this.cct = "borderColor"
};
NEO.KeyColor.prototype = Object.create(NEO.Key.prototype);
NEO.KeyColor.prototype.constructor = NEO.KeyColor;
NEO.KeyColor.prototype.setColor = function (a) {
    this.value = NEO.numToHex(a);
    this.ks.boxShadow = "0 0 0 1px " + NEO.hexToHtml(NEO.invertColor(this.value));
    this.parent.sort(!0)
};

NEO.Curve = function (a) {
    a.frame = void 0 === a.frame ? {
        x: {}
    } : a.frame;
    this.nAxe = 0;
    this.px = -10;
    this.range = a.frame.range || [-100, 100];
    this.precision = a.frame.precision || 3;
    this.defaultTween = a.frame.def || "linear";
    void 0 !== a.frame.x && this.nAxe++;
    void 0 !== a.frame.y && this.nAxe++;
    void 0 !== a.frame.z && this.nAxe++;
    void 0 !== a.frame.w && this.nAxe++;
    this.basePos = [0, 0, 0, 0];
    this.basey = [0, 0, 0, 0];
    NEO.Track.call(this, a);
    this.items = [];
    this.frame = [];
    this.lng = [];
    this.prev = [];
    this.next = [];
    this.loadframe = [];
    this.currentLevel = 0;
    this.value =

        {};
    this.axis = ["x", "y", "z", "w"];
    this.pointhide = this.needTop = this.needNext = this.needPrev = this.needTimer = !0;
    this.origine = NEO.liner(0, NEO.ACOLOR);
    this.c[5].appendChild(this.origine);
    this.color = 1 === this.nAxe ? [NEO.KCOLOR] : ["#F33", "#3F3", "#59F", "#F95"];
    this.curves = [];
    this.points = [];
    for (var b = 0; b < this.nAxe; b++) this.curves[b] = NEO.DOM("NEO", "path", "opacity:0.75; width:100%; height:100%; left:0; top:0;", {
        width: "100%",
        height: "100%",
        d: "",
        "stroke-width": 1,
        stroke: this.color[b],
        fill: "none",
        "stroke-linecap": "butt"
    }),

        this.points[b] = NEO.DOM("NEO", "div", "left:0; margin-left:-5px; margin-top:-5px; border-radius:5px; width:10px; height:10px; border:1px solid " + this.color[b] + "; display:none"), this.c[5].appendChild(this.curves[b]), this.c[5].appendChild(this.points[b]), 0 === b && (this.value.x = 0, this.loadframe[0] = a.frame.x || {}), 1 === b && (this.value.y = 0, this.loadframe[1] = a.frame.y || {}), 2 === b && (this.value.z = 0, this.loadframe[2] = a.frame.z || {}), 3 === b && (this.value.w = 0, this.loadframe[3] = a.frame.w || {}), this.items.push([]), this.lng.push(0);

    this.h = a.h || 102 + this.tt + this.tb;
    this.ofRange(this.range[0], this.range[1]);
    this.init()
};
NEO.Curve.prototype = Object.create(NEO.Track.prototype);
NEO.Curve.prototype.constructor = NEO.Curve;
NEO.Curve.prototype.type = "curve";
NEO.Curve.prototype.getFrame = function () {
    var a = {},
        b = this.value;
    void 0 !== b.x && (a.x = {}, this.pushValue(a.x, 0));
    void 0 !== b.y && (a.y = {}, this.pushValue(a.y, 1));
    void 0 !== b.z && (a.z = {}, this.pushValue(a.z, 2));
    void 0 !== b.w && (a.w = {}, this.pushValue(a.w, 3));
    a.range = [this.range[0], this.range[1]];
    return a
};
NEO.Curve.prototype.pushValue = function (a, b) {
    for (var c = this.items[b].length, d = 0; d < c; d++) a[this.items[b][d].frame] = this.items[b][d].getValue()
};
NEO.Curve.prototype.update = function (a) {
    var b = this.value;
    void 0 !== b.x && (b.x = this.upLevel(a, 0));
    void 0 !== b.y && (b.y = this.upLevel(a, 1));
    void 0 !== b.z && (b.z = this.upLevel(a, 2));
    void 0 !== b.w && (b.w = this.upLevel(a, 3));
    this.displayPoint(a);
    return 1 === this.nAxe ? b.x : b
};
NEO.Curve.prototype.upLevel = function (a, b) {
    var c = this.frame[b][a],
        d = [0, this.basePos[b], "linear"],
        e = [NEO.frameMax, this.basePos[b]],
        f = 0;
    void 0 !== c ? (f = this.items[b][c].pos, this.prev[b] = c, this.next[b] = c < this.lng[b] - 1 ? c + 1 : void 0) : (c = this.items[b][this.prev[b]], f = this.items[b][this.next[b]], void 0 !== c && (d = [c.frame, c.pos, c.ease]), void 0 !== f && (e = [f.frame, f.pos]), f = NEO.Tween(d[1], e[1], d[2], a, d[0], e[0]));
    return 1 * f.toFixed(this.precision)
};
NEO.Curve.prototype.displayPoint = function (a, b) {
    var c = !1,
        d = !1,
        e = 0;
    this.select ? (this.pointhide && (this.pointhide = !1, c = !0), d = !0, e = NEO.frameTrack) : this.pointhide || (c = this.pointhide = !0);
    if (c || d)
        for (d = this.nAxe; d--;) c && (this.points[d].style.display = this.pointhide ? "none" : "block"), this.points[d].style.top = ~~this.yFromPos(this.value[this.axis[d]]) + "px", this.points[d].style.left = e + "px"
};
NEO.Curve.prototype.draw = function (a) {
    if (a)
        for (a = this.nAxe; a--;) this.drawLevel(a);
    else this.drawLevel(this.currentLevel)
};
NEO.Curve.prototype.drawLevel = function (a) {
    var b = [],
        c, d, e;
    c = this.items[a][0];
    void 0 !== c ? (this.basePos[a] = c.pos, this.basey[a] = c.getY()) : (this.basePos[a] = 0, this.basey[a] = this.midy + 0.5);
    b.push("M 0 " + this.basey[a]);
    c = this.lng[a];
    for (e = 0; e !== c; e++) d = this.items[a][e].ease, "linear" === d ? b.push(" L " + this.items[a][e].getX() + " " + this.items[a][e].getY()) : this.besierSpline(d, this.items[a][e], this.items[a][e + 1], b, a);
    b.push(" L " + this.maxw + " " + this.basey[a]);
    this.curves[a].childNodes[0].setAttributeNS(null, "d",

        b.join("\n"))
};
NEO.Curve.prototype.besierSpline = function (a, b, c, d, e) {
    var f = [],
        g = [],
        h = b.frame,
        l, k = NEO.Ease.getNum(a);
    f[0] = b.getX();
    g[0] = b.getY();
    void 0 === c ? (l = NEO.frameMax, f[k] = b.getLastX(l - 1), g[k] = this.basey[e]) : (l = c.frame, f[k] = c.getX(), g[k] = c.getY());
    if (g[0] === g[k]) d.push(" L " + f[0] + " " + g[0]);
    else {
        e = (l - h) / (k - 1);
        var m = (f[k] - f[0]) / (k - 1),
            p = g[0],
            n = g[k];
        for (b = k; b--;) c = h + e * b, f[b] = NEO.fix(f[0] + m * b, 2), g[b] = NEO.fix(NEO.Tween(p, n, a, c, h, l), 2);
        l = NEO.computeControlPoints(f);
        b = NEO.computeControlPoints(g);
        a = l[0];
        h = b[0];
        l = l[1];

        c = b[1];
        for (b = 0; b < k - 1; b++) d.push(" L " + f[b] + " " + g[b] + " C " + a[b] + " " + h[b] + " " + l[b] + " " + c[b] + " " + f[b + 1] + " " + g[b + 1])
    }
};
NEO.Curve.prototype.ofRange = function (a, b) {
    this.range[0] = a;
    this.range[1] = b;
    var c, d;
    0 > a ? (c = Math.abs(a) + Math.abs(b), d = a) : 0 < a ? (c = b - a, d = a) : (c = b, d = 0);
    var e = this.h - this.tt - this.tb;
    this.range[2] = c / e;
    this.range[3] = e / c;
    this.range[4] = d * this.range[3];
    this.range[5] = e;
    this.midy = 0.5 * this.range[5];
    this.origine.style.top = ~~this.midy + "px"
};
NEO.Curve.prototype.changeHeight = function () {
    this.ofRange(this.range[0], this.range[1]);
    for (var a = this.nAxe, b; a--;)
        for (b = this.items[a].length; b--;) this.items[a][b].setY();
    this.draw(!0)
};
NEO.Curve.prototype.yFromPos = function (a) {
    return this.range[5] - a * this.range[3] + this.range[4]
};
NEO.Curve.prototype.posFromY = function (a) {
    return (this.range[5] - a) * this.range[2] + this.range[0]
};
NEO.Curve.prototype.reset = function (a) {
    for (var b = this.nAxe, c; b--;) c = this.resetLevel(a, this.frame[b], this.lng[b]), this.prev[b] = c[0], this.next[b] = c[1]
};
NEO.Curve.prototype.sort = function (a) {
    for (var b = this.nAxe, c; b--;)
        for (this.items[b].sort(function (a, b) {
            return a.frame - b.frame
        }), this.lng[b] = this.items[b].length, this.frame[b] = {}, c = this.lng[b]; c--;) this.items[b][c].setID(c, b), this.frame[b][this.items[b][c].frame] = c;
    this.draw();
    a && this.showUpdate()
};
NEO.Curve.prototype.setSize = function () {
    for (var a = this.nAxe, b; a--;)
        for (b = this.lng[a]; b--;) this.items[a][b].reSize(this.w);
    this.draw(!0)
};
NEO.Curve.prototype.addFrame = function () {
    for (var a, b, c = this.nAxe; c--;)
        for (a in b = this.loadframe[c], b) this.addItem(parseInt(a), b[a], c);
    this.sort()
};
NEO.Curve.prototype.selectKey = function (a, b) {
    this.unselectAllKey();
    b = void 0 === b ? this.currentLevel : b;
    this.items[b][a].selected();
    return this.items[b][a]
};
NEO.Curve.prototype.unselectAllKey = function () {
    for (var a = this.nAxe, b; a--;)
        for (b = this.lng[a]; b--;) this.items[a][b].unSelected()
};

NEO.KeyCurve = function (a, b, c) {
    b = b || [];
    this.pos = b[0] || 0;
    this.ease = b[1] || "linear";
    this.level = c;
    this.py = 0;
    this.name = this.ext = "";
    NEO.Key.call(this, a);
    this.ks.width = "16px";
    this.ks.height = "16px";
    this.ks.marginLeft = "-8px";
    this.ks.marginTop = "-8px";
    this.ks.left = "50%";
    this.ks.borderRadius = "7px";
    this.ks.cursor = "crosshair";
    this.ks.border = "3px solid " + this.co[0];
    this.cct = "borderColor";
    this.ks.background = "none";
    this.color = ["#F33", "#3F3", "#59F", "#F95"];
    this.point = NEO.DOM("NEO", "div", "top:50%; left:50%; margin-left:-3px; margin-top:-3px; border-radius:3px; width:6px; height:6px; background:" +

        this.color[this.level], null, this.key)
};
NEO.KeyCurve.prototype = Object.create(NEO.Key.prototype);
NEO.KeyCurve.prototype.constructor = NEO.KeyCurve;
NEO.KeyCurve.prototype.getValue = function () {
    return [this.pos, this.ease]
};
NEO.KeyCurve.prototype.pcolor = function (a) {
    this.point.style.background = a
};
NEO.KeyCurve.prototype.clear = function () {
    this.key.removeChild(this.point);
    NEO.Key.prototype.clear.call(this)
};
NEO.KeyCurve.prototype.setY = function () {
    this.py = this.parent.yFromPos(this.pos);
    this.ks.top = ~~this.py + "px"
};
NEO.KeyCurve.prototype.getLastX = function (a) {
    return Math.floor(a * this.w + 0.5 * this.w)
};
NEO.KeyCurve.prototype.getY = function () {
    return this.py
};
NEO.KeyCurve.prototype.setAxe = function () {
    var a = 0;
    "y" === this.axe && (a = 1);
    "z" === this.axe && (a = 2);
    "w" === this.axe && (a = 3);
    return a
};
NEO.KeyCurve.prototype.getType = function () {
    var a = this.ease,
        b = a.length;
    "-in-out" === a.substring(b - 7) ? (this.name = a.substring(0, b - 7), this.ext = "-in-out") : "-in" === a.substring(b - 3) ? (this.name = a.substring(0, b - 3), this.ext = "-in") : "-out" === a.substring(b - 4) ? (this.name = a.substring(0, b - 4), this.ext = "-out") : (this.name = a, this.ext = "")
};
NEO.KeyCurve.prototype.setType = function (a) {
    this.name = a;
    this.setEase()
};
NEO.KeyCurve.prototype.setExt = function (a) {
    this.ext = a;
    this.setEase()
};
NEO.KeyCurve.prototype.setEase = function () {
    "linear" === this.name ? this.ease = this.name : ("" === this.ext && (this.ext = "-in"), this.ease = this.name + this.ext);
    this.parent.currentLevel = this.level;
    this.parent.sort(!0)
};
NEO.KeyCurve.prototype.move = function (a, b) {
    var c = 0;
    this.first && (this.first = !1, this.parent.currentLevel = this.level, c = b - this.py, this.df = a - this.frame);
    var d = this.parent.frame[this.level][a];
    void 0 !== d && d !== this.key.id && (a = this.frame);
    this.ks[this.cct] = this.co[2];
    this.frame = a - this.df;
    this.l = ~~(this.frame * this.w);
    this.content.style.left = this.l + "px";
    this.py = b - c;
    this.pos = this.parent.posFromY(this.py);
    this.ks.top = ~~this.py + "px"
};
NEO.KeyCurve.prototype.getID = function (a) {
    return this.key.id
};
NEO.KeyCurve.prototype.setID = function (a, b) {
    this.key.id = a;
    this.level = b;
    this.key.level = b
};

NEO.Flag = function (a) {
    NEO.Track.call(this, a);
    this.needPrev = !0;
    this.h = 80;
    this.hmax = Math.floor((this.h - this.tt - this.tb) / 18) - 1;
    this.init()
};
NEO.Flag.prototype = Object.create(NEO.Track.prototype);
NEO.Flag.prototype.constructor = NEO.Flag;
NEO.Flag.prototype.type = "flag";
NEO.Flag.prototype.update = function (a) {
    NEO.Track.prototype.update.call(this, a);
    (a = void 0 === this.v ? "" : this.items[this.v].value) || (a = void 0 === this.prev ? "" : this.items[this.prev].value);
    this.select && (this.c[5].style.background = void 0 !== this.v ? this.acolor : "none");
    return a
};
NEO.Flag.prototype.draw = function () {
    for (var a = 0, b = this.items.length, c = 0; c !== b; c++) this.items[c].setPy(a), a < this.hmax ? a++ : a = 0
};
NEO.Flag.prototype.changeHeight = function () {
    this.hmax = Math.floor((this.h - this.tt - this.tb) / 18) - 1;
    this.draw()
};

NEO.KeyFlag = function (a, b) {
    NEO.Key.call(this, a);
    this.value = b || "";
    this.flagName = UIL.add("string", {
        target: this.content,
        value: this.value,
        color: "no",
        size: 80,
        height: 18,
        simple: !0,
        allway: !0,
        pos: {
            left: this.w + "px",
            top: "0px"
        }
    }).onChange(function (a) {
        this.value = a;
        this.parent.showUpdate()
    }.bind(this))
};
NEO.KeyFlag.prototype = Object.create(NEO.Key.prototype);
NEO.KeyFlag.prototype.constructor = NEO.KeyFlag;
NEO.KeyFlag.prototype.clear = function () {
    this.flagName.clear();
    NEO.Key.prototype.clear.call(this)
};
NEO.KeyFlag.prototype.reSize = function (a) {
    NEO.Key.prototype.reSize.call(this, a);
    this.flagName.c[0].style.left = this.sx + "px"
};
NEO.KeyFlag.prototype.setPy = function (a) {
    this.flagName.c[0].style.top = 18 * a + "px"
};

NEO.Lfo = function (a) {
    NEO.Track.call(this, a);
    this.pointhide = this.needTop = this.needPrev = this.needTimer = !0;
    this.origine = NEO.liner(0, NEO.ACOLOR);
    this.c[5].appendChild(this.origine);
    this.curve = NEO.DOM("NEO", "path", "width:100%; height:100%; left:0; top:0;", {
        width: "100%",
        height: "100%",
        d: "",
        "stroke-width": 1,
        stroke: NEO.KCOLOR,
        fill: "none",
        "stroke-linecap": "butt"
    });
    this.point = NEO.DOM("NEO", "div", "left:0; margin-left:-5px; margin-top:-5px; border-radius:5px; width:10px; height:10px; border:1px solid " + NEO.KCOLOR +

        "; display:none");
    this.c[5].appendChild(this.curve);
    this.c[5].appendChild(this.point);
    this.h = a.h || 102 + this.tt + this.tb;
    this.ofRange();
    this.init()
};
NEO.Lfo.prototype = Object.create(NEO.Track.prototype);
NEO.Lfo.prototype.constructor = NEO.Lfo;
NEO.Lfo.prototype.type = "lfo";
NEO.Lfo.prototype.update = function (a) {
    NEO.Track.prototype.update.call(this, a);
    var b = 0,
        c;
    c = void 0 === this.v ? void 0 === this.prev ? void 0 : this.prev : this.v;
    void 0 !== c && (c = this.items[c], "sine" === c.curve && (b = NEO.Sine(a - c.frame, c.phase, c.frequency, c.amplitude)), "noise" === c.curve && (b = c.perlin.noise((a - c.frame) * c.frequency * 0.1, 0)));
    this.select ? (this.pointhide && (this.pointhide = !1, this.point.style.display = "block"), this.point.style.top = b * (this.midy - 10) + this.midy + "px", this.point.style.left = NEO.frameTrack + "px") : this.pointhide ||

        (this.pointhide = !0, this.point.style.display = "none");
    return b
};
NEO.Lfo.prototype.draw = function () {
    var a = NEO.frameSize,
        b = NEO.frameMax,
        c, d = [];
    d.push("M 0 " + this.midy);
    for (var e = this.lng, f = 0; f !== e; f++) c = f < e - 1 ? this.items[f + 1].frame - this.items[f].frame : b, "sine" === this.items[f].curve && this.curveSine(this.items[f], c, a, d), "noise" === this.items[f].curve && this.curveNoise(this.items[f], c, a, d);
    d.push(" L " + this.maxw + " " + this.midy);
    this.curve.childNodes[0].setAttributeNS(null, "d", d.join("\n"))
};
NEO.Lfo.prototype.curveNoise = function (a, b, c, d) {
    c = a.getX();
    var e = a.perlin,
        f = a.amplitude;
    a = a.frequency;
    for (var g = this.midy, h = this.w, l, k, m, p = b / 1, n = 1; n < p; n += 2) b = (n - 1) * h * 1 + c, k = e.noise((n - 1) * a * 0.1, 0) * f * (g - 10) + g, l = n * h * 1 + c, m = e.noise(n * a * 0.1, 0) * f * (g - 10) + g, k = k.toFixed(2), m = m.toFixed(2), d.push(" L " + b + " " + k + " " + l + " " + m)
};
NEO.Lfo.prototype.curveSine = function (a, b, c, d) {
    c = a.getX();
    var e, f, g, h = this.midy,
        l = a.amplitude,
        k = a.frequency;
    a = a.phase;
    for (var m = this.w, p = b / 0.25, n = 1; n < p; n += 2) b = (n - 1) * m * 0.25 + c, f = NEO.Sine(0.25 * (n - 1), a, k, l) * (h - 10) + h, e = n * m * 0.25 + c, g = NEO.Sine(0.25 * n, a, k, l) * (h - 10) + h, f = f.toFixed(2), g = g.toFixed(2), d.push(" L " + b + " " + f + " " + e + " " + g)
};
NEO.Lfo.prototype.ofRange = function () {
    this.midy = 0.5 * (this.h - this.tt - this.tb);
    this.origine.style.top = ~~this.midy + "px"
};
NEO.Lfo.prototype.changeHeight = function () {
    this.ofRange();
    this.draw()
};

NEO.KeyLfo = function (a, b) {
    b = b || [];
    this.curve = b[0] || "sine";
    this.frequency = b[1] || 0.1;
    this.amplitude = b[2] || 1;
    this.phase = b[3] || 0;
    this.seed = b[4] || 0;
    "noise" === this.curve && (this.perlin = new NEO.Perlin(this.seed));
    NEO.Key.call(this, a)
};
NEO.KeyLfo.prototype = Object.create(NEO.Key.prototype);
NEO.KeyLfo.prototype.constructor = NEO.KeyLfo;
NEO.KeyLfo.prototype.getValue = function () {
    return [this.curve, this.frequency, this.amplitude, this.phase, this.seed]
};
NEO.KeyLfo.prototype.setValue = function (a, b) {
    this[b] = a;
    if ("noise" === b || "seed" === b) this.perlin = new NEO.Perlin(this.seed);
    this.parent.draw()
};

NEO.Switch = function (a) {
    NEO.Track.call(this, a);
    this.needPrev = !0;
    this.init()
};
NEO.Switch.prototype = Object.create(NEO.Track.prototype);
NEO.Switch.prototype.constructor = NEO.Switch;
NEO.Switch.prototype.type = "switch";
NEO.Switch.prototype.update = function (a) {
    NEO.Track.prototype.update.call(this, a);
    var b = void 0 === this.v ? !1 : !0,
        c = this.items[this.prev];
    void 0 !== c && (b = a <= c.end ? !0 : b);
    this.select && (this.c[5].style.background = b ? this.acolor : "none");
    return b
};

NEO.KeySwitch = function (a, b) {
    this.end = b || a + 1;
    this.dragtype = 0;
    NEO.Key.call(this, a);
    this.min = this.decal = 0;
    this.max = NEO.frameMax - 1;
    this.ks.borderLeft = "1px solid #FFF";
    this.ks.borderRight = "1px solid #FFF";
    this.key.addEventListener("mousemove", this, !1)
};
NEO.KeySwitch.prototype = Object.create(NEO.Key.prototype);
NEO.KeySwitch.prototype.constructor = NEO.KeySwitch;
NEO.KeySwitch.prototype.getValue = function () {
    return this.end
};
NEO.KeySwitch.prototype.clear = function () {
    this.key.removeEventListener("mousemove", this, !1);
    NEO.Key.prototype.clear.call(this)
};
NEO.KeySwitch.prototype.reSize = function (a) {
    NEO.Key.prototype.reSize.call(this, a);
    this.reSizeLength()
};
NEO.KeySwitch.prototype.reSizeLength = function () {
    this.lng = this.end - this.frame;
    var a = NEO.int(this.w * (this.lng + 1));
    this.ks.width = a + "px"
};
NEO.KeySwitch.prototype.mmove = function (a) {
    a = NEO.main.getFrameClick(a.clientX);
    this.ks.cursor = a < this.frame + 2 ? "e-resize" : a > this.end - 2 ? "e-resize" : "pointer"
};
NEO.KeySwitch.prototype.move = function (a, b) {
    var c = this.parent;
    this.first && (this.first = !1, this.dragtype = a < this.frame + 2 ? 0 : a > this.end - 2 ? 1 : 2, b && (this.dragtype = b), this.decal = a - this.frame, c.reset(this.frame), void 0 !== c.next && (this.max = c.items[c.next].frame - 1), void 0 !== c.prev && (this.min = c.items[c.prev].end + 1));
    this.ks[this.cct] = this.co[2];
    switch (this.dragtype) {
        case 2:
            this.frame = a - this.decal;
            this.frame = 0 > this.frame ? 0 : this.frame;
            this.frame = this.frame < this.min ? this.min : this.frame;
            this.frame = this.frame + this.lng >

                this.max ? this.max - this.lng : this.frame;
            this.end = this.frame + this.lng;
            this.l = ~~(this.frame * this.w);
            this.content.style.left = this.l + "px";
            break;
        case 1:
            a = a < this.frame + 1 ? this.frame + 1 : a;
            this.end = a > this.max ? this.max : a;
            this.reSizeLength();
            break;
        default:
            a = a > this.end - 1 ? this.end - 1 : a, a = a < this.min ? this.min : a, NEO.Key.prototype.move.call(this, a), this.reSizeLength()
    }
};

NEO.Audio = function (a) {
    this.range = a.range || [-100, 100];
    NEO.Track.call(this, a);
    this.isMedia = this.needPrev = !0;
    this.origine = NEO.liner(0, NEO.ACOLOR);
    this.h = a.h || 102 + this.tt + this.tb;
    this.init()
};
NEO.Audio.prototype = Object.create(NEO.Track.prototype);
NEO.Audio.prototype.constructor = NEO.Audio;
NEO.Audio.prototype.type = "audio";
NEO.Audio.prototype.update = function (a) {
    NEO.Track.prototype.update.call(this, a);
    var b = void 0 === this.v ? void 0 === this.prev ? void 0 : this.prev : this.v;
    void 0 !== b && NEO.play && this.items[b].play(a)
};
NEO.Audio.prototype.reset = function (a) {
    this.stop();
    NEO.Track.prototype.reset.call(this, a)
};
NEO.Audio.prototype.stop = function () {
    for (var a = this.items.length; a--;) this.items[a].stop()
};

NEO.KeyAudio = function (a, b) {
    NEO.Key.call(this, a);
    this.value = b || "";
    this.totalFrame = 0;
    this.source = this.buffer = null;
    this.key.style.borderLeft = "1px solid " + this.co[0];
    this.key.style.borderRight = "1px solid " + this.co[0];
    this.cct = "borderColor";
    this.key.style.background = "none";
    this.flagName = UIL.add("string", {
        target: this.content,
        value: this.value,
        color: "no",
        size: 80,
        height: 18,
        simple: !0,
        pos: {
            left: this.w + "px",
            top: "0px"
        }
    }).onChange(function (a) {
        this.value = a;
        NEO.loadSound(this.value, this)
    }.bind(this));
    this.value &&

        NEO.loadSound(this.value, this)
};
NEO.KeyAudio.prototype = Object.create(NEO.Key.prototype);
NEO.KeyAudio.prototype.constructor = NEO.KeyFlag;
NEO.KeyAudio.prototype.play = function (a) {
    a >= this.frame && a < this.frame + this.totalFrame && null === this.source && this.connect(a)
};
NEO.KeyAudio.prototype.stop = function () {
    null !== this.source && (this.source.stop(0), this.source = null)
};
NEO.KeyAudio.prototype.connect = function (a) {
    this.buffer && (this.source = NEO.Sound.createBufferSource(), this.source.buffer = this.buffer, this.source.connect(NEO.Sound.destination), this.source.start(this.frame * NEO.frameTime, (a - this.frame) * NEO.frameTime))
};
NEO.KeyAudio.prototype.clear = function () {
    this.flagName.clear();
    NEO.Key.prototype.clear.call(this)
};
NEO.KeyAudio.prototype.reSize = function (a) {
    NEO.Key.prototype.reSize.call(this, a);
    this.flagName.c[0].style.left = this.sx + "px";
    this.key.style.width = ~~(this.w * this.totalFrame) + 2 + "px"
};

NEO.Video = function (a) {
    NEO.Track.call(this, a);
    this.isMedia = this.needPrev = !0;
    this.h = a.h || 102 + this.tt + this.tb;
    this.init()
};
NEO.Video.prototype = Object.create(NEO.Track.prototype);
NEO.Video.prototype.constructor = NEO.Video;
NEO.Video.prototype.type = "video";
NEO.Video.prototype.update = function (a) {
    NEO.Track.prototype.update.call(this, a);
    var b = 0,
        c = void 0 === this.v ? void 0 === this.prev ? void 0 : this.prev : this.v;
    void 0 !== c && (NEO.play && this.items[c].play(a), b = this.items[c].getFrame());
    return b
};
NEO.Video.prototype.reset = function (a) {
    this.videoGo(a);
    NEO.Track.prototype.reset.call(this, a)
};
NEO.Video.prototype.stop = function () {
    for (var a = this.items.length; a--;) this.items[a].stop()
};
NEO.Video.prototype.videoGo = function (a) {
    for (var b = this.items.length; b--;) this.items[b].seek(a)
};

NEO.KeyVideo = function (a, b) {
    b = b || [];
    this.name = b[0] || "";
    this.frameRate = b[1] || 24;
    NEO.Key.call(this, a);
    this.totalFrame = 0;
    this.video = null;
    this.inPlay = !1;
    this.ks.borderLeft = "1px solid " + this.co[0];
    this.ks.borderRight = "1px solid " + this.co[0];
    this.cct = "borderColor";
    this.flagName = UIL.add("string", {
        target: this.content,
        value: this.name,
        color: "no",
        size: 80,
        height: 18,
        simple: !0,
        pos: {
            left: this.w + "px",
            top: "0px"
        }
    }).onChange(function (a) {
        this.name = a;
        NEO.loadVideo(this.name, this)
    }.bind(this));
    this.name && NEO.loadVideo(this.name,

        this)
};
NEO.KeyVideo.prototype = Object.create(NEO.Key.prototype);
NEO.KeyVideo.prototype.constructor = NEO.KeyFlag;
NEO.KeyVideo.prototype.getValue = function () {
    return [this.name, this.frameRate]
};
NEO.KeyVideo.prototype.seek = function (a) {
    null !== this.video && (this.video.paused || this.video.pause(), a >= this.frame && a < this.frame + this.totalFrame && (this.video.currentTime = (a - this.frame) * NEO.frameTime + 1E-5))
};
NEO.KeyVideo.prototype.getFrame = function () {
    if (null !== this.video) return 2 * Math.floor(this.video.currentTime.toFixed(5) * this.frameRate)
};
NEO.KeyVideo.prototype.play = function (a) {
    a >= this.frame && a < this.frame + this.totalFrame && !this.inPlay && (this.inPlay = !0, this.video.play())
};
NEO.KeyVideo.prototype.stop = function () {
    null !== this.video && (this.inPlay = !1, this.video.pause(), console.log("pause"))
};
NEO.KeyVideo.prototype.clear = function () {
    this.flagName.clear();
    NEO.Key.prototype.clear.call(this)
};
NEO.KeyVideo.prototype.reSize = function (a) {
    NEO.Key.prototype.reSize.call(this, a);
    this.flagName.c[0].style.left = this.sx + "px";
    this.ks.width = ~~(this.w * this.totalFrame) + 2 + "px"
};

NEO.Module = function (a) {
    NEO.Track.call(this, a);
    this.needPrev = !0;
    this.h = 80;
    this.init()
};
NEO.Module.prototype = Object.create(NEO.Track.prototype);
NEO.Module.prototype.constructor = NEO.Module;
NEO.Module.prototype.type = "module";
NEO.Module.prototype.update = function (a) {
    NEO.Track.prototype.update.call(this, a);
    var b = void 0 === this.v ? "" : this.items[this.v].value,
        c = this.items[this.prev];
    void 0 !== c && (b = a <= c.end ? this.items[this.prev].value : "");
    this.select && (this.c[5].style.background = b ? this.acolor : "none");
    return b
};

NEO.KeyModule = function (a, b, c) {
    NEO.Key.call(this, a);
    b = b || [];
    this.end = b[0] || a + 1;
    this.value = b[1] || c;
    this.min = this.decal = this.dragtype = 0;
    this.max = NEO.frameMax - 1;
    this.ks.borderLeft = "1px solid #FFF";
    this.ks.borderRight = "1px solid #FFF";
    NEO.DOM("NEO", "div", "top:1px; left:1px; right:1px; bottom:1px;  background:" + UIL.SlideBG_NN, null, this.key);
    this.flagName = UIL.add("string", {
        target: this.content,
        value: this.value,
        color: "no",
        size: 80,
        height: 18,
        simple: !0,
        allway: !0,
        pos: {
            left: this.w + "px",
            top: "0px"
        }
    }).onChange(function (a) {
        this.value =

            a
    }.bind(this));
    this.key.addEventListener("mousemove", this, !1)
};
NEO.KeyModule.prototype = Object.create(NEO.KeySwitch.prototype);
NEO.KeyModule.prototype.constructor = NEO.KeyModule;
NEO.KeyModule.prototype.getValue = function () {
    return [this.end, this.value]
};
NEO.KeyModule.prototype.clear = function () {
    this.flagName.clear();
    this.key.removeEventListener("mousemove", this, !1);
    NEO.Key.prototype.clear.call(this)
};
NEO.Pannel = function () {
    this.content = NEO.DOM("NEO", "div", "top:0; left:0; width:300px; height:16px; display:none; ");
    NEO.Doc.body.appendChild(this.content);
    this.key = null;
    this.type = "";
    this.init()
};

// -----------------
//  CONSTRUCT PANEL
// -----------------
NEO.Pannel.prototype = {
    constructor: NEO.Pannel,
    init: function () {
        var a = {};
        a.color = UIL.add("color", {
            target: this.content,
            callback: null,
            name: " ",
            color: "n",
            size: 100,
            pos: {
                left: "10px",
                top: "-1px"
            },
            simple: !0,
            side: "down",
            type: "hex",
            height: 18
        });
        a.curve1 = UIL.add("list", {
            target: this.content,
            list: "linear quad cubic quart quint sine expo circ elastic back bounce".split(" "),
            size: 80,
            pos: {
                left: "10px",
                top: "-1px"
            },
            simple: !0,
            side: "down",
            full: !0,
            height: 18,
            align: "left"
        });
        a.curve2 = UIL.add("list", {
            target: this.content,
            list: ["-in",

                "-out", "-in-out"
            ],
            size: 80,
            pos: {
                left: "92px",
                top: "-1px"
            },
            simple: !0,
            side: "down",
            full: !0,
            height: 18,
            align: "left"
        });
        a.lfo1 = UIL.add("list", {
            target: this.content,
            list: ["sine", "noise"],
            size: 80,
            pos: {
                left: "10px",
                top: "-1px"
            },
            simple: !0,
            side: "down",
            full: !0,
            height: 18,
            align: "left"
        });
        a.lfo2 = UIL.add("number", {
            target: this.content,
            name: "frequency",
            min: 0,
            max: 1,
            value: 0,
            precision: 2,
            pos: {
                left: "92px",
                top: "-1px"
            },
            size: 124,
            p: 60,
            height: 18
        });
        a.lfo3 = UIL.add("number", {
            target: this.content,
            name: "amplitude",
            min: 0,
            max: 1,
            value: 0,
            precision: 2,

            pos: {
                left: "210px",
                top: "-1px"
            },
            size: 124,
            p: 60,
            height: 18
        });
        a.lfo4 = UIL.add("number", {
            target: this.content,
            name: "seed",
            min: 0,
            max: 999,
            value: 0,
            precision: 0,
            pos: {
                left: "336px",
                top: "-1px"
            },
            size: 100,
            p: 50,
            height: 18
        });
        a.lfo5 = UIL.add("number", {
            target: this.content,
            name: "phase",
            min: 0,
            max: 360,
            value: 0,
            precision: 0,
            pos: {
                left: "336px",
                top: "-1px"
            },
            size: 100,
            p: 50,
            height: 18
        });
        this.pannels = a
    },
    resize: function (a, b) {
        this.content.style.left = a + 100 + "px";
        this.content.style.width = b - 120 + "px"
    },
    move: function () {
        if (null !== this.key) {
            var a =

                this.key.parent.top,
                b = NEO.main.isInView(a);
            this.display(b);
            b && (this.content.style.top = a + "px")
        }
    },
    setKey: function (a) {
        this.key = a;
        this.type = a.parent.type;
        this.move();
        this.hideAll();
        var b = this.pannels,
            c, d, e;
        switch (this.type) {
            case "color":
                a = b.color;
                a.display(!0);
                a.onChange(function (a) {
                    this.key.setColor(a)
                }.bind(this));
                a.setColor(NEO.hexToHtml(this.key.value));
                a.hide();
                break;
            case "curve":
                this.key.getType();
                a = b.curve1;
                c = b.curve2;
                a.display(!0);
                a.text(this.key.name);
                a.onChange(function (a) {
                    this.key.setType(a);

                    this.testEase(a, this.key.ext)
                }.bind(this));
                c.onChange(function (a) {
                    this.key.setExt(a)
                }.bind(this));
                this.testEase(this.key.name, this.key.ext);
                break;
            case "lfo":
                a = b.lfo1, c = b.lfo2, d = b.lfo3, e = b.lfo4, b = b.lfo5, a.display(!0), c.display(!0), d.display(!0), a.text(this.key.curve), c.setValue(this.key.frequency), d.setValue(this.key.amplitude), e.setValue(this.key.seed), b.setValue(this.key.phase), a.onChange(function (a) {
                    this.key.setValue(a, "curve");
                    this.testLfo(a)
                }.bind(this)), c.onChange(function (a) {
                    this.key.setValue(a,

                        "frequency")
                }.bind(this)), d.onChange(function (a) {
                    this.key.setValue(a, "amplitude")
                }.bind(this)), e.onChange(function (a) {
                    this.key.setValue(a, "seed")
                }.bind(this)), b.onChange(function (a) {
                    this.key.setValue(a, "phase")
                }.bind(this)), this.testLfo(this.key.curve)
        }
    },
    testLfo: function (a) {
        var b = this.pannels;
        "noise" === a ? (b.lfo4.display(!0), b.lfo5.display()) : (b.lfo4.display(), b.lfo5.display(!0))
    },
    testEase: function (a, b) {
        var c = this.pannels;
        "linear" === a ? c.curve2.display() : (c.curve2.display(!0), c.curve2.text(b))
    },
    hideAll: function () {
        for (var a in this.pannels) this.pannels[a].display()
    },

    display: function (a) {
        null === this.key && (a = !1);
        this.content.style.display = a ? "block" : "none"
    },
    clear: function () {
        this.key = null;
        this.type = ""
    }
};
var neo = function () {
    neo = function () { };
    neo.callback = function () { };
    neo.data = {};
    var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, l = 0, k = 0, m = [], p = 0, n = 0, z = 0, v = 0, q = 0, t = 0, x = 0, r = {
        start: 0,
        end: 1,
        lng: 1,
        decal: 0,
        mid: 0,
        midpos: 0
    }, u = 0, A = 89, B = 0, y = 0, w = 0, s = 0, D = 0, W = 1, H = 0, X = 0, Y, C = 0, Z = 0, ea = 0, F = "", K = null, G = 0, L = 0, $ = 0, M = !1, N, O, P, Q, R, S, aa, ba, T, I, ca, J, U, fa, E, da, ga, V = null;
    neo.init = function (a) {
        a = void 0 === a ? {} : a;
        void 0 !== a.callback && (neo.callback = a.callback);
        c = a.zone || 50;
        NEO.frameMax = a.nframe || 750;
        n = a.top || 20;
        v = a.bottom || 20;
        p = a.left || 20;
        z = a.right ||

            20;
        var b = NEO.DOM("NEO", "div", "top:" + n + "px; left:" + p + "px; pointer-events:auto; overflow:hidden; margin-left:-2px; margin-top:-2px; box-sizing:content-box; border:2px solid #888; "),
            s = NEO.DOM("NEO", "div", "top:" + n + "px; left:" + p + "px; width:100px; height:30px; overflow:visible; background:rgba(10,10,10,0.4); ");
        this.initTopMenu(s);
        var d = NEO.DOM("NEO", "div", "width:100%; top:30px; height:20px; overflow:hidden; padding:1px 5px;");
        this.initNavMenu(d);
        var e = NEO.DOM("NEO", "div", "width:100%; height:20px; top:50px; pointer-events:auto; cursor:col-resize; "),

            f = NEO.DOM("NEO", "div", "width:100%; height:20px; top:0;", null, e),
            h = NEO.DOM("NEO", "defs", "width:100%; height:20px; bottom:0; ", {}),
            g = NEO.DOM(null, "pattern", "", {
                id: "timeBar",
                x: 0,
                y: 0,
                width: 50,
                height: 20,
                patternUnits: "userSpaceOnUse",
                patternTransform: "translate(-0.5)"
            }, h, 0),
            g = NEO.DOM(null, "g", "", {
                stroke: "#888",
                "stroke-width": 1,
                fill: "none",
                "stroke-linecap": "butt"
            }, g, 0);
        NEO.DOM(null, "path", "", {
            d: "M0 0"
        }, g, 0);
        NEO.DOM(null, "rect", "", {
            width: "100%",
            height: 20,
            x: 0,
            fill: "url(#timeBar)"
        }, h);
        P = h.childNodes[0].childNodes[0];

        f.appendChild(h);
        f.appendChild(NEO.liner(20));
        e.name = "timeBar";
        f = NEO.DOM("NEO", "div", "width:100%; height:20px; bottom:0; pointer-events:auto; cursor:e-resize; overflow:hidden; border-top:1px solid #888;");
        f.name = "timescale";
        h = NEO.DOM("NEO", "div", "width:200px; height:16px; top:2px;", null, f);
        h.appendChild(NEO.liner(8));
        var g = NEO.DOM("NEO", "div", "width:16px; height:16px; top:0px; pointer-events:auto; cursor:pointer; border:2px solid #888; border-radius:8px;left:-8px;", null, h),
            D = NEO.DOM("NEO", "div", "width:16px; height:16px; top:0px; pointer-events:auto; cursor:pointer; border:2px solid #888; border-radius:8px;right:-8px;",

                null, h);
        g.name = "scaleLeft";
        D.name = "scaleRight";
        g.onmouseover = this.scalerOver;
        D.onmouseover = this.scalerOver;
        g.onmouseout = this.scalerOut;
        D.onmouseout = this.scalerOut;
        g = NEO.DOM("NEO", "div", "width:1px; height:15px; top:2px; background:#888;", null, f);
        D = NEO.DOM("NEO", "div", "width:100%; top:70px; height:0px; overflow:hidden;");
        Q = NEO.DOM("NEO", "div", "width:100%; top:0px; height:0px; overflow:hidden;", null, D);
        var k = NEO.DOM("NEO", "div", "top:52px; width:10px; height:60px; overflow:hidden;");
        NEO.DOM("NEO", "div",

            "width:100%; top:0; height:16px; background:#888; border-radius:20px;", null, k);
        NEO.DOM("NEO", "div", "left:50%; margin-left:-1px; width:2px; top:18px; height:100%; background:#888; opacity:0.5; ", null, k);
        var m = NEO.DOM("NEO", "div", "position:absolute; width:19px; height:100px; left:auto; right:1px; top:69px; border-left:1px solid #888; border-top:1px solid #888; background:#1b1b1b; pointer-events:auto; cursor:n-resize;");
        NEO.DOM("NEO", "div", "position:absolute; width:10px; height:20px; left:4px; top:0px; background:#666; ",

            null, m);
        m.name = "hscroll";
        var l = NEO.frag();
        l.appendChild(e);
        l.appendChild(f);
        l.appendChild(D);
        l.appendChild(k);
        l.appendChild(m);
        l.appendChild(d);
        b.appendChild(l);
        NEO.Doc.body.appendChild(b);
        NEO.Doc.body.appendChild(s);
        R = m.style;
        S = k.style;
        aa = g.style;
        ba = m.childNodes[0].style;
        T = Q.style;
        I = h.style;
        ca = D.style;
        J = b.style;
        U = s.style;
        fa = e.style;
        E = new NEO.Pannel;
        this.setFps(a.fps || 60);
        this.activeEvents();
        this.resize();
        NEO.Doc.body.addEventListener("keydown", neo.keydown, !1);
        NEO.main = neo
    };
    neo.getFrame = function () {
        return a
    };
    neo.setFrame = function (b) {
        a = b
    };
    neo.initTopMenu = function (a) {
        O = NEO.DOM("NEO", "div", "top:9px; left:10px; width:150px; height:14px; font-size:14px; letter-spacing:-1px;");
        O.textContent = "0:00:00.00 | 0";
        a.appendChild(O);
        UIL.add("number", {
            target: a,
            name: "max",
            min: 1,
            value: NEO.frameMax,
            step: 1,
            drag: !1,
            size: 100,
            sa: 40,
            center: !0,
            height: 24,
            pos: {
                left: "auto",
                right: "80px",
                top: "3px"
            }
        }).onChange(function (a) {
            NEO.frameMax = a;
            neo.setRange()
        });
        UIL.add("number", {
            target: a,
            name: "fps",
            min: 12,
            max: 60,
            value: NEO.FPS,
            step: 1,
            drag: !1,

            size: 80,
            sa: 40,
            sb: 30,
            center: !0,
            height: 24,
            pos: {
                left: "auto",
                right: "0px",
                top: "3px"
            }
        }).onChange(function (a) {
            neo.setFps(a)
        });
        UIL.add("list", {
            target: a,
            list: "bang flag curve lfo color switch audio video module".split(" "),
            size: 80,
            pos: {
                left: "324px",
                top: "3px"
            },
            simple: !0,
            side: "down",
            full: !0,
            height: 24
        }).onChange(function (a) {
            neo.add(a);
            this.text("ADD")
        }).text("ADD");
        UIL.add("button", {
            target: a,
            name: "save",
            size: 50,
            pos: {
                left: "414px",
                top: "3px"
            },
            simple: !0,
            height: 24
        }).onChange(function (a) {
            NEO.saveJson(m)
        });
        UIL.add("button", {
            target: a,
            name: "load",
            size: 50,
            pos: {
                left: "466px",
                top: "3px"
            },
            simple: !0,
            height: 24
        }).onChange(function (a) {
            NEO.loadJson()
        });
        var b = UIL.add("button", {
            target: a,
            size: 24,
            pos: {
                left: "170px",
                top: "3px"
            },
            simple: !0,
            height: 24
        }).onChange(function (a) {
            neo.moveTo(0)
        }),
            c = UIL.add("button", {
                target: a,
                size: 24,
                pos: {
                    left: "196px",
                    top: "3px"
                },
                simple: !0,
                height: 24
            }).onChange(function (a) {
                0 !== neo.getFrame() && neo.goTo(neo.getFrame() - 1)
            }),
            s = UIL.add("button", {
                target: a,
                size: 24,
                pos: {
                    left: "264px",
                    top: "3px"
                },
                simple: !0,
                height: 24
            }).onChange(function (a) {
                neo.getFrame() <

                    NEO.frameMax - 1 && neo.goTo(neo.getFrame() + 1)
            }),
            d = UIL.add("button", {
                target: a,
                size: 24,
                pos: {
                    left: "290px",
                    top: "3px"
                },
                simple: !0,
                height: 24
            }).onChange(function (a) {
                neo.moveTo(NEO.frameMax - 1)
            });
        N = UIL.add("button", {
            target: a,
            size: 40,
            pos: {
                left: "222px",
                top: "3px"
            },
            simple: !0,
            height: 24
        }).onChange(function (a) {
            neo.play()
        });
        da = "<svg xmlns=" + NEO.svgns + " width='18px' height='17px'><path fill='#CCC' d='M 14 8 L 5 3 4 4 4 13 5 14 14 9 14 8 Z'/></svg>";
        ga = "<svg xmlns=" + NEO.svgns + " width='18px' height='17px'><path fill='#CCC' d='M 14 4 L 13 3 11 3 10 4 10 13 11 14 13 14 14 13 14 4 M 8 4 L 7 3 5 3 4 4 4 13 5 14 7 14 8 13 8 4 Z'/></svg>";
        a = "<svg xmlns=" + NEO.svgns + " width='18px' height='17px'><path fill='#CCC' d='M 11 12 L 11 10 14 10 14 7 11 7 11 5 8 8 8 9 11 12 M 7 12 L 6 12 6 5 7 5 7 3 4 3 4 14 7 14 7 12 Z'/></svg>";
        var f = "<svg xmlns=" + NEO.svgns + " width='18px' height='17px'><path fill='#CCC' d='M 10 8 L 7 5 7 7 4 7 4 10 7 10 7 12 10 9 10 8 M 14 3 L 11 3 11 5 12 5 12 12 11 12 11 14 14 14 14 3 Z'/></svg>",
            e = "<svg xmlns=" + NEO.svgns + " width='18px' height='17px'><path fill='#CCC' d='M 11 12 L 11 10 14 10 14 7 11 7 11 5 8 8 8 9 11 12 Z'/></svg>",
            h = "<svg xmlns=" + NEO.svgns + " width='18px' height='17px'><path fill='#CCC' d='M 10 8 L 7 5 7 7 4 7 4 10 7 10 7 12 10 9 10 8 Z'/></svg>";
        N.icon(da, 2);
        b.icon(a, 2);
        d.icon(f, 2);
        c.icon(e, 2);
        s.icon(h, 2)
    };
    neo.initNavMenu = function (a) {
        UIL.add("button", {
            target: a,
            name: "root",
            size: 60,
            css: "margin-left:5px;",
            simple: !0,
            height: 18
        })
    };
    neo.showHide = function () {
        NEO.visible ? (NEO.visible = !1, J.display = "none", U.display = "none", E.display(), this.selected(), this.removeEvents()) : (NEO.visible = !0, J.display = "block", U.display = "block",

            E.display(!0), this.activeEvents())
    };
    neo.activeEvents = function () {
        var a = neo.handleEvent;
        NEO.Doc.addEventListener("mousedown", a, !1);
        NEO.Doc.addEventListener("mousemove", a, !1);
        NEO.Doc.addEventListener("mouseup", a, !1);
        NEO.Doc.addEventListener("mousewheel", a, !1);
        NEO.Doc.addEventListener("contextmenu", a, !1);
        window.addEventListener("resize", function (a) {
            neo.resize(a)
        }, !1)
    };
    neo.removeEvents = function () {
        var a = neo.handleEvent;
        NEO.Doc.removeEventListener("mousedown", a, !1);
        NEO.Doc.removeEventListener("mousemove",

            a, !1);
        NEO.Doc.removeEventListener("mouseup", a, !1);
        NEO.Doc.removeEventListener("mousewheel ", a, !1);
        NEO.Doc.removeEventListener("contextmenu", a, !1);
        window.removeEventListener("resize", function (a) {
            neo.resize(a)
        }, !1)
    };
    neo.handleEvent = function (a) {
        switch (a.type) {
            case "keydown":
                neo.keydown(a);
                break;
            case "contextmenu":
                neo.mouseMenu(a);
                break;
            case "mousewheel":
                neo.wheel(a);
                break;
            case "mousedown":
                neo.down(a);
                break;
            case "mousemove":
                neo.move(a);
                break;
            case "mouseup":
                neo.up(a)
        }
    };
    neo.keydown = function (a) {
        switch (a.keyCode) {
            case 84:
                neo.showHide();

                break;
            case 32:
                neo.play()
        }
    };
    neo.mouseMenu = function (a) {
        a.preventDefault()
    };
    neo.wheel = function (a) {
        if (M) {
            var b = 0;
            a.wheelDeltaY ? b = 0.04 * -a.wheelDeltaY : a.wheelDelta ? b = 0.2 * -a.wheelDelta : a.detail && (b = 4 * a.detail);
            C += b;
            this.moveHScroll()
        }
    };
    neo.down = function (a) {
        if (a.target.name) {
            var b = a.target.name;
            "trackTitle" === b && this.selected(m[a.target.id]);
            "timeBar" === b || "timescale" === b || "scaleRight" === b || "scaleLeft" === b || "scaleBar" === b || "hscroll" === b ? ("timeBar" === b && NEO.play && this.pause(), "timescale" === b && this.findDecal(a.clientX),

                "scaleBar" === b && (K = m[a.target.id]), F = b, this.move(a)) : F = ""
        } else F = ""
    };
    neo.move = function (a) {
        if (F) {
            var b = a.clientX - p;
            a = a.clientY;
            b = 0 > b ? 0 : b;
            switch (F) {
                case "timeBar":
                    this.goTo(this.getFrameClick(b, !0));
                    break;
                case "timescale":
                    this.moveScroll(b, !0);
                    break;
                case "scaleLeft":
                    this.changeRange(b);
                    break;
                case "scaleRight":
                    this.changeRange(b, !0);
                    break;
                case "scaleBar":
                    this.setTrackHeight(a);
                    break;
                case "hscroll":
                    this.moveHScroll(a)
            }
        }
    };
    neo.up = function (a) {
        F = "";
        K = null
    };
    neo.scalerOver = function (a) {
        a.target.style.background =

            NEO.SELECT;
        a.target.style.borderColor = NEO.SELECT
    };
    neo.scalerOut = function (a) {
        a.target.style.background = "none";
        a.target.style.borderColor = "#888"
    };
    neo.pause = function () {
        NEO.play = !1;
        this.stopMedia();
        N.icon(da, 2)
    };
    neo.play = function () {
        NEO.play ? this.pause() : (NEO.play = !0, N.icon(ga, 2), this.loop())
    };
    neo.loop = function (a) {
        NEO.play && window.requestAnimationFrame(neo.loop);
        neo.update(a);
        neo.callback()
    };
    neo.update = function (b) {
        h = b;
        h - 1E3 > d && (d = h, e = f, f = 0);
        f++;
        l = void 0 === b ? 17 : h - k;
        if (l > g) {
            k = 17 === l ? 0 : h - l % g;
            this.updateTime(!0);

            var c = a,
                s = {};
            m.forEach(function (a) {
                s[a.name] = a.update(c)
            });
            neo.data = s;
            NEO.play && (this.autoScroll(), a++);
            a >= NEO.frameMax && this.moveTo(0)
        }
    };
    neo.updateTime = function (c) {
        var s, d, f;
        f = NEO.frameSize;
        c && (b = a / NEO.FPS, c = NEO.int(b / 60 / 60), s = NEO.int(b / 60) % 60, d = b % 60, O.textContent = c + ":" + (10 > s ? "0" : "") + s + ":" + (10 > d ? "0" : "") + d.toFixed(3) + " | " + a, NEO.frameTrack = NEO.int(a * f + 0.5 * W));
        f = NEO.int((a - r.start) * f);
        c = NEO.int(a * L) + 1;
        S.left = f + "px";
        aa.left = c + "px"
    };
    neo.goTo = function (b) {
        a = void 0 === b ? a : b;
        this.reset(a);
        NEO.play || this.loop()
    };
    neo.moveTo = function (a) {
        r.end = a - 10;
        this.goTo(a);
        this.autoScroll()
    };
    neo.autoScroll = function () {
        if (a > r.end) {
            var b = Math.round(a * L);
            this.moveScroll(b)
        }
    };
    neo.findDecal = function (a) {
        a = a - p - r.midpos;
        r.decal = Math.abs(a) < r.mid ? a : 0
    };
    neo.moveScroll = function (a, b) {
        b && (a -= r.mid + r.decal);
        a = 0 > a ? 0 : a;
        a = a > r.max ? r.max : a;
        this.moveRange(a)
    };
    neo.setRange = function () {
        G = NEO.frameMax / q;
        L = q / NEO.frameMax;
        s = NEO.int(c * NEO.frameMax / 100 * L);
        w = y + s;
        I.width = s + "px";
        $ = NEO.int(q / 30 / G);
        this.changeRange()
    };
    neo.moveRange = function (a) {
        y = a;
        w = y + s;

        I.left = y + "px";
        this.translateRange();
        for (a = m.length; a--;) m[a].syncroTrack(H)
    };
    neo.translateRange = function () {
        r.start = NEO.int(y * G);
        r.end = NEO.int(w * G) - 1;
        r.midpos = y + r.mid;
        H = NEO.int(NEO.frameSize * r.start);
        P.setAttributeNS(null, "patternTransform", "translate(" + (-H - 0.5) + ")");
        this.updateTime()
    };
    neo.changeRange = function (a, b) {
        var d;
        void 0 !== a && (d = b ? NEO.int(a - y) : NEO.int(w - a), d = d < $ ? $ : d, d = d > q ? q : d, d !== s && (s = d, I.width = s + "px", b ? w = a : (y = a, I.left = y + "px")));
        r.end = NEO.int(w * G);
        r.lng = NEO.int(s * G);
        r.max = q - s;
        r.mid = 0.5 * s;
        d =

            (q - x) / (r.lng + 1);
        Y = q - x - d;
        NEO.frameSize = d;
        D = 1 / d;
        W = 6 > d ? 6 : NEO.int(d);
        X = NEO.int(d * NEO.frameMax);
        void 0 !== a && (c = 100 * r.lng / (NEO.frameMax + 1));
        this.translateRange();
        d = NEO.int(q / NEO.frameMax);
        aa.width = (2 > d ? 2 : d) + "px";
        S.width = W + "px";
        this.timePattern();
        for (d = m.length; d--;) m[d].syncroTrack(H, X)
    };
    neo.timePattern = function () {
        var a = NEO.frameSize,
            b, c;
        if (5 > a) {
            c = NEO.int(a) || 1;
            switch (c) {
                case 1:
                    b = a * NEO.FPS;
                    break;
                case 2:
                    b = a * NEO.FPS;
                    break;
                case 3:
                    b = 0.5 * a * NEO.FPS;
                    break;
                case 4:
                    b = 0.25 * a * NEO.FPS
            }
            a = "M0 10 L0 20 M" + b + " 10 L" + b +

                " 20"
        } else b = 5 * a, a = "M0 10 L0 20M" + a + " 15 L" + a + " 20M" + 2 * a + " 15 L" + 2 * a + " 20M" + 3 * a + " 15 L" + 3 * a + " 20M" + 4 * a + " 15 L" + 4 * a + " 20 M" + b + " 10 L" + b + " 20";
        P.childNodes[0].childNodes[0].setAttributeNS(null, "d", a);
        P.setAttributeNS(null, "width", b)
    };
    neo.dataToString = function () {
        var a = neo.data,
            b, c;
        for (c in a) "object" === typeof a[c] && (b = JSON.stringify(a[c]), b = b.replace(/["']/g, ""), b = b.replace(/:/g, " "), b = b.replace(/,/g, "|"), b = b.slice(1, b.length - 1), a[c] = b);
        a = JSON.stringify(a);
        a = a.replace(/["']/g, "");
        a = a.slice(1, a.length -

            1);
        a = a.replace(/:/g, ": ");
        a = a.replace(/,/g, "<br>");
        a = a.replace(/[|]/g, ", ");
        return a += "<br><br>" + e + " fps"
    };
    neo.info = function () {
        return e + " fps"
    };
    neo.getFrameClick = function (a, b) {
        a = b ? a : a - p;
        a = a > Y ? Y : a;
        return NEO.int(a * D) + r.start
    };
    neo.setFps = function (a) {
        NEO.FPS = a;
        NEO.frameTime = 1 / NEO.FPS;
        g = 1E3 * NEO.frameTime;
        this.updateTime(!0)
    };
    neo.add = function (a, b) {
        b = b || {};
        a = a[0].toUpperCase() + a.slice(1);
        var c = new NEO[a](b);
        c.rename(m.length);
        m.push(c);
        void 0 === c.target && Q.appendChild(c.c[0]);
        c.syncroTrack(H, X);
        clearTimeout(V);

        V = setTimeout(this.calc.bind(this), 0);
        return c
    };
    neo.remove = function (a) {
        void 0 === m[a].target && Q.removeChild(m[a].c[0]);
        m.splice(a, 1);
        for (a = m.length; a--;) m[a].setID(a);
        this.calc()
    };
    neo.clear = function () {
        for (var a = m.length; a--;) m[a].clear();
        m = []
    };
    neo.stopMedia = function () {
        for (var a = m.length; a--;) m[a].isMedia && m[a].stop()
    };
    neo.upTrackTop = function () {
        for (var a = m.length; a--;) m[a].needTop && (m[a].top = m[a].c[0].getBoundingClientRect().top)
    };
    neo.reset = function (a) {
        for (var b = m.length; b--;) m[b].reset(a)
    };
    neo.selected = function (a) {
        for (var b = m.length; b--;) m[b].unSelected();
        void 0 !== a && a.selected()
    };
    neo.calc = function () {
        u = 0;
        for (var a = m.length; a--;) u += m[a].h;
        T.height = u + "px";
        A = 70 + u + 19;
        this.resizeHeight()
    };
    neo.resize = function (a) {
        t = window.innerHeight - v - n;
        this.resizeHeight();
        this.resizeWidth()
    };
    neo.resizeWidth = function () {
        q = window.innerWidth - p - z;
        J.width = q + "px";
        U.width = q + "px";
        ca.width = q - x + "px";
        fa.width = q - x + "px";
        this.setRange();
        E.resize(p, q - x)
    };
    neo.resizeHeight = function () {
        var a = 0,
            b = 0,
            c = x;
        A > t ? (a = t, b = a - 90, x = 20, ea = (u - 1) / b, B =

            b / (u - 1) * b, Z = b - B, R.height = b + 1 + "px", ba.height = NEO.int(B) + "px", R.display = "block", M = !0) : (a = A, b = a - 90, x = 0, T.top = "0px", R.display = "none", M = !1);
        ca.height = b + "px";
        J.height = a + "px";
        S.height = b + 18 + "px";
        this.upTrackTop();
        E.move();
        M && this.moveHScroll();
        c !== x && this.resizeWidth()
    };
    neo.moveHScroll = function (a) {
        void 0 !== a && (C = a - 70 - n - 0.5 * B);
        C = 0 > C ? 0 : C;
        C = C > Z ? Z : C;
        ba.top = NEO.int(C) + "px";
        T.top = NEO.int(-(C * ea)) + "px";
        this.upTrackTop();
        E.move()
    };
    neo.setTrackHeight = function (a) {
        a = a - K.c[0].getBoundingClientRect().top + 4;
        K.setHeight(40 >

            a ? 40 : a);
        clearTimeout(V);
        V = setTimeout(this.calc.bind(this), 0)
    };
    neo.isInView = function (a) {
        var b = !0;
        a < 70 + n && (b = !1);
        a > t + 70 - 40 && (b = !1);
        return b
    };
    neo.showPannel = function (a) {
        E.setKey(a)
    };
    return neo
}();

// ------
// MAPS
// ------
var maps = function () {
    var a, b, c, d, e = 0, f = 0, g = 0, h = 0, l = 0, k = 0, m, p = 1, n = 1, z = 50, v = 50, q = [], t = [], x = !1, r = null, u = 0, A = 0, B = 0, y = 0, w = "";
    maps = function () { };
    maps.init = function (s) {
        s = void 0 === s ? {} : s;
        g = s.top || 20;
        h = s.bottom || 20;
        e = s.left || 20;
        f = s.right || 20;
        s = NEO.DOM("NEO", "div", "top:" + g + "px; left:" + e + "px; pointer-events:auto; overflow:hidden; margin-left:-2px; margin-top:-2px; box-sizing:content-box; border:2px solid #888; ");
        m = s.style;
        b = NEO.DOM("NEO", "canvas", "");
        a = NEO.DOM("NEO", "canvas", " pointer-events:auto;", null, s);
        a.name =

            "canvas";
        c = b.getContext("2d");
        d = a.getContext("2d");
        NEO.Doc.body.appendChild(s);
        this.activeEvents();
        this.resize()
    };
    maps.activeEvents = function () {
        var a = this.handleEvent;
        NEO.Doc.addEventListener("dblclick", a, !1);
        NEO.Doc.addEventListener("mousedown", a, !1);
        NEO.Doc.addEventListener("mousemove", a, !1);
        NEO.Doc.addEventListener("mouseup", a, !1);
        NEO.Doc.addEventListener("mousewheel", a, !1);
        NEO.Doc.addEventListener("contextmenu", a, !1);
        window.addEventListener("resize", function (a) {
            maps.resize(a)
        }, !1)
    };
    maps.handleEvent = function (a) {
        switch (a.type) {
            case "contextmenu":
                maps.mouseMenu(a);
                break;
            case "mousewheel":
                maps.wheel(a);
                break;
            case "mousedown":
                maps.down(a);
                break;
            case "mousemove":
                maps.move(a);
                break;
            case "mouseup":
                maps.up(a);
                break;
            case "dblclick":
                maps.double(a)
        }
    };
    maps.mouseMenu = function (a) {
        a.preventDefault();
        return !1
    };
    maps.double = function (a) {
        a = this.getMouse(a);
        this.add({
            x: a.x,
            y: a.y
        })
    };
    maps.up = function (a) {
        if (("linkStart" === w || "linkEnd" === w) && null !== r) {
            a = this.getMouse(a);
            for (var b = q.length, c = ""; b--;) {
                c = q[b].over(a.x,

                    a.y);
                if ("linkEnd" === w && "linkStart" === c) {
                    this.add({
                        type: "link",
                        n2: q[b],
                        n1: r
                    });
                    break
                }
                if ("linkStart" === w && "linkEnd" === c) {
                    this.add({
                        type: "link",
                        n1: q[b],
                        n2: r
                    });
                    break
                }
            }
            x = !1;
            this.draw()
        }
        w = "";
        r = null
    };
    maps.down = function (a) {
        w = "";
        for (var b = this.getMouse(a), c = q.length; c--;)
            if (w = q[c].over(b.x, b.y), "linkStart" === w || "linkEnd" === w) {
                r = q[c];
                u = r.p.x;
                A = r.p.y;
                B = b.x;
                y = b.y;
                break
            } else if ("node" === w) {
                r = q[c];
                u = b.x - r.x;
                A = b.y - r.y;
                break
            }
        "" === w && "canvas" === a.target.name && (w = "moveCanvas", u = b.x, A = b.y);
        this.draw()
    };
    maps.move = function (a) {
        if ("" !==

            w) {
            a = this.getMouse(a);
            switch (w) {
                case "linkStart":
                case "linkEnd":
                    B = a.x;
                    y = a.y;
                    x = !0;
                    break;
                case "node":
                    r.move(a.x - u, a.y - A);
                    break;
                case "moveCanvas":
                    z += a.x - u, v += a.y - A, this.transform()
            }
            this.draw()
        }
    };
    maps.getMouse = function (a) {
        return {
            x: (a.clientX - e - z) * n,
            y: (a.clientY - g - v) * n
        }
    };
    maps.wheel = function (a) {
        this.getMouse(a);
        var b = 0;
        a.wheelDeltaY ? b = 0.04 * a.wheelDeltaY : a.wheelDelta ? b = 0.2 * a.wheelDelta : a.detail && (b = 4 * -a.detail);
        p += 0.05 * b;
        p = 1 > p ? 1 : p;
        p = 4 < p ? 4 : p;
        n = 1 / p;
        this.transform();
        this.draw()
    };
    maps.add = function (a) {
        a = void 0 ===

            a ? {} : a;
        var b, c;
        switch (a.type || "node") {
            case "node":
                a.id = q.length;
                a = new maps.Node(a);
                b = new maps.Point({
                    start: !0
                });
                c = new maps.Point({});
                a.points.push(b);
                a.points.push(c);
                q.push(a);
                break;
            case "link":
                t.push(new maps.Link(a))
        }
        this.draw()
    };
    maps.transform = function () {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(z, v);
        c.scale(p, p)
    };
    maps.draw = function () {
        c.save();
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.clearRect(0, 0, l, k);
        c.fillStyle = "rgba(0,0,0,0.2)";
        c.fillRect(0, 0, l, k);
        c.restore();
        this.origin();
        for (var a = q.length; a--;) q[a].draw(c);

        for (a = t.length; a--;) t[a].draw(c);
        this.drawTmpLink();
        this.render()
    };
    maps.render = function () {
        d.clearRect(0, 0, l, k);
        d.drawImage(b, 0, 0)
    };
    maps.distance = function (a, b, c) {
        c = c || 0.5;
        return a > b ? b + (a - b) * c : a + (b - a) * c
    };
    maps.findCurve = function (a, b, c, d, f) {
        var e = [],
            h = !1;
        f && a < c && (h = !0);
        !f && a > c && (h = !0);
        var g = f ? a - c : c - a,
            k = d - b,
            m = 0 > k ? !0 : !1,
            k = 0.5 * (0 > k ? -1 * k : k),
            g = 0.5 * (0 > g ? -1 * g : g),
            g = 10 > g ? 10 : g,
            g = k < g ? k : g,
            l = 0.5 * g;
        a = f ? a - g : a + g;
        var n = f ? a - c : c - a,
            g = 0 > n ? f ? !1 : !0 : f ? !0 : !1,
            n = 0.5 * (0 > n ? -1 * n : n),
            n = 10 > n ? 10 : n,
            n = k < n ? k : n;
        h ? (e[0] = f ? a + l : a - l, e[1] = a, e[2] =

            g ? a - n : a + n, e[3] = g ? c - l : c + l, e[4] = m ? b - l : b + l, e[5] = m ? b - k + l : b + k - l, e[6] = m ? d + k : d - k, e[7] = m ? d + k - l : d - k + l, e[8] = m ? d + l : d - l) : (e[0] = f ? a + l : a - l, e[1] = a, e[2] = g ? a - n : a + n, e[3] = m ? b - l : b + l, e[4] = m ? d + n : d - n);
        return e
    };
    maps.drawTmpLink = function () {
        if (x) {
            var a = !1;
            "linkStart" === w && (a = !0);
            var b = a ? ["#FF0", "#0AA"] : ["#0FF", "#AA0"];
            c.lineWidth = 2;
            var d = c.createLinearGradient(u, A, B, y);
            d.addColorStop(0, b[0]);
            d.addColorStop(1, b[1]);
            a = maps.findCurve(u, A, B, y, a);
            c.strokeStyle = d;
            c.beginPath();
            c.moveTo(u, A);
            5 === a.length ? (c.lineTo(a[0], A), c.quadraticCurveTo(a[1],

                A, a[1], a[3]), c.lineTo(a[1], a[4]), c.quadraticCurveTo(a[1], y, a[2], y)) : (c.lineTo(a[0], A), c.quadraticCurveTo(a[1], A, a[1], a[4]), c.lineTo(a[1], a[5]), c.quadraticCurveTo(a[1], a[6], a[0], a[6]), c.lineTo(B, a[6]), c.quadraticCurveTo(a[3], a[6], a[3], a[7]), c.lineTo(a[3], a[8]), c.quadraticCurveTo(a[3], y, B, y));
            c.lineTo(B, y);
            c.stroke()
        }
    };
    maps.origin = function () {
        c.lineWidth = 1;
        c.strokeStyle = "#666";
        c.beginPath();
        c.moveTo(-10, 0);
        c.lineTo(10, 0);
        c.stroke();
        c.moveTo(0, -10);
        c.lineTo(0, 10);
        c.stroke()
    };
    maps.resize = function (c) {
        k =

            window.innerHeight - h - g;
        l = window.innerWidth - e - f;
        m.width = l + "px";
        m.height = k + "px";
        a.width = l;
        a.height = k;
        b.width = l;
        b.height = k;
        this.transform();
        this.draw()
    };
    maps.Node = function (a) {
        this.id = a.id || 0;
        this.name = a.name || "node-" + this.id;
        this.points = [];
        this.w = a.w || 80;
        this.h = a.h || 20;
        this.y = this.x = 10;
        this.p = null;
        a.x && (this.x = a.x - 0.5 * this.w);
        a.y && (this.y = a.y - 0.5 * this.h);
        this.color = "#666";
        this.border = "#888";
        this.borderSel = "#AAA";
        this.select = !1
    };
    maps.Node.prototype = {
        draw: function (a) {
            a.lineWidth = 1;
            a.strokeStyle = this.select ?

                this.borderSel : this.border;
            a.fillStyle = this.color;
            a.fillRect(this.x, this.y, this.w, this.h);
            a.strokeRect(this.x, this.y, this.w, this.h);
            for (var b = this.points.length; b--;) 0 === b && this.points[b].move(this.x, this.y + 0.5 * this.h), 1 === b && this.points[b].move(this.x + this.w, this.y + 0.5 * this.h), this.points[b].draw(a);
            a.font = "11px Lucida Console";
            a.fillStyle = "#FFF";
            a.textAlign = "center";
            a.fillText(this.name, this.x + 0.5 * this.w, this.y + 0.5 * this.h)
        },
        over: function (a, b) {
            var c = this.points.length;
            for (this.p = null; c--;) this.points[c].over(a,

                b) && (this.p = this.points[c]);
            return null !== this.p ? (this.select = !0, "link" + (this.p.start ? "Start" : "End")) : (this.select = this.x <= a && this.x + this.w >= a && this.y <= b && this.y + this.h >= b) ? "node" : ""
        },
        move: function (a, b) {
            this.x = a;
            this.y = b
        }
    };
    maps.Point = function (a) {
        this.x = a.x || 0;
        this.y = a.y || 0;
        this.r = 6;
        this.color = "#0AA";
        this.colorSel = "#0FF";
        this.select = !1;
        this.start = a.start || !1;
        this.id = a.id || 0;
        this.start && (this.color = "#AA0", this.colorSel = "#FF0")
    };
    maps.Point.prototype = {
        draw: function (a) {
            a.beginPath();
            a.fillStyle = this.select ?

                this.colorSel : this.color;
            a.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            a.closePath();
            a.fill()
        },
        over: function (a, b) {
            return this.select = this.x - this.r <= a && this.x + this.r >= a && this.y - this.r <= b && this.y + this.r >= b
        },
        move: function (a, b) {
            this.x = a;
            this.y = b
        }
    };
    maps.Link = function (a) {
        a.n1.points[1].select = !1;
        a.n2.points[0].select = !1;
        this.p1 = a.n1.points[1];
        this.p2 = a.n2.points[0];
        this.r = 3;
        this.color = "#FFF"
    };
    maps.Link.prototype = {
        draw: function (a) {
            a.beginPath();
            a.fillStyle = "#0FF";
            a.arc(this.p1.x, this.p1.y, this.r, 0, 2 * Math.PI);

            a.closePath();
            a.fill();
            a.beginPath();
            a.fillStyle = "#FF0";
            a.arc(this.p2.x, this.p2.y, this.r, 0, 2 * Math.PI);
            a.closePath();
            a.fill();
            var b = this.p1.x,
                c = this.p1.y,
                d = this.p2.x,
                f = this.p2.y,
                e = maps.findCurve(b, c, d, f, !1);
            a.lineWidth = 2;
            var g = a.createLinearGradient(b, c, d, f);
            g.addColorStop(0, "#0FF");
            g.addColorStop(1, "#FF0");
            a.strokeStyle = g;
            a.beginPath();
            a.moveTo(b, c);
            5 === e.length ? (a.lineTo(e[0], c), a.quadraticCurveTo(e[1], c, e[1], e[3]), a.lineTo(e[1], e[4]), a.quadraticCurveTo(e[1], f, e[2], f)) : (a.lineTo(e[0], c), a.quadraticCurveTo(e[1],

                c, e[1], e[4]), a.lineTo(e[1], e[5]), a.quadraticCurveTo(e[1], e[6], e[0], e[6]), a.lineTo(d, e[6]), a.quadraticCurveTo(e[3], e[6], e[3], e[7]), a.lineTo(e[3], e[8]), a.quadraticCurveTo(e[3], f, d, f));
            a.lineTo(d, f);
            a.stroke()
        }
    };
    return maps
}();