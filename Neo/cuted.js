﻿UIL.Gui = function (a) {
    a = a || {};
    this.height = a.height || 20;
    void 0 !== a.Tpercent && (UIL.P = a.Tpercent);
    void 0 === a.css && (a.css = "");
    this.width = UIL.WIDTH;
    this.h = this.height;
    this.prevY = -1;
    UIL.main = this;
    this.callback = void 0 === a.callback ? null : a.callback;
    this.color = a.color || UIL.COLOR;
    this.isCenter = a.center || !1;
    this.lockwheel = !1;
    this.isOpen = !0;
    this.uis = [];
    this.content = UIL.DOM("UIL", "div", "display:block; width:300px; height:auto; top:0; right:10px; transition:height 0.1s ease-out;" + a.css);
    document.body.appendChild(this.content);

    this.top = this.content.getBoundingClientRect().top;
    this.inner = UIL.DOM("UIL", "div", "width:100%; top:0; left:0; height:auto;");
    this.content.appendChild(this.inner);
    this.inner.name = "inner";
    this.scrollBG = UIL.DOM("UIL", "div", "right:0; top:0; width:10px; height:10px; cursor:s-resize; pointer-events:auto; display:none;");
    this.content.appendChild(this.scrollBG);
    this.scrollBG.name = "scroll";
    this.scroll = UIL.DOM("UIL", "div", "background:#666; right:0; top:0; width:5px; height:10px;");
    this.scrollBG.appendChild(this.scroll);

    this.bottom = UIL.DOM("UIL", "div", UIL.TXT + "width:100%; top:auto; bottom:0; left:0; text-align:center; pointer-events:auto; cursor:pointer; height:" + this.height + "px; line-height:" + (this.height - 5) + "px;");
    this.content.appendChild(this.bottom);
    this.bottom.textContent = "close";
    this.bottom.name = "bottom";
    this.isScroll = this.isDown = !1;
    this.content.addEventListener("mousedown", this, !1);
    this.content.addEventListener("mousemove", this, !1);
    this.content.addEventListener("mouseout", this, !1);
    this.content.addEventListener("mouseup",

        this, !1);
    this.content.addEventListener("mouseover", this, !1);
    document.addEventListener("mousewheel", this, !1);
    window.addEventListener("resize", function (a) {
        this.resize(a)
    }.bind(this), !1);
    this.setWidth(a.size || 240)
};

