define("common:widget/js/logic/editor/editor.js", function(e, t, n) { ! function() {
		function t(e, t, i) {
			var n;
			return t = t.toLowerCase(),
			(n = e.__allListeners || i && (e.__allListeners = {})) && (n[t] || i && (n[t] = []))
		}
		function o(e, t, i, n, r, a) {
			var s, l = n && e[t];
			for (!l && (l = e[i]); ! l && (s = (s || e).parentNode);) {
				if ("BODY" == s.tagName || a && ! a(s)) return null;
				l = s[i]
			}
			return l && r && ! r(l) ? o(l, t, i, ! 1, r) : l
		}
		UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};
		var r = window.baidu || {};
		window.baidu = r,
		window.UE = r.editor = {},
		UE.plugins = {},
		UE.commands = {},
		UE.instants = {},
		UE.I18N = {},
		UE.version = "1.2.6.0";
		var a = UE.dom = {},
		s = e("common:widget/js/util/tangram/tangram.js"),
		l = (e("common:widget/js/util/store/store.js"), e("common:widget/js/logic/editor/config/config.js")),
		d = e("common:widget/js/logic/editor/lang/lang.js"),
		c = e("common:widget/js/ui/dialog/dialog.js"),
		u = e("common:widget/js/util/event/event.js"),
		f = e("common:widget/js/ui/tip/tip.js");
		e("common:widget/js/logic/editor/fileUploader/fileUploader.js"),
		r.swf = s.swf,
		window.UEDITOR_CONFIG = l,
		UE.I18N = d;
		var h = UE.browser = function() {
			var e = navigator.userAgent.toLowerCase(),
			t = window.opera,
			i = {
				ie: !! window.ActiveXObject,
				opera: !! t && t.version,
				webkit: e.indexOf(" applewebkit/") > - 1,
				mac: e.indexOf("macintosh") > - 1,
				quirks: "BackCompat" == document.compatMode
			};
			i.gecko = "Gecko" == navigator.product && ! i.webkit && ! i.opera;
			var n = 0;
			if (i.ie && (n = parseFloat(e.match(/msie (\d+)/)[1]), i.ie9Compat = 9 == document.documentMode, i.ie8 = !! document.documentMode, i.ie8Compat = 8 == document.documentMode, i.ie7Compat = 7 == n && ! document.documentMode || 7 == document.documentMode, i.ie6Compat = 7 > n || i.quirks), i.gecko) {
				var o = e.match(/rv:([\d\.]+)/);
				o && (o = o[1].split("."), n = 1e4 * o[0] + 100 * (o[1] || 0) + 1 * (o[2] || 0))
			}
			return /chrome\/(\d+\.\d)/i.test(e) && (i.chrome = + RegExp.$1),
			/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e) && ! /chrome/i.test(e) && (i.safari = + (RegExp.$1 || RegExp.$2)),
			i.opera && (n = parseFloat(t.version())),
			i.webkit && (n = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])),
			i.version = n,
			i.isCompatible = ! i.mobile && (i.ie && n >= 6 || i.gecko && n >= 10801 || i.opera && n >= 9.5 || i.air && n >= 1 || i.webkit && n >= 522 || ! 1),
			i
		} (),
		m = h.ie,
		p = (h.webkit, h.gecko, h.opera, UE.utils = {
			each: function(e, t, i) {
				if (null != e) if (e.length === + e.length) {
					for (var n = 0, o = e.length; o > n; n++) if (t.call(i, e[n], n, e) === ! 1) return ! 1
				} else for (var r in e) if (e.hasOwnProperty(r) && t.call(i, e[r], r, e) === ! 1) return ! 1
			},
			makeInstance: function(e) {
				var t = new Function;
				return t.prototype = e,
				e = new t,
				t.prototype = null,
				e
			},
			extend: function(e, t, i) {
				if (t) for (var n in t) i && e.hasOwnProperty(n) || (e[n] = t[n]);
				return e
			},
			extend2: function(e) {
				for (var t = arguments, i = 1; i < t.length; i++) {
					var n = t[i];
					for (var o in n) e.hasOwnProperty(o) || (e[o] = n[o])
				}
				return e
			},
			inherits: function(e, t) {
				var i = e.prototype,
				n = p.makeInstance(t.prototype);
				return p.extend(n, i, ! 0),
				e.prototype = n,
				n.constructor = e
			},
			bind: function(e, t) {
				return function() {
					return e.apply(t, arguments)
				}
			},
			defer: function(e, t, i) {
				var n;
				return function() {
					i && clearTimeout(n),
					n = setTimeout(e, t)
				}
			},
			indexOf: function(e, t, i) {
				var n = - 1;
				return i = this.isNumber(i) ? i: 0,
				this.each(e, function(e, o) {
					return o >= i && e === t ? (n = o, ! 1) : void 0
				}),
				n
			},
			removeItem: function(e, t) {
				for (var i = 0, n = e.length; n > i; i++) e[i] === t && (e.splice(i, 1), i--)
			},
			trim: function(e) {
				return e.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "")
			},
			listToMap: function(e) {
				if (!e) return {};
				e = p.isArray(e) ? e: e.split(",");
				for (var t, i = 0, n = {}; t = e[i++];) n[t.toUpperCase()] = n[t] = 1;
				return n
			},
			unhtml: function(e, t) {
				return e ? e.replace(t || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#92|#47);)?/g, function(e, t) {
					return t ? e: {
						"<": "&lt;",
						"&": "&amp;",
						'"': "&quot;",
						">": "&gt;",
						"'": "&#39;"
					} [e]
				}) : ""
			},
			html: function(e) {
				return e ? e.replace(/&((g|l|quo)t|amp|#39);/g, function(e) {
					return {
						"&lt;": "<",
						"&amp;": "&",
						"&quot;": '"',
						"&gt;": ">",
						"&#39;": "'"
					} [e]
				}) : ""
			},
			cssStyleToDomStyle: function() {
				var e = document.createElement("div").style,
				t = {
					"float": void 0 != e.cssFloat ? "cssFloat": void 0 != e.styleFloat ? "styleFloat": "float"
				};
				return function(e) {
					return t[e] || (t[e] = e.toLowerCase().replace(/-./g, function(e) {
						return e.charAt(1).toUpperCase()
					}))
				}
			} (),
			loadFile: function() {
				function e(e, i) {
					try {
						for (var n, o = 0; n = t[o++];) if (n.doc === e && n.url == (i.src || i.href)) return n
					} catch(r) {
						return null
					}
				}
				var t = [];
				return function(i, n, o) {
					var r = e(i, n);
					if (r) return void(r.ready ? o && o() : r.funs.push(o));
					if (t.push({
						doc: i,
						url: n.src || n.href,
						funs: [o]
					}), ! i.body) {
						var a = [];
						for (var s in n)"tag" != s && a.push(s + '="' + n[s] + '"');
						return void i.write("<" + n.tag + " " + a.join(" ") + " ></" + n.tag + ">")
					}
					if (!n.id || ! i.getElementById(n.id)) {
						var l = i.createElement(n.tag);
						delete n.tag;
						for (var s in n) l.setAttribute(s, n[s]);
						l.onload = l.onreadystatechange = function() {
							if (!this.readyState || /loaded|complete/.test(this.readyState)) {
								if (r = e(i, n), r.funs.length > 0) {
									r.ready = 1;
									for (var t; t = r.funs.pop();) t()
								}
								l.onload = l.onreadystatechange = null
							}
						},
						l.onerror = function() {
							throw Error("The load " + (n.href || n.src) + " fails,check the url settings of file ueditor.config.js ")
						},
						i.getElementsByTagName("head")[0].appendChild(l)
					}
				}
			} (),
			isEmptyObject: function(e) {
				if (null == e) return ! 0;
				if (this.isArray(e) || this.isString(e)) return 0 === e.length;
				for (var t in e) if (e.hasOwnProperty(t)) return ! 1;
				return ! 0
			},
			fixColor: function(e, t) {
				if (/color/i.test(e) && /rgba?/.test(t)) {
					var i = t.split(",");
					if (i.length > 3) return "";
					t = "#";
					for (var n, o = 0; n = i[o++];) n = parseInt(n.replace(/[^\d]/gi, ""), 10).toString(16),
					t += 1 == n.length ? "0" + n: n;
					t = t.toUpperCase()
				}
				return t
			},
			optCss: function(e) {
				function t(e, t) {
					if (!e) return "";
					var i = e.top,
					n = e.bottom,
					o = e.left,
					r = e.right,
					a = "";
					if (i && o && n && r) a += ";" + t + ":" + (i == n && n == o && o == r ? i: i == n && o == r ? i + " " + o: o == r ? i + " " + o + " " + n: i + " " + r + " " + n + " " + o) + ";";
					else for (var s in e) a += ";" + t + "-" + s + ":" + e[s] + ";";
					return a
				}
				var i, n;
				return e = e.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function(e, t, o, r) {
					if (1 == r.split(" ").length) switch (t) {
					case "padding":
						return ! i && (i = {}),
						i[o] = r,
						"";
					case "margin":
						return ! n && (n = {}),
						n[o] = r,
						"";
					case "border":
						return "initial" == r ? "": e
					}
					return e
				}),
				e += t(i, "padding") + t(n, "margin"),
				e.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, "").replace(/;([ \n\r\t]+)|\1;/g, ";").replace(/(&((l|g)t|quot|#39))?;{2,}/g, function(e, t) {
					return t ? t + ";;": ";"
				})
			},
			clone: function(e, t) {
				var i;
				t = t || {};
				for (var n in e) e.hasOwnProperty(n) && (i = e[n], "object" == typeof i ? (t[n] = p.isArray(i) ? [] : {},
				p.clone(e[n], t[n])) : t[n] = i);
				return t
			},
			transUnitToPx: function(e) {
				if (!/(pt|cm)/.test(e)) return e;
				var t;
				switch (e.replace(/([\d.]+)(\w+)/, function(i, n, o) {
					e = n,
					t = o
				}), t) {
				case "cm":
					e = 25 * parseFloat(e);
					break;
				case "pt":
					e = Math.round(96 * parseFloat(e) / 72)
				}
				return e + (e ? "px": "")
			},
			domReady: function() {
				function e(e) {
					e.isReady = ! 0;
					for (var i; i = t.pop(); i());
				}
				var t = [];
				return function(i, n) {
					n = n || window;
					var o = n.document;
					i && t.push(i),
					"complete" === o.readyState ? e(o) : (o.isReady && e(o), h.ie ? (!function() {
						if (!o.isReady) {
							try {
								o.documentElement.doScroll("left")
							} catch(t) {
								return void setTimeout(arguments.callee, 0)
							}
							e(o)
						}
					} (), n.attachEvent("onload", function() {
						e(o)
					})) : (o.addEventListener("DOMContentLoaded", function() {
						o.removeEventListener("DOMContentLoaded", arguments.callee, ! 1),
						e(o)
					},
					! 1), n.addEventListener("load", function() {
						e(o)
					},
					! 1)))
				}
			} (),
			cssRule: h.ie ? function(e, t, i) {
				var n, o;
				i = i || document,
				n = i.indexList ? i.indexList: i.indexList = {};
				var r;
				if (n[e]) r = i.styleSheets[n[e]];
				else {
					if (void 0 === t) return "";
					r = i.createStyleSheet("", o = i.styleSheets.length),
					n[e] = o
				}
				return void 0 === t ? r.cssText: void(r.cssText = t || "")
			}: function(e, t, i) {
				i = i || document;
				var n, o = i.getElementsByTagName("head")[0];
				if (! (n = i.getElementById(e))) {
					if (void 0 === t) return "";
					n = i.createElement("style"),
					n.id = e,
					o.appendChild(n)
				}
				return void 0 === t ? n.innerHTML: void("" !== t ? n.innerHTML = t: o.removeChild(n))
			},
			sort: function(e, t) {
				t = t || function(e, t) {
					return e.localeCompare(t)
				};
				for (var i = 0, n = e.length; n > i; i++) for (var o = i, r = e.length; r > o; o++) if (t(e[i], e[o]) > 0) {
					var a = e[i];
					e[i] = e[o],
					e[o] = a
				}
				return e
			}
		});
		p.each(["String", "Function", "Array", "Number", "RegExp", "Object"], function(e) {
			UE.utils["is" + e] = function(t) {
				return Object.prototype.toString.apply(t) == "[object " + e + "]"
			}
		});
		var g = UE.EventBase = function() {};
		g.prototype = {
			addListener: function(e, i) {
				e = p.trim(e).split(" ");
				for (var n, o = 0; n = e[o++];) t(this, n, ! 0).push(i)
			},
			removeListener: function(e, i) {
				e = p.trim(e).split(" ");
				for (var n, o = 0; n = e[o++];) p.removeItem(t(this, n) || [], i)
			},
			fireEvent: function() {
				var e = arguments[0];
				e = p.trim(e).split(" ");
				for (var i, n = 0; i = e[n++];) {
					var o, r, a, s = t(this, i);
					if (s) for (a = s.length; a--;) if (s[a]) {
						if (r = s[a].apply(this, arguments), r === ! 0) return r;
						void 0 !== r && (o = r)
					} (r = this["on" + i.toLowerCase()]) && (o = r.apply(this, arguments))
				}
				return o
			}
		};
		var v = a.dtd = function() {
			function e(e) {
				for (var t in e) e[t.toUpperCase()] = e[t];
				return e
			}
			var t = p.extend2,
			i = e({
				isindex: 1,
				fieldset: 1
			}),
			n = e({
				input: 1,
				button: 1,
				select: 1,
				textarea: 1,
				label: 1
			}),
			o = t(e({
				a: 1
			}), n),
			r = t({
				iframe: 1
			},
			o),
			a = e({
				hr: 1,
				ul: 1,
				menu: 1,
				div: 1,
				blockquote: 1,
				noscript: 1,
				table: 1,
				center: 1,
				address: 1,
				dir: 1,
				pre: 1,
				h5: 1,
				dl: 1,
				h4: 1,
				noframes: 1,
				h6: 1,
				ol: 1,
				h1: 1,
				h3: 1,
				h2: 1
			}),
			s = e({
				ins: 1,
				del: 1,
				script: 1,
				style: 1
			}),
			l = t(e({
				b: 1,
				acronym: 1,
				bdo: 1,
				"var": 1,
				"#": 1,
				abbr: 1,
				code: 1,
				br: 1,
				i: 1,
				cite: 1,
				kbd: 1,
				u: 1,
				strike: 1,
				s: 1,
				tt: 1,
				strong: 1,
				q: 1,
				samp: 1,
				em: 1,
				dfn: 1,
				span: 1
			}), s),
			d = t(e({
				sub: 1,
				img: 1,
				embed: 1,
				object: 1,
				sup: 1,
				basefont: 1,
				map: 1,
				applet: 1,
				font: 1,
				big: 1,
				small: 1
			}), l),
			c = t(e({
				p: 1
			}), d),
			u = t(e({
				iframe: 1
			}), d, n),
			f = e({
				img: 1,
				embed: 1,
				noscript: 1,
				br: 1,
				kbd: 1,
				center: 1,
				button: 1,
				basefont: 1,
				h5: 1,
				h4: 1,
				samp: 1,
				h6: 1,
				ol: 1,
				h1: 1,
				h3: 1,
				h2: 1,
				form: 1,
				font: 1,
				"#": 1,
				select: 1,
				menu: 1,
				ins: 1,
				abbr: 1,
				label: 1,
				code: 1,
				table: 1,
				script: 1,
				cite: 1,
				input: 1,
				iframe: 1,
				strong: 1,
				textarea: 1,
				noframes: 1,
				big: 1,
				small: 1,
				span: 1,
				hr: 1,
				sub: 1,
				bdo: 1,
				"var": 1,
				div: 1,
				object: 1,
				sup: 1,
				strike: 1,
				dir: 1,
				map: 1,
				dl: 1,
				applet: 1,
				del: 1,
				isindex: 1,
				fieldset: 1,
				ul: 1,
				b: 1,
				acronym: 1,
				a: 1,
				blockquote: 1,
				i: 1,
				u: 1,
				s: 1,
				tt: 1,
				address: 1,
				q: 1,
				pre: 1,
				p: 1,
				em: 1,
				dfn: 1
			}),
			h = t(e({
				a: 0
			}), u),
			m = e({
				tr: 1
			}),
			g = e({
				"#": 1
			}),
			v = t(e({
				param: 1
			}), f),
			y = t(e({
				form: 1
			}), i, r, a, c),
			b = e({
				li: 1,
				ol: 1,
				ul: 1
			}),
			C = e({
				style: 1,
				script: 1
			}),
			N = e({
				base: 1,
				link: 1,
				meta: 1,
				title: 1
			}),
			E = t(N, C),
			w = e({
				head: 1,
				body: 1
			}),
			x = e({
				html: 1
			}),
			_ = e({
				address: 1,
				blockquote: 1,
				center: 1,
				dir: 1,
				div: 1,
				dl: 1,
				fieldset: 1,
				form: 1,
				h1: 1,
				h2: 1,
				h3: 1,
				h4: 1,
				h5: 1,
				h6: 1,
				hr: 1,
				isindex: 1,
				menu: 1,
				noframes: 1,
				ol: 1,
				p: 1,
				pre: 1,
				table: 1,
				ul: 1
			}),
			S = e({
				area: 1,
				base: 1,
				basefont: 1,
				br: 1,
				col: 1,
				command: 1,
				dialog: 1,
				embed: 1,
				hr: 1,
				img: 1,
				input: 1,
				isindex: 1,
				keygen: 1,
				link: 1,
				meta: 1,
				param: 1,
				source: 1,
				track: 1,
				wbr: 1
			});
			return e({
				$nonBodyContent: t(x, w, N),
				$block: _,
				$inline: h,
				$inlineWithA: t(e({
					a: 1
				}), h),
				$body: t(e({
					script: 1,
					style: 1
				}), _),
				$cdata: e({
					script: 1,
					style: 1
				}),
				$empty: S,
				$nonChild: e({
					iframe: 1,
					textarea: 1
				}),
				$listItem: e({
					dd: 1,
					dt: 1,
					li: 1
				}),
				$list: e({
					ul: 1,
					ol: 1,
					dl: 1
				}),
				$isNotEmpty: e({
					table: 1,
					ul: 1,
					ol: 1,
					dl: 1,
					iframe: 1,
					area: 1,
					base: 1,
					col: 1,
					hr: 1,
					img: 1,
					embed: 1,
					input: 1,
					link: 1,
					meta: 1,
					param: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1
				}),
				$removeEmpty: e({
					a: 1,
					abbr: 1,
					acronym: 1,
					address: 1,
					b: 1,
					bdo: 1,
					big: 1,
					cite: 1,
					code: 1,
					del: 1,
					dfn: 1,
					em: 1,
					font: 1,
					i: 1,
					ins: 1,
					label: 1,
					kbd: 1,
					q: 1,
					s: 1,
					samp: 1,
					small: 1,
					span: 1,
					strike: 1,
					strong: 1,
					sub: 1,
					sup: 1,
					tt: 1,
					u: 1,
					"var": 1
				}),
				$removeEmptyBlock: e({
					p: 1,
					div: 1
				}),
				$tableContent: e({
					caption: 1,
					col: 1,
					colgroup: 1,
					tbody: 1,
					td: 1,
					tfoot: 1,
					th: 1,
					thead: 1,
					tr: 1,
					table: 1
				}),
				$notTransContent: e({
					pre: 1,
					script: 1,
					style: 1,
					textarea: 1
				}),
				html: w,
				head: E,
				style: g,
				script: g,
				body: y,
				base: {},
				link: {},
				meta: {},
				title: g,
				col: {},
				tr: e({
					td: 1,
					th: 1
				}),
				img: {},
				embed: {},
				colgroup: e({
					thead: 1,
					col: 1,
					tbody: 1,
					tr: 1,
					tfoot: 1
				}),
				noscript: y,
				td: y,
				br: {},
				th: y,
				center: y,
				kbd: h,
				button: t(c, a),
				basefont: {},
				h5: h,
				h4: h,
				samp: h,
				h6: h,
				ol: b,
				h1: h,
				h3: h,
				option: g,
				h2: h,
				form: t(i, r, a, c),
				select: e({
					optgroup: 1,
					option: 1
				}),
				font: h,
				ins: h,
				menu: b,
				abbr: h,
				label: h,
				table: e({
					thead: 1,
					col: 1,
					tbody: 1,
					tr: 1,
					colgroup: 1,
					caption: 1,
					tfoot: 1
				}),
				code: h,
				tfoot: m,
				cite: h,
				li: y,
				input: {},
				iframe: y,
				strong: h,
				textarea: g,
				noframes: y,
				big: h,
				small: h,
				span: e({
					"#": 1,
					br: 1
				}),
				hr: h,
				dt: h,
				sub: h,
				optgroup: e({
					option: 1
				}),
				param: {},
				bdo: h,
				"var": h,
				div: y,
				object: v,
				sup: h,
				dd: y,
				strike: h,
				area: {},
				dir: b,
				map: t(e({
					area: 1,
					form: 1,
					p: 1
				}), i, s, a),
				applet: v,
				dl: e({
					dt: 1,
					dd: 1
				}),
				del: h,
				isindex: {},
				fieldset: t(e({
					legend: 1
				}), f),
				thead: m,
				ul: b,
				acronym: h,
				b: h,
				a: t(e({
					a: 1
				}), u),
				blockquote: t(e({
					td: 1,
					tr: 1,
					tbody: 1,
					li: 1
				}), y),
				caption: h,
				i: h,
				u: h,
				tbody: m,
				s: h,
				address: t(r, c),
				tt: h,
				legend: h,
				q: h,
				pre: t(l, o),
				p: t(e({
					a: 1
				}), h),
				em: h,
				dfn: h
			})
		} (),
		y = m && h.version < 9 ? {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder"
		}: {
			tabindex: "tabIndex",
			readonly: "readOnly"
		},
		b = p.listToMap(["-webkit-box", "-moz-box", "block", "list-item", "table", "table-row-group", "table-header-group", "table-footer-group", "table-row", "table-column-group", "table-column", "table-cell", "table-caption"]),
		C = a.domUtils = {
			NODE_ELEMENT: 1,
			NODE_DOCUMENT: 9,
			NODE_TEXT: 3,
			NODE_COMMENT: 8,
			NODE_DOCUMENT_FRAGMENT: 11,
			POSITION_IDENTICAL: 0,
			POSITION_DISCONNECTED: 1,
			POSITION_FOLLOWING: 2,
			POSITION_PRECEDING: 4,
			POSITION_IS_CONTAINED: 8,
			POSITION_CONTAINS: 16,
			fillChar: m && "6" == h.version ? "\ufeff": "\u200b",
			keys: {
				8: 1,
				46: 1,
				16: 1,
				17: 1,
				18: 1,
				37: 1,
				38: 1,
				39: 1,
				40: 1,
				13: 1
			},
			getPosition: function(e, t) {
				if (e === t) return 0;
				var i, n = [e],
				o = [t];
				for (i = e; i = i.parentNode;) {
					if (i === t) return 10;
					n.push(i)
				}
				for (i = t; i = i.parentNode;) {
					if (i === e) return 20;
					o.push(i)
				}
				if (n.reverse(), o.reverse(), n[0] !== o[0]) return 1;
				for (var r = - 1; r++, n[r] === o[r];);
				for (e = n[r], t = o[r]; e = e.nextSibling;) if (e === t) return 4;
				return 2
			},
			getNodeIndex: function(e, t) {
				for (var i = e, n = 0; i = i.previousSibling;) t && 3 == i.nodeType ? i.nodeType != i.nextSibling.nodeType && n++ : n++;
				return n
			},
			inDoc: function(e, t) {
				return 10 == C.getPosition(e, t)
			},
			findParent: function(e, t, i) {
				if (e && ! C.isBody(e)) for (e = i ? e: e.parentNode; e;) {
					if (!t || t(e) || C.isBody(e)) return t && ! t(e) && C.isBody(e) ? null: e;
					e = e.parentNode
				}
				return null
			},
			findParentByTagName: function(e, t, i, n) {
				return t = p.listToMap(p.isArray(t) ? t: [t]),
				C.findParent(e, function(e) {
					return t[e.tagName] && ! (n && n(e))
				},
				i)
			},
			findParents: function(e, t, i, n) {
				for (var o = t && (i && i(e) || ! i) ? [e] : []; e = C.findParent(e, i);) o.push(e);
				return n ? o: o.reverse()
			},
			insertAfter: function(e, t) {
				return e.parentNode.insertBefore(t, e.nextSibling)
			},
			remove: function(e, t) {
				var i, n = e.parentNode;
				if (n) {
					if (t && e.hasChildNodes()) for (; i = e.firstChild;) n.insertBefore(i, e);
					n.removeChild(e)
				}
				return e
			},
			getNextDomNode: function(e, t, i, n) {
				return o(e, "firstChild", "nextSibling", t, i, n)
			},
			isBookmarkNode: function(e) {
				return 1 == e.nodeType && e.id && /^_baidu_bookmark_/i.test(e.id)
			},
			getWindow: function(e) {
				var t = e.ownerDocument || e;
				return t.defaultView || t.parentWindow
			},
			getCommonAncestor: function(e, t) {
				if (e === t) return e;
				for (var i = [e], n = [t], o = e, r = - 1; o = o.parentNode;) {
					if (o === t) return o;
					i.push(o)
				}
				for (o = t; o = o.parentNode;) {
					if (o === e) return o;
					n.push(o)
				}
				for (i.reverse(), n.reverse(); r++, i[r] === n[r];);
				return 0 == r ? null: i[r - 1]
			},
			clearEmptySibling: function(e, t, i) {
				function n(e, t) {
					for (var i; e && ! C.isBookmarkNode(e) && (C.isEmptyInlineElement(e) || ! new RegExp("[^	\n\r" + C.fillChar + "]").test(e.nodeValue));) i = e[t],
					C.remove(e),
					e = i
				} ! t && n(e.nextSibling, "nextSibling"),
				! i && n(e.previousSibling, "previousSibling")
			},
			split: function(e, t) {
				var i = e.ownerDocument;
				if (h.ie && t == e.nodeValue.length) {
					var n = i.createTextNode("");
					return C.insertAfter(e, n)
				}
				var o = e.splitText(t);
				if (h.ie8) {
					var r = i.createTextNode("");
					C.insertAfter(o, r),
					C.remove(r)
				}
				return o
			},
			isWhitespace: function(e) {
				return ! new RegExp("[^ 	\n\r" + C.fillChar + "]").test(e.nodeValue)
			},
			getXY: function(e) {
				for (var t = 0, i = 0; e.offsetParent;) i += e.offsetTop,
				t += e.offsetLeft,
				e = e.offsetParent;
				return {
					x: t,
					y: i
				}
			},
			on: function(e, t, i) {
				var n = p.isArray(t) ? t: [t],
				o = n.length;
				if (o) for (; o--;) if (t = n[o], e.addEventListener) e.addEventListener(t, i, ! 1);
				else {
					i._d || (i._d = {
						els: []
					});
					var r = t + i.toString(),
					a = p.indexOf(i._d.els, e);
					i._d[r] && - 1 != a || ( - 1 == a && i._d.els.push(e), i._d[r] || (i._d[r] = function(e) {
						return i.call(e.srcElement, e || window.event)
					}), e.attachEvent("on" + t, i._d[r]))
				}
				e = null
			},
			un: function(e, t, i) {
				var n = p.isArray(t) ? t: [t],
				o = n.length;
				if (o) for (; o--;) if (t = n[o], e.removeEventListener) e.removeEventListener(t, i, ! 1);
				else {
					var r = t + i.toString();
					try {
						e.detachEvent("on" + t, i._d ? i._d[r] : i)
					} catch(a) {}
					if (i._d && i._d[r]) {
						var s = p.indexOf(i._d.els, e); - 1 != s && i._d.els.splice(s, 1),
						0 == i._d.els.length && delete i._d[r]
					}
				}
			},
			isSameElement: function(e, t) {
				if (e.tagName != t.tagName) return ! 1;
				var i = e.attributes,
				n = t.attributes;
				if (!m && i.length != n.length) return ! 1;
				for (var o, r, a = 0, s = 0, l = 0; o = i[l++];) {
					if ("style" == o.nodeName) {
						if (o.specified && a++, C.isSameStyle(e, t)) continue;
						return ! 1
					}
					if (m) {
						if (!o.specified) continue;
						a++,
						r = n.getNamedItem(o.nodeName)
					} else r = t.attributes[o.nodeName];
					if (!r.specified || o.nodeValue != r.nodeValue) return ! 1
				}
				if (m) {
					for (l = 0; r = n[l++];) r.specified && s++;
					if (a != s) return ! 1
				}
				return ! 0
			},
			isSameStyle: function(e, t) {
				var i = e.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":"),
				n = t.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":");
				if (h.opera) {
					if (i = e.style, n = t.style, i.length != n.length) return ! 1;
					for (var o in i) if (!/^(\d+|csstext)$/i.test(o) && i[o] != n[o]) return ! 1;
					return ! 0
				}
				if (!i || ! n) return i == n;
				if (i = i.split(";"), n = n.split(";"), i.length != n.length) return ! 1;
				for (var r, a = 0; r = i[a++];) if ( - 1 == p.indexOf(n, r)) return ! 1;
				return ! 0
			},
			isBlockElm: function(e) {
				return 1 == e.nodeType && (v.$block[e.tagName] || b[C.getComputedStyle(e, "display")]) && ! v.$nonChild[e.tagName]
			},
			isBody: function(e) {
				return e && 1 == e.nodeType && "body" == e.tagName.toLowerCase()
			},
			breakParent: function(e, t) {
				var i, n, o, r = e,
				a = e;
				do {
					for (r = r.parentNode, n ? (i = r.cloneNode(!1), i.appendChild(n), n = i, i = r.cloneNode(!1), i.appendChild(o), o = i) : (n = r.cloneNode(!1), o = n.cloneNode(!1)); i = a.previousSibling;) n.insertBefore(i, n.firstChild);
					for (; i = a.nextSibling;) o.appendChild(i);
					a = r
				} while (t !== r);
				return i = t.parentNode,
				i.insertBefore(n, t),
				i.insertBefore(o, t),
				i.insertBefore(e, o),
				C.remove(t),
				e
			},
			isEmptyInlineElement: function(e) {
				if (1 != e.nodeType || ! v.$removeEmpty[e.tagName]) return 0;
				for (e = e.firstChild; e;) {
					if (C.isBookmarkNode(e)) return 0;
					if (1 == e.nodeType && ! C.isEmptyInlineElement(e) || 3 == e.nodeType && ! C.isWhitespace(e)) return 0;
					e = e.nextSibling
				}
				return 1
			},
			trimWhiteTextNode: function(e) {
				function t(t) {
					for (var i;
					(i = e[t]) && 3 == i.nodeType && C.isWhitespace(i);) e.removeChild(i)
				}
				t("firstChild"),
				t("lastChild")
			},
			mergeChild: function(e, t, i) {
				for (var n, o = C.getElementsByTagName(e, e.tagName.toLowerCase()), r = 0; n = o[r++];) if (n.parentNode && ! C.isBookmarkNode(n)) if ("span" != n.tagName.toLowerCase()) C.isSameElement(e, n) && C.remove(n, ! 0);
				else {
					if (e === n.parentNode && (C.trimWhiteTextNode(e), 1 == e.childNodes.length)) {
						e.style.cssText = n.style.cssText + ";" + e.style.cssText,
						C.remove(n, ! 0);
						continue
					}
					if (n.style.cssText = e.style.cssText + ";" + n.style.cssText, i) {
						var a = i.style;
						if (a) {
							a = a.split(";");
							for (var s, l = 0; s = a[l++];) n.style[p.cssStyleToDomStyle(s.split(":")[0])] = s.split(":")[1]
						}
					}
					C.isSameStyle(n, e) && C.remove(n, ! 0)
				}
			},
			getElementsByTagName: function(e, t, i) {
				if (i && p.isString(i)) {
					var n = i;
					i = function(e) {
						return C.hasClass(e, n)
					}
				}
				t = p.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
				for (var o, r = [], a = 0; o = t[a++];) for (var s, l = e.getElementsByTagName(o), d = 0; s = l[d++];)(!i || i(s)) && r.push(s);
				return r
			},
			mergeToParent: function(e) {
				for (var t = e.parentNode; t && v.$removeEmpty[t.tagName];) {
					if (t.tagName == e.tagName || "A" == t.tagName) {
						if (C.trimWhiteTextNode(t), "SPAN" == t.tagName && ! C.isSameStyle(t, e) || "A" == t.tagName && "SPAN" == e.tagName) {
							if (t.childNodes.length > 1 || t !== e.parentNode) {
								e.style.cssText = t.style.cssText + ";" + e.style.cssText,
								t = t.parentNode;
								continue
							}
							t.style.cssText += ";" + e.style.cssText,
							"A" == t.tagName && (t.style.textDecoration = "underline")
						}
						if ("A" != t.tagName) {
							t === e.parentNode && C.remove(e, ! 0);
							break
						}
					}
					t = t.parentNode
				}
			},
			mergeSibling: function(e, t, i) {
				function n(e, t, i) {
					var n;
					if ((n = i[e]) && ! C.isBookmarkNode(n) && 1 == n.nodeType && C.isSameElement(i, n)) {
						for (; n.firstChild;)"firstChild" == t ? i.insertBefore(n.lastChild, i.firstChild) : i.appendChild(n.firstChild);
						C.remove(n)
					}
				} ! t && n("previousSibling", "firstChild", e),
				! i && n("nextSibling", "lastChild", e)
			},
			unSelectable: m || h.opera ? function(e) {
				e.onselectstart = function() {
					return ! 1
				},
				e.onclick = e.onkeyup = e.onkeydown = function() {
					try {
						return ! 1
					} catch(e) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: e.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 1883
						})
					}
				},
				e.unselectable = "on",
				e.setAttribute("unselectable", "on");
				for (var t, i = 0; t = e.all[i++];) switch (t.tagName.toLowerCase()) {
				case "iframe":
				case "textarea":
				case "input":
				case "select":
					break;
				default:
					t.unselectable = "on",
					e.setAttribute("unselectable", "on")
				}
			}: function(e) {
				e.style.MozUserSelect = e.style.webkitUserSelect = e.style.KhtmlUserSelect = "none"
			},
			removeAttributes: function(e, t) {
				t = p.isArray(t) ? t: p.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
				for (var i, n = 0; i = t[n++];) {
					switch (i = y[i] || i) {
					case "className":
						e[i] = "";
						break;
					case "style":
						e.style.cssText = "",
						! h.ie && e.removeAttributeNode(e.getAttributeNode("style"))
					}
					e.removeAttribute(i)
				}
			},
			createElement: function(e, t, i) {
				return C.setAttributes(e.createElement(t), i)
			},
			setAttributes: function(e, t) {
				for (var i in t) if (t.hasOwnProperty(i)) {
					var n = t[i];
					switch (i) {
					case "class":
						e.className = n;
						break;
					case "style":
						e.style.cssText = e.style.cssText + ";" + n;
						break;
					case "innerHTML":
						e[i] = n;
						break;
					case "value":
						e.value = n;
						break;
					default:
						e.setAttribute(y[i] || i, n)
					}
				}
				return e
			},
			getComputedStyle: function(e, t) {
				var i = "width height top left";
				if (i.indexOf(t) > - 1) return e["offset" + t.replace(/^\w/, function(e) {
					return e.toUpperCase()
				})] + "px";
				if (3 == e.nodeType && (e = e.parentNode), h.ie && h.version < 9 && "font-size" == t && ! e.style.fontSize && ! v.$empty[e.tagName] && ! v.$nonChild[e.tagName]) {
					var n = e.ownerDocument.createElement("span");
					n.style.cssText = "padding:0;border:0;font-family:simsun;",
					n.innerHTML = ".",
					e.appendChild(n);
					var o = n.offsetHeight;
					return e.removeChild(n),
					n = null,
					o + "px"
				}
				try {
					var r = C.getStyle(e, t) || (window.getComputedStyle ? C.getWindow(e).getComputedStyle(e, "").getPropertyValue(t) : (e.currentStyle || e.style)[p.cssStyleToDomStyle(t)])
				} catch(a) {
					return ""
				}
				return p.transUnitToPx(p.fixColor(t, r))
			},
			removeClasses: function(e, t) {
				t = p.isArray(t) ? t: p.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
				for (var i, n = 0, o = e.className; i = t[n++];) o = o.replace(new RegExp("\\b" + i + "\\b"), "");
				o = p.trim(o).replace(/[ ]{2,}/g, " "),
				o ? e.className = o: C.removeAttributes(e, ["class"])
			},
			addClass: function(e, t) {
				if (e) {
					t = p.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
					for (var i, n = 0, o = e.className; i = t[n++];) new RegExp("\\b" + i + "\\b").test(o) || (e.className += " " + i)
				}
			},
			hasClass: function(e, t) {
				if (p.isRegExp(t)) return t.test(e.className);
				t = p.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
				for (var i, n = 0, o = e.className; i = t[n++];) if (!new RegExp("\\b" + i + "\\b", "i").test(o)) return ! 1;
				return n - 1 == t.length
			},
			preventDefault: function(e) {
				e.preventDefault ? e.preventDefault() : e.returnValue = ! 1
			},
			removeStyle: function(e, t) {
				h.ie ? e.style.cssText = e.style.cssText.replace(new RegExp(t + "[^:]*:[^;]+;?", "ig"), "") : e.style.removeProperty ? e.style.removeProperty(t) : e.style.removeAttribute(p.cssStyleToDomStyle(t)),
				e.style.cssText || C.removeAttributes(e, ["style"])
			},
			getStyle: function(e, t) {
				var i = e.style[p.cssStyleToDomStyle(t)];
				return p.fixColor(t, i)
			},
			setStyle: function(e, t, i) {
				e.style[p.cssStyleToDomStyle(t)] = i,
				p.trim(e.style.cssText) || this.removeAttributes(e, "style")
			},
			setStyles: function(e, t) {
				for (var i in t) t.hasOwnProperty(i) && C.setStyle(e, i, t[i])
			},
			removeDirtyAttr: function(e) {
				for (var t, i = 0, n = e.getElementsByTagName("*"); t = n[i++];) t.removeAttribute("_moz_dirty");
				e.removeAttribute("_moz_dirty")
			},
			getChildCount: function(e, t) {
				var i = 0,
				n = e.firstChild;
				for (t = t || function() {
					return 1
				}; n;) t(n) && i++,
				n = n.nextSibling;
				return i
			},
			isEmptyNode: function(e) {
				return ! e.firstChild || 0 == C.getChildCount(e, function(e) {
					return ! C.isBr(e) && ! C.isBookmarkNode(e) && ! C.isWhitespace(e)
				})
			},
			clearSelectedArr: function(e) {
				for (var t; t = e.pop();) C.removeAttributes(t, ["class"])
			},
			scrollToView: function(e, t, i) {
				var n = function() {
					var e = t.document,
					i = "CSS1Compat" == e.compatMode;
					return {
						width: (i ? e.documentElement.clientWidth: e.body.clientWidth) || 0,
						height: (i ? e.documentElement.clientHeight: e.body.clientHeight) || 0
					}
				},
				o = function(e) {
					if ("pageXOffset" in e) return {
						x: e.pageXOffset || 0,
						y: e.pageYOffset || 0
					};
					var t = e.document;
					return {
						x: t.documentElement.scrollLeft || t.body.scrollLeft || 0,
						y: t.documentElement.scrollTop || t.body.scrollTop || 0
					}
				},
				r = n().height,
				a = - 1 * r + i;
				a += e.offsetHeight || 0;
				var s = C.getXY(e);
				a += s.y;
				var l = o(t).y;
				(a > l || l - r > a) && t.scrollTo(0, a + (0 > a ? - 20: 20))
			},
			isBr: function(e) {
				return 1 == e.nodeType && "BR" == e.tagName
			},
			isFillChar: function(e, t) {
				return 3 == e.nodeType && ! e.nodeValue.replace(new RegExp((t ? "^": "") + C.fillChar), "").length
			},
			isStartInblock: function(e) {
				var t, i = e.cloneRange(),
				n = 0,
				o = i.startContainer;
				if (1 == o.nodeType && o.childNodes[i.startOffset]) {
					o = o.childNodes[i.startOffset];
					for (var r = o.previousSibling; r && C.isFillChar(r);) o = r,
					r = r.previousSibling
				}
				for (this.isFillChar(o, ! 0) && 1 == i.startOffset && (i.setStartBefore(o), o = i.startContainer); o && C.isFillChar(o);) t = o,
				o = o.previousSibling;
				for (t && (i.setStartBefore(t), o = i.startContainer), 1 == o.nodeType && C.isEmptyNode(o) && 1 == i.startOffset && i.setStart(o, 0).collapse(!0); ! i.startOffset;) {
					if (o = i.startContainer, C.isBlockElm(o) || C.isBody(o)) {
						n = 1;
						break
					}
					var a, r = i.startContainer.previousSibling;
					if (r) {
						for (; r && C.isFillChar(r);) a = r,
						r = r.previousSibling;
						i.setStartBefore(a ? a: i.startContainer)
					} else i.setStartBefore(i.startContainer)
				}
				return n && ! C.isBody(i.startContainer) ? 1: 0
			},
			isEmptyBlock: function(e, t) {
				if (t = t || new RegExp("[ 	\r\n" + C.fillChar + "]", "g"), e[h.ie ? "innerText": "textContent"].replace(t, "").length > 0) return 0;
				for (var i in v.$isNotEmpty) if (e.getElementsByTagName(i).length) return 0;
				return 1
			},
			setViewportOffset: function(e, t) {
				var i = 0 | parseInt(e.style.left),
				n = 0 | parseInt(e.style.top),
				o = e.getBoundingClientRect(),
				r = t.left - o.left,
				a = t.top - o.top;
				r && (e.style.left = i + r + "px"),
				a && (e.style.top = n + a + "px")
			},
			fillNode: function(e, t) {
				var i = h.ie ? e.createTextNode(C.fillChar) : e.createElement("br");
				t.innerHTML = "",
				t.appendChild(i)
			},
			moveChild: function(e, t, i) {
				for (; e.firstChild;) i && t.firstChild ? t.insertBefore(e.lastChild, t.firstChild) : t.appendChild(e.firstChild)
			},
			hasNoAttributes: function(e) {
				return h.ie ? /^<\w+\s*?>/.test(e.outerHTML) : 0 == e.attributes.length
			},
			isCustomeNode: function(e) {
				return 1 == e.nodeType && e.getAttribute("_ue_custom_node_")
			},
			isTagNode: function(e, t) {
				return 1 == e.nodeType && new RegExp(e.tagName, "i").test(t)
			},
			filterNodeList: function(e, t, i) {
				var n = [];
				if (!p.isFunction(t)) {
					var o = t;
					t = function(e) {
						return - 1 != p.indexOf(p.isArray(o) ? o: o.split(" "), e.tagName.toLowerCase())
					}
				}
				return p.each(e, function(e) {
					t(e) && n.push(e)
				}),
				0 == n.length ? null: 1 != n.length && i ? n: n[0]
			},
			isInNodeEndBoundary: function(e, t) {
				var i = e.startContainer;
				if (3 == i.nodeType && e.startOffset != i.nodeValue.length) return 0;
				if (1 == i.nodeType && e.startOffset != i.childNodes.length) return 0;
				for (; i !== t;) {
					if (i.nextSibling) return 0;
					i = i.parentNode
				}
				return 1
			},
			isBoundaryNode: function(e, t) {
				for (var i; ! C.isBody(e);) if (i = e, e = e.parentNode, i !== e[t]) return ! 1;
				return ! 0
			}
		},
		N = new RegExp(C.fillChar, "g"); ! function() {
			function e(e) {
				e.collapsed = e.startContainer && e.endContainer && e.startContainer === e.endContainer && e.startOffset == e.endOffset
			}
			function t(e) {
				return ! e.collapsed && 1 == e.startContainer.nodeType && e.startContainer === e.endContainer && e.endOffset - e.startOffset == 1
			}
			function i(t, i, n, o) {
				return 1 == i.nodeType && (v.$empty[i.tagName] || v.$nonChild[i.tagName]) && (n = C.getNodeIndex(i) + (t ? 0: 1), i = i.parentNode),
				t ? (o.startContainer = i, o.startOffset = n, o.endContainer || o.collapse(!0)) : (o.endContainer = i, o.endOffset = n, o.startContainer || o.collapse(!1)),
				e(o),
				o
			}
			function n(e, t) {
				var i, n, o = e.startContainer,
				r = e.endContainer,
				a = e.startOffset,
				s = e.endOffset,
				l = e.document,
				d = l.createDocumentFragment();
				if (1 == o.nodeType && (o = o.childNodes[a] || (i = o.appendChild(l.createTextNode("")))), 1 == r.nodeType && (r = r.childNodes[s] || (n = r.appendChild(l.createTextNode("")))), o === r && 3 == o.nodeType) return d.appendChild(l.createTextNode(o.substringData(a, s - a))),
				t && (o.deleteData(a, s - a), e.collapse(!0)),
				d;
				for (var c, u, f = d, h = C.findParents(o, ! 0), m = C.findParents(r, ! 0), p = 0; h[p] == m[p];) p++;
				for (var g, v = p; g = h[v]; v++) {
					for (c = g.nextSibling, g == o ? i || (3 == e.startContainer.nodeType ? (f.appendChild(l.createTextNode(o.nodeValue.slice(a))), t && o.deleteData(a, o.nodeValue.length - a)) : f.appendChild(t ? o: o.cloneNode(!0))) : (u = g.cloneNode(!1), f.appendChild(u)); c && c !== r && c !== m[v];) g = c.nextSibling,
					f.appendChild(t ? c: c.cloneNode(!0)),
					c = g;
					f = u
				}
				f = d,
				h[p] || (f.appendChild(h[p - 1].cloneNode(!1)), f = f.firstChild);
				for (var y, v = p; y = m[v]; v++) {
					if (c = y.previousSibling, y == r ? n || 3 != e.endContainer.nodeType || (f.appendChild(l.createTextNode(r.substringData(0, s))), t && r.deleteData(0, s)) : (u = y.cloneNode(!1), f.appendChild(u)), v != p || ! h[p]) for (; c && c !== o;) y = c.previousSibling,
					f.insertBefore(t ? c: c.cloneNode(!0), f.firstChild),
					c = y;
					f = u
				}
				return t && e.setStartBefore(m[p] ? h[p] ? m[p] : h[p - 1] : m[p - 1]).collapse(!0),
				i && C.remove(i),
				n && C.remove(n),
				d
			}
			function o(e, t) {
				try {
					if (s && C.inDoc(s, e)) if (s.nodeValue.replace(N, "").length) s.nodeValue = s.nodeValue.replace(N, "");
					else {
						var i = s.parentNode;
						for (C.remove(s); i && C.isEmptyInlineElement(i) && (h.safari ? ! (C.getPosition(i, t) & C.POSITION_CONTAINS) : ! i.contains(t));) s = i.parentNode,
						C.remove(i),
						i = s
					}
				} catch(n) {}
			}
			function r(e, t) {
				var i;
				for (e = e[t]; e && C.isFillChar(e);) i = e[t],
				C.remove(e),
				e = i
			}
			var s, l = 0,
			d = C.fillChar,
			c = a.Range = function(e) {
				var t = this;
				t.startContainer = t.startOffset = t.endContainer = t.endOffset = null,
				t.document = e,
				t.collapsed = ! 0
			};
			c.prototype = {
				cloneContents: function() {
					return this.collapsed ? null: n(this, 0)
				},
				deleteContents: function() {
					var e;
					return this.collapsed || n(this, 1),
					h.webkit && (e = this.startContainer, 3 != e.nodeType || e.nodeValue.length || (this.setStartBefore(e).collapse(!0), C.remove(e))),
					this
				},
				extractContents: function() {
					return this.collapsed ? null: n(this, 2)
				},
				setStart: function(e, t) {
					return i(!0, e, t, this)
				},
				setEnd: function(e, t) {
					return i(!1, e, t, this)
				},
				setStartAfter: function(e) {
					return this.setStart(e.parentNode, C.getNodeIndex(e) + 1)
				},
				setStartBefore: function(e) {
					return this.setStart(e.parentNode, C.getNodeIndex(e))
				},
				setEndAfter: function(e) {
					return this.setEnd(e.parentNode, C.getNodeIndex(e) + 1)
				},
				setEndBefore: function(e) {
					return this.setEnd(e.parentNode, C.getNodeIndex(e))
				},
				setStartAtFirst: function(e) {
					return this.setStart(e, 0)
				},
				setStartAtLast: function(e) {
					return this.setStart(e, 3 == e.nodeType ? e.nodeValue.length: e.childNodes.length)
				},
				setEndAtFirst: function(e) {
					return this.setEnd(e, 0)
				},
				setEndAtLast: function(e) {
					return this.setEnd(e, 3 == e.nodeType ? e.nodeValue.length: e.childNodes.length)
				},
				selectNode: function(e) {
					return this.setStartBefore(e).setEndAfter(e)
				},
				selectNodeContents: function(e) {
					return this.setStart(e, 0).setEndAtLast(e)
				},
				cloneRange: function() {
					var e = this;
					return new c(e.document).setStart(e.startContainer, e.startOffset).setEnd(e.endContainer, e.endOffset)
				},
				collapse: function(e) {
					var t = this;
					return e ? (t.endContainer = t.startContainer, t.endOffset = t.startOffset) : (t.startContainer = t.endContainer, t.startOffset = t.endOffset),
					t.collapsed = ! 0,
					t
				},
				shrinkBoundary: function(e) {
					function t(e) {
						return 1 == e.nodeType && ! C.isBookmarkNode(e) && ! v.$empty[e.tagName] && ! v.$nonChild[e.tagName]
					}
					for (var i, n = this, o = n.collapsed; 1 == n.startContainer.nodeType && (i = n.startContainer.childNodes[n.startOffset]) && t(i);) n.setStart(i, 0);
					if (o) return n.collapse(!0);
					if (!e) for (; 1 == n.endContainer.nodeType && n.endOffset > 0 && (i = n.endContainer.childNodes[n.endOffset - 1]) && t(i);) n.setEnd(i, i.childNodes.length);
					return n
				},
				getCommonAncestor: function(e, i) {
					var n = this,
					o = n.startContainer,
					r = n.endContainer;
					return o === r ? e && t(this) && (o = o.childNodes[n.startOffset], 1 == o.nodeType) ? o: i && 3 == o.nodeType ? o.parentNode: o: C.getCommonAncestor(o, r)
				},
				trimBoundary: function(e) {
					this.txtToElmBoundary();
					var t = this.startContainer,
					i = this.startOffset,
					n = this.collapsed,
					o = this.endContainer;
					if (3 == t.nodeType) {
						if (0 == i) this.setStartBefore(t);
						else if (i >= t.nodeValue.length) this.setStartAfter(t);
						else {
							var r = C.split(t, i);
							t === o ? this.setEnd(r, this.endOffset - i) : t.parentNode === o && (this.endOffset += 1),
							this.setStartBefore(r)
						}
						if (n) return this.collapse(!0)
					}
					return e || (i = this.endOffset, o = this.endContainer, 3 == o.nodeType && (0 == i ? this.setEndBefore(o) : (i < o.nodeValue.length && C.split(o, i), this.setEndAfter(o)))),
					this
				},
				txtToElmBoundary: function() {
					function e(e, t) {
						var i = e[t + "Container"],
						n = e[t + "Offset"];
						3 == i.nodeType && (n ? n >= i.nodeValue.length && e["set" + t.replace(/(\w)/, function(e) {
							return e.toUpperCase()
						}) + "After"](i) : e["set" + t.replace(/(\w)/, function(e) {
							return e.toUpperCase()
						}) + "Before"](i))
					}
					return this.collapsed || (e(this, "start"), e(this, "end")),
					this
				},
				insertNode: function(e) {
					var t = e,
					i = 1;
					11 == e.nodeType && (t = e.firstChild, i = e.childNodes.length),
					this.trimBoundary(!0);
					var n = this.startContainer,
					o = this.startOffset,
					r = n.childNodes[o];
					return r ? n.insertBefore(e, r) : n.appendChild(e),
					t.parentNode === this.endContainer && (this.endOffset = this.endOffset + i),
					this.setStartBefore(t)
				},
				setCursor: function(e, t) {
					return this.collapse(!e).select(t)
				},
				createBookmark: function(e, t) {
					var i, n = this.document.createElement("span");
					return n.style.cssText = "display:none;line-height:0px;",
					n.appendChild(this.document.createTextNode("\u200d")),
					n.id = "_baidu_bookmark_start_" + (t ? "": l++),
					this.collapsed || (i = n.cloneNode(!0), i.id = "_baidu_bookmark_end_" + (t ? "": l++)),
					this.insertNode(n),
					i && this.collapse().insertNode(i).setEndBefore(i),
					this.setStartAfter(n),
					{
						start: e ? n.id: n,
						end: i ? e ? i.id: i: null,
						id: e
					}
				},
				moveToBookmark: function(e) {
					var t = e.id ? this.document.getElementById(e.start) : e.start,
					i = e.end && e.id ? this.document.getElementById(e.end) : e.end;
					return this.setStartBefore(t),
					C.remove(t),
					i ? (this.setEndBefore(i), C.remove(i)) : this.collapse(!0),
					this
				},
				enlarge: function(e, t) {
					var i, n, o = C.isBody,
					r = this.document.createTextNode("");
					if (e) {
						for (n = this.startContainer, 1 == n.nodeType ? n.childNodes[this.startOffset] ? i = n = n.childNodes[this.startOffset] : (n.appendChild(r), i = n = r) : i = n;;) {
							if (C.isBlockElm(n)) {
								for (n = i;
								(i = n.previousSibling) && ! C.isBlockElm(i);) n = i;
								this.setStartBefore(n);
								break
							}
							i = n,
							n = n.parentNode
						}
						for (n = this.endContainer, 1 == n.nodeType ? ((i = n.childNodes[this.endOffset]) ? n.insertBefore(r, i) : n.appendChild(r), i = n = r) : i = n;;) {
							if (C.isBlockElm(n)) {
								for (n = i;
								(i = n.nextSibling) && ! C.isBlockElm(i);) n = i;
								this.setEndAfter(n);
								break
							}
							i = n,
							n = n.parentNode
						}
						r.parentNode === this.endContainer && this.endOffset--,
						C.remove(r)
					}
					if (!this.collapsed) {
						for (; ! (0 != this.startOffset || t && t(this.startContainer) || o(this.startContainer));) this.setStartBefore(this.startContainer);
						for (; ! (this.endOffset != (1 == this.endContainer.nodeType ? this.endContainer.childNodes.length: this.endContainer.nodeValue.length) || t && t(this.endContainer) || o(this.endContainer));) this.setEndAfter(this.endContainer)
					}
					return this
				},
				adjustmentBoundary: function() {
					if (!this.collapsed) {
						for (; ! C.isBody(this.startContainer) && this.startOffset == this.startContainer[3 == this.startContainer.nodeType ? "nodeValue": "childNodes"].length && this.startContainer[3 == this.startContainer.nodeType ? "nodeValue": "childNodes"].length;) this.setStartAfter(this.startContainer);
						for (; ! C.isBody(this.endContainer) && ! this.endOffset && this.endContainer[3 == this.endContainer.nodeType ? "nodeValue": "childNodes"].length;) this.setEndBefore(this.endContainer)
					}
					return this
				},
				applyInlineStyle: function(e, t, i) {
					if (this.collapsed) return this;
					this.trimBoundary().enlarge(!1, function(e) {
						return 1 == e.nodeType && C.isBlockElm(e)
					}).adjustmentBoundary();
					for (var n, o, r = this.createBookmark(), a = r.end, s = function(e) {
						return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() : ! C.isWhitespace(e)
					},
					l = C.getNextDomNode(r.start, ! 1, s), d = this.cloneRange(); l && C.getPosition(l, a) & C.POSITION_PRECEDING;) if (3 == l.nodeType || v[e][l.tagName]) {
						for (d.setStartBefore(l), n = l; n && (3 == n.nodeType || v[e][n.tagName]) && n !== a;) o = n,
						n = C.getNextDomNode(n, 1 == n.nodeType, null, function(t) {
							return v[e][t.tagName]
						});
						var c, u = d.setEndAfter(o).extractContents();
						if (i && i.length > 0) {
							var f, h;
							h = f = i[0].cloneNode(!1);
							for (var m, p = 1; m = i[p++];) f.appendChild(m.cloneNode(!1)),
							f = f.firstChild;
							c = f
						} else c = d.document.createElement(e);
						t && C.setAttributes(c, t),
						c.appendChild(u),
						d.insertNode(i ? h: c);
						var g;
						if ("span" == e && t.style && /text\-decoration/.test(t.style) && (g = C.findParentByTagName(c, "a", ! 0)) ? (C.setAttributes(g, t), C.remove(c, ! 0), c = g) : (C.mergeSibling(c), C.clearEmptySibling(c)), C.mergeChild(c, t), l = C.getNextDomNode(c, ! 1, s), C.mergeToParent(c), n === a) break
					} else l = C.getNextDomNode(l, ! 0, s);
					return this.moveToBookmark(r)
				},
				removeInlineStyle: function(e) {
					if (this.collapsed) return this;
					e = p.isArray(e) ? e: [e],
					this.shrinkBoundary().adjustmentBoundary();
					for (var t = this.startContainer, i = this.endContainer;;) {
						if (1 == t.nodeType) {
							if (p.indexOf(e, t.tagName.toLowerCase()) > - 1) break;
							if ("body" == t.tagName.toLowerCase()) {
								t = null;
								break
							}
						}
						t = t.parentNode
					}
					for (;;) {
						if (1 == i.nodeType) {
							if (p.indexOf(e, i.tagName.toLowerCase()) > - 1) break;
							if ("body" == i.tagName.toLowerCase()) {
								i = null;
								break
							}
						}
						i = i.parentNode
					}
					var n, o, r = this.createBookmark();
					t && (o = this.cloneRange().setEndBefore(r.start).setStartBefore(t), n = o.extractContents(), o.insertNode(n), C.clearEmptySibling(t, ! 0), t.parentNode.insertBefore(r.start, t)),
					i && (o = this.cloneRange().setStartAfter(r.end).setEndAfter(i), n = o.extractContents(), o.insertNode(n), C.clearEmptySibling(i, ! 1, ! 0), i.parentNode.insertBefore(r.end, i.nextSibling));
					for (var a, s = C.getNextDomNode(r.start, ! 1, function(e) {
						return 1 == e.nodeType
					}); s && s !== r.end;) a = C.getNextDomNode(s, ! 0, function(e) {
						return 1 == e.nodeType
					}),
					p.indexOf(e, s.tagName.toLowerCase()) > - 1 && C.remove(s, ! 0),
					s = a;
					return this.moveToBookmark(r)
				},
				getClosedNode: function() {
					var e;
					if (!this.collapsed) {
						var i = this.cloneRange().adjustmentBoundary().shrinkBoundary();
						if (t(i)) {
							var n = i.startContainer.childNodes[i.startOffset];
							n && 1 == n.nodeType && (v.$empty[n.tagName] || v.$nonChild[n.tagName]) && (e = n)
						}
					}
					return e
				},
				select: h.ie ? function(e, t) {
					var i;
					this.collapsed || this.shrinkBoundary();
					var n = this.getClosedNode();
					if (n && ! t) {
						try {
							i = this.document.body.createControlRange(),
							i.addElement(n),
							i.select()
						} catch(a) {}
						return this
					}
					var l, c = this.createBookmark(),
					u = c.start;
					if (i = this.document.body.createTextRange(), i.moveToElementText(u), i.moveStart("character", 1), this.collapsed) {
						if (!e && 3 != this.startContainer.nodeType) {
							var f = this.document.createTextNode(d),
							h = this.document.createElement("span");
							h.appendChild(this.document.createTextNode(d)),
							u.parentNode.insertBefore(h, u),
							u.parentNode.insertBefore(f, u),
							o(this.document, f),
							s = f,
							r(h, "previousSibling"),
							r(u, "nextSibling"),
							i.moveStart("character", - 1),
							i.collapse(!0)
						}
					} else {
						var m = this.document.body.createTextRange();
						l = c.end,
						m.moveToElementText(l),
						i.setEndPoint("EndToEnd", m)
					}
					this.moveToBookmark(c),
					h && C.remove(h);
					try {
						i.select()
					} catch(a) {}
					return this
				}: function(e) {
					function t(e) {
						function t(t, i, n) {
							3 == t.nodeType && t.nodeValue.length < i && (e[n + "Offset"] = t.nodeValue.length)
						}
						t(e.startContainer, e.startOffset, "start"),
						t(e.endContainer, e.endOffset, "end")
					}
					var i, n = C.getWindow(this.document),
					a = n.getSelection();
					if (h.gecko ? this.document.body.focus() : n.focus(), a) {
						if (a.removeAllRanges(), this.collapsed && ! e) {
							var l = this.startContainer,
							c = l;
							1 == l.nodeType && (c = l.childNodes[this.startOffset]),
							3 == l.nodeType && this.startOffset || (c ? c.previousSibling && 3 == c.previousSibling.nodeType: l.lastChild && 3 == l.lastChild.nodeType) || (i = this.document.createTextNode(d), this.insertNode(i), o(this.document, i), r(i, "previousSibling"), r(i, "nextSibling"), s = i, this.setStart(i, h.webkit ? 1: 0).collapse(!0))
						}
						var u = this.document.createRange();
						if (this.collapsed && h.opera && 1 == this.startContainer.nodeType) {
							var c = this.startContainer.childNodes[this.startOffset];
							if (c) {
								for (; c && C.isBlockElm(c) && 1 == c.nodeType && c.childNodes[0];) c = c.childNodes[0];
								c && this.setStartBefore(c).collapse(!0)
							} else c = this.startContainer.lastChild,
							c && C.isBr(c) && this.setStartBefore(c).collapse(!0)
						}
						t(this),
						u.setStart(this.startContainer, this.startOffset),
						u.setEnd(this.endContainer, this.endOffset),
						a.addRange(u)
					}
					return this
				},
				scrollToView: function(e, t) {
					e = e ? window: C.getWindow(this.document);
					var i = this,
					n = i.document.createElement("span");
					return n.innerHTML = "&nbsp;",
					i.cloneRange().insertNode(n),
					C.scrollToView(n, e, t),
					C.remove(n),
					i
				},
				inFillChar: function() {
					var e = this.startContainer;
					return this.collapsed && 3 == e.nodeType && e.nodeValue.replace(new RegExp("^" + C.fillChar), "").length + 1 == e.nodeValue.length ? ! 0: ! 1
				},
				createAddress: function(e, t) {
					function i(e) {
						for (var i, n = e ? o.startContainer: o.endContainer, r = C.findParents(n, ! 0, function(e) {
							return ! C.isBody(e)
						}), a = [], s = 0; i = r[s++];) a.push(C.getNodeIndex(i, t));
						var l = 0;
						if (t) if (3 == n.nodeType) {
							for (var d = n.previousSibling; d && 3 == d.nodeType;) l += d.nodeValue.replace(N, "").length,
							d = d.previousSibling;
							l += e ? o.startOffset: o.endOffset
						} else if (n = n.childNodes[e ? o.startOffset: o.endOffset]) l = C.getNodeIndex(n, t);
						else {
							n = e ? o.startContainer: o.endContainer;
							for (var c = n.firstChild; c;) if (C.isFillChar(c)) c = c.nextSibling;
							else if (l++, 3 == c.nodeType) for (; c && 3 == c.nodeType;) c = c.nextSibling;
							else c = c.nextSibling
						} else l = e ? C.isFillChar(n) ? 0: o.startOffset: o.endOffset;
						return 0 > l && (l = 0),
						a.push(l),
						a
					}
					var n = {},
					o = this;
					return n.startAddress = i(!0),
					e || (n.endAddress = o.collapsed ? [].concat(n.startAddress) : i()),
					n
				},
				moveToAddress: function(e, t) {
					function i(e, t) {
						for (var i, o, r, a = n.document.body, s = 0, l = e.length; l > s; s++) if (r = e[s], i = a, a = a.childNodes[r], ! a) {
							o = r;
							break
						}
						t ? a ? n.setStartBefore(a) : n.setStart(i, o) : a ? n.setEndBefore(a) : n.setEnd(i, o)
					}
					var n = this;
					return i(e.startAddress, ! 0),
					! t && e.endAddress && i(e.endAddress),
					n
				},
				equals: function(e) {
					for (var t in this) if (this.hasOwnProperty(t) && this[t] !== e[t]) return ! 1;
					return ! 0
				},
				traversal: function(e, t) {
					if (this.collapsed) return this;
					for (var i = this.createBookmark(), n = i.end, o = C.getNextDomNode(i.start, ! 1, t); o && o !== n && C.getPosition(o, n) & C.POSITION_PRECEDING;) {
						var r = C.getNextDomNode(o, ! 1, t);
						e(o),
						o = r
					}
					return this.moveToBookmark(i)
				}
			}
		} (),
		function() {
			function e(e, t) {
				var i = C.getNodeIndex;
				e = e.duplicate(),
				e.collapse(t);
				var n = e.parentElement();
				if (!n.hasChildNodes()) return {
					container: n,
					offset: 0
				};
				for (var o, r, a = n.children, s = e.duplicate(), l = 0, d = a.length - 1, c = - 1; d >= l;) {
					c = Math.floor((l + d) / 2),
					o = a[c],
					s.moveToElementText(o);
					var u = s.compareEndPoints("StartToStart", e);
					if (u > 0) d = c - 1;
					else {
						if (! (0 > u)) return {
							container: n,
							offset: i(o)
						};
						l = c + 1
					}
				}
				if ( - 1 == c) {
					if (s.moveToElementText(n), s.setEndPoint("StartToStart", e), r = s.text.replace(/(\r\n|\r)/g, "\n").length, a = n.childNodes, ! r) return o = a[a.length - 1],
					{
						container: o,
						offset: o.nodeValue.length
					};
					for (var f = a.length; r > 0;) r -= a[--f].nodeValue.length;
					return {
						container: a[f],
						offset: - r
					}
				}
				if (s.collapse(u > 0), s.setEndPoint(u > 0 ? "StartToStart": "EndToStart", e), r = s.text.replace(/(\r\n|\r)/g, "\n").length, ! r) return v.$empty[o.tagName] || v.$nonChild[o.tagName] ? {
					container: n,
					offset: i(o) + (u > 0 ? 0: 1)
				}: {
					container: o,
					offset: u > 0 ? 0: o.childNodes.length
				};
				for (; r > 0;) try {
					var h = o;
					o = o[u > 0 ? "previousSibling": "nextSibling"],
					r -= o.nodeValue.length
				} catch(m) {
					return {
						container: n,
						offset: i(h)
					}
				}
				return {
					container: o,
					offset: u > 0 ? - r: o.nodeValue.length + r
				}
			}
			function t(t, i) {
				if (t.item) i.selectNode(t.item(0));
				else {
					var n = e(t, ! 0);
					i.setStart(n.container, n.offset),
					0 != t.compareEndPoints("StartToEnd", t) && (n = e(t, ! 1), i.setEnd(n.container, n.offset))
				}
				return i
			}
			function i(e) {
				var t;
				try {
					t = e.getNative().createRange()
				} catch(i) {
					return null
				}
				var n = t.item ? t.item(0) : t.parentElement();
				return (n.ownerDocument || n) === e.document ? t: null
			}
			var n = a.Selection = function(e) {
				var t, n = this;
				n.document = e,
				m && (t = C.getWindow(e).frameElement, C.on(t, "beforedeactivate", function() {
					n._bakIERange = n.getIERange()
				}), C.on(t, "activate", function() {
					try { ! i(n) && n._bakIERange && n._bakIERange.select()
					} catch(e) {}
					n._bakIERange = null
				})),
				t = e = null
			};
			n.prototype = {
				getNative: function() {
					var e = this.document;
					try {
						return e ? m ? e.selection: C.getWindow(e).getSelection() : null
					} catch(t) {
						return null
					}
				},
				getIERange: function() {
					var e = i(this);
					return ! e && this._bakIERange ? this._bakIERange: e
				},
				cache: function() {
					this.clear(),
					this._cachedRange = this.getRange(),
					this._cachedStartElement = this.getStart(),
					this._cachedStartElementPath = this.getStartElementPath()
				},
				getStartElementPath: function() {
					if (this._cachedStartElementPath) return this._cachedStartElementPath;
					var e = this.getStart();
					return e ? C.findParents(e, ! 0, null, ! 0) : []
				},
				clear: function() {
					this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null
				},
				isFocus: function() {
					try {
						return h.ie && i(this) || ! h.ie && this.getNative().rangeCount ? ! 0: ! 1
					} catch(e) {
						return ! 1
					}
				},
				getRange: function() {
					function e(e) {
						for (var t = i.document.body.firstChild, n = e.collapsed; t && t.firstChild;) e.setStart(t, 0),
						t = t.firstChild;
						e.startContainer || e.setStart(i.document.body, 0),
						n && e.collapse(!0)
					}
					var i = this;
					if (null != i._cachedRange) return this._cachedRange;
					var n = new r.editor.dom.Range(i.document);
					if (m) {
						var o = i.getIERange();
						if (o) try {
							t(o, n)
						} catch(a) {
							e(n)
						} else e(n)
					} else {
						var s = i.getNative();
						if (s && s.rangeCount) {
							var l = s.getRangeAt(0),
							d = s.getRangeAt(s.rangeCount - 1);
							n.setStart(l.startContainer, l.startOffset).setEnd(d.endContainer, d.endOffset),
							n.collapsed && C.isBody(n.startContainer) && ! n.startOffset && e(n)
						} else {
							if (this._bakRange && C.inDoc(this._bakRange.startContainer, this.document)) return this._bakRange;
							e(n)
						}
					}
					return this._bakRange = n
				},
				getStart: function() {
					if (this._cachedStartElement) return this._cachedStartElement;
					var e, t, i, n, o = m ? this.getIERange() : this.getRange();
					if (m) {
						if (!o) return this.document.body.firstChild;
						if (o.item) return o.item(0);
						for (e = o.duplicate(), e.text.length > 0 && e.moveStart("character", 1), e.collapse(1), t = e.parentElement(), n = i = o.parentElement(); i = i.parentNode;) if (i == t) {
							t = n;
							break
						}
					} else if (o.shrinkBoundary(), t = o.startContainer, 1 == t.nodeType && t.hasChildNodes() && (t = t.childNodes[Math.min(t.childNodes.length - 1, o.startOffset)]), 3 == t.nodeType) return t.parentNode;
					return t
				},
				getText: function() {
					var e, t;
					return this.isFocus() && (e = this.getNative()) ? (t = h.ie ? e.createRange() : e.getRangeAt(0), h.ie ? t.text: t.toString()) : ""
				},
				clearRange: function() {
					this.getNative()[h.ie ? "empty": "removeAllRanges"]()
				}
			}
		} (),
		function() {
			function e(e, t) {
				var i;
				if (t.textarea) if (p.isString(t.textarea)) {
					for (var n, o = 0, r = C.getElementsByTagName(e, "textarea"); n = r[o++];) if (n.id == "ueditor_textarea_" + t.options.textarea) {
						i = n;
						break
					}
				} else i = t.textarea;
				i || (e.appendChild(i = C.createElement(document, "textarea", {
					name: t.options.textarea,
					id: "ueditor_textarea_" + t.options.textarea,
					style: "display:none"
				})), t.textarea = i),
				i.value = t.hasContents() ? t.options.allHtmlEnabled ? t.getAllHtml() : t.getContent(null, null, ! 0) : ""
			}
			var t, i = 0,
			n = UE.Editor = function(e) {
				function t() {
					for (var e in UE.plugins) UE.plugins[e].call(n);
					n.langIsReady = ! 0,
					n.fireEvent("langReady")
				}
				var n = this;
				n.uid = i++,
				g.call(n),
				n.commands = {},
				n.options = p.extend(p.clone(e || {}), UEDITOR_CONFIG, ! 0),
				n.shortcutkeys = {},
				n.inputRules = [],
				n.outputRules = [],
				n.setOpt({
					isShow: ! 0,
					initialContent: "",
					initialStyle: "",
					autoClearinitialContent: ! 1,
					iframeCssUrl: n.options.UEDITOR_HOME_URL + "themes/iframe.css",
					textarea: "editorValue",
					focus: ! 1,
					focusInEnd: ! 0,
					autoClearEmptyNode: ! 0,
					fullscreen: ! 1,
					readonly: ! 1,
					zIndex: 999,
					imagePopup: ! 0,
					enterTag: "p",
					customDomain: ! 1,
					lang: "zh-cn",
					langPath: n.options.UEDITOR_HOME_URL + "lang/",
					theme: "default",
					themePath: n.options.UEDITOR_HOME_URL + "themes/",
					allHtmlEnabled: ! 1,
					scaleEnabled: ! 1,
					tableNativeEditInFF: ! 1,
					autoSyncData: ! 0
				}),
				UE.instants["ueditorInstant" + n.uid] = n,
				null !== n.options.langPath ? p.loadFile(document, {
					src: n.options.langPath + n.options.lang + "/" + n.options.lang + ".js",
					tag: "script",
					type: "text/javascript",
					defer: "defer"
				},
				t) : t()
			};
			n.prototype = {
				ready: function(e) {
					var t = this;
					e && (t.isReady ? e.apply(t) : t.addListener("ready", e))
				},
				setOpt: function(e, t) {
					var i = {};
					p.isString(e) ? i[e] = t: i = e,
					p.extend(this.options, i, ! 0)
				},
				destroy: function() {
					var e = this;
					e.fireEvent("destroy");
					var t = e.container.parentNode,
					i = e.textarea;
					i ? i.style.display = "": (i = document.createElement("textarea"), t.parentNode.insertBefore(i, t)),
					i.style.width = e.iframe.offsetWidth + "px",
					i.style.height = e.iframe.offsetHeight + "px",
					i.value = e.getContent(),
					i.id = e.key,
					t.innerHTML = "",
					C.remove(t);
					var n = e.key;
					for (var o in e) e.hasOwnProperty(o) && delete this[o];
					UE.delEditor(n)
				},
				render: function(e) {
					var t = this,
					i = t.options;
					if (p.isString(e) && (e = document.getElementById(e)), e) {
						var n = m && h.version < 9,
						o = (m && h.version < 9 ? "": "<!DOCTYPE html>") + "<html xmlns='http://www.w3.org/1999/xhtml'" + (n ? "": " class='view'") + "><head>" + (i.iframeCssUrl ? "<link rel='stylesheet' type='text/css' href='" + p.unhtml(i.iframeCssUrl) + "'/>": "") + "<style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:100%;}\nbody{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}" + (i.initialStyle || "") + "</style></head><body" + (n ? " class='view'": "") + "></body>";
						if (i.customDomain && document.domain != location.hostname) o += "<script>window.parent.UE.instants['ueditorInstant" + t.uid + "']._setup(document);</script></html>",
						e.appendChild(C.createElement(document, "iframe", {
							id: "ueditor_" + t.uid,
							width: "100%",
							height: "100%",
							frameborder: "0",
							src: 'javascript:void(function(){document.open();document.domain="' + document.domain + '";document.write("' + o + '");document.close();}())'
						}));
						else {
							i.minFrameWidth = i.initialFrameWidth ? i.initialFrameWidth: i.initialFrameWidth = e.offsetWidth,
							i.initialFrameHeight ? i.minFrameHeight = i.initialFrameHeight: i.initialFrameHeight = i.minFrameHeight = e.offsetHeight,
							e.style.width = i.initialFrameWidth + "px",
							e.style.height = i.initialFrameHeight + "px",
							e.style.zIndex = i.zIndex,
							e.innerHTML = '<iframe id="ueditor_' + this.uid + '"width="100%" height="100%" scroll="no" frameborder="0" ></iframe>';
							var r = e.firstChild.contentWindow.document;
							r.open(),
							r.write(o + "</html>"),
							r.close(),
							t._setup(r)
						}
						e.style.overflow = "hidden"
					}
				},
				_setup: function(t) {
					var i = this,
					n = i.options;
					m ? (t.body.disabled = ! 0, t.body.contentEditable = ! 0, t.body.disabled = ! 1) : (t.body.contentEditable = ! 0, t.body.spellcheck = ! 1),
					i.document = t,
					i.window = t.defaultView || t.parentWindow,
					i.iframe = i.window.frameElement,
					i.body = t.body,
					i.selection = new a.Selection(t);
					var o;
					h.gecko && (o = this.selection.getNative()) && o.removeAllRanges(),
					this._initEvents();
					for (var r = this.iframe.parentNode; ! C.isBody(r); r = r.parentNode) if ("FORM" == r.tagName) {
						i.form = r,
						i.options.autoSyncData ? C.on(i.window, "blur", function() {
							e(r, i)
						}) : C.on(r, "submit", function() {
							e(this, i)
						});
						break
					}
					if (n.initialContent) if (n.autoClearinitialContent) {
						var s = i.execCommand;
						i.execCommand = function() {
							return i.fireEvent("firstBeforeExecCommand"),
							s.apply(i, arguments)
						},
						this._setDefaultContent(n.initialContent)
					} else this.setContent(n.initialContent, ! 1, ! 0);
					C.isEmptyNode(i.body) && (i.body.innerHTML = "<p>" + (h.ie ? "": "<br/>") + "</p>"),
					n.focus && setTimeout(function() {
						i.focus(i.options.focusInEnd),
						! i.options.autoClearinitialContent && i._selectionChange()
					},
					0),
					i.container || (i.container = this.iframe.parentNode),
					n.fullscreen && i.ui && i.ui.setFullScreen(!0);
					try {
						i.document.execCommand("2D-position", ! 1, ! 1)
					} catch(l) {}
					try {
						i.document.execCommand("enableInlineTableEditing", ! 1, ! 1)
					} catch(l) {}
					try {
						i.document.execCommand("enableObjectResizing", ! 1, ! 1)
					} catch(l) {}
					i._bindshortcutKeys(),
					i.isReady = 1,
					i.fireEvent("ready"),
					n.onready && n.onready.call(i),
					h.ie || C.on(i.window, ["blur", "focus"], function(e) {
						if ("blur" == e.type) {
							i._bakRange = i.selection.getRange();
							try {
								i.selection.getNative().removeAllRanges()
							} catch(e) {}
						} else try {
							i._bakRange && i._bakRange.select()
						} catch(e) {}
					}),
					h.gecko && h.version <= 10902 && (i.body.contentEditable = ! 1, setTimeout(function() {
						i.body.contentEditable = ! 0
					},
					100), setInterval(function() {
						i.body.style.height = i.iframe.offsetHeight - 20 + "px"
					},
					100)),
					! n.isShow && i.setHide(),
					n.readonly && i.setDisabled()
				},
				sync: function(t) {
					var i = this,
					n = t ? document.getElementById(t) : C.findParent(i.iframe.parentNode, function(e) {
						return "FORM" == e.tagName
					},
					! 0);
					n && e(n, i)
				},
				setHeight: function(e) {
					e !== parseInt(this.iframe.parentNode.style.height) && (this.iframe.parentNode.style.height = e + "px"),
					this.document.body.style.height = e - 20 + "px"
				},
				addshortcutkey: function(e, t) {
					var i = {};
					t ? i[e] = t: i = e,
					p.extend(this.shortcutkeys, i)
				},
				_bindshortcutKeys: function() {
					var e = this,
					t = this.shortcutkeys;
					e.addListener("keydown", function(i, n) {
						var o = n.keyCode || n.which;
						for (var r in t) for (var a, s = t[r].split(","), l = 0; a = s[l++];) {
							a = a.split(":");
							var d = a[0],
							c = a[1];
							(/^(ctrl)(\+shift)?\+(\d+)$/.test(d.toLowerCase()) || /^(\d+)$/.test(d)) && (("ctrl" == RegExp.$1 ? n.ctrlKey || n.metaKey: 0) && ("" != RegExp.$2 ? n[RegExp.$2.slice(1) + "Key"] : 1) && o == RegExp.$3 || o == RegExp.$1) && ( - 1 != e.queryCommandState(r, c) && e.execCommand(r, c), C.preventDefault(n))
						}
					})
				},
				getContent: function(e, t, i, n, o) {
					var r = this;
					if (e && p.isFunction(e) && (t = e, e = ""), t ? ! t() : ! this.hasContents()) return "";
					r.fireEvent("beforegetcontent");
					var a = UE.htmlparser(r.body.innerHTML, n);
					return r.filterOutputRule(a),
					r.fireEvent("aftergetcontent", e),
					a.toHtml(o)
				},
				getAllHtml: function() {
					var e = this,
					t = [];
					if (e.fireEvent("getAllHtml", t), h.ie && h.version > 8) {
						var i = "";
						p.each(e.document.styleSheets, function(e) {
							i += e.href ? '<link rel="stylesheet" type="text/css" href="' + e.href + '" />': "<style>" + e.cssText + "</style>"
						}),
						p.each(e.document.getElementsByTagName("script"), function(e) {
							i += e.outerHTML
						})
					}
					return "<html><head>" + (e.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + e.options.charset + '"/>': "") + (i || e.document.getElementsByTagName("head")[0].innerHTML) + t.join("\n") + "</head><body " + (m && h.version < 9 ? 'class="view"': "") + ">" + e.getContent(null, null, ! 0) + "</body></html>"
				},
				getPlainTxt: function() {
					var e = new RegExp(C.fillChar, "g"),
					t = this.body.innerHTML.replace(/[\n\r]/g, "");
					return t = t.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<[^>/] + > /g,"").replace(/ (\n) ? < \ / ([ ^ > ] + ) > /g,function(e,t,i){return v.$block[i]?"\n":t?t:""}),t.replace(e,"").replace(/\u00a0 / g,
					" ").replace(/&nbsp;/g, " ")
				},
				getContentTxt: function() {
					var e = new RegExp(C.fillChar, "g");
					return this.body[h.ie ? "innerText": "textContent"].replace(e, "").replace(/\u00a0/g, " ")
				},
				setContent: function(t, i, n) {
					function o(e) {
						return "DIV" == e.tagName && e.getAttribute("cdata_tag")
					}
					var r = this;
					/<\s*\/\s*pre\s*>$/.test(p.trim(t)) && (t += "<p>&nbsp;</p>"),
					r.fireEvent("beforesetcontent", t);
					var a = UE.htmlparser(t);
					if (r.filterInputRule(a), t = a.toHtml(), r.body.innerHTML = (i ? r.body.innerHTML: "") + t, "p" == r.options.enterTag) {
						var s, l = this.body.firstChild;
						if (!l || 1 == l.nodeType && (v.$cdata[l.tagName] || o(l) || C.isCustomeNode(l)) && l === this.body.lastChild) this.body.innerHTML = "<p>" + (h.ie ? "&nbsp;": "<br/>") + "</p>" + this.body.innerHTML;
						else for (var d = r.document.createElement("p"); l;) {
							for (; l && (3 == l.nodeType || 1 == l.nodeType && v.p[l.tagName] && ! v.$cdata[l.tagName]);) s = l.nextSibling,
							d.appendChild(l),
							l = s;
							if (d.firstChild) {
								if (!l) {
									r.body.appendChild(d);
									break
								}
								l.parentNode.insertBefore(d, l),
								d = r.document.createElement("p")
							}
							l = l.nextSibling
						}
					}
					r.fireEvent("aftersetcontent"),
					r.fireEvent("contentchange"),
					! n && r._selectionChange(),
					r._bakRange = r._bakIERange = null;
					var c;
					h.gecko && (c = this.selection.getNative()) && c.removeAllRanges(),
					r.options.autoSyncData && r.form && e(r.form, r)
				},
				focus: function(e) {
					try {
						var t = this,
						i = t.selection.getRange();
						e ? i.setStartAtLast(t.body.lastChild).setCursor(!1, ! 0) : i.select(!0),
						this.fireEvent("focus")
					} catch(n) {}
				},
				_initEvents: function() {
					try {
						var e = this,
						t = e.document,
						i = e.window;
						e._proxyDomEvent = p.bind(e._proxyDomEvent, e),
						C.on(t, ["click", "contextmenu", "mousedown", "keydown", "keyup", "keypress", "mouseup", "mouseover", "mouseout", "selectstart"], e._proxyDomEvent),
						C.on(i, ["focus", "blur"], e._proxyDomEvent),
						C.on(t, ["mouseup", "keydown"], function(t) {
							"keydown" == t.type && (t.ctrlKey || t.metaKey || t.shiftKey || t.altKey) || 2 != t.button && e._selectionChange(250, t)
						});
						var n, o = 0,
						r = h.ie ? e.body: e.document;
						C.on(r, "dragstart", function() {
							o = 1
						}),
						C.on(r, h.webkit ? "dragover": "drop", function() {
							return h.webkit ? function() {
								clearTimeout(n),
								n = setTimeout(function() {
									if (!o) {
										var t = e.selection,
										i = t.getRange();
										if (i) {
											var n = i.getCommonAncestor();
											if (n && e.serialize) {
												var r = e.serialize,
												a = r.filter(r.transformInput(r.parseHTML(r.word(n.innerHTML))));
												n.innerHTML = r.toHTML(a)
											}
										}
									}
									o = 0
								},
								200)
							}: function(e) {
								o || (e.preventDefault ? e.preventDefault() : e.returnValue = ! 1),
								o = 0
							}
						} ())
					} catch(a) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: a.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 4654
						})
					}
				},
				_proxyDomEvent: function(e) {
					return this.fireEvent(e.type.replace(/^on/, ""), e)
				},
				_selectionChange: function(e, i) {
					var n, o, r = this,
					a = ! 1;
					if (h.ie && h.version < 9 && i && "mouseup" == i.type) {
						var s = this.selection.getRange();
						s.collapsed || (a = ! 0, n = i.clientX, o = i.clientY)
					}
					clearTimeout(t),
					t = setTimeout(function() {
						if (r.selection.getNative()) {
							var e;
							if (a && "None" == r.selection.getNative().type) {
								e = r.document.body.createTextRange();
								try {
									e.moveToPoint(n, o)
								} catch(t) {
									e = null
								}
							}
							var s;
							e && (s = r.selection.getIERange, r.selection.getIERange = function() {
								return e
							}),
							r.selection.cache(),
							s && (r.selection.getIERange = s),
							r.selection._cachedRange && r.selection._cachedStartElement && (r.fireEvent("beforeselectionchange"), r.fireEvent("selectionchange", !! i), r.fireEvent("afterselectionchange"), r.selection.clear())
						}
					},
					e || 50)
				},
				_callCmdFn: function(e, t) {
					var i, n, o = t[0].toLowerCase();
					return i = this.commands[o] || UE.commands[o],
					n = i && i[e],
					i && n || "queryCommandState" != e ? n ? n.apply(this, t) : void 0: 0
				},
				execCommand: function(e) {
					e = e.toLowerCase();
					var t, i = this,
					n = i.commands[e] || UE.commands[e];
					return n && n.execCommand ? (n.notNeedUndo || i.__hasEnterExecCommand ? (t = this._callCmdFn("execCommand", arguments), ! i._ignoreContentChange && i.fireEvent("contentchange")) : (i.__hasEnterExecCommand = ! 0, - 1 != i.queryCommandState.apply(i, arguments) && (i.fireEvent("beforeexeccommand", e), t = this._callCmdFn("execCommand", arguments), ! i._ignoreContentChange && i.fireEvent("contentchange"), i.fireEvent("afterexeccommand", e)), i.__hasEnterExecCommand = ! 1), ! i._ignoreContentChange && i._selectionChange(), t) : null
				},
				queryCommandState: function() {
					return this._callCmdFn("queryCommandState", arguments)
				},
				queryCommandValue: function() {
					return this._callCmdFn("queryCommandValue", arguments)
				},
				hasContents: function(e) {
					if (e) for (var t, i = 0; t = e[i++];) if (this.document.getElementsByTagName(t).length > 0) return ! 0;
					if (!C.isEmptyBlock(this.body)) return ! 0;
					for (e = ["div"], i = 0; t = e[i++];) for (var n, o = C.getElementsByTagName(this.document, t), r = 0; n = o[r++];) if (C.isCustomeNode(n)) return ! 0;
					return ! 1
				},
				reset: function() {
					this.fireEvent("reset")
				},
				setEnabled: function() {
					var e, t = this;
					if ("false" == t.body.contentEditable) {
						t.body.contentEditable = ! 0,
						e = t.selection.getRange();
						try {
							e.moveToBookmark(t.lastBk),
							delete t.lastBk
						} catch(i) {
							e.setStartAtFirst(t.body).collapse(!0)
						}
						e.select(!0),
						t.bkqueryCommandState && (t.queryCommandState = t.bkqueryCommandState, delete t.bkqueryCommandState),
						t.fireEvent("selectionchange")
					}
				},
				enable: function() {
					return this.setEnabled()
				},
				setDisabled: function(e) {
					var t = this;
					e = e ? p.isArray(e) ? e: [e] : [],
					"true" == t.body.contentEditable && (t.lastBk || (t.lastBk = t.selection.getRange().createBookmark(!0)), t.body.contentEditable = ! 1, t.bkqueryCommandState = t.queryCommandState, t.queryCommandState = function(i) {
						return - 1 != p.indexOf(e, i) ? t.bkqueryCommandState.apply(t, arguments) : - 1
					},
					t.fireEvent("selectionchange"))
				},
				disable: function(e) {
					return this.setDisabled(e)
				},
				_setDefaultContent: function() {
					function e() {
						var t = this;
						t.document.getElementById("initContent") && (t.body.innerHTML = "<p>" + (m ? "": "<br/>") + "</p>", t.removeListener("firstBeforeExecCommand focus", e), setTimeout(function() {
							t.focus(),
							t._selectionChange()
						},
						0))
					}
					return function(t) {
						var i = this;
						i.body.innerHTML = '<p id="initContent">' + t + "</p>",
						i.addListener("firstBeforeExecCommand focus", e)
					}
				} (),
				setShow: function() {
					var e = this,
					t = e.selection.getRange();
					if ("none" == e.container.style.display) {
						try {
							t.moveToBookmark(e.lastBk),
							delete e.lastBk
						} catch(i) {
							t.setStartAtFirst(e.body).collapse(!0)
						}
						setTimeout(function() {
							t.select(!0)
						},
						100),
						e.container.style.display = ""
					}
				},
				show: function() {
					return this.setShow()
				},
				setHide: function() {
					var e = this;
					e.lastBk || (e.lastBk = e.selection.getRange().createBookmark(!0)),
					e.container.style.display = "none"
				},
				hide: function() {
					return this.setHide()
				},
				getLang: function(e) {
					var t = UE.I18N[this.options.lang];
					if (!t) throw Error("not import language file");
					e = (e || "").split(".");
					for (var i, n = 0;
					(i = e[n++]) && (t = t[i], t););
					return t
				},
				getContentLength: function(e, t) {
					var i = this.getContent(!1, ! 1, ! 0).length;
					if (e) {
						t = (t || []).concat(["hr", "img", "iframe"]),
						i = this.getContentTxt().replace(/[\t\r\n]+/g, "").length;
						for (var n, o = 0; n = t[o++];) i += this.document.getElementsByTagName(n).length
					}
					return i
				},
				addInputRule: function(e) {
					this.inputRules.push(e)
				},
				filterInputRule: function(e) {
					for (var t, i = 0; t = this.inputRules[i++];) t.call(this, e)
				},
				addOutputRule: function(e) {
					this.outputRules.push(e)
				},
				filterOutputRule: function(e) {
					for (var t, i = 0; t = this.outputRules[i++];) t.call(this, e)
				}
			},
			p.inherits(n, g)
		} ();
		UE.filterWord = function() {
			function e(e) {
				return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<v:)/gi.test(e)
			}
			function t(e) {
				return e = e.replace(/[\d.]+\w+/g, function(e) {
					return p.transUnitToPx(e)
				})
			}
			function i(e) {
				return e.replace(/[\t\r\n]+/g, "").replace(/<!--[\s\S]*?-->/gi, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, function(e) {
					if (h.opera) return "";
					try {
						var i = e.match(/width:([ \d.]*p[tx])/i)[1],
						n = e.match(/height:([ \d.]*p[tx])/i)[1],
						o = e.match(/src=\s*"([^"]*)"/i)[1];
						return '<img width="' + t(i) + '" height="' + t(n) + '" src="' + o + '" />'
					} catch(r) {
						return ""
					}
				}).replace(/<\/?div[^>]*>/g, "").replace(/v:\w+=(["']?)[^'"]+\1/g, "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/gi, function(e, t, i, n) {
					return "class" == t && "MsoListParagraph" == n ? e: ""
				}).replace(/<(font|span)[^>]*>\s*<\/\1>/gi, "").replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function(e, i, n, o) {
					for (var r, a = [], s = o.replace(/^\s+|\s+$/, "").replace(/&#39;/g, "'").replace(/&quot;/gi, "'").split(/;\s*/g), l = 0; r = s[l]; l++) {
						var d, c, u = r.split(":");
						if (2 == u.length) {
							if (d = u[0].toLowerCase(), c = u[1].toLowerCase(), /^(background)\w*/.test(d) && 0 == c.replace(/(initial|\s)/g, "").length || /^(margin)\w*/.test(d) && /^0\w+$/.test(c)) continue;
							switch (d) {
							case "mso-padding-alt":
							case "mso-padding-top-alt":
							case "mso-padding-right-alt":
							case "mso-padding-bottom-alt":
							case "mso-padding-left-alt":
							case "mso-margin-alt":
							case "mso-margin-top-alt":
							case "mso-margin-right-alt":
							case "mso-margin-bottom-alt":
							case "mso-margin-left-alt":
							case "mso-height":
							case "mso-width":
							case "mso-vertical-align-alt":
								/<table/.test(i) || (a[l] = d.replace(/^mso-|-alt$/g, "") + ":" + t(c));
								continue;
							case "horiz-align":
								a[l] = "text-align:" + c;
								continue;
							case "vert-align":
								a[l] = "vertical-align:" + c;
								continue;
							case "font-color":
							case "mso-foreground":
								a[l] = "color:" + c;
								continue;
							case "mso-background":
							case "mso-highlight":
								a[l] = "background:" + c;
								continue;
							case "mso-default-height":
								a[l] = "min-height:" + t(c);
								continue;
							case "mso-default-width":
								a[l] = "min-width:" + t(c);
								continue;
							case "mso-padding-between-alt":
								a[l] = "border-collapse:separate;border-spacing:" + t(c);
								continue;
							case "text-line-through":
								("single" == c || "double" == c) && (a[l] = "text-decoration:line-through");
								continue;
							case "mso-zero-height":
								"yes" == c && (a[l] = "display:none");
								continue;
							case "background":
								break;
							case "margin":
								if (!/[1-9]/.test(c)) continue
							}
							if (/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(d) || /text\-indent|padding|margin/.test(d) && /\-[\d.]+/.test(c)) continue;
							a[l] = d + ":" + u[1]
						}
					}
					return i + (a.length ? ' style="' + a.join(";").replace(/;{2,}/g, ";") + '"': "")
				}).replace(/[\d.]+(cm|pt)/g, function(e) {
					return p.transUnitToPx(e)
				})
			}
			return function(t) {
				return e(t) ? i(t) : t
			}
		} (); ! function() {
			function e(e, t, i) {
				return e.push(u),
				t + (i ? 1: - 1)
			}
			function t(e, t) {
				for (var i = 0; t > i; i++) e.push(c)
			}
			function i(a, s, l, d) {
				switch (a.type) {
				case "root":
					for (var c, u = 0; c = a.children[u++];) l && "element" == c.type && ! v.$inlineWithA[c.tagName] && u > 1 && (e(s, d, ! 0), t(s, d)),
					i(c, s, l, d);
					break;
				case "text":
					n(a, s);
					break;
				case "element":
					o(a, s, l, d);
					break;
				case "comment":
					r(a, s, l)
				}
				return s
			}
			function n(e, t) {
				t.push("pre" == e.parentNode.tagName ? e.data: e.data.replace(/[ ]{2}/g, " &nbsp;"))
			}
			function o(n, o, r, a) {
				var s = "";
				if (n.attrs) {
					s = [];
					var l = n.attrs;
					for (var d in l) s.push(d + (void 0 !== l[d] ? '="' + p.unhtml(l[d]) + '"': ""));
					s = s.join(" ")
				}
				if (o.push("<" + n.tagName + (s ? " " + s: "") + (v.$empty[n.tagName] ? "/": "") + ">"), r && ! v.$inlineWithA[n.tagName] && "pre" != n.tagName && n.children && n.children.length && (a = e(o, a, ! 0), t(o, a)), n.children && n.children.length) for (var c, u = 0; c = n.children[u++];) r && "element" == c.type && ! v.$inlineWithA[c.tagName] && u > 1 && (e(o, a), t(o, a)),
				i(c, o, r, a);
				v.$empty[n.tagName] || (r && ! v.$inlineWithA[n.tagName] && "pre" != n.tagName && n.children && n.children.length && (a = e(o, a), t(o, a)), o.push("</" + n.tagName + ">"))
			}
			function r(e, t) {
				t.push("<!--" + e.data + "-->")
			}
			function a(e, t) {
				var i;
				if ("element" == e.type && e.getAttr("id") == t) return e;
				if (e.children && e.children.length) for (var n, o = 0; n = e.children[o++];) if (i = a(n, t)) return i
			}
			function s(e, t, i) {
				if ("element" == e.type && e.tagName == t && i.push(e), e.children && e.children.length) for (var n, o = 0; n = e.children[o++];) s(n, t, i)
			}
			function l(e, t) {
				if (e.children && e.children.length) for (var i, n = 0; i = e.children[n];) l(i, t),
				i.parentNode && (i.children && i.children.length && t(i), i.parentNode && n++);
				else t(e)
			}
			var d = UE.uNode = function(e) {
				this.type = e.type,
				this.data = e.data,
				this.tagName = e.tagName,
				this.parentNode = e.parentNode,
				this.attrs = e.attrs || {},
				this.children = e.children
			},
			c = "    ",
			u = "\n";
			d.createElement = function(e) {
				return /[<>]/.test(e) ? UE.htmlparser(e).children[0] : new d({
					type: "element",
					children: [],
					tagName: e
				})
			},
			d.createText = function(e) {
				return new UE.uNode({
					type: "text",
					data: p.unhtml(e || "")
				})
			},
			d.prototype = {
				toHtml: function(e) {
					var t = [];
					return i(this, t, e, 0),
					t.join("")
				},
				innerHTML: function(e) {
					if ("element" != this.type || v.$empty[this.tagName]) return this;
					if (p.isString(e)) {
						if (this.children) for (var t, i = 0; t = this.children[i++];) t.parentNode = null;
						this.children = [];
						for (var t, n = UE.htmlparser(e), i = 0; t = n.children[i++];) this.children.push(t),
						t.parentNode = this;
						return this
					}
					var n = new UE.uNode({
						type: "root",
						children: this.children
					});
					return n.toHtml()
				},
				innerText: function(e) {
					if ("element" != this.type || v.$empty[this.tagName]) return this;
					if (e) {
						if (this.children) for (var t, i = 0; t = this.children[i++];) t.parentNode = null;
						return this.children = [],
						this.appendChild(d.createText(e)),
						this
					}
					return this.toHtml().replace(/<[^>]+>/g, "")
				},
				getData: function() {
					return "element" == this.type ? "": this.data
				},
				firstChild: function() {
					return this.children ? this.children[0] : null
				},
				lastChild: function() {
					return this.children ? this.children[this.children.length - 1] : null
				},
				previousSibling: function() {
					for (var e, t = this.parentNode, i = 0; e = t.children[i]; i++) if (e === this) return 0 == i ? null: t.children[i - 1]
				},
				nextSibling: function() {
					for (var e, t = this.parentNode, i = 0; e = t.children[i++];) if (e === this) return t.children[i]
				},
				replaceChild: function(e, t) {
					if (this.children) {
						e.parentNode && e.parentNode.removeChild(e);
						for (var i, n = 0; i = this.children[n]; n++) if (i === t) return this.children.splice(n, 1, e),
						t.parentNode = null,
						e.parentNode = this,
						e
					}
				},
				appendChild: function(e) {
					if ("root" == this.type || "element" == this.type && ! v.$empty[this.tagName]) {
						this.children || (this.children = []),
						e.parentNode && e.parentNode.removeChild(e);
						for (var t, i = 0; t = this.children[i]; i++) if (t === e) {
							this.children.splice(i, 1);
							break
						}
						return this.children.push(e),
						e.parentNode = this,
						e
					}
				},
				insertBefore: function(e, t) {
					if (this.children) {
						e.parentNode && e.parentNode.removeChild(e);
						for (var i, n = 0; i = this.children[n]; n++) if (i === t) return this.children.splice(n, 0, e),
						e.parentNode = this,
						e
					}
				},
				insertAfter: function(e, t) {
					if (this.children) {
						e.parentNode && e.parentNode.removeChild(e);
						for (var i, n = 0; i = this.children[n]; n++) if (i === t) return this.children.splice(n + 1, 0, e),
						e.parentNode = this,
						e
					}
				},
				removeChild: function(e, t) {
					if (this.children) for (var i, n = 0; i = this.children[n]; n++) if (i === e) {
						if (this.children.splice(n, 1), i.parentNode = null, t && i.children && i.children.length) for (var o, r = 0; o = i.children[r]; r++) this.children.splice(n + r, 0, o),
						o.parentNode = this;
						return i
					}
				},
				getAttr: function(e) {
					return this.attrs && this.attrs[e.toLowerCase()]
				},
				setAttr: function(e, t) {
					if (!e) return void delete this.attrs;
					if (this.attrs || (this.attrs = {}), p.isObject(e)) for (var i in e) e[i] ? this.attrs[i.toLowerCase()] = e[i] : delete this.attrs[i];
					else t ? this.attrs[e.toLowerCase()] = t: delete this.attrs[e]
				},
				getIndex: function() {
					for (var e, t = this.parentNode, i = 0; e = t.children[i]; i++) if (e === this) return i;
					return - 1
				},
				getNodeById: function(e) {
					var t;
					if (this.children && this.children.length) for (var i, n = 0; i = this.children[n++];) if (t = a(i, e)) return t
				},
				getNodesByTagName: function(e) {
					e = p.trim(e).replace(/[ ]{2,}/g, " ").split(" ");
					var t = [],
					i = this;
					return p.each(e, function(e) {
						if (i.children && i.children.length) for (var n, o = 0; n = i.children[o++];) s(n, e, t)
					}),
					t
				},
				getStyle: function(e) {
					var t = this.getAttr("style");
					if (!t) return "";
					var i = new RegExp(e + ":([^;]+)", "i"),
					n = t.match(i);
					return n && n[0] ? n[1] : ""
				},
				setStyle: function(e, t) {
					function i(e, t) {
						var i = new RegExp(e + ":([^;]+;?)", "gi");
						n = n.replace(i, ""),
						t && (n = e + ":" + p.unhtml(t) + ";" + n)
					}
					var n = this.getAttr("style");
					if (n || (n = ""), p.isObject(e)) for (var o in e) i(o, e[o]);
					else i(e, t);
					this.setAttr("style", n)
				},
				traversal: function(e) {
					return this.children && this.children.length && l(this, e),
					this
				}
			}
		} ();
		UE.htmlparser = function(e, t) {
			function i(e, t) {
				if (u[e.tagName]) {
					var i = d.createElement(u[e.tagName]);
					e.appendChild(i),
					i.appendChild(d.createText(t)),
					e = i
				} else e.appendChild(d.createText(t))
			}
			function n(e, t, i) {
				var o;
				if (o = c[t]) {
					for (var r, s = e;
					"root" != s.type;) {
						if (p.isArray(o) ? - 1 != p.indexOf(o, s.tagName) : o == s.tagName) {
							e = s,
							r = ! 0;
							break
						}
						s = s.parentNode
					}
					r || (e = n(e, p.isArray(o) ? o[0] : o))
				}
				var l = new d({
					parentNode: e,
					type: "element",
					tagName: t.toLowerCase(),
					children: v.$empty[t] ? null: []
				});
				if (i) {
					for (var u, f = {}; u = a.exec(i);) f[u[1].toLowerCase()] = p.unhtml(u[2] || u[3] || u[4]);
					l.attrs = f
				}
				return e.children.push(l),
				v.$empty[t] ? e: l
			}
			function o(e, t) {
				e.children.push(new d({
					type: "comment",
					data: t,
					parentNode: e
				}))
			}
			var r = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
			a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
			s = {
				b: 1,
				code: 1,
				i: 1,
				u: 1,
				strike: 1,
				s: 1,
				tt: 1,
				strong: 1,
				q: 1,
				samp: 1,
				em: 1,
				span: 1,
				sub: 1,
				img: 1,
				sup: 1,
				font: 1,
				big: 1,
				small: 1,
				iframe: 1,
				a: 1,
				br: 1,
				pre: 1
			};
			e = e.replace(new RegExp(C.fillChar, "g"), ""),
			t || (e = e.replace(new RegExp("[\\r\\t\\n" + (t ? "": " ") + "]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n" + (t ? "": " ") + "]*", "g"), function(e, i) {
				return i && s[i.toLowerCase()] ? e.replace(/(^[\n\r]+)|([\n\r]+$)/g, "") : e.replace(new RegExp("^[\\r\\n" + (t ? "": " ") + "]+"), "").replace(new RegExp("[\\r\\n" + (t ? "": " ") + "]+$"), "")
			}));
			for (var l, d = UE.uNode, c = {
				td: "tr",
				tr: ["tbody", "thead", "tfoot"],
				tbody: "table",
				th: "tr",
				thead: "table",
				tfoot: "table",
				caption: "table",
				li: ["ul", "ol"],
				dt: "dl",
				dd: "dl",
				option: "select"
			},
			u = {
				ol: "li",
				ul: "li"
			},
			f = 0, h = 0, m = new d({
				type: "root",
				children: []
			}), g = m; l = r.exec(e);) {
				f = l.index;
				try {
					if (f > h && i(g, e.slice(h, f)), l[3]) g = n(g, l[3].toLowerCase(), l[4]);
					else if (l[1]) {
						if ("root" != g.type) {
							for (var y = g;
							"element" == g.type && g.tagName != l[1].toLowerCase();) if (g = g.parentNode, "root" == g.type) throw g = y,
							"break";
							g = g.parentNode
						}
					} else l[2] && o(g, l[2])
				} catch(b) {}
				h = r.lastIndex
			}
			return h < e.length && i(g, e.slice(h)),
			m
		},
		UE.filterNode = function() {
			function e(t, i) {
				switch (t.type) {
				case "text":
					break;
				case "element":
					var n;
					if (n = i[t.tagName]) if ("-" === n) t.parentNode.removeChild(t);
					else if (p.isFunction(n)) {
						var o = t.parentNode,
						r = t.getIndex();
						if (n(t), t.parentNode) {
							if (t.children) for (var a, s = 0; a = t.children[s];) e(a, i),
							a.parentNode && s++
						} else for (var a, s = r; a = o.children[s];) e(a, i),
						a.parentNode && s++
					} else {
						var l = n.$;
						if (l && t.attrs) {
							var d, c = {};
							for (var u in l) {
								if (d = t.getAttr(u), "style" == u && p.isArray(l[u])) {
									var f = [];
									p.each(l[u], function(e) {
										var i;
										(i = t.getStyle(e)) && f.push(e + ":" + i)
									}),
									d = f.join(";")
								}
								d && (c[u] = d)
							}
							t.attrs = c
						}
						if (t.children) for (var a, s = 0; a = t.children[s];) e(a, i),
						a.parentNode && s++
					} else if (v.$cdata[t.tagName]) t.parentNode.removeChild(t);
					else {
						var o = t.parentNode,
						r = t.getIndex();
						t.parentNode.removeChild(t, ! 0);
						for (var a, s = r; a = o.children[s];) e(a, i),
						a.parentNode && s++
					}
					break;
				case "comment":
					t.parentNode.removeChild(t)
				}
			}
			return function(t, i) {
				if (p.isEmptyObject(i)) return t;
				var n;
				(n = i["-"]) && p.each(n.split(" "), function(e) {
					i[e] = "-"
				});
				for (var o, r = 0; o = t.children[r];) e(o, i),
				o.parentNode && r++;
				return t
			}
		} ();
		UE.plugins.basestyle = function() {
			var e = {
				bold: ["strong", "b"],
				italic: ["em", "i"],
				subscript: ["sub"],
				superscript: ["sup"]
			},
			t = function(e, t) {
				return C.filterNodeList(e.selection.getStartElementPath(), t)
			},
			i = this;
			i.addshortcutkey({
				Bold: "ctrl+66",
				Italic: "ctrl+73",
				Underline: "ctrl+85"
			}),
			i.addInputRule(function(e) {
				p.each(e.getNodesByTagName("b i"), function(e) {
					switch (e.tagName) {
					case "b":
						e.tagName = "strong";
						break;
					case "i":
						e.tagName = "em"
					}
				})
			});
			for (var n in e) ! function(e, n) {
				i.commands[e] = {
					execCommand: function(e) {
						var o = i.selection.getRange(),
						r = t(this, n);
						if (o.collapsed) {
							if (r) {
								var a = i.document.createTextNode("");
								o.insertNode(a).removeInlineStyle(n),
								o.setStartBefore(a),
								C.remove(a)
							} else {
								var s = o.document.createElement(n[0]);
								("superscript" == e || "subscript" == e) && (a = i.document.createTextNode(""), o.insertNode(a).removeInlineStyle(["sub", "sup"]).setStartBefore(a).collapse(!0)),
								o.insertNode(s).setStart(s, 0)
							}
							o.collapse(!0)
						} else("superscript" == e || "subscript" == e) && (r && r.tagName.toLowerCase() == e || o.removeInlineStyle(["sub", "sup"])),
						r ? o.removeInlineStyle(n) : o.applyInlineStyle(n[0]);
						o.select()
					},
					queryCommandState: function() {
						return t(this, n) ? 1: 0
					}
				}
			} (n, e[n])
		},
		UE.plugins.defaultfilter = function() {
			var e = this;
			e.addInputRule(function(t) {
				var i;
				t.traversal(function(t) {
					if ("element" == t.type) {
						if (!v.$cdata[t.tagName] && e.options.autoClearEmptyNode && v.$inline[t.tagName] && ! v.$empty[t.tagName] && (!t.attrs || p.isEmptyObject(t.attrs))) return void(t.firstChild() ? "span" != t.tagName || t.attrs && ! p.isEmptyObject(t.attrs) || t.parentNode.removeChild(t, ! 0) : t.parentNode.removeChild(t));
						switch (t.tagName) {
						case "style":
						case "script":
							t.setAttr({
								cdata_tag:
								t.tagName,
								cdata_data: encodeURIComponent(t.innerText() || "")
							}),
							t.tagName = "div",
							t.removeChild(t.firstChild());
							break;
						case "a":
							(i = t.getAttr("href")) && t.setAttr("_href", i);
							break;
						case "img":
							if ((i = t.getAttr("src")) && /^data:/.test(i)) {
								t.parentNode.removeChild(t);
								break
							}
							t.setAttr("_src", t.getAttr("src"));
							break;
						case "span":
							h.webkit && (i = t.getStyle("white-space")) && /nowrap|normal/.test(i) && (t.setStyle("white-space", ""), e.options.autoClearEmptyNode && p.isEmptyObject(t.attrs) && t.parentNode.removeChild(t, ! 0));
							break;
						case "p":
							(i = t.getAttr("align")) && (t.setAttr("align"), t.setStyle("text-align", i));
							var n = t.getAttr("style");
							n && (n = n.replace(/(margin|padding)[^;]+/g, ""), t.setAttr("style", n)),
							t.firstChild() || t.innerHTML(UE.browser.ie ? "&nbsp;": "<br>");
							break;
						case "div":
							if (t.getAttr("cdata_tag")) break;
							if (i = t.getAttr("class"), i && /^line number\d+/.test(i)) break;
							for (var o, r = UE.uNode.createElement("p"); o = t.firstChild();)"text" != o.type && UE.dom.dtd.$block[o.tagName] ? r.firstChild() ? (t.parentNode.insertBefore(r, t), r = UE.uNode.createElement("p")) : t.parentNode.insertBefore(o, t) : r.appendChild(o);
							r.firstChild() && t.parentNode.insertBefore(r, t),
							t.parentNode.removeChild(t);
							break;
						case "dl":
							t.tagName = "ul";
							break;
						case "dt":
						case "dd":
							t.tagName = "li";
							break;
						case "li":
							var a = t.getAttr("class");
							a && /list\-/.test(a) || t.setAttr();
							var s = t.getNodesByTagName("ol ul");
							UE.utils.each(s, function(e) {
								t.parentNode.insertAfter(e, t)
							});
							break;
						case "td":
						case "th":
						case "caption":
							t.children && t.children.length || t.appendChild(h.ie ? UE.uNode.createText(" ") : UE.uNode.createElement("br"))
						}
					}
					"comment" == t.type && t.parentNode.removeChild(t)
				})
			}),
			e.addOutputRule(function(t) {
				var i;
				t.traversal(function(t) {
					if ("element" == t.type) {
						if (e.options.autoClearEmptyNode && v.$inline[t.tagName] && ! v.$empty[t.tagName] && (!t.attrs || p.isEmptyObject(t.attrs))) return void(t.firstChild() ? "span" != t.tagName || t.attrs && ! p.isEmptyObject(t.attrs) || t.parentNode.removeChild(t, ! 0) : t.parentNode.removeChild(t));
						switch (t.tagName) {
						case "div":
							(i = t.getAttr("cdata_tag")) && (t.tagName = i, t.appendChild(UE.uNode.createText(t.getAttr("cdata_data"))), t.setAttr({
								cdata_tag: "",
								cdata_data: ""
							}));
							break;
						case "a":
							(i = t.getAttr("_href")) && t.setAttr({
								href: i,
								_href: ""
							});
							break;
						case "img":
							(i = t.getAttr("_src")) && t.setAttr({
								src: t.getAttr("_src"),
								_src: ""
							})
						}
					}
				})
			})
		},
		UE.commands.inserthtml = {
			execCommand: function(e, t, i) {
				var n, o, r = this;
				if (t && r.fireEvent("beforeinserthtml", t) !== ! 0) {
					if (n = r.selection.getRange(), o = n.document.createElement("div"), o.style.display = "inline", ! i) {
						var a = UE.htmlparser(t);
						r.options.filterRules && UE.filterNode(a, r.options.filterRules),
						r.filterInputRule(a),
						t = a.toHtml()
					}
					if (o.innerHTML = p.trim(t), ! n.collapsed) {
						var s = n.startContainer;
						if (C.isFillChar(s) && n.setStartBefore(s), s = n.endContainer, C.isFillChar(s) && n.setEndAfter(s), n.txtToElmBoundary(), n.endContainer && 1 == n.endContainer.nodeType && (s = n.endContainer.childNodes[n.endOffset], s && C.isBr(s) && n.setEndAfter(s)), 0 == n.startOffset && (s = n.startContainer, C.isBoundaryNode(s, "firstChild") && (s = n.endContainer, n.endOffset == (3 == s.nodeType ? s.nodeValue.length: s.childNodes.length) && C.isBoundaryNode(s, "lastChild") && (r.body.innerHTML = "<p>" + (h.ie ? "": "<br/>") + "</p>", n.setStart(r.body.firstChild, 0).collapse(!0)))), ! n.collapsed && n.deleteContents(), 1 == n.startContainer.nodeType) {
							var l, d = n.startContainer.childNodes[n.startOffset];
							if (d && C.isBlockElm(d) && (l = d.previousSibling) && C.isBlockElm(l)) {
								for (n.setEnd(l, l.childNodes.length).collapse(); d.firstChild;) l.appendChild(d.firstChild);
								C.remove(d)
							}
						}
					}
					var d, c, l, u, f, m = 0;
					n.inFillChar() && (d = n.startContainer, C.isFillChar(d) ? (n.setStartBefore(d).collapse(!0), C.remove(d)) : C.isFillChar(d, ! 0) && (d.nodeValue = d.nodeValue.replace(N, ""), n.startOffset--, n.collapsed && n.collapse(!0)));
					var g = C.findParentByTagName(n.startContainer, "li", ! 0);
					if (g) {
						for (var y, b; d = o.firstChild;) {
							for (; d && (3 == d.nodeType || ! C.isBlockElm(d) || "HR" == d.tagName);) y = d.nextSibling,
							n.insertNode(d).collapse(),
							b = d,
							d = y;
							if (d) if (/^(ol|ul)$/i.test(d.tagName)) {
								for (; d.firstChild;) b = d.firstChild,
								C.insertAfter(g, d.firstChild),
								g = g.nextSibling;
								C.remove(d)
							} else {
								var E;
								y = d.nextSibling,
								E = r.document.createElement("li"),
								C.insertAfter(g, E),
								E.appendChild(d),
								b = d,
								d = y,
								g = E
							}
						}
						g = C.findParentByTagName(n.startContainer, "li", ! 0),
						C.isEmptyBlock(g) && C.remove(g),
						b && n.setStartAfter(b).collapse(!0).select(!0)
					} else {
						for (; d = o.firstChild;) {
							if (m) {
								for (var w = r.document.createElement("p"); d && (3 == d.nodeType || ! v.$block[d.tagName]);) f = d.nextSibling,
								w.appendChild(d),
								d = f;
								w.firstChild && (d = w)
							}
							if (n.insertNode(d), f = d.nextSibling, ! m && d.nodeType == C.NODE_ELEMENT && C.isBlockElm(d) && (c = C.findParent(d, function(e) {
								return C.isBlockElm(e)
							}), c && "body" != c.tagName.toLowerCase() && (!v[c.tagName][d.nodeName] || d.parentNode !== c))) {
								if (v[c.tagName][d.nodeName]) for (u = d.parentNode; u !== c;) l = u,
								u = u.parentNode;
								else l = c;
								C.breakParent(d, l || u);
								var l = d.previousSibling;
								C.trimWhiteTextNode(l),
								l.childNodes.length || C.remove(l),
								! h.ie && (y = d.nextSibling) && C.isBlockElm(y) && y.lastChild && ! C.isBr(y.lastChild) && y.appendChild(r.document.createElement("br")),
								m = 1
							}
							var y = d.nextSibling;
							if (!o.firstChild && y && C.isBlockElm(y)) {
								n.setStart(y, 0).collapse(!0);
								break
							}
							n.setEndAfter(d).collapse()
						}
						if (d = n.startContainer, f && C.isBr(f) && C.remove(f), C.isBlockElm(d) && C.isEmptyNode(d)) if (f = d.nextSibling) C.remove(d),
						1 == f.nodeType && v.$block[f.tagName] && n.setStart(f, 0).collapse(!0).shrinkBoundary();
						else try {
							d.innerHTML = h.ie ? C.fillChar: "<br/>"
						} catch(x) {
							n.setStartBefore(d),
							C.remove(d)
						}
						try {
							n.select(!0)
						} catch(x) {}
					}
					setTimeout(function() {
						n = r.selection.getRange(),
						n.scrollToView(r.autoHeightEnabled, r.autoHeightEnabled ? C.getXY(r.iframe).y: 0),
						r.fireEvent("afterinserthtml")
					},
					200)
				}
			}
		},
		UE.plugins.autotypeset = function() {
			function e(e, t) {
				return e && e.parentNode && l[e.tagName.toLowerCase()] ? o && o.contains(e) || e.getAttribute("pagebreak") ? 0: t ? ! C.isEmptyBlock(e) : C.isEmptyBlock(e) : void 0
			}
			function t(t, n) {
				var l, d = r.selection.getRange(),
				c = d.createBookmark(!0);
				if (n) {
					if (!a.pasteFilter) return;
					l = r.document.createElement("div"),
					l.innerHTML = n.html
				} else {
					var u;
					if (d.collapsed) l = r.document.body,
					u = C.getElementsByTagName(l, "*");
					else {
						d.txtToElmBoundary();
						for (var f = d.startContainer, h = d.endContainer, m = C.getNodeIndex("body" == f.tagName.toLowerCase() ? f.firstChild: f), p = C.getNodeIndex("body" == h.tagName.toLowerCase() ? h.lastChild: h), g = r.document.body.children, v = [], y = m; p >= y; y++) v.push(g[y]);
						u = v
					}
				}
				for (var b, N = 0; b = u[N++];) {
					if (!o && "DIV" == b.tagName && b.getAttribute("highlighter") && (o = b), e(b)) {
						if (a.mergeEmptyline) for (var E, w = b.nextSibling; e(w);) E = w,
						w = E.nextSibling,
						C.remove(E);
						if (a.removeEmptyline && C.inDoc(b, l) && ! s[b.parentNode.tagName.toLowerCase()]) {
							C.remove(b);
							continue
						}
					}
					e(b, ! 0) && (a.indent && i(b), a.textAlign && (b.style.textAlign = a.textAlign))
				}
				n && (n.html = l.innerHTML),
				d.moveToBookmark(c).select()
			}
			function i(e) {
				if (!C.findParent(e, function(e) {
					return 1 == e.nodeType && "li" == e.tagName.toLowerCase()
				})) {
					for (var t = e.firstChild, i = t; t && 1 == t.nodeType && ! v.$empty[t.tagName];) C.isBookmarkNode(t) && (t = t.nextSibling),
					i = t,
					t = t.firstChild;
					if (!i || 1 != i.nodeType || ! /img|iframe|br/gi.test(i.tagName)) {
						var o = (i.innerText || i.textContent || i.nodeValue).replace(/(^\u3000*)|(\u3000*$)/g, "").replace(/(^\s*)|(\s*$)/g, "");
						n(i, o),
						i.parentNode.insertBefore(e.ownerDocument.createTextNode("\u3000\u3000"), i)
					}
				}
			}
			function n(e, t) {
				"string" == typeof e.textContent ? e.textContent = t: "string" == typeof e.nodeValue ? e.nodeValue = t: e.innerText = t
			}
			this.setOpt({
				autotypeset: {
					mergeEmptyline: ! 0,
					indent: ! 1,
					indentValue: "2em"
				}
			});
			var o, r = this,
			a = r.options.autotypeset,
			s = {
				li: 1
			},
			l = {
				div: 1,
				p: 1,
				blockquote: 1,
				center: 1,
				h1: 1,
				h2: 1,
				h3: 1,
				h4: 1,
				h5: 1,
				h6: 1
			};
			a && (r.commands.autotypeset = {
				execCommand: function() {
					t()
				}
			})
		},
		UE.commands.imagefloat = {
			execCommand: function(e, t) {
				var i = this,
				n = i.selection.getRange();
				if (!n.collapsed) {
					var o = n.getClosedNode();
					if (o && "IMG" == o.tagName) switch (t) {
					case "left":
					case "right":
					case "none":
						for (var r, a, s, l = o.parentNode; v.$inline[l.tagName] || "A" == l.tagName;) l = l.parentNode;
						if (r = l, "P" == r.tagName && "center" == C.getStyle(r, "text-align")) {
							if (!C.isBody(r) && 1 == C.getChildCount(r, function(e) {
								return ! C.isBr(e) && ! C.isWhitespace(e)
							})) if (a = r.previousSibling, s = r.nextSibling, a && s && 1 == a.nodeType && 1 == s.nodeType && a.tagName == s.tagName && C.isBlockElm(a)) {
								for (a.appendChild(r.firstChild); s.firstChild;) a.appendChild(s.firstChild);
								C.remove(r),
								C.remove(s)
							} else C.setStyle(r, "text-align", "");
							n.selectNode(o).select()
						}
						C.setStyle(o, "float", "none" == t ? "": t),
						"none" == t && C.removeAttributes(o, "align");
						break;
					case "center":
						if ("center" != i.queryCommandValue("imagefloat")) {
							for (l = o.parentNode, C.setStyle(o, "float", ""), C.removeAttributes(o, "align"), r = o; l && 1 == C.getChildCount(l, function(e) {
								return ! C.isBr(e) && ! C.isWhitespace(e)
							}) && (v.$inline[l.tagName] || "A" == l.tagName);) r = l,
							l = l.parentNode;
							n.setStartBefore(r).setCursor(!1),
							l = i.document.createElement("div"),
							l.appendChild(r),
							C.setStyle(r, "float", ""),
							i.execCommand("insertHtml", '<p id="_img_parent_tmp" style="text-align:center">' + l.innerHTML + "</p>"),
							r = i.document.getElementById("_img_parent_tmp"),
							r.removeAttribute("id"),
							r = r.firstChild,
							n.selectNode(r).select(),
							s = r.parentNode.nextSibling,
							s && C.isEmptyNode(s) && C.remove(s)
						}
					}
				}
			},
			queryCommandValue: function() {
				var e, t, i = this.selection.getRange();
				return i.collapsed ? "none": (e = i.getClosedNode(), e && 1 == e.nodeType && "IMG" == e.tagName ? (t = e.getAttribute("align") || C.getComputedStyle(e, "float"), "none" == t && (t = "center" == C.getComputedStyle(e.parentNode, "text-align") ? "center": t), {
					left: 1,
					right: 1,
					center: 1
				} [t] ? t: "none") : "none")
			},
			queryCommandState: function() {
				var e, t = this.selection.getRange();
				return t.collapsed ? - 1: (e = t.getClosedNode(), e && 1 == e.nodeType && "IMG" == e.tagName ? 0: - 1)
			}
		},
		UE.commands.insertimage = {
			execCommand: function(e, t) {
				if (t = p.isArray(t) ? t: [t], t.length) {
					var i = this,
					n = i.selection.getRange(),
					o = n.getClosedNode();
					if (o && /img/i.test(o.tagName) && "edui-faked-video" != o.className && ! o.getAttribute("word_img")) {
						var r = t.shift(),
						a = r.floatStyle;
						delete r.floatStyle,
						C.setAttributes(o, r),
						i.execCommand("imagefloat", a),
						t.length > 0 && (n.setStartAfter(o).setCursor(!1, ! 0), i.execCommand("insertimage", t))
					} else {
						var s, l = [],
						d = "";
						if (s = t[0], 1 == t.length) d = '<img src="' + s.src + '" ' + (s._src ? ' _src="' + s._src + '" ': "") + (s.width ? 'width="' + s.width + '" ': "") + (s.height ? ' height="' + s.height + '" ': "") + ("left" == s.floatStyle || "right" == s.floatStyle ? ' style="float:' + s.floatStyle + ';"': "") + (s.title && "" != s.title ? ' title="' + s.title + '"': "") + (s.border && "0" != s.border ? ' border="' + s.border + '"': "") + (s.alt && "" != s.alt ? ' alt="' + s.alt + '"': "") + (s.hspace && "0" != s.hspace ? ' hspace = "' + s.hspace + '"': "") + (s.vspace && "0" != s.vspace ? ' vspace = "' + s.vspace + '"': "") + "/>",
						"center" == s.floatStyle && (d = '<p style="text-align: center">' + d + "</p>"),
						l.push(d);
						else for (var c = 0; s = t[c++];) d = "<p " + ("center" == s.floatStyle ? 'style="text-align: center" ': "") + '><img src="' + s.src + '" ' + (s.width ? 'width="' + s.width + '" ': "") + (s._src ? ' _src="' + s._src + '" ': "") + (s.height ? ' height="' + s.height + '" ': "") + ' style="' + (s.floatStyle && "center" != s.floatStyle ? "float:" + s.floatStyle + ";": "") + (s.border || "") + '" ' + (s.title ? ' title="' + s.title + '"': "") + " /></p>",
						l.push(d);
						i.execCommand("insertHtml", l.join(""))
					}
				}
			}
		},
		UE.plugins.selectall = function() {
			var e = this;
			e.commands.selectall = {
				execCommand: function() {
					var e = this,
					t = e.body,
					i = e.selection.getRange();
					i.selectNodeContents(t),
					C.isEmptyBlock(t) && (h.opera && t.firstChild && 1 == t.firstChild.nodeType && i.setStartAtFirst(t.firstChild), i.collapse(!0)),
					i.select(!0)
				},
				notNeedUndo: 1
			},
			e.addshortcutkey({
				selectAll: "ctrl+65"
			})
		},
		UE.plugins.wordcount = function() {
			var e = this;
			e.addListener("contentchange", function() {
				e.fireEvent("wordcount")
			});
			var t;
			e.addListener("ready", function() {
				var e = this;
				C.on(e.body, "keyup", function(i) {
					var n = i.keyCode || i.which,
					o = {
						16: 1,
						18: 1,
						20: 1,
						37: 1,
						38: 1,
						39: 1,
						40: 1
					};
					n in o || (clearTimeout(t), t = setTimeout(function() {
						e.fireEvent("wordcount")
					},
					200))
				})
			})
		},
		UE.plugins.undo = function() {
			function e(e, t) {
				if (e.length != t.length) return 0;
				for (var i = 0, n = e.length; n > i; i++) if (e[i] != t[i]) return 0;
				return 1
			}
			function t(t, i) {
				return t.collapsed != i.collapsed ? 0: e(t.startAddress, i.startAddress) && e(t.endAddress, i.endAddress) ? 1: 0
			}
			function i() {
				this.list = [],
				this.index = 0,
				this.hasUndo = ! 1,
				this.hasRedo = ! 1,
				this.undo = function() {
					if (this.hasUndo) {
						if (!this.list[this.index - 1] && 1 == this.list.length) return void this.reset();
						for (; this.list[this.index].content == this.list[this.index - 1].content;) if (this.index--, 0 == this.index) return this.restore(0);
						this.restore(--this.index)
					}
				},
				this.redo = function() {
					if (this.hasRedo) {
						for (; this.list[this.index].content == this.list[this.index + 1].content;) if (this.index++, this.index == this.list.length - 1) return this.restore(this.index);
						this.restore(++this.index)
					}
				},
				this.restore = function() {
					var e = this.editor,
					t = this.list[this.index],
					i = UE.htmlparser(t.content.replace(d, ""));
					e.options.autoClearEmptyNode = ! 1,
					e.filterInputRule(i),
					e.options.autoClearEmptyNode = u,
					e.document.body.innerHTML = i.toHtml(),
					e.fireEvent("afterscencerestore"),
					h.ie && p.each(C.getElementsByTagName(e.document, "td th caption p"), function(t) {
						C.isEmptyNode(t) && C.fillNode(e.document, t)
					});
					try {
						var n = new a.Range(e.document).moveToAddress(t.address);
						n.select(c[n.startContainer.nodeName.toLowerCase()])
					} catch(o) {}
					this.update(),
					this.clearKey(),
					e.fireEvent("reset", ! 0)
				},
				this.getScene = function() {
					var e = this.editor,
					t = e.selection.getRange(),
					i = t.createAddress(!1, ! 0);
					e.fireEvent("beforegetscene");
					var n = UE.htmlparser(e.body.innerHTML, ! 0);
					e.options.autoClearEmptyNode = ! 1,
					e.filterOutputRule(n),
					e.options.autoClearEmptyNode = u;
					var o = n.toHtml();
					h.ie && (o = o.replace(/>&nbsp;</g, "><").replace(/\s*</g, "<").replace(/>\s*/g, ">")),
					e.fireEvent("aftergetscene");
					try {} catch(r) {}
					return {
						address: i,
						content: o
					}
				},
				this.save = function(e, i) {
					clearTimeout(o);
					var n = this.getScene(i),
					r = this.list[this.index];
					r && r.content == n.content && (e ? 1: t(r.address, n.address)) || (this.list = this.list.slice(0, this.index + 1), this.list.push(n), this.list.length > s && this.list.shift(), this.index = this.list.length - 1, this.clearKey(), this.update())
				},
				this.update = function() {
					this.hasRedo = !! this.list[this.index + 1],
					this.hasUndo = !! this.list[this.index - 1]
				},
				this.reset = function() {
					this.list = [],
					this.index = 0,
					this.hasUndo = ! 1,
					this.hasRedo = ! 1,
					this.clearKey()
				},
				this.clearKey = function() {
					g = 0,
					f = null
				}
			}
			function n() {
				this.undoManger.save()
			}
			var o, r = this,
			s = r.options.maxUndoCount || 20,
			l = r.options.maxInputCount || 20,
			d = new RegExp(C.fillChar + "|</hr>", "gi"),
			c = {
				ol: 1,
				ul: 1,
				table: 1,
				tbody: 1,
				tr: 1,
				body: 1
			},
			u = r.options.autoClearEmptyNode;
			r.undoManger = new i,
			r.undoManger.editor = r,
			r.addListener("saveScene", function() {
				var e = Array.prototype.splice.call(arguments, 1);
				this.undoManger.save.apply(this.undoManger, e)
			}),
			r.addListener("beforeexeccommand", n),
			r.addListener("afterexeccommand", n),
			r.addListener("reset", function(e, t) {
				t || this.undoManger.reset()
			}),
			r.commands.redo = r.commands.undo = {
				execCommand: function(e) {
					this.undoManger[e]()
				},
				queryCommandState: function(e) {
					return this.undoManger["has" + ("undo" == e.toLowerCase() ? "Undo": "Redo")] ? 0: - 1
				},
				notNeedUndo: 1
			};
			var f, m = {
				16: 1,
				17: 1,
				18: 1,
				37: 1,
				38: 1,
				39: 1,
				40: 1
			},
			g = 0,
			v = ! 1;
			r.addListener("ready", function() {
				C.on(this.body, "compositionstart", function() {
					v = ! 0
				}),
				C.on(this.body, "compositionend", function() {
					v = ! 1
				})
			}),
			r.addshortcutkey({
				Undo: "ctrl+90",
				Redo: "ctrl+89"
			});
			var y = ! 0;
			r.addListener("keydown", function(e, t) {
				function i(e) {
					e.selection.getRange().collapsed && e.fireEvent("contentchange"),
					e.undoManger.save(!1, ! 0),
					e.fireEvent("selectionchange")
				}
				var n = this,
				r = t.keyCode || t.which;
				if (! (m[r] || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
					if (v) return;
					if (!n.selection.getRange().collapsed) return n.undoManger.save(!1, ! 0),
					void(y = ! 1);
					0 == n.undoManger.list.length && n.undoManger.save(!0),
					clearTimeout(o),
					o = setTimeout(function() {
						if (v) var e = setInterval(function() {
							v || (i(n), clearInterval(e))
						},
						300);
						else i(n)
					},
					200),
					f = r,
					g++,
					g >= l && i(n)
				}
			}),
			r.addListener("keyup", function(e, t) {
				var i = t.keyCode || t.which;
				if (! (m[i] || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
					if (v) return;
					y || (this.undoManger.save(!1, ! 0), y = ! 0)
				}
			})
		},
		UE.plugins.paste = function() {
			function e(e) {
				var t = this.document;
				if (!t.getElementById("baidu_pastebin")) {
					var i = this.selection.getRange(),
					n = i.createBookmark(),
					o = t.createElement("div");
					o.id = "baidu_pastebin",
					h.webkit && o.appendChild(t.createTextNode(C.fillChar + C.fillChar)),
					t.body.appendChild(o),
					n.start.style.display = "",
					o.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + C.getXY(n.start).y + "px",
					i.selectNodeContents(o).select(!0),
					setTimeout(function() {
						if (h.webkit) for (var r, a = 0, s = t.querySelectorAll("#baidu_pastebin"); r = s[a++];) {
							if (!C.isEmptyNode(r)) {
								o = r;
								break
							}
							C.remove(r)
						}
						try {
							o.parentNode.removeChild(o)
						} catch(l) {}
						i.moveToBookmark(n).select(!0),
						e(o)
					},
					0)
				}
			}
			function t(e) {
				var t;
				if (e.firstChild) {
					for (var a, s = C.getElementsByTagName(e, "span"), l = 0; a = s[l++];)("_baidu_cut_start" == a.id || "_baidu_cut_end" == a.id) && C.remove(a);
					if (h.webkit) {
						for (var d, c = e.querySelectorAll("div br"), l = 0; d = c[l++];) {
							var u = d.parentNode;
							"DIV" == u.tagName && 1 == u.childNodes.length && (u.innerHTML = "<p><br/></p>", C.remove(u))
						}
						for (var f, m = e.querySelectorAll("#baidu_pastebin"), l = 0; f = m[l++];) {
							var g = r.document.createElement("p");
							for (f.parentNode.insertBefore(g, f); f.firstChild;) g.appendChild(f.firstChild);
							C.remove(f)
						}
						for (var v, y = e.querySelectorAll("meta"), l = 0; v = y[l++];) C.remove(v);
						var c = e.querySelectorAll("br");
						for (l = 0; v = c[l++];) / ^ apple - /i.test(v.className)&&C.remove(v)}if(h.gecko){var b=e.querySelectorAll("[_moz_dirty]");for(l=0;v=b[l++];)v.removeAttribute("_moz_dirty")}if(!h.ie)for(var v,N=e.querySelectorAll("span.Apple-style-span"),l=0;v=N[l++];)C.remove(v,!0);t=e.innerHTML,t=UE.filterWord(t);var E=UE.htmlparser(t,!0);if(r.options.filterRules&&UE.filterNode(E,r.options.filterRules),r.filterInputRule(E),h.webkit){var w=E.lastChild();w&&"element"==w.type&&"br"==w.tagName&&E.removeChild(w),p.each(r.body.querySelectorAll("div"),function(e){C.isEmptyBlock(e)&&C.remove(e)})}if(t={html:E.toHtml()},r.fireEvent("beforepaste",t,E),!t.html)return;E=UE.htmlparser(t.html,!0),1===r.queryCommandState("pasteplain")?r.execCommand("insertHtml",UE.filterNode(E,r.options.filterTxtRules).toHtml(),!0):(UE.filterNode(E,r.options.filterTxtRules),i=E.toHtml(),n=t.html,o=r.selection.getRange().createAddress(!0),r.execCommand("insertHtml",n,!0)),r.fireEvent("afterpaste",t)}}var i,n,o,r=this;r.addListener("pasteTransfer",function(e,t){if(o&&i&&n&&i!=n){var a=r.selection.getRange();if(a.moveToAddress(o,!0),!a.collapsed){for(;!C.isBody(a.startContainer);){var s=a.startContainer;if(1==s.nodeType){if(s=s.childNodes[a.startOffset],!s){a.setStartBefore(a.startContainer);continue}var l=s.previousSibling;l&&3==l.nodeType&&new RegExp("^[\n\r	 "+C.fillChar+"]*$").test(l.nodeValue)&&a.setStartBefore(l)}if(0!=a.startOffset)break;a.setStartBefore(a.startContainer)}for(;!C.isBody(a.endContainer);){var d=a.endContainer;if(1==d.nodeType){if(d=d.childNodes[a.endOffset],!d){a.setEndAfter(a.endContainer);continue}var c=d.nextSibling;c&&3==c.nodeType&&new RegExp("^[\n\r	"+C.fillChar+"]*$").test(c.nodeValue)&&a.setEndAfter(c)}if(a.endOffset!=a.endContainer.childNodes.length)break;a.setEndAfter(a.endContainer)}}a.deleteContents(),a.select(!0),r.__hasEnterExecCommand=!0;var u=n;2===t?u=u.replace(/ < (\ / ? )([\w\ - ] + )([ ^ > ] * ) > /gi,function(e,t,i,n){return i=i.toLowerCase(),{img:1}[i]?e:(n=n.replace(/ ([\w\ - ] * ? )\s *= \s * (("([^"] * )")|('([^']*)')|([^\s>]+))/gi,function(e,t,i){return{src:1,href:1,name:1}[t.toLowerCase()]?t+" = "+i+"":""}),{span:1,div:1}[i]?"":" < "+t+i+""+p.trim(n)+" > ")}):t&&(u=i),r.execCommand("
						inserthtml ",u,!0),r.__hasEnterExecCommand=!1;var f=r.selection.getRange().createAddress(!0);o.endAddress=f.startAddress}}),r.addListener("
						ready ",function(){C.on(r.body,"
						cut ",function(){var e=r.selection.getRange();!e.collapsed&&r.undoManger&&r.undoManger.save()}),C.on(r.body,h.ie||h.opera?"
						keydown ":"
						paste ",function(i){(!h.ie&&!h.opera||(i.ctrlKey||i.metaKey)&&"
						86 "==i.keyCode)&&e.call(r,function(e){t(e)})})})},UE.plugins.list=function(){function e(e){var t=[];for(var i in e)t.push(i);return t}function t(e){var t=e.className;return C.hasClass(e,/custom_/)?t.match(/custom_(\w+)/)[1]:C.getStyle(e,"
						list - style - type ")}function i(e,i){p.each(C.getElementsByTagName(e,"
						ol ul "),function(r){if(C.inDoc(r,e)){var a=r.parentNode;if(a.tagName==r.tagName){var s=t(r)||("
						OL "==r.tagName?"
						decimal ":"
						disc "),l=t(a)||("
						OL "==a.tagName?"
						decimal ":"
						disc ");if(s==l){var d=p.indexOf(m[r.tagName],s);d=d+1==m[r.tagName].length?0:d+1,o(r,m[r.tagName][d])}}var c=0,u=2;C.hasClass(r,/custom_/)?/[ou]l/i.test(a.tagName)&&C.hasClass(a,/custom_/)||(u=1):/[ou]l/i.test(a.tagName)&&C.hasClass(a,/custom_/)&&(u=3);var h=C.getStyle(r,"
						list - style - type ");h&&(r.style.cssText="
						list - style - type: "+h),r.className=p.trim(r.className.replace(/list-paddingleft-\w+/,""))+"
						list - paddingleft - "+u,p.each(C.getElementsByTagName(r,"
						li "),function(e){if(e.style.cssText&&(e.style.cssText=""),!e.firstChild)return void C.remove(e);if(e.parentNode===r){if(c++,C.hasClass(r,/custom_/)){var i=1,n=t(r);if("
						OL "==r.tagName){if(n)switch(n){case"
						cn ":case"
						cn1 ":case"
						cn2 ":c>10&&(c%10==0||c>10&&20>c)?i=2:c>20&&(i=3);break;case"
						num2 ":c>9&&(i=2)}e.className="
						list - "+f[n]+c+"
						list - "+n+" - paddingleft - "+i}else e.className="
						list - "+f[n]+"
						list - "+n+" - paddingleft "}else e.className=e.className.replace(/list-[\w\-]+/gi,"");var o=e.getAttribute("
						class ");null===o||o.replace(/\s/g,"")||C.removeAttributes(e,"
						class ")}}),!i&&n(r,r.tagName.toLowerCase(),t(r)||C.getStyle(r,"
						list - style - type "),!0)}})}function n(e,n,o,r){var a=e.nextSibling;a&&1==a.nodeType&&a.tagName.toLowerCase()==n&&(t(a)||C.getStyle(a,"
						list - style - type ")||("
						ol "==n?"
						decimal ":"
						disc "))==o&&(C.moveChild(a,e),0==a.childNodes.length&&C.remove(a)),a&&C.isFillChar(a)&&C.remove(a);var s=e.previousSibling;s&&1==s.nodeType&&s.tagName.toLowerCase()==n&&(t(s)||C.getStyle(s,"
						list - style - type ")||("
						ol "==n?"
						decimal ":"
						disc "))==o&&C.moveChild(e,s),s&&C.isFillChar(s)&&C.remove(s),!r&&C.isEmptyBlock(e)&&C.remove(e),t(e)&&i(e.ownerDocument,!0)}function o(e,t){f[t]&&(e.className="
						custom_ "+t);try{C.setStyle(e,"
						list - style - type ",t)}catch(i){}}function r(e){var t=e.previousSibling;t&&C.isEmptyBlock(t)&&C.remove(t),t=e.nextSibling,t&&C.isEmptyBlock(t)&&C.remove(t)}function a(){null===c&&(c=parseInt(s(d.body).css("
						lineHeight "),10)+5),d.body.scrollTop&&(d.body.scrollTop+=c)}function l(e){for(;e&&!C.isBody(e);){if("
						TABLE "==e.nodeName)return null;if("
						LI "==e.nodeName)return e;e=e.parentNode}}var d=this,c=null,u={TD:1,PRE:1,BLOCKQUOTE:1},f={cn:"
						cn - 1 - ",cn1:"
						cn - 2 - ",cn2:"
						cn - 3 - ",num:"
						num - 1 - ",num1:"
						num - 2 - ",num2:"
						num - 3 - ",dash:"
						dash ",dot:"
						dot "};d.setOpt({insertorderedlist:{num:"",num1:"",num2:"",cn:"",cn1:"",cn2:"",decimal:"","
						lower - alpha ":"","
						lower - roman ":"","
						upper - alpha ":"","
						upper - roman ":""},insertunorderedlist:{circle:"",disc:"",square:"",dash:"",dot:""},listDefaultPaddingLeft:"
						30 ",listiconpath:"
						http: //bs.baidu.com/listicon/",maxListLevel:-1});var m={OL:e(d.options.insertorderedlist),UL:e(d.options.insertunorderedlist)},g=d.options.listiconpath;for(var y in f)d.options.insertorderedlist.hasOwnProperty(y)||d.options.insertunorderedlist.hasOwnProperty(y)||delete f[y];d.ready(function(){var e=[];for(var t in f){if("dash"==t||"dot"==t)e.push("li.list-"+f[t]+"{background-image:url("+g+f[t]+".gif)}"),e.push("ul.custom_"+t+"{list-style:none;}ul.custom_"+t+" li{background-position:0 3px;background-repeat:no-repeat}");else{for(var i=0;99>i;i++)e.push("li.list-"+f[t]+i+"{background-image:url("+g+"list-"+f[t]+i+".gif)}");e.push("ol.custom_"+t+"{list-style:none;}ol.custom_"+t+" li{background-position:0 3px;background-repeat:no-repeat}")}switch(t){case"cn":e.push("li.list-"+t+"-paddingleft-1{padding-left:25px}"),e.push("li.list-"+t+"-paddingleft-2{padding-left:40px}"),e.push("li.list-"+t+"-paddingleft-3{padding-left:55px}");break;case"cn1":e.push("li.list-"+t+"-paddingleft-1{padding-left:30px}"),e.push("li.list-"+t+"-paddingleft-2{padding-left:40px}"),e.push("li.list-"+t+"-paddingleft-3{padding-left:55px}");break;case"cn2":e.push("li.list-"+t+"-paddingleft-1{padding-left:40px}"),e.push("li.list-"+t+"-paddingleft-2{padding-left:55px}"),e.push("li.list-"+t+"-paddingleft-3{padding-left:68px}");break;case"num":case"num1":e.push("li.list-"+t+"-paddingleft-1{padding-left:25px}");break;case"num2":e.push("li.list-"+t+"-paddingleft-1{padding-left:35px}"),e.push("li.list-"+t+"-paddingleft-2{padding-left:40px}");break;case"dash":e.push("li.list-"+t+"-paddingleft{padding-left:35px}");break;case"dot":e.push("li.list-"+t+"-paddingleft{padding-left:20px}")}}e.push(".list-paddingleft-1{padding-left:0}"),e.push(".list-paddingleft-2{padding-left:"+d.options.listDefaultPaddingLeft+"px}"),e.push(".list-paddingleft-3{padding-left:"+2*d.options.listDefaultPaddingLeft+"px}"),p.cssRule("list","ol,ul{margin:0;pading:0;"+(h.ie?"":"width:95%")+"}li{clear:both;}"+e.join("\n"),d.document)}),d.ready(function(){C.on(d.body,"cut",function(){setTimeout(function(){var e,t=d.selection.getRange();if((e=C.findParentByTagName(t.startContainer,"li",!0))&&!e.nextSibling&&C.isEmptyBlock(e)){var i,n=e.parentNode;if(i=n.previousSibling)C.remove(n),t.setStartAtLast(i).collapse(!0),t.select(!0);else if(i=n.nextSibling)C.remove(n),t.setStartAtFirst(i).collapse(!0),t.select(!0);
						else {
							var o = d.document.createElement("p");
							C.fillNode(d.document, o),
							n.parentNode.insertBefore(o, n),
							C.remove(n),
							t.setStart(o, 0).collapse(!0),
							t.select(!0)
						}
					}
				})
			})
		}),
		d.addListener("beforepaste", function(e, i) {
			var n, o = this,
			r = o.selection.getRange(),
			a = UE.htmlparser(i.html, ! 0);
			if (n = C.findParentByTagName(r.startContainer, "li", ! 0)) {
				var s = n.parentNode,
				l = "OL" == s.tagName ? "ul": "ol";
				p.each(a.getNodesByTagName(l), function(i) {
					if (i.tagName = s.tagName, i.setAttr(), i.parentNode === a) e = t(s) || ("OL" == s.tagName ? "decimal": "disc");
					else {
						var n = i.parentNode.getAttr("class");
						e = n && /custom_/.test(n) ? n.match(/custom_(\w+)/)[1] : i.parentNode.getStyle("list-style-type"),
						e || (e = "OL" == s.tagName ? "decimal": "disc")
					}
					var o = p.indexOf(m[s.tagName], e);
					i.parentNode !== a && (o = o + 1 == m[s.tagName].length ? 0: o + 1);
					var r = m[s.tagName][o];
					f[r] ? i.setAttr("class", "custom_" + r) : i.setStyle("list-style-type", r)
				})
			}
			i.html = a.toHtml()
		}),
		d.addInputRule(function(e) {
			function t(e, t) {
				var o = t.firstChild();
				if (o && "element" == o.type && "span" == o.tagName && /Wingdings|Symbol/.test(o.getStyle("font-family"))) {
					for (var r in n) if (n[r] == o.data) return r;
					return "disc"
				}
				for (var r in i) if (i[r].test(e)) return r
			}
			p.each(e.getNodesByTagName("li"), function(e) {
				for (var t, i = UE.uNode.createElement("p"), n = 0; t = e.children[n];)"text" == t.type || v.p[t.tagName] ? i.appendChild(t) : i.firstChild() ? (e.insertBefore(i, t), i = UE.uNode.createElement("p"), n += 2) : n++;
				(i.firstChild() && ! i.parentNode || ! e.firstChild()) && e.appendChild(i)
			});
			var i = {
				num1: /^\d+\)/,
				decimal: /^\d+\./,
				"lower-alpha": /^[a-z]+\)/,
				"upper-alpha": /^[A-Z]+\./,
				cn: /^[\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+[\u3001]/,
				cn2: /^\([\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+\)/
			},
			n = {
				square: "n"
			};
			p.each(e.getNodesByTagName("p"), function(e) {
				function n(e, t, n) {
					"ol" == e.tagName ? t.innerHTML(t.innerHTML().replace(i[n], "")) : t.removeChild(t.firstChild());
					var o = UE.uNode.createElement("li");
					o.appendChild(t),
					e.appendChild(o)
				}
				if ("MsoListParagraph" == e.getAttr("class")) {
					e.setAttr("class", "");
					var o, r = e;
					if ("li" != e.parentNode.tagName && (o = t(e.innerText(), e))) {
						var a = UE.uNode.createElement(d.options.insertorderedlist.hasOwnProperty(o) ? "ol": "ul");
						for (f[o] ? a.setAttr("class", "custom_" + o) : a.setStyle("list-style-type", o); e && "li" != e.parentNode.tagName && t(e.innerText(), e);) r = e.nextSibling(),
						r || e.parentNode.insertBefore(a, e),
						n(a, e, o),
						e = r; ! a.parentNode && e && e.parentNode && e.parentNode.insertBefore(a, e)
					}
				}
			})
		}),
		d.addListener("contentchange", function() {
			i(d.document)
		}),
		d.addListener("keydown", function(e, t) {
			function i(e) {
				t.preventDefault ? t.preventDefault() : t.returnValue = ! 1,
				e && a(),
				d.fireEvent("contentchange"),
				d.undoManger && d.undoManger.save()
			}
			function n(e, t) {
				for (; e && ! C.isBody(e);) {
					if (t(e)) return null;
					if (1 == e.nodeType && /[ou]l/i.test(e.tagName)) return e;
					e = e.parentNode
				}
				return null
			}
			var o = t.keyCode || t.which;
			if (13 == o && ! t.shiftKey) {
				var s = d.selection.getRange(),
				l = C.findParent(s.startContainer, function(e) {
					return C.isBlockElm(e)
				},
				! 0),
				c = C.findParentByTagName(s.startContainer, "li", ! 0);
				if (l && "PRE" != l.tagName && ! c) {
					var u = l.innerHTML.replace(new RegExp(C.fillChar, "g"), "");
					/^\s*1\s*\.[^\d]/.test(u) && (l.innerHTML = u.replace(/^\s*1\s*\./, ""), s.setStartAtLast(l).collapse(!0).select(), d.__hasEnterExecCommand = ! 0, d.execCommand("insertorderedlist"), d.__hasEnterExecCommand = ! 1)
				}
				var f = d.selection.getRange(),
				h = n(f.startContainer, function(e) {
					return "TABLE" == e.tagName
				}),
				m = f.collapsed ? h: n(f.endContainer, function(e) {
					return "TABLE" == e.tagName
				});
				if (h && m && h === m) {
					if (!f.collapsed) {
						if (h = C.findParentByTagName(f.startContainer, "li", ! 0), m = C.findParentByTagName(f.endContainer, "li", ! 0), ! h || ! m || h !== m) {
							var p = f.cloneRange(),
							g = p.collapse(!1).createBookmark();
							f.deleteContents(),
							p.moveToBookmark(g);
							var c = C.findParentByTagName(p.startContainer, "li", ! 0);
							return r(c),
							p.select(),
							void i()
						}
						if (f.deleteContents(), c = C.findParentByTagName(f.startContainer, "li", ! 0), c && C.isEmptyBlock(c)) return x = c.previousSibling,
						next = c.nextSibling,
						N = d.document.createElement("p"),
						C.fillNode(d.document, N),
						y = c.parentNode,
						x && next ? (f.setStart(next, 0).collapse(!0).select(!0), C.remove(c)) : ((x || next) && x ? c.parentNode.parentNode.insertBefore(N, y.nextSibling) : y.parentNode.insertBefore(N, y), C.remove(c), y.firstChild || C.remove(y), f.setStart(N, 0).setCursor()),
						void i()
					}
					if (c = C.findParentByTagName(f.startContainer, "li", ! 0)) {
						if (C.isEmptyBlock(c)) {
							g = f.createBookmark();
							var y = c.parentNode;
							if (c !== y.lastChild ? (C.breakParent(c, y), r(c)) : (y.parentNode.insertBefore(c, y.nextSibling), C.isEmptyNode(y) && C.remove(y)), ! v.$list[c.parentNode.tagName]) if (C.isBlockElm(c.firstChild)) C.remove(c, ! 0);
							else {
								for (N = d.document.createElement("p"), c.parentNode.insertBefore(N, c); c.firstChild;) N.appendChild(c.firstChild);
								C.remove(c)
							}
							f.moveToBookmark(g).select()
						} else {
							var b = c.firstChild;
							if (!b || ! C.isBlockElm(b)) {
								var N = d.document.createElement("p");
								for (!c.firstChild && C.fillNode(d.document, N); c.firstChild;) N.appendChild(c.firstChild);
								c.appendChild(N),
								b = N
							}
							var E = d.document.createElement("span");
							f.insertNode(E),
							C.breakParent(E, c);
							var w = E.nextSibling;
							b = w.firstChild,
							b || (N = d.document.createElement("p"), C.fillNode(d.document, N), w.appendChild(N), b = N),
							C.isEmptyNode(b) && (b.innerHTML = "", C.fillNode(d.document, b)),
							f.setStart(b, 0).collapse(!0).shrinkBoundary().select(),
							C.remove(E);
							var x = w.previousSibling;
							x && C.isEmptyBlock(x) && (x.innerHTML = "<p></p>", C.fillNode(d.document, x.firstChild))
						}
						i(!0)
					}
				}
			}
			if (8 == o && (f = d.selection.getRange(), f.collapsed && C.isStartInblock(f) && (p = f.cloneRange().trimBoundary(), c = C.findParentByTagName(f.startContainer, "li", ! 0), c && C.isStartInblock(p)))) {
				if (h = C.findParentByTagName(f.startContainer, "p", ! 0), h && h !== c.firstChild) {
					var y = C.findParentByTagName(h, ["ol", "ul"]);
					return C.breakParent(h, y),
					r(h),
					d.fireEvent("contentchange"),
					f.setStart(h, 0).setCursor(!1, ! 0),
					d.fireEvent("saveScene"),
					void C.preventDefault(t)
				}
				if (c && (x = c.previousSibling)) {
					if (46 == o && c.childNodes.length) return;
					if (v.$list[x.tagName] && (x = x.lastChild), d.undoManger && d.undoManger.save(), b = c.firstChild, C.isBlockElm(b)) if (C.isEmptyNode(b)) for (x.appendChild(b), f.setStart(b, 0).setCursor(!1, ! 0); c.firstChild;) x.appendChild(c.firstChild);
					else E = d.document.createElement("span"),
					f.insertNode(E),
					C.isEmptyBlock(x) && (x.innerHTML = ""),
					C.moveChild(c, x),
					f.setStartBefore(E).collapse(!0).select(!0),
					C.remove(E);
					else if (C.isEmptyNode(c)) {
						var N = d.document.createElement("p");
						x.appendChild(N),
						f.setStart(N, 0).setCursor()
					} else for (f.setEnd(x, x.childNodes.length).collapse().select(!0); c.firstChild;) x.appendChild(c.firstChild);
					return C.remove(c),
					d.fireEvent("contentchange"),
					d.fireEvent("saveScene"),
					void C.preventDefault(t)
				}
				if (c && ! c.previousSibling) {
					var y = c.parentNode,
					g = f.createBookmark();
					if (C.isTagNode(y.parentNode, "ol ul")) y.parentNode.insertBefore(c, y),
					C.isEmptyNode(y) && C.remove(y);
					else {
						for (; c.firstChild;) y.parentNode.insertBefore(c.firstChild, y);
						C.remove(c),
						C.isEmptyNode(y) && C.remove(y)
					}
					return f.moveToBookmark(g).setCursor(!1, ! 0),
					d.fireEvent("contentchange"),
					d.fireEvent("saveScene"),
					void C.preventDefault(t)
				}
			}
		}),
		d.addListener("keyup", function(e, i) {
			var o = i.keyCode || i.which;
			if (8 == o) {
				var r, a = d.selection.getRange();
				(r = C.findParentByTagName(a.startContainer, ["ol", "ul"], ! 0)) && n(r, r.tagName.toLowerCase(), t(r) || C.getComputedStyle(r, "list-style-type"), ! 0)
			}
		}),
		d.addListener("tabkeydown", function() {
			function e(e) {
				if ( - 1 != d.options.maxListLevel) {
					for (var t = e.parentNode, i = 0;
					/[ou]l/i.test(t.tagName);) i++,
					t = t.parentNode;
					if (i >= d.options.maxListLevel) return ! 0
				}
			}
			var i = d.selection.getRange(),
			r = C.findParentByTagName(i.startContainer, "li", ! 0);
			if (r) {
				var a;
				if (!i.collapsed) {
					d.fireEvent("saveScene"),
					a = i.createBookmark();
					for (var s, l, c = 0, u = C.findParents(r); l = u[c++];) if (C.isTagNode(l, "ol ul")) {
						s = l;
						break
					}
					var f = r;
					if (a.end) for (; f && ! (C.getPosition(f, a.end) & C.POSITION_FOLLOWING);) if (e(f)) f = C.getNextDomNode(f, ! 1, null, function(e) {
						return e !== s
					});
					else {
						var h = f.parentNode,
						g = d.document.createElement(h.tagName),
						v = p.indexOf(m[g.tagName], t(h) || C.getComputedStyle(h, "list-style-type")),
						y = v + 1 == m[g.tagName].length ? 0: v + 1,
						b = m[g.tagName][y];
						for (o(g, b), h.insertBefore(g, f); f && ! (C.getPosition(f, a.end) & C.POSITION_FOLLOWING);) {
							if (r = f.nextSibling, g.appendChild(f), ! r || C.isTagNode(r, "ol ul")) {
								if (r) for (;
								(r = r.firstChild) && "LI" != r.tagName;);
								else r = C.getNextDomNode(f, ! 1, null, function(e) {
									return e !== s
								});
								break
							}
							f = r
						}
						n(g, g.tagName.toLowerCase(), b),
						f = r
					}
					return d.fireEvent("contentchange"),
					i.moveToBookmark(a).select(),
					! 0
				}
				if (e(r)) return ! 0;
				var h = r.parentNode,
				g = d.document.createElement(h.tagName),
				v = p.indexOf(m[g.tagName], t(h) || C.getComputedStyle(h, "list-style-type"));
				v = v + 1 == m[g.tagName].length ? 0: v + 1;
				var b = m[g.tagName][v];
				if (o(g, b), C.isStartInblock(i)) return d.fireEvent("saveScene"),
				a = i.createBookmark(),
				h.insertBefore(g, r),
				g.appendChild(r),
				n(g, g.tagName.toLowerCase(), b),
				d.fireEvent("contentchange"),
				i.moveToBookmark(a).select(!0),
				! 0
			}
		}),
		d.commands.insertorderedlist = d.commands.insertunorderedlist = {
			execCommand: function(e, i) {
				i || (i = "insertorderedlist" == e.toLowerCase() ? "decimal": "disc");
				var r = this,
				a = this.selection.getRange(),
				s = function(e) {
					return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() : ! C.isWhitespace(e)
				},
				d = "insertorderedlist" == e.toLowerCase() ? "ol": "ul",
				c = r.document.createDocumentFragment();
				a.adjustmentBoundary().shrinkBoundary();
				var f, h, m, g, y = a.createBookmark(!0),
				b = l(r.document.getElementById(y.start)),
				N = 0,
				E = l(r.document.getElementById(y.end)),
				w = 0;
				if (b || E) {
					if (b && (f = b.parentNode), y.end || (E = b), E && (h = E.parentNode), f === h) {
						for (; b !== E;) {
							if (g = b, b = b.nextSibling, ! C.isBlockElm(g.firstChild)) {
								for (var x = r.document.createElement("p"); g.firstChild;) x.appendChild(g.firstChild);
								g.appendChild(x)
							}
							c.appendChild(g)
						}
						if (g = r.document.createElement("span"), f.insertBefore(g, E), ! C.isBlockElm(E.firstChild)) {
							for (x = r.document.createElement("p"); E.firstChild;) x.appendChild(E.firstChild);
							E.appendChild(x)
						}
						c.appendChild(E),
						C.breakParent(g, f),
						C.isEmptyNode(g.previousSibling) && C.remove(g.previousSibling),
						C.isEmptyNode(g.nextSibling) && C.remove(g.nextSibling);
						var _ = t(f) || C.getComputedStyle(f, "list-style-type") || ("insertorderedlist" == e.toLowerCase() ? "decimal": "disc");
						if (f.tagName.toLowerCase() == d && _ == i) {
							for (var S, T = 0, k = r.document.createDocumentFragment(); S = c.childNodes[T++];) if (C.isTagNode(S, "ol ul")) p.each(C.getElementsByTagName(S, "li"), function(e) {
								for (; e.firstChild;) k.appendChild(e.firstChild)
							});
							else for (; S.firstChild;) k.appendChild(S.firstChild);
							g.parentNode.insertBefore(k, g)
						} else m = r.document.createElement(d),
						o(m, i),
						m.appendChild(c),
						g.parentNode.insertBefore(m, g);
						return C.remove(g),
						m && n(m, d, i),
						void a.moveToBookmark(y).select()
					}
					if (b) {
						for (; b;) {
							if (g = b.nextSibling, C.isTagNode(b, "ol ul")) c.appendChild(b);
							else {
								for (var B = r.document.createDocumentFragment(), L = 0; b.firstChild;) C.isBlockElm(b.firstChild) && (L = 1),
								B.appendChild(b.firstChild);
								if (L) c.appendChild(B);
								else {
									var D = r.document.createElement("p");
									D.appendChild(B),
									c.appendChild(D)
								}
								C.remove(b)
							}
							b = g
						}
						f.parentNode.insertBefore(c, f.nextSibling),
						C.isEmptyNode(f) ? (a.setStartBefore(f), C.remove(f)) : a.setStartAfter(f),
						N = 1
					}
					if (E && C.inDoc(h, r.document)) {
						for (b = h.firstChild; b && b !== E;) {
							if (g = b.nextSibling, C.isTagNode(b, "ol ul")) c.appendChild(b);
							else {
								for (B = r.document.createDocumentFragment(), L = 0; b.firstChild;) C.isBlockElm(b.firstChild) && (L = 1),
								B.appendChild(b.firstChild);
								L ? c.appendChild(B) : (D = r.document.createElement("p"), D.appendChild(B), c.appendChild(D)),
								C.remove(b)
							}
							b = g
						}
						var A = C.createElement(r.document, "div", {
							tmpDiv: 1
						});
						C.moveChild(E, A),
						c.appendChild(A),
						C.remove(E),
						h.parentNode.insertBefore(c, h),
						a.setEndBefore(h),
						C.isEmptyNode(h) && C.remove(h),
						w = 1
					}
				}
				N || a.setStartBefore(r.document.getElementById(y.start)),
				y.end && ! w && a.setEndAfter(r.document.getElementById(y.end)),
				a.enlarge(!0, function(e) {
					return u[e.tagName]
				}),
				c = r.document.createDocumentFragment();
				for (var R, I = a.createBookmark(), O = C.getNextDomNode(I.start, ! 1, s), U = a.cloneRange(), H = C.isBlockElm; O && O !== I.end && C.getPosition(O, I.end) & C.POSITION_PRECEDING;) if (3 == O.nodeType || v.li[O.tagName]) {
					if (1 == O.nodeType && v.$list[O.tagName]) {
						for (; O.firstChild;) c.appendChild(O.firstChild);
						R = C.getNextDomNode(O, ! 1, s),
						C.remove(O),
						O = R;
						continue
					}
					for (R = O, U.setStartBefore(O); O && O !== I.end && (!H(O) || C.isBookmarkNode(O));) R = O,
					O = C.getNextDomNode(O, ! 1, null, function(e) {
						return ! u[e.tagName]
					});
					O && H(O) && (O.style.textIndent && (O.style.textIndent = ""), g = C.getNextDomNode(R, ! 1, s), g && C.isBookmarkNode(g) && (O = C.getNextDomNode(g, ! 1, s), R = g)),
					U.setEndAfter(R),
					O = C.getNextDomNode(R, ! 1, s);
					var M = a.document.createElement("li");
					if (M.appendChild(U.extractContents()), C.isEmptyNode(M)) {
						for (var R = a.document.createElement("p"); M.firstChild;) R.appendChild(M.firstChild);
						M.appendChild(R)
					}
					c.appendChild(M)
				} else O = C.getNextDomNode(O, ! 0, s);
				a.moveToBookmark(I).collapse(!0),
				m = r.document.createElement(d),
				o(m, i),
				m.appendChild(c),
				a.insertNode(m),
				n(m, d, i);
				for (var S, T = 0, P = C.getElementsByTagName(m, "div"); S = P[T++];) S.getAttribute("tmpDiv") && C.remove(S, ! 0);
				a.moveToBookmark(y).select()
			},
			queryCommandState: function(e) {
				for (var t, i = "insertorderedlist" == e.toLowerCase() ? "ol": "ul", n = this.selection.getStartElementPath(), o = 0; t = n[o++];) {
					if ("TABLE" == t.nodeName) return 0;
					if (i == t.nodeName.toLowerCase()) return 1
				}
				return 0
			},
			queryCommandValue: function(e) {
				for (var i, n, o = "insertorderedlist" == e.toLowerCase() ? "ol": "ul", r = this.selection.getStartElementPath(), a = 0; n = r[a++];) {
					if ("TABLE" == n.nodeName) {
						i = null;
						break
					}
					if (o == n.nodeName.toLowerCase()) {
						i = n;
						break
					}
				}
				return i ? t(i) || C.getComputedStyle(i, "list-style-type") : null
			}
		}
	},
	UE.plugins.attachLoader = function() {
		function e(e, t) {
			UE.utils.loadFile(document, {
				src: e,
				tag: "script",
				type: "text/javascript",
				defer: "defer"
			},
			function() {
				n++,
				t && t()
			})
		}
		function t() {
			1 === n && (UE.AttachResourceReady = ! 0, i.fireEvent("attachresourceready"))
		}
		var i = this,
		n = 0;
		this.addListener("ready", function() {
			i.options.wangpanLoaderJs && e(i.options.wangpanLoaderJs, t)
		})
	},
	UE.plugins.enterkey = function() {
		var e, t = this,
		i = t.options.enterTag;
		t.addListener("keyup", function(i, n) {
			var o = n.keyCode || n.which;
			if (13 == o) {
				var r, a = t.selection.getRange(),
				s = a.startContainer;
				if (h.ie) t.fireEvent("saveScene", ! 0, ! 0);
				else {
					if (/h\d/i.test(e)) {
						if (h.gecko) {
							var l = C.findParentByTagName(s, ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "caption", "table"], ! 0);
							l || (t.document.execCommand("formatBlock", ! 1, "<p>"), r = 1)
						} else if (1 == s.nodeType) {
							var d, c = t.document.createTextNode("");
							if (a.insertNode(c), d = C.findParentByTagName(c, "div", ! 0)) {
								for (var u = t.document.createElement("p"); d.firstChild;) u.appendChild(d.firstChild);
								d.parentNode.insertBefore(u, d),
								C.remove(d),
								a.setStartBefore(c).setCursor(),
								r = 1
							}
							C.remove(c)
						}
						t.undoManger && r && t.undoManger.save()
					}
					h.opera && a.select()
				}
			}
		}),
		t.addListener("keydown", function(n, o) {
			var r = o.keyCode || o.which;
			if (13 == r) {
				if (t.fireEvent("beforeenterkeydown")) return void C.preventDefault(o);
				t.fireEvent("saveScene", ! 0, ! 0),
				e = "";
				var a = t.selection.getRange();
				if (!a.collapsed) {
					var s = a.startContainer,
					l = a.endContainer,
					d = C.findParentByTagName(s, "td", ! 0),
					c = C.findParentByTagName(l, "td", ! 0);
					if (d && c && d !== c || ! d && c || d && ! c) return void(o.preventDefault ? o.preventDefault() : o.returnValue = ! 1)
				}
				if ("p" == i) h.ie || (s = C.findParentByTagName(a.startContainer, ["ol", "ul", "p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "caption"], ! 0), s || h.opera ? (e = s.tagName, "p" == s.tagName.toLowerCase() && h.gecko && C.removeDirtyAttr(s)) : (t.document.execCommand("formatBlock", ! 1, "<p>"), h.gecko && (a = t.selection.getRange(), s = C.findParentByTagName(a.startContainer, "p", ! 0), s && C.removeDirtyAttr(s))));
				else if (o.preventDefault ? o.preventDefault() : o.returnValue = ! 1, a.collapsed) {
					f = a.document.createElement("br"),
					a.insertNode(f);
					var u = f.parentNode;
					u.lastChild === f ? (f.parentNode.insertBefore(f.cloneNode(!0), f), a.setStartBefore(f)) : a.setStartAfter(f),
					a.setCursor()
				} else if (a.deleteContents(), s = a.startContainer, 1 == s.nodeType && (s = s.childNodes[a.startOffset])) {
					for (; 1 == s.nodeType;) {
						if (v.$empty[s.tagName]) return a.setStartBefore(s).setCursor(),
						t.undoManger && t.undoManger.save(),
						! 1;
						if (!s.firstChild) {
							var f = a.document.createElement("br");
							return s.appendChild(f),
							a.setStart(s, 0).setCursor(),
							t.undoManger && t.undoManger.save(),
							! 1
						}
						s = s.firstChild
					}
					s === a.startContainer.childNodes[a.startOffset] ? (f = a.document.createElement("br"), a.insertNode(f).setCursor()) : a.setStart(s, 0).setCursor()
				} else f = a.document.createElement("br"),
				a.insertNode(f).setStartAfter(f).setCursor()
			}
		})
	},
	UE.plugins.keystrokes = function() {
		var e = this,
		t = ! 0,
		i = null;
		e.addListener("keydown", function(n, o) {
			var r = o.keyCode || o.which,
			a = e.selection.getRange();
			if (!a.collapsed && ! (o.ctrlKey || o.shiftKey || o.altKey || o.metaKey) && (r >= 65 && 90 >= r || r >= 48 && 57 >= r || r >= 96 && 111 >= r || {
				13: 1,
				8: 1,
				46: 1
			} [r])) {
				var s = a.startContainer;
				if (C.isFillChar(s) && a.setStartBefore(s), s = a.endContainer, C.isFillChar(s) && a.setEndAfter(s), a.txtToElmBoundary(), a.endContainer && 1 == a.endContainer.nodeType && (s = a.endContainer.childNodes[a.endOffset], s && C.isBr(s) && a.setEndAfter(s)), 0 == a.startOffset && (s = a.startContainer, C.isBoundaryNode(s, "firstChild") && (s = a.endContainer, a.endOffset == (3 == s.nodeType ? s.nodeValue.length: s.childNodes.length) && C.isBoundaryNode(s, "lastChild")))) return e.fireEvent("saveScene"),
				e.body.innerHTML = "<p>" + (h.ie ? "": "<br/>") + "</p>",
				a.setStart(e.body.firstChild, 0).setCursor(!1, ! 0),
				void e._selectionChange()
			}
			if (8 == r) {
				a = e.selection.getRange(),
				t = a.collapsed;
				var l, d;
				if (a.collapsed && a.inFillChar() && (l = a.startContainer, C.isFillChar(l) ? (a.setStartBefore(l).shrinkBoundary(!0).collapse(!0), C.remove(l)) : (l.nodeValue = l.nodeValue.replace(new RegExp("^" + C.fillChar), ""), a.startOffset--, a.collapse(!0).select(!0))), l = a.getClosedNode()) return e.fireEvent("saveScene"),
				a.setStartBefore(l),
				C.remove(l),
				a.setCursor(),
				e.fireEvent("saveScene"),
				void C.preventDefault(o);
				if (!h.ie && (l = C.findParentByTagName(a.startContainer, "table", ! 0), d = C.findParentByTagName(a.endContainer, "table", ! 0), l && ! d || ! l && d || l !== d)) return void o.preventDefault();
				l = a.startContainer;
				var c = C.findParentByTagName(l, "pre", ! 0);
				c && C.isEmptyNode(c) && C.remove(c),
				l = a.startContainer;
				var u = C.findParentByTagName(l, "p", ! 0);
				c = u && u.previousSibling,
				c && "pre" === c.tagName.toLowerCase() && (i = c)
			}
			if (9 == r) {
				var f = {
					ol: 1,
					ul: 1,
					table: 1
				};
				if (e.fireEvent("tabkeydown", o)) return void C.preventDefault(o);
				var m = e.selection.getRange();
				e.fireEvent("saveScene");
				for (var p = 0, g = "", v = e.options.tabSize || 4, y = e.options.tabNode || "&nbsp;"; v > p; p++) g += y;
				var b = e.document.createElement("span");
				if (b.innerHTML = g + C.fillChar, m.collapsed) m.insertNode(b.cloneNode(!0).firstChild).setCursor(!0);
				else if (l = C.findParent(m.startContainer, E), d = C.findParent(m.endContainer, E), l && d && l === d) m.deleteContents(),
				m.insertNode(b.cloneNode(!0).firstChild).setCursor(!0);
				else {
					var N = m.createBookmark(),
					E = function(e) {
						return C.isBlockElm(e) && ! f[e.tagName.toLowerCase()]
					};
					m.enlarge(!0);
					for (var w = m.createBookmark(), x = C.getNextDomNode(w.start, ! 1, E); x && ! (C.getPosition(x, w.end) & C.POSITION_FOLLOWING);) x.insertBefore(b.cloneNode(!0).firstChild, x.firstChild),
					x = C.getNextDomNode(x, ! 1, E);
					m.moveToBookmark(w).moveToBookmark(N).select()
				}
				C.preventDefault(o)
			}
			if (h.gecko && 46 == r && (m = e.selection.getRange(), m.collapsed && (l = m.startContainer, C.isEmptyBlock(l)))) {
				for (var _ = l.parentNode; 1 == C.getChildCount(_) && ! C.isBody(_);) l = _,
				_ = _.parentNode;
				return void(l === _.lastChild && o.preventDefault())
			}
		}),
		e.addListener("keyup", function(e, n) {
			var o, r = n.keyCode || n.which,
			a = this;
			if (8 == r) {
				if (i && i.parentNode) {
					if (!i.nextSibling || "p" !== i.nextSibling.tagName.toLowerCase()) {
						var s = document.createElement("p");
						s.innerHTML = C.fillChar + "<br>",
						C.insertAfter(i, s)
					}
					i = null
				}
				if (a.fireEvent("delkeyup")) return;
				if (o = a.selection.getRange(), o.collapsed) {
					var l, d = ["h1", "h2", "h3", "h4", "h5", "h6"];
					if ((l = C.findParentByTagName(o.startContainer, d, ! 0)) && C.isEmptyBlock(l)) {
						var c = l.previousSibling;
						if (c && "TABLE" != c.nodeName) return C.remove(l),
						void o.setStartAtLast(c).setCursor(!1, ! 0);
						var u = l.nextSibling;
						if (u && "TABLE" != u.nodeName) return C.remove(l),
						void o.setStartAtFirst(u).setCursor(!1, ! 0)
					}
					if (C.isBody(o.startContainer)) {
						var l = C.createElement(a.document, "p", {
							innerHTML: h.ie ? C.fillChar: "<br/>"
						});
						o.insertNode(l).setStart(l, 0).setCursor(!1, ! 0)
					}
				}
				if (!t && (3 == o.startContainer.nodeType || 1 == o.startContainer.nodeType && C.isEmptyBlock(o.startContainer))) if (h.ie) {
					var f = o.document.createElement("span");
					o.insertNode(f).setStartBefore(f).collapse(!0),
					o.select(),
					C.remove(f)
				} else o.select()
			}
		})
	},
	UE.plugins.fiximgclick = function() {
		try {
			var e = this;
			h.webkit && e.addListener("click", function(t, i) {
				try {
					if ("IMG" == i.target.tagName) {
						var n = new a.Range(e.document);
						n.selectNode(i.target).select()
					}
				} catch(i) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: i.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 9136
					})
				}
			})
		} catch(t) {
			"undefined" != typeof alog && alog("exception.fire", "catch", {
				msg: t.message,
				path: "common:widget/js/logic/editor/editor.js",
				method: "",
				ln: 9138
			})
		}
	},
	UE.plugins.pasteplain = function() {
		var e = this;
		e.setOpt({
			pasteplain: ! 1,
			filterTxtRules: function() {
				function e(e) {
					e.tagName = "p",
					e.setStyle()
				}
				return {
					"-": "script style object iframe embed input select",
					p: {
						$: {}
					},
					br: {
						$: {}
					},
					div: function(e) {
						for (var t, i = UE.uNode.createElement("p"); t = e.firstChild();)"text" != t.type && UE.dom.dtd.$block[t.tagName] ? i.firstChild() ? (e.parentNode.insertBefore(i, e), i = UE.uNode.createElement("p")) : e.parentNode.insertBefore(t, e) : i.appendChild(t);
						i.firstChild() && e.parentNode.insertBefore(i, e),
						e.parentNode.removeChild(e)
					},
					ol: function(e) {
						e.parentNode.removeChild(e, ! 0)
					},
					ul: function(e) {
						e.parentNode.removeChild(e, ! 0)
					},
					dl: function(e) {
						e.parentNode.removeChild(e, ! 0)
					},
					dt: function(e) {
						e.parentNode.removeChild(e, ! 0)
					},
					dd: function(e) {
						e.parentNode.removeChild(e, ! 0)
					},
					li: function(e) {
						e.parentNode.removeChild(e, ! 0)
					},
					caption: e,
					th: e,
					tr: e,
					h1: e,
					h2: e,
					h3: e,
					h4: e,
					h5: e,
					h6: e,
					td: function(e) {
						var t = !! e.innerText();
						t && e.parentNode.insertAfter(UE.uNode.createText(" &nbsp; &nbsp;"), e),
						e.parentNode.removeChild(e, e.innerText())
					}
				}
			} ()
		});
		var t = e.options.pasteplain;
		e.commands.pasteplain = {
			queryCommandState: function() {
				return t ? 1: 0
			},
			execCommand: function() {
				t = 0 | ! t
			},
			notNeedUndo: 1
		}
	},
	UE.plugins.insertcode = function() {
		var e = this;
		e.ready(function() {
			p.cssRule("pre", "pre{margin:.5em 0;padding:.4em .6em;border-radius:8px;background:#f8f8f8;line-height:1.5}", e.document)
		}),
		e.setOpt("insertcode", {
			as3: "ActionScript3",
			bash: "Bash/Shell",
			cpp: "C/C++",
			css: "Css",
			cf: "CodeFunction",
			"c#": "C#",
			delphi: "Delphi",
			diff: "Diff",
			erlang: "Erlang",
			groovy: "Groovy",
			html: "Html",
			java: "Java",
			jfx: "JavaFx",
			js: "Javascript",
			pl: "Perl",
			php: "Php",
			plain: "Plain Text",
			ps: "PowerShell",
			python: "Python",
			ruby: "Ruby",
			scala: "Scala",
			sql: "Sql",
			vb: "Vb",
			xml: "Xml"
		}),
		e.commands.insertcode = {
			execCommand: function(e, t) {
				var i = this,
				n = i.selection.getRange(),
				o = C.findParentByTagName(n.startContainer, "pre", ! 0);
				if (o) o.className = "brush:" + t + ";toolbar:false;";
				else {
					var r = "";
					if (n.collapsed) r = h.ie ? h.version > 8 ? "": "&nbsp;": "<br/>";
					else {
						var a = n.extractContents(),
						s = i.document.createElement("div");
						s.appendChild(a),
						p.each(UE.filterNode(UE.htmlparser(s.innerHTML.replace(/[\r\t]/g, "")), i.options.filterTxtRules).children, function(e) {
							if (h.ie && h.version > 8)"element" == e.type ? "br" == e.tagName ? r += "\n": v.$empty[e.tagName] || (p.each(e.children, function(t) {
								"element" == t.type ? "br" == t.tagName ? r += "\n": v.$empty[e.tagName] || (r += t.innerText()) : r += t.data
							}), /\n$/.test(r) || (r += "\n")) : r += e.data + "\n",
							! e.nextSibling() && /\n$/.test(r) && (r = r.replace(/\n$/, ""));
							else if (h.ie)"element" == e.type ? "br" == e.tagName ? r += "<br>": v.$empty[e.tagName] || (p.each(e.children, function(t) {
								"element" == t.type ? "br" == t.tagName ? r += "<br>": v.$empty[e.tagName] || (r += t.innerText()) : r += t.data
							}), /br>$/.test(r) || (r += "<br>")) : r += e.data + "<br>",
							! e.nextSibling() && /<br>$/.test(r) && (r = r.replace(/<br>$/, ""));
							else if (r += "element" == e.type ? v.$empty[e.tagName] ? "": e.innerText() : e.data, ! /br\/?\s*>$/.test(r)) {
								if (!e.nextSibling()) return;
								r += "<br>"
							}
						})
					}
					i.execCommand("inserthtml", '<pre id="coder"class="brush:' + t + ';toolbar:false">' + r + "</pre>", ! 0),
					o = i.document.getElementById("coder"),
					C.removeAttributes(o, "id");
					var l = o.previousSibling;
					l && C.isEmptyBlock(l) && C.remove(l);
					var n = i.selection.getRange();
					C.isEmptyBlock(o) ? n.setStart(o, 0).setCursor(!1, ! 0) : n.selectNodeContents(o).select()
				}
			},
			queryCommandValue: function() {
				var e = this.selection.getStartElementPath(),
				t = "";
				return p.each(e, function(e) {
					if ("PRE" == e.nodeName) {
						var i = e.className.match(/brush:([^;]+)/);
						return t = i && i[1] ? i[1] : "",
						! 1
					}
				}),
				t
			}
		},
		e.addInputRule(function(e) {
			p.each(e.getNodesByTagName("pre"), function(e) {
				var t = e.getNodesByTagName("br");
				if (t.length) return void(h.ie && h.version > 8 && p.each(t, function(e) {
					var t = UE.uNode.createText("\n");
					e.parentNode.insertBefore(t, e),
					e.parentNode.removeChild(e)
				}));
				if (! (h.ie && h.version > 8)) {
					var i = e.innerText().split(/\n/);
					e.innerHTML(""),
					p.each(i, function(t) {
						t.length && e.appendChild(UE.uNode.createText(t)),
						e.appendChild(UE.uNode.createElement("br"))
					})
				}
			})
		}),
		e.addOutputRule(function(e) {
			p.each(e.getNodesByTagName("pre"), function(e) {
				var t = "";
				p.each(e.children, function(e) {
					t += "text" == e.type ? e.data.replace(/[ ]/g, "&nbsp;") : "\n"
				}),
				e.innerText(t.replace(/(&nbsp;|\n)+$/, ""))
			})
		}),
		e.notNeedCodeQuery = {
			help: 1,
			undo: 1,
			redo: 1,
			source: 1,
			print: 1,
			searchreplace: 1,
			fullscreen: 1,
			preview: 1,
			insertparagraph: 1,
			elementpath: 1,
			highlightcode: 1,
			insertcode: 1,
			inserthtml: 1,
			selectall: 1
		};
		e.queryCommandState;
		e.queryCommandState = function(e) {
			var t = this;
			return ! t.notNeedCodeQuery[e.toLowerCase()] && t.selection && t.queryCommandValue("insertcode") ? - 1: UE.Editor.prototype.queryCommandState.apply(this, arguments)
		},
		e.addListener("beforeenterkeydown", function() {
			var t = e.selection.getRange(),
			i = C.findParentByTagName(t.startContainer, "pre", ! 0);
			if (i) {
				if (e.fireEvent("saveScene"), t.collapsed || t.deleteContents(), h.ie) if (h.version > 8) {
					var n = e.document.createTextNode("\n"),
					o = t.startContainer;
					if (0 == t.startOffset) {
						var r = o.previousSibling;
						if (r) {
							t.insertNode(n);
							var a = e.document.createTextNode(" ");
							t.setStartAfter(n).insertNode(a).setStart(a, 0).collapse(!0).select(!0)
						}
					} else {
						t.insertNode(n).setStartAfter(n);
						var a = e.document.createTextNode(" ");
						o = t.startContainer.childNodes[t.startOffset],
						o && ! /^\n/.test(o.nodeValue) && t.setStartBefore(n),
						t.insertNode(a).setStart(a, 0).collapse(!0).select(!0)
					}
				} else {
					var s = e.document.createElement("br");
					t.insertNode(s),
					t.insertNode(e.document.createTextNode(C.fillChar)),
					t.setStartAfter(s),
					i = s.previousSibling;
					for (var l; i;) if (l = i, i = i.previousSibling, ! i || "BR" == i.nodeName) {
						i = l;
						break
					}
					if (i) {
						for (var d = ""; i && "BR" != i.nodeName && new RegExp("^[ " + C.fillChar + "]*$").test(i.nodeValue);) d += i.nodeValue,
						i = i.nextSibling;
						if ("BR" != i.nodeName) {
							var c = i.nodeValue.match(new RegExp("^([ " + C.fillChar + "]+)"));
							c && c[1] && (d += c[1])
						}
						d = e.document.createTextNode(d),
						t.insertNode(d).setStartAfter(d)
					}
					t.collapse(!0).select()
				} else {
					var i, s = e.document.createElement("br");
					t.insertNode(s).setStartAfter(s).collapse(!0);
					var u = s.nextSibling;
					u ? t.setStartAfter(s) : t.insertNode(s.cloneNode(!1)),
					i = s.previousSibling;
					for (var l; i;) if (l = i, i = i.previousSibling, ! i || "BR" == i.nodeName) {
						i = l;
						break
					}
					if (i) {
						for (var d = ""; i && "BR" != i.nodeName && new RegExp("^[\\s" + C.fillChar + "]*$").test(i.nodeValue);) d += i.nodeValue,
						i = i.nextSibling;
						if ("BR" != i.nodeName) {
							var c = i.nodeValue.match(new RegExp("^([\\s" + C.fillChar + "]+)"));
							c && c[1] && (d += c[1])
						}
						d && (d = e.document.createTextNode(d), t.insertNode(d).setStartAfter(d))
					}
					t.collapse(!0).select(!0)
				}
				return e.fireEvent("saveScene"),
				! 0
			}
		}),
		e.addListener("tabkeydown", function(t, i) {
			var n = e.selection.getRange(),
			o = C.findParentByTagName(n.startContainer, "pre", ! 0);
			if (o) {
				if (e.fireEvent("saveScene"), i.shiftKey);
				else if (n.collapsed) {
					var r = e.document.createTextNode("    ");
					n.insertNode(r).setStartAfter(r).collapse(!0).select(!0)
				} else {
					for (var a = n.createBookmark(), s = a.start.previousSibling; s;) {
						if (o.firstChild === s && ! C.isBr(s)) {
							o.insertBefore(e.document.createTextNode("    "), s);
							break
						}
						if (C.isBr(s)) {
							o.insertBefore(e.document.createTextNode("    "), s.nextSibling);
							break
						}
						s = s.previousSibling
					}
					var l = a.end;
					for (s = a.start.nextSibling, o.firstChild === a.start && o.insertBefore(e.document.createTextNode("    "), s.nextSibling); s && s !== l;) {
						if (C.isBr(s) && s.nextSibling) {
							if (s.nextSibling === l) break;
							o.insertBefore(e.document.createTextNode("    "), s.nextSibling)
						}
						s = s.nextSibling
					}
					n.moveToBookmark(a).select()
				}
				return e.fireEvent("saveScene"),
				! 0
			}
		}),
		e.addListener("beforeinserthtml", function(e, t) {
			var i = this,
			n = i.selection.getRange(),
			o = C.findParentByTagName(n.startContainer, "pre", ! 0);
			if (o) {
				n.collapsed || n.deleteContents();
				var r = "";
				if (h.ie && h.version > 8) {
					p.each(UE.filterNode(UE.htmlparser(t), i.options.filterTxtRules).children, function(e) {
						"element" == e.type ? "br" == e.tagName ? r += "\n": v.$empty[e.tagName] || (p.each(e.children, function(t) {
							"element" == t.type ? "br" == t.tagName ? r += "\n": v.$empty[e.tagName] || (r += t.innerText()) : r += t.data
						}), /\n$/.test(r) || (r += "\n")) : r += e.data + "\n",
						! e.nextSibling() && /\n$/.test(r) && (r = r.replace(/\n$/, ""))
					});
					var a = i.document.createTextNode(p.html(r.replace(/&nbsp;/g, " ")));
					n.insertNode(a).selectNode(a).select()
				} else {
					var s = i.document.createDocumentFragment();
					p.each(UE.filterNode(UE.htmlparser(t), i.options.filterTxtRules).children, function(e) {
						"element" == e.type ? "br" == e.tagName ? s.appendChild(i.document.createElement("br")) : v.$empty[e.tagName] || (p.each(e.children, function(t) {
							"element" == t.type ? "br" == t.tagName ? s.appendChild(i.document.createElement("br")) : v.$empty[e.tagName] || s.appendChild(i.document.createTextNode(p.html(t.innerText().replace(/&nbsp;/g, " ")))) : s.appendChild(i.document.createTextNode(p.html(t.data.replace(/&nbsp;/g, " "))))
						}), "BR" != s.lastChild.nodeName && s.appendChild(i.document.createElement("br"))) : s.appendChild(i.document.createTextNode(p.html(e.data.replace(/&nbsp;/g, " ")))),
						e.nextSibling() || "BR" != s.lastChild.nodeName || s.removeChild(s.lastChild)
					}),
					n.insertNode(s).select()
				}
				return ! 0
			}
		}),
		e.addListener("keydown", function(e, t) {
			var i = this,
			n = t.keyCode || t.which;
			if (40 == n) {
				var o, r = i.selection.getRange(),
				a = r.startContainer;
				if (r.collapsed && (o = C.findParentByTagName(r.startContainer, "pre", ! 0)) && ! o.nextSibling) {
					for (var s = o.lastChild; s && "BR" == s.nodeName;) s = s.previousSibling;
					(s === a || r.startContainer === o && r.startOffset == o.childNodes.length) && (i.execCommand("insertparagraph"), C.preventDefault(t))
				}
			}
		})
	};
	var r = r || {};
	r.editor = r.editor || {},
	r.editor.ui = {},
	function() {
		function e() {
			var e = document.getElementById("edui_fixedlayer");
			d.setViewportOffset(e, {
				left: 0,
				top: 0
			})
		}
		function t() {
			n.on(window, "scroll", e),
			n.on(window, "resize", r.editor.utils.defer(e, 0, ! 0))
		}
		var i = r.editor.browser,
		n = r.editor.dom.domUtils,
		o = "$EDITORUI",
		a = window[o] = {},
		s = "ID" + o,
		l = 0,
		d = r.editor.ui.uiUtils = {
			uid: function(e) {
				return e ? e[s] || (e[s] = ++l) : ++l
			},
			hook: function(e, t) {
				var i;
				return e && e._callbacks ? i = e: (i = function() {
					var t;
					e && (t = e.apply(this, arguments));
					for (var n = i._callbacks, o = n.length; o--;) {
						var r = n[o].apply(this, arguments);
						void 0 === t && (t = r)
					}
					return t
				},
				i._callbacks = []),
				i._callbacks.push(t),
				i
			},
			createElementByHtml: function(e) {
				var t = document.createElement("div");
				return t.innerHTML = e,
				t = t.firstChild,
				t.parentNode.removeChild(t),
				t
			},
			getViewportElement: function() {
				return i.ie && i.quirks ? document.body: document.documentElement
			},
			getClientRect: function(e) {
				var t;
				try {
					t = e.getBoundingClientRect()
				} catch(i) {
					t = {
						left: 0,
						top: 0,
						height: 0,
						width: 0
					}
				}
				for (var o, r = {
					left: Math.round(t.left),
					top: Math.round(t.top),
					height: Math.round(t.bottom - t.top),
					width: Math.round(t.right - t.left)
				};
				(o = e.ownerDocument) !== document && (e = n.getWindow(o).frameElement);) t = e.getBoundingClientRect(),
				r.left += t.left,
				r.top += t.top;
				return r.bottom = r.top + r.height,
				r.right = r.left + r.width,
				r
			},
			getViewportRect: function() {
				var e = d.getViewportElement(),
				t = 0 | (window.innerWidth || e.clientWidth),
				i = 0 | (window.innerHeight || e.clientHeight);
				return {
					left: 0,
					top: 0,
					height: i,
					width: t,
					bottom: i,
					right: t
				}
			},
			setViewportOffset: function(e, t) {
				var i = d.getFixedLayer();
				e.parentNode === i ? (e.style.left = t.left + "px", e.style.top = t.top + "px") : n.setViewportOffset(e, t)
			},
			getEventOffset: function(e) {
				var t = e.target || e.srcElement,
				i = d.getClientRect(t),
				n = d.getViewportOffsetByEvent(e);
				return {
					left: n.left - i.left,
					top: n.top - i.top
				}
			},
			getViewportOffsetByEvent: function(e) {
				var t = e.target || e.srcElement,
				i = n.getWindow(t).frameElement,
				o = {
					left: e.clientX,
					top: e.clientY
				};
				if (i && t.ownerDocument !== document) {
					var r = d.getClientRect(i);
					o.left += r.left,
					o.top += r.top
				}
				return o
			},
			setGlobal: function(e, t) {
				return a[e] = t,
				o + '["' + e + '"]'
			},
			unsetGlobal: function(e) {
				delete a[e]
			},
			copyAttributes: function(e, t) {
				for (var o = t.attributes, r = o.length; r--;) {
					var a = o[r];
					"style" == a.nodeName || "class" == a.nodeName || i.ie && ! a.specified || e.setAttribute(a.nodeName, a.nodeValue)
				}
				t.className && n.addClass(e, t.className),
				t.style.cssText && (e.style.cssText += ";" + t.style.cssText)
			},
			removeStyle: function(e, t) {
				if (e.style.removeProperty) e.style.removeProperty(t);
				else {
					if (!e.style.removeAttribute) throw "";
					e.style.removeAttribute(t)
				}
			},
			contains: function(e, t) {
				return e && t && (e === t ? ! 1: e.contains ? e.contains(t) : 16 & e.compareDocumentPosition(t))
			},
			startDrag: function(e, t, i) {
				function n(e) {
					var i = e.clientX - a,
					n = e.clientY - s;
					t.ondragmove(i, n, e),
					e.stopPropagation ? e.stopPropagation() : e.cancelBubble = ! 0
				}
				function o() {
					i.removeEventListener("mousemove", n, ! 0),
					i.removeEventListener("mouseup", o, ! 0),
					window.removeEventListener("mouseup", o, ! 0),
					t.ondragstop()
				}
				function r() {
					l.releaseCapture(),
					l.detachEvent("onmousemove", n),
					l.detachEvent("onmouseup", r),
					l.detachEvent("onlosecaptrue", r),
					t.ondragstop()
				}
				var i = i || document,
				a = e.clientX,
				s = e.clientY;
				if (i.addEventListener) i.addEventListener("mousemove", n, ! 0),
				i.addEventListener("mouseup", o, ! 0),
				window.addEventListener("mouseup", o, ! 0),
				e.preventDefault();
				else {
					var l = e.srcElement;
					l.setCapture(),
					l.attachEvent("onmousemove", n),
					l.attachEvent("onmouseup", r),
					l.attachEvent("onlosecaptrue", r),
					e.returnValue = ! 1
				}
				t.ondragstart()
			},
			getFixedLayer: function() {
				var n = document.getElementById("edui_fixedlayer");
				return null == n && (n = document.createElement("div"), n.id = "edui_fixedlayer", document.body.appendChild(n), i.ie && i.version <= 8 ? (n.style.position = "absolute", t(), setTimeout(e)) : n.style.position = "fixed", n.style.left = "0", n.style.top = "0", n.style.width = "0", n.style.height = "0"),
				n
			},
			makeUnselectable: function(e) {
				if (i.opera || i.ie && i.version < 9) {
					if (e.unselectable = "on", e.hasChildNodes()) for (var t = 0; t < e.childNodes.length; t++) 1 == e.childNodes[t].nodeType && d.makeUnselectable(e.childNodes[t])
				} else void 0 !== e.style.MozUserSelect ? e.style.MozUserSelect = "none": void 0 !== e.style.WebkitUserSelect ? e.style.WebkitUserSelect = "none": void 0 !== e.style.KhtmlUserSelect && (e.style.KhtmlUserSelect = "none")
			}
		}
	} (),
	function() {
		var e = r.editor.utils,
		t = r.editor.ui.uiUtils,
		i = r.editor.EventBase,
		n = r.editor.ui.UIBase = function() {};
		n.prototype = {
			className: "",
			uiName: "",
			initOptions: function(e) {
				try {
					var i = this;
					for (var n in e) i[n] = e[n];
					this.id = this.id || "edui" + t.uid()
				} catch(o) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: o.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10054
					})
				}
			},
			initUIBase: function() {
				try {
					this._globalKey = e.unhtml(t.setGlobal(this.id, this))
				} catch(i) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: i.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10057
					})
				}
			},
			render: function(e) {
				for (var i, n = this.renderHtml(), o = t.createElementByHtml(n), r = C.getElementsByTagName(o, "*"), a = "edui-" + (this.theme || this.editor.options.theme), s = document.getElementById("edui_fixedlayer"), l = 0; i = r[l++];) C.addClass(i, a);
				C.addClass(o, a),
				s && (s.className = "", C.addClass(s, a));
				var d = this.getDom();
				null != d ? (d.parentNode.replaceChild(o, d), t.copyAttributes(o, d)) : ("string" == typeof e && (e = document.getElementById(e)), e = e || t.getFixedLayer(), C.addClass(e, a), e.appendChild(o)),
				this.postRender()
			},
			getDom: function(e) {
				return document.getElementById(e ? this.id + "_" + e: this.id)
			},
			postRender: function() {
				this.fireEvent("postrender")
			},
			getHtmlTpl: function() {
				return ""
			},
			formatHtml: function(e) {
				var t = "edui-" + this.uiName;
				return e.replace(/##/g, this.id).replace(/%%-/g, this.uiName ? t + "-": "").replace(/%%/g, (this.uiName ? t: "") + " " + this.className).replace(/\$\$/g, this._globalKey)
			},
			renderHtml: function() {
				return this.formatHtml(this.getHtmlTpl())
			},
			dispose: function() {
				var e = this.getDom();
				e && r.editor.dom.domUtils.remove(e),
				t.unsetGlobal(this.id)
			}
		},
		e.inherits(n, i)
	} (),
	function() {
		var e = r.editor.utils,
		t = r.editor.ui.UIBase,
		i = r.editor.ui.Separator = function(e) {
			this.initOptions(e),
			this.initSeparator()
		};
		i.prototype = {
			uiName: "separator",
			initSeparator: function() {
				try {
					this.initUIBase()
				} catch(e) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: e.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10133
					})
				}
			},
			getHtmlTpl: function() {
				return '<div id="##" class="edui-box %%"></div>'
			}
		},
		e.inherits(i, t)
	} (),
	function() {
		var e = r.editor.utils,
		t = r.editor.dom.domUtils,
		i = r.editor.ui.UIBase,
		n = r.editor.ui.uiUtils,
		o = r.editor.ui.Mask = function(e) {
			this.initOptions(e),
			this.initUIBase()
		};
		o.prototype = {
			getHtmlTpl: function() {
				return '<div id="##" class="edui-mask %%" onmousedown="return $$._onMouseDown(event, this);"></div>'
			},
			postRender: function() {
				var e = this;
				t.on(window, "resize", function() {
					setTimeout(function() {
						e.isHidden() || e._fill()
					})
				})
			},
			show: function(e) {
				this._fill(),
				this.getDom().style.display = "",
				this.getDom().style.zIndex = e
			},
			hide: function() {
				this.getDom().style.display = "none",
				this.getDom().style.zIndex = ""
			},
			isHidden: function() {
				return "none" == this.getDom().style.display
			},
			_onMouseDown: function() {
				return ! 1
			},
			_fill: function() {
				var e = this.getDom(),
				t = n.getViewportRect();
				e.style.width = t.width + "px",
				e.style.height = t.height + "px"
			}
		},
		e.inherits(o, i)
	} (),
	function() {
		function e(e, t) {
			for (var i = 0; i < s.length; i++) {
				var n = s[i];
				if (!n.isHidden() && n.queryAutoHide(t) !== ! 1) {
					if (e && /scroll/gi.test(e.type) && "edui-wordpastepop" == n.className) return;
					n.hide()
				}
			}
		}
		var t = r.editor.utils,
		i = r.editor.ui.uiUtils,
		n = r.editor.dom.domUtils,
		o = r.editor.ui.UIBase,
		a = r.editor.ui.Popup = function(e) {
			this.initOptions(e),
			this.initPopup()
		},
		s = [];
		a.postHide = e;
		var l = ["edui-anchor-topleft", "edui-anchor-topright", "edui-anchor-bottomleft", "edui-anchor-bottomright"];
		a.prototype = {
			SHADOW_RADIUS: 5,
			content: null,
			_hidden: ! 1,
			autoRender: ! 0,
			canSideLeft: ! 0,
			canSideUp: ! 0,
			initPopup: function() {
				try {
					this.initUIBase(),
					s.push(this)
				} catch(e) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: e.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10233
					})
				}
			},
			getHtmlTpl: function() {
				return '<div id="##" class="edui-popup %%"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="javascript:"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' + this.getContentHtmlTpl() + "  </div> </div></div>"
			},
			getContentHtmlTpl: function() {
				return this.content ? "string" == typeof this.content ? this.content: this.content.renderHtml() : ""
			},
			_UIBase_postRender: o.prototype.postRender,
			postRender: function() {
				this.content instanceof o && this.content.postRender(),
				this.fireEvent("postRenderAfter"),
				this.hide(!0),
				this._UIBase_postRender()
			},
			_doAutoRender: function() { ! this.getDom() && this.autoRender && this.render()
			},
			mesureSize: function() {
				var e = this.getDom("content");
				return i.getClientRect(e)
			},
			fitSize: function() {
				var e = this.getDom("body");
				e.style.width = "",
				e.style.height = "";
				var t = this.mesureSize();
				return e.style.width = t.width + "px",
				e.style.height = t.height + "px",
				t
			},
			showAnchor: function(e, t) {
				this.showAnchorRect(i.getClientRect(e), t)
			},
			showAnchorRect: function(e, t) {
				this._doAutoRender();
				var o = i.getViewportRect();
				this._show();
				var a, s, d, c, u = this.fitSize();
				t ? (a = this.canSideLeft && e.right + u.width > o.right && e.left > u.width, s = this.canSideUp && e.top + u.height > o.bottom && e.bottom > u.height, d = a ? e.left - u.width: e.right, c = s ? e.bottom - u.height: e.top) : (a = this.canSideLeft && e.right + u.width > o.right && e.left > u.width, s = this.canSideUp && e.top + u.height > o.bottom && e.bottom > u.height, d = a ? e.right - u.width: e.left, c = s ? e.top - u.height: e.bottom);
				var f = this.getDom();
				i.setViewportOffset(f, {
					left: d,
					top: c
				}),
				n.removeClasses(f, l),
				f.className += " " + l[2 * (s ? 1: 0) + (a ? 1: 0)],
				this.editor && (f.style.zIndex = 1 * this.editor.container.style.zIndex + 10, r.editor.ui.uiUtils.getFixedLayer().style.zIndex = f.style.zIndex - 1)
			},
			showAt: function(e) {
				var t = e.left,
				i = e.top,
				n = {
					left: t,
					top: i,
					right: t,
					bottom: i,
					height: 0,
					width: 0
				};
				this.showAnchorRect(n, ! 1, ! 0)
			},
			_show: function() {
				if (this._hidden) {
					var e = this.getDom();
					e.style.display = "",
					this._hidden = ! 1,
					this.fireEvent("show")
				}
			},
			isHidden: function() {
				return this._hidden
			},
			show: function() {
				this._doAutoRender(),
				this._show()
			},
			hide: function(e) { ! this._hidden && this.getDom() && (this.getDom().style.display = "none", this._hidden = ! 0, e || this.fireEvent("hide"))
			},
			queryAutoHide: function(e) {
				return ! e || ! i.contains(this.getDom(), e)
			}
		},
		t.inherits(a, o),
		n.on(document, "mousedown", function(t) {
			var i = t.target || t.srcElement;
			e(t, i)
		}),
		n.on(window, "scroll", function(t, i) {
			e(t, i)
		})
	} (),
	function() {
		var e = r.editor.browser,
		t = r.editor.dom.domUtils,
		i = r.editor.ui.uiUtils,
		n = 'onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"' + (e.ie ? ' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"': ' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"');
		r.editor.ui.Stateful = {
			alwalysHoverable: ! 1,
			target: null,
			Stateful_init: function() {
				try {
					this._Stateful_dGetHtmlTpl = this.getHtmlTpl,
					this.getHtmlTpl = this.Stateful_getHtmlTpl
				} catch(e) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: e.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10403
					})
				}
			},
			Stateful_getHtmlTpl: function() {
				var e = this._Stateful_dGetHtmlTpl();
				return e.replace(/stateful/g, function() {
					return n
				})
			},
			Stateful_onMouseEnter: function(e, t) {
				this.target = t,
				(!this.isDisabled() || this.alwalysHoverable) && (this.addState("hover"), this.fireEvent("over"))
			},
			Stateful_onMouseLeave: function() { (!this.isDisabled() || this.alwalysHoverable) && (this.removeState("hover"), this.removeState("active"), this.fireEvent("out"))
			},
			Stateful_onMouseOver: function(e, t) {
				var n = e.relatedTarget;
				i.contains(t, n) || t === n || this.Stateful_onMouseEnter(e, t)
			},
			Stateful_onMouseOut: function(e, t) {
				var n = e.relatedTarget;
				i.contains(t, n) || t === n || this.Stateful_onMouseLeave(e, t)
			},
			Stateful_onMouseDown: function() {
				this.isDisabled() || this.addState("active")
			},
			Stateful_onMouseUp: function() {
				this.isDisabled() || this.removeState("active")
			},
			Stateful_postRender: function() {
				this.disabled && ! this.hasState("disabled") && this.addState("disabled")
			},
			hasState: function(e) {
				return t.hasClass(this.getStateDom(), "edui-state-" + e)
			},
			addState: function(e) {
				this.hasState(e) || (this.getStateDom().className += " edui-state-" + e)
			},
			removeState: function(e) {
				this.hasState(e) && t.removeClasses(this.getStateDom(), ["edui-state-" + e])
			},
			getStateDom: function() {
				return this.getDom("state")
			},
			isChecked: function() {
				return this.hasState("checked")
			},
			setChecked: function(e) { ! this.isDisabled() && e ? this.addState("checked") : this.removeState("checked")
			},
			isDisabled: function() {
				return this.hasState("disabled")
			},
			setDisabled: function(e) {
				e ? (this.removeState("hover"), this.removeState("checked"), this.removeState("active"), this.addState("disabled")) : this.removeState("disabled")
			}
		}
	} (),
	function() {
		var e = r.editor.utils,
		t = r.editor.ui.UIBase,
		i = r.editor.ui.Stateful,
		n = r.editor.ui.Button = function(e) {
			this.initOptions(e),
			this.initButton()
		};
		n.prototype = {
			uiName: "button",
			label: "",
			title: "",
			showIcon: ! 0,
			showText: ! 0,
			initButton: function() {
				try {
					this.initUIBase(),
					this.Stateful_init()
				} catch(e) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: e.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10512
					})
				}
			},
			getHtmlTpl: function() {
				return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"': "") + ' class="%%-body" onmousedown="return false;" onclick="return $$._onClick();">' + (this.showIcon ? '<div class="edui-box edui-icon"></div>': "") + (this.showText ? '<div class="edui-box edui-label">' + this.label + "</div>": "") + "</div></div></div></div>"
			},
			postRender: function() {
				this.Stateful_postRender(),
				this.setDisabled(this.disabled)
			},
			_onClick: function() {
				try {
					this.isDisabled() || this.fireEvent("click")
				} catch(e) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: e.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10532
					})
				}
			}
		},
		e.inherits(n, t),
		e.extend(n.prototype, i)
	} (),
	function() {
		var e = r.editor.utils,
		t = r.editor.dom.domUtils,
		i = r.editor.ui.uiUtils,
		n = r.editor.ui.UIBase,
		o = r.editor.ui.Popup,
		a = r.editor.ui.Stateful,
		s = r.editor.ui.CellAlignPicker,
		l = r.editor.ui.Menu = function(e) {
			this.initOptions(e),
			this.initMenu()
		},
		d = {
			renderHtml: function() {
				return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>'
			},
			postRender: function() {},
			queryAutoHide: function() {
				return ! 0
			}
		};
		l.prototype = {
			items: null,
			uiName: "menu",
			initMenu: function() {
				try {
					this.items = this.items || [],
					this.initPopup(),
					this.initItems()
				} catch(e) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: e.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10574
					})
				}
			},
			initItems: function() {
				try {
					for (var e = 0; e < this.items.length; e++) {
						var t = this.items[e];
						"-" == t ? this.items[e] = this.getSeparator() : t instanceof c || (t.editor = this.editor, t.theme = this.editor.options.theme, this.items[e] = this.createItem(t))
					}
				} catch(i) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: i.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10586
					})
				}
			},
			getSeparator: function() {
				return d
			},
			createItem: function(e) {
				return e.menu = this,
				new c(e)
			},
			_Popup_getContentHtmlTpl: o.prototype.getContentHtmlTpl,
			getContentHtmlTpl: function() {
				if (0 == this.items.length) return this._Popup_getContentHtmlTpl();
				for (var e = [], t = 0; t < this.items.length; t++) {
					var i = this.items[t];
					e[t] = i.renderHtml()
				}
				return '<div class="%%-body">' + e.join("") + "</div>"
			},
			_Popup_postRender: o.prototype.postRender,
			postRender: function() {
				for (var e = this, n = 0; n < this.items.length; n++) {
					var o = this.items[n];
					o.ownerMenu = this,
					o.postRender()
				}
				t.on(this.getDom(), "mouseover", function(t) {
					t = t || event;
					var n = t.relatedTarget || t.fromElement,
					o = e.getDom();
					i.contains(o, n) || o === n || e.fireEvent("over")
				}),
				this._Popup_postRender()
			},
			queryAutoHide: function(e) {
				if (e) {
					if (i.contains(this.getDom(), e)) return ! 1;
					for (var t = 0; t < this.items.length; t++) {
						var n = this.items[t];
						if (n.queryAutoHide(e) === ! 1) return ! 1
					}
				}
			},
			clearItems: function() {
				for (var e = 0; e < this.items.length; e++) {
					var t = this.items[e];
					clearTimeout(t._showingTimer),
					clearTimeout(t._closingTimer),
					t.subMenu && t.subMenu.destroy()
				}
				this.items = []
			},
			destroy: function() {
				this.getDom() && t.remove(this.getDom()),
				this.clearItems()
			},
			dispose: function() {
				this.destroy()
			}
		},
		e.inherits(l, o);
		var c = r.editor.ui.MenuItem = function(e) {
			if (this.initOptions(e), this.initUIBase(), this.Stateful_init(), this.subMenu && ! (this.subMenu instanceof l)) if (e.className && - 1 != e.className.indexOf("aligntd")) {
				var i = this;
				this.subMenu.selected = this.editor.queryCommandValue("cellalignment"),
				this.subMenu = new o({
					content: new s(this.subMenu),
					parentMenu: i,
					editor: i.editor,
					destroy: function() {
						this.getDom() && t.remove(this.getDom())
					}
				}),
				this.subMenu.addListener("postRenderAfter", function() {
					t.on(this.getDom(), "mouseover", function() {
						i.addState("opened")
					})
				})
			} else this.subMenu = new l(this.subMenu)
		};
		c.prototype = {
			label: "",
			subMenu: null,
			ownerMenu: null,
			uiName: "menuitem",
			alwalysHoverable: ! 0,
			getHtmlTpl: function() {
				return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">' + this.renderLabelHtml() + "</div></div>"
			},
			postRender: function() {
				var e = this;
				this.addListener("over", function() {
					e.ownerMenu.fireEvent("submenuover", e),
					e.subMenu && e.delayShowSubMenu()
				}),
				this.subMenu && (this.getDom().className += " edui-hassubmenu", this.subMenu.render(), this.addListener("out", function() {
					e.delayHideSubMenu()
				}), this.subMenu.addListener("over", function() {
					clearTimeout(e._closingTimer),
					e._closingTimer = null,
					e.addState("opened")
				}), this.ownerMenu.addListener("hide", function() {
					e.hideSubMenu()
				}), this.ownerMenu.addListener("submenuover", function(t, i) {
					i !== e && e.delayHideSubMenu()
				}), this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide, this.subMenu.queryAutoHide = function(t) {
					return t && i.contains(e.getDom(), t) ? ! 1: this._bakQueryAutoHide(t)
				}),
				this.getDom().style.tabIndex = "-1",
				i.makeUnselectable(this.getDom()),
				this.Stateful_postRender()
			},
			delayShowSubMenu: function() {
				var e = this;
				e.isDisabled() || (e.addState("opened"), clearTimeout(e._showingTimer), clearTimeout(e._closingTimer), e._closingTimer = null, e._showingTimer = setTimeout(function() {
					e.showSubMenu()
				},
				250))
			},
			delayHideSubMenu: function() {
				var e = this;
				e.isDisabled() || (e.removeState("opened"), clearTimeout(e._showingTimer), e._closingTimer || (e._closingTimer = setTimeout(function() {
					e.hasState("opened") || e.hideSubMenu(),
					e._closingTimer = null
				},
				400)))
			},
			renderLabelHtml: function() {
				return '<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">' + (this.label || "") + "</div>"
			},
			getStateDom: function() {
				return this.getDom()
			},
			queryAutoHide: function(e) {
				return this.subMenu && this.hasState("opened") ? this.subMenu.queryAutoHide(e) : void 0
			},
			_onClick: function(e, t) {
				try {
					if (this.hasState("disabled")) return;
					this.fireEvent("click", e, t) !== ! 1 && (this.subMenu ? this.showSubMenu() : o.postHide(e))
				} catch(i) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: i.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10797
					})
				}
			},
			showSubMenu: function() {
				var e = i.getClientRect(this.getDom());
				e.right -= 5,
				e.left += 2,
				e.width -= 7,
				e.top -= 4,
				e.bottom += 4,
				e.height += 8,
				this.subMenu.showAnchorRect(e, ! 0, ! 0)
			},
			hideSubMenu: function() {
				this.subMenu.hide()
			}
		},
		e.inherits(c, n),
		e.extend(c.prototype, a, ! 0)
	} (),
	function() {
		var e = r.editor.utils,
		t = r.editor.ui.uiUtils,
		i = (r.editor.dom.domUtils, r.editor.ui.UIBase),
		n = r.editor.ui.Stateful,
		o = r.editor.ui.SplitButton = function(e) {
			this.initOptions(e),
			this.initSplitButton()
		};
		o.prototype = {
			popup: null,
			uiName: "splitbutton",
			title: "",
			initSplitButton: function() {
				try {
					this.initUIBase(),
					this.Stateful_init();
					if (null != this.popup) {
						var e = this.popup;
						this.popup = null,
						this.setPopup(e)
					}
				} catch(t) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: t.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10842
					})
				}
			},
			_UIBase_postRender: i.prototype.postRender,
			postRender: function() {
				this.Stateful_postRender(),
				this._UIBase_postRender()
			},
			setPopup: function(i) {
				this.popup !== i && (null != this.popup && this.popup.dispose(), i.addListener("show", e.bind(this._onPopupShow, this)), i.addListener("hide", e.bind(this._onPopupHide, this)), i.addListener("postrender", e.bind(function() {
					i.getDom("body").appendChild(t.createElementByHtml('<div id="' + this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' + (t.getClientRect(this.getDom()).width - 2) + 'px"></div>')),
					i.getDom().className += " " + this.className
				},
				this)), this.popup = i)
			},
			_onPopupShow: function() {
				this.addState("opened")
			},
			_onPopupHide: function() {
				this.removeState("opened")
			},
			getHtmlTpl: function() {
				return '<div id="##" class="edui-box %%"><div ' + (this.title ? 'title="' + this.title + '"': "") + ' id="##_state" stateful><div class="%%-body"><div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div><div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div></div></div></div>'
			},
			showPopup: function() {
				var e = t.getClientRect(this.getDom());
				e.top -= this.popup.SHADOW_RADIUS,
				e.height += this.popup.SHADOW_RADIUS,
				this.popup.showAnchorRect(e)
			},
			_onArrowClick: function() {
				try {
					this.isDisabled() || this.showPopup()
				} catch(e) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: e.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10892
					})
				}
			},
			_onButtonClick: function() {
				try {
					this.isDisabled() || this.fireEvent("buttonclick")
				} catch(e) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: e.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10897
					})
				}
			}
		},
		e.inherits(o, i),
		e.extend(o.prototype, n, ! 0)
	} (),
	function() {
		var e = r.editor.utils,
		t = r.editor.ui.uiUtils,
		i = r.editor.ui.Menu,
		n = r.editor.ui.SplitButton,
		o = r.editor.ui.Combox = function(e) {
			this.initOptions(e),
			this.initCombox()
		};
		o.prototype = {
			uiName: "combox",
			initCombox: function() {
				try {
					var e = this;
					this.items = this.items || [];
					for (var t = 0; t < this.items.length; t++) {
						var n = this.items[t];
						n.uiName = "listitem",
						n.index = t,
						n.onclick = function() {
							try {
								e.selectByIndex(this.index)
							} catch(t) {
								"undefined" != typeof alog && alog("exception.fire", "catch", {
									msg: t.message,
									path: "common:widget/js/logic/editor/editor.js",
									method: "",
									ln: 10929
								})
							}
						}
					}
					this.popup = new i({
						items: this.items,
						uiName: "list",
						editor: this.editor
					}),
					this.initSplitButton()
				} catch(o) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: o.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 10937
					})
				}
			},
			_SplitButton_postRender: n.prototype.postRender,
			postRender: function() {
				this._SplitButton_postRender(),
				this.setLabel(this.label || ""),
				this.setValue(this.initValue || "")
			},
			showPopup: function() {
				var e = t.getClientRect(this.getDom());
				e.top += 1,
				e.bottom -= 1,
				e.height -= 2,
				this.popup.showAnchorRect(e)
			},
			getValue: function() {
				return this.value
			},
			setValue: function(e) {
				var t = this.indexByValue(e); - 1 != t ? (this.selectedIndex = t, this.setLabel(this.items[t].label), this.value = this.items[t].value) : (this.selectedIndex = - 1, this.setLabel(this.getLabelForUnknowValue(e)), this.value = e)
			},
			setLabel: function(e) {
				this.getDom("button_body").innerHTML = e,
				this.label = e
			},
			getLabelForUnknowValue: function(e) {
				return e
			},
			indexByValue: function(e) {
				for (var t = 0; t < this.items.length; t++) if (e == this.items[t].value) return t;
				return - 1
			},
			getItem: function(e) {
				return this.items[e]
			},
			selectByIndex: function(e) {
				e < this.items.length && this.fireEvent("select", e) !== ! 1 && (this.selectedIndex = e, this.value = this.items[e].value, this.setLabel(this.items[e].label))
			}
		},
		e.inherits(o, n)
	} (),
	function() {
		var e = r.editor.utils,
		t = r.editor.ui.uiUtils,
		i = r.editor.ui.UIBase,
		n = r.editor.ui.Toolbar = function(e) {
			this.initOptions(e),
			this.initToolbar()
		};
		n.prototype = {
			items: null,
			initToolbar: function() {
				try {
					this.items = this.items || [],
					this.initUIBase()
				} catch(e) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: e.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 11008
					})
				}
			},
			add: function(e) {
				this.items.push(e)
			},
			getHtmlTpl: function() {
				for (var e = [], t = 0; t < this.items.length; t++) e[t] = this.items[t].renderHtml();
				return '<div id="##" class="hancong edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' + e.join("") + "</div>"
			},
			postRender: function() {
				for (var e = this.getDom(), i = 0; i < this.items.length; i++) this.items[i].postRender();
				t.makeUnselectable(e)
			},
			_onMouseDown: function() {
				return ! 1
			}
		},
		e.inherits(n, i)
	} (),
	function() {
		var e, t, i, n = r.editor.utils,
		o = r.editor.ui.Stateful,
		a = r.editor.ui.UIBase,
		l = r.editor.ui.Button,
		d = r.editor.ui.Popup,
		f = r.editor.ui.AttachPicker = function(e) {
			this.initOptions(e),
			this.initAttechPicker()
		},
		h = {
			_errorBoxKey: "iknowDialogErrorBox",
			_coverBtnKey: "iknowDialogSbumitCover",
			_cache: null,
			_coverConfirm: null,
			_warningDialog: null,
			select: function(e) {
				return this.updateSubmitState(e),
				e.path ? void(this._cache = this.checkData(e) ? e: null) : void(this._cache = null)
			},
			insert: function() {
				m.hide();
				var e = this._cache;
				return e && e.path ? this.isImageFile(e.path) ? (this.showWarning("\u63d2\u5165\u56fe\u7247\u8bf7\u4f7f\u7528\u56fe\u7247\u529f\u80fd!"), ! 1) : void(this.hasAttachment() ? this.showConfirm() : (this.updateFile(), this._cache = null)) : (this.showWarning("\u672a\u9009\u62e9\u6587\u4ef6!"), ! 1)
			},
			dialogopen: function() {
				var e = s(".BDWidget_dialog_footer .dlg-sbtn"),
				t = null,
				i = null;
				if (e.length) {
					t = e.position(),
					e.addClass("iknow_ue_disable"),
					i = document.createElement("div"),
					i.id = this._coverBtnKey,
					i.style.cssText = ["position: absolute", "top: 0", "left: 0", "width: 270px", "height: 56px", "z-index: 999", "background: white", "filter: alpha(opacity=0)", "opacity: 0"].join("; "),
					t = s(".BDWidget_dialog_footer"),
					t && t.append(i);
					var n = document.createElement("div");
					if (n.id = this._errorBoxKey, n.style.cssText = ["font: 14px/20px Arial", "text-align: right", "color: red", "position: absolute", "bottom: 45px", "right: 0", "padding-right: 20px;"].join(";"), n.innerHTML = "&nbsp;", t = t[0], ! t) return null;
					t.parentNode.insertBefore(n, t)
				}
			},
			updateSubmitState: function(e) { ! e.path || this.isImageFile(e.path) ? this.disableSubmit() : this.enableSubmit()
			},
			disableSubmit: function() {
				var e = s("#" + this._coverBtnKey);
				e.length && (e.show(), s(".BDWidget_dialog_footer .dlg-sbtn").addClass("iknow_ue_disable"))
			},
			enableSubmit: function() {
				var e = s("#" + this._coverBtnKey);
				e.length && (e.hide(), s(".BDWidget_dialog_footer .dlg-sbtn").removeClass("iknow_ue_disable"))
			},
			updateFile: function() {
				return this._cache ? (this._cache.wealth = 0, e.setUploadFile({
					error: ! 1,
					fileInfo: this._cache
				},
				! 0), ! 0) : ! 1
			},
			cancel: function() {
				m.hide(),
				this._cache = null
			},
			checkData: function(e) {
				var t = ! 0;
				return this.isImageFile(e.path) ? (this.showError("\u63d2\u5165\u56fe\u7247\u8bf7\u4f7f\u7528\u56fe\u7247\u529f\u80fd\uff01"), t = ! 1) : this.clearError(),
				t
			},
			hasAttachment: function() {
				return e.swfupload && e.swfupload.customSettings.successCount > 0
			},
			showConfirm: function() {
				var e = this;
				this._coverConfirm ? this._coverConfirm.show() : this._coverConfirm = c.confirm('<div class="f-14"><img class="grid" src="http://img.baidu.com/img/iknow/feedback/icon-question.png"><p>\u60a8\u53ea\u80fd\u4e0a\u4f20\u4e00\u4e2a\u9644\u4ef6\uff0c\u4e0a\u4e00\u9644\u4ef6\u5c06\u88ab\u8986\u76d6\uff0c\u786e\u5b9a\u5417\uff1f</p><p class="f-12 f-gray pl-20">\uff08\u5982\u679c\u60f3\u4e0a\u4f20\u591a\u4e2a\u6587\u4ef6\uff0c\u8bf7\u6253\u5305\uff09</p></div>', {
					width: 400,
					height: 150,
					title: "\u77e5\u9053\u63d0\u793a",
					onaccept: function() {
						e.updateFile(),
						u.fire("dialog.close")
					},
					oncancel: function() {
						u.fire("dialog.close")
					}
				})
			},
			showWarning: function(e) {
				this._warningDialog ? this._warningDialog.setContnet(e).show() : this._warningDialog = c.alert('<div style="color: red; text-align: center;">' + e + "</div>", {
					width: 400,
					height: 150,
					title: "\u77e5\u9053\u63d0\u793a",
					onaccept: function() {
						u.fire("dialog.close")
					}
				})
			},
			isImageFile: function(e) {
				return /\.((jpg)|(jpeg)|(gif)|(bmp)|(png)|(jpe)|(cur)|(tif)|(tiff)|(ico))$/i.test(e)
			},
			showError: function(e) {
				var t = this.getErrorBox();
				t && (t.innerHTML = e)
			},
			clearError: function() {
				this.showError("&nbsp;")
			},
			getErrorBox: function() {
				return s("#iknowDialogErrorBox")[0]
			}
		},
		m = {
			wrap: null,
			attachWarningDialog: null,
			init: function(e) {
				try {
					var t = this;
					if (this.wrap) return this;
					var i = document.getElementById("BDWidget_dialog_body"),
					n = {
						width: s(document).width(),
						height: s(document).height()
					};
					zIndex = i ? s(i).css("zIndex") - 1: 5e3,
					this.wrap = document.createElement("div"),
					this.wrap.style.cssText = ["width:" + n.width + "px", "height:" + n.height + "px", "position: absolute", "top: 0", "left: 0", "background: #2d2d2d", "z-index:" + zIndex, "filter: alpha(opacity=20)", "opacity:0.2", "display: none"].join("; "),
					document.body.insertBefore(this.wrap, document.body.firstChild),
					s(e).on("click", function() {
						try {
							if (!UE.AttachInited) return t.attachWarningDialog || (t.attachWarningDialog = c.alert('<div style="color: red; text-align: center;">\u7f51\u76d8\u672a\u51c6\u5907\u5c31\u7eea</div>', {
								width: 400,
								height: 150,
								title: "\u77e5\u9053\u63d0\u793a",
								onaccept: function() {
									u.fire("dialog.close")
								}
							})),
							t.attachWarningDialog.show(),
							! 1;
							m.show()
						} catch(e) {
							"undefined" != typeof alog && alog("exception.fire", "catch", {
								msg: e.message,
								path: "common:widget/js/logic/editor/editor.js",
								method: "",
								ln: 11351
							})
						}
					})
				} catch(o) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: o.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 11353
					})
				}
			},
			show: function() {
				return this.wrap.style.display = "block",
				this
			},
			hide: function() {
				return this.wrap.style.display = "none",
				this
			}
		};
		f.prototype = {
			initAttechPicker: function() {
				try {
					this.initUIBase(),
					this.initButtons(),
					this.Stateful_init()
				} catch(e) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: e.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 11371
					})
				}
			},
			initButtons: function() {
				function n() {
					var t = null;
					UE.AttachInited || UE.AttachResourceReady && window.BDWidget && (UE.AttachInited = ! 0, t = document.getElementById("iknowWPBtn"), BDWidget.init(e.options.WP_KEY, function() {
						try {
							this.insertFrom({
								ele: t,
								onSuccess: function() {
									h.insert()
								},
								onSelect: function(e) {
									h.select(e)
								},
								onCancel: function() {
									h.cancel()
								},
								onLoad: function() {
									h.dialogopen()
								}
							})
						} catch(e) {
							"undefined" != typeof alog && alog("exception.fire", "catch", {
								msg: e.message,
								path: "common:widget/js/logic/editor/editor.js",
								method: "",
								ln: 11629
							})
						}
					}))
				}
				try {
					var o = this;
					e = this.editor,
					e.ui.uploadfile = t = function(e) {
						var t = "uploadfile",
						i = e.options.buttonConfig.attachment.list[t],
						n = + new Date,
						o = "swfuPlaceholder" + n,
						r = "swfuFlash" + n,
						a = "swfuProgress" + n,
						c = "swfuWealth" + n,
						u = new l({
							className: "edui-for-" + t,
							label: i,
							showText: ! 0,
							getHtmlTpl: function() {
								return '<div id="##">' + this.label + '</div><div class="ue_flash" id="' + r + '"><div id="' + o + '"></div></div>'
							},
							onmouseover: function() {
								this.addState("hover")
							},
							onmouseout: function() {
								this.removeState("hover")
							},
							getStateDom: function() {
								return s("#" + r)[0].parentNode
							}
						});
						return u.addListener("postrender", function() {
							for (var t = "", i = e.options.wealthList, n = document.createElement("div"), l = 0; l < i.length; l++) {
								var u = i[l];
								t += '<option value="' + u.key + '">' + u.value + "</option>"
							}
							n.id = a,
							n.innerHTML = '<div class="progressWrapper" style="display:none;"><div class="fileIcon icon_file_default"></div><div class="progressName textClip"></div><div class="progressSize"></div><div class="progressRename"><input class="progressRenameValue" type="text"><a class="btn btn-22-green progressRenameBtn" rel="nofollow"><em><b>\u786e\u5b9a</b></em></a></div><div class="progressMessage"></div><div class="progressBarWrapper"><div class="progressBar"></div><span class="progressBarText"></span></div><div class="progressWealthWrapper"><span class="progressWealthText">\u5b9a\u4ef7:</span><select name="wealth" class="progressWealth" id="' + c + '">' + t + '</select></div><a class="progressCancel" href="#">\u53d6\u6d88</a><div class="progressFileOperator"><a href="#" class="rename">\u91cd\u547d\u540d</a><a href="#" class="remove">\u5220\u9664</a></div></div>',
							e.ui.getDom().insertBefore(n, e.ui.getDom("iframeholder")),
							e._uploadFile = {
								fileInfo: null,
								backFileInfo: null,
								score: 0,
								status: "ready",
								errorCode: null
							},
							e.swfupload = new SWFUpload({
								flash_url: e.options.swfUploadFlashUrl,
								upload_url: e.options.swfUploadUrl,
								file_post_name: e.options.swfUploadPostName,
								file_types: "*.*",
								file_types_description: "All Files",
								file_queue_limit: 0,
								file_size_limit: "4 GB",
								custom_settings: {
									progressTarget: a,
									swfUploadUrl: e.options.swfUploadUrl,
									swfUploadDir: e.options.swfUploadDir,
									isLogin: e.options.isLogin,
									isInsertFromWangPan: ! 1,
									isEditorFile: ! 1,
									isUploading: ! 1,
									successCount: 0,
									currentFile: null,
									getUploadFile: function(t) {
										return void 0 == t && (t = "fileInfo"),
										e._uploadFile[t] || null
									},
									setUploadFile: function(t, i, n) {
										return e._uploadFile.hasOwnProperty(t) ? (n && e._uploadFile[t] ? e._uploadFile[t][n] = i: e._uploadFile[t] = i, ! 0) : ! 1
									},
									setBindUploadStatus: function(t, i) {
										e._uploadFile.status = t,
										e._uploadFile.errorCode = "error" == t ? i: null
									},
									setEditorStatusBar: function(t) {
										s(".f-red", e.container).length && s(".edui-editor-wordcount", e.container).eq(0).html(t)
									},
									hideAllPopup: function() {
										d.postHide()
									}
								},
								button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
								button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
								button_cursor: SWFUpload.CURSOR.HAND,
								button_placeholder_id: o,
								button_width: 70,
								button_height: 24,
								minimum_flash_version: "9.0.28",
								swfupload_pre_load_handler: swfUploadPreLoad,
								swfupload_loaded_handler: swfUploadLoaded,
								swfupload_load_failed_handler: swfUploadLoadFailed,
								file_dialog_start_handler: swfUploadFileDialogStart,
								file_dialog_complete_handler: swfUploadFileDialogComplete,
								file_queued_handler: swfUploadFileQueued,
								file_queue_error_handler: swfUploadFileQueueError,
								queue_complete_handler: swfUploadQueueComplete,
								upload_start_handler: swfUploadSendStart,
								upload_progress_handler: swfUploadSendProgress,
								upload_success_handler: swfUploadSendSuccess,
								upload_error_handler: swfUploadSendError,
								upload_complete_handler: swfUploadSendComplete
							}),
							e.setUploadFile = function(t, i) {
								editorSetUploadFile(t, i, e),
								document.getElementById(c).selectedIndex = t.fileInfo && t.fileInfo.wealth ? t.fileInfo.wealth: 0
							},
							e.getUploadFile = function() {
								var t = {};
								return t.status = e._uploadFile.status,
								t.errorCode = e._uploadFile.errorCode,
								t.fileInfo = e._uploadFile.fileInfo || {},
								t.fileInfo.wealth = document.getElementById(c).value,
								t
							},
							e.uploadAction = function(t, i) {
								editorSubmitUploadFile(t, e, i)
							};
							var f = function(e) {
								return document.getElementById(e)
							},
							h = f(r);
							/^[\s]*<object/i.test(h.innerHTML) || (h.title = "\u60a8\u7684Flash\u63d2\u4ef6\u7248\u672c\u8fc7\u4f4e\uff0c\u8bf7\u66f4\u65b0\u540e\u518d\u5c1d\u8bd5\uff01")
						}),
						u
					} (this.editor),
					e.ui.wangpan = i = function(e) {
						var t = "wangpan",
						i = e.options.buttonConfig.attachment.list[t],
						r = new l({
							className: "edui-for-" + t + " " + t,
							label: i,
							getHtmlTpl: function() {
								return '<div id="iknowWPBtn" onclick="$$._onClickWangpan(event);">' + this.label + "</div>"
							},
							onmouseover: function() {
								this.addState("hover")
							},
							onmouseout: function() {
								this.removeState("hover")
							},
							getStateDom: function() {
								return s("#iknowWPBtn")[0].parentNode
							},
							showText: ! 0
						});
						return r._onWangPanDialogOk = function() {},
						r.editor = e,
						o.addListener("postrender", function() {
							m.init(document.getElementById("iknowWPBtn")),
							n()
						}),
						e.addListener("attachresourceready", n),
						s.browser && s.browser.ie < 7 && (window.wangpanEditorForIE = e),
						r
					} (this.editor)
				} catch(r) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: r.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 11634
					})
				}
			},
            // alexmark
			getHtmlTpl: function() { 
				return '<div id="##" class="edui-attachpicker %%"><div class="edui-attachpicker-top"></div><div class="edui-attachpicker-body"><div class="edui-attachpicker-item edui-attachpicker-uploadfile" stateful _title="\u4e0a\u4f20\u6587\u4ef6\u5230\u7f51\u76d8">' + t.getHtmlTpl() + '</div><div class="edui-attachpicker-item edui-attachpicker-wangpan" stateful _title="\u4ece\u7f51\u76d8\u63d2\u5165\u6587\u4ef6">' + i.getHtmlTpl() + "</div></div></div>"
			},
			getStateDom: function() {
				return this.target
			},
			postRender: function() {
				t.fireEvent("postrender"),
				this.fireEvent("postrender")
			},
			_onClick: function(e) {
				try {
					d.postHide(e),
					this.isDisabled() || this.fireEvent("click")
				} catch(t) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: t.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 11660
					})
				}
			},
			_onMouseOver: function() {
				this.isDisabled() || this.fireEvent("mouseover")
			},
			_onMouseOut: function() {
				this.isDisabled() || this.fireEvent("mouseout")
			},
			_onClickWangpan: function(e) {
				try {
					d.postHide(e)
				} catch(t) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: t.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 11673
					})
				}
			},
			_UIBase_render: a.prototype.render
		},
		n.inherits(f, a),
		n.extend(f.prototype, o, ! 0)
	} (),
	UE.Editor.prototype.hasWordOverflow = function() {
		return this.getContentLength(!0) > this.options.maximumWords
	},
	UE.Editor.prototype.getIconName = function(e) {
		var t = {
			icon_file_image: "jpg,jpeg,gif,bmp,png,jpe,cur,svg,svgz,tif,tiff,ico",
			icon_file_visio: "vsd,vsdx",
			icon_file_pdf: "pdf",
			icon_file_word: "doc,docx,ods,ots,odt,rtf,dot,dotx,odm",
			icon_file_excel: "xls,xlsx,xlt,xltx,csv",
			icon_file_text: "txt,html,htm,xhtml,xml,js,css",
			icon_file_music: "wma,wav,mp3,aac,ra,ram,mp2,ogg,aif,mpega,amr,mid,midi",
			icon_file_video: "wmv,rmvb,mpeg4,mpeg2,flv,avi,3gp,mpga,qt,rm,wmz,wmd,wvx,wmx,wm,swf,mpg,mp4,mkv,mpeg,mov",
			icon_file_powerpoint: "ppt,pptx,pps,pot,ppsx,potx",
			icon_file_ipa: "ipa",
			icon_file_exe: "exe,msi",
			icon_file_zip: "zip,rar,7z,tar,gz",
			icon_file_apk: "apk",
			icon_file_default: "default",
			icon_file_torrent: "torrent"
		},
		n = {};
		for (i in t) {
			var o = t[i].split(",");
			for (j in o) n.hasOwnProperty(o[j]),
			void 0 == n[o[j]] && (n[o[j]] = i)
		}
		return n[e.toLowerCase()] ? n[e.toLowerCase()] : n["default"]
	},
	r.editor.ui.Toolbar.prototype.getHtmlTpl = function() {
		for (var e = [], t = 0; t < this.items.length; t++) e[t] = this.items[t].renderHtml();
		return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" >' + e.join("") + "</div>"
	},
	r.editor.ui.Button.prototype.getHtmlTpl = function() {
		return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"': "") + ' class="%%-body" onmousedown="return false;" onclick="return $$._onClick(event, this);" onmouseover="return $$._onMouseOver();" onmouseout="return $$._onMouseOut();">' + (this.showIcon ? '<div class="edui-box edui-icon"></div>': "") + (this.showText ? '<div class="edui-box edui-label">' + this.label + "</div>": "") + "</div></div></div></div>"
	},
	r.editor.ui.Button.prototype._onMouseOver = function() {
		this.isDisabled() || this.fireEvent("mouseover")
	},
	r.editor.ui.Button.prototype._onMouseOut = function() {
		this.isDisabled() || this.fireEvent("mouseout")
	};
	var E = UE.Editor.prototype._setup;
	UE.Editor.prototype._setup = function() {
		E.apply(this, arguments),
		this.fireEvent("selectionchange")
	},
	UE.Editor.prototype.initAttach = function() {
		try {
			this.attachment && (document.getElementById("edui_fixedlayer").style.display = "none", this.attachment.fireEvent("mouseover"), this.attachment.fireEvent("mouseout"), window.setTimeout(function() {
				document.getElementById("edui_fixedlayer").style.display = ""
			},
			500))
		} catch(e) {
			"undefined" != typeof alog && alog("exception.fire", "catch", {
				msg: e.message,
				path: "common:widget/js/logic/editor/editor.js",
				method: "",
				ln: 11772
			})
		}
	};
	var w = r.editor.ui.Combox.prototype.showPopup;
	r.editor.ui.Combox.prototype.showPopup = function() {
		w.apply(this, arguments),
		this.popup && (!r.editor.browser.ie || r.editor.browser.version > 6) && (this.popup.getDom().style.position = "fixed")
	},
	r.editor.ui.Popup.prototype.getHtmlTpl = function() {
		return '<div id="##" class="edui-popup %%"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1; display: none; left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="javascript:"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' + this.getContentHtmlTpl() + "  </div> </div></div>"
	},
	UE.plugins.autoheight = function() {
		function e() {
			var e = this;
			clearTimeout(o),
			r || (!e.queryCommandState || e.queryCommandState && 1 != e.queryCommandState("source")) && (o = setTimeout(function() {
				var t = e.body.lastChild;
				n = Math.max(C.getXY(t).y + t.offsetHeight + 25, Math.max(s.minFrameHeight, s.initialFrameHeight)),
				n != a && (n < e.options.initialMaxFrameHeight ? (e.setHeight(n), a = n, e.body.style.overflowY = "hidden", e.autoHeightEnabled = ! 0) : (e.setHeight(e.options.initialMaxFrameHeight), a = n, e.body.style.overflowY = i || "", e.autoHeightEnabled = ! 1))
			},
			50))
		}
		var t = this;
		if (t.autoHeightEnabled = t.options.autoHeightEnabled !== ! 1, t.autoHeightEnabled) {
			var i, n, o, r, a = 0,
			s = t.options;
			t.addListener("fullscreenchanged", function(e, t) {
				r = t
			}),
			t.addListener("destroy", function() {
				t.removeListener("contentchange afterinserthtml keyup mouseup", e)
			}),
			t.enableAutoHeight = function() {
				var t = this;
				if (t.autoHeightEnabled) {
					var n = t.document;
					t.autoHeightEnabled = ! 0,
					i = n.body.style.overflowY,
					n.body.style.overflowY = "hidden",
					t.addListener("contentchange afterinserthtml keyup mouseup", e),
					setTimeout(function() {
						e.call(t)
					},
					h.gecko ? 100: 0),
					t.fireEvent("autoheightchanged", t.autoHeightEnabled)
				}
			},
			t.disableAutoHeight = function() {
				t.body.style.overflowY = i || "",
				t.removeListener("contentchange", e),
				t.removeListener("keyup", e),
				t.removeListener("mouseup", e),
				t.autoHeightEnabled = ! 1,
				t.fireEvent("autoheightchanged", t.autoHeightEnabled)
			},
			t.addListener("ready", function() {
				t.enableAutoHeight();
				var i;
				C.on(h.ie ? t.body: t.document, h.webkit ? "dragover": "drop", function() {
					clearTimeout(i),
					i = setTimeout(function() {
						e.call(t)
					},
					100)
				})
			})
		}
	},
	UE.plugins.image = function() {
		var e = ! 0,
		t = this.options;
		UE.commands.insertimage = {
			execCommand: function(i, n) {
				var o = this;
				if (n.src) {
					var r;
					r = "<p><img " + (n.id ? ' id="' + n.id + '"': "") + ' src="' + n.src + '" ' + (n.data_ue_src ? ' data_ue_src="' + n.data_ue_src + '" ': "") + (n.width ? 'width="' + n.width + '" ': "") + (n.height ? ' height="' + n.height + '" ': "") + (n.alt ? ' alt="' + n.alt + '"': "") + "/></p>",
					o.execCommand("inserthtml", r),
					e && (o.setHeight(t.initialFrameHeight + t.heightIncrement), e = ! 1)
				}
			},
			queryCommandState: function() {
				var e = this.document.getElementsByTagName("img");
				return e.length > t.maxImagesCount - 1 ? - 2: 0
			}
		}
	},
	UE.commands.insertmap = {
		queryCommandState: function() {
			return 0 == this.document.getElementsByTagName("iframe").length ? 0: - 2
		}
	},
	UE.commands.deletemap = {
		execCommand: function() {
			var e = this.document.getElementsByTagName("iframe")[0];
			e && e.parentNode.removeChild(e)
		}
	},
	UE.plugins.video = function() {
		function e(e) {
			p.each(e.getNodesByTagName("img"), function(e) {
				if ("edui-faked-video" == e.getAttr("class")) {
					var t = ['<video style="display:none"', ' class="', e.getAttr("class"), '"', ' data_type="', e.getAttr("data_type"), '"', ' data_img="', e.getAttr("data_img"), '"', ' data_src="', e.getAttr("data_src"), '"', ' data_swf="', e.getAttr("data_swf"), '"', ' data_title="', e.getAttr("data_title"), '"', ' data_time="', e.getAttr("data_time"), '"', ' data_def="', e.getAttr("data_def"), '"', ' data_itemid="', e.getAttr("data_itemid"), '"', ">", "</video>"];
					e.parentNode.replaceChild(UE.uNode.createElement(t.join("")), e)
				}
			})
		}
		function t(e) {
			p.each(e.getNodesByTagName("video"), function(e) {
				if ("edui-faked-video" == e.getAttr("class")) {
					var t = ['<img src="http://img.iknow.bdimg.com/editor-video/video-bg.png"', ' class="', e.getAttr("class"), '" width=219 height=175', ' data_type="', e.getAttr("data_type"), '"', ' data_img="', e.getAttr("data_img"), '"', ' data_src="', e.getAttr("data_src"), '"', ' data_swf="', e.getAttr("data_swf"), '"', ' data_title="', e.getAttr("data_title"), '"', ' data_time="', e.getAttr("data_time"), '"', ' data_def="', e.getAttr("data_def"), '"', ' data_itemid="', e.getAttr("data_itemid"), '"', ">"];
					e.parentNode.replaceChild(UE.uNode.createElement(t.join("")), e)
				}
			})
		}
		var i = this;
		i.addOutputRule(function(t) {
			e(t)
		}),
		i.addInputRule(function(e) {
			t(e)
		}),
		i.commands.insertvideo = {
			execCommand: function(e, t) {
				var n = ['<img src="http://img.iknow.bdimg.com/editor-video/video-bg.png"', ' class="edui-faked-video" width=219 height=175', ' data_type="', t.type, '"', ' data_img="', t.img, '"', ' data_src="', t.src, '"', ' data_swf="', t.swf, '"', ' data_title="', t.title, '"', ' data_time="', t.time, '"', ' data_def="', t.def, '"', ' data_itemid="', t.itemid, '"', ">"];
				i.execCommand("inserthtml", n.join(""), ! 0)
			},
			queryCommandState: function() {
				var e = i.selection.getRange().getClosedNode(),
				t = e && "edui-faked-video" == e.className;
				return t ? 1: 0
			}
		}
	},
	function() {
		function e(t) {
			l && l.getTipContainer().size() && ! s.contains(l.getTipContainer().get(0), t.target) && (l.hide(), s(document).unbind("click", e))
		}
		function t(e, t) {
			var i = t - ("" + Math.abs(e)).length + 1;
			return Array(i > 0 ? i: 0).join(0) + e
		}
		function i(e) {
			var i = Math.floor(e / 86400),
			n = t(Math.floor(e / 3600) % 24, 2),
			o = t(Math.floor(e / 60) % 60, 2),
			r = "";
			return i && (r += i + "\u5929"),
			"00" != n && (r += n + "\u5c0f\u65f6"),
			"00" != o && (r += o + "\u5206\u949f"),
			r
		}
		var n = r.editor.dom.domUtils,
		o = r.editor.ui;
		o.buttons = {};
		var a = function(e) {
			return document.getElementById(e)
		};
		o.insertimage = function(e) {
			function t(e, t, i, n) {
				if (e) var o = setInterval(function() {
					0 == n && clearInterval(o),
					e[t] ? (e[t](), clearInterval(o)) : n--
				},
				i)
			}
			var i, s = e.options.buttonConfig.insertimage,
			l = s.title,
			d = s.hoverTitle,
			c = s.overflowMsg,
			u = "ue_con_" + + new Date,
			f = new o.Button({
				className: "edui-for-insertimage",
				title: d || "",
				label: l || "",
				alwalysHoverable: ! 0,
				postRender: function() {
					this.Stateful_postRender(),
					this.setDisabled(this.disabled),
					this.fireEvent("renderReady")
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-box %%" ' + (this.title ? 'title="' + this.title + '"': "") + '><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" class="%%-body" >' + (this.showIcon ? '<div class="edui-box edui-icon"></div>': "") + (this.showText ? '<div class="edui-box edui-label">' + this.label + "</div>": "") + '</div></div></div><div id="' + u + '" class="ue_flash"></div></div>'
				},
				onmouseover: function(e) {
					UE.ui.Popup.postHide(e)
				},
				showText: ! 0
			});
			return f.addListener("renderReady", function() {
				function t() {
					i && i.flashInit && i.flashInit() && (clearInterval(m), e.options.isLogin ? (i.setHandCursor(!0), i.setJSFuncName([p, g, v, b, y])) : i.setHandCursor(!1))
				}
				function o(e) {
					if (r.editor.browser.chrome) {
						var t = document.createElement("input");
						t.type = "text",
						t.style.height = "0",
						t.style.width = "0",
						e.container.parentNode.appendChild(t),
						setTimeout(function() {
							t.focus(),
							e.focus(),
							t.parentNode.removeChild(t)
						},
						1)
					}
				}
				function s(t, i) {
					var r = e.document.getElementById("ue_waitflag_" + t);
					r.hasLoaded = ! 1,
					i && r ? (r.setAttribute("data_ue_src", i), r.removeAttribute("id"), r.removeAttribute("_src"), r.onload = function() {
						if (!this.hasLoaded) {
							this.hasLoaded = ! 0;
							var t = e.document.createElement("span");
							t.style.cssText = "display:block;width:0;margin:0;padding:0;border:0;clear:both;",
							t.innerHTML = ".";
							var i = t.cloneNode(!0);
							e.selection.getRange().insertNode(i),
							n.scrollToView(i, n.getWindow(i), 0),
							i && i.parentNode.removeChild(i),
							e.fireEvent("contentchange")
						}
					},
					r.src = i) : r && r.parentNode.removeChild(r),
					o(e),
					e.fireEvent("contentchange")
				}
				n.on(f.getDom(), "mouseover", function() { ! f.isDisabled() && f.addState("hover")
				}),
				n.on(f.getDom(), "mouseout", function() {
					f.removeState("hover")
				});
				var l = "ue_flash_" + + new Date;
				r.swf.create({
					id: l,
					url: e.options.flashUrl,
					width: e.options.imgFlashWidth,
					height: e.options.imgFlashHeight,
					errorMessage: "\u60a8\u7684Flash\u63d2\u4ef6\u7248\u672c\u8fc7\u4f4e\uff0c\u8bf7\u66f4\u65b0\u540e\u518d\u5c1d\u8bd5\uff01",
					wmode: "transparent",
					ver: "9.0.0",
					vars: {
						width: e.options.imgFlashWidth,
						height: e.options.imgFlashHeight,
						fileExtension: e.options.acceptImageType,
						fileSize: e.options.imageMaxSize
					}
				},
				u);
				var c = a(u);
				c.children[0] || (h.firefox ? c.innerText = "": c.textContent = "", c.title = "\u60a8\u7684Flash\u63d2\u4ef6\u7248\u672c\u8fc7\u4f4e\uff0c\u8bf7\u66f4\u65b0\u540e\u518d\u5c1d\u8bd5\uff01");
				var m = setInterval(t, 50);
				i = r.swf.getMovie(l);
				var p = "ue_success" + + new Date,
				g = "ue_error" + + new Date,
				v = "ue_select" + + new Date,
				y = "ue_checkupload" + + new Date,
				b = "ue_logout" + + new Date;
				if (!e.options.isLogin) {
					var C = f.getDom(),
					N = a(C.id + "_body").children[1];
					N.style.color = "#999",
					C.setAttribute("title", d);
					var E = a(C.id + "_body").children[0];
					n.removeClasses(E, ["edui-icon"]),
					n.addClass(E, "edui_disableIcon"),
					n.addClass(N, "edui-label-disabled")
				}
				window[y] = function() {
					return e.fireEvent("flashClicked"),
					e.options.isLogin
				},
				window[v] = function(t) {
					if (e.fireEvent("imageBeforeUploadEvent"), t.errorNo) return void e.fireEvent("imageSizeError");
					var n = + new Date,
					o = e.options.waitImageUrl;
					e.execCommand("insertimage", {
						id: "ue_waitflag_" + n,
						src: o,
						data_ue_src: o
					}),
					e.fireEvent("contentchange");
					var r = e.options.customObj;
					r.position = n,
					r.editorIndex = u,
					i.upload(e.options.imageUrl, e.options.imageFieldName, r)
				},
				window[p] = function(t) {
					s(t.index, t.url ? e.options.imagePath + t.url: null),
					e.fireEvent("uploadSuccess", t)
				},
				window[b] = function() {
					e.fireEvent("isLogout")
				},
				window[g] = function(t) {
					s(t.index),
					e.fireEvent("networkError", t)
				}
			}),
			e.addListener("selectionchange", function() {
				var o = e.queryCommandState("insertimage"),
				r = f.getDom(),
				s = a(r.id + "_body").children[1];
				if (!e.options.isLogin) {
					f.setDisabled(!0),
					s.style.color = "#999",
					r.setAttribute("title", d);
					var l = a(r.id + "_body").children[0];
					return n.removeClasses(l, ["edui-icon"]),
					void n.addClass(l, "edui_disableIcon")
				}
				0 > o ? (f.setDisabled(!0), f.setChecked(!1), t(i, "disabledUpload", 200, 100), - 2 === o && (f.getDom().setAttribute("title", c), n.addClass(s, "edui-label-overflow"))) : (f.setDisabled(!1), f.setChecked(o), t(i, "enabledUpload", 200, 100), f.getDom().setAttribute("title", d), n.removeClasses(s, ["edui-label-overflow"]))
			}),
			f
		},
		o.insertmap = function(e) {
			var t = e.options.buttonConfig.insertmap,
			i = t.title,
			r = t.unTitle,
			s = t.hoverTitle,
			l = new o.Button({
				className: "edui-for-insertmap insertmap",
				title: s,
				label: i,
				alwalysHoverable: ! 0,
				onmouseover: function(e) {
					UE.ui.Popup.postHide(e)
				},
				onclick: function() {
					try {
						e.options.isLogin && e.fireEvent("showmap")
					} catch(t) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: t.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 12299
						})
					}
				},
				showText: ! 0
			});
			return l.addListener("renderReady", function() {
				if (!e.options.isLogin) {
					var t = l.getDom(),
					i = a(t.id + "_body").children[1],
					o = a(t.id + "_body").children[0];
					i.style.color = "#999",
					t.setAttribute("title", s),
					n.removeClasses(o, ["edui-icon"]),
					n.addClass(o, "edui_disableIcon")
				}
			}),
			e.addListener("selectionchange", function() {
				var t = e.queryCommandState("insertmap"),
				o = l.getDom(),
				d = a(o.id + "_body").children[1];
				if (!e.options.isLogin) {
					l.setDisabled(!0),
					l.setChecked(!1),
					l.getDom().setAttribute("title", s);
					var c = a(o.id + "_body").children[0];
					return n.removeClasses(c, ["edui-icon"]),
					void n.addClass(c, "edui_disableIcon")
				} - 1 == t ? (l.setDisabled(!0), l.setChecked(!1)) : - 2 == t ? (l.setDisabled(!1), l.setChecked(t), l.onclick = function() {
					try {
						e.execCommand("deletemap")
					} catch(t) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: t.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 12337
						})
					}
				},
				n.removeClasses(o, "insertmap"), n.addClass(o, "deletemap"), o.setAttribute("title", r), d.innerHTML = r) : (l.setDisabled(!1), l.setChecked(t), l.onclick = function() {
					try {
						e.fireEvent("showMap")
					} catch(t) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: t.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 12347
						})
					}
				},
				n.removeClasses(o, "deletemap"), n.addClass(o, "insertmap"), o.setAttribute("title", s), d.innerHTML = i)
			}),
			l
		},
		o.attachment = function(e) {
			function t() {
				i = new o.Popup({
					content: function() {
						var t = new o.AttachPicker({
							editor: e,
							Stateful_onMouseOut: function(t, i) {
								f.fireEvent("mouseout", arguments[0]);
								var n = s(i);
								n.hasClass("edui-attachpicker-uploadfile") ? e.ui.uploadfile.fireEvent("mouseout") : n.hasClass("edui-attachpicker-wangpan") && e.ui.wangpan.fireEvent("mouseout")
							},
							Stateful_onMouseOver: function(t, i) {
								f.fireEvent("mouseover", arguments[0]);
								var n = s(i);
								n.hasClass("edui-attachpicker-uploadfile") ? e.ui.uploadfile.fireEvent("mouseover") : n.hasClass("edui-attachpicker-wangpan") && e.ui.wangpan.fireEvent("mouseover")
							},
							Stateful_onMouseEnter: function(e, t) {
								this.Stateful_onMouseOver(e, t)
							},
							Stateful_onMouseLeave: function(e, t) {
								this.Stateful_onMouseOut(e, t)
							},
							Stateful_onMouseDown: function() {},
							Stateful_onMouseUp: function() {}
						});
						return t
					} (),
					editor: e,
					className: "edui-attachPop",
					hide: function(e) { ! this._hidden && this.getDom() && (this.getDom().style.left = "-10000px", this._hidden = ! 0, e || this.fireEvent("hide"))
					}
				}),
				i.render()
			}
			var i, r, l = "attachment",
			d = e.options.buttonConfig[l],
			c = d.title,
			u = d.hoverTitle,
			f = new o.Button({
				className: "edui-for-" + l,
				title: u,
				label: c || "",
				alwalysHoverable: ! 0,
				onmouseover: function(n) {
					r && clearTimeout(r),
					i || t(),
					e.options.isLogin && "uploading" != e._uploadFile.status && "finish" != e._uploadFile.status && (UE.ui.Popup.postHide(n), i.showAnchor(this.getDom()))
				},
				onmouseout: function(e) {
					r = setTimeout(function() {
						UE.ui.Popup.postHide(e)
					},
					500)
				},
				onclick: function(n) {
					try {
						i || t(),
						e.options.isLogin && "uploading" != e._uploadFile.status && "finish" != e._uploadFile.status && (UE.ui.Popup.postHide(n), i.showAnchor(this.getDom()))
					} catch(o) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: o.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 12389
						})
					}
				},
				theme: e.options.theme,
				showText: ! 0
			});
			return f.addListener("renderReady", function() {
				if (t(), ! e.options.isLogin) {
					var i = f.getDom(),
					o = a(i.id + "_body").children[1],
					r = a(i.id + "_body").children[0];
					o.style.color = "#999",
					i.setAttribute("title", u),
					n.removeClasses(r, ["edui-icon"]),
					n.addClass(r, "edui_disableIcon")
				}
			}),
			e.addListener("selectionchange", function(t, i, n) {
				var o = e.queryCommandState(l);
				e.options.isLogin && - 1 != o ? n || (f.setDisabled(!1), f.setChecked(o)) : (f.setDisabled(!0), f.setChecked(!1))
			}),
			e.attachment = f,
			f
		},
		o.insertvideo = function(e) {
			var t = "insertvideo",
			i = e.options.buttonConfig[t],
			r = i.title,
			s = i.hoverTitle,
			l = new o.Button({
				className: "edui-for-" + t,
				title: s,
				label: r || "",
				alwalysHoverable: ! 0,
				theme: e.options.theme,
				showText: ! 0,
				onclick: function() {
					try {
						e.fireEvent("showvideo", {
							ui: l
						})
					} catch(t) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: t.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 12494
						})
					}
				}
			});
			return l.addListener("renderReady", function() {
				if (!e.options.isLogin) {
					var t = l.getDom(),
					i = a(t.id + "_body").children[1],
					o = a(t.id + "_body").children[0];
					i.style.color = "#999",
					t.setAttribute("title", s),
					n.removeClasses(o, ["edui-icon"]),
					n.addClass(o, "edui_disableIcon")
				}
			}),
			e.addListener("selectionchange", function() {
				var t = e.queryCommandState("insertvideo"),
				i = l.getDom(),
				o = a(i.id + "_body").children[1];
				if (!e.options.isLogin) {
					l.setDisabled(!0),
					o.style.color = "#999",
					i.setAttribute("title", s);
					var r = a(i.id + "_body").children[0];
					return n.removeClasses(r, ["edui-icon"]),
					void n.addClass(r, "edui_disableIcon")
				} - 1 === t ? (l.setDisabled(!0), l.setChecked(!1)) : (l.setDisabled(!1), l.setChecked(!1))
			}),
			l
		};
		var l, d = ["bold", "italic"];
		s(d).each(function(t, r) {
			var d = r;
			o[d] = function(t) {
				var r = t.options.buttonConfig[d],
				c = r.title,
				u = t.options.isLogin && ("bold" != d || t.options.hasBoldPrivilege) && ("italic" != d || t.options.hasRedPrivilege),
				h = new o.Button({
					className: "edui-for-" + d + " " + d,
					label: c || "",
					alwalysHoverable: ! 0,
					onmouseover: function(t) {
						UE.ui.Popup.postHide(t),
						s(document).unbind("click", e),
						l && l.hide();
						var n = "",
						o = "",
						r = "",
						a = {
							closebox: ! 0,
							direction: "bottom",
							position: {
								my: "left bottom",
								at: "left top-10"
							},
							tooltipClass: "privilege-tip privilege-tip-" + d,
							autoDispose: ! 0
						};
						if (s.object.each(F.context("privilege"), function(e, t) {
							"bold" == d ? privilegeType = "replyBold": "italic" == d && (privilegeType = "replyRed"),
							t == privilegeType && ("bold" == d && (n = "/shop/view?id=901", o = "\u52a0\u7c97"), "italic" == d && (n = "/shop/view?id=898", o = "\u98d8\u7ea2"), u ? "1" == e.is_card && ("1" == e.days && e.remain_time <= 36e3 || "1" != e.days && e.remain_time <= 86400) && (r = "\u5269\u4f59\u6709\u6548\u671f\u8fd8\u6709" + i(e.remain_time) + '<br/><a href="' + n + '" target="_blank">\u7acb\u5373\u53bb\u5546\u57ce\u7eed\u671f\u5427</a>') : e.number > 0 ? (r = "\u60a8\u5df2\u8d2d\u4e70" + o + '\u7279\u6743\u5361<br/><a href="/ihome/myitem/index#footer" target="_blank">\u7acb\u5373\u4f7f\u7528\u5427</a>', a.width = 150) : (r = '<a href="' + n + '" target="_blank">\u7acb\u5373\u5230\u5546\u57ce\u5151\u6362</a>', a.width = 120))
						}), a.content = ['<p class="f-12">', r, "</p>"].join(""), "" != r) {
							var c = s("#" + h.id).eq(0);
							a.target = c,
							l = new f(a),
							l.show()
						}
						s(document).one("click", e)
					},
					onclick: function() {
						try {
							if (t.fireEvent("beforeexeccmd", d), ! u) return;
							t.execCommand(d)
						} catch(e) {
							"undefined" != typeof alog && alog("exception.fire", "catch", {
								msg: e.message,
								path: "common:widget/js/logic/editor/editor.js",
								method: "",
								ln: 12729
							})
						}
					},
					showText: ! 0
				});
				return h.addListener("renderReady", function() {
					if (!u) {
						var e = h.getDom(),
						t = a(e.id + "_body").children[1];
						t.style.color = "#999";
						var i = a(e.id + "_body").children[0];
						n.removeClasses(i, ["edui-icon"]),
						n.addClass(i, "edui_disableIcon")
					}
				}),
				t.addListener("selectionchange", function(e, i, o) {
					var r = t.queryCommandState(d),
					s = h.getDom(),
					l = a(s.id + "_body").children[1];
					if (!u) {
						l.style.color = "#999";
						var c = a(s.id + "_body").children[0];
						return n.removeClasses(c, ["edui-icon"]),
						void n.addClass(c, "edui_disableIcon")
					} - 1 == r ? (h.setDisabled(!0), h.setChecked(!1)) : o || (h.setDisabled(!1), h.setChecked(r))
				}),
				h
			}
		});
		for (var u, m = ["insertorderedlist", "insertunorderedlist", "autotypeset"], g = 0; u = m[g++];) ! function(e) {
			o[e] = function(t) {
				var i = t.options.buttonConfig[e],
				r = i.title,
				s = i.hoverTitle,
				l = t.options.isLogin && ("bold" != e || t.options.hasBoldPrivilege) && ("italic" != e || t.options.hasRedPrivilege),
				d = new o.Button({
					className: "edui-for-" + e + " " + e,
					title: s,
					label: r || "",
					alwalysHoverable: ! 0,
					onmouseover: function(e) {
						UE.ui.Popup.postHide(e)
					},
					onclick: function() {
						try {
							if (t.fireEvent("beforeexeccmd", e), l) t.execCommand(e);
							else if ("bold" == e || "italic" == e) {
								var i = "\u5440\uff0c\u4f60\u8fd8\u4e0d\u80fd\u4f7f\u7528\u56de\u7b54\u52a0\u7c97\u7279\u6743&gt;.&lt;<br>\u5feb\u767b\u5f55\u4e86\u770b\u770b\u7b26\u5408\u7279\u6743\u6761\u4ef6\u4e0d\uff01";
								t.options.isLogin && (i = ["\u5440\uff0c\u4f60\u8fd8\u4e0d\u80fd\u4f7f\u7528\u56de\u7b54\u52a0\u7c97\u7279\u6743&gt;.&lt;", '\u8fd8\u5dee<span style="color:#ed7e3b;font-weight:bold;">' + (("bold" == e ? 5: 10) - (F.context("user").highQualityNum || 0)) + '</span>\u4e2a<a target="_blank" href="http://zhidao.baidu.com/s/quality/">\u4f18\u8d28\u7b54\u6848</a>\u5c31\u53ef\u4ee5\u4e86\u54df\uff01', "\u4e3a\u4e86\u5f00\u542f\u52a0\u7c97\u7279\u6743\u800c\u52aa\u529b\u5427\uff0c\u52a0\u6cb9\u3002"].join("<br>")),
								t.options.isLogin && F.context("user").gradeIndex < 5 && (i = ["\u5440\uff0c\u4f60\u8fd8\u4e0d\u80fd\u4f7f\u7528\u56de\u7b54\u52a0\u7c97\u7279\u6743&gt;.&lt;", '\u5feb\u5347\u52305\u7ea7\uff0c\u518d\u6709<span style="color:#ed7e3b;font-weight:bold;">' + (("bold" == e ? 5: 10) - (F.context("user").highQualityNum || 0)) + '</span>\u4e2a<a target="_blank" href="http://zhidao.baidu.com/s/quality/">\u4f18\u8d28\u7b54\u6848</a>\u5c31\u53ef\u4ee5\u4e86\u54df\uff01', "\u4e3a\u4e86\u5f00\u542f\u52a0\u7c97\u7279\u6743\u800c\u52aa\u529b\u5427\uff0c\u52a0\u6cb9\u3002"].join("<br>")),
								"italic" == e && (i = i.replace(/\u52a0\u7c97/g, "\u52a0\u7ea2")),
								c.alert(i, {
									height: 180
								})
							}
						} catch(n) {
							"undefined" != typeof alog && alog("exception.fire", "catch", {
								msg: n.message,
								path: "common:widget/js/logic/editor/editor.js",
								method: "",
								ln: 12829
							})
						}
					},
					showText: ! 0
				});
				return d.addListener("renderReady", function() {
					if (!l) {
						var e = d.getDom(),
						t = a(e.id + "_body").children[1];
						t.style.color = "#999",
						e.setAttribute("title", s);
						var i = a(e.id + "_body").children[0];
						n.removeClasses(i, ["edui-icon"]),
						n.addClass(i, "edui_disableIcon")
					}
				}),
				t.addListener("selectionchange", function(i, o, r) {
					var c = t.queryCommandState(e),
					u = d.getDom(),
					f = a(u.id + "_body").children[1];
					if (!l) {
						d.setDisabled(!0),
						f.style.color = "#999",
						u.setAttribute("title", s);
						var h = a(u.id + "_body").children[0];
						return n.removeClasses(h, ["edui-icon"]),
						void n.addClass(h, "edui_disableIcon")
					} - 1 == c ? (d.setDisabled(!0), d.setChecked(!1)) : r || (d.setDisabled(!1), d.setChecked(c))
				}),
				d
			}
		} (u);
		o.insertcode = function(e) {
			var t = e.options.buttonConfig.insertcode,
			i = t.title || "\u4ee3\u7801\u8bed\u8a00",
			n = t.hoverTitle,
			r = e.options.insertcode || [],
			a = [];
			p.each(r, function(t, i) {
				a.push({
					label: t,
					value: i,
					theme: e.options.theme,
					renderLabelHtml: function() {
						return '<div class="edui-label %%-label" >' + (this.label || "") + "</div>"
					}
				})
			});
			var s = new o.Combox({
				editor: e,
				items: a,
				onselect: function(t, i) {
					e.execCommand("insertcode", this.items[i].value)
				},
				onbuttonclick: function() {
					try {
						this.showPopup()
					} catch(e) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: e.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 12902
						})
					}
				},
				title: n,
				initValue: i,
				className: "edui-for-insertcode",
				indexByValue: function(e) {
					if (e) for (var t, i = 0; t = this.items[i]; i++) if ( - 1 != t.value.indexOf(e)) return i;
					return - 1
				}
			});
			return e.addListener("selectionchange", function() {
				if (s.getDom().setAttribute("title", n), e.options.isLogin) {
					s.setDisabled(!1);
					var t = e.queryCommandValue("insertcode");
					if (!t) return void s.setValue(i);
					t && (t = t.replace(/['"]/g, "").split(",")[0]),
					s.setValue(t)
				} else s.setDisabled(!0)
			}),
			s
		},
		o.toggleeditor = function(e) {
			var t = e.options.buttonConfig.toggleeditor,
			i = t.title,
			n = (t.unTitle, new o.Button({
				className: "hideeditor",
				label: i
			}));
			return n.addListener("renderReady", function() {
				var t = n.getDom(),
				i = r.editor.dom.domUtils;
				i.on(t, "click", function() {
					try {
						i.hasClass(t, "hideeditor") ? (i.removeClasses(n, ["hideeditor"]), i.addClass(n, "showeditor"), e.fireEvent("hideEditor", e.ui.getDom())) : i.hasClass(t, "showeditor") && (i.removeClasses(iconBtn, ["showeditor"]), i.addClass(iconBtn, "hideeditor"), e.fireEvent("showEditor", e.ui.getDom()))
					} catch(o) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: o.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 12967
						})
					}
				})
			}),
			n
		},
		o.insertplace = function(e) {
			var t = e.options.buttonConfig.insertplace,
			i = t.title,
			r = t.unTitle,
			s = t.hoverTitle,
			l = new o.Button({
				className: "edui-for-insertplace insertplace",
				title: s,
				label: i,
				_onClick: function(t) {
					try {
						e.options.isLoginForPlace && e.fireEvent("showPlaceDialog", "add"),
						t.stopPropagation ? t.stopPropagation() : t.cancelBubble = ! 0
					} catch(i) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: i.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 12987
						})
					}
				},
				showText: ! 0
			});
			return l.addListener("renderReady", function() {
				var t = l.getDom(),
				o = a(t.id + "_body").children[1];
				e.options.isLoginForPlace ? (l.onclick = function() {
					try {
						e.fireEvent("showPlaceDialog", "add")
					} catch(t) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: t.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 13001
						})
					}
				},
				n.removeClasses(l, ["editplace"]), n.addClass(l, "insertplace"), o.innerHTML = i) : (o.style.color = "#999", l.onclick = function() {
					try {
						e.fireEvent("isLogout")
					} catch(t) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: t.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 12997
						})
					}
				}),
				t.onclick = function(e) {
					try {
						e = e || window.event,
						e.stopPropagation ? e.stopPropagation() : e.cancelBubble = ! 0
					} catch(e) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: e.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 13009
						})
					}
				}
			}),
			e.addListener("addPlace", function() {
				var t = a(l.getDom().id + "_body").children[1];
				return e.options.isLoginForPlace ? (l.onclick = function() {
					try {
						e.fireEvent("showPlaceDialog", "edit")
					} catch(t) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: t.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 13020
						})
					}
				},
				n.addClass(l, "editplace"), void(t.innerHTML = r)) : (t.style.color = "#999", void e.fireEvent("isLogout"))
			}),
			e.addListener("deletePlace", function() {
				var t = a(l.getDom().id + "_body").children[1];
				return e.options.isLoginForPlace ? (l.onclick = function() {
					try {
						e.fireEvent("showPlaceDialog", "add")
					} catch(t) {
						"undefined" != typeof alog && alog("exception.fire", "catch", {
							msg: t.message,
							path: "common:widget/js/logic/editor/editor.js",
							method: "",
							ln: 13033
						})
					}
				},
				n.removeClasses(l, ["editplace"]), n.addClass(l, "insertplace"), void(t.innerHTML = i)) : (t.style.color = "#999", void e.fireEvent("isLogout"))
			}),
			l
		}
	} (),
	function() {
		function e(e) {
			this.initOptions(e),
			this.initEditorUI()
		}
		var t = r.editor.utils,
		i = r.editor.ui.uiUtils,
		n = r.editor.ui.UIBase,
		a = r.editor.dom.domUtils,
		s = [];
		e.prototype = {
			uiName: "editor",
			initEditorUI: function() {
				function e(e, t) {
					e.setOpt({
						wordCount: ! 0,
						maximumWords: 1e4,
						wordCountMsg: e.options.wordCountMsg || e.getLang("wordCountMsg"),
						wordOverFlowMsg: e.options.wordOverFlowMsg || e.getLang("wordOverFlowMsg")
					});
					var i = e.options,
					n = i.maximumWords,
					o = i.wordCountMsg,
					r = i.wordOverFlowMsg,
					a = t.getDom("wordcount");
					if (i.wordCount) {
						var s = e.getContentLength(!0);
						s > n ? (a.innerHTML = r, e.fireEvent("wordcountoverflow")) : a.innerHTML = o.replace("{#leave}", n - s).replace("{#count}", s)
					}
				}
				try {
					this.editor.ui = this,
					this._dialogs = {},
					this.initUIBase(),
					this._initToolbars();
					var t = this.editor,
					i = this;
					t.addListener("ready", function() {
						function n() {
							e(t, i),
							a.un(t.document, "click", arguments.callee)
						}
						t.getDialog = function(e) {
							return t.ui._dialogs[e + "Dialog"]
						},
						a.on(t.window, "scroll", function(e) {
							r.editor.ui.Popup.postHide(e)
						}),
						t.ui._actualFrameWidth = t.options.initialFrameWidth,
						t.options.elementPathEnabled && (t.ui.getDom("elementpath").innerHTML = '<div class="edui-editor-breadcrumb">' + t.getLang("elementPathTip") + ":</div>"),
						t.options.wordCount && (a.on(t.document, "click", n), t.ui.getDom("wordcount").innerHTML = t.getLang("wordCountTip")),
						t.ui._scale(),
						t.options.scaleEnabled ? (t.autoHeightEnabled && t.disableAutoHeight(), i.enableScale()) : i.disableScale(),
						t.options.elementPathEnabled || t.options.wordCount || t.options.scaleEnabled || (t.ui.getDom("elementpath").style.display = "none", t.ui.getDom("wordcount").style.display = "none", t.ui.getDom("scale").style.display = "none"),
						t.selection.isFocus() && t.fireEvent("selectionchange", ! 1, ! 0)
					}),
					t.addListener("mousedown", function(e, t) {
						var i = t.target || t.srcElement;
						r.editor.ui.Popup.postHide(t, i)
					}),
					t.addListener("delcells", function() {
						UE.ui.edittip && new UE.ui.edittip(t),
						t.getDialog("edittip").open()
					});
					var n, s, l = ! 1;
					t.addListener("afterpaste", function() {
						t.queryCommandState("pasteplain") || (n = new r.editor.ui.Popup({
							content: new r.editor.ui.PastePicker({
								editor: t
							}),
							editor: t,
							className: "edui-wordpastepop"
						}), n.render(), l = ! 0)
					}),
					t.addListener("afterinserthtml", function() {
						clearTimeout(s),
						s = setTimeout(function() {
							if (n && (l || t.ui._isTransfer)) {
								var e = a.createElement(t.document, "span", {
									style: "line-height:0px;",
									innerHTML: "\ufeff"
								}),
								i = t.selection.getRange();
								i.insertNode(e);
								var r = o(e, "firstChild", "previousSibling");
								n.showAnchor(3 == r.nodeType ? r.parentNode: r),
								a.remove(e),
								delete t.ui._isTransfer,
								l = ! 1
							}
						},
						200)
					}),
					t.addListener("contextmenu", function(e, t) {
						r.editor.ui.Popup.postHide(t)
					}),
					t.addListener("keydown", function(e, t) {
						n && n.dispose(t);
						var i = t.keyCode || t.which;
						t.altKey && 90 == i && UE.ui.buttons.fullscreen.onclick()
					}),
					t.addListener("wordcount", function() {
						e(this, i)
					}),
					t.addListener("selectionchange", function() {
						t.options.elementPathEnabled && i[( - 1 == t.queryCommandState("elementpath") ? "dis": "en") + "ableElementPath"](),
						t.options.scaleEnabled && i[( - 1 == t.queryCommandState("scale") ? "dis": "en") + "ableScale"]()
					});
					var d = new r.editor.ui.Popup({
						editor: t,
						content: "",
						className: "edui-bubble",
						_onEditButtonClick: function() {
							try {
								this.hide(),
								t.ui._dialogs.linkDialog.open()
							} catch(e) {
								"undefined" != typeof alog && alog("exception.fire", "catch", {
									msg: e.message,
									path: "common:widget/js/logic/editor/editor.js",
									method: "",
									ln: 13210
								})
							}
						},
						_onImgEditButtonClick: function(e) {
							try {
								this.hide(),
								t.ui._dialogs[e] && t.ui._dialogs[e].open()
							} catch(i) {
								"undefined" != typeof alog && alog("exception.fire", "catch", {
									msg: i.message,
									path: "common:widget/js/logic/editor/editor.js",
									method: "",
									ln: 13215
								})
							}
						},
						_onImgSetFloat: function(e) {
							this.hide(),
							t.execCommand("imagefloat", e)
						},
						_setIframeAlign: function(e) {
							var t = d.anchorEl,
							i = t.cloneNode(!0);
							switch (e) {
							case - 2: i.setAttribute("align", "");
								break;
							case - 1: i.setAttribute("align", "left");
								break;
							case 1:
								i.setAttribute("align", "right")
							}
							t.parentNode.insertBefore(i, t),
							a.remove(t),
							d.anchorEl = i,
							d.showAnchor(d.anchorEl)
						},
						_updateIframe: function() {
							t._iframe = d.anchorEl,
							t.ui._dialogs.insertframeDialog.open(),
							d.hide()
						},
						_onRemoveButtonClick: function(e) {
							try {
								t.execCommand(e),
								this.hide()
							} catch(i) {
								"undefined" != typeof alog && alog("exception.fire", "catch", {
									msg: i.message,
									path: "common:widget/js/logic/editor/editor.js",
									method: "",
									ln: 13248
								})
							}
						},
						queryAutoHide: function(e) {
							return e && e.ownerDocument == t.document && ("img" == e.tagName.toLowerCase() || a.findParentByTagName(e, "a", ! 0)) ? e !== d.anchorEl: r.editor.ui.Popup.prototype.queryAutoHide.call(this, e)
						}
					});
					d.render(),
					t.options.imagePopup && (t.addListener("mouseover", function(e, i) {
						i = i || window.event;
						var n = i.target || i.srcElement;
						if (t.ui._dialogs.insertframeDialog && /iframe/gi.test(n.tagName)) {
							var o = d.formatHtml("<nobr>" + t.getLang("property") + ': <span onclick=$$._setIframeAlign(-2) class="edui-clickable">' + t.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">' + t.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">' + t.getLang("justifyright") + '</span>&nbsp;&nbsp; <span onclick="$$._updateIframe( this);" class="edui-clickable">' + t.getLang("modify") + "</span></nobr>");
							o ? (d.getDom("content").innerHTML = o, d.anchorEl = n, d.showAnchor(d.anchorEl)) : d.hide()
						}
					}), t.addListener("selectionchange", function(e, i) {
						if (i) {
							var n = "",
							o = "",
							r = t.selection.getRange().getClosedNode(),
							a = t.ui._dialogs;
							if (r && "IMG" == r.tagName) {
								var s = "insertimageDialog";
								if ( - 1 != r.className.indexOf("edui-faked-video") && (s = "insertvideoDialog"), - 1 != r.className.indexOf("edui-faked-webapp") && (s = "webappDialog"), - 1 != r.src.indexOf("http://api.map.baidu.com") && (s = "mapDialog"), - 1 != r.className.indexOf("edui-faked-music") && (s = "musicDialog"), - 1 != r.src.indexOf("http://maps.google.com/maps/api/staticmap") && (s = "gmapDialog"), r.getAttribute("anchorname") && (s = "anchorDialog", n = d.formatHtml("<nobr>" + t.getLang("property") + ': <span onclick=$$._onImgEditButtonClick("anchorDialog") class="edui-clickable">' + t.getLang("modify") + "</span>&nbsp;&nbsp;<span onclick=$$._onRemoveButtonClick('anchor') class=\"edui-clickable\">" + t.getLang("delete") + "</span></nobr>")), r.getAttribute("word_img") && (t.word_img = [r.getAttribute("word_img")], s = "wordimageDialog"), ! a[s]) return;
								o = "<nobr>" + t.getLang("property") + ': <span onclick=$$._onImgSetFloat("none") class="edui-clickable">' + t.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("left") class="edui-clickable">' + t.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("right") class="edui-clickable">' + t.getLang("justifyright") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("center") class="edui-clickable">' + t.getLang("justifycenter") + "</span>&nbsp;&nbsp;<span onclick=\"$$._onImgEditButtonClick('" + s + '\');" class="edui-clickable">' + t.getLang("modify") + "</span></nobr>",
								! n && (n = d.formatHtml(o))
							}
							if (t.ui._dialogs.linkDialog) {
								var l, c = t.queryCommandValue("link");
								if (c && (l = c.getAttribute("_href") || c.getAttribute("href", 2))) {
									var u = l;
									l.length > 30 && (u = l.substring(0, 20) + "..."),
									n && (n += '<div style="height:5px;"></div>'),
									n += d.formatHtml("<nobr>" + t.getLang("anthorMsg") + ': <a target="_blank" href="' + l + '" title="' + l + '" >' + u + '</a> <span class="edui-clickable" onclick="$$._onEditButtonClick();">' + t.getLang("modify") + '</span> <span class="edui-clickable" onclick="$$._onRemoveButtonClick(\'unlink\');"> ' + t.getLang("clear") + "</span></nobr>"),
									d.showAnchor(c)
								}
							}
							n ? (d.getDom("content").innerHTML = n, d.anchorEl = r || c, d.showAnchor(d.anchorEl)) : d.hide()
						}
					}))
				} catch(c) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: c.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 13351
					})
				}
			},
			_initToolbars: function() {
				try {
					for (var e = this.editor, t = this.toolbars || [], i = [], n = 0; n < t.length; n++) {
						for (var o = t[n], a = new r.editor.ui.Toolbar({
							theme: e.options.theme
						}), s = 0; s < o.length; s++) {
							var l = o[s],
							d = null;
							if ("string" == typeof l) {
								if (l = l.toLowerCase(), "|" == l && (l = "Separator"), r.editor.ui[l] && (d = new r.editor.ui[l](e)), "fullscreen" == l) {
									i && i[0] ? i[0].items.splice(0, 0, d) : d && a.items.splice(0, 0, d);
									continue
								}
							} else d = l;
							d && d.id && a.add(d)
						}
						i[n] = a
					}
					this.toolbars = i
				} catch(c) {
					"undefined" != typeof alog && alog("exception.fire", "catch", {
						msg: c.message,
						path: "common:widget/js/logic/editor/editor.js",
						method: "",
						ln: 13394
					})
				}
			},
			getHtmlTpl: function() {
				return '<div id="##" class="%%"><div id="##_toolbarbox" class="%%-toolbarbox">' + (this.toolbars.length ? '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' + this.renderToolbarBoxHtml() + "</div></div>": "") + '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;"><div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">' + this.editor.getLang("clickToUpload") + '</div><div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div><div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div><div style="height:0;overflow:hidden;clear:both;"></div></div></div><div id="##_iframeholder" class="%%-iframeholder"></div><div id="##_bottombar" class="%%-bottomContainer"><table><tr><td id="##_elementpath" class="%%-bottombar"></td><td id="##_wordcount" class="%%-wordcount"></td><td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td></tr></table></div><div id="##_scalelayer"></div></div>'
			},
			showWordImageDialog: function() {
				this.editor.execCommand("wordimage", "word_img"),
				this._dialogs.wordimageDialog.open()
			},
			renderToolbarBoxHtml: function() {
				for (var e = [], t = 0; t < this.toolbars.length; t++) e.push(this.toolbars[t].renderHtml());
				return e.join("")
			},
			setFullScreen: function(e) {
				var t = this.editor,
				i = t.container.parentNode.parentNode;
				if (this._fullscreen != e) {
					if (this._fullscreen = e, this.editor.fireEvent("beforefullscreenchange", e), r.editor.browser.gecko) var n = t.selection.getRange().createBookmark();
					if (e) {
						for (;
						"BODY" != i.tagName;) {
							var o = r.editor.dom.domUtils.getComputedStyle(i, "position");
							s.push(o),
							i.style.position = "static",
							i = i.parentNode
						}
						this._bakHtmlOverflow = document.documentElement.style.overflow,
						this._bakBodyOverflow = document.body.style.overflow,
						this._bakAutoHeight = this.editor.autoHeightEnabled,
						this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
						this._bakEditorContaninerWidth = t.iframe.parentNode.offsetWidth,
						this._bakAutoHeight && (t.autoHeightEnabled = ! 1, this.editor.disableAutoHeight()),
						document.documentElement.style.overflow = "hidden",
						document.body.style.overflow = "hidden",
						this._bakCssText = this.getDom().style.cssText,
						this._bakCssText1 = this.getDom("iframeholder").style.cssText,
						t.iframe.parentNode.style.width = "",
						this._updateFullScreen()
					} else {
						for (;
						"BODY" != i.tagName;) i.style.position = s.shift(),
						i = i.parentNode;
						this.getDom().style.cssText = this._bakCssText,
						this.getDom("iframeholder").style.cssText = this._bakCssText1,
						this._bakAutoHeight && (t.autoHeightEnabled = ! 0, this.editor.enableAutoHeight()),
						document.documentElement.style.overflow = this._bakHtmlOverflow,
						document.body.style.overflow = this._bakBodyOverflow,
						t.iframe.parentNode.style.width = this._bakEditorContaninerWidth + "px",
						window.scrollTo(0, this._bakScrollTop)
					}
					if (r.editor.browser.gecko && "true" === t.body.contentEditable) {
						var a = document.createElement("input");
						document.body.appendChild(a),
						t.body.contentEditable = ! 1,
						setTimeout(function() {
							a.focus(),
							setTimeout(function() {
								t.body.contentEditable = ! 0,
								t.selection.getRange().moveToBookmark(n).select(!0),
								r.editor.dom.domUtils.remove(a),
								e && window.scroll(0, 0)
							},
							0)
						},
						0)
					}
					"true" === t.body.contentEditable && (this.editor.fireEvent("fullscreenchanged", e), this.triggerLayout())
				}
			},
			_updateFullScreen: function() {
				if (this._fullscreen) {
					var e = i.getViewportRect();
					this.getDom().style.cssText = "border:0;position:absolute;left:0;top:" + (this.editor.options.topOffset || 0) + "px;width:" + e.width + "px;height:" + e.height + "px;z-index:" + (1 * this.getDom().style.zIndex + 100),
					i.setViewportOffset(this.getDom(), {
						left: 0,
						top: this.editor.options.topOffset || 0
					}),
					this.editor.setHeight(e.height - this.getDom("toolbarbox").offsetHeight - this.getDom("bottombar").offsetHeight - (this.editor.options.topOffset || 0)),
					h.gecko && window.onresize()
				}
			},
			_updateElementPath: function() {
				var e, t = this.getDom("elementpath");
				if (this.elementPathEnabled && (e = this.editor.queryCommandValue("elementpath"))) {
					for (var i, n = [], o = 0; i = e[o]; o++) n[o] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + o + '&quot;);">' + i + "</span>");
					t.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">' + this.editor.getLang("elementPathTip") + ": " + n.join(" &gt; ") + "</div>"
				} else t.style.display = "none"
			},
			disableElementPath: function() {
				var e = this.getDom("elementpath");
				e.innerHTML = "",
				e.style.display = "none",
				this.elementPathEnabled = ! 1
			},
			enableElementPath: function() {
				var e = this.getDom("elementpath");
				e.style.display = "",
				this.elementPathEnabled = ! 0,
				this._updateElementPath()
			},
			_scale: function() {
				function e() {
					p = a.getXY(s),
					g || (g = r.options.minFrameHeight + d.offsetHeight + c.offsetHeight),
					f.style.cssText = "position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:" + s.offsetWidth + "px;height:" + s.offsetHeight + "px;z-index:" + (r.options.zIndex + 1),
					a.on(o, "mousemove", t),
					a.on(l, "mouseup", i),
					a.on(o, "mouseup", i)
				}
				function t(e) {
					n();
					var t = e || window.event;
					y = t.pageX || o.documentElement.scrollLeft + t.clientX,
					b = t.pageY || o.documentElement.scrollTop + t.clientY,
					C = y - p.x,
					N = b - p.y,
					C >= v && (m = ! 0, f.style.width = C + "px"),
					N >= g && (m = ! 0, f.style.height = N + "px")
				}
				function i() {
					m && (m = ! 1, r.ui._actualFrameWidth = f.offsetWidth - 2, s.style.width = r.ui._actualFrameWidth + "px", r.setHeight(f.offsetHeight - c.offsetHeight - d.offsetHeight - 2)),
					f && (f.style.display = "none"),
					n(),
					a.un(o, "mousemove", t),
					a.un(l, "mouseup", i),
					a.un(o, "mouseup", i)
				}
				function n() {
					h.ie ? o.selection.clear() : window.getSelection().removeAllRanges()
				}
				var o = document,
				r = this.editor,
				s = r.container,
				l = r.document,
				d = this.getDom("toolbarbox"),
				c = this.getDom("bottombar"),
				u = this.getDom("scale"),
				f = this.getDom("scalelayer"),
				m = ! 1,
				p = null,
				g = 0,
				v = r.options.minFrameWidth,
				y = 0,
				b = 0,
				C = 0,
				N = 0,
				E = this;
				this.editor.addListener("fullscreenchanged", function(e, t) {
					if (t) E.disableScale();
					else if (E.editor.options.scaleEnabled) {
						E.enableScale();
						var i = E.editor.document.createElement("span");
						E.editor.body.appendChild(i),
						E.editor.body.style.height = Math.max(a.getXY(i).y, E.editor.iframe.offsetHeight - 20) + "px",
						a.remove(i)
					}
				}),
				this.enableScale = function() {
					1 != r.queryCommandState("source") && (u.style.display = "", this.scaleEnabled = ! 0, a.on(u, "mousedown", e))
				},
				this.disableScale = function() {
					u.style.display = "none",
					this.scaleEnabled = ! 1,
					a.un(u, "mousedown", e)
				}
			},
			isFullScreen: function() {
				return this._fullscreen
			},
			postRender: function() {
				n.prototype.postRender.call(this);
				for (var e = 0; e < this.toolbars.length; e++) this.toolbars[e].postRender();
				var t, i = this,
				o = r.editor.dom.domUtils,
				a = function() {
					clearTimeout(t),
					t = setTimeout(function() {
						i._updateFullScreen()
					})
				};
				o.on(window, "resize", a),
				i.addListener("destroy", function() {
					o.un(window, "resize", a),
					clearTimeout(t)
				})
			},
			showToolbarMsg: function(e, t) {
				if (this.getDom("toolbarmsg_label").innerHTML = e, this.getDom("toolbarmsg").style.display = "", ! t) {
					var i = this.getDom("upload_dialog");
					i.style.display = "none"
				}
			},
			hideToolbarMsg: function() {
				this.getDom("toolbarmsg").style.display = "none"
			},
			mapUrl: function(e) {
				return e ? e.replace("~/", this.editor.options.UEDITOR_HOME_URL || "") : ""
			},
			triggerLayout: function() {
				var e = this.getDom();
				e.style.zoom = "1" == e.style.zoom ? "100%": "1"
			}
		},
		t.inherits(e, r.editor.ui.UIBase);
		var l = {};
		UE.ui.Editor = function(i) {
			var n = new r.editor.Editor(i);
			n.options.editor = n,
			null !== n.options.themePath && t.loadFile(document, {
				href: n.options.themePath + n.options.theme + "/_css/ueditor.css",
				tag: "link",
				type: "text/css",
				rel: "stylesheet"
			});
			var o = n.render;
			return n.render = function(t) {
				function i() {
					if (n.setOpt({
						labelMap: n.options.labelMap || n.getLang("labelMap")
					}), new e(n.options), t && (t.constructor === String && (t = document.getElementById(t)), t && t.getAttribute("name") && (n.options.textarea = t.getAttribute("name")), t && /script|textarea/gi.test(t.tagName))) {
						var i = document.createElement("div");
						t.parentNode.insertBefore(i, t);
						var r = t.value || t.innerHTML;
						n.options.initialContent = /^[\t\r\n ]*$/.test(r) ? n.options.initialContent: r.replace(/>[\n\r\t]+([ ]{4})+/g, ">").replace(/[\n\r\t]+([ ]{4})+</g, "<").replace(/>[\n\r\t]+</g, "><"),
						t.className && (i.className = t.className),
						t.style.cssText && (i.style.cssText = t.style.cssText),
						/textarea/i.test(t.tagName) ? (n.textarea = t, n.textarea.style.display = "none") : (t.parentNode.removeChild(t), t.id && (i.id = t.id)),
						t = i,
						t.innerHTML = ""
					}
					a.addClass(t, "edui-" + n.options.theme),
					n.ui.render(t);
					var s = n.options;
					n.container = n.ui.getDom();
					for (var l, d = a.findParents(t, ! 0), c = [], u = 0; l = d[u]; u++) c[u] = l.style.display,
					l.style.display = "block";
					s.minFrameWidth = s.initialFrameWidth ? s.initialFrameWidth: s.initialFrameWidth = t.offsetWidth,
					s.initialFrameHeight ? s.minFrameHeight = s.initialFrameHeight: s.initialFrameHeight = s.minFrameHeight = t.offsetHeight;
					for (var l, u = 0; l = d[u]; u++) l.style.display = c[u];
					t.style.height && (t.style.height = ""),
					n.container.style.width = s.initialFrameWidth + "px",
					n.container.style.zIndex = s.zIndex,
					o.call(n, n.ui.getDom("iframeholder"))
				}
				t.constructor === String && (n.key = t, l[t] = n),
				n.langIsReady ? i() : n.addListener("langReady", i)
			},
			n
		},
		UE.getEditor = function(e, t) {
			var i = l[e];
			return i || (i = l[e] = new UE.ui.Editor(t), i.render(e)),
			i
		},
		UE.delEditor = function(e) {
			var t;
			(t = l[e]) && (t.key && t.destroy(), delete l[e])
		}
	} (),
	UE.plugins.iknowFilter = function() {
		this.addOutputRule(function(e) {
			e.traversal(function(e) {
				switch (e.tagName) {
				case "img":
					var t = e.getAttr("src"),
					i = e.getAttr("_src");
					e.setAttr(),
					t && e.setAttr("src", t),
					i && e.setAttr("_src", i)
				}
			})
		})
	},
	n.exports = UE.ui.Editor,
	n.exports.config = l
} ()
});;
define("common:widget/js/logic/editor/addon/addon.js", function(n, t, e) {
	function o() {
		var t = p("<div/>").addClass("ik-authcode-outer").appendTo(u).hide(),
		e = n("common:widget/js/logic/authcode/authcode.js"),
		o = ! 1;
		c.instance.addListener("focus", function() {
			o || (c.config.optionList.modify = ! 0, c.authcode || (c.authcode = new e({
				container: t,
				from: r.authcode
			})), o = ! 0)
		})
	}
	function a() {
		var n = p('<a href="#"/>').addClass("btn-32-green grid-r").html(r.submitBtn || "\u786e\u5b9a").appendTo(u);
		return ("answer" == c.type || "modifyanswer" == c.type) && n.attr("alog-action", "qb-ans-sb"),
		n
	}
	function d() {
		var n = p('<input type="checkbox" name="md" />');
		return p("<label/>").addClass("unname").attr({
			"alog-action": "qb-unname"
		}).append(n).append(p("<span/>").html("\u533f\u540d")).appendTo(u),
		n
	}
	function i() {
		return p("<p/>").html(r.text).appendTo(u)
	}
	function s(n) {
		n && n.config && n.style && (c = n, r = n.style.addons, u = c.addonsContainer = p("<div/>").addClass("addons line").appendTo(c.container), r.authcode && o(), r.submitBtn && (c.submitBtn = a()), r.anonymouse && n.style.isLogin && (c.anonymouse = d()), r.text && (c.addtext = i()))
	}
	var c, u, r, p = n("common:widget/lib/jquery/jquery.js");
	e.exports.init = s
});;
define("common:widget/js/logic/editor/config/config.js", function(e, a, i) {
	var t = (e("common:widget/lib/jquery/jquery.js"), e("common:widget/js/util/uri/uri.js")),
	o = ['body{margin:0;padding:6px 8px;font:14px/20px arial,"\\5B8B\\4F53";cursor:text;}', "p{margin:1px 0;padding:0;cursor:text;word-wrap:break-word;vertical-align:baseline \\0;}", "p img{vertical-align:bottom;*vertical-align:-3px;}", "img{border:0;}", "iframe{width:430px;height:310px;border:1px solid #ccc;}", "#initContent{color:#ccc;}", "ol,ul{margin-top:0;margin-bottom:0;margin-left:0;padding-left:2em;}", "ol{*margin-left:2px;}", "body.view{padding:6px 8px;}", "strong{color:#4c4c4c;}", "em{font-style:normal;color:#e0435d;}", "strong em, em strong{color:#e0435d;}"],
	l = window.location.pathname,
	n = window.UEDITOR_HOME_URL || l.substr(0, l.lastIndexOf("/") + 1).replace("_examples/", "").replace("website/", ""),
	r = "http://zhidao.baidu.com",
	s = {
		imageUrl: r + "/submit/ajax/",
		imageFieldName: "image",
		imagePath: "",
		imageMaxSize: "5",
		waitImageUrl: "http://img.baidu.com/img/iknow/editor/uploading.gif",
		indexFlagFieldName: "position",
		flashUrl: t.zhidaoSwf,
		imgFlashWidth: 48,
		imgFlashHeight: 22,
		maxImagesCount: 20,
		langPath: null,
		themePath: null,
		customObj: {
			cm: 100672,
			encryptedBDUSS: F.context("user").encryptedBDUSS || null
		},
		heightIncrement: 0,
		isLogin: ! 0,
		acceptImageType: "*.jpg;*.png;*.gif;*.bmp",
		className: "iknow-editor",
		autoSaveEnabled: ! 0,
		autoSaveFrequency: 60,
		toolbars: [["insertimage", "|", "insertunorderedlist", "|", "insertorderedlist", "|", "autotypeset", "|", "insertmap"]],
		buttonConfig: {},
		insertcode: {
			as3: "ActionScript3",
			bash: "Bash/Shell",
			cpp: "C/C++",
			css: "Css",
			csharp: "C#",
			delphi: "Delphi",
			groovy: "Groovy",
			html: "Html",
			java: "Java",
			js: "Javascript",
			pl: "Perl",
			php: "Php",
			python: "Python",
			ruby: "Ruby",
			scala: "Scala",
			sql: "Sql",
			vb: "Vb",
			xml: "Xml"
		},
		initialStyle: o.join(""),
		iframeCssUrl: "",
		initialContent: "",
		autoClearinitialContent: ! 0,
		maxUndoCount: 20,
		maxInputCount: 20,
		pasteplain: ! 0,
		textarea: "editorValue",
		focus: ! 1,
		minFrameHeight: 190,
		maxFrameHeight: 420,
		initialFrameHeight: 190,
		initialMaxFrameHeight: 420,
		autoHeightEnabled: ! 0,
		enterTag: "p",
		wordCount: ! 0,
		maximumWords: 1499,
		tabSize: 4,
		tabNode: "&nbsp;",
		zIndex: 0,
		readonly: ! 1,
		messages: {
			wordCountMsg: "\u60a8\u8fd8\u53ef\u4ee5\u8f93\u5165{#leave} \u4e2a\u5b57",
			wordOverFlowMsg: "\u8f93\u5165\u5185\u5bb9\u5df2\u7ecf\u8fbe\u5230\u957f\u5ea6\u9650\u5236\uff0c\u8bf7\u5220\u51cf"
		},
		autotypeset: {
			mergeEmptyline: ! 0,
			indent: ! 0,
			indentValue: "2em"
		},
		serialize: {
			blackList: {
				style: 1,
				link: 1,
				object: 1,
				applet: 1,
				input: 1,
				meta: 1,
				base: 1,
				button: 1,
				select: 1,
				textarea: 1,
				"#comment": 1,
				map: 1,
				area: 1
			}
		},
		UEDITOR_HOME_URL: n,
		swfUploadFlashUrl: t.fileUploaderSwf,
		swfUploadUrl: "https://pcs.baidu.com/rest/2.0/pcs/file?method=upload&app_id=598913&response-status=200&ondup=newcopy",
		swfUploadDir: "/apps/\u767e\u5ea6\u77e5\u9053/",
		swfUploadPostName: "file",
		WP_KEY: "598913",
		wealthList: [{
			key: "0",
			value: "\u514d\u8d39"
		},
		{
			key: "1",
			value: "1 \u8d22\u5bcc\u503c"
		},
		{
			key: "2",
			value: "2 \u8d22\u5bcc\u503c"
		},
		{
			key: "3",
			value: "3 \u8d22\u5bcc\u503c"
		},
		{
			key: "4",
			value: "4 \u8d22\u5bcc\u503c"
		},
		{
			key: "5",
			value: "5 \u8d22\u5bcc\u503c"
		}],
		imgErrorNum: {
			0: "\u56fe\u7247\u63d0\u4ea4\u6210\u529f",
			1: '<p class="ik-neweditor-clew">\u56fe\u7247\u63d0\u4ea4\u5931\u8d25\uff01</p>',
			2: '<p class="ik-neweditor-clew">\u56fe\u7247\u4eca\u65e5\u4e0a\u4f20\u5f20\u6570\u8d85\u9650\uff01</p>',
			3: '<p class="ik-neweditor-clew">\u56fe\u7247\u6587\u4ef6\u8fc7\u5927\uff01</p>',
			4: ' <p class="ik-neweditor-clew">\u56fe\u7247\u7c7b\u578b\u9519\u8bef\uff01</p><p class="ik-neweditor-clewmore">\u6ce8\uff1a\u5927\u5c0f\u4e0d\u8d85\u8fc75M\uff0c\u652f\u6301JPG/PNG/BMP/GIF\u7b49\u683c\u5f0f</p>',
			13: '<p class="ik-neweditor-clew">\u60a8\u6ca1\u6709\u7ed1\u5b9a\u624b\u673a\u53f7\uff01</p>',
			265: '<p class="ik-neweditor-clew">\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u60a8\u767b\u5f55\u6216\u6ce8\u518c\u540e\u63d0\u4ea4\u56de\u7b54\uff01</p>'
		}
	};
	i.exports = s
});;
define("common:widget/js/logic/editor/fileUploader/fileUploader.js", function(require, exports, module) {
	function FileProgress(e, s) {
		this.swfupload = s,
		this.getIconName = function(e) {
			var s = {
				icon_file_image: "jpg,jpeg,gif,bmp,png,jpe,cur,svg,svgz,tif,tiff,ico",
				icon_file_visio: "vsd,vsdx",
				icon_file_pdf: "pdf",
				icon_file_word: "doc,docx,ods,ots,odt,rtf,dot,dotx,odm",
				icon_file_excel: "xls,xlsx,xlt,xltx,csv",
				icon_file_text: "txt,html,htm,xhtml,xml,js,css",
				icon_file_music: "wma,wav,mp3,aac,ra,ram,mp2,ogg,aif,mpega,amr,mid,midi",
				icon_file_video: "wmv,rmvb,mpeg4,mpeg2,flv,avi,3gp,mpga,qt,rm,wmz,wmd,wvx,wmx,wm,swf,mpg,mp4,mkv,mpeg,mov",
				icon_file_powerpoint: "ppt,pptx,pps,pot,ppsx,potx",
				icon_file_ipa: "ipa",
				icon_file_exe: "exe,msi",
				icon_file_zip: "zip,rar,7z,tar,gz",
				icon_file_apk: "apk",
				icon_file_default: "default",
				icon_file_torrent: "torrent"
			},
			t = {};
			for (i in s) {
				var r = s[i].split(",");
				for (j in r) t.hasOwnProperty(r[j]),
				void 0 == t[r[j]] && (t[r[j]] = i)
			}
			return t[e.toLowerCase()] ? t[e.toLowerCase()] : t["default"]
		},
		this.getShortName = function(e, s) {
			s || (s = 27);
			for (var t = 0, r = 0; t < e.length && (null != e.charAt(t).match(/[^\x00-\xff]/g) ? r += 2: r++, ! (r > s)); t++);
			return e.substr(0, t) + (t >= e.length ? "": "...")
		},
		this.getFileSize = function(e) {
			var s = ["B", "K", "M", "G", "T"],
			t = Math.min(Math.max(Math.floor(Math.log(e) / Math.LN2 / 10), 1), 5);
			return Math.round(100 * e / Math.pow(2, 10 * t)) / 100 + s[t]
		},
		this.fileProgressWrapper = document.getElementById(s.customSettings.progressTarget).firstChild,
		this.fileIcon = T(".fileIcon", this.fileProgressWrapper)[0],
		this.progressName = T(".progressName", this.fileProgressWrapper)[0],
		this.progressSize = T(".progressSize", this.fileProgressWrapper)[0],
		this.progressRename = T(".progressRename", this.fileProgressWrapper)[0],
		this.progressRenameValue = T(".progressRenameValue", this.fileProgressWrapper)[0],
		this.progressMessage = T(".progressMessage", this.fileProgressWrapper)[0],
		this.progressBarWrapper = T(".progressBarWrapper", this.fileProgressWrapper)[0],
		this.progressBar = T(".progressBar", this.fileProgressWrapper)[0],
		this.progressBarText = T(".progressBarText", this.fileProgressWrapper)[0],
		this.progressCancel = T(".progressCancel", this.fileProgressWrapper)[0],
		this.progressWealthWrapper = T(".progressWealthWrapper", this.fileOperator)[0],
		this.fileOperator = T(".progressFileOperator", this.fileProgressWrapper)[0],
		this.fileOperatorRename = T("a.rename", this.fileOperator)[0],
		this.fileOperatorDelete = T("a.remove", this.fileOperator)[0],
		this.setFileInfo(e.name, e.size)
	}
	var T = require("common:widget/js/util/tangram/tangram.js"),
	Dialog = require("common:widget/js/ui/dialog/dialog.js"),
	SWFUpload = require("common:widget/lib/swfupload/swfupload.js");
	FileProgress.prototype.setFileInfo = function(e, s, t) {
		var r;
		t || (this.progressName.innerHTML = this.getShortName(e, 27), this.progressName.setAttribute("title", e)),
		this.swfupload.customSettings.currentFile && (this.swfupload.customSettings.currentFile.name = e),
		null != s && (this.progressSize.innerHTML = "(" + this.getFileSize(s) + ")"),
		r = e.match(/\.([^\.]+)$/),
		this.fileIcon.className = null != r ? "fileIcon " + this.getIconName(r[1]) : "fileIcon " + this.getIconName("")
	},
	FileProgress.prototype.setStatus = function(e, s, t, r) {
		var o, i = "",
		a = this.swfupload;
		switch (this.progressMessage.innerHTML = s || "", e) {
		case "ready":
			a.customSettings.setBindUploadStatus("ready"),
			i = "1,1,1,0,0,0,0,1,1,1";
			break;
		case "uploading":
			void 0 != r && (this.progressMessage.innerHTML = r, this.progressBar.style.width = r + "%", this.progressBarText.innerHTML = (r >= 100 ? 99: r) + "%"),
			this.progressBar.className = "progressBar",
			this.fileProgressWrapper.className = "progressWrapper",
			a.customSettings.setBindUploadStatus("uploading"),
			i = "1,1,1,0,0,1,1,0,0,0";
			break;
		case "finish":
			this.progressBar.style.width = "99%",
			this.progressBarText.innerHTML = "99%",
			a.customSettings.setBindUploadStatus("finish"),
			i = "1,1,1,0,0,1,1,0,0,0";
			break;
		case "complete":
			this.progressBar.style.width = "",
			this.progressBarText.innerHTML = "100%",
			this.progressBar.className = "progressBar progressBarComplete",
			a.customSettings.setBindUploadStatus("complete"),
			i = "1,1,1,0,0,1,0,1,1,1",
			a.customSettings.setEditorStatusBar("");
			break;
		case "error":
			this.progressBar.style.width = "",
			this.fileProgressWrapper.className = "progressWrapper progressWrapperError",
			void 0 != t ? a.customSettings.setBindUploadStatus("error", t) : a.customSettings.setBindUploadStatus("error", - 1),
			i = "1,1,1,0,1,0,0,0,0,1";
			break;
		case "setfilesuccess":
			this.progressBar.style.width = "",
			this.progressBarText.innerHTML = "100%",
			this.progressBar.className = "progressBar",
			a.customSettings.setBindUploadStatus("complete"),
			i = "1,1,1,0,0,1,0,1,1,1";
			break;
		case "setfileerror":
			this.fileProgressWrapper.className = "progressWrapper progressWrapperError",
			this.progressMessage.innerHTML = s,
			a.customSettings.setBindUploadStatus("error", - 1),
			i = "0,0,0,0,1,0,0,0,0,1";
			break;
		case "renamestart":
			i = "1,0,0,1,0,0,0,0,0,0";
			break;
		case "renamecomplete":
			a.customSettings.setBindUploadStatus("complete"),
			i = "1,1,1,0,0,1,0,1,1,1";
			break;
		case "renameerror":
			this.fileProgressWrapper.className = "progressWrapper progressWrapperError",
			a.customSettings.setBindUploadStatus("error", - 1),
			i = "1,0,0,1,1,0,0,0,0,0";
			break;
		default:
			i = "1,1,1,0,0,0,0,0,0,0"
		}
		o = i.split(","),
		a.customSettings.isEditorFile && (o[5] = 0),
		this.fileIcon.style.display = "1" == o[0] ? "block": "none",
		this.progressName.style.display = "1" == o[1] ? "block": "none",
		this.progressSize.style.display = "1" == o[2] ? "block": "none",
		this.progressRename.style.display = "1" == o[3] ? "block": "none",
		this.progressMessage.style.display = "1" == o[4] ? "block": "none",
		this.progressBarWrapper.style.display = "1" == o[5] ? "block": "none",
		this.progressCancel.style.display = "1" == o[6] ? "block": "none",
		this.progressWealthWrapper.style.display = "1" == o[7] ? "block": "none",
		this.fileOperatorRename.style.display = "1" == o[8] ? "inline": "none",
		this.fileOperatorDelete.style.display = "1" == o[9] ? "inline": "none",
		this.fileProgressWrapper.style.display = "block"
	},
	window.swfUploadPreLoad = function() {},
	window.swfUploadLoaded = function() {
		try {
			SWFUpload.SERVER_ERROR = {
				31042: "\u60a8\u5c1a\u672a\u767b\u5f55",
				31061: "\u5df2\u5b58\u5728\u540c\u540d\u6587\u4ef6",
				31062: "\u6587\u4ef6\u540d\u79f0\u975e\u6cd5",
				31073: "\u91cd\u547d\u540d\u5931\u8d25",
				31218: "\u5bb9\u91cf\u8d85\u51fa\u9650\u989d"
			};
			var e = this;
			e.customSettings.cancelHandler = function(s) {
				var t = e.progress;
				s.preventDefault(),
				e.cancelUpload(e.customSettings.currentFile.id),
				e.customSettings.successCount = 0,
				e.customSettings.isUploading = ! 1,
				t.setStatus("ready"),
				T(t.fileProgressWrapper).hide()
			},
			e.customSettings.deleteHandler = function(s) {
				var t = e.progress,
				r = e.customSettings.getUploadFile();
				if (s.preventDefault(), e.customSettings.successCount = 0, e.customSettings.setUploadFile("fileInfo", null), t.setStatus("ready"), T(t.fileProgressWrapper).hide(), e.customSettings.isEditorFile) e.customSettings.setUploadFile("backFileInfo", ! 0, "delete");
				else {
					var o = e.customSettings.swfUploadDir;
					r && r.path.substr(0, o.length) == o && ! e.customSettings.isInsertFromWangPan && T.ajax({
						url: encodeURI("https://pcs.baidu.com/rest/2.0/pcs/file?method=delete&app_id=598913&response-status=200&op=permanent&fs_id=" + r.fs_id),
						dataType: "jsonp",
						success: function() {}
					})
				}
				e.customSettings.setEditorStatusBar("")
			},
			e.customSettings.inputHandler = function(s) {
				13 == s.keyCode && e.customSettings.doRenameHandler()
			},
			e.customSettings.renameHandler = function(s) {
				var t = e.progress;
				s.preventDefault(),
				t.setStatus("renamestart"),
				t.progressRenameValue.value = t.progressName.title,
				function(e, s, t) {
					if (e.createTextRange) {
						var r = e.createTextRange();
						r.collapse(!0),
						r.moveStart("character", s),
						r.moveEnd("character", t),
						r.select()
					} else e.setSelectionRange ? e.setSelectionRange(s, t) : e.selectionStart && (e.selectionStart = s, e.selectionEnd = t)
				} (t.progressRenameValue, 0, t.progressRenameValue.value.lastIndexOf(".")),
				t.progressRenameValue.focus()
			},
			e.customSettings.doRenameHandler = function() {
				var s = e.progress,
				t = T.string(s.progressRenameValue.value).trim();
				if (/\.((jpg)|(jpeg)|(gif)|(bmp)|(png)|(jpe)|(cur)|(tif)|(tiff)|(ico))$/i.test(t)) s.setStatus("renameerror", "\u4e0d\u5141\u8bb8\u6539\u6210\u56fe\u7247\u683c\u5f0f");
				else if (/[\\\/:\*\?"<>|]/.test(t)) s.setStatus("renameerror", '\u6587\u4ef6\u540d\u4e0d\u80fd\u5305\u542b\u4e0b\u5217\u5b57\u7b26 \\ / : * ? " < > |');
				else {
					var r = s.progressName.title,
					o = e.customSettings.getUploadFile().path,
					i = o.substr(0, o.lastIndexOf("/") + 1) + t;
					o != i && e.customSettings.isEditorFile ? (e.customSettings.setUploadFile("backFileInfo", i, "rename"), s.setFileInfo(t), s.setStatus("renamecomplete")) : "" != t && t != r.substr(r.lastIndexOf(".") + 1) && t != r && i != o ? T.ajax({
						url: encodeURI("https://pcs.baidu.com/rest/2.0/pcs/file?method=move&app_id=598913&response-status=200&from=" + o + "&to=" + i),
						dataType: "jsonp",
						success: function(r) {
							r.error_code ? 31218 == r.error_code || 31112 == r.error_code ? s.setStatus("renameerror", '<span>\u7f51\u76d8\u5df2\u6ee1</span><a href="http://yun.baidu.com/disk/award" class="progressExtend" target="_blank">\u6269\u5bb9</a>') : s.setStatus("renameerror", SWFUpload.SERVER_ERROR[r.error_code]) : (s.setStatus("renamecomplete"), s.setFileInfo(t), e.progress.setFileInfo(t), e.customSettings.setUploadFile("fileInfo", i, "path"))
						}
					}) : s.setStatus("complete")
				}
			};
			var s = document.getElementById(e.customSettings.progressTarget).firstChild,
			t = T(".progressCancel", s)[0],
			r = T(".progressRenameValue", s)[0],
			o = T(".progressRenameBtn", s)[0],
			i = T(".progressFileOperator a", s)[0],
			a = T(".progressFileOperator a", s)[1];
			T(t).on("click", e.customSettings.cancelHandler),
			T(i).on("click", e.customSettings.renameHandler),
			T(r).on("keyup", e.customSettings.inputHandler),
			T(o).on("click", e.customSettings.doRenameHandler),
			T(a).on("click", e.customSettings.deleteHandler),
			e.customSettings.isEditorFile ? e.customSettings.getUploadFile() ? e.customSettings.setBindUploadStatus("complete") : e.customSettings.setBindUploadStatus("error", - 1) : e.customSettings.setBindUploadStatus("ready")
		} catch(n) {}
	},
	window.swfUploadLoadFailed = function() {},
	window.swfUploadFileDialogStart = function() {},
	window.swfUploadFileDialogComplete = function() {
		var e = this;
		e.customSettings.hideAllPopup()
	},
	window.swfUploadFileQueued = function(e) {
		try {
			var s = this;
			if (/\.((jpg)|(jpeg)|(gif)|(bmp)|(png)|(jpe)|(cur)|(tif)|(tiff)|(ico))$/i.test(e.type)) Dialog.alert("\u8bf7\u4f7f\u7528\u63d2\u5165\u56fe\u7247\u529f\u80fd\uff0c\u53ef\u76f4\u63a5\u5728\u7ebf\u9884\u89c8");
			else if (s.customSettings.successCount > 0 || 1 == s.customSettings.isUploading) var t = Dialog.confirm('<div class="f-14"><img class="grid" src="http://img.baidu.com/img/iknow/feedback/icon-question.png"><p>\u60a8\u53ea\u80fd\u4e0a\u4f20\u4e00\u4e2a\u9644\u4ef6\uff0c\u4e0a\u4e00\u9644\u4ef6\u5c06\u88ab\u8986\u76d6\uff0c\u786e\u5b9a\u5417\uff1f</p><p class="f-12 f-gray pl-20">\uff08\u5982\u679c\u60f3\u4e0a\u4f20\u591a\u4e2a\u6587\u4ef6\uff0c\u8bf7\u6253\u5305\uff09</p></div>', {
				width: 400,
				height: 150,
				title: "\u77e5\u9053\u63d0\u793a",
				onaccept: function() {
					try {
						t.hide();
						var r = s.customSettings.getUploadFile();
						if (s.progress = new FileProgress(e, s), s.customSettings.setUploadFile("fileInfo", null), s.customSettings.successCount = 0, s.customSettings.isEditorFile) s.customSettings.setUploadFile("backFileInfo", ! 0, "delete");
						else {
							var o = s.customSettings.swfUploadDir;
							r && r.path.substr(0, o.length) == o && ! s.customSettings.isInsertFromWangPan && T.ajax({
								url: encodeURI("https://pcs.baidu.com/rest/2.0/pcs/file?method=delete&app_id=598913&response-status=200&op=permanent&fs_id=" + r.fs_id),
								dataType: "jsonp",
								success: function() {}
							})
						}
						s.cancelUpload(s.customSettings.currentFile.id, ! 1),
						s.startUpload()
					} catch(i) {}
				},
				oncancel: function() {
					try {
						t.hide(),
						s.cancelUpload(e.id, ! 1)
					} catch(r) {}
				}
			});
			else s.progress = new FileProgress(e, s),
			s.startUpload()
		} catch(r) {}
	},
	window.swfUploadQueueComplete = function() {},
	window.swfUploadFileQueueError = function(e, s) {
		try {
			var t, r = this;
			switch (t = r.progress ? r.progress: r.progress = new FileProgress(e, r), r.customSettings.setBindUploadStatus("error", - 1), r.customSettings.isUploading = ! 1, s) {
			case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
				t.setStatus("error", "\u6587\u4ef6\u8d85\u8fc72G\u6216\u4e3a\u7a7a");
				break;
			case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
				t.setStatus("error", "\u4e0a\u4f20\u6587\u4ef6\u7c7b\u578b\u4e0d\u5141\u8bb8");
				break;
			default:
				null !== e && t.setStatus("error", "\u4e0a\u4f20\u5931\u8d25\u8bf7\u91cd\u8bd5\u6216\u5220\u9664")
			}
		} catch(o) {}
	},
	window.swfUploadSendStart = function(e) {
		try {
			var s = this,
			t = F.context("user").ECBD || null,
			r = s.progress;
			s.customSettings.isUploading = ! 1,
			s.customSettings.isEditorFile = ! 1,
			s.customSettings.isInsertFromWangPan = ! 1,
			s.customSettings.currentFile = e,
			t ? (r.setStatus("uploading", "", null, 0), s.setUploadURL(encodeURI(s.customSettings.swfUploadUrl + "&path=" + s.customSettings.swfUploadDir + e.name + "&ecbd=" + encodeURIComponent(t)))) : (r.setStatus("error", "\u60a8\u5c1a\u672a\u767b\u5f55"), s.cancelUpload(e.id, ! 1))
		} catch(o) {}
		return ! 0
	},
	window.swfUploadSendProgress = function(e, s, t) {
		try {
			var r = this,
			o = r.progress,
			i = Math.ceil(s / t * 100);
			r.customSettings.isUploading = ! 0,
			100 != i ? o.setStatus("uploading", "", null, i) : o.setStatus("finish")
		} catch(a) {}
	},
	window.swfUploadSendSuccess = function(file, serverData) {
		try {
			var swfupload = this,
			progress = swfupload.progress,
			error_message, fileinfo = eval("(" + serverData + ")");
			if (swfupload.customSettings.isUploading = ! 1, 31218 == fileinfo.error_code || 31112 == fileinfo.error_code) progress.setStatus("error", '<span>\u7f51\u76d8\u5df2\u6ee1</span><a href="http://yun.baidu.com/disk/award" class="progressExtend" target="_blank">\u6269\u5bb9</a>', fileinfo.error_code);
			else if (fileinfo.error_code) error_message = SWFUpload.SERVER_ERROR[fileinfo.error_code],
			error_message || (error_message = "\u4e0a\u4f20\u5931\u8d25"),
			progress.setStatus("error", error_message + ",\u8bf7\u91cd\u8bd5\u6216\u8005\u5220\u9664", fileinfo.error_code);
			else {
				var serverFileName = fileinfo.path.substr(fileinfo.path.lastIndexOf("/") + 1);
				serverFileName != swfupload.customSettings.currentFile.name && progress.setFileInfo(serverFileName, null, ! 0),
				progress.setStatus("complete"),
				swfupload.customSettings.successCount++,
				swfupload.customSettings.setUploadFile("fileInfo", fileinfo)
			}
		} catch(ex) {
			var swfupload = this,
			progress = swfupload.progress;
			"SyntaxError" == ex.name && progress.setStatus("error", "\u4e0a\u4f20\u5931\u8d25\u8bf7\u91cd\u8bd5\u6216\u5220\u9664")
		}
	},
	window.swfUploadSendError = function(e, s) {
		try {
			var t = this,
			r = t.progress;
			s != SWFUpload.UPLOAD_ERROR.FILE_CANCELLED && (t.customSettings.setBindUploadStatus("error", - 1), r.setStatus("error", "\u4e0a\u4f20\u5931\u8d25\u8bf7\u91cd\u8bd5\u6216\u5220\u9664"))
		} catch(o) {}
	},
	window.swfUploadSendComplete = function() {},
	window.editorSetUploadFile = function(e, s, t) {
		var r = t.swfupload;
		if (r && r.customSettings.successCount > 0, e && ! e.error) {
			var o = e.fileInfo;
			o.path = decodeURIComponent(o.path);
			var i = o.path.substr(o.path.lastIndexOf("/") + 1),
			a = o.size,
			n = o.path.match(/(\.[^\.]*)$/),
			l = n ? n[1] : ".";
			t._uploadFile.fileInfo = o,
			t._uploadFile.backFileInfo = o,
			r.customSettings.isEditorFile = ! 0,
			r.customSettings.isInsertFromWangPan = s,
			r.customSettings.successCount = 1,
			r.customSettings.currentFile = {
				id: "SWFUpload_0_EDIT",
				name: i || "",
				size: a || 0,
				type: l || "",
				filestatus: - 4,
				index: 1
			},
			r.progress = new FileProgress(r.customSettings.currentFile, r),
			r.progress.setStatus("setfilesuccess"),
			r.progress.setFileInfo(i, a)
		} else t._uploadFile.fileInfo = null,
		t._uploadFile.backFileInfo = null,
		r.customSettings.isEditorFile = ! 0,
		r.customSettings.successCount = 0,
		r.customSettings.currentFile = {
			id: "SWFUpload_0_NULL",
			name: "",
			size: 0,
			type: "",
			filestatus: - 4,
			index: 1,
			creationdate: 0,
			modificationdate: 0
		},
		r.progress = new FileProgress(r.customSettings.currentFile, r),
		r.progress.setStatus("setfileerror", '<span style="padding-left:5px;">\u5f88\u62b1\u6b49\uff0c\u60a8\u4e0a\u4f20\u7684\u9644\u4ef6\u5df2\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u4e0a\u4f20\u6216\u5220\u9664\u3002</span>'),
		r.progress.setFileInfo("", 0)
	},
	window.editorSubmitUploadFile = function(e, s) {
		var t = s._uploadFile.fileInfo,
		r = s._uploadFile.backFileInfo,
		o = s.swfupload,
		i = o.customSettings.swfUploadDir;
		switch (e) {
		case "submit":
			r && r["delete"] ? r.path.substr(0, i.length) != i || o.customSettings.isInsertFromWangPan || T.ajax({
				url: encodeURI("https://pcs.baidu.com/rest/2.0/pcs/file?method=delete&app_id=598913&response-status=200&op=permanent&fs_id=" + r.fs_id),
				dataType: "jsonp",
				success: function() {}
			}) : r && r.rename && r.path != r.rename && T.ajax({
				url: encodeURI("https://pcs.baidu.com/rest/2.0/pcs/file?method=move&app_id=598913&response-status=200&from=" + r.path + "&to=" + r.rename),
				dataType: "jsonp",
				success: function() {}
			});
			break;
		case "cancel":
			(t && ! r || t && r && t.fs_id != r.fs_id) && (t.path.substr(0, i.length) != i || o.customSettings.isInsertFromWangPan || T.ajax({
				url: encodeURI("https://pcs.baidu.com/rest/2.0/pcs/file?method=delete&app_id=598913&response-status=200&op=permanent&fs_id=" + t.fs_id),
				dataType: "jsonp",
				success: function() {}
			})),
			s._uploadFile.fileInfo = r
		}
	}
});;
define("common:widget/js/logic/editor/lang/lang.js", function(e, o, t) {
	var r = {};
	r["zh-cn"] = {
		insertorderedlist: {
			num: "1,2,3...",
			num1: "1),2),3)...",
			num2: "(1),(2),(3)...",
			cn: "\u4e00,\u4e8c,\u4e09....",
			cn1: "\u4e00),\u4e8c),\u4e09)....",
			cn2: "(\u4e00),(\u4e8c),(\u4e09)....",
			decimal: "1,2,3...",
			"lower-alpha": "a,b,c...",
			"lower-roman": "i,ii,iii...",
			"upper-alpha": "A,B,C...",
			"upper-roman": "I,II,III..."
		},
		insertunorderedlist: {
			circle: "\u25cb \u5927\u5706\u5708",
			disc: "\u25cf \u5c0f\u9ed1\u70b9",
			square: "\u25a0 \u5c0f\u65b9\u5757 ",
			dash: "\u2014 \u7834\u6298\u53f7",
			dot: " \u3002 \u5c0f\u5706\u5708"
		},
		wordCountTip: "",
		wordCountMsg: "",
		wordOverFlowMsg: '<span class="f-red">\u5b57\u6570\u8d85\u51fa\u6700\u5927\u5141\u8bb8\u503c\uff0c\u8bf7\u5220\u51cf\uff01</span>',
		ok: "\u786e\u8ba4",
		cancel: "\u53d6\u6d88",
		closeDialog: "\u5173\u95ed\u5bf9\u8bdd\u6846",
		tableDrag: "\u8868\u683c\u62d6\u52a8\u5fc5\u987b\u5f15\u5165uiUtils.js\u6587\u4ef6\uff01",
		autofloatMsg: "\u5de5\u5177\u680f\u6d6e\u52a8\u4f9d\u8d56\u7f16\u8f91\u5668UI\uff0c\u60a8\u9996\u5148\u9700\u8981\u5f15\u5165UI\u6587\u4ef6!",
		confirmClear: "\u786e\u5b9a\u6e05\u7a7a\u5f53\u524d\u6587\u6863\u4e48\uff1f",
		anthorMsg: "\u94fe\u63a5",
		clearColor: "\u6e05\u7a7a\u989c\u8272",
		standardColor: "\u6807\u51c6\u989c\u8272",
		themeColor: "\u4e3b\u9898\u989c\u8272",
		insertcodetitle: "\u4ee3\u7801\u8bed\u8a00",
		property: "\u5c5e\u6027",
		"default": "\u9ed8\u8ba4",
		modify: "\u4fee\u6539",
		justifyleft: "\u5de6\u5bf9\u9f50",
		justifyright: "\u53f3\u5bf9\u9f50",
		justifycenter: "\u5c45\u4e2d",
		justify: "\u9ed8\u8ba4",
		clear: "\u6e05\u9664",
		anchorMsg: "\u951a\u70b9",
		"delete": "\u5220\u9664",
		clickToUpload: "\u70b9\u51fb\u4e0a\u4f20",
		unset: "\u5c1a\u672a\u8bbe\u7f6e\u8bed\u8a00\u6587\u4ef6",
		t_row: "\u884c",
		t_col: "\u5217",
		more: "\u66f4\u591a",
		pasteOpt: "\u7c98\u8d34\u9009\u9879",
		pasteSourceFormat: "\u4fdd\u7559\u6e90\u683c\u5f0f",
		tagFormat: "\u53ea\u4fdd\u7559\u6807\u7b7e",
		pasteTextFormat: "\u53ea\u4fdd\u7559\u6587\u672c",
		autoTypeSet: {
			mergeLine: "\u5408\u5e76\u7a7a\u884c",
			delLine: "\u6e05\u9664\u7a7a\u884c",
			removeFormat: "\u6e05\u9664\u683c\u5f0f",
			indent: "\u9996\u884c\u7f29\u8fdb",
			alignment: "\u5bf9\u9f50\u65b9\u5f0f",
			imageFloat: "\u56fe\u7247\u6d6e\u52a8",
			removeFontsize: "\u6e05\u9664\u5b57\u53f7",
			removeFontFamily: "\u6e05\u9664\u5b57\u4f53",
			removeHtml: "\u6e05\u9664\u5197\u4f59HTML\u4ee3\u7801",
			pasteFilter: "\u7c98\u8d34\u8fc7\u6ee4",
			run: "\u6267\u884c"
		}
	},
	t.exports = r
});;
define("common:widget/js/logic/editor/prototype/prototype.js", function(e, t, i) {
	{
		var n = e("common:widget/js/util/tangram/tangram.js"),
		o = e("common:widget/js/ui/dialog/dialog.js"),
		r = e("common:widget/js/util/event/event.js");
		e("common:widget/js/util/log/log.js")
	}
	i.exports = {
		pageUnload: function(e) {
			{
				var t = this;
				this.instance
			}
			if (t.config.optionList.modify && t.hasCon()) {
				var i = "\u8bf7\u6ce8\u610f\uff1a\u60a8\u7684\u7f16\u8f91\u5185\u5bb9\u8fd8\u6ca1\u6709\u8fdb\u884c\u4fdd\u5b58!";
				return e.returnValue = i,
				i
			}
		},
		filterTag: function(e, t) {
			var i = t || "<p><br /></p>",
			n = e.toLocaleLowerCase().lastIndexOf(i);
			return n > 0 && e.length == n + i.length ? e.substring(0, n) : e
		},
		hasCon: function() {
			var e = this.instance;
			return e.getContentTxt().length > 0 && e.getContentTxt() != e.options.initialContent ? ! 0: /<(?:img|iframe)\s+(?:[^>]+\s+)*src\s*=\s*("|')+[^\1]+\1+\s*\/*>/i.test(e.getContent())
		},
		hasImg: function() {
			var e = this.instance;
			return /<img[^>]+src\s*=\s*['\"]([^'\"]+)['\"][^>]*>/i.test(e.getContent())
		},
		checkEditor: function() {
			var e = this,
			t = this.instance,
			i = this.hasCon(),
			o = ! 1;
			if ("function" == n.type(t.getUploadFile) && "ready" != t.getUploadFile().status) {
				var r = t.getUploadFile();
				if ("complete" != r.status || ! r.fileInfo || ! r.fileInfo.fs_id) {
					var a;
					return a = /(complete|error)/.test(r.status) ? 1: 0,
					setTimeout(function() {
						n(".edui-editor-wordcount", t.container).eq(0).html("<span class='f-red' style='direction: none'>" + e.config.fileErrorNum[a] + "</span> "),
						n(".edui-editor-bottomContainer", t.container).show()
					},
					100),
					! 1
				}
				o = ! 0
			}
			return i || o ? t.hasWordOverflow() ? (setTimeout(function() {
				n(".edui-editor-bottomContainer", t.container).show()
			},
			100), ! 1) : ! 0: (t.focus(), setTimeout(function() {
				n(".edui-editor-wordcount", t.container).eq(0).html("<span class='f-red' style='direction: none'>" + e.config.optionList.errorClew[0] + "</span> "),
				n(".edui-editor-bottomContainer", t.container).show()
			},
			100), ! 1)
		},
		uploadFile: function(e) {
			var t = this,
			i = this.instance;
			if ("function" == n.type(i.getUploadFile)) {
				var o = i.getUploadFile();
				"function" == n.type(i.uploadAction) && i.uploadAction("submit"),
				t.hasCon() || (e = ""),
				"complete" == o.status && (e += '<file fsid="' + o.fileInfo.fs_id + '" wealth="' + o.fileInfo.wealth + '" />')
			}
			return e
		},
		formatEnter: function(e) {
			for (var t = "", i = e.replace(/<br\s*\/*>/gi, "\n").replace(/ /g, "&nbsp;").replace(/\r\n/g, "\n").split("\n"), o = 0; o < i.length; o++) t += "" != n.string(i[o]).trim() ? "<p>" + n.string(i[o]).trim() + "</p>": "<p><br /></p>";
			return t
		},
		formatMapContent: function(e) {
			var t = this.unHtml(e).replace("\r\n", "\n").split("\n");
			return "<p>" + t.join("</p><p>") + "</p>"
		},
		unHtml: function(e) {
			return e ? e.replace(/[&<\">]/g, function(e) {
				return {
					"<": "&lt;",
					"&": "&amp",
					'"': "&quot;",
					">": "&gt;"
				} [e]
			}) : ""
		},
		filterMapClew: function(e, t) {
			if (!e) return "";
			e = e.replace(/<a[^>]*>([\S\s]*?)<\s*\/\s*a\s*>/gi, function(e, t) {
				return /<img[^>]*>/i.test(t) ? t: e
			});
			var i = new RegExp("<iframe.+?></iframe>", "ig"),
			n = i.exec(e);
			if (!n) return e;
			var o = n[0];
			this.config.optionList.pic = ! 0;
			var r = "",
			a = "";
			(n = o.match(/src="(.+?)"/i)) && (r = n[1]),
			(n = o.match(/map="(.+?)"/i)) && (a = n[1]),
			r = r ? r.replace(/^.+?html\/map/gi, "http://map.baidu.com/iknow") : "http://map.baidu.com/" + a,
			1 == t && (r = r.replace("http://map.baidu.com/iknow", "http://zhidao.baidu.com/html/map"));
			var s = '<iframe data-type="map" map="' + r + '" frameborder="0" src="' + r + '" class="ikqb-mapshow"></iframe>',
			c = e.replace(i, s);
			return c = this.filterTag(c)
		},
		filterHighlight: function(e) {
			if (!e) return "";
			var t = /<pre(.*?)>([\s\S]+?)<\/pre>/g,
			i = e.match(t);
			return i ? e.replace(t, function(e, t, i) {
				var n = t && t.match(/class="brush:\s*(.+?);.*?"/);
				return n && n[1] ? '<pre t="code" l="' + n[1] + '">' + i + "</pre>": i
			}) : e
		},
		formatCode: function(e) {
			if (!e) return "";
			var t = /<pre(.*?)>([\s\S]+?)<\/pre>/g,
			i = e.match(t);
			return i ? e.replace(t, function(e, t, i) {
				var n = t && t.match(/t="code" l="\s*(.+?)"/);
				return n && n[1] ? '<pre class="brush:' + n[1] + ';toolbar:false">' + i + "</pre>": i
			}) : e
		},
		collapseEditor: function(e) {
			var t = this,
			i = n(t.container);
			if (t.config.optionList.modify = ! 1, n.browser.firefox) var o = t.instance.container,
			r = n(".addons", i.get(0)),
			a = n(".edui-editor-iframeholder", o),
			e = 190,
			s = setInterval(function() {
				e -= 20,
				a.css("height", e + "px"),
				20 > e && (clearInterval(s), n(o).css("height", "0"), r.hide(), i.css({
					visibility: "hidden",
					height: "0"
				}), t.fire("oncollapse"))
			},
			20);
			else {
				n.browser.ie && n.browser.ie < 7 && setTimeout(function() {
					i.find("iframe").first().hide()
				},
				100),
				i.css({
					overflow: "hidden",
					visibility: "visible",
					height: "auto"
				});
				var s = setInterval(function() {
					e -= 20,
					i.css("height", e + "px"),
					20 > e && (clearInterval(s), i.css({
						overflow: "hidden",
						visibility: "hidden",
						height: "0"
					}), t.fire("oncollapse"))
				},
				20)
			}
		},
		expandEditor: function(e) {
			var t = this,
			i = n(this.container);
			if (n.browser.firefox) {
				{
					var o = t.instance.container;
					n(".addons", i.get(0)).show()
				}
				n(o).css("height", "");
				var e = 190,
				r = 0,
				a = n(".edui-editor-iframeholder", o),
				s = setInterval(function() {
					r += 20,
					a.css("height", r + "px"),
					r > e && (clearInterval(s), a.css("height", "190px"), t.fire("onexpand"))
				},
				20);
				n(i).css("height", "").css("visibility", "visible")
			} else {
				i.css("display", "").css({
					overflow: "hidden",
					visibility: "visible",
					height: "0"
				});
				var r = 0,
				s = setInterval(function() {
					r += 20,
					i.css("height", r + "px"),
					r > e && (clearInterval(s), i.css("height", "").css({
						overflow: "visible"
					}), n.browser.ie && n.browser.ie < 7 && i.find("iframe").first().show(), t.fire("onexpand"))
				},
				20)
			}
		},
		setContent: function(e, t) {
			var i = this;
			setTimeout(function() {
				"" != e && ("0" == t && (e = i.formatEnter(e)), e = i.formatCode(i.filterMapClew(e, ! 0)), i.instance.setContent(e, ! 1, ! 0)),
				i.instance.focus()
			},
			500)
		},
		afterInit: function() {
			function e(e, t) {
				o.alert(t, {
					title: e,
					width: 350,
					height: 160,
					autoRender: ! 0
				})
			}
			try {
				var t = this,
				i = this.instance,
				a = ! 1;
				i.addListener("uploadSuccess", function(t, n) {
					"0" != n.errorNo ? e("\u63d2\u5165\u56fe\u7247", UE.ui.Editor.config.imgErrorNum[n.errorNo]) : i.focus()
				}),
				i.addListener("networkError", function() {
					e("\u63d2\u5165\u56fe\u7247", "\u672a\u77e5\u9519\u8bef")
				}),
				i.addListener("imageSizeError", function() {
					e("\u63d2\u5165\u56fe\u7247", '<p>\u56fe\u7247\u6587\u4ef6\u8fc7\u5927\uff01</p><p class="f-red">\u6ce8\uff1a\u5927\u5c0f\u4e0d\u8d85\u8fc75M\uff0c\u652f\u6301JPG/PNG/BMP/GIF\u7b49\u683c\u5f0f</p>')
				}),
				i.addListener("showmap", function() {
					if (i.options.isLogin) {
						o.iframe({
							content: t.config.buttonConfig.insertmap.url + "?editor=" + t.guid,
							title: "\u63d2\u5165\u5730\u56fe",
							width: 710,
							height: 480,
							autoDispose: ! 0
						})
					}
				}),
				i.addListener("showhighlightcode", function() {
					if (i.options.isLogin) var e = o.iframe({
						content: t.config.buttonConfig.highlightcode.url + "?editor=" + t.guid,
						title: "\u63d2\u5165\u4ee3\u7801",
						width: 550,
						height: 440,
						autoDispose: ! 0,
						type: "confirm",
						onaccept: function() {
							var t = n(e.getElement("content")).find("iframe")[0].contentWindow,
							o = t.document.getElementById("code").value,
							r = t.document.getElementById("language").value;
							i.execCommand("highlightcode", o, r),
							e.hide()
						}
					})
				}),
				r.on("editor-" + t.guid + ".setmap", function(e, i) {
					var o = t.instance;
					if (r.fire("dialog.close"), "object" == ! n.type(i)) return void(e.returnValue = ! 1);
					if (i.url) {
						var a = '<p><iframe data-type="map" map="' + i.url + '" frameborder="0" src="' + i.url + '" class="ikqb-mapshow"></iframe></p>';
						o.execCommand("insertHTML", a)
					}
					"" != i.info && (i.info = "<p>" + t.formatMapContent(decodeURIComponent(i.info)) + "</p>", o.execCommand("insertHTML", i.info)),
					o.focus()
				}),
				r.on("editor.default", function() {
					t.config.optionList.modify = ! 1,
					a = ! 0
				}),
				i.addListener("focus", function() {
					n(this.container).parent().addClass("editor-focus"),
					a || (t.config.optionList.modify = ! 0),
					r.fire("editor.focus", t)
				}),
				i.addListener("blur", function() {
					n(this.container).parent().removeClass("editor-focus")
				}),
				n.browser.isWebkit ? window.addEventListener("beforeunload", function(e) {
					return t.pageUnload(e)
				}) : window.onbeforeunload = function(e) {
					e = e || window.event,
					t.pageUnload(e)
				}
			} catch(s) {
				"undefined" != typeof alog && alog("exception.fire", "catch", {
					msg: s.message,
					path: "common:widget/js/logic/editor/prototype/prototype.js",
					method: "",
					ln: 508
				})
			}
		}
	}
});