UIL.Gui.prototype = {
    constructor: UIL.Gui,
    onChange: function (a) {
        this.callback = a;
        return this
    },
    handleEvent: function (a) {
        switch (a.type) {
            case "mousedown":
                this.down(a);
                break;
            case "mouseout":
                this.out(a);
                break;
            case "mouseover":
                this.over(a);
                break;
            case "mousewheel":
                this.wheel(a);
                break;
            case "mouseup":
                this.up(a);
                break;
            case "mousemove":
                this.move(a)
        }
    },
    down: function (a) {
        a.target.name && ("scroll" === a.target.name && (this.isDown = !0, this.move(a), document.addEventListener("mouseup", this, !1), document.addEventListener("mousemove",

            this, !1)), "bottom" === a.target.name && (this.isOpen = this.isOpen ? !1 : !0, this.show()))
    },
    move: function (a) {
        this.isDown && (this.scroll.style.background = "#AAA", this.update(a.clientY - this.top - 0.5 * this.sh))
    },
    out: function (a) {
        a.target.name && "scroll" === a.target.name && (this.scroll.style.background = "#666")
    },
    up: function (a) {
        this.isDown = !1;
        this.scroll.style.background = "#666";
        document.removeEventListener("mouseup", this, !1);
        document.removeEventListener("mousemove", this, !1)
    },
    over: function (a) {
        a.target.name && "scroll" === a.target.name &&

            (this.scroll.style.background = "#888")
    },
    wheel: function (a) {
        if (!this.lockwheel && this.isScroll) {
            var b = a.clientX,
                c = this.content.getBoundingClientRect().left;
            b < c || b > c + this.width || (b = 0, a.wheelDeltaY ? b = 0.04 * -a.wheelDeltaY : a.wheelDelta ? b = 0.2 * -a.wheelDelta : a.detail && (b = 4 * a.detail), this.py += b, this.update(this.py))
        }
    },
    add: function () {
        var a = arguments;
        "object" === typeof a[1] ? a[1].isUI = !0 : "string" === typeof a[1] && (void 0 === a[2] ? [].push.call(a, {
            isUI: !0
        }) : a[2].isUI = !0);
        a = UIL.add.apply(this, a);
        this.uis.push(a);
        if (a.autoWidth) this.prevY =

            -1, this.calc(a.h + 1);
        else {
            var b = a.c[0].getBoundingClientRect().top;
            this.prevY !== b && (this.calc(a.h + 1), this.prevY = b)
        }
        return a
    },
    remove: function (a) {
        a = this.uis.indexOf(a); - 1 !== a && (this.uis[a].clear(), this.uis.splice(a, 1))
    },
    clear: function () {
        this.update(0);
        for (var a = this.uis.length; a--;) this.uis[a].clear(), this.uis[a] = null, this.uis.pop();
        this.uis = [];
        this.calc()
    },
    update: function (a) {
        a = 0 > a ? 0 : a;
        a = a > this.range ? this.range : a;
        this.inner.style.top = -~~(a / this.ratio) + "px";
        this.scroll.style.top = ~~a + "px";
        this.py = a
    },
    showScroll: function (a) {
        this.isScroll =

            !0;
        this.total = this.h;
        this.maxView = this.maxHeight - this.height;
        this.ratio = this.maxView / this.total;
        this.sh = this.maxView * this.ratio;
        20 > this.sh && (this.sh = 20);
        this.range = this.maxView - this.sh;
        this.scrollBG.style.display = "block";
        this.scrollBG.style.height = this.maxView + "px";
        this.scroll.style.height = this.sh + "px";
        this.update(0)
    },
    hideScroll: function () {
        this.isScroll = !1;
        this.update(0);
        this.scrollBG.style.display = "none"
    },
    resize: function (a) {
        this.testHeight()
    },
    calc: function (a) {
        this.h = void 0 !== a ? this.h + a : this.inner.offsetHeight;

        clearTimeout(this.tmp);
        this.tmp = setTimeout(this.testHeight.bind(this), 10)
    },
    testHeight: function () {
        this.tmp && clearTimeout(this.tmp);
        this.maxHeight = window.innerHeight - this.top;
        this.h > this.maxHeight ? (this.content.style.height = this.maxHeight + "px", this.bottom.style.background = UIL.bgcolor(this.color, 1), this.showScroll()) : (this.bottom.style.background = UIL.bgcolor(this.color), this.content.style.height = this.h + this.height + "px", this.hideScroll())
    },
    setWidth: function (a) {
        a && (UIL.WIDTH = ~~a);
        this.width = UIL.WIDTH;

        this.content.style.width = this.width + "px";
        this.isCenter && (this.content.style.marginLeft = -~~(0.5 * UIL.WIDTH) + "px");
        for (var b = a = this.uis.length; b--;) this.uis[b].setSize();
        for (b = a; b--;) this.uis[b].rSize();
        this.calc()
    },
    show: function () {
        this.isOpen ? (this.inner.style.display = "block", this.testHeight(), this.bottom.textContent = "close") : (this.content.style.height = this.height + "px", this.tmp = setTimeout(this.endHide.bind(this), 100))
    },
    endHide: function () {
        this.tmp && clearTimeout(this.tmp);
        this.inner.style.display = "none";

        this.bottom.textContent = "open"
    }
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
UIL.Group = function (a) {
    UIL.Proto.call(this, a);
    this.isGroup = this.autoHeight = !0;
    this.baseH = this.h;
    this.isOpen = a.open || !1;
    this.c[2] = UIL.DOM("UIL", "div", "width:100%; left:0; height:auto; top:" + this.h + "px");
    this.c[3] = UIL.DOM("UIL", "div", "top:2px; left:2px; height:" + (this.h - 4) + "px; width:6px; background-image:" + UIL.GroupBG);
    this.c[4] = UIL.DOM("UIL", "div", "position:absolute; width:10px; height:10px; top:" + (~~(0.5 * this.h) - 5) + "px; pointer-events:none; background:" + UIL.F0);
    a = this.s;
    a[0].height = this.h + "px";
    a[1].height =

        this.h + "px";
    a[1].top = "4px";
    a[1].left = "4px";
    a[1].pointerEvents = "auto";
    a[1].cursor = "pointer";
    this.c[1].name = "group";
    this.uis = [];
    this.c[1].events = ["click"];
    this.init();
    this.isOpen && this.open()
};
UIL.Group.prototype = Object.create(UIL.Proto.prototype);
UIL.Group.prototype.constructor = UIL.Group;
UIL.Group.prototype.handleEvent = function (a) {
    a.preventDefault();
    switch (a.type) {
        case "click":
            this.click(a)
    }
};
UIL.Group.prototype.click = function (a) {
    this.isOpen ? this.close() : this.open()
};

UIL.Group.prototype.add = function () {
    var a = arguments;
    "object" === typeof a[1] ? (a[1].isUI = this.isUI, a[1].target = this.c[2]) : "string" === typeof arguments[1] && (void 0 === a[2] ? [].push.call(a, {
        isUI: !0,
        target: this.c[2]
    }) : (a[2].isUI = !0, a[2].target = this.c[2]));
    a = UIL.Gui.prototype.add.apply(this, a);
    a.autoHeight && (a.parentGroup = this);
    return a
};
UIL.Group.prototype.open = function () {
    this.isOpen = !0;
    this.s[4].background = UIL.F1;
    this.rSizeContent();
    this.isUI && UIL.main.calc(this.h - this.baseH)
};

UIL.Group.prototype.close = function () {
    this.isUI && UIL.main.calc(-(this.h - this.baseH));
    this.isOpen = !1;
    this.s[4].background = UIL.F0;
    this.h = this.baseH;
    this.s[0].height = this.h + "px"
};
UIL.Group.prototype.clear = function () {
    this.clearGroup();
    UIL.Proto.prototype.clear.call(this)
};
UIL.Group.prototype.clearGroup = function () {
    for (var a = this.uis.length; a--;) this.uis[a].clear(), this.uis.pop();
    this.uis = [];
    this.calc()
};

UIL.Group.prototype.calc = function (a) {
    this.isOpen && (this.h = void 0 !== a ? this.h + a : this.c[2].offsetHeight + this.baseH, this.s[0].height = this.h + "px")
};
UIL.Group.prototype.rSizeContent = function () {
    for (var a = this.uis.length; a--;) this.uis[a].setSize(), this.uis[a].rSize();
    this.calc()
};
UIL.Group.prototype.rSize = function () {
    UIL.Proto.prototype.rSize.call(this);
    var a = this.s;
    a[4].left = this.sa + this.sb - 17 + "px";
    a[1].width = this.size + "px";
    a[2].width = this.size + "px";
    this.isOpen && this.rSizeContent()
};
UIL.Title = function (a) {
    UIL.Proto.call(this, a);
    var b = a.id || 0;
    a = a.prefix || "";
    this.c[2] = UIL.DOM("UIL text", "div", "text-align:right; width:40px; line-height:" + (this.h - 8) + "px; color:" + this.fontColor);
    31 === this.h && (this.s[0].height = this.h + "px", this.s[1].top = "8px", this.c[2].style.top = "8px");
    var c = b || 0;
    10 > b && (c = "0" + b);
    this.c[1].textContent = this.txt.substring(0, 1).toUpperCase() + this.txt.substring(1).replace("-", " ");
    this.c[2].textContent = a.toUpperCase() + " " + c;
    this.init()
};
UIL.Title.prototype = Object.create(UIL.Proto.prototype);

UIL.Title.prototype.constructor = UIL.Title;
UIL.Title.prototype.rSize = function () {
    UIL.Proto.prototype.rSize.call(this);
    this.s[1].width = this.size - 50 + "px";
    this.s[2].left = this.size - 76 + "px"
};
UIL.Title.prototype.text = function (a) {
    this.c[1].textContent = a
};
UIL.Title.prototype.text2 = function (a) {
    this.c[2].textContent = a
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
UIL.Slide = function (a) {
    UIL.Proto.call(this, a);
    this.setTypeNumber(a);
    this.isOver = this.isDown = !1;
    this.c[2] = UIL.DOM("UIL number", "div", " text-align:right; width:47px; color:" + this.fontColor);
    this.c[3] = UIL.DOM("UIL", "div", "border:1px solid " + UIL.Border + "; pointer-events:auto; cursor:w-resize; background:rgba(0,0,0,0.3); top:2px; height:" + (this.h - 4) + "px;");
    this.c[4] = UIL.DOM("UIL", "div", "left:4px; top:5px; height:" + (this.h - 10) + "px; background:" + this.fontColor + ";");
    this.c[3].events = ["mouseover", "mousedown",

        "mouseout"
    ];
    this.init()
};
UIL.Slide.prototype = Object.create(UIL.Proto.prototype);
UIL.Slide.prototype.constructor = UIL.Slide;
UIL.Slide.prototype.handleEvent = function (a) {
    a.preventDefault();
    switch (a.type) {
        case "mouseover":
            this.over(a);
            break;
        case "mousedown":
            this.down(a);
            break;
        case "mouseout":
            this.out(a);
            break;
        case "mouseup":
            this.up(a);
            break;
        case "mousemove":
            this.move(a)
    }
};

UIL.Slide.prototype.mode = function (a) {
    var b = this.s;
    switch (a) {
        case 0:
            b[2].color = this.fontColor;
            b[3].background = "rgba(0,0,0,0.3)";
            b[4].background = this.fontColor;
            break;
        case 1:
            b[2].color = this.colorPlus, b[3].background = UIL.SlideBG, b[4].background = this.colorPlus
    }
};
UIL.Slide.prototype.over = function (a) {
    this.isOver = !0;
    this.mode(1)
};
UIL.Slide.prototype.out = function (a) {
    this.isOver = !1;
    this.isDown || this.mode(0)
};

UIL.Slide.prototype.up = function (a) {
    this.isDown = !1;
    document.removeEventListener("mouseup", this, !1);
    document.removeEventListener("mousemove", this, !1);
    this.isOver ? this.mode(1) : this.mode(0);
    this.sendEnd()
};
UIL.Slide.prototype.down = function (a) {
    this.isDown = !0;
    document.addEventListener("mouseup", this, !1);
    document.addEventListener("mousemove", this, !1);
    this.left = this.c[3].getBoundingClientRect().left;
    this.old = this.value;
    this.move(a)
};

UIL.Slide.prototype.move = function (a) {
    this.isDown && (a = (a.clientX - this.left - 3) / this.w * this.range + this.min - this.old, a >= this.step || a <= this.step) && (a = ~~(a / this.step), this.value = this.numValue(this.old + a * this.step), this.update(!0), this.old = this.value)
};
UIL.Slide.prototype.update = function (a) {
    this.s[4].width = (this.value - this.min) / this.range * this.w + "px";
    this.c[2].textContent = this.value;
    a && this.send()
};

UIL.Slide.prototype.rSize = function () {
    UIL.Proto.prototype.rSize.call(this);
    this.width = this.sb - this.sc;
    this.w = this.width - 6;
    var a = this.sc;
    if (this.isUI || !this.simple) a = this.sc + 10;
    var b = ~~(0.5 * this.h) - 8,
        c = this.s;
    c[2].width = this.sc + "px";
    c[2].left = this.size - a + "px";
    c[2].top = b + "px";
    c[3].left = this.sa + "px";
    c[3].width = this.width + "px";
    c[4].left = this.sa + 3 + "px";
    this.update()
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
UIL.Circular = function (a) {
    UIL.Proto.call(this, a);
    this.autoWidth = !1;
    this.setTypeNumber(a);
    this.radius = a.radius || 15;
    this.size = 2 * this.radius + 20;
    void 0 !== a.size && (this.size = a.size, this.radius = 0.5 * ~~(this.size - 20));
    this.w = this.height = 2 * this.radius;
    this.h = a.height || this.height + 40;
    this.twoPi = 2 * Math.PI;
    this.top = 0;
    this.c[0].style.width = this.size + "px";
    void 0 !== this.c[1] && (this.c[1].style.width = this.size + "px", this.c[1].style.textAlign = "center", this.top = 20);
    this.percent = 0;
    this.c[2] = UIL.DOM("UIL number", "div",

        "text-align:center; top:" + (this.height + 24) + "px; width:" + this.size + "px; color:" + this.fontColor);
    this.c[3] = UIL.DOM("UIL", "circle", "left:10px; top:" + this.top + "px; width:" + this.w + "px; height:" + this.height + "px; pointer-events:auto; cursor:pointer;", {
        cx: this.radius,
        cy: this.radius,
        r: this.radius,
        fill: "rgba(0,0,0,0.3)"
    });
    this.c[4] = UIL.DOM("UIL", "path", "left:10px; top:" + this.top + "px; width:" + this.w + "px; height:" + this.height + "px;", {
        d: this.makePath(),
        fill: this.fontColor
    });
    this.c[5] = UIL.DOM("UIL", "circle", "left:10px; top:" +

        this.top + "px; width:" + this.w + "px; height:" + this.height + "px;", {
            cx: this.radius,
            cy: this.radius,
            r: 0.5 * this.radius,
            fill: UIL.bgcolor(UIL.COLOR, 1),
            "stroke-width": 1,
            stroke: UIL.SVGC
        });
    this.c[3].events = ["mouseover", "mousedown", "mouseout"];
    this.init();
    this.update()
};
UIL.Circular.prototype = Object.create(UIL.Proto.prototype);
UIL.Circular.prototype.constructor = UIL.Circular;

UIL.Circular.prototype.handleEvent = function (a) {
    a.preventDefault();
    switch (a.type) {
        case "mouseover":
            this.over(a);
            break;
        case "mousedown":
            this.down(a);
            break;
        case "mouseout":
            this.out(a);
            break;
        case "mouseup":
            this.up(a);
            break;
        case "mousemove":
            this.move(a)
    }
};

UIL.Circular.prototype.mode = function (a) {
    switch (a) {
        case 0:
            this.s[2].color = this.fontColor;
            UIL.setSvg(this.c[3], "fill", "rgba(0,0,0,0.2)");
            UIL.setSvg(this.c[4], "fill", this.fontColor);
            break;
        case 1:
            this.s[2].color = this.colorPlus, UIL.setSvg(this.c[3], "fill", "rgba(0,0,0,0.6)"), UIL.setSvg(this.c[4], "fill", this.colorPlus)
    }
};
UIL.Circular.prototype.over = function (a) {
    this.isOver = !0;
    this.mode(1)
};
UIL.Circular.prototype.out = function (a) {
    this.isOver = !1;
    this.isDown || this.mode(0)
};

UIL.Circular.prototype.up = function (a) {
    this.isDown = !1;
    document.removeEventListener("mouseup", this, !1);
    document.removeEventListener("mousemove", this, !1);
    this.isOver ? this.mode(1) : this.mode(0);
    this.sendEnd()
};
UIL.Circular.prototype.down = function (a) {
    this.isDown = !0;
    document.addEventListener("mouseup", this, !1);
    document.addEventListener("mousemove", this, !1);
    this.rect = this.c[3].getBoundingClientRect();
    this.old = this.value;
    this.oldr = null;
    this.move(a)
};

UIL.Circular.prototype.move = function (a) {
    this.isDown && (this.r = Math.atan2(this.radius - (a.clientY - this.rect.top), this.radius - (a.clientX - this.rect.left)) - 0.5 * Math.PI, this.r = (this.r % this.twoPi + this.twoPi) % this.twoPi, null !== this.oldr && (a = this.r - this.oldr, this.r = Math.abs(a) > Math.PI ? this.oldr : this.r, 6 < a && (this.r = 0), -6 > a && (this.r = this.twoPi)), a = 1 / this.twoPi * this.range * this.r + this.min - this.old, a >= this.step || a <= this.step) && (a = ~~(a / this.step), this.value = this.numValue(this.old + a * this.step), this.update(!0), this.old =

        this.value, this.oldr = this.r)
};
UIL.Circular.prototype.makePath = function () {
    var a = this.radius,
        b = this.percent * this.twoPi - 0.001,
        c = a + a * Math.sin(b),
        d = a - a * Math.cos(b);
    return "M " + a + "," + a + " L " + a + ",0 A " + a + "," + a + " 0 " + (b > Math.PI ? 1 : 0) + " 1 " + c + "," + d + " Z"
};
UIL.Circular.prototype.update = function (a) {
    this.c[2].textContent = this.value;
    this.percent = (this.value - this.min) / this.range;
    UIL.setSvg(this.c[4], "d", this.makePath());
    a && this.send()
};
UIL.Knob = function (a) {
    UIL.Proto.call(this, a);
    this.autoWidth = !1;
    this.setTypeNumber(a);
    this.mPI = 0.8 * Math.PI;
    this.toDeg = 180 / Math.PI;
    this.cirRange = 2 * this.mPI;
    this.radius = a.radius || 15;
    this.size = 2 * this.radius + 20;
    void 0 !== a.size && (this.size = a.size, this.radius = 0.5 * ~~(this.size - 20));
    this.w = this.height = 2 * this.radius;
    this.h = a.height || this.height + 40;
    this.top = 0;
    this.c[0].style.width = this.size + "px";
    void 0 !== this.c[1] && (this.c[1].style.width = this.size + "px", this.c[1].style.textAlign = "center", this.top = 20);
    this.percent =

        0;
    this.c[2] = UIL.DOM("UIL number", "div", "text-align:center; top:" + (this.height + 24) + "px; width:" + this.size + "px; color:" + this.fontColor);
    this.c[3] = UIL.DOM("UIL", "circle", "left:10px; top:" + this.top + "px; width:" + this.w + "px; height:" + this.height + "px;  pointer-events:auto; cursor:pointer;", {
        cx: this.radius,
        cy: this.radius,
        r: this.radius - 4,
        fill: "rgba(0,0,0,0.3)"
    });
    this.c[4] = UIL.DOM("UIL", "circle", "left:10px; top:" + this.top + "px; width:" + this.w + "px; height:" + this.height + "px;", {
        cx: this.radius,
        cy: 0.5 * this.radius,

        r: 3,
        fill: this.fontColor
    });
    this.c[5] = UIL.DOM("UIL", "path", "left:10px; top:" + this.top + "px; width:" + this.w + "px; height:" + this.height + "px;", {
        d: this.makeGrad(),
        "stroke-width": 1,
        stroke: UIL.SVGC
    });
    UIL.DOM(null, "circle", null, {
        cx: this.radius,
        cy: this.radius,
        r: 0.7 * this.radius,
        fill: UIL.bgcolor(UIL.COLOR, 1),
        "stroke-width": 1,
        stroke: UIL.SVGC
    }, this.c[3]);
    this.c[3].events = ["mouseover", "mousedown", "mouseout"];
    this.r = 0;
    this.init();
    this.update()
};
UIL.Knob.prototype = Object.create(UIL.Circular.prototype);

UIL.Knob.prototype.constructor = UIL.Knob;

UIL.Knob.prototype.move = function (a) {
    this.isDown && (this.r = -Math.atan2(this.radius - (a.clientX - this.rect.left), this.radius - (a.clientY - this.rect.top)), null !== this.oldr && (this.r = Math.abs(this.r - this.oldr) > Math.PI ? this.oldr : this.r), this.r = this.r > this.mPI ? this.mPI : this.r, this.r = this.r < -this.mPI ? -this.mPI : this.r, a = 1 / this.cirRange * this.range * (this.r + this.mPI) + this.min - this.old, a >= this.step || a <= this.step) && (a = ~~(a / this.step), this.value = this.numValue(this.old + a * this.step), this.update(!0), this.old = this.value,

        this.oldr = this.r)
};
UIL.Knob.prototype.makeGrad = function () {
    var a = "",
        b, c, d, e, f, h, g = this.radius,
        k = Math.PI + this.mPI;
    b = Math.PI - this.mPI;
    5 < this.step ? (c = this.range / this.step, b = (k - b) / c) : (b = (k - b) / g, c = g);
    for (var m = 0; m <= c; ++m) d = k - b * m, e = g + Math.sin(d) * g, f = g + Math.cos(d) * g, h = g + Math.sin(d) * (g - 3), d = g + Math.cos(d) * (g - 3), a += "M" + e + " " + f + " L" + h + " " + d + " ";
    return a
};

UIL.Knob.prototype.update = function (a) {
    this.c[2].textContent = this.value;
    this.percent = (this.value - this.min) / this.range;
    UIL.setSvg(this.c[4], "transform", "rotate(" + (this.percent * this.cirRange - this.mPI) * this.toDeg + " " + this.radius + " " + this.radius + ")");
    a && this.send()
};
UIL.Joystick = function (a) {
    UIL.Proto.call(this, a);
    this.autoWidth = !1;
    this.value = [0, 0];
    this.precision = a.precision || 2;
    this.multiplicator = a.multiplicator || 1;
    this.oldy = this.oldx = this.y = this.x = 0;
    this.interval = null;
    this.radius = a.radius || 50;
    this.size = 2 * this.radius + 20;
    void 0 !== a.size && (this.size = a.size, this.radius = 0.5 * ~~(this.size - 20));
    this.innerRadius = a.innerRadius || 0.6 * this.radius;
    this.maxDistance = this.radius - this.innerRadius - 5;
    this.height = 2 * this.radius;
    this.h = a.height || this.height + 40;
    this.top = 0;
    this.c[0].style.width =

        this.size + "px";
    void 0 !== this.c[1] && (this.c[1].style.width = this.size + "px", this.c[1].style.textAlign = "center", this.top = 20);
    this.c[2] = UIL.DOM("UIL", "circle", "left:10px; top:" + this.top + "px; width:" + this.w + "px; height:" + this.height + "px;  pointer-events:auto; cursor:pointer;", {
        cx: this.radius,
        cy: this.radius,
        r: this.radius,
        fill: "url(#grad)"
    });
    this.c[3] = UIL.DOM("UIL", "circle", "left:0px; top:" + (this.top - 10) + "px; width:" + (this.w + 20) + "px; height:" + (this.height + 20) + "px;", {
        cx: this.radius + 10,
        cy: this.radius + 10,
        r: this.innerRadius +

            10,
        fill: "url(#gradS)"
    });
    this.c[4] = UIL.DOM("UIL", "circle", "left:10px; top:" + this.top + "px; width:" + this.w + "px; height:" + this.height + "px;", {
        cx: this.radius,
        cy: this.radius,
        r: this.innerRadius,
        fill: "url(#gradIn)",
        "stroke-width": 1,
        stroke: "#000"
    });
    this.c[5] = UIL.DOM("UIL text", "div", "text-align:center; top:" + (this.height + 20) + "px; width:" + this.size + "px; color:" + this.fontColor);
    a = this.c[2];
    UIL.DOM(null, "defs", null, {}, a);
    UIL.DOM(null, "radialGradient", null, {
        id: "grad",
        cx: "50%",
        cy: "50%",
        r: "50%",
        fx: "50%",
        fy: "50%"
    },

        a, 1);
    UIL.DOM(null, "stop", null, {
        offset: "40%",
        style: "stop-color:rgb(0,0,0); stop-opacity:0.3;"
    }, a, [1, 0]);
    UIL.DOM(null, "stop", null, {
        offset: "80%",
        style: "stop-color:rgb(0,0,0); stop-opacity:0;"
    }, a, [1, 0]);
    UIL.DOM(null, "stop", null, {
        offset: "90%",
        style: "stop-color:rgb(50,50,50); stop-opacity:0.4;"
    }, a, [1, 0]);
    UIL.DOM(null, "stop", null, {
        offset: "100%",
        style: "stop-color:rgb(50,50,50); stop-opacity:0;"
    }, a, [1, 0]);
    a = this.c[3];
    UIL.DOM(null, "defs", null, {}, a);
    UIL.DOM(null, "radialGradient", null, {
        id: "gradS",
        cx: "50%",
        cy: "50%",

        r: "50%",
        fx: "50%",
        fy: "50%"
    }, a, 1);
    UIL.DOM(null, "stop", null, {
        offset: "60%",
        style: "stop-color:rgb(0,0,0); stop-opacity:0.5;"
    }, a, [1, 0]);
    UIL.DOM(null, "stop", null, {
        offset: "100%",
        style: "stop-color:rgb(0,0,0); stop-opacity:0;"
    }, a, [1, 0]);
    a = this.c[4];
    UIL.DOM(null, "defs", null, {}, a);
    UIL.DOM(null, "radialGradient", null, {
        id: "gradIn",
        cx: "50%",
        cy: "50%",
        r: "50%",
        fx: "50%",
        fy: "50%"
    }, a, 1);
    UIL.DOM(null, "stop", null, {
        offset: "30%",
        style: "stop-color:rgb(40,40,40); stop-opacity:1;"
    }, a, [1, 0]);
    UIL.DOM(null, "stop", null, {
        offset: "60%",

        style: "stop-color:rgb(48,48,48); stop-opacity:1;"
    }, a, [1, 0]);
    UIL.DOM(null, "stop", null, {
        offset: "80%",
        style: "stop-color:rgb(48,48,48); stop-opacity:1;"
    }, a, [1, 0]);
    UIL.DOM(null, "stop", null, {
        offset: "100%",
        style: "stop-color:rgb(30,30,30); stop-opacity:1;"
    }, a, [1, 0]);
    UIL.DOM(null, "radialGradient", null, {
        id: "gradIn2",
        cx: "50%",
        cy: "50%",
        r: "50%",
        fx: "50%",
        fy: "50%"
    }, this.c[4], 1);
    UIL.DOM(null, "stop", null, {
        offset: "30%",
        style: "stop-color:rgb(1,90,197); stop-opacity:1;"
    }, a, [1, 1]);
    UIL.DOM(null, "stop", null, {
        offset: "60%",

        style: "stop-color:rgb(3,95,207); stop-opacity:1;"
    }, a, [1, 1]);
    UIL.DOM(null, "stop", null, {
        offset: "80%",
        style: "stop-color:rgb(3,95,207); stop-opacity:1;"
    }, a, [1, 1]);
    UIL.DOM(null, "stop", null, {
        offset: "100%",
        style: "stop-color:rgb(0,65,167); stop-opacity:1;"
    }, a, [1, 1]);
    this.c[5].textContent = "x" + this.value[0] + " y" + this.value[1];
    this.c[2].events = ["mouseover", "mousedown", "mouseout"];
    this.init();
    this.update(!1)
};
UIL.Joystick.prototype = Object.create(UIL.Proto.prototype);
UIL.Joystick.prototype.constructor = UIL.Joystick;

UIL.Joystick.prototype.handleEvent = function (a) {
    a.preventDefault();
    switch (a.type) {
        case "mouseover":
            this.over(a);
            break;
        case "mousedown":
            this.down(a);
            break;
        case "mouseout":
            this.out(a);
            break;
        case "mouseup":
            this.up(a);
            break;
        case "mousemove":
            this.move(a)
    }
};
UIL.Joystick.prototype.mode = function (a) {
    switch (a) {
        case 0:
            UIL.setSvg(this.c[4], "fill", "url(#gradIn)");
            UIL.setSvg(this.c[4], "stroke", "#000");
            break;
        case 1:
            UIL.setSvg(this.c[4], "fill", "url(#gradIn2)"), UIL.setSvg(this.c[4], "stroke", "rgba(0,0,0,0)")
    }
};

UIL.Joystick.prototype.over = function (a) {
    this.isOver = !0;
    this.mode(1)
};
UIL.Joystick.prototype.out = function (a) {
    this.isOver = !1;
    this.isDown || this.mode(0)
};
UIL.Joystick.prototype.up = function (a) {
    this.isDown = !1;
    document.removeEventListener("mouseup", this, !1);
    document.removeEventListener("mousemove", this, !1);
    this.interval = setInterval(this.update.bind(this), 10);
    this.isOver ? this.mode(1) : this.mode(0)
};

UIL.Joystick.prototype.down = function (a) {
    this.isDown = !0;
    document.addEventListener("mouseup", this, !1);
    document.addEventListener("mousemove", this, !1);
    this.rect = this.c[2].getBoundingClientRect();
    this.move(a);
    this.mode(2)
};

UIL.Joystick.prototype.move = function (a) {
    if (this.isDown) {
        var b = this.radius - (a.clientX - this.rect.left);
        a = this.radius - (a.clientY - this.rect.top);
        Math.sqrt(b * b + a * a) > this.maxDistance && (a = Math.atan2(b, a), b = Math.sin(a) * this.maxDistance, a = Math.cos(a) * this.maxDistance);
        this.x = b / this.maxDistance;
        this.y = a / this.maxDistance;
        this.update()
    }
};

UIL.Joystick.prototype.update = function (a) {
    void 0 === a && (a = !0);
    null !== this.interval && (this.isDown || (this.x += (0 - this.x) / 3, this.y += (0 - this.y) / 3), this.x.toFixed(2) === this.oldx.toFixed(2) && this.y.toFixed(2) === this.oldy.toFixed(2) && (this.y = this.x = 0));
    var b = this.radius - this.x * this.maxDistance,
        c = this.radius - this.y * this.maxDistance,
        d = b + 5 * (1 - this.x) + 5,
        e = c + 5 * (1 - this.y) + 10;
    this.value[0] = 1 * -(this.x * this.multiplicator).toFixed(this.precision);
    this.value[1] = 1 * (this.y * this.multiplicator).toFixed(this.precision);
    this.c[5].textContent =

        "x" + this.value[0] + " y" + this.value[1];
    UIL.setSvg(this.c[3], "cx", d);
    UIL.setSvg(this.c[3], "cy", e);
    UIL.setSvg(this.c[4], "cx", b);
    UIL.setSvg(this.c[4], "cy", c);
    this.oldx = this.x;
    this.oldy = this.y;
    a && this.send();
    null !== this.interval && 0 === this.x && 0 === this.y && (clearInterval(this.interval), this.interval = null)
};