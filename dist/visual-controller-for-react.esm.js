import e, { useEffect as t } from "react";
//#region \0rolldown/runtime.js
var n = Object.create, r = Object.defineProperty, i = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, o = Object.getPrototypeOf, s = Object.prototype.hasOwnProperty, c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), l = (e, t, n, o) => {
	if (t && typeof t == "object" || typeof t == "function") for (var c = a(t), l = 0, u = c.length, d; l < u; l++) d = c[l], !s.call(e, d) && d !== n && r(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(o = i(t, d)) || o.enumerable
	});
	return e;
}, u = (e, t, i) => (i = e == null ? {} : n(o(e)), l(t || !e || !e.__esModule ? r(i, "default", {
	value: e,
	enumerable: !0
}) : i, e)), d = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
//#endregion
//#region node_modules/ask-for-promise/src/askForPromise.js
function f(e) {
	return e ? m(e) : p();
}
f.sequence = function(e, ...t) {
	let n = f(), r = [];
	function* i(e) {
		for (let t of e) yield t;
	}
	let a = i(e);
	function o(e, ...t) {
		if (e.done) {
			n.done(r);
			return;
		}
		e.value(...t).then((e) => {
			r.push(e), o(a.next(), ...t, e);
		});
	}
	return o(a.next(), ...t), n;
}, f.all = function(e, ...t) {
	let n = f(), r = [], i = e.map((e, n) => typeof e == "function" ? e(...t).then((e) => r[n] = e) : e.then((e) => r[n] = e));
	return Promise.all(i).then(() => n.done(r)), n;
};
function p() {
	let e, t, n = new Promise((n, r) => {
		e = n, t = r;
	}), r = {
		promise: n,
		promises: null,
		done: e,
		cancel: t,
		each: () => {},
		onComplete: h(n),
		timeout: () => {}
	};
	return r.timeout = g(!1, r), r.each = (n, ...i) => {
		n({
			value: null,
			done: e,
			cancel: t,
			timeout: r.timeout
		}, ...i);
	}, r;
}
function m(e) {
	let t = e.map((e) => p()), n = t.map((e) => e.promise);
	t.promises = t;
	let r = h(Promise.all(n));
	function i(e) {
		let t = "pending";
		return e.then(() => t = "fulfilled").catch(() => t = "rejected"), t;
	}
	function a(n, ...r) {
		t.forEach((t, a) => n({
			value: e[a],
			done: t.done,
			cancel: t.cancel,
			timeout: t.timeout,
			state: i(t.promise)
		}, ...r));
	}
	let o = {
		promise: Promise.all(n),
		promises: t,
		done: (e) => {
			t.forEach((t) => t.done(e));
		},
		cancel: (e) => {
			t.forEach((t) => t.cancel(e));
		},
		each: a,
		onComplete: r,
		timeout: () => {}
	};
	return o.timeout = g(!0, o), o;
}
function h(e) {
	return function(t, n = null) {
		n === null ? e.then((e) => t(e)) : e.then((e) => t(e), (e) => n(e));
	};
}
function g(e, t) {
	let n;
	return n = e ? Promise.all(t.promises.map((e) => e.promise)) : t.promise, function(e, r) {
		let i, a = new Promise((t, a) => {
			i = setTimeout(() => {
				t(r), Promise.resolve(n);
			}, e);
		});
		return n.then(() => clearTimeout(i)), t.onComplete = h(Promise.race([n, a])), t;
	};
}
//#endregion
//#region node_modules/scheduler/cjs/scheduler.production.js
var _ = /* @__PURE__ */ c(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, ee || (ee = !0, ae());
		else {
			var t = n(l);
			t !== null && se(x, t.startTime - e);
		}
	}
	var ee = !1, te = -1, ne = 5, re = -1;
	function ie() {
		return g ? !0 : !(e.unstable_now() - re < ne);
	}
	function S() {
		if (g = !1, ee) {
			var t = e.unstable_now();
			re = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(te), te = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && ie());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && se(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? ae() : ee = !1;
			}
		}
	}
	var ae;
	if (typeof y == "function") ae = function() {
		y(S);
	};
	else if (typeof MessageChannel < "u") {
		var C = new MessageChannel(), oe = C.port2;
		C.port1.onmessage = S, ae = function() {
			oe.postMessage(null);
		};
	} else ae = function() {
		_(S, 0);
	};
	function se(t, n) {
		te = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ne = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(te), te = -1) : h = !0, se(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, ae()))), r;
	}, e.unstable_shouldYield = ie, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), v = /* @__PURE__ */ c(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {
			if (x = !1, re) {
				var t = e.unstable_now();
				ae = t;
				var n = !0;
				try {
					a: {
						y = !1, b && (b = !1, te(ie), ie = -1), v = !0;
						var a = _;
						try {
							b: {
								for (o(t), g = r(p); g !== null && !(g.expirationTime > t && c());) {
									var u = g.callback;
									if (typeof u == "function") {
										g.callback = null, _ = g.priorityLevel;
										var d = u(g.expirationTime <= t);
										if (t = e.unstable_now(), typeof d == "function") {
											g.callback = d, o(t), n = !0;
											break b;
										}
										g === r(p) && i(p), o(t);
									} else i(p);
									g = r(p);
								}
								if (g !== null) n = !0;
								else {
									var f = r(m);
									f !== null && l(s, f.startTime - t), n = !1;
								}
							}
							break a;
						} finally {
							g = null, _ = a, v = !1;
						}
						n = void 0;
					}
				} finally {
					n ? C() : re = !1;
				}
			}
		}
		function n(e, t) {
			var n = e.length;
			e.push(t);
			a: for (; 0 < n;) {
				var r = n - 1 >>> 1, i = e[r];
				if (0 < a(i, t)) e[r] = t, e[n] = i, n = r;
				else break a;
			}
		}
		function r(e) {
			return e.length === 0 ? null : e[0];
		}
		function i(e) {
			if (e.length === 0) return null;
			var t = e[0], n = e.pop();
			if (n !== t) {
				e[0] = n;
				a: for (var r = 0, i = e.length, o = i >>> 1; r < o;) {
					var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
					if (0 > a(c, n)) l < i && 0 > a(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
					else if (l < i && 0 > a(u, n)) e[r] = u, e[l] = n, r = l;
					else break a;
				}
			}
			return t;
		}
		function a(e, t) {
			var n = e.sortIndex - t.sortIndex;
			return n === 0 ? e.id - t.id : n;
		}
		function o(e) {
			for (var t = r(m); t !== null;) {
				if (t.callback === null) i(m);
				else if (t.startTime <= e) i(m), t.sortIndex = t.expirationTime, n(p, t);
				else break;
				t = r(m);
			}
		}
		function s(e) {
			if (b = !1, o(e), !y) if (r(p) !== null) y = !0, re || (re = !0, C());
			else {
				var t = r(m);
				t !== null && l(s, t.startTime - e);
			}
		}
		function c() {
			return x ? !0 : !(e.unstable_now() - ae < S);
		}
		function l(t, n) {
			ie = ee(function() {
				t(e.unstable_now());
			}, n);
		}
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
			var u = performance;
			e.unstable_now = function() {
				return u.now();
			};
		} else {
			var d = Date, f = d.now();
			e.unstable_now = function() {
				return d.now() - f;
			};
		}
		var p = [], m = [], h = 1, g = null, _ = 3, v = !1, y = !1, b = !1, x = !1, ee = typeof setTimeout == "function" ? setTimeout : null, te = typeof clearTimeout == "function" ? clearTimeout : null, ne = typeof setImmediate < "u" ? setImmediate : null, re = !1, ie = -1, S = 5, ae = -1;
		if (typeof ne == "function") var C = function() {
			ne(t);
		};
		else if (typeof MessageChannel < "u") {
			var oe = new MessageChannel(), se = oe.port2;
			oe.port1.onmessage = t, C = function() {
				se.postMessage(null);
			};
		} else C = function() {
			ee(t, 0);
		};
		e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
			e.callback = null;
		}, e.unstable_forceFrameRate = function(e) {
			0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : S = 0 < e ? Math.floor(1e3 / e) : 5;
		}, e.unstable_getCurrentPriorityLevel = function() {
			return _;
		}, e.unstable_next = function(e) {
			switch (_) {
				case 1:
				case 2:
				case 3:
					var t = 3;
					break;
				default: t = _;
			}
			var n = _;
			_ = t;
			try {
				return e();
			} finally {
				_ = n;
			}
		}, e.unstable_requestPaint = function() {
			x = !0;
		}, e.unstable_runWithPriority = function(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5: break;
				default: e = 3;
			}
			var n = _;
			_ = e;
			try {
				return t();
			} finally {
				_ = n;
			}
		}, e.unstable_scheduleCallback = function(t, i, a) {
			var o = e.unstable_now();
			switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, t) {
				case 1:
					var c = -1;
					break;
				case 2:
					c = 250;
					break;
				case 5:
					c = 1073741823;
					break;
				case 4:
					c = 1e4;
					break;
				default: c = 5e3;
			}
			return c = a + c, t = {
				id: h++,
				callback: i,
				priorityLevel: t,
				startTime: a,
				expirationTime: c,
				sortIndex: -1
			}, a > o ? (t.sortIndex = a, n(m, t), r(p) === null && t === r(m) && (b ? (te(ie), ie = -1) : b = !0, l(s, a - o))) : (t.sortIndex = c, n(p, t), y || v || (y = !0, re || (re = !0, C()))), t;
		}, e.unstable_shouldYield = c, e.unstable_wrapCallback = function(e) {
			var t = _;
			return function() {
				var n = _;
				_ = t;
				try {
					return e.apply(this, arguments);
				} finally {
					_ = n;
				}
			};
		}, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), y = /* @__PURE__ */ c(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = _() : t.exports = v();
})), b = /* @__PURE__ */ c(((e) => {
	var t = y(), n = d("react"), r = d("react-dom");
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function f(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = f(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var p = Object.assign, m = Symbol.for("react.element"), h = Symbol.for("react.transitional.element"), g = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), ae = Symbol.for("react.activity"), C = Symbol.for("react.memo_cache_sentinel"), oe = Symbol.iterator;
	function se(e) {
		return typeof e != "object" || !e ? null : (e = oe && e[oe] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ce = Symbol.for("react.client.reference");
	function le(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ce ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case _: return "Fragment";
			case b: return "Profiler";
			case v: return "StrictMode";
			case ne: return "Suspense";
			case re: return "SuspenseList";
			case ae: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case g: return "Portal";
			case ee: return e.displayName || "Context";
			case x: return (e._context.displayName || "Context") + ".Consumer";
			case te:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ie: return t = e.displayName || null, t === null ? le(e.type) || "Memo" : t;
			case S:
				t = e._payload, e = e._init;
				try {
					return le(e(t));
				} catch {}
		}
		return null;
	}
	var ue = Array.isArray, w = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, T = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, fe = [], pe = -1;
	function me(e) {
		return { current: e };
	}
	function he(e) {
		0 > pe || (e.current = fe[pe], fe[pe] = null, pe--);
	}
	function ge(e, t) {
		pe++, fe[pe] = e.current, e.current = t;
	}
	var _e = me(null), ve = me(null), ye = me(null), be = me(null);
	function xe(e, t) {
		switch (ge(ye, t), ge(ve, e), ge(_e, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? tf(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = tf(t), e = nf(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		he(_e), ge(_e, e);
	}
	function Se() {
		he(_e), he(ve), he(ye);
	}
	function Ce(e) {
		e.memoizedState !== null && ge(be, e);
		var t = _e.current, n = nf(t, e.type);
		t !== n && (ge(ve, e), ge(_e, n));
	}
	function E(e) {
		ve.current === e && (he(_e), he(ve)), be.current === e && (he(be), up._currentValue = de);
	}
	var we, Te;
	function Ee(e) {
		if (we === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			we = t && t[1] || "", Te = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + we + e + Te;
	}
	var De = !1;
	function Oe(e, t) {
		if (!e || De) return "";
		De = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			De = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ee(n) : "";
	}
	function ke(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ee(e.type);
			case 16: return Ee("Lazy");
			case 13: return e.child !== t && t !== null ? Ee("Suspense Fallback") : Ee("Suspense");
			case 19: return Ee("SuspenseList");
			case 0:
			case 15: return Oe(e.type, !1);
			case 11: return Oe(e.type.render, !1);
			case 1: return Oe(e.type, !0);
			case 31: return Ee("Activity");
			default: return "";
		}
	}
	function Ae(e) {
		try {
			var t = "", n = null;
			do
				t += ke(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var je = Object.prototype.hasOwnProperty, Me = t.unstable_scheduleCallback, Ne = t.unstable_cancelCallback, Pe = t.unstable_shouldYield, Fe = t.unstable_requestPaint, Ie = t.unstable_now, Le = t.unstable_getCurrentPriorityLevel, Re = t.unstable_ImmediatePriority, ze = t.unstable_UserBlockingPriority, Be = t.unstable_NormalPriority, Ve = t.unstable_LowPriority, He = t.unstable_IdlePriority, Ue = t.log, We = t.unstable_setDisableYieldValue, Ge = null, Ke = null;
	function qe(e) {
		if (typeof Ue == "function" && We(e), Ke && typeof Ke.setStrictMode == "function") try {
			Ke.setStrictMode(Ge, e);
		} catch {}
	}
	var Je = Math.clz32 ? Math.clz32 : Ze, Ye = Math.log, Xe = Math.LN2;
	function Ze(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ye(e) / Xe | 0) | 0;
	}
	var Qe = 256, $e = 262144, et = 4194304;
	function tt(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function nt(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = tt(n))) : i = tt(o) : i = tt(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = tt(n))) : i = tt(o)) : i = tt(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function rt(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function it(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function at() {
		var e = et;
		return et <<= 1, !(et & 62914560) && (et = 4194304), e;
	}
	function ot(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function st(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function ct(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Je(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && lt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function lt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Je(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ut(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Je(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function dt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : ft(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function ft(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function pt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function mt() {
		var e = T.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ep(e.type)) : e;
	}
	function ht(e, t) {
		var n = T.p;
		try {
			return T.p = e, t();
		} finally {
			T.p = n;
		}
	}
	var gt = Math.random().toString(36).slice(2), _t = "__reactFiber$" + gt, vt = "__reactProps$" + gt, yt = "__reactContainer$" + gt, bt = "__reactEvents$" + gt, xt = "__reactListeners$" + gt, St = "__reactHandles$" + gt, Ct = "__reactResources$" + gt, wt = "__reactMarker$" + gt;
	function Tt(e) {
		delete e[_t], delete e[vt], delete e[bt], delete e[xt], delete e[St];
	}
	function Et(e) {
		var t = e[_t];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[yt] || n[_t]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Tf(e); e !== null;) {
					if (n = e[_t]) return n;
					e = Tf(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Dt(e) {
		if (e = e[_t] || e[yt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Ot(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function kt(e) {
		var t = e[Ct];
		return t ||= e[Ct] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function At(e) {
		e[wt] = !0;
	}
	var jt = /* @__PURE__ */ new Set(), Mt = {};
	function Nt(e, t) {
		Pt(e, t), Pt(e + "Capture", t);
	}
	function Pt(e, t) {
		for (Mt[e] = t, e = 0; e < t.length; e++) jt.add(t[e]);
	}
	var Ft = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), It = {}, Lt = {};
	function Rt(e) {
		return je.call(Lt, e) ? !0 : je.call(It, e) ? !1 : Ft.test(e) ? Lt[e] = !0 : (It[e] = !0, !1);
	}
	function zt(e, t, n) {
		if (Rt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Bt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Vt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Ht(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Ut(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Wt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Gt(e) {
		if (!e._valueTracker) {
			var t = Ut(e) ? "checked" : "value";
			e._valueTracker = Wt(e, t, "" + e[t]);
		}
	}
	function Kt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Ut(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function qt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Jt = /[\n"\\]/g;
	function Yt(e) {
		return e.replace(Jt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Xt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ht(t)) : e.value !== "" + Ht(t) && (e.value = "" + Ht(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Qt(e, o, Ht(n)) : Qt(e, o, Ht(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Ht(s) : e.removeAttribute("name");
	}
	function Zt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Gt(e);
				return;
			}
			n = n == null ? "" : "" + Ht(n), t = t == null ? n : "" + Ht(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Gt(e);
	}
	function Qt(e, t, n) {
		t === "number" && qt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function $t(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Ht(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function en(e, t, n) {
		if (t != null && (t = "" + Ht(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Ht(n);
	}
	function tn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ue(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Ht(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Gt(e);
	}
	function nn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var rn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function an(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || rn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function on(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && an(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && an(e, o, t[o]);
	}
	function sn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var cn = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), ln = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function un(e) {
		return ln.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function dn() {}
	var fn = null;
	function pn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var mn = null, hn = null;
	function gn(e) {
		var t = Dt(e);
		if (t && (e = t.stateNode)) {
			var n = e[vt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Xt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Yt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[vt] || null;
								if (!a) throw Error(i(90));
								Xt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Kt(r);
					}
					break a;
				case "textarea":
					en(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && $t(e, !!n.multiple, t, !1);
			}
		}
	}
	var _n = !1;
	function vn(e, t, n) {
		if (_n) return e(t, n);
		_n = !0;
		try {
			return e(t);
		} finally {
			if (_n = !1, (mn !== null || hn !== null) && (Mu(), mn && (t = mn, e = hn, hn = mn = null, gn(t), e))) for (t = 0; t < e.length; t++) gn(e[t]);
		}
	}
	function yn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[vt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var bn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), xn = !1;
	if (bn) try {
		var Sn = {};
		Object.defineProperty(Sn, "passive", { get: function() {
			xn = !0;
		} }), window.addEventListener("test", Sn, Sn), window.removeEventListener("test", Sn, Sn);
	} catch {
		xn = !1;
	}
	var Cn = null, wn = null, Tn = null;
	function En() {
		if (Tn) return Tn;
		var e, t = wn, n = t.length, r, i = "value" in Cn ? Cn.value : Cn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Tn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Dn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function On() {
		return !0;
	}
	function kn() {
		return !1;
	}
	function An(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? On : kn, this.isPropagationStopped = kn, this;
		}
		return p(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = On);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = On);
			},
			persist: function() {},
			isPersistent: On
		}), t;
	}
	var jn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Mn = An(jn), Nn = p({}, jn, {
		view: 0,
		detail: 0
	}), Pn = An(Nn), Fn, In, Ln, Rn = p({}, Nn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Yn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Ln && (Ln && e.type === "mousemove" ? (Fn = e.screenX - Ln.screenX, In = e.screenY - Ln.screenY) : In = Fn = 0, Ln = e), Fn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : In;
		}
	}), zn = An(Rn), Bn = An(p({}, Rn, { dataTransfer: 0 })), Vn = An(p({}, Nn, { relatedTarget: 0 })), Hn = An(p({}, jn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Un = An(p({}, jn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Wn = An(p({}, jn, { data: 0 })), Gn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Kn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, qn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Jn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = qn[e]) ? !!t[e] : !1;
	}
	function Yn() {
		return Jn;
	}
	var Xn = An(p({}, Nn, {
		key: function(e) {
			if (e.key) {
				var t = Gn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Dn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Kn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Yn,
		charCode: function(e) {
			return e.type === "keypress" ? Dn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Dn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Zn = An(p({}, Rn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Qn = An(p({}, Nn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Yn
	})), $n = An(p({}, jn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), er = An(p({}, Rn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), tr = An(p({}, jn, {
		newState: 0,
		oldState: 0
	})), nr = [
		9,
		13,
		27,
		32
	], rr = bn && "CompositionEvent" in window, ir = null;
	bn && "documentMode" in document && (ir = document.documentMode);
	var ar = bn && "TextEvent" in window && !ir, or = bn && (!rr || ir && 8 < ir && 11 >= ir), sr = " ", cr = !1;
	function lr(e, t) {
		switch (e) {
			case "keyup": return nr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function ur(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var dr = !1;
	function fr(e, t) {
		switch (e) {
			case "compositionend": return ur(t);
			case "keypress": return t.which === 32 ? (cr = !0, sr) : null;
			case "textInput": return e = t.data, e === sr && cr ? null : e;
			default: return null;
		}
	}
	function pr(e, t) {
		if (dr) return e === "compositionend" || !rr && lr(e, t) ? (e = En(), Tn = wn = Cn = null, dr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return or && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var mr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function hr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!mr[e.type] : t === "textarea";
	}
	function gr(e, t, n, r) {
		mn ? hn ? hn.push(r) : hn = [r] : mn = r, t = zd(t, "onChange"), 0 < t.length && (n = new Mn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var _r = null, vr = null;
	function yr(e) {
		Md(e, 0);
	}
	function br(e) {
		if (Kt(Ot(e))) return e;
	}
	function xr(e, t) {
		if (e === "change") return t;
	}
	var Sr = !1;
	if (bn) {
		var Cr;
		if (bn) {
			var wr = "oninput" in document;
			if (!wr) {
				var Tr = document.createElement("div");
				Tr.setAttribute("oninput", "return;"), wr = typeof Tr.oninput == "function";
			}
			Cr = wr;
		} else Cr = !1;
		Sr = Cr && (!document.documentMode || 9 < document.documentMode);
	}
	function Er() {
		_r && (_r.detachEvent("onpropertychange", Dr), vr = _r = null);
	}
	function Dr(e) {
		if (e.propertyName === "value" && br(vr)) {
			var t = [];
			gr(t, vr, e, pn(e)), vn(yr, t);
		}
	}
	function Or(e, t, n) {
		e === "focusin" ? (Er(), _r = t, vr = n, _r.attachEvent("onpropertychange", Dr)) : e === "focusout" && Er();
	}
	function kr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return br(vr);
	}
	function Ar(e, t) {
		if (e === "click") return br(t);
	}
	function jr(e, t) {
		if (e === "input" || e === "change") return br(t);
	}
	function Mr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Nr = typeof Object.is == "function" ? Object.is : Mr;
	function Pr(e, t) {
		if (Nr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!je.call(t, i) || !Nr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Fr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Ir(e, t) {
		var n = Fr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Fr(n);
		}
	}
	function Lr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Lr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Rr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = qt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = qt(e.document);
		}
		return t;
	}
	function zr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Br = bn && "documentMode" in document && 11 >= document.documentMode, Vr = null, Hr = null, Ur = null, Wr = !1;
	function Gr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Wr || Vr == null || Vr !== qt(r) || (r = Vr, "selectionStart" in r && zr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Ur && Pr(Ur, r) || (Ur = r, r = zd(Hr, "onSelect"), 0 < r.length && (t = new Mn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Vr)));
	}
	function Kr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var qr = {
		animationend: Kr("Animation", "AnimationEnd"),
		animationiteration: Kr("Animation", "AnimationIteration"),
		animationstart: Kr("Animation", "AnimationStart"),
		transitionrun: Kr("Transition", "TransitionRun"),
		transitionstart: Kr("Transition", "TransitionStart"),
		transitioncancel: Kr("Transition", "TransitionCancel"),
		transitionend: Kr("Transition", "TransitionEnd")
	}, Jr = {}, Yr = {};
	bn && (Yr = document.createElement("div").style, "AnimationEvent" in window || (delete qr.animationend.animation, delete qr.animationiteration.animation, delete qr.animationstart.animation), "TransitionEvent" in window || delete qr.transitionend.transition);
	function Xr(e) {
		if (Jr[e]) return Jr[e];
		if (!qr[e]) return e;
		var t = qr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Yr) return Jr[e] = t[n];
		return e;
	}
	var Zr = Xr("animationend"), Qr = Xr("animationiteration"), $r = Xr("animationstart"), ei = Xr("transitionrun"), ti = Xr("transitionstart"), ni = Xr("transitioncancel"), ri = Xr("transitionend"), ii = /* @__PURE__ */ new Map(), ai = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ai.push("scrollEnd");
	function oi(e, t) {
		ii.set(e, t), Nt(t, [e]);
	}
	var si = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, ci = [], li = 0, ui = 0;
	function di() {
		for (var e = li, t = ui = li = 0; t < e;) {
			var n = ci[t];
			ci[t++] = null;
			var r = ci[t];
			ci[t++] = null;
			var i = ci[t];
			ci[t++] = null;
			var a = ci[t];
			if (ci[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && hi(n, i, a);
		}
	}
	function fi(e, t, n, r) {
		ci[li++] = e, ci[li++] = t, ci[li++] = n, ci[li++] = r, ui |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function pi(e, t, n, r) {
		return fi(e, t, n, r), gi(e);
	}
	function mi(e, t) {
		return fi(e, null, null, t), gi(e);
	}
	function hi(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Je(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function gi(e) {
		if (50 < Cu) throw Cu = 0, wu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var _i = {};
	function vi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function yi(e, t, n, r) {
		return new vi(e, t, n, r);
	}
	function bi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function xi(e, t) {
		var n = e.alternate;
		return n === null ? (n = yi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Si(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Ci(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") bi(e) && (s = 1);
		else if (typeof e == "string") s = tp(e, n, _e.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ae: return e = yi(31, n, t, a), e.elementType = ae, e.lanes = o, e;
			case _: return wi(n.children, a, o, t);
			case v:
				s = 8, a |= 24;
				break;
			case b: return e = yi(12, n, t, a | 2), e.elementType = b, e.lanes = o, e;
			case ne: return e = yi(13, n, t, a), e.elementType = ne, e.lanes = o, e;
			case re: return e = yi(19, n, t, a), e.elementType = re, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case ee:
						s = 10;
						break a;
					case x:
						s = 9;
						break a;
					case te:
						s = 11;
						break a;
					case ie:
						s = 14;
						break a;
					case S:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = yi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function wi(e, t, n, r) {
		return e = yi(7, e, r, t), e.lanes = n, e;
	}
	function Ti(e, t, n) {
		return e = yi(6, e, null, t), e.lanes = n, e;
	}
	function Ei(e) {
		var t = yi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Di(e, t, n) {
		return t = yi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Oi = /* @__PURE__ */ new WeakMap();
	function ki(e, t) {
		if (typeof e == "object" && e) {
			var n = Oi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Ae(t)
			}, Oi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ae(t)
		};
	}
	var Ai = [], ji = 0, Mi = null, Ni = 0, Pi = [], Fi = 0, Ii = null, Li = 1, Ri = "";
	function zi(e, t) {
		Ai[ji++] = Ni, Ai[ji++] = Mi, Mi = e, Ni = t;
	}
	function Bi(e, t, n) {
		Pi[Fi++] = Li, Pi[Fi++] = Ri, Pi[Fi++] = Ii, Ii = e;
		var r = Li;
		e = Ri;
		var i = 32 - Je(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Je(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Li = 1 << 32 - Je(t) + i | n << i | r, Ri = a + e;
		} else Li = 1 << a | n << i | r, Ri = e;
	}
	function Vi(e) {
		e.return !== null && (zi(e, 1), Bi(e, 1, 0));
	}
	function Hi(e) {
		for (; e === Mi;) Mi = Ai[--ji], Ai[ji] = null, Ni = Ai[--ji], Ai[ji] = null;
		for (; e === Ii;) Ii = Pi[--Fi], Pi[Fi] = null, Ri = Pi[--Fi], Pi[Fi] = null, Li = Pi[--Fi], Pi[Fi] = null;
	}
	function Ui(e, t) {
		Pi[Fi++] = Li, Pi[Fi++] = Ri, Pi[Fi++] = Ii, Li = t.id, Ri = t.overflow, Ii = e;
	}
	var D = null, Wi = null, O = !1, Gi = null, Ki = !1, qi = Error(i(519));
	function Ji(e) {
		throw ea(ki(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), qi;
	}
	function Yi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[_t] = e, t[vt] = r, n) {
			case "dialog":
				R("cancel", t), R("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				R("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Ad.length; n++) R(Ad[n], t);
				break;
			case "source":
				R("error", t);
				break;
			case "img":
			case "image":
			case "link":
				R("error", t), R("load", t);
				break;
			case "details":
				R("toggle", t);
				break;
			case "input":
				R("invalid", t), Zt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				R("invalid", t);
				break;
			case "textarea": R("invalid", t), tn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Gd(t.textContent, n) ? (r.popover != null && (R("beforetoggle", t), R("toggle", t)), r.onScroll != null && R("scroll", t), r.onScrollEnd != null && R("scrollend", t), r.onClick != null && (t.onclick = dn), t = !0) : t = !1, t || Ji(e, !0);
	}
	function Xi(e) {
		for (D = e.return; D;) switch (D.tag) {
			case 5:
			case 31:
			case 13:
				Ki = !1;
				return;
			case 27:
			case 3:
				Ki = !0;
				return;
			default: D = D.return;
		}
	}
	function Zi(e) {
		if (e !== D) return !1;
		if (!O) return Xi(e), O = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || rf(e.type, e.memoizedProps)), n = !n), n && Wi && Ji(e), Xi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Wi = wf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Wi = wf(e);
		} else t === 27 ? (t = Wi, ff(e.type) ? (e = Cf, Cf = null, Wi = e) : Wi = t) : Wi = D ? Sf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Qi() {
		Wi = D = null, O = !1;
	}
	function $i() {
		var e = Gi;
		return e !== null && (lu === null ? lu = e : lu.push.apply(lu, e), Gi = null), e;
	}
	function ea(e) {
		Gi === null ? Gi = [e] : Gi.push(e);
	}
	var ta = me(null), na = null, ra = null;
	function ia(e, t, n) {
		ge(ta, t._currentValue), t._currentValue = n;
	}
	function aa(e) {
		e._currentValue = ta.current, he(ta);
	}
	function oa(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function sa(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), oa(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), oa(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function ca(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Nr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === be.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [up] : e.push(up));
			}
			a = a.return;
		}
		e !== null && sa(t, e, n, r), t.flags |= 262144;
	}
	function la(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Nr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function ua(e) {
		na = e, ra = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function da(e) {
		return pa(na, e);
	}
	function fa(e, t) {
		return na === null && ua(e), pa(e, t);
	}
	function pa(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, ra === null) {
			if (e === null) throw Error(i(308));
			ra = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else ra = ra.next = t;
		return n;
	}
	var ma = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ha = t.unstable_scheduleCallback, ga = t.unstable_NormalPriority, _a = {
		$$typeof: ee,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function va() {
		return {
			controller: new ma(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ya(e) {
		e.refCount--, e.refCount === 0 && ha(ga, function() {
			e.controller.abort();
		});
	}
	var ba = null, k = 0, A = 0, xa = null;
	function Sa(e, t) {
		if (ba === null) {
			var n = ba = [];
			k = 0, A = wd(), xa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return k++, t.then(Ca, Ca), t;
	}
	function Ca() {
		if (--k === 0 && ba !== null) {
			xa !== null && (xa.status = "fulfilled");
			var e = ba;
			ba = null, A = 0, xa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function wa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Ta = w.S;
	w.S = function(e, t) {
		fu = Ie(), typeof t == "object" && t && typeof t.then == "function" && Sa(e, t), Ta !== null && Ta(e, t);
	};
	var Ea = me(null);
	function Da() {
		var e = Ea.current;
		return e === null ? P.pooledCache : e;
	}
	function Oa(e, t) {
		t === null ? ge(Ea, Ea.current) : ge(Ea, t.pool);
	}
	function ka() {
		var e = Da();
		return e === null ? null : {
			parent: _a._currentValue,
			pool: e
		};
	}
	var Aa = Error(i(460)), ja = Error(i(474)), Ma = Error(i(542)), j = { then: function() {} };
	function Na(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Pa(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(dn, dn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ra(e), e;
			default:
				if (typeof t.status == "string") t.then(dn, dn);
				else {
					if (e = P, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Ra(e), e;
				}
				throw Ia = t, Aa;
		}
	}
	function Fa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ia = e, Aa) : e;
		}
	}
	var Ia = null;
	function La() {
		if (Ia === null) throw Error(i(459));
		var e = Ia;
		return Ia = null, e;
	}
	function Ra(e) {
		if (e === Aa || e === Ma) throw Error(i(483));
	}
	var za = null, Ba = 0;
	function Va(e) {
		var t = Ba;
		return Ba += 1, za === null && (za = []), Pa(za, e, t);
	}
	function Ha(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ua(e, t) {
		throw t.$$typeof === m ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Wa(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = xi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Ti(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === _ ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === S && Fa(i) === t.type) ? (t = a(t, n.props), Ha(t, n), t.return = e, t) : (t = Ci(n.type, n.key, n.props, null, e.mode, r), Ha(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Di(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = wi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Ti("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case h: return n = Ci(t.type, t.key, t.props, null, e.mode, n), Ha(n, t), n.return = e, n;
					case g: return t = Di(t, e.mode, n), t.return = e, t;
					case S: return t = Fa(t), f(e, t, n);
				}
				if (ue(t) || se(t)) return t = wi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Va(t), n);
				if (t.$$typeof === ee) return f(e, fa(e, t), n);
				Ua(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case h: return n.key === i ? l(e, t, n, r) : null;
					case g: return n.key === i ? u(e, t, n, r) : null;
					case S: return n = Fa(n), p(e, t, n, r);
				}
				if (ue(n) || se(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Va(n), r);
				if (n.$$typeof === ee) return p(e, t, fa(e, n), r);
				Ua(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case h: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case g: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case S: return r = Fa(r), m(e, t, n, r, i);
				}
				if (ue(r) || se(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Va(r), i);
				if (r.$$typeof === ee) return m(e, t, n, fa(t, r), i);
				Ua(t, r);
			}
			return null;
		}
		function v(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), O && zi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return O && zi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), O && zi(i, h), l;
		}
		function y(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), O && zi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return O && zi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), O && zi(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === _ && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case h:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === _) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === S && Fa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Ha(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === _ ? (c = wi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = Ci(o.type, o.key, o.props, null, e.mode, c), Ha(c, o), c.return = e, e = c);
						}
						return s(e);
					case g:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = Di(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case S: return o = Fa(o), b(e, r, o, c);
				}
				if (ue(o)) return v(e, r, o, c);
				if (se(o)) {
					if (l = se(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), y(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Va(o), c);
				if (o.$$typeof === ee) return b(e, r, fa(e, o), c);
				Ua(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Ti(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ba = 0;
				var i = b(e, t, n, r);
				return za = null, i;
			} catch (t) {
				if (t === Aa || t === Ma) throw t;
				var a = yi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ga = Wa(!0), Ka = Wa(!1), qa = !1;
	function Ja(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Ya(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Xa(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Za(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Xl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = gi(e), hi(e, null, n), t;
		}
		return fi(e, r, t, n), gi(e);
	}
	function Qa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ut(e, n);
		}
	}
	function $a(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var eo = !1;
	function to() {
		if (eo) {
			var e = xa;
			if (e !== null) throw e;
		}
	}
	function no(e, t, n, r) {
		eo = !1;
		var i = e.updateQueue;
		qa = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, m = f !== s.lane;
				if (m ? (I & f) === f : (r & f) === f) {
					f !== 0 && f === A && (eo = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var h = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (h = g.payload, typeof h == "function") {
									d = h.call(_, d, f);
									break a;
								}
								d = h;
								break a;
							case 3: h.flags = h.flags & -65537 | 128;
							case 0:
								if (h = g.payload, f = typeof h == "function" ? h.call(_, d, f) : h, f == null) break a;
								d = p({}, d, f);
								break a;
							case 2: qa = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, m && (e.flags |= 8192), m = i.callbacks, m === null ? i.callbacks = [f] : m.push(f));
				} else m = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = m, c = d) : u = u.next = m, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					m = s, s = m.next, m.next = null, i.lastBaseUpdate = m, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), iu |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function ro(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function io(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) ro(n[e], t);
	}
	var ao = me(null), oo = me(0);
	function so(e, t) {
		e = nu, ge(oo, e), ge(ao, t), nu = e | t.baseLanes;
	}
	function co() {
		ge(oo, nu), ge(ao, ao.current);
	}
	function lo() {
		nu = oo.current, he(ao), he(oo);
	}
	var uo = me(null), fo = null;
	function po(e) {
		var t = e.alternate;
		ge(vo, vo.current & 1), ge(uo, e), fo === null && (t === null || ao.current !== null || t.memoizedState !== null) && (fo = e);
	}
	function mo(e) {
		ge(vo, vo.current), ge(uo, e), fo === null && (fo = e);
	}
	function ho(e) {
		e.tag === 22 ? (ge(vo, vo.current), ge(uo, e), fo === null && (fo = e)) : go(e);
	}
	function go() {
		ge(vo, vo.current), ge(uo, uo.current);
	}
	function _o(e) {
		he(uo), fo === e && (fo = null), he(vo);
	}
	var vo = me(0);
	function yo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || yf(n) || bf(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var bo = 0, M = null, xo = null, So = null, Co = !1, wo = !1, To = !1, Eo = 0, Do = 0, Oo = null, ko = 0;
	function Ao() {
		throw Error(i(321));
	}
	function jo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Nr(e[n], t[n])) return !1;
		return !0;
	}
	function Mo(e, t, n, r, i, a) {
		return bo = a, M = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, w.H = e === null || e.memoizedState === null ? Ys : Xs, To = !1, a = n(r, i), To = !1, wo && (a = Po(t, n, r, i)), No(e), a;
	}
	function No(e) {
		w.H = Js;
		var t = xo !== null && xo.next !== null;
		if (bo = 0, So = xo = M = null, Co = !1, Do = 0, Oo = null, t) throw Error(i(300));
		e === null || pc || (e = e.dependencies, e !== null && la(e) && (pc = !0));
	}
	function Po(e, t, n, r) {
		M = e;
		var a = 0;
		do {
			if (wo && (Oo = null), Do = 0, wo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, So = xo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			w.H = Zs, o = t(n, r);
		} while (wo);
		return o;
	}
	function Fo() {
		var e = w.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Ho(t) : t, e = e.useState()[0], (xo === null ? null : xo.memoizedState) !== e && (M.flags |= 1024), t;
	}
	function Io() {
		var e = Eo !== 0;
		return Eo = 0, e;
	}
	function Lo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Ro(e) {
		if (Co) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Co = !1;
		}
		bo = 0, So = xo = M = null, wo = !1, Do = Eo = 0, Oo = null;
	}
	function zo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return So === null ? M.memoizedState = So = e : So = So.next = e, So;
	}
	function Bo() {
		if (xo === null) {
			var e = M.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = xo.next;
		var t = So === null ? M.memoizedState : So.next;
		if (t !== null) So = t, xo = e;
		else {
			if (e === null) throw M.alternate === null ? Error(i(467)) : Error(i(310));
			xo = e, e = {
				memoizedState: xo.memoizedState,
				baseState: xo.baseState,
				baseQueue: xo.baseQueue,
				queue: xo.queue,
				next: null
			}, So === null ? M.memoizedState = So = e : So = So.next = e;
		}
		return So;
	}
	function Vo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Ho(e) {
		var t = Do;
		return Do += 1, Oo === null && (Oo = []), e = Pa(Oo, e, t), t = M, (So === null ? t.memoizedState : So.next) === null && (t = t.alternate, w.H = t === null || t.memoizedState === null ? Ys : Xs), e;
	}
	function Uo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Ho(e);
			if (e.$$typeof === ee) return da(e);
		}
		throw Error(i(438, String(e)));
	}
	function Wo(e) {
		var t = null, n = M.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = M.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = Vo(), M.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = C;
		return t.index++, n;
	}
	function Go(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Ko(e) {
		return qo(Bo(), xo, e);
	}
	function qo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (bo & f) === f : (I & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === A && (d = !0);
					else if ((bo & p) === p) {
						u = u.next, p === A && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, M.lanes |= p, iu |= p;
					f = u.action, To && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, M.lanes |= f, iu |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Nr(o, e.memoizedState) && (pc = !0, d && (n = xa, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Jo(e) {
		var t = Bo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Nr(o, t.memoizedState) || (pc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Yo(e, t, n) {
		var r = M, a = Bo(), o = O;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Nr((xo || a).memoizedState, n);
		if (s && (a.memoizedState = n, pc = !0), a = a.queue, bs(Qo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || So !== null && So.memoizedState.tag & 1) {
			if (r.flags |= 2048, hs(9, { destroy: void 0 }, Zo.bind(null, r, a, n, t), null), P === null) throw Error(i(349));
			o || bo & 127 || Xo(r, t, n);
		}
		return n;
	}
	function Xo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = M.updateQueue, t === null ? (t = Vo(), M.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Zo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, $o(t) && es(e);
	}
	function Qo(e, t, n) {
		return n(function() {
			$o(t) && es(e);
		});
	}
	function $o(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Nr(e, n);
		} catch {
			return !0;
		}
	}
	function es(e) {
		var t = mi(e, 2);
		t !== null && Du(t, e, 2);
	}
	function ts(e) {
		var t = zo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), To) {
				qe(!0);
				try {
					n();
				} finally {
					qe(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Go,
			lastRenderedState: e
		}, t;
	}
	function ns(e, t, n, r) {
		return e.baseState = n, qo(e, xo, typeof r == "function" ? r : Go);
	}
	function rs(e, t, n, r, a) {
		if (Gs(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			w.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, is(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function is(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = w.T, o = {};
			w.T = o;
			try {
				var s = n(i, r), c = w.S;
				c !== null && c(o, s), as(e, t, s);
			} catch (n) {
				ss(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), w.T = a;
			}
		} else try {
			a = n(i, r), as(e, t, a);
		} catch (n) {
			ss(e, t, n);
		}
	}
	function as(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			os(e, t, n);
		}, function(n) {
			return ss(e, t, n);
		}) : os(e, t, n);
	}
	function os(e, t, n) {
		t.status = "fulfilled", t.value = n, cs(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, is(e, n)));
	}
	function ss(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, cs(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function cs(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function ls(e, t) {
		return t;
	}
	function us(e, t) {
		if (O) {
			var n = P.formState;
			if (n !== null) {
				a: {
					var r = M;
					if (O) {
						if (Wi) {
							b: {
								for (var i = Wi, a = Ki; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = Sf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Wi = Sf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ji(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = zo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ls,
			lastRenderedState: t
		}, n.queue = r, n = Hs.bind(null, M, r), r.dispatch = n, r = ts(!1), a = Ws.bind(null, M, !1, r.queue), r = zo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = rs.bind(null, M, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ds(e) {
		return fs(Bo(), xo, e);
	}
	function fs(e, t, n) {
		if (t = qo(e, t, ls)[0], e = Ko(Go)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Ho(t);
		} catch (e) {
			throw e === Aa ? Ma : e;
		}
		else r = t;
		t = Bo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (M.flags |= 2048, hs(9, { destroy: void 0 }, ps.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ps(e, t) {
		e.action = t;
	}
	function ms(e) {
		var t = Bo(), n = xo;
		if (n !== null) return fs(t, n, e);
		Bo(), t = t.memoizedState, n = Bo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function hs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = M.updateQueue, t === null && (t = Vo(), M.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function gs() {
		return Bo().memoizedState;
	}
	function _s(e, t, n, r) {
		var i = zo();
		M.flags |= e, i.memoizedState = hs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function vs(e, t, n, r) {
		var i = Bo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		xo !== null && r !== null && jo(r, xo.memoizedState.deps) ? i.memoizedState = hs(t, a, n, r) : (M.flags |= e, i.memoizedState = hs(1 | t, a, n, r));
	}
	function ys(e, t) {
		_s(8390656, 8, e, t);
	}
	function bs(e, t) {
		vs(2048, 8, e, t);
	}
	function xs(e) {
		M.flags |= 4;
		var t = M.updateQueue;
		if (t === null) t = Vo(), M.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Ss(e) {
		var t = Bo().memoizedState;
		return xs({
			ref: t,
			nextImpl: e
		}), function() {
			if (Xl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Cs(e, t) {
		return vs(4, 2, e, t);
	}
	function ws(e, t) {
		return vs(4, 4, e, t);
	}
	function Ts(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Es(e, t, n) {
		n = n == null ? null : n.concat([e]), vs(4, 4, Ts.bind(null, t, e), n);
	}
	function Ds() {}
	function Os(e, t) {
		var n = Bo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && jo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ks(e, t) {
		var n = Bo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && jo(t, r[1])) return r[0];
		if (r = e(), To) {
			qe(!0);
			try {
				e();
			} finally {
				qe(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function As(e, t, n) {
		return n === void 0 || bo & 1073741824 && !(I & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Eu(), M.lanes |= e, iu |= e, n);
	}
	function js(e, t, n, r) {
		return Nr(n, t) ? n : ao.current === null ? !(bo & 42) || bo & 1073741824 && !(I & 261930) ? (pc = !0, e.memoizedState = n) : (e = Eu(), M.lanes |= e, iu |= e, t) : (e = As(e, n, r), Nr(e, t) || (pc = !0), e);
	}
	function Ms(e, t, n, r, i) {
		var a = T.p;
		T.p = a !== 0 && 8 > a ? a : 8;
		var o = w.T, s = {};
		w.T = s, Ws(e, !1, t, n);
		try {
			var c = i(), l = w.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Us(e, t, wa(c, r), Tu(e)) : Us(e, t, r, Tu(e));
		} catch (n) {
			Us(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Tu());
		} finally {
			T.p = a, o !== null && s.types !== null && (o.types = s.types), w.T = o;
		}
	}
	function Ns() {}
	function Ps(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Fs(e).queue;
		Ms(e, a, t, de, n === null ? Ns : function() {
			return Is(e), n(r);
		});
	}
	function Fs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: de,
			baseState: de,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Go,
				lastRenderedState: de
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Go,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Is(e) {
		var t = Fs(e);
		t.next === null && (t = e.alternate.memoizedState), Us(e, t.next.queue, {}, Tu());
	}
	function Ls() {
		return da(up);
	}
	function Rs() {
		return Bo().memoizedState;
	}
	function zs() {
		return Bo().memoizedState;
	}
	function Bs(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Tu();
					e = Xa(n);
					var r = Za(t, e, n);
					r !== null && (Du(r, t, n), Qa(r, t, n)), t = { cache: va() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Vs(e, t, n) {
		var r = Tu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Gs(e) ? Ks(t, n) : (n = pi(e, t, n, r), n !== null && (Du(n, e, r), qs(n, t, r)));
	}
	function Hs(e, t, n) {
		Us(e, t, n, Tu());
	}
	function Us(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Gs(e)) Ks(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Nr(s, o)) return fi(e, t, i, 0), P === null && di(), !1;
			} catch {}
			if (n = pi(e, t, i, r), n !== null) return Du(n, e, r), qs(n, t, r), !0;
		}
		return !1;
	}
	function Ws(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: wd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Gs(e)) {
			if (t) throw Error(i(479));
		} else t = pi(e, n, r, 2), t !== null && Du(t, e, 2);
	}
	function Gs(e) {
		var t = e.alternate;
		return e === M || t !== null && t === M;
	}
	function Ks(e, t) {
		wo = Co = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function qs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ut(e, n);
		}
	}
	var Js = {
		readContext: da,
		use: Uo,
		useCallback: Ao,
		useContext: Ao,
		useEffect: Ao,
		useImperativeHandle: Ao,
		useLayoutEffect: Ao,
		useInsertionEffect: Ao,
		useMemo: Ao,
		useReducer: Ao,
		useRef: Ao,
		useState: Ao,
		useDebugValue: Ao,
		useDeferredValue: Ao,
		useTransition: Ao,
		useSyncExternalStore: Ao,
		useId: Ao,
		useHostTransitionStatus: Ao,
		useFormState: Ao,
		useActionState: Ao,
		useOptimistic: Ao,
		useMemoCache: Ao,
		useCacheRefresh: Ao
	};
	Js.useEffectEvent = Ao;
	var Ys = {
		readContext: da,
		use: Uo,
		useCallback: function(e, t) {
			return zo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: da,
		useEffect: ys,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), _s(4194308, 4, Ts.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return _s(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			_s(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = zo();
			t = t === void 0 ? null : t;
			var r = e();
			if (To) {
				qe(!0);
				try {
					e();
				} finally {
					qe(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = zo();
			if (n !== void 0) {
				var i = n(t);
				if (To) {
					qe(!0);
					try {
						n(t);
					} finally {
						qe(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Vs.bind(null, M, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = zo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = ts(e);
			var t = e.queue, n = Hs.bind(null, M, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Ds,
		useDeferredValue: function(e, t) {
			return As(zo(), e, t);
		},
		useTransition: function() {
			var e = ts(!1);
			return e = Ms.bind(null, M, e.queue, !0, !1), zo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = M, a = zo();
			if (O) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), P === null) throw Error(i(349));
				I & 127 || Xo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ys(Qo.bind(null, r, o, e), [e]), r.flags |= 2048, hs(9, { destroy: void 0 }, Zo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = zo(), t = P.identifierPrefix;
			if (O) {
				var n = Ri, r = Li;
				n = (r & ~(1 << 32 - Je(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Eo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = ko++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ls,
		useFormState: us,
		useActionState: us,
		useOptimistic: function(e) {
			var t = zo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ws.bind(null, M, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Wo,
		useCacheRefresh: function() {
			return zo().memoizedState = Bs.bind(null, M);
		},
		useEffectEvent: function(e) {
			var t = zo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Xl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Xs = {
		readContext: da,
		use: Uo,
		useCallback: Os,
		useContext: da,
		useEffect: bs,
		useImperativeHandle: Es,
		useInsertionEffect: Cs,
		useLayoutEffect: ws,
		useMemo: ks,
		useReducer: Ko,
		useRef: gs,
		useState: function() {
			return Ko(Go);
		},
		useDebugValue: Ds,
		useDeferredValue: function(e, t) {
			return js(Bo(), xo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ko(Go)[0], t = Bo().memoizedState;
			return [typeof e == "boolean" ? e : Ho(e), t];
		},
		useSyncExternalStore: Yo,
		useId: Rs,
		useHostTransitionStatus: Ls,
		useFormState: ds,
		useActionState: ds,
		useOptimistic: function(e, t) {
			return ns(Bo(), xo, e, t);
		},
		useMemoCache: Wo,
		useCacheRefresh: zs
	};
	Xs.useEffectEvent = Ss;
	var Zs = {
		readContext: da,
		use: Uo,
		useCallback: Os,
		useContext: da,
		useEffect: bs,
		useImperativeHandle: Es,
		useInsertionEffect: Cs,
		useLayoutEffect: ws,
		useMemo: ks,
		useReducer: Jo,
		useRef: gs,
		useState: function() {
			return Jo(Go);
		},
		useDebugValue: Ds,
		useDeferredValue: function(e, t) {
			var n = Bo();
			return xo === null ? As(n, e, t) : js(n, xo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Jo(Go)[0], t = Bo().memoizedState;
			return [typeof e == "boolean" ? e : Ho(e), t];
		},
		useSyncExternalStore: Yo,
		useId: Rs,
		useHostTransitionStatus: Ls,
		useFormState: ms,
		useActionState: ms,
		useOptimistic: function(e, t) {
			var n = Bo();
			return xo === null ? (n.baseState = e, [e, n.queue.dispatch]) : ns(n, xo, e, t);
		},
		useMemoCache: Wo,
		useCacheRefresh: zs
	};
	Zs.useEffectEvent = Ss;
	function Qs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : p({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var $s = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Tu(), i = Xa(r);
			i.payload = t, n != null && (i.callback = n), t = Za(e, i, r), t !== null && (Du(t, e, r), Qa(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Tu(), i = Xa(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Za(e, i, r), t !== null && (Du(t, e, r), Qa(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Tu(), r = Xa(n);
			r.tag = 2, t != null && (r.callback = t), t = Za(e, r, n), t !== null && (Du(t, e, n), Qa(t, e, n));
		}
	};
	function ec(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Pr(n, r) || !Pr(i, a) : !0;
	}
	function tc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && $s.enqueueReplaceState(t, t.state, null);
	}
	function nc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = p({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function rc(e) {
		si(e);
	}
	function ic(e) {
		console.error(e);
	}
	function ac(e) {
		si(e);
	}
	function oc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function sc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function cc(e, t, n) {
		return n = Xa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			oc(e, t);
		}, n;
	}
	function lc(e) {
		return e = Xa(e), e.tag = 3, e;
	}
	function uc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				sc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			sc(t, n, r), typeof i != "function" && (hu === null ? hu = new Set([this]) : hu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function dc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ca(t, n, a, !0), n = uo.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return fo === null ? zu() : n.alternate === null && ru === 0 && (ru = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === j ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), id(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === j ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), id(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return id(e, r, a), zu(), !1;
		}
		if (O) return t = uo.current, t === null ? (r !== qi && (t = Error(i(423), { cause: r }), ea(ki(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = ki(r, n), a = cc(e.stateNode, r, a), $a(e, a), ru !== 4 && (ru = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== qi && (e = Error(i(422), { cause: r }), ea(ki(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = ki(o, n), L === null ? L = [o] : L.push(o), ru !== 4 && (ru = 2), t === null) return !0;
		r = ki(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = cc(n.stateNode, r, e), $a(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (hu === null || !hu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = lc(a), uc(a, e, n, r), $a(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var fc = Error(i(461)), pc = !1;
	function mc(e, t, n, r) {
		t.child = e === null ? Ka(t, null, n, r) : Ga(t, e.child, n, r);
	}
	function hc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ua(t), r = Mo(e, t, n, o, a, i), s = Io(), e !== null && !pc ? (Lo(e, t, i), zc(e, t, i)) : (O && s && Vi(t), t.flags |= 1, mc(e, t, r, i), t.child);
	}
	function gc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !bi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, _c(e, t, a, r, i)) : (e = Ci(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Bc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Pr : n, n(o, r) && e.ref === t.ref) return zc(e, t, i);
		}
		return t.flags |= 1, e = xi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function _c(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Pr(a, r) && e.ref === t.ref) if (pc = !1, t.pendingProps = r = a, Bc(e, i)) e.flags & 131072 && (pc = !0);
			else return t.lanes = e.lanes, zc(e, t, i);
		}
		return Tc(e, t, n, r, i);
	}
	function vc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return bc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Oa(t, a === null ? null : a.cachePool), a === null ? co() : so(t, a), ho(t);
			else return r = t.lanes = 536870912, bc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Oa(t, null), co(), go(t)) : (Oa(t, a.cachePool), so(t, a), go(t), t.memoizedState = null);
		return mc(e, t, i, n), t.child;
	}
	function yc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function bc(e, t, n, r, i) {
		var a = Da();
		return a = a === null ? null : {
			parent: _a._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Oa(t, null), co(), ho(t), e !== null && ca(e, t, r, !0), t.childLanes = i, null;
	}
	function xc(e, t) {
		return t = Pc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Sc(e, t, n) {
		return Ga(t, e.child, null, n), e = xc(t, t.pendingProps), e.flags |= 2, _o(t), t.memoizedState = null, e;
	}
	function Cc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (O) {
				if (r.mode === "hidden") return e = xc(t, r), t.lanes = 536870912, yc(null, e);
				if (mo(t), (e = Wi) ? (e = vf(e, Ki), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ii === null ? null : {
						id: Li,
						overflow: Ri
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ei(e), n.return = t, t.child = n, D = t, Wi = null)) : e = null, e === null) throw Ji(t);
				return t.lanes = 536870912, null;
			}
			return xc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (mo(t), a) if (t.flags & 256) t.flags &= -257, t = Sc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (pc || ca(e, t, n, !1), a = (n & e.childLanes) !== 0, pc || a) {
				if (r = P, r !== null && (s = dt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, mi(e, s), Du(r, e, s), fc;
				zu(), t = Sc(e, t, n);
			} else e = o.treeContext, Wi = Sf(s.nextSibling), D = t, O = !0, Gi = null, Ki = !1, e !== null && Ui(t, e), t = xc(t, r), t.flags |= 4096;
			return t;
		}
		return e = xi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function wc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Tc(e, t, n, r, i) {
		return ua(t), n = Mo(e, t, n, r, void 0, i), r = Io(), e !== null && !pc ? (Lo(e, t, i), zc(e, t, i)) : (O && r && Vi(t), t.flags |= 1, mc(e, t, n, i), t.child);
	}
	function Ec(e, t, n, r, i, a) {
		return ua(t), t.updateQueue = null, n = Po(t, r, n, i), No(e), r = Io(), e !== null && !pc ? (Lo(e, t, a), zc(e, t, a)) : (O && r && Vi(t), t.flags |= 1, mc(e, t, n, a), t.child);
	}
	function Dc(e, t, n, r, i) {
		if (ua(t), t.stateNode === null) {
			var a = _i, o = n.contextType;
			typeof o == "object" && o && (a = da(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = $s, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ja(t), o = n.contextType, a.context = typeof o == "object" && o ? da(o) : _i, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Qs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && $s.enqueueReplaceState(a, a.state, null), no(t, r, a, i), to(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = nc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = _i, typeof u == "object" && u && (o = da(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && tc(t, a, r, o), qa = !1;
			var f = t.memoizedState;
			a.state = f, no(t, r, a, i), to(), l = t.memoizedState, s || f !== l || qa ? (typeof d == "function" && (Qs(t, n, d, r), l = t.memoizedState), (c = qa || ec(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ya(e, t), o = t.memoizedProps, u = nc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = _i, typeof l == "object" && l && (c = da(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && tc(t, a, r, c), qa = !1, f = t.memoizedState, a.state = f, no(t, r, a, i), to();
			var p = t.memoizedState;
			o !== d || f !== p || qa || e !== null && e.dependencies !== null && la(e.dependencies) ? (typeof s == "function" && (Qs(t, n, s, r), p = t.memoizedState), (u = qa || ec(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && la(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, wc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ga(t, e.child, null, i), t.child = Ga(t, null, n, i)) : mc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = zc(e, t, i), e;
	}
	function Oc(e, t, n, r) {
		return Qi(), t.flags |= 256, mc(e, t, n, r), t.child;
	}
	var kc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Ac(e) {
		return {
			baseLanes: e,
			cachePool: ka()
		};
	}
	function jc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= su), e;
	}
	function Mc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (vo.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (O) {
				if (a ? po(t) : go(t), (e = Wi) ? (e = vf(e, Ki), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ii === null ? null : {
						id: Li,
						overflow: Ri
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ei(e), n.return = t, t.child = n, D = t, Wi = null)) : e = null, e === null) throw Ji(t);
				return bf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (go(t), a = t.mode, c = Pc({
				mode: "hidden",
				children: c
			}, a), r = wi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = Ac(n), r.childLanes = jc(e, s, n), t.memoizedState = kc, yc(null, r)) : (po(t), Nc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (po(t), t.flags &= -257, t = Fc(e, t, n)) : t.memoizedState === null ? (go(t), c = r.fallback, a = t.mode, r = Pc({
				mode: "visible",
				children: r.children
			}, a), c = wi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ga(t, e.child, null, n), r = t.child, r.memoizedState = Ac(n), r.childLanes = jc(e, s, n), t.memoizedState = kc, t = yc(null, r)) : (go(t), t.child = e.child, t.flags |= 128, t = null);
			else if (po(t), bf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, ea({
					value: r,
					source: null,
					stack: null
				}), t = Fc(e, t, n);
			} else if (pc || ca(e, t, n, !1), s = (n & e.childLanes) !== 0, pc || s) {
				if (s = P, s !== null && (r = dt(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, mi(e, r), Du(s, e, r), fc;
				yf(c) || zu(), t = Fc(e, t, n);
			} else yf(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Wi = Sf(c.nextSibling), D = t, O = !0, Gi = null, Ki = !1, e !== null && Ui(t, e), t = Nc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (go(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = xi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = wi(c, a, n, null), c.flags |= 2) : c = xi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, yc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = Ac(n) : (a = c.cachePool, a === null ? a = ka() : (l = _a._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = jc(e, s, n), t.memoizedState = kc, yc(e.child, r)) : (po(t), n = e.child, e = n.sibling, n = xi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Nc(e, t) {
		return t = Pc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Pc(e, t) {
		return e = yi(22, e, null, t), e.lanes = 0, e;
	}
	function Fc(e, t, n) {
		return Ga(t, e.child, null, n), e = Nc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Ic(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), oa(e.return, t, n);
	}
	function Lc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Rc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = vo.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, ge(vo, o), mc(e, t, r, n), r = O ? Ni : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Ic(e, n, t);
			else if (e.tag === 19) Ic(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && yo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Lc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && yo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Lc(t, !0, n, null, a, r);
				break;
			case "together":
				Lc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function zc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), iu |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (ca(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = xi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = xi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Bc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && la(e))) : !0;
	}
	function Vc(e, t, n) {
		switch (t.tag) {
			case 3:
				xe(t, t.stateNode.containerInfo), ia(t, _a, e.memoizedState.cache), Qi();
				break;
			case 27:
			case 5:
				Ce(t);
				break;
			case 4:
				xe(t, t.stateNode.containerInfo);
				break;
			case 10:
				ia(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, mo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (po(t), e = zc(e, t, n), e === null ? null : e.sibling) : Mc(e, t, n) : (po(t), t.flags |= 128, null);
				po(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (ca(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Rc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ge(vo, vo.current), r) break;
				return null;
			case 22: return t.lanes = 0, vc(e, t, n, t.pendingProps);
			case 24: ia(t, _a, e.memoizedState.cache);
		}
		return zc(e, t, n);
	}
	function Hc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) pc = !0;
		else {
			if (!Bc(e, n) && !(t.flags & 128)) return pc = !1, Vc(e, t, n);
			pc = !!(e.flags & 131072);
		}
		else pc = !1, O && t.flags & 1048576 && Bi(t, Ni, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Fa(t.elementType), t.type = e, typeof e == "function") bi(e) ? (r = nc(e, r), t.tag = 1, t = Dc(null, t, e, r, n)) : (t.tag = 0, t = Tc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === te) {
								t.tag = 11, t = hc(null, t, e, r, n);
								break a;
							} else if (a === ie) {
								t.tag = 14, t = gc(null, t, e, r, n);
								break a;
							}
						}
						throw t = le(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Tc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = nc(r, t.pendingProps), Dc(e, t, r, a, n);
			case 3:
				a: {
					if (xe(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ya(e, t), no(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ia(t, _a, r), r !== o.cache && sa(t, [_a], n, !0), to(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = Oc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = ki(Error(i(424)), t), ea(a), t = Oc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Wi = Sf(e.firstChild), D = t, O = !0, Gi = null, Ki = !0, n = Ka(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Qi(), r === a) {
							t = zc(e, t, n);
							break a;
						}
						mc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return wc(e, t), e === null ? (n = Hf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : O || (n = t.type, e = t.pendingProps, r = ef(ye.current).createElement(n), r[_t] = t, r[vt] = e, Jd(r, n, e), At(r), t.stateNode = r) : t.memoizedState = Hf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Ce(t), e === null && O && (r = t.stateNode = Ef(t.type, t.pendingProps, ye.current), D = t, Ki = !0, a = Wi, ff(t.type) ? (Cf = a, Wi = Sf(r.firstChild)) : Wi = a), mc(e, t, t.pendingProps.children, n), wc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && O && ((a = r = Wi) && (r = gf(r, t.type, t.pendingProps, Ki), r === null ? a = !1 : (t.stateNode = r, D = t, Wi = Sf(r.firstChild), Ki = !1, a = !0)), a || Ji(t)), Ce(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, rf(a, o) ? r = null : s !== null && rf(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Mo(e, t, Fo, null, null, n), up._currentValue = a), wc(e, t), mc(e, t, r, n), t.child;
			case 6: return e === null && O && ((e = n = Wi) && (n = _f(n, t.pendingProps, Ki), n === null ? e = !1 : (t.stateNode = n, D = t, Wi = null, e = !0)), e || Ji(t)), null;
			case 13: return Mc(e, t, n);
			case 4: return xe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ga(t, null, r, n) : mc(e, t, r, n), t.child;
			case 11: return hc(e, t, t.type, t.pendingProps, n);
			case 7: return mc(e, t, t.pendingProps, n), t.child;
			case 8: return mc(e, t, t.pendingProps.children, n), t.child;
			case 12: return mc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, ia(t, t.type, r.value), mc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, ua(t), a = da(a), r = r(a), t.flags |= 1, mc(e, t, r, n), t.child;
			case 14: return gc(e, t, t.type, t.pendingProps, n);
			case 15: return _c(e, t, t.type, t.pendingProps, n);
			case 19: return Rc(e, t, n);
			case 31: return Cc(e, t, n);
			case 22: return vc(e, t, n, t.pendingProps);
			case 24: return ua(t), r = da(_a), e === null ? (a = Da(), a === null && (a = P, o = va(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Ja(t), ia(t, _a, a)) : ((e.lanes & n) !== 0 && (Ya(e, t), no(t, null, null, n), to()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ia(t, _a, r), r !== a.cache && sa(t, [_a], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ia(t, _a, r))), mc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Uc(e) {
		e.flags |= 4;
	}
	function Wc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Iu()) e.flags |= 8192;
			else throw Ia = j, ja;
		} else e.flags &= -16777217;
	}
	function Gc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !np(t)) if (Iu()) e.flags |= 8192;
		else throw Ia = j, ja;
	}
	function Kc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : at(), e.lanes |= t, cu |= t);
	}
	function qc(e, t) {
		if (!O) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Jc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Yc(e, t, n) {
		var r = t.pendingProps;
		switch (Hi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Jc(t), null;
			case 1: return Jc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), aa(_a), Se(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Zi(t) ? Uc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, $i())), Jc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Uc(t), o === null ? (Jc(t), Wc(t, a, null, r, n)) : (Jc(t), Gc(t, o))) : o ? o === e.memoizedState ? (Jc(t), t.flags &= -16777217) : (Uc(t), Jc(t), Gc(t, o)) : (e = e.memoizedProps, e !== r && Uc(t), Jc(t), Wc(t, a, e, r, n)), null;
			case 27:
				if (E(t), n = ye.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Uc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Jc(t), null;
					}
					e = _e.current, Zi(t) ? Yi(t, e) : (e = Ef(a, r, n), t.stateNode = e, Uc(t));
				}
				return Jc(t), null;
			case 5:
				if (E(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Uc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Jc(t), null;
					}
					if (o = _e.current, Zi(t)) Yi(t, o);
					else {
						var s = ef(ye.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[_t] = t, o[vt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Jd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Uc(t);
					}
				}
				return Jc(t), Wc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Uc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = ye.current, Zi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = D, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[_t] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Gd(e.nodeValue, n)), e || Ji(t, !0);
					} else e = ef(e).createTextNode(r), e[_t] = t, t.stateNode = e;
				}
				return Jc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Zi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[_t] = t;
						} else Qi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Jc(t), e = !1;
					} else n = $i(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (_o(t), t) : (_o(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Jc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Zi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[_t] = t;
						} else Qi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Jc(t), a = !1;
					} else a = $i(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (_o(t), t) : (_o(t), null);
				}
				return _o(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Kc(t, t.updateQueue), Jc(t), null);
			case 4: return Se(), e === null && Fd(t.stateNode.containerInfo), Jc(t), null;
			case 10: return aa(t.type), Jc(t), null;
			case 19:
				if (he(vo), r = t.memoizedState, r === null) return Jc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) qc(r, !1);
				else {
					if (ru !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = yo(e), o !== null) {
							for (t.flags |= 128, qc(r, !1), e = o.updateQueue, t.updateQueue = e, Kc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Si(n, e), n = n.sibling;
							return ge(vo, vo.current & 1 | 2), O && zi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Ie() > pu && (t.flags |= 128, a = !0, qc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = yo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Kc(t, e), qc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !O) return Jc(t), null;
					} else 2 * Ie() - r.renderingStartTime > pu && n !== 536870912 && (t.flags |= 128, a = !0, qc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Jc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ie(), e.sibling = null, n = vo.current, ge(vo, a ? n & 1 | 2 : n & 1), O && zi(t, r.treeForkCount), e);
			case 22:
			case 23: return _o(t), lo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Jc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Jc(t), n = t.updateQueue, n !== null && Kc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && he(Ea), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), aa(_a), Jc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Xc(e, t) {
		switch (Hi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return aa(_a), Se(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return E(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (_o(t), t.alternate === null) throw Error(i(340));
					Qi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (_o(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Qi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return he(vo), null;
			case 4: return Se(), null;
			case 10: return aa(t.type), null;
			case 22:
			case 23: return _o(t), lo(), e !== null && he(Ea), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return aa(_a), null;
			case 25: return null;
			default: return null;
		}
	}
	function Zc(e, t) {
		switch (Hi(t), t.tag) {
			case 3:
				aa(_a), Se();
				break;
			case 26:
			case 27:
			case 5:
				E(t);
				break;
			case 4:
				Se();
				break;
			case 31:
				t.memoizedState !== null && _o(t);
				break;
			case 13:
				_o(t);
				break;
			case 19:
				he(vo);
				break;
			case 10:
				aa(t.type);
				break;
			case 22:
			case 23:
				_o(t), lo(), e !== null && he(Ea);
				break;
			case 24: aa(_a);
		}
	}
	function Qc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			rd(t, t.return, e);
		}
	}
	function $c(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								rd(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			rd(t, t.return, e);
		}
	}
	function el(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				io(t, n);
			} catch (t) {
				rd(e, e.return, t);
			}
		}
	}
	function tl(e, t, n) {
		n.props = nc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			rd(e, t, n);
		}
	}
	function nl(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			rd(e, t, n);
		}
	}
	function rl(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			rd(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			rd(e, t, n);
		}
		else n.current = null;
	}
	function il(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			rd(e, e.return, t);
		}
	}
	function al(e, t, n) {
		try {
			var r = e.stateNode;
			Yd(r, e.type, n, t), r[vt] = t;
		} catch (t) {
			rd(e, e.return, t);
		}
	}
	function ol(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ff(e.type) || e.tag === 4;
	}
	function sl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || ol(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && ff(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function cl(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = dn));
		else if (r !== 4 && (r === 27 && ff(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (cl(e, t, n), e = e.sibling; e !== null;) cl(e, t, n), e = e.sibling;
	}
	function ll(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && ff(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (ll(e, t, n), e = e.sibling; e !== null;) ll(e, t, n), e = e.sibling;
	}
	function ul(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Jd(t, r, n), t[_t] = e, t[vt] = n;
		} catch (t) {
			rd(e, e.return, t);
		}
	}
	var dl = !1, fl = !1, pl = !1, ml = typeof WeakSet == "function" ? WeakSet : Set, hl = null;
	function gl(e, t) {
		if (e = e.containerInfo, Qd = yp, e = Rr(e), zr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for ($d = {
			focusedElem: e,
			selectionRange: n
		}, yp = !1, hl = t; hl !== null;) if (t = hl, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, hl = e;
		else for (; hl !== null;) {
			switch (t = hl, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = nc(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							rd(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) hf(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								hf(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, hl = e;
				break;
			}
			hl = t.return;
		}
	}
	function _l(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Ml(e, n), r & 4 && Qc(5, n);
				break;
			case 1:
				if (Ml(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					rd(n, n.return, e);
				}
				else {
					var i = nc(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						rd(n, n.return, e);
					}
				}
				r & 64 && el(n), r & 512 && nl(n, n.return);
				break;
			case 3:
				if (Ml(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						io(e, t);
					} catch (e) {
						rd(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && ul(n);
			case 26:
			case 5:
				Ml(e, n), t === null && r & 4 && il(n), r & 512 && nl(n, n.return);
				break;
			case 12:
				Ml(e, n);
				break;
			case 31:
				Ml(e, n), r & 4 && Cl(e, n);
				break;
			case 13:
				Ml(e, n), r & 4 && wl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = sd.bind(null, n), xf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || dl, !r) {
					t = t !== null && t.memoizedState !== null || fl, i = dl;
					var a = fl;
					dl = r, (fl = t) && !a ? Pl(e, n, (n.subtreeFlags & 8772) != 0) : Ml(e, n), dl = i, fl = a;
				}
				break;
			case 30: break;
			default: Ml(e, n);
		}
	}
	function vl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, vl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Tt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var yl = null, bl = !1;
	function xl(e, t, n) {
		for (n = n.child; n !== null;) Sl(e, t, n), n = n.sibling;
	}
	function Sl(e, t, n) {
		if (Ke && typeof Ke.onCommitFiberUnmount == "function") try {
			Ke.onCommitFiberUnmount(Ge, n);
		} catch {}
		switch (n.tag) {
			case 26:
				fl || rl(n, t), xl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				fl || rl(n, t);
				var r = yl, i = bl;
				ff(n.type) && (yl = n.stateNode, bl = !1), xl(e, t, n), Df(n.stateNode), yl = r, bl = i;
				break;
			case 5: fl || rl(n, t);
			case 6:
				if (r = yl, i = bl, yl = null, xl(e, t, n), yl = r, bl = i, yl !== null) if (bl) try {
					(yl.nodeType === 9 ? yl.body : yl.nodeName === "HTML" ? yl.ownerDocument.body : yl).removeChild(n.stateNode);
				} catch (e) {
					rd(n, t, e);
				}
				else try {
					yl.removeChild(n.stateNode);
				} catch (e) {
					rd(n, t, e);
				}
				break;
			case 18:
				yl !== null && (bl ? (e = yl, pf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Gp(e)) : pf(yl, n.stateNode));
				break;
			case 4:
				r = yl, i = bl, yl = n.stateNode.containerInfo, bl = !0, xl(e, t, n), yl = r, bl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				$c(2, n, t), fl || $c(4, n, t), xl(e, t, n);
				break;
			case 1:
				fl || (rl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && tl(n, t, r)), xl(e, t, n);
				break;
			case 21:
				xl(e, t, n);
				break;
			case 22:
				fl = (r = fl) || n.memoizedState !== null, xl(e, t, n), fl = r;
				break;
			default: xl(e, t, n);
		}
	}
	function Cl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Gp(e);
			} catch (e) {
				rd(t, t.return, e);
			}
		}
	}
	function wl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Gp(e);
		} catch (e) {
			rd(t, t.return, e);
		}
	}
	function Tl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new ml()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new ml()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function El(e, t) {
		var n = Tl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = cd.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Dl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (ff(c.type)) {
							yl = c.stateNode, bl = !1;
							break a;
						}
						break;
					case 5:
						yl = c.stateNode, bl = !1;
						break a;
					case 3:
					case 4:
						yl = c.stateNode.containerInfo, bl = !0;
						break a;
				}
				c = c.return;
			}
			if (yl === null) throw Error(i(160));
			Sl(o, s, a), yl = null, bl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) kl(t, e), t = t.sibling;
	}
	var Ol = null;
	function kl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				Dl(t, e), Al(e), r & 4 && ($c(3, e, e.return), Qc(3, e), $c(5, e, e.return));
				break;
			case 1:
				Dl(t, e), Al(e), r & 512 && (fl || n === null || rl(n, n.return)), r & 64 && dl && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = Ol;
				if (Dl(t, e), Al(e), r & 512 && (fl || n === null || rl(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[wt] || o[_t] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Jd(o, r, n), o[_t] = e, At(o), r = o;
									break a;
								case "link":
									var s = $f("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Jd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = $f("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Jd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[_t] = e, At(o), r = o;
						}
						e.stateNode = r;
					} else ep(a, e.type, e.stateNode);
					else e.stateNode = Jf(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && al(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? ep(a, e.type, e.stateNode) : Jf(a, r, e.memoizedProps));
				}
				break;
			case 27:
				Dl(t, e), Al(e), r & 512 && (fl || n === null || rl(n, n.return)), n !== null && r & 4 && al(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (Dl(t, e), Al(e), r & 512 && (fl || n === null || rl(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						nn(a, "");
					} catch (t) {
						rd(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, al(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (pl = !0);
				break;
			case 6:
				if (Dl(t, e), Al(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						rd(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Qf = null, a = Ol, Ol = z(t.containerInfo), Dl(t, e), Ol = a, Al(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Gp(t.containerInfo);
				} catch (t) {
					rd(e, e.return, t);
				}
				pl && (pl = !1, jl(e));
				break;
			case 4:
				r = Ol, Ol = z(e.stateNode.containerInfo), Dl(t, e), Al(e), Ol = r;
				break;
			case 12:
				Dl(t, e), Al(e);
				break;
			case 31:
				Dl(t, e), Al(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, El(e, r)));
				break;
			case 13:
				Dl(t, e), Al(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (du = Ie()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, El(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = dl, d = fl;
				if (dl = u || a, fl = d || l, Dl(t, e), fl = d, dl = u, Al(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || dl || fl || Nl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								rd(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								rd(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? mf(m, !0) : mf(l.stateNode, !1);
							} catch (e) {
								rd(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, El(e, n))));
				break;
			case 19:
				Dl(t, e), Al(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, El(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: Dl(t, e), Al(e);
		}
	}
	function Al(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (ol(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						ll(e, sl(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (nn(o, ""), n.flags &= -33), ll(e, sl(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						cl(e, sl(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				rd(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function jl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			jl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function Ml(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) _l(e, t.alternate, t), t = t.sibling;
	}
	function Nl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					$c(4, t, t.return), Nl(t);
					break;
				case 1:
					rl(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && tl(t, t.return, n), Nl(t);
					break;
				case 27: Df(t.stateNode);
				case 26:
				case 5:
					rl(t, t.return), Nl(t);
					break;
				case 22:
					t.memoizedState === null && Nl(t);
					break;
				case 30:
					Nl(t);
					break;
				default: Nl(t);
			}
			e = e.sibling;
		}
	}
	function Pl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Pl(i, a, n), Qc(4, a);
					break;
				case 1:
					if (Pl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						rd(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) ro(c[i], s);
						} catch (e) {
							rd(r, r.return, e);
						}
					}
					n && o & 64 && el(a), nl(a, a.return);
					break;
				case 27: ul(a);
				case 26:
				case 5:
					Pl(i, a, n), n && r === null && o & 4 && il(a), nl(a, a.return);
					break;
				case 12:
					Pl(i, a, n);
					break;
				case 31:
					Pl(i, a, n), n && o & 4 && Cl(i, a);
					break;
				case 13:
					Pl(i, a, n), n && o & 4 && wl(i, a);
					break;
				case 22:
					a.memoizedState === null && Pl(i, a, n), nl(a, a.return);
					break;
				case 30: break;
				default: Pl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Fl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ya(n));
	}
	function Il(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ya(e));
	}
	function Ll(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Rl(e, t, n, r), t = t.sibling;
	}
	function Rl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Ll(e, t, n, r), i & 2048 && Qc(9, t);
				break;
			case 1:
				Ll(e, t, n, r);
				break;
			case 3:
				Ll(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ya(e)));
				break;
			case 12:
				if (i & 2048) {
					Ll(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						rd(t, t.return, e);
					}
				} else Ll(e, t, n, r);
				break;
			case 31:
				Ll(e, t, n, r);
				break;
			case 13:
				Ll(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Ll(e, t, n, r) : (a._visibility |= 2, N(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Ll(e, t, n, r) : zl(e, t), i & 2048 && Fl(o, t);
				break;
			case 24:
				Ll(e, t, n, r), i & 2048 && Il(t.alternate, t);
				break;
			default: Ll(e, t, n, r);
		}
	}
	function N(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					N(a, o, s, c, i), Qc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, N(a, o, s, c, i)) : u._visibility & 2 ? N(a, o, s, c, i) : zl(a, o), i && l & 2048 && Fl(o.alternate, o);
					break;
				case 24:
					N(a, o, s, c, i), i && l & 2048 && Il(o.alternate, o);
					break;
				default: N(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function zl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					zl(n, r), i & 2048 && Fl(r.alternate, r);
					break;
				case 24:
					zl(n, r), i & 2048 && Il(r.alternate, r);
					break;
				default: zl(n, r);
			}
			t = t.sibling;
		}
	}
	var Bl = 8192;
	function Vl(e, t, n) {
		if (e.subtreeFlags & Bl) for (e = e.child; e !== null;) Hl(e, t, n), e = e.sibling;
	}
	function Hl(e, t, n) {
		switch (e.tag) {
			case 26:
				Vl(e, t, n), e.flags & Bl && e.memoizedState !== null && rp(n, Ol, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Vl(e, t, n);
				break;
			case 3:
			case 4:
				var r = Ol;
				Ol = z(e.stateNode.containerInfo), Vl(e, t, n), Ol = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Bl, Bl = 16777216, Vl(e, t, n), Bl = r) : Vl(e, t, n));
				break;
			default: Vl(e, t, n);
		}
	}
	function Ul(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Wl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				hl = r, ql(r, e);
			}
			Ul(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Gl(e), e = e.sibling;
	}
	function Gl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Wl(e), e.flags & 2048 && $c(9, e, e.return);
				break;
			case 3:
				Wl(e);
				break;
			case 12:
				Wl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Kl(e)) : Wl(e);
				break;
			default: Wl(e);
		}
	}
	function Kl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				hl = r, ql(r, e);
			}
			Ul(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					$c(8, t, t.return), Kl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Kl(t));
					break;
				default: Kl(t);
			}
			e = e.sibling;
		}
	}
	function ql(e, t) {
		for (; hl !== null;) {
			var n = hl;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					$c(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ya(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, hl = r;
			else a: for (n = e; hl !== null;) {
				r = hl;
				var i = r.sibling, a = r.return;
				if (vl(r), r === n) {
					hl = null;
					break a;
				}
				if (i !== null) {
					i.return = a, hl = i;
					break a;
				}
				hl = a;
			}
		}
	}
	var Jl = {
		getCacheForType: function(e) {
			var t = da(_a), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return da(_a).controller.signal;
		}
	}, Yl = typeof WeakMap == "function" ? WeakMap : Map, Xl = 0, P = null, F = null, I = 0, Zl = 0, Ql = null, $l = !1, eu = !1, tu = !1, nu = 0, ru = 0, iu = 0, au = 0, ou = 0, su = 0, cu = 0, L = null, lu = null, uu = !1, du = 0, fu = 0, pu = Infinity, mu = null, hu = null, gu = 0, _u = null, vu = null, yu = 0, bu = 0, xu = null, Su = null, Cu = 0, wu = null;
	function Tu() {
		return Xl & 2 && I !== 0 ? I & -I : w.T === null ? mt() : wd();
	}
	function Eu() {
		if (su === 0) if (!(I & 536870912) || O) {
			var e = $e;
			$e <<= 1, !($e & 3932160) && ($e = 262144), su = e;
		} else su = 536870912;
		return e = uo.current, e !== null && (e.flags |= 32), su;
	}
	function Du(e, t, n) {
		(e === P && (Zl === 2 || Zl === 9) || e.cancelPendingCommit !== null) && (Pu(e, 0), ju(e, I, su, !1)), st(e, n), (!(Xl & 2) || e !== P) && (e === P && (!(Xl & 2) && (au |= n), ru === 4 && ju(e, I, su, !1)), gd(e));
	}
	function Ou(e, t, n) {
		if (Xl & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || rt(e, t), a = r ? Hu(e, t) : Bu(e, t, !0), o = r;
		do {
			if (a === 0) {
				eu && !r && ju(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !Au(n)) {
					a = Bu(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = L;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Pu(c, s).flags |= 256), s = Bu(c, s, !1), s !== 2) {
								if (tu && !l) {
									c.errorRecoveryDisabledLanes |= o, au |= o, a = 4;
									break a;
								}
								o = lu, lu = a, o !== null && (lu === null ? lu = o : lu.push.apply(lu, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Pu(e, 0), ju(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							ju(r, t, su, !$l);
							break a;
						case 2:
							lu = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = du + 300 - Ie(), 10 < a)) {
						if (ju(r, t, su, !$l), nt(r, 0, !0) !== 0) break a;
						yu = t, r.timeoutHandle = sf(ku.bind(null, r, n, lu, mu, uu, t, su, au, cu, $l, o, "Throttled", -0, 0), a);
						break a;
					}
					ku(r, n, lu, mu, uu, t, su, au, cu, $l, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		gd(e);
	}
	function ku(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: dn
			}, Hl(t, a, d);
			var m = (a & 62914560) === a ? du - Ie() : (a & 4194048) === a ? fu - Ie() : 0;
			if (m = ap(d, m), m !== null) {
				yu = a, e.cancelPendingCommit = m(Yu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), ju(e, a, o, !l);
				return;
			}
		}
		Yu(e, t, a, n, r, i, o, s, c);
	}
	function Au(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Nr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function ju(e, t, n, r) {
		t &= ~ou, t &= ~au, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Je(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && lt(e, n, t);
	}
	function Mu() {
		return Xl & 6 ? !0 : (_d(0, !1), !1);
	}
	function Nu() {
		if (F !== null) {
			if (Zl === 0) var e = F.return;
			else e = F, ra = na = null, Ro(e), za = null, Ba = 0, e = F;
			for (; e !== null;) Zc(e.alternate, e), e = e.return;
			F = null;
		}
	}
	function Pu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, cf(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), yu = 0, Nu(), P = e, F = n = xi(e.current, null), I = t, Zl = 0, Ql = null, $l = !1, eu = rt(e, t), tu = !1, cu = su = ou = au = iu = ru = 0, lu = L = null, uu = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Je(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return nu = t, di(), n;
	}
	function Fu(e, t) {
		M = null, w.H = Js, t === Aa || t === Ma ? (t = La(), Zl = 3) : t === ja ? (t = La(), Zl = 4) : Zl = t === fc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Ql = t, F === null && (ru = 1, oc(e, ki(t, e.current)));
	}
	function Iu() {
		var e = uo.current;
		return e === null ? !0 : (I & 4194048) === I ? fo === null : (I & 62914560) === I || I & 536870912 ? e === fo : !1;
	}
	function Lu() {
		var e = w.H;
		return w.H = Js, e === null ? Js : e;
	}
	function Ru() {
		var e = w.A;
		return w.A = Jl, e;
	}
	function zu() {
		ru = 4, $l || (I & 4194048) !== I && uo.current !== null || (eu = !0), !(iu & 134217727) && !(au & 134217727) || P === null || ju(P, I, su, !1);
	}
	function Bu(e, t, n) {
		var r = Xl;
		Xl |= 2;
		var i = Lu(), a = Ru();
		(P !== e || I !== t) && (mu = null, Pu(e, t)), t = !1;
		var o = ru;
		a: do
			try {
				if (Zl !== 0 && F !== null) {
					var s = F, c = Ql;
					switch (Zl) {
						case 8:
							Nu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							uo.current === null && (t = !0);
							var l = Zl;
							if (Zl = 0, Ql = null, Ku(e, s, c, l), n && eu) {
								o = 0;
								break a;
							}
							break;
						default: l = Zl, Zl = 0, Ql = null, Ku(e, s, c, l);
					}
				}
				Vu(), o = ru;
				break;
			} catch (t) {
				Fu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, ra = na = null, Xl = r, w.H = i, w.A = a, F === null && (P = null, I = 0, di()), o;
	}
	function Vu() {
		for (; F !== null;) Wu(F);
	}
	function Hu(e, t) {
		var n = Xl;
		Xl |= 2;
		var r = Lu(), a = Ru();
		P !== e || I !== t ? (mu = null, pu = Ie() + 500, Pu(e, t)) : eu = rt(e, t);
		a: do
			try {
				if (Zl !== 0 && F !== null) {
					t = F;
					var o = Ql;
					b: switch (Zl) {
						case 1:
							Zl = 0, Ql = null, Ku(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Na(o)) {
								Zl = 0, Ql = null, Gu(t);
								break;
							}
							t = function() {
								Zl !== 2 && Zl !== 9 || P !== e || (Zl = 7), gd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Zl = 7;
							break a;
						case 4:
							Zl = 5;
							break a;
						case 7:
							Na(o) ? (Zl = 0, Ql = null, Gu(t)) : (Zl = 0, Ql = null, Ku(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (F.tag) {
								case 26: s = F.memoizedState;
								case 5:
								case 27:
									var c = F;
									if (s ? np(s) : c.stateNode.complete) {
										Zl = 0, Ql = null;
										var l = c.sibling;
										if (l !== null) F = l;
										else {
											var u = c.return;
											u === null ? F = null : (F = u, qu(u));
										}
										break b;
									}
							}
							Zl = 0, Ql = null, Ku(e, t, o, 5);
							break;
						case 6:
							Zl = 0, Ql = null, Ku(e, t, o, 6);
							break;
						case 8:
							Nu(), ru = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Uu();
				break;
			} catch (t) {
				Fu(e, t);
			}
		while (1);
		return ra = na = null, w.H = r, w.A = a, Xl = n, F === null ? (P = null, I = 0, di(), ru) : 0;
	}
	function Uu() {
		for (; F !== null && !Pe();) Wu(F);
	}
	function Wu(e) {
		var t = Hc(e.alternate, e, nu);
		e.memoizedProps = e.pendingProps, t === null ? qu(e) : F = t;
	}
	function Gu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Ec(n, t, t.pendingProps, t.type, void 0, I);
				break;
			case 11:
				t = Ec(n, t, t.pendingProps, t.type.render, t.ref, I);
				break;
			case 5: Ro(t);
			default: Zc(n, t), t = F = Si(t, nu), t = Hc(n, t, nu);
		}
		e.memoizedProps = e.pendingProps, t === null ? qu(e) : F = t;
	}
	function Ku(e, t, n, r) {
		ra = na = null, Ro(t), za = null, Ba = 0;
		var i = t.return;
		try {
			if (dc(e, i, t, n, I)) {
				ru = 1, oc(e, ki(n, e.current)), F = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw F = i, t;
			ru = 1, oc(e, ki(n, e.current)), F = null;
			return;
		}
		t.flags & 32768 ? (O || r === 1 ? e = !0 : eu || I & 536870912 ? e = !1 : ($l = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = uo.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Ju(t, e)) : qu(t);
	}
	function qu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Ju(t, $l);
				return;
			}
			e = t.return;
			var n = Yc(t.alternate, t, nu);
			if (n !== null) {
				F = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				F = t;
				return;
			}
			F = t = e;
		} while (t !== null);
		ru === 0 && (ru = 5);
	}
	function Ju(e, t) {
		do {
			var n = Xc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, F = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				F = e;
				return;
			}
			F = e = n;
		} while (e !== null);
		ru = 6, F = null;
	}
	function Yu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			ed();
		while (gu !== 0);
		if (Xl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= ui, ct(e, n, o, s, c, l), e === P && (F = P = null, I = 0), vu = t, _u = e, yu = n, bu = o, xu = a, Su = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, ld(Be, function() {
				return td(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = w.T, w.T = null, a = T.p, T.p = 2, s = Xl, Xl |= 4;
				try {
					gl(e, t, n);
				} finally {
					Xl = s, T.p = a, w.T = r;
				}
			}
			gu = 1, Xu(), Zu(), Qu();
		}
	}
	function Xu() {
		if (gu === 1) {
			gu = 0;
			var e = _u, t = vu, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = w.T, w.T = null;
				var r = T.p;
				T.p = 2;
				var i = Xl;
				Xl |= 4;
				try {
					kl(t, e);
					var a = $d, o = Rr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Lr(s.ownerDocument.documentElement, s)) {
						if (c !== null && zr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Ir(s, h), v = Ir(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					yp = !!Qd, $d = Qd = null;
				} finally {
					Xl = i, T.p = r, w.T = n;
				}
			}
			e.current = t, gu = 2;
		}
	}
	function Zu() {
		if (gu === 2) {
			gu = 0;
			var e = _u, t = vu, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = w.T, w.T = null;
				var r = T.p;
				T.p = 2;
				var i = Xl;
				Xl |= 4;
				try {
					_l(e, t.alternate, t);
				} finally {
					Xl = i, T.p = r, w.T = n;
				}
			}
			gu = 3;
		}
	}
	function Qu() {
		if (gu === 4 || gu === 3) {
			gu = 0, Fe();
			var e = _u, t = vu, n = yu, r = Su;
			t.subtreeFlags & 10256 || t.flags & 10256 ? gu = 5 : (gu = 0, vu = _u = null, $u(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (hu = null), pt(n), t = t.stateNode, Ke && typeof Ke.onCommitFiberRoot == "function") try {
				Ke.onCommitFiberRoot(Ge, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = w.T, i = T.p, T.p = 2, w.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					w.T = t, T.p = i;
				}
			}
			yu & 3 && ed(), gd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === wu ? Cu++ : (Cu = 0, wu = e) : Cu = 0, _d(0, !1);
		}
	}
	function $u(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ya(t)));
	}
	function ed() {
		return Xu(), Zu(), Qu(), td();
	}
	function td() {
		if (gu !== 5) return !1;
		var e = _u, t = bu;
		bu = 0;
		var n = pt(yu), r = w.T, a = T.p;
		try {
			T.p = 32 > n ? 32 : n, w.T = null, n = xu, xu = null;
			var o = _u, s = yu;
			if (gu = 0, vu = _u = null, yu = 0, Xl & 6) throw Error(i(331));
			var c = Xl;
			if (Xl |= 4, Gl(o.current), Rl(o, o.current, s, n), Xl = c, _d(0, !1), Ke && typeof Ke.onPostCommitFiberRoot == "function") try {
				Ke.onPostCommitFiberRoot(Ge, o);
			} catch {}
			return !0;
		} finally {
			T.p = a, w.T = r, $u(e, t);
		}
	}
	function nd(e, t, n) {
		t = ki(n, t), t = cc(e.stateNode, t, 2), e = Za(e, t, 2), e !== null && (st(e, 2), gd(e));
	}
	function rd(e, t, n) {
		if (e.tag === 3) nd(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				nd(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (hu === null || !hu.has(r))) {
					e = ki(n, e), n = lc(2), r = Za(t, n, 2), r !== null && (uc(n, r, t, e), st(r, 2), gd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function id(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Yl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (tu = !0, i.add(n), e = ad.bind(null, e, t, n), t.then(e, e));
	}
	function ad(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, P === e && (I & n) === n && (ru === 4 || ru === 3 && (I & 62914560) === I && 300 > Ie() - du ? !(Xl & 2) && Pu(e, 0) : ou |= n, cu === I && (cu = 0)), gd(e);
	}
	function od(e, t) {
		t === 0 && (t = at()), e = mi(e, t), e !== null && (st(e, t), gd(e));
	}
	function sd(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), od(e, n);
	}
	function cd(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), od(e, n);
	}
	function ld(e, t) {
		return Me(e, t);
	}
	var ud = null, dd = null, fd = !1, pd = !1, md = !1, hd = 0;
	function gd(e) {
		e !== dd && e.next === null && (dd === null ? ud = dd = e : dd = dd.next = e), pd = !0, fd || (fd = !0, Cd());
	}
	function _d(e, t) {
		if (!md && pd) {
			md = !0;
			do
				for (var n = !1, r = ud; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Je(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, Sd(r, a));
					} else a = I, a = nt(r, r === P ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || rt(r, a) || (n = !0, Sd(r, a));
					r = r.next;
				}
			while (n);
			md = !1;
		}
	}
	function vd() {
		yd();
	}
	function yd() {
		pd = fd = !1;
		var e = 0;
		hd !== 0 && of() && (e = hd);
		for (var t = Ie(), n = null, r = ud; r !== null;) {
			var i = r.next, a = bd(r, t);
			a === 0 ? (r.next = null, n === null ? ud = i : n.next = i, i === null && (dd = n)) : (n = r, (e !== 0 || a & 3) && (pd = !0)), r = i;
		}
		gu !== 0 && gu !== 5 || _d(e, !1), hd !== 0 && (hd = 0);
	}
	function bd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Je(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = it(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = P, n = I, n = nt(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Zl === 2 || Zl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ne(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || rt(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ne(r), pt(n)) {
				case 2:
				case 8:
					n = ze;
					break;
				case 32:
					n = Be;
					break;
				case 268435456:
					n = He;
					break;
				default: n = Be;
			}
			return r = xd.bind(null, e), n = Me(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ne(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function xd(e, t) {
		if (gu !== 0 && gu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (ed() && e.callbackNode !== n) return null;
		var r = I;
		return r = nt(e, e === P ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Ou(e, r, t), bd(e, Ie()), e.callbackNode != null && e.callbackNode === n ? xd.bind(null, e) : null);
	}
	function Sd(e, t) {
		if (ed()) return null;
		Ou(e, t, !0);
	}
	function Cd() {
		uf(function() {
			Xl & 6 ? Me(Re, vd) : yd();
		});
	}
	function wd() {
		if (hd === 0) {
			var e = A;
			e === 0 && (e = Qe, Qe <<= 1, !(Qe & 261888) && (Qe = 256)), hd = e;
		}
		return hd;
	}
	function Td(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : un("" + e);
	}
	function Ed(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function Dd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Td((i[vt] || null).action), o = r.submitter;
			o && (t = (t = o[vt] || null) ? Td(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Mn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (hd !== 0) {
								var e = o ? Ed(i, o) : new FormData(i);
								Ps(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? Ed(i, o) : new FormData(i), Ps(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Od = 0; Od < ai.length; Od++) {
		var kd = ai[Od];
		oi(kd.toLowerCase(), "on" + (kd[0].toUpperCase() + kd.slice(1)));
	}
	oi(Zr, "onAnimationEnd"), oi(Qr, "onAnimationIteration"), oi($r, "onAnimationStart"), oi("dblclick", "onDoubleClick"), oi("focusin", "onFocus"), oi("focusout", "onBlur"), oi(ei, "onTransitionRun"), oi(ti, "onTransitionStart"), oi(ni, "onTransitionCancel"), oi(ri, "onTransitionEnd"), Pt("onMouseEnter", ["mouseout", "mouseover"]), Pt("onMouseLeave", ["mouseout", "mouseover"]), Pt("onPointerEnter", ["pointerout", "pointerover"]), Pt("onPointerLeave", ["pointerout", "pointerover"]), Nt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Nt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Nt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Nt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Nt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Nt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Ad = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), jd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ad));
	function Md(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						si(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						si(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function R(e, t) {
		var n = t[bt];
		n === void 0 && (n = t[bt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Id(t, e, 2, !1), n.add(r));
	}
	function Nd(e, t, n) {
		var r = 0;
		t && (r |= 4), Id(n, e, r, t);
	}
	var Pd = "_reactListening" + Math.random().toString(36).slice(2);
	function Fd(e) {
		if (!e[Pd]) {
			e[Pd] = !0, jt.forEach(function(t) {
				t !== "selectionchange" && (jd.has(t) || Nd(t, !1, e), Nd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Pd] || (t[Pd] = !0, Nd("selectionchange", !1, t));
		}
	}
	function Id(e, t, n, r) {
		switch (Ep(t)) {
			case 2:
				var i = bp;
				break;
			case 8:
				i = xp;
				break;
			default: i = Sp;
		}
		n = i.bind(null, t, n, e), i = void 0, !xn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Ld(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = Et(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		vn(function() {
			var r = a, i = pn(n), s = [];
			a: {
				var c = ii.get(e);
				if (c !== void 0) {
					var l = Mn, u = e;
					switch (e) {
						case "keypress": if (Dn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Xn;
							break;
						case "focusin":
							u = "focus", l = Vn;
							break;
						case "focusout":
							u = "blur", l = Vn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Vn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = zn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Bn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Qn;
							break;
						case Zr:
						case Qr:
						case $r:
							l = Hn;
							break;
						case ri:
							l = $n;
							break;
						case "scroll":
						case "scrollend":
							l = Pn;
							break;
						case "wheel":
							l = er;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Un;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Zn;
							break;
						case "toggle":
						case "beforetoggle": l = tr;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = yn(m, p), g != null && d.push(Rd(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== fn && (u = n.relatedTarget || n.fromElement) && (Et(u) || u[yt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? Et(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = zn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Zn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : Ot(l), h = u == null ? c : Ot(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, Et(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Bd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Vd(s, c, l, d, !1), u !== null && f !== null && Vd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? Ot(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = xr;
					else if (hr(c)) if (Sr) v = jr;
					else {
						v = kr;
						var y = Or;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && sn(r.elementType) && (v = xr) : v = Ar;
					if (v &&= v(e, r)) {
						gr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Qt(c, "number", c.value);
				}
				switch (y = r ? Ot(r) : window, e) {
					case "focusin":
						(hr(y) || y.contentEditable === "true") && (Vr = y, Hr = r, Ur = null);
						break;
					case "focusout":
						Ur = Hr = Vr = null;
						break;
					case "mousedown":
						Wr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Wr = !1, Gr(s, n, i);
						break;
					case "selectionchange": if (Br) break;
					case "keydown":
					case "keyup": Gr(s, n, i);
				}
				var b;
				if (rr) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else dr ? lr(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (or && n.locale !== "ko" && (dr || x !== "onCompositionStart" ? x === "onCompositionEnd" && dr && (b = En()) : (Cn = i, wn = "value" in Cn ? Cn.value : Cn.textContent, dr = !0)), y = zd(r, x), 0 < y.length && (x = new Wn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = ur(n), b !== null && (x.data = b)))), (b = ar ? fr(e, n) : pr(e, n)) && (x = zd(r, "onBeforeInput"), 0 < x.length && (y = new Wn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), Dd(s, e, r, n, i);
			}
			Md(s, t);
		});
	}
	function Rd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function zd(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = yn(e, n), i != null && r.unshift(Rd(e, i, a)), i = yn(e, t), i != null && r.push(Rd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Bd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Vd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = yn(n, a), l != null && o.unshift(Rd(n, l, c))) : i || (l = yn(n, a), l != null && o.push(Rd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Hd = /\r\n?/g, Ud = /\u0000|\uFFFD/g;
	function Wd(e) {
		return (typeof e == "string" ? e : "" + e).replace(Hd, "\n").replace(Ud, "");
	}
	function Gd(e, t) {
		return t = Wd(t), Wd(e) === t;
	}
	function Kd(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || nn(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && nn(e, "" + r);
				break;
			case "className":
				Bt(e, "class", r);
				break;
			case "tabIndex":
				Bt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Bt(e, n, r);
				break;
			case "style":
				on(e, r, o);
				break;
			case "data": if (t !== "object") {
				Bt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = un("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Kd(e, t, "name", a.name, a, null), Kd(e, t, "formEncType", a.formEncType, a, null), Kd(e, t, "formMethod", a.formMethod, a, null), Kd(e, t, "formTarget", a.formTarget, a, null)) : (Kd(e, t, "encType", a.encType, a, null), Kd(e, t, "method", a.method, a, null), Kd(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = un("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = dn);
				break;
			case "onScroll":
				r != null && R("scroll", e);
				break;
			case "onScrollEnd":
				r != null && R("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = un("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				R("beforetoggle", e), R("toggle", e), zt(e, "popover", r);
				break;
			case "xlinkActuate":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				zt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = cn.get(n) || n, zt(e, n, r));
		}
	}
	function qd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				on(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? nn(e, r) : (typeof r == "number" || typeof r == "bigint") && nn(e, "" + r);
				break;
			case "onScroll":
				r != null && R("scroll", e);
				break;
			case "onScrollEnd":
				r != null && R("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = dn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Mt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[vt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : zt(e, n, r);
			}
		}
	}
	function Jd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				R("error", e), R("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Kd(e, t, o, s, n, null);
					}
				}
				a && Kd(e, t, "srcSet", n.srcSet, n, null), r && Kd(e, t, "src", n.src, n, null);
				return;
			case "input":
				R("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Kd(e, t, r, d, n, null);
					}
				}
				Zt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in R("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Kd(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && $t(e, !!r, n, !0) : $t(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in R("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Kd(e, t, s, c, n, null);
				}
				tn(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Kd(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				R("beforetoggle", e), R("toggle", e), R("cancel", e), R("close", e);
				break;
			case "iframe":
			case "object":
				R("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Ad.length; r++) R(Ad[r], e);
				break;
			case "image":
				R("error", e), R("load", e);
				break;
			case "details":
				R("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": R("error", e), R("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Kd(e, t, u, r, n, null);
				}
				return;
			default: if (sn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && qd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Kd(e, t, c, r, n, null));
	}
	function Yd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Kd(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Kd(e, t, p, m, r, f);
					}
				}
				Xt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Kd(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Kd(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? $t(e, !!n, n ? [] : "", !1) : $t(e, !!n, t, !0)) : $t(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Kd(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Kd(e, t, s, a, r, o);
				}
				en(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Kd(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Kd(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Kd(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Kd(e, t, u, p, r, m);
				}
				return;
			default: if (sn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && qd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || qd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Kd(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Kd(e, t, f, p, r, m);
	}
	function Xd(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Zd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Xd(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Xd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Qd = null, $d = null;
	function ef(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function tf(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function nf(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function rf(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var af = null;
	function of() {
		var e = window.event;
		return e && e.type === "popstate" ? e === af ? !1 : (af = e, !0) : (af = null, !1);
	}
	var sf = typeof setTimeout == "function" ? setTimeout : void 0, cf = typeof clearTimeout == "function" ? clearTimeout : void 0, lf = typeof Promise == "function" ? Promise : void 0, uf = typeof queueMicrotask == "function" ? queueMicrotask : lf === void 0 ? sf : function(e) {
		return lf.resolve(null).then(e).catch(df);
	};
	function df(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function ff(e) {
		return e === "head";
	}
	function pf(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Gp(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") Df(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, Df(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[wt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && Df(e.ownerDocument.body);
			n = i;
		} while (n);
		Gp(t);
	}
	function mf(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function hf(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					hf(n), Tt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function gf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[wt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = Sf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function _f(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Sf(e.nextSibling), e === null)) return null;
		return e;
	}
	function vf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Sf(e.nextSibling), e === null)) return null;
		return e;
	}
	function yf(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function bf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function xf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function Sf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var Cf = null;
	function wf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return Sf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function Tf(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function Ef(e, t, n) {
		switch (t = ef(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function Df(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Tt(e);
	}
	var Of = /* @__PURE__ */ new Map(), kf = /* @__PURE__ */ new Set();
	function z(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var Af = T.d;
	T.d = {
		f: jf,
		r: Mf,
		D: Ff,
		C: If,
		L: Lf,
		m: Rf,
		X: Bf,
		S: zf,
		M: Vf
	};
	function jf() {
		var e = Af.f(), t = Mu();
		return e || t;
	}
	function Mf(e) {
		var t = Dt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Is(t) : Af.r(e);
	}
	var Nf = typeof document > "u" ? null : document;
	function Pf(e, t, n) {
		var r = Nf;
		if (r && typeof t == "string" && t) {
			var i = Yt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), kf.has(i) || (kf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Jd(t, "link", e), At(t), r.head.appendChild(t)));
		}
	}
	function Ff(e) {
		Af.D(e), Pf("dns-prefetch", e, null);
	}
	function If(e, t) {
		Af.C(e, t), Pf("preconnect", e, t);
	}
	function Lf(e, t, n) {
		Af.L(e, t, n);
		var r = Nf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Yt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Yt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Yt(n.imageSizes) + "\"]")) : i += "[href=\"" + Yt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Uf(e);
					break;
				case "script": a = qf(e);
			}
			Of.has(a) || (e = p({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), Of.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Wf(a)) || t === "script" && r.querySelector(B(a)) || (t = r.createElement("link"), Jd(t, "link", e), At(t), r.head.appendChild(t)));
		}
	}
	function Rf(e, t) {
		Af.m(e, t);
		var n = Nf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Yt(r) + "\"][href=\"" + Yt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = qf(e);
			}
			if (!Of.has(a) && (e = p({
				rel: "modulepreload",
				href: e
			}, t), Of.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(B(a))) return;
				}
				r = n.createElement("link"), Jd(r, "link", e), At(r), n.head.appendChild(r);
			}
		}
	}
	function zf(e, t, n) {
		Af.S(e, t, n);
		var r = Nf;
		if (r && e) {
			var i = kt(r).hoistableStyles, a = Uf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Wf(a))) s.loading = 5;
				else {
					e = p({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = Of.get(a)) && Xf(e, n);
					var c = o = r.createElement("link");
					At(c), Jd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Yf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Bf(e, t) {
		Af.X(e, t);
		var n = Nf;
		if (n && e) {
			var r = kt(n).hoistableScripts, i = qf(e), a = r.get(i);
			a || (a = n.querySelector(B(i)), a || (e = p({
				src: e,
				async: !0
			}, t), (t = Of.get(i)) && Zf(e, t), a = n.createElement("script"), At(a), Jd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Vf(e, t) {
		Af.M(e, t);
		var n = Nf;
		if (n && e) {
			var r = kt(n).hoistableScripts, i = qf(e), a = r.get(i);
			a || (a = n.querySelector(B(i)), a || (e = p({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = Of.get(i)) && Zf(e, t), a = n.createElement("script"), At(a), Jd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Hf(e, t, n, r) {
		var a = (a = ye.current) ? z(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Uf(n.href), n = kt(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Uf(n.href);
					var o = kt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Wf(e))) && !o._p && (s.instance = o, s.state.loading = 5), Of.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, Of.set(e, n), o || Kf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = qf(n), n = kt(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Uf(e) {
		return "href=\"" + Yt(e) + "\"";
	}
	function Wf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Gf(e) {
		return p({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Kf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Jd(t, "link", n), At(t), e.head.appendChild(t));
	}
	function qf(e) {
		return "[src=\"" + Yt(e) + "\"]";
	}
	function B(e) {
		return "script[async]" + e;
	}
	function Jf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Yt(n.href) + "\"]");
				if (r) return t.instance = r, At(r), r;
				var a = p({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), At(r), Jd(r, "style", a), Yf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Uf(n.href);
				var o = e.querySelector(Wf(a));
				if (o) return t.state.loading |= 4, t.instance = o, At(o), o;
				r = Gf(n), (a = Of.get(a)) && Xf(r, a), o = (e.ownerDocument || e).createElement("link"), At(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Jd(o, "link", r), t.state.loading |= 4, Yf(o, n.precedence, e), t.instance = o;
			case "script": return o = qf(n.src), (a = e.querySelector(B(o))) ? (t.instance = a, At(a), a) : (r = n, (a = Of.get(o)) && (r = p({}, n), Zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), At(a), Jd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Yf(r, n.precedence, e));
		return t.instance;
	}
	function Yf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Xf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Qf = null;
	function $f(e, t, n) {
		if (Qf === null) {
			var r = /* @__PURE__ */ new Map(), i = Qf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Qf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[wt] || a[_t] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function ep(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function tp(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function np(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function rp(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Uf(r.href), a = t.querySelector(Wf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = op.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, At(a);
					return;
				}
				a = t.ownerDocument || t, r = Gf(r), (i = Of.get(i)) && Xf(r, i), a = a.createElement("link"), At(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Jd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = op.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var ip = 0;
	function ap(e, t) {
		return e.stylesheets && e.count === 0 && cp(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && cp(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && ip === 0 && (ip = 62500 * Zd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && cp(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > ip ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function op() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) cp(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var sp = null;
	function cp(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, sp = /* @__PURE__ */ new Map(), t.forEach(lp, e), sp = null, op.call(e));
	}
	function lp(e, t) {
		if (!(t.state.loading & 4)) {
			var n = sp.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), sp.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = op.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var up = {
		$$typeof: ee,
		Provider: null,
		Consumer: null,
		_currentValue: de,
		_currentValue2: de,
		_threadCount: 0
	};
	function dp(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ot(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ot(0), this.hiddenUpdates = ot(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function fp(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new dp(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = yi(3, null, null, t), e.current = a, a.stateNode = e, t = va(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ja(a), e;
	}
	function pp(e) {
		return e ? (e = _i, e) : _i;
	}
	function mp(e, t, n, r, i, a) {
		i = pp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Xa(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Za(e, r, t), n !== null && (Du(n, e, t), Qa(n, e, t));
	}
	function hp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function gp(e, t) {
		hp(e, t), (e = e.alternate) && hp(e, t);
	}
	function _p(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = mi(e, 67108864);
			t !== null && Du(t, e, 67108864), gp(e, 67108864);
		}
	}
	function vp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Tu();
			t = ft(t);
			var n = mi(e, t);
			n !== null && Du(n, e, t), gp(e, t);
		}
	}
	var yp = !0;
	function bp(e, t, n, r) {
		var i = w.T;
		w.T = null;
		var a = T.p;
		try {
			T.p = 2, Sp(e, t, n, r);
		} finally {
			T.p = a, w.T = i;
		}
	}
	function xp(e, t, n, r) {
		var i = w.T;
		w.T = null;
		var a = T.p;
		try {
			T.p = 8, Sp(e, t, n, r);
		} finally {
			T.p = a, w.T = i;
		}
	}
	function Sp(e, t, n, r) {
		if (yp) {
			var i = Cp(r);
			if (i === null) Ld(e, t, r, wp, n), Fp(e, r);
			else if (Lp(i, e, t, n, r)) r.stopPropagation();
			else if (Fp(e, r), t & 4 && -1 < Pp.indexOf(e)) {
				for (; i !== null;) {
					var a = Dt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = tt(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Je(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									gd(a), !(Xl & 6) && (pu = Ie() + 500, _d(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = mi(a, 2), s !== null && Du(s, a, 2), Mu(), gp(a, 2);
					}
					if (a = Cp(r), a === null && Ld(e, t, r, wp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Ld(e, t, r, null, n);
		}
	}
	function Cp(e) {
		return e = pn(e), Tp(e);
	}
	var wp = null;
	function Tp(e) {
		if (wp = null, e = Et(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return wp = e, null;
	}
	function Ep(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Le()) {
				case Re: return 2;
				case ze: return 8;
				case Be:
				case Ve: return 32;
				case He: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var Dp = !1, Op = null, kp = null, Ap = null, jp = /* @__PURE__ */ new Map(), Mp = /* @__PURE__ */ new Map(), Np = [], Pp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Fp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Op = null;
				break;
			case "dragenter":
			case "dragleave":
				kp = null;
				break;
			case "mouseover":
			case "mouseout":
				Ap = null;
				break;
			case "pointerover":
			case "pointerout":
				jp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Mp.delete(t.pointerId);
		}
	}
	function Ip(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Dt(t), t !== null && _p(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Lp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Op = Ip(Op, e, t, n, r, i), !0;
			case "dragenter": return kp = Ip(kp, e, t, n, r, i), !0;
			case "mouseover": return Ap = Ip(Ap, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return jp.set(a, Ip(jp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, Mp.set(a, Ip(Mp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Rp(e) {
		var t = Et(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ht(e.priority, function() {
							vp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ht(e.priority, function() {
							vp(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function zp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = Cp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				fn = r, n.target.dispatchEvent(r), fn = null;
			} else return t = Dt(n), t !== null && _p(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Bp(e, t, n) {
		zp(e) && n.delete(t);
	}
	function Vp() {
		Dp = !1, Op !== null && zp(Op) && (Op = null), kp !== null && zp(kp) && (kp = null), Ap !== null && zp(Ap) && (Ap = null), jp.forEach(Bp), Mp.forEach(Bp);
	}
	function Hp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Dp || (Dp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Vp)));
	}
	var Up = null;
	function Wp(e) {
		Up !== e && (Up = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Up === e && (Up = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Tp(r || n) === null) continue;
					break;
				}
				var a = Dt(n);
				a !== null && (e.splice(t, 3), t -= 3, Ps(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Gp(e) {
		function t(t) {
			return Hp(t, e);
		}
		Op !== null && Hp(Op, e), kp !== null && Hp(kp, e), Ap !== null && Hp(Ap, e), jp.forEach(t), Mp.forEach(t);
		for (var n = 0; n < Np.length; n++) {
			var r = Np[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Np.length && (n = Np[0], n.blockedOn === null);) Rp(n), n.blockedOn === null && Np.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[vt] || null;
			if (typeof a == "function") o || Wp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[vt] || null) s = o.formAction;
					else if (Tp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Wp(n);
			}
		}
	}
	function Kp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function qp(e) {
		this._internalRoot = e;
	}
	Jp.prototype.render = qp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		mp(n, Tu(), e, t, null, null);
	}, Jp.prototype.unmount = qp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			mp(e.current, 2, null, e, null, null), Mu(), t[yt] = null;
		}
	};
	function Jp(e) {
		this._internalRoot = e;
	}
	Jp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = mt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Np.length && t !== 0 && t < Np[n].priority; n++);
			Np.splice(n, 0, e), n === 0 && Rp(e);
		}
	};
	var Yp = n.version;
	if (Yp !== "19.2.5") throw Error(i(527, Yp, "19.2.5"));
	T.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : f(e), e = e === null ? null : e.stateNode, e;
	};
	var Xp = {
		bundleType: 0,
		version: "19.2.5",
		rendererPackageName: "react-dom",
		currentDispatcherRef: w,
		reconcilerVersion: "19.2.5"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Zp.isDisabled && Zp.supportsFiber) try {
			Ge = Zp.inject(Xp), Ke = Zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = rc, s = ic, c = ac;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = fp(e, 1, !1, null, null, n, r, null, o, s, c, Kp), e[yt] = t.current, Fd(e), new qp(t);
	}, e.hydrateRoot = function(e, t, n) {
		if (!a(e)) throw Error(i(299));
		var r = !1, o = "", s = rc, c = ic, l = ac, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = fp(e, 1, !0, t, n ?? null, r, o, u, s, c, l, Kp), t.context = pp(null), n = t.current, r = Tu(), r = ft(r), o = Xa(r), o.callback = null, Za(n, o, r), n = r, t.current.lanes = n, st(t, n), gd(t), e[yt] = t.current, Fd(e), new Jp(t);
	}, e.version = "19.2.5";
})), x = /* @__PURE__ */ c(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			for (e = e.memoizedState; e !== null && 0 < t;) e = e.next, t--;
			return e;
		}
		function n(e, t, r, i) {
			if (r >= t.length) return i;
			var a = t[r], o = qf(e) ? e.slice() : z({}, e);
			return o[a] = n(e[a], t, r + 1, i), o;
		}
		function r(e, t, n) {
			if (t.length !== n.length) console.warn("copyWithRename() expects paths of the same length");
			else {
				for (var r = 0; r < n.length - 1; r++) if (t[r] !== n[r]) {
					console.warn("copyWithRename() expects paths to be the same except for the deepest key");
					return;
				}
				return i(e, t, n, 0);
			}
		}
		function i(e, t, n, r) {
			var a = t[r], o = qf(e) ? e.slice() : z({}, e);
			return r + 1 === t.length ? (o[n[r]] = o[a], qf(o) ? o.splice(a, 1) : delete o[a]) : o[a] = i(e[a], t, n, r + 1), o;
		}
		function a(e, t, n) {
			var r = t[n], i = qf(e) ? e.slice() : z({}, e);
			return n + 1 === t.length ? (qf(i) ? i.splice(r, 1) : delete i[r], i) : (i[r] = a(e[r], t, n + 1), i);
		}
		function o() {
			return !1;
		}
		function s() {
			return null;
		}
		function c() {
			console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks");
		}
		function l() {
			console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
		}
		function u() {}
		function f() {}
		function p(e) {
			var t = [];
			return e.forEach(function(e) {
				t.push(e);
			}), t.sort().join(", ");
		}
		function m(e, t, n, r) {
			return new wr(e, t, n, r);
		}
		function h(e, t) {
			e.context === Pg && (ef(e.current, 2, t, e, null, null), ul());
		}
		function g(e, t) {
			if (Fg !== null) {
				var n = t.staleFamilies;
				t = t.updatedFamilies, Il(), Cr(e.current, t, n), ul();
			}
		}
		function _(e) {
			Fg = e;
		}
		function v(e) {
			return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
		}
		function b(e) {
			var t = e, n = e;
			if (e.alternate) for (; t.return;) t = t.return;
			else {
				e = t;
				do
					t = e, t.flags & 4098 && (n = t.return), e = t.return;
				while (e);
			}
			return t.tag === 3 ? n : null;
		}
		function x(e) {
			if (e.tag === 13) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function ee(e) {
			if (e.tag === 31) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function te(e) {
			if (b(e) !== e) throw Error("Unable to find node on an unmounted component.");
		}
		function ne(e) {
			var t = e.alternate;
			if (!t) {
				if (t = b(e), t === null) throw Error("Unable to find node on an unmounted component.");
				return t === e ? e : null;
			}
			for (var n = e, r = t;;) {
				var i = n.return;
				if (i === null) break;
				var a = i.alternate;
				if (a === null) {
					if (r = i.return, r !== null) {
						n = r;
						continue;
					}
					break;
				}
				if (i.child === a.child) {
					for (a = i.child; a;) {
						if (a === n) return te(i), e;
						if (a === r) return te(i), t;
						a = a.sibling;
					}
					throw Error("Unable to find node on an unmounted component.");
				}
				if (n.return !== r.return) n = i, r = a;
				else {
					for (var o = !1, s = i.child; s;) {
						if (s === n) {
							o = !0, n = i, r = a;
							break;
						}
						if (s === r) {
							o = !0, r = i, n = a;
							break;
						}
						s = s.sibling;
					}
					if (!o) {
						for (s = a.child; s;) {
							if (s === n) {
								o = !0, n = a, r = i;
								break;
							}
							if (s === r) {
								o = !0, r = a, n = i;
								break;
							}
							s = s.sibling;
						}
						if (!o) throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
					}
				}
				if (n.alternate !== r) throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
			}
			if (n.tag !== 3) throw Error("Unable to find node on an unmounted component.");
			return n.stateNode.current === n ? e : t;
		}
		function re(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e;
			for (e = e.child; e !== null;) {
				if (t = re(e), t !== null) return t;
				e = e.sibling;
			}
			return null;
		}
		function ie(e) {
			return typeof e != "object" || !e ? null : (e = Gf && e[Gf] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function S(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Kf ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case Nf: return "Fragment";
				case Ff: return "Profiler";
				case Pf: return "StrictMode";
				case zf: return "Suspense";
				case Bf: return "SuspenseList";
				case Uf: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case Mf: return "Portal";
				case Lf: return e.displayName || "Context";
				case If: return (e._context.displayName || "Context") + ".Consumer";
				case Rf:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case Vf: return t = e.displayName || null, t === null ? S(e.type) || "Memo" : t;
				case Hf:
					t = e._payload, e = e._init;
					try {
						return S(e(t));
					} catch {}
			}
			return null;
		}
		function ae(e) {
			return typeof e.tag == "number" ? C(e) : typeof e.name == "string" ? e.name : null;
		}
		function C(e) {
			var t = e.type;
			switch (e.tag) {
				case 31: return "Activity";
				case 24: return "Cache";
				case 9: return (t._context.displayName || "Context") + ".Consumer";
				case 10: return t.displayName || "Context";
				case 18: return "DehydratedFragment";
				case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
				case 7: return "Fragment";
				case 26:
				case 27:
				case 5: return t;
				case 4: return "Portal";
				case 3: return "Root";
				case 6: return "Text";
				case 16: return S(t);
				case 8: return t === Pf ? "StrictMode" : "Mode";
				case 22: return "Offscreen";
				case 12: return "Profiler";
				case 21: return "Scope";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 25: return "TracingMarker";
				case 1:
				case 0:
				case 14:
				case 15:
					if (typeof t == "function") return t.displayName || t.name || null;
					if (typeof t == "string") return t;
					break;
				case 29:
					if (t = e._debugInfo, t != null) {
						for (var n = t.length - 1; 0 <= n; n--) if (typeof t[n].name == "string") return t[n].name;
					}
					if (e.return !== null) return C(e.return);
			}
			return null;
		}
		function oe(e) {
			return { current: e };
		}
		function se(e, t) {
			0 > Qf ? console.error("Unexpected pop.") : (t !== Zf[Qf] && console.error("Unexpected Fiber popped."), e.current = Xf[Qf], Xf[Qf] = null, Zf[Qf] = null, Qf--);
		}
		function ce(e, t, n) {
			Qf++, Xf[Qf] = e.current, Zf[Qf] = n, e.current = t;
		}
		function le(e) {
			return e === null && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."), e;
		}
		function ue(e, t) {
			ce(tp, t, e), ce(ep, e, e), ce($f, null, e);
			var n = t.nodeType;
			switch (n) {
				case 9:
				case 11:
					n = n === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? Vu(t) : US;
					break;
				default: if (n = t.tagName, t = t.namespaceURI) t = Vu(t), t = Hu(t, n);
				else switch (n) {
					case "svg":
						t = WS;
						break;
					case "math":
						t = GS;
						break;
					default: t = US;
				}
			}
			n = n.toLowerCase(), n = Kt(null, n), n = {
				context: t,
				ancestorInfo: n
			}, se($f, e), ce($f, n, e);
		}
		function w(e) {
			se($f, e), se(ep, e), se(tp, e);
		}
		function T() {
			return le($f.current);
		}
		function de(e) {
			e.memoizedState !== null && ce(np, e, e);
			var t = le($f.current), n = e.type, r = Hu(t.context, n);
			n = Kt(t.ancestorInfo, n), r = {
				context: r,
				ancestorInfo: n
			}, t !== r && (ce(ep, e, e), ce($f, r, e));
		}
		function fe(e) {
			ep.current === e && (se($f, e), se(ep, e)), np.current === e && (se(np, e), bC._currentValue = yC);
		}
		function pe() {}
		function me() {
			if (rp === 0) {
				ip = console.log, ap = console.info, op = console.warn, sp = console.error, cp = console.group, lp = console.groupCollapsed, up = console.groupEnd;
				var e = {
					configurable: !0,
					enumerable: !0,
					value: pe,
					writable: !0
				};
				Object.defineProperties(console, {
					info: e,
					log: e,
					warn: e,
					error: e,
					group: e,
					groupCollapsed: e,
					groupEnd: e
				});
			}
			rp++;
		}
		function he() {
			if (rp--, rp === 0) {
				var e = {
					configurable: !0,
					enumerable: !0,
					writable: !0
				};
				Object.defineProperties(console, {
					log: z({}, e, { value: ip }),
					info: z({}, e, { value: ap }),
					warn: z({}, e, { value: op }),
					error: z({}, e, { value: sp }),
					group: z({}, e, { value: cp }),
					groupCollapsed: z({}, e, { value: lp }),
					groupEnd: z({}, e, { value: up })
				});
			}
			0 > rp && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		function ge(e) {
			var t = Error.prepareStackTrace;
			if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith("Error: react-stack-top-frame\n") && (e = e.slice(29)), t = e.indexOf("\n"), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf("\n", t)), t !== -1) e = e.slice(0, t);
			else return "";
			return e;
		}
		function _e(e) {
			if (dp === void 0) try {
				throw Error();
			} catch (e) {
				var t = e.stack.trim().match(/\n( *(at )?)/);
				dp = t && t[1] || "", fp = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + dp + e + fp;
		}
		function ve(e, t) {
			if (!e || pp) return "";
			var n = mp.get(e);
			if (n !== void 0) return n;
			pp = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
			var r = null;
			r = B.H, B.H = null, me();
			try {
				var i = { DetermineComponentFrameRoot: function() {
					try {
						if (t) {
							var n = function() {
								throw Error();
							};
							if (Object.defineProperty(n.prototype, "props", { set: function() {
								throw Error();
							} }), typeof Reflect == "object" && Reflect.construct) {
								try {
									Reflect.construct(n, []);
								} catch (e) {
									var r = e;
								}
								Reflect.construct(e, [], n);
							} else {
								try {
									n.call();
								} catch (e) {
									r = e;
								}
								e.call(n.prototype);
							}
						} else {
							try {
								throw Error();
							} catch (e) {
								r = e;
							}
							(n = e()) && typeof n.catch == "function" && n.catch(function() {});
						}
					} catch (e) {
						if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
					}
					return [null, null];
				} };
				i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
				var a = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
				a && a.configurable && Object.defineProperty(i.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
				var o = i.DetermineComponentFrameRoot(), s = o[0], c = o[1];
				if (s && c) {
					var l = s.split("\n"), u = c.split("\n");
					for (o = a = 0; a < l.length && !l[a].includes("DetermineComponentFrameRoot");) a++;
					for (; o < u.length && !u[o].includes("DetermineComponentFrameRoot");) o++;
					if (a === l.length || o === u.length) for (a = l.length - 1, o = u.length - 1; 1 <= a && 0 <= o && l[a] !== u[o];) o--;
					for (; 1 <= a && 0 <= o; a--, o--) if (l[a] !== u[o]) {
						if (a !== 1 || o !== 1) do
							if (a--, o--, 0 > o || l[a] !== u[o]) {
								var d = "\n" + l[a].replace(" at new ", " at ");
								return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), typeof e == "function" && mp.set(e, d), d;
							}
						while (1 <= a && 0 <= o);
						break;
					}
				}
			} finally {
				pp = !1, B.H = r, he(), Error.prepareStackTrace = n;
			}
			return l = (l = e ? e.displayName || e.name : "") ? _e(l) : "", typeof e == "function" && mp.set(e, l), l;
		}
		function ye(e, t) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return _e(e.type);
				case 16: return _e("Lazy");
				case 13: return e.child !== t && t !== null ? _e("Suspense Fallback") : _e("Suspense");
				case 19: return _e("SuspenseList");
				case 0:
				case 15: return ve(e.type, !1);
				case 11: return ve(e.type.render, !1);
				case 1: return ve(e.type, !0);
				case 31: return _e("Activity");
				default: return "";
			}
		}
		function be(e) {
			try {
				var t = "", n = null;
				do {
					t += ye(e, n);
					var r = e._debugInfo;
					if (r) for (var i = r.length - 1; 0 <= i; i--) {
						var a = r[i];
						if (typeof a.name == "string") {
							var o = t;
							a: {
								var s = a.name, c = a.env, l = a.debugLocation;
								if (l != null) {
									var u = ge(l), d = u.lastIndexOf("\n"), f = d === -1 ? u : u.slice(d + 1);
									if (f.indexOf(s) !== -1) {
										var p = "\n" + f;
										break a;
									}
								}
								p = _e(s + (c ? " [" + c + "]" : ""));
							}
							t = o + p;
						}
					}
					n = e, e = e.return;
				} while (e);
				return t;
			} catch (e) {
				return "\nError generating stack: " + e.message + "\n" + e.stack;
			}
		}
		function xe(e) {
			return (e = e ? e.displayName || e.name : "") ? _e(e) : "";
		}
		function Se() {
			if (hp === null) return null;
			var e = hp._debugOwner;
			return e == null ? null : ae(e);
		}
		function Ce() {
			if (hp === null) return "";
			var e = hp;
			try {
				var t = "";
				switch (e.tag === 6 && (e = e.return), e.tag) {
					case 26:
					case 27:
					case 5:
						t += _e(e.type);
						break;
					case 13:
						t += _e("Suspense");
						break;
					case 19:
						t += _e("SuspenseList");
						break;
					case 31:
						t += _e("Activity");
						break;
					case 30:
					case 0:
					case 15:
					case 1:
						e._debugOwner || t !== "" || (t += xe(e.type));
						break;
					case 11: e._debugOwner || t !== "" || (t += xe(e.type.render));
				}
				for (; e;) if (typeof e.tag == "number") {
					var n = e;
					e = n._debugOwner;
					var r = n._debugStack;
					if (e && r) {
						var i = ge(r);
						i !== "" && (t += "\n" + i);
					}
				} else if (e.debugStack != null) {
					var a = e.debugStack;
					(e = e.owner) && a && (t += "\n" + ge(a));
				} else break;
				var o = t;
			} catch (e) {
				o = "\nError generating stack: " + e.message + "\n" + e.stack;
			}
			return o;
		}
		function E(e, t, n, r, i, a, o) {
			var s = hp;
			we(e);
			try {
				return e !== null && e._debugTask ? e._debugTask.run(t.bind(null, n, r, i, a, o)) : t(n, r, i, a, o);
			} finally {
				we(s);
			}
			throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
		}
		function we(e) {
			B.getCurrentStack = e === null ? null : Ce, gp = !1, hp = e;
		}
		function Te(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function Ee(e) {
			try {
				return De(e), !1;
			} catch {
				return !0;
			}
		}
		function De(e) {
			return "" + e;
		}
		function Oe(e, t) {
			if (Ee(e)) return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.", t, Te(e)), De(e);
		}
		function ke(e, t) {
			if (Ee(e)) return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.", t, Te(e)), De(e);
		}
		function Ae(e) {
			if (Ee(e)) return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.", Te(e)), De(e);
		}
		function je(e) {
			if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
			var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (t.isDisabled) return !0;
			if (!t.supportsFiber) return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"), !0;
			try {
				jp = t.inject(e), Mp = t;
			} catch (e) {
				console.error("React instrumentation encountered an error: %o.", e);
			}
			return !!t.checkDCE;
		}
		function Me(e) {
			if (typeof kp == "function" && Ap(e), Mp && typeof Mp.setStrictMode == "function") try {
				Mp.setStrictMode(jp, e);
			} catch (e) {
				Np || (Np = !0, console.error("React instrumentation encountered an error: %o", e));
			}
		}
		function Ne(e) {
			return e >>>= 0, e === 0 ? 32 : 31 - (Ip(e) / Lp | 0) | 0;
		}
		function Pe(e) {
			var t = e & 42;
			if (t !== 0) return t;
			switch (e & -e) {
				case 1: return 1;
				case 2: return 2;
				case 4: return 4;
				case 8: return 8;
				case 16: return 16;
				case 32: return 32;
				case 64: return 64;
				case 128: return 128;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072: return e & 261888;
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return e & 3932160;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return e & 62914560;
				case 67108864: return 67108864;
				case 134217728: return 134217728;
				case 268435456: return 268435456;
				case 536870912: return 536870912;
				case 1073741824: return 0;
				default: return console.error("Should have found matching lanes. This is a bug in React."), e;
			}
		}
		function Fe(e, t, n) {
			var r = e.pendingLanes;
			if (r === 0) return 0;
			var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
			e = e.warmLanes;
			var s = r & 134217727;
			return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Pe(n))) : i = Pe(o) : i = Pe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Pe(n))) : i = Pe(o)) : i = Pe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
		}
		function Ie(e, t) {
			return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
		}
		function Le(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 4:
				case 8:
				case 64: return t + 250;
				case 16:
				case 32:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return t + 5e3;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return -1;
				case 67108864:
				case 134217728:
				case 268435456:
				case 536870912:
				case 1073741824: return -1;
				default: return console.error("Should have found matching lanes. This is a bug in React."), -1;
			}
		}
		function Re() {
			var e = Bp;
			return Bp <<= 1, !(Bp & 62914560) && (Bp = 4194304), e;
		}
		function ze(e) {
			for (var t = [], n = 0; 31 > n; n++) t.push(e);
			return t;
		}
		function Be(e, t) {
			e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
		}
		function Ve(e, t, n, r, i, a) {
			var o = e.pendingLanes;
			e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
			var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
			for (n = o & ~n; 0 < n;) {
				var u = 31 - Fp(n), d = 1 << u;
				s[u] = 0, c[u] = -1;
				var f = l[u];
				if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
					var p = f[u];
					p !== null && (p.lane &= -536870913);
				}
				n &= ~d;
			}
			r !== 0 && He(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
		}
		function He(e, t, n) {
			e.pendingLanes |= t, e.suspendedLanes &= ~t;
			var r = 31 - Fp(t);
			e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
		}
		function Ue(e, t) {
			var n = e.entangledLanes |= t;
			for (e = e.entanglements; n;) {
				var r = 31 - Fp(n), i = 1 << r;
				i & t | e[r] & t && (e[r] |= t), n &= ~i;
			}
		}
		function We(e, t) {
			var n = t & -t;
			return n = n & 42 ? 1 : Ge(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
		}
		function Ge(e) {
			switch (e) {
				case 2:
					e = 1;
					break;
				case 8:
					e = 4;
					break;
				case 32:
					e = 16;
					break;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					e = 128;
					break;
				case 268435456:
					e = 134217728;
					break;
				default: e = 0;
			}
			return e;
		}
		function Ke(e, t, n) {
			if (Pp) for (e = e.pendingUpdatersLaneMap; 0 < n;) {
				var r = 31 - Fp(n), i = 1 << r;
				e[r].add(t), n &= ~i;
			}
		}
		function qe(e, t) {
			if (Pp) for (var n = e.pendingUpdatersLaneMap, r = e.memoizedUpdaters; 0 < t;) {
				var i = 31 - Fp(t);
				e = 1 << i, i = n[i], 0 < i.size && (i.forEach(function(e) {
					var t = e.alternate;
					t !== null && r.has(t) || r.add(e);
				}), i.clear()), t &= ~e;
			}
		}
		function Je(e) {
			return e &= -e, Vp !== 0 && Vp < e ? Hp !== 0 && Hp < e ? e & 134217727 ? Up : Wp : Hp : Vp;
		}
		function Ye() {
			var e = Jf.p;
			return e === 0 ? (e = window.event, e === void 0 ? Up : ff(e.type)) : e;
		}
		function Xe(e, t) {
			var n = Jf.p;
			try {
				return Jf.p = e, t();
			} finally {
				Jf.p = n;
			}
		}
		function Ze(e) {
			delete e[Kp], delete e[qp], delete e[Yp], delete e[Xp], delete e[Zp];
		}
		function Qe(e) {
			var t = e[Kp];
			if (t) return t;
			for (var n = e.parentNode; n;) {
				if (t = n[Jp] || n[Kp]) {
					if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Sd(e); e !== null;) {
						if (n = e[Kp]) return n;
						e = Sd(e);
					}
					return t;
				}
				e = n, n = e.parentNode;
			}
			return null;
		}
		function $e(e) {
			if (e = e[Kp] || e[Jp]) {
				var t = e.tag;
				if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
			}
			return null;
		}
		function et(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
			throw Error("getNodeFromInstance: Invalid argument.");
		}
		function tt(e) {
			var t = e[Qp];
			return t ||= e[Qp] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			}, t;
		}
		function nt(e) {
			e[$p] = !0;
		}
		function rt(e, t) {
			it(e, t), it(e + "Capture", t);
		}
		function it(e, t) {
			tm[e] && console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), tm[e] = t;
			var n = e.toLowerCase();
			for (nm[n] = e, e === "onDoubleClick" && (nm.ondblclick = e), e = 0; e < t.length; e++) em.add(t[e]);
		}
		function at(e, t) {
			rm[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
		}
		function ot(e) {
			return _p.call(om, e) ? !0 : _p.call(am, e) ? !1 : im.test(e) ? om[e] = !0 : (am[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
		}
		function st(e, t, n) {
			if (ot(t)) {
				if (!e.hasAttribute(t)) {
					switch (typeof n) {
						case "symbol":
						case "object": return n;
						case "function": return n;
						case "boolean": if (!1 === n) return n;
					}
					return n === void 0 ? void 0 : null;
				}
				return e = e.getAttribute(t), e === "" && !0 === n ? !0 : (Oe(n, t), e === "" + n ? n : e);
			}
		}
		function ct(e, t, n) {
			if (ot(t)) if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				Oe(n, t), e.setAttribute(t, "" + n);
			}
		}
		function lt(e, t, n) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						e.removeAttribute(t);
						return;
				}
				Oe(n, t), e.setAttribute(t, "" + n);
			}
		}
		function ut(e, t, n, r) {
			if (r === null) e.removeAttribute(n);
			else {
				switch (typeof r) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						e.removeAttribute(n);
						return;
				}
				Oe(r, n), e.setAttributeNS(t, n, "" + r);
			}
		}
		function dt(e) {
			switch (typeof e) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return e;
				case "object": return Ae(e), e;
				default: return "";
			}
		}
		function ft(e) {
			var t = e.type;
			return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
		}
		function pt(e, t, n) {
			var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
			if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
				var i = r.get, a = r.set;
				return Object.defineProperty(e, t, {
					configurable: !0,
					get: function() {
						return i.call(this);
					},
					set: function(e) {
						Ae(e), n = "" + e, a.call(this, e);
					}
				}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
					getValue: function() {
						return n;
					},
					setValue: function(e) {
						Ae(e), n = "" + e;
					},
					stopTracking: function() {
						e._valueTracker = null, delete e[t];
					}
				};
			}
		}
		function mt(e) {
			if (!e._valueTracker) {
				var t = ft(e) ? "checked" : "value";
				e._valueTracker = pt(e, t, "" + e[t]);
			}
		}
		function ht(e) {
			if (!e) return !1;
			var t = e._valueTracker;
			if (!t) return !0;
			var n = t.getValue(), r = "";
			return e && (r = ft(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
		}
		function gt(e) {
			if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
			try {
				return e.activeElement || e.body;
			} catch {
				return e.body;
			}
		}
		function _t(e) {
			return e.replace(sm, function(e) {
				return "\\" + e.charCodeAt(0).toString(16) + " ";
			});
		}
		function vt(e, t) {
			t.checked === void 0 || t.defaultChecked === void 0 || lm || (console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", Se() || "A component", t.type), lm = !0), t.value === void 0 || t.defaultValue === void 0 || cm || (console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", Se() || "A component", t.type), cm = !0);
		}
		function yt(e, t, n, r, i, a, o, s) {
			e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? (Oe(o, "type"), e.type = o) : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + dt(t)) : e.value !== "" + dt(t) && (e.value = "" + dt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : xt(e, o, dt(n)) : xt(e, o, dt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? (Oe(s, "name"), e.name = "" + dt(s)) : e.removeAttribute("name");
		}
		function bt(e, t, n, r, i, a, o, s) {
			if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (Oe(a, "type"), e.type = a), t != null || n != null) {
				if (!(a !== "submit" && a !== "reset" || t != null)) {
					mt(e);
					return;
				}
				n = n == null ? "" : "" + dt(n), t = t == null ? n : "" + dt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
			}
			r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (Oe(o, "name"), e.name = o), mt(e);
		}
		function xt(e, t, n) {
			t === "number" && gt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
		}
		function St(e, t) {
			t.value ?? (typeof t.children == "object" && t.children !== null ? Of.Children.forEach(t.children, function(e) {
				e == null || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || dm || (dm = !0, console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."));
			}) : t.dangerouslySetInnerHTML == null || fm || (fm = !0, console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), t.selected == null || um || (console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), um = !0);
		}
		function Ct() {
			var e = Se();
			return e ? "\n\nCheck the render method of `" + e + "`." : "";
		}
		function wt(e, t, n, r) {
			if (e = e.options, t) {
				t = {};
				for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
				for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
			} else {
				for (n = "" + dt(n), t = null, i = 0; i < e.length; i++) {
					if (e[i].value === n) {
						e[i].selected = !0, r && (e[i].defaultSelected = !0);
						return;
					}
					t !== null || e[i].disabled || (t = e[i]);
				}
				t !== null && (t.selected = !0);
			}
		}
		function Tt(e, t) {
			for (e = 0; e < mm.length; e++) {
				var n = mm[e];
				if (t[n] != null) {
					var r = qf(t[n]);
					t.multiple && !r ? console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Ct()) : !t.multiple && r && console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Ct());
				}
			}
			t.value === void 0 || t.defaultValue === void 0 || pm || (console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"), pm = !0);
		}
		function Et(e, t) {
			t.value === void 0 || t.defaultValue === void 0 || hm || (console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components", Se() || "A component"), hm = !0), t.children != null && t.value == null && console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
		}
		function Dt(e, t, n) {
			if (t != null && (t = "" + dt(t), t !== e.value && (e.value = t), n == null)) {
				e.defaultValue !== t && (e.defaultValue = t);
				return;
			}
			e.defaultValue = n == null ? "" : "" + dt(n);
		}
		function Ot(e, t, n, r) {
			if (t == null) {
				if (r != null) {
					if (n != null) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
					if (qf(r)) {
						if (1 < r.length) throw Error("<textarea> can only have at most one child.");
						r = r[0];
					}
					n = r;
				}
				n ??= "", t = n;
			}
			n = dt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), mt(e);
		}
		function kt(e, t) {
			return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? kt(e.children[0], t) : e;
		}
		function At(e) {
			return "  " + "  ".repeat(e);
		}
		function jt(e) {
			return "+ " + "  ".repeat(e);
		}
		function Mt(e) {
			return "- " + "  ".repeat(e);
		}
		function Nt(e) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return e.type;
				case 16: return "Lazy";
				case 31: return "Activity";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 0:
				case 15: return e = e.type, e.displayName || e.name || null;
				case 11: return e = e.type.render, e.displayName || e.name || null;
				case 1: return e = e.type, e.displayName || e.name || null;
				default: return null;
			}
		}
		function Pt(e, t) {
			return gm.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? "{\"...\"}" : "{" + e.slice(0, t - 7) + "...\"}" : "{" + e + "}") : e.length > t ? 5 > t ? "{\"...\"}" : e.slice(0, t - 3) + "..." : e;
		}
		function Ft(e, t, n) {
			var r = 120 - 2 * n;
			if (t === null) return jt(n) + Pt(e, r) + "\n";
			if (typeof t == "string") {
				for (var i = 0; i < t.length && i < e.length && t.charCodeAt(i) === e.charCodeAt(i); i++);
				return i > r - 8 && 10 < i && (e = "..." + e.slice(i - 8), t = "..." + t.slice(i - 8)), jt(n) + Pt(e, r) + "\n" + Mt(n) + Pt(t, r) + "\n";
			}
			return At(n) + Pt(e, r) + "\n";
		}
		function It(e) {
			return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(e, t) {
				return t;
			});
		}
		function Lt(e, t) {
			switch (typeof e) {
				case "string": return e = JSON.stringify(e), e.length > t ? 5 > t ? "\"...\"" : e.slice(0, t - 4) + "...\"" : e;
				case "object":
					if (e === null) return "null";
					if (qf(e)) return "[...]";
					if (e.$$typeof === jf) return (t = S(e.type)) ? "<" + t + ">" : "<...>";
					var n = It(e);
					if (n === "Object") {
						for (var r in n = "", t -= 2, e) if (e.hasOwnProperty(r)) {
							var i = JSON.stringify(r);
							if (i !== "\"" + r + "\"" && (r = i), t -= r.length - 2, i = Lt(e[r], 15 > t ? t : 15), t -= i.length, 0 > t) {
								n += n === "" ? "..." : ", ...";
								break;
							}
							n += (n === "" ? "" : ",") + r + ":" + i;
						}
						return "{" + n + "}";
					}
					return n;
				case "function": return (t = e.displayName || e.name) ? "function " + t : "function";
				default: return String(e);
			}
		}
		function Rt(e, t) {
			return typeof e != "string" || gm.test(e) ? "{" + Lt(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? "\"...\"" : "\"" + e.slice(0, t - 5) + "...\"" : "\"" + e + "\"";
		}
		function zt(e, t, n) {
			var r = 120 - n.length - e.length, i = [], a;
			for (a in t) if (t.hasOwnProperty(a) && a !== "children") {
				var o = Rt(t[a], 120 - n.length - a.length - 1);
				r -= a.length + o.length + 2, i.push(a + "=" + o);
			}
			return i.length === 0 ? n + "<" + e + ">\n" : 0 < r ? n + "<" + e + " " + i.join(" ") + ">\n" : n + "<" + e + "\n" + n + "  " + i.join("\n" + n + "  ") + "\n" + n + ">\n";
		}
		function Bt(e, t, n) {
			var r = "", i = z({}, t), a;
			for (a in e) if (e.hasOwnProperty(a)) {
				delete i[a];
				var o = 120 - 2 * n - a.length - 2, s = Lt(e[a], o);
				t.hasOwnProperty(a) ? (o = Lt(t[a], o), r += jt(n) + a + ": " + s + "\n", r += Mt(n) + a + ": " + o + "\n") : r += jt(n) + a + ": " + s + "\n";
			}
			for (var c in i) i.hasOwnProperty(c) && (e = Lt(i[c], 120 - 2 * n - c.length - 2), r += Mt(n) + c + ": " + e + "\n");
			return r;
		}
		function Vt(e, t, n, r) {
			var i = "", a = /* @__PURE__ */ new Map();
			for (l in n) n.hasOwnProperty(l) && a.set(l.toLowerCase(), l);
			if (a.size === 1 && a.has("children")) i += zt(e, t, At(r));
			else {
				for (var o in t) if (t.hasOwnProperty(o) && o !== "children") {
					var s = 120 - 2 * (r + 1) - o.length - 1, c = a.get(o.toLowerCase());
					if (c !== void 0) {
						a.delete(o.toLowerCase());
						var l = t[o];
						c = n[c];
						var u = Rt(l, s);
						s = Rt(c, s), typeof l == "object" && l && typeof c == "object" && c && It(l) === "Object" && It(c) === "Object" && (2 < Object.keys(l).length || 2 < Object.keys(c).length || -1 < u.indexOf("...") || -1 < s.indexOf("...")) ? i += At(r + 1) + o + "={{\n" + Bt(l, c, r + 2) + At(r + 1) + "}}\n" : (i += jt(r + 1) + o + "=" + u + "\n", i += Mt(r + 1) + o + "=" + s + "\n");
					} else i += At(r + 1) + o + "=" + Rt(t[o], s) + "\n";
				}
				a.forEach(function(e) {
					if (e !== "children") {
						var t = 120 - 2 * (r + 1) - e.length - 1;
						i += Mt(r + 1) + e + "=" + Rt(n[e], t) + "\n";
					}
				}), i = i === "" ? At(r) + "<" + e + ">\n" : At(r) + "<" + e + "\n" + i + At(r) + ">\n";
			}
			return e = n.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (a = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (a = "" + t), i += Ft(a, "" + e, r + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (i = e == null ? i + Ft("" + t, null, r + 1) : i + Ft("" + t, void 0, r + 1)), i;
		}
		function Ht(e, t) {
			var n = Nt(e);
			if (n === null) {
				for (n = "", e = e.child; e;) n += Ht(e, t), e = e.sibling;
				return n;
			}
			return At(t) + "<" + n + ">\n";
		}
		function Ut(e, t) {
			var n = kt(e, t);
			if (n !== e && (e.children.length !== 1 || e.children[0] !== n)) return At(t) + "...\n" + Ut(n, t + 1);
			n = "";
			var r = e.fiber._debugInfo;
			if (r) for (var i = 0; i < r.length; i++) {
				var a = r[i].name;
				typeof a == "string" && (n += At(t) + "<" + a + ">\n", t++);
			}
			if (r = "", i = e.fiber.pendingProps, e.fiber.tag === 6) r = Ft(i, e.serverProps, t), t++;
			else if (a = Nt(e.fiber), a !== null) if (e.serverProps === void 0) {
				r = t;
				var o = 120 - 2 * r - a.length - 2, s = "";
				for (l in i) if (i.hasOwnProperty(l) && l !== "children") {
					var c = Rt(i[l], 15);
					if (o -= l.length + c.length + 2, 0 > o) {
						s += " ...";
						break;
					}
					s += " " + l + "=" + c;
				}
				r = At(r) + "<" + a + s + ">\n", t++;
			} else e.serverProps === null ? (r = zt(a, i, jt(t)), t++) : typeof e.serverProps == "string" ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (r = Vt(a, i, e.serverProps, t), t++);
			var l = "";
			for (i = e.fiber.child, a = 0; i && a < e.children.length;) o = e.children[a], o.fiber === i ? (l += Ut(o, t), a++) : l += Ht(i, t), i = i.sibling;
			for (i && 0 < e.children.length && (l += At(t) + "...\n"), i = e.serverTail, e.serverProps === null && t--, e = 0; e < i.length; e++) a = i[e], l = typeof a == "string" ? l + (Mt(t) + Pt(a, 120 - 2 * t) + "\n") : l + zt(a.type, a.props, Mt(t));
			return n + r + l;
		}
		function Wt(e) {
			try {
				return "\n\n" + Ut(e, 0);
			} catch {
				return "";
			}
		}
		function Gt(e, t, n) {
			for (var r = t, i = null, a = 0; r;) r === e && (a = 0), i = {
				fiber: r,
				children: i === null ? [] : [i],
				serverProps: r === t ? n : r === e ? null : void 0,
				serverTail: [],
				distanceFromLeaf: a
			}, a++, r = r.return;
			return i === null ? "" : Wt(i).replaceAll(/^[+-]/gm, ">");
		}
		function Kt(e, t) {
			var n = z({}, e || xm), r = { tag: t };
			return vm.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), ym.indexOf(t) !== -1 && (n.pTagInButtonScope = null), _m.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = r, t === "form" && (n.formTag = r), t === "a" && (n.aTagInScope = r), t === "button" && (n.buttonTagInScope = r), t === "nobr" && (n.nobrTagInScope = r), t === "p" && (n.pTagInButtonScope = r), t === "li" && (n.listItemTagAutoclosing = r), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = r), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope ||= r, e !== null || t !== "#document" && t !== "html" && t !== "body" ? !0 === n.implicitRootScope && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
		}
		function qt(e, t, n) {
			switch (t) {
				case "select": return e === "hr" || e === "option" || e === "optgroup" || e === "script" || e === "template" || e === "#text";
				case "optgroup": return e === "option" || e === "#text";
				case "option": return e === "#text";
				case "tr": return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
				case "tbody":
				case "thead":
				case "tfoot": return e === "tr" || e === "style" || e === "script" || e === "template";
				case "colgroup": return e === "col" || e === "template";
				case "table": return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
				case "head": return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
				case "html":
					if (n) break;
					return e === "head" || e === "body" || e === "frameset";
				case "frameset": return e === "frame";
				case "#document": if (!n) return e === "html";
			}
			switch (e) {
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
				case "rp":
				case "rt": return bm.indexOf(t) === -1;
				case "caption":
				case "col":
				case "colgroup":
				case "frameset":
				case "frame":
				case "tbody":
				case "td":
				case "tfoot":
				case "th":
				case "thead":
				case "tr": return t == null;
				case "head": return n || t === null;
				case "html": return n && t === "#document" || t === null;
				case "body": return n && (t === "#document" || t === "html") || t === null;
			}
			return !0;
		}
		function Jt(e, t) {
			switch (e) {
				case "address":
				case "article":
				case "aside":
				case "blockquote":
				case "center":
				case "details":
				case "dialog":
				case "dir":
				case "div":
				case "dl":
				case "fieldset":
				case "figcaption":
				case "figure":
				case "footer":
				case "header":
				case "hgroup":
				case "main":
				case "menu":
				case "nav":
				case "ol":
				case "p":
				case "section":
				case "summary":
				case "ul":
				case "pre":
				case "listing":
				case "table":
				case "hr":
				case "xmp":
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t.pTagInButtonScope;
				case "form": return t.formTag || t.pTagInButtonScope;
				case "li": return t.listItemTagAutoclosing;
				case "dd":
				case "dt": return t.dlItemTagAutoclosing;
				case "button": return t.buttonTagInScope;
				case "a": return t.aTagInScope;
				case "nobr": return t.nobrTagInScope;
			}
			return null;
		}
		function Yt(e, t) {
			for (; e;) {
				switch (e.tag) {
					case 5:
					case 26:
					case 27: if (e.type === t) return e;
				}
				e = e.return;
			}
			return null;
		}
		function Xt(e, t) {
			t ||= xm;
			var n = t.current;
			if (t = (n = qt(e, n && n.tag, t.implicitRootScope) ? null : n) ? null : Jt(e, t), t = n || t, !t) return !0;
			var r = t.tag;
			if (t = String(!!n) + "|" + e + "|" + r, Sm[t]) return !1;
			Sm[t] = !0;
			var i = (t = hp) ? Yt(t.return, r) : null, a = t !== null && i !== null ? Gt(i, t, null) : "", o = "<" + e + ">";
			return n ? (n = "", r === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error("In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s", o, r, n, a)) : console.error("In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s", o, r, a), t && (e = t.return, i === null || e === null || i === e && e._debugOwner === t._debugOwner || E(i, function() {
				console.error("<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.", r, o);
			})), !1;
		}
		function Zt(e, t, n) {
			if (n || qt("#text", t, !1)) return !0;
			if (n = "#text|" + t, Sm[n]) return !1;
			Sm[n] = !0;
			var r = (n = hp) ? Yt(n, t) : null;
			return n = n !== null && r !== null ? Gt(r, n, n.tag === 6 ? null : { children: null }) : "", /\S/.test(e) ? console.error("In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s", t, n) : console.error("In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s", t, n), !1;
		}
		function Qt(e, t) {
			if (t) {
				var n = e.firstChild;
				if (n && n === e.lastChild && n.nodeType === 3) {
					n.nodeValue = t;
					return;
				}
			}
			e.textContent = t;
		}
		function $t(e) {
			return e.replace(Om, function(e, t) {
				return t.toUpperCase();
			});
		}
		function en(e, t, n) {
			var r = t.indexOf("--") === 0;
			r || (-1 < t.indexOf("-") ? Am.hasOwnProperty(t) && Am[t] || (Am[t] = !0, console.error("Unsupported style property %s. Did you mean %s?", t, $t(t.replace(Dm, "ms-")))) : Em.test(t) ? Am.hasOwnProperty(t) && Am[t] || (Am[t] = !0, console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?", t, t.charAt(0).toUpperCase() + t.slice(1))) : !km.test(n) || jm.hasOwnProperty(n) && jm[n] || (jm[n] = !0, console.error("Style property values shouldn't contain a semicolon. Try \"%s: %s\" instead.", t, n.replace(km, ""))), typeof n == "number" && (isNaN(n) ? Mm || (Mm = !0, console.error("`NaN` is an invalid value for the `%s` css style property.", t)) : isFinite(n) || Nm || (Nm = !0, console.error("`Infinity` is an invalid value for the `%s` css style property.", t)))), n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Pm.has(t) ? t === "float" ? e.cssFloat = n : (ke(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
		}
		function tn(e, t, n) {
			if (t != null && typeof t != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			if (t && Object.freeze(t), e = e.style, n != null) {
				if (t) {
					var r = {};
					if (n) {
						for (var i in n) if (n.hasOwnProperty(i) && !t.hasOwnProperty(i)) for (var a = Cm[i] || [i], o = 0; o < a.length; o++) r[a[o]] = i;
					}
					for (var s in t) if (t.hasOwnProperty(s) && (!n || n[s] !== t[s])) for (i = Cm[s] || [s], a = 0; a < i.length; a++) r[i[a]] = s;
					for (var c in s = {}, t) for (i = Cm[c] || [c], a = 0; a < i.length; a++) s[i[a]] = c;
					for (var l in c = {}, r) if (i = r[l], (a = s[l]) && i !== a && (o = i + "," + a, !c[o])) {
						c[o] = !0, o = console;
						var u = t[i];
						o.error.call(o, "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", u == null || typeof u == "boolean" || u === "" ? "Removing" : "Updating", i, a);
					}
				}
				for (var d in n) !n.hasOwnProperty(d) || t != null && t.hasOwnProperty(d) || (d.indexOf("--") === 0 ? e.setProperty(d, "") : d === "float" ? e.cssFloat = "" : e[d] = "");
				for (var f in t) l = t[f], t.hasOwnProperty(f) && n[f] !== l && en(e, f, l);
			} else for (r in t) t.hasOwnProperty(r) && en(e, r, t[r]);
		}
		function nn(e) {
			if (e.indexOf("-") === -1) return !1;
			switch (e) {
				case "annotation-xml":
				case "color-profile":
				case "font-face":
				case "font-face-src":
				case "font-face-uri":
				case "font-face-format":
				case "font-face-name":
				case "missing-glyph": return !1;
				default: return !0;
			}
		}
		function rn(e) {
			return Lm.get(e) || e;
		}
		function an(e, t) {
			if (_p.call(Bm, t) && Bm[t]) return !0;
			if (Hm.test(t)) {
				if (e = "aria-" + t.slice(4).toLowerCase(), e = zm.hasOwnProperty(e) ? e : null, e == null) return console.error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Bm[t] = !0;
				if (t !== e) return console.error("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, e), Bm[t] = !0;
			}
			if (Vm.test(t)) {
				if (e = t.toLowerCase(), e = zm.hasOwnProperty(e) ? e : null, e == null) return Bm[t] = !0, !1;
				t !== e && (console.error("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, e), Bm[t] = !0);
			}
			return !0;
		}
		function on(e, t) {
			var n = [], r;
			for (r in t) an(e, r) || n.push(r);
			t = n.map(function(e) {
				return "`" + e + "`";
			}).join(", "), n.length === 1 ? console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e) : 1 < n.length && console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e);
		}
		function sn(e, t, n, r) {
			if (_p.call(Wm, t) && Wm[t]) return !0;
			var i = t.toLowerCase();
			if (i === "onfocusin" || i === "onfocusout") return console.error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Wm[t] = !0;
			if (typeof n == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction")) return !0;
			if (r != null) {
				if (e = r.possibleRegistrationNames, r.registrationNameDependencies.hasOwnProperty(t)) return !0;
				if (r = e.hasOwnProperty(i) ? e[i] : null, r != null) return console.error("Invalid event handler property `%s`. Did you mean `%s`?", t, r), Wm[t] = !0;
				if (Gm.test(t)) return console.error("Unknown event handler property `%s`. It will be ignored.", t), Wm[t] = !0;
			} else if (Gm.test(t)) return Km.test(t) && console.error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Wm[t] = !0;
			if (qm.test(t) || Jm.test(t)) return !0;
			if (i === "innerhtml") return console.error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Wm[t] = !0;
			if (i === "aria") return console.error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Wm[t] = !0;
			if (i === "is" && n != null && typeof n != "string") return console.error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Wm[t] = !0;
			if (typeof n == "number" && isNaN(n)) return console.error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Wm[t] = !0;
			if (Rm.hasOwnProperty(i)) {
				if (i = Rm[i], i !== t) return console.error("Invalid DOM property `%s`. Did you mean `%s`?", t, i), Wm[t] = !0;
			} else if (t !== i) return console.error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, i), Wm[t] = !0;
			switch (t) {
				case "dangerouslySetInnerHTML":
				case "children":
				case "style":
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": return !0;
				case "innerText":
				case "textContent": return !0;
			}
			switch (typeof n) {
				case "boolean": switch (t) {
					case "autoFocus":
					case "checked":
					case "multiple":
					case "muted":
					case "selected":
					case "contentEditable":
					case "spellCheck":
					case "draggable":
					case "value":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
					case "allowFullScreen":
					case "async":
					case "autoPlay":
					case "controls":
					case "default":
					case "defer":
					case "disabled":
					case "disablePictureInPicture":
					case "disableRemotePlayback":
					case "formNoValidate":
					case "hidden":
					case "loop":
					case "noModule":
					case "noValidate":
					case "open":
					case "playsInline":
					case "readOnly":
					case "required":
					case "reversed":
					case "scoped":
					case "seamless":
					case "itemScope":
					case "capture":
					case "download":
					case "inert": return !0;
					default: return i = t.toLowerCase().slice(0, 5), i === "data-" || i === "aria-" ? !0 : (n ? console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.", n, t, t, n, t) : console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", n, t, t, n, t, t, t), Wm[t] = !0);
				}
				case "function":
				case "symbol": return Wm[t] = !0, !1;
				case "string": if (n === "false" || n === "true") {
					switch (t) {
						case "checked":
						case "selected":
						case "multiple":
						case "muted":
						case "allowFullScreen":
						case "async":
						case "autoPlay":
						case "controls":
						case "default":
						case "defer":
						case "disabled":
						case "disablePictureInPicture":
						case "disableRemotePlayback":
						case "formNoValidate":
						case "hidden":
						case "loop":
						case "noModule":
						case "noValidate":
						case "open":
						case "playsInline":
						case "readOnly":
						case "required":
						case "reversed":
						case "scoped":
						case "seamless":
						case "itemScope":
						case "inert": break;
						default: return !0;
					}
					console.error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : "Although this works, it will not work as expected if you pass the string \"false\".", t, n), Wm[t] = !0;
				}
			}
			return !0;
		}
		function cn(e, t, n) {
			var r = [], i;
			for (i in t) sn(e, i, t[i], n) || r.push(i);
			t = r.map(function(e) {
				return "`" + e + "`";
			}).join(", "), r.length === 1 ? console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e) : 1 < r.length && console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e);
		}
		function ln(e) {
			return Ym.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
		}
		function un() {}
		function dn(e) {
			return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
		}
		function fn(e) {
			var t = $e(e);
			if (t && (e = t.stateNode)) {
				var n = e[qp] || null;
				a: switch (e = t.stateNode, t.type) {
					case "input":
						if (yt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
							for (n = e; n.parentNode;) n = n.parentNode;
							for (Oe(t, "name"), n = n.querySelectorAll("input[name=\"" + _t("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
								var r = n[t];
								if (r !== e && r.form === e.form) {
									var i = r[qp] || null;
									if (!i) throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
									yt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
								}
							}
							for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && ht(r);
						}
						break a;
					case "textarea":
						Dt(e, n.value, n.defaultValue);
						break a;
					case "select": t = n.value, t != null && wt(e, !!n.multiple, t, !1);
				}
			}
		}
		function pn(e, t, n) {
			if ($m) return e(t, n);
			$m = !0;
			try {
				return e(t);
			} finally {
				if ($m = !1, (Zm !== null || Qm !== null) && (ul(), Zm && (t = Zm, e = Qm, Qm = Zm = null, fn(t), e))) for (t = 0; t < e.length; t++) fn(e[t]);
			}
		}
		function mn(e, t) {
			var n = e.stateNode;
			if (n === null) return null;
			var r = n[qp] || null;
			if (r === null) return null;
			n = r[t];
			a: switch (t) {
				case "onClick":
				case "onClickCapture":
				case "onDoubleClick":
				case "onDoubleClickCapture":
				case "onMouseDown":
				case "onMouseDownCapture":
				case "onMouseMove":
				case "onMouseMoveCapture":
				case "onMouseUp":
				case "onMouseUpCapture":
				case "onMouseEnter":
					(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
					break a;
				default: e = !1;
			}
			if (e) return null;
			if (n && typeof n != "function") throw Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof n + "` type.");
			return n;
		}
		function hn() {
			if (ah) return ah;
			var e, t = ih, n = t.length, r, i = "value" in rh ? rh.value : rh.textContent, a = i.length;
			for (e = 0; e < n && t[e] === i[e]; e++);
			var o = n - e;
			for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
			return ah = i.slice(e, 1 < r ? 1 - r : void 0);
		}
		function gn(e) {
			var t = e.keyCode;
			return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
		}
		function _n() {
			return !0;
		}
		function vn() {
			return !1;
		}
		function yn(e) {
			function t(t, n, r, i, a) {
				for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
				return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? _n : vn, this.isPropagationStopped = vn, this;
			}
			return z(t.prototype, {
				preventDefault: function() {
					this.defaultPrevented = !0;
					var e = this.nativeEvent;
					e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = _n);
				},
				stopPropagation: function() {
					var e = this.nativeEvent;
					e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = _n);
				},
				persist: function() {},
				isPersistent: _n
			}), t;
		}
		function bn(e) {
			var t = this.nativeEvent;
			return t.getModifierState ? t.getModifierState(e) : (e = Ch[e]) ? !!t[e] : !1;
		}
		function xn() {
			return bn;
		}
		function Sn(e, t) {
			switch (e) {
				case "keyup": return Ah.indexOf(t.keyCode) !== -1;
				case "keydown": return t.keyCode !== jh;
				case "keypress":
				case "mousedown":
				case "focusout": return !0;
				default: return !1;
			}
		}
		function Cn(e) {
			return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
		}
		function wn(e, t) {
			switch (e) {
				case "compositionend": return Cn(t);
				case "keypress": return t.which === Ih ? (Rh = !0, Lh) : null;
				case "textInput": return e = t.data, e === Lh && Rh ? null : e;
				default: return null;
			}
		}
		function Tn(e, t) {
			if (zh) return e === "compositionend" || !Mh && Sn(e, t) ? (e = hn(), ah = ih = rh = null, zh = !1, e) : null;
			switch (e) {
				case "paste": return null;
				case "keypress":
					if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
						if (t.char && 1 < t.char.length) return t.char;
						if (t.which) return String.fromCharCode(t.which);
					}
					return null;
				case "compositionend": return Fh && t.locale !== "ko" ? null : t.data;
				default: return null;
			}
		}
		function En(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t === "input" ? !!Bh[e.type] : t === "textarea";
		}
		function Dn(e) {
			if (!eh) return !1;
			e = "on" + e;
			var t = e in document;
			return t ||= (t = document.createElement("div"), t.setAttribute(e, "return;"), typeof t[e] == "function"), t;
		}
		function On(e, t, n, r) {
			Zm ? Qm ? Qm.push(r) : Qm = [r] : Zm = r, t = mu(t, "onChange"), 0 < t.length && (n = new sh("onChange", "change", null, n, r), e.push({
				event: n,
				listeners: t
			}));
		}
		function kn(e) {
			cu(e, 0);
		}
		function An(e) {
			if (ht(et(e))) return e;
		}
		function jn(e, t) {
			if (e === "change") return t;
		}
		function Mn() {
			Vh && (Vh.detachEvent("onpropertychange", Nn), Hh = Vh = null);
		}
		function Nn(e) {
			if (e.propertyName === "value" && An(Hh)) {
				var t = [];
				On(t, Hh, e, dn(e)), pn(kn, t);
			}
		}
		function Pn(e, t, n) {
			e === "focusin" ? (Mn(), Vh = t, Hh = n, Vh.attachEvent("onpropertychange", Nn)) : e === "focusout" && Mn();
		}
		function Fn(e) {
			if (e === "selectionchange" || e === "keyup" || e === "keydown") return An(Hh);
		}
		function In(e, t) {
			if (e === "click") return An(t);
		}
		function Ln(e, t) {
			if (e === "input" || e === "change") return An(t);
		}
		function Rn(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function zn(e, t) {
			if (Wh(e, t)) return !0;
			if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
			var n = Object.keys(e), r = Object.keys(t);
			if (n.length !== r.length) return !1;
			for (r = 0; r < n.length; r++) {
				var i = n[r];
				if (!_p.call(t, i) || !Wh(e[i], t[i])) return !1;
			}
			return !0;
		}
		function Bn(e) {
			for (; e && e.firstChild;) e = e.firstChild;
			return e;
		}
		function Vn(e, t) {
			var n = Bn(e);
			e = 0;
			for (var r; n;) {
				if (n.nodeType === 3) {
					if (r = e + n.textContent.length, e <= t && r >= t) return {
						node: n,
						offset: t - e
					};
					e = r;
				}
				a: {
					for (; n;) {
						if (n.nextSibling) {
							n = n.nextSibling;
							break a;
						}
						n = n.parentNode;
					}
					n = void 0;
				}
				n = Bn(n);
			}
		}
		function Hn(e, t) {
			return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Hn(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
		}
		function Un(e) {
			e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
			for (var t = gt(e.document); t instanceof e.HTMLIFrameElement;) {
				try {
					var n = typeof t.contentWindow.location.href == "string";
				} catch {
					n = !1;
				}
				if (n) e = t.contentWindow;
				else break;
				t = gt(e.document);
			}
			return t;
		}
		function Wn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
		}
		function Gn(e, t, n) {
			var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
			Yh || Kh == null || Kh !== gt(r) || (r = Kh, "selectionStart" in r && Wn(r) ? r = {
				start: r.selectionStart,
				end: r.selectionEnd
			} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
				anchorNode: r.anchorNode,
				anchorOffset: r.anchorOffset,
				focusNode: r.focusNode,
				focusOffset: r.focusOffset
			}), Jh && zn(Jh, r) || (Jh = r, r = mu(qh, "onSelect"), 0 < r.length && (t = new sh("onSelect", "select", null, t, n), e.push({
				event: t,
				listeners: r
			}), t.target = Kh)));
		}
		function Kn(e, t) {
			var n = {};
			return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
		}
		function qn(e) {
			if (Zh[e]) return Zh[e];
			if (!Xh[e]) return e;
			var t = Xh[e], n;
			for (n in t) if (t.hasOwnProperty(n) && n in Qh) return Zh[e] = t[n];
			return e;
		}
		function Jn(e, t) {
			og.set(e, t), rt(t, [e]);
		}
		function Yn(e) {
			for (var t = mg, n = 0; n < e.length; n++) {
				var r = e[n];
				if (typeof r == "object" && r) if (qf(r) && r.length === 2 && typeof r[0] == "string") {
					if (t !== mg && t !== _g) return hg;
					t = _g;
				} else return hg;
				else {
					if (typeof r == "function" || typeof r == "string" && 50 < r.length || t !== mg && t !== gg) return hg;
					t = gg;
				}
			}
			return t;
		}
		function Xn(e, t, n, r) {
			for (var i in e) _p.call(e, i) && i[0] !== "_" && Zn(i, e[i], t, n, r);
		}
		function Zn(e, t, n, r, i) {
			switch (typeof t) {
				case "object": if (t === null) {
					t = "null";
					break;
				} else {
					if (t.$$typeof === jf) {
						var a = S(t.type) || "…", o = t.key;
						t = t.props;
						var s = Object.keys(t), c = s.length;
						if (o == null && c === 0) {
							t = "<" + a + " />";
							break;
						}
						if (3 > r || c === 1 && s[0] === "children" && o == null) {
							t = "<" + a + " … />";
							break;
						}
						for (var l in n.push([i + "\xA0\xA0".repeat(r) + e, "<" + a]), o !== null && Zn("key", o, n, r + 1, i), e = !1, t) l === "children" ? t.children != null && (!qf(t.children) || 0 < t.children.length) && (e = !0) : _p.call(t, l) && l[0] !== "_" && Zn(l, t[l], n, r + 1, i);
						n.push(["", e ? ">…</" + a + ">" : "/>"]);
						return;
					}
					if (a = Object.prototype.toString.call(t), a = a.slice(8, a.length - 1), a === "Array") {
						if (l = Yn(t), l === gg || l === mg) {
							t = JSON.stringify(t);
							break;
						} else if (l === _g) {
							for (n.push([i + "\xA0\xA0".repeat(r) + e, ""]), e = 0; e < t.length; e++) a = t[e], Zn(a[0], a[1], n, r + 1, i);
							return;
						}
					}
					if (a === "Promise") {
						if (t.status === "fulfilled") {
							if (a = n.length, Zn(e, t.value, n, r, i), n.length > a) {
								n = n[a], n[1] = "Promise<" + (n[1] || "Object") + ">";
								return;
							}
						} else if (t.status === "rejected" && (a = n.length, Zn(e, t.reason, n, r, i), n.length > a)) {
							n = n[a], n[1] = "Rejected Promise<" + n[1] + ">";
							return;
						}
						n.push(["\xA0\xA0".repeat(r) + e, "Promise"]);
						return;
					}
					a === "Object" && (l = Object.getPrototypeOf(t)) && typeof l.constructor == "function" && (a = l.constructor.name), n.push([i + "\xA0\xA0".repeat(r) + e, a === "Object" ? 3 > r ? "" : "…" : a]), 3 > r && Xn(t, n, r + 1, i);
					return;
				}
				case "function":
					t = t.name === "" ? "() => {}" : t.name + "() {}";
					break;
				case "string":
					t = t === pg ? "…" : JSON.stringify(t);
					break;
				case "undefined":
					t = "undefined";
					break;
				case "boolean":
					t = t ? "true" : "false";
					break;
				default: t = String(t);
			}
			n.push([i + "\xA0\xA0".repeat(r) + e, t]);
		}
		function Qn(e, t, n, r) {
			var i = !0;
			for (o in e) o in t || (n.push([vg + "\xA0\xA0".repeat(r) + o, "…"]), i = !1);
			for (var a in t) if (a in e) {
				var o = e[a], s = t[a];
				if (o !== s) {
					if (r === 0 && a === "children") i = "\xA0\xA0".repeat(r) + a, n.push([vg + i, "…"], [yg + i, "…"]);
					else {
						if (!(3 <= r)) {
							if (typeof o == "object" && typeof s == "object" && o !== null && s !== null && o.$$typeof === s.$$typeof) if (s.$$typeof === jf) {
								if (o.type === s.type && o.key === s.key) {
									o = S(s.type) || "…", i = "\xA0\xA0".repeat(r) + a, o = "<" + o + " … />", n.push([vg + i, o], [yg + i, o]), i = !1;
									continue;
								}
							} else {
								var c = Object.prototype.toString.call(o), l = Object.prototype.toString.call(s);
								if (c === l && (l === "[object Object]" || l === "[object Array]")) {
									c = [bg + "\xA0\xA0".repeat(r) + a, l === "[object Array]" ? "Array" : ""], n.push(c), l = n.length, Qn(o, s, n, r + 1) ? l === n.length && (c[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : i = !1;
									continue;
								}
							}
							else if (typeof o == "function" && typeof s == "function" && o.name === s.name && o.length === s.length && (c = Function.prototype.toString.call(o), l = Function.prototype.toString.call(s), c === l)) {
								o = s.name === "" ? "() => {}" : s.name + "() {}", n.push([bg + "\xA0\xA0".repeat(r) + a, o + " Referentially unequal function closure. Consider memoization."]);
								continue;
							}
						}
						Zn(a, o, n, r, vg), Zn(a, s, n, r, yg);
					}
					i = !1;
				}
			} else n.push([yg + "\xA0\xA0".repeat(r) + a, "…"]), i = !1;
			return i;
		}
		function $n(e) {
			H = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
		}
		function er(e, t, n, r) {
			xg && (Tg.start = t, Tg.end = n, wg.color = "warning", wg.tooltipText = r, wg.properties = null, (e = e._debugTask) ? e.run(performance.measure.bind(performance, r, Tg)) : performance.measure(r, Tg));
		}
		function tr(e, t, n) {
			er(e, t, n, "Reconnect");
		}
		function nr(e, t, n, r, i) {
			var a = C(e);
			if (a !== null && xg) {
				var o = e.alternate, s = e.actualDuration;
				if (o === null || o.child !== e.child) for (var c = e.child; c !== null; c = c.sibling) s -= c.actualDuration;
				r = .5 > s ? r ? "tertiary-light" : "primary-light" : 10 > s ? r ? "tertiary" : "primary" : 100 > s ? r ? "tertiary-dark" : "primary-dark" : "error";
				var l = e.memoizedProps;
				s = e._debugTask, l !== null && o !== null && o.memoizedProps !== l ? (c = [Eg], l = Qn(o.memoizedProps, l, c, 0), 1 < c.length && (l && !Cg && (o.lanes & i) === 0 && 100 < e.actualDuration ? (Cg = !0, c[0] = Og, wg.color = "warning", wg.tooltipText = Dg) : (wg.color = r, wg.tooltipText = a), wg.properties = c, Tg.start = t, Tg.end = n, s == null ? performance.measure("​" + a, Tg) : s.run(performance.measure.bind(performance, "​" + a, Tg)))) : s == null ? console.timeStamp(a, t, n, Sg, void 0, r) : s.run(console.timeStamp.bind(console, a, t, n, Sg, void 0, r));
			}
		}
		function rr(e, t, n, r) {
			if (xg) {
				var i = C(e);
				if (i !== null) {
					for (var a = null, o = [], s = 0; s < r.length; s++) {
						var c = r[s];
						a == null && c.source !== null && (a = c.source._debugTask), c = c.value, o.push(["Error", typeof c == "object" && c && typeof c.message == "string" ? String(c.message) : String(c)]);
					}
					e.key !== null && Zn("key", e.key, o, 0, ""), e.memoizedProps !== null && Xn(e.memoizedProps, o, 0, ""), a ??= e._debugTask, e = {
						start: t,
						end: n,
						detail: { devtools: {
							color: "error",
							track: Sg,
							tooltipText: e.tag === 13 ? "Hydration failed" : "Error boundary caught an error",
							properties: o
						} }
					}, a ? a.run(performance.measure.bind(performance, "​" + i, e)) : performance.measure("​" + i, e);
				}
			}
		}
		function ir(e, t, n, r, i) {
			if (i !== null) {
				if (xg) {
					var a = C(e);
					if (a !== null) {
						r = [];
						for (var o = 0; o < i.length; o++) {
							var s = i[o].value;
							r.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
						}
						e.key !== null && Zn("key", e.key, r, 0, ""), e.memoizedProps !== null && Xn(e.memoizedProps, r, 0, ""), t = {
							start: t,
							end: n,
							detail: { devtools: {
								color: "error",
								track: Sg,
								tooltipText: "A lifecycle or effect errored",
								properties: r
							} }
						}, (e = e._debugTask) ? e.run(performance.measure.bind(performance, "​" + a, t)) : performance.measure("​" + a, t);
					}
				}
			} else a = C(e), a !== null && xg && (i = 1 > r ? "secondary-light" : 100 > r ? "secondary" : 500 > r ? "secondary-dark" : "error", (e = e._debugTask) ? e.run(console.timeStamp.bind(console, a, t, n, Sg, void 0, i)) : console.timeStamp(a, t, n, Sg, void 0, i));
		}
		function ar(e, t, n, r) {
			if (xg && !(t <= e)) {
				var i = (n & 738197653) === n ? "tertiary-dark" : "primary-dark";
				n = (n & 536870912) === n ? "Prepared" : (n & 201326741) === n ? "Hydrated" : "Render", r ? r.run(console.timeStamp.bind(console, n, e, t, H, V, i)) : console.timeStamp(n, e, t, H, V, i);
			}
		}
		function or(e, t, n, r) {
			!xg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Prewarm", e, t, H, V, n)) : console.timeStamp("Prewarm", e, t, H, V, n));
		}
		function sr(e, t, n, r) {
			!xg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Suspended", e, t, H, V, n)) : console.timeStamp("Suspended", e, t, H, V, n));
		}
		function cr(e, t, n, r, i, a) {
			if (xg && !(t <= e)) {
				n = [];
				for (var o = 0; o < r.length; o++) {
					var s = r[o].value;
					n.push(["Recoverable Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "primary-dark",
						track: H,
						trackGroup: V,
						tooltipText: i ? "Hydration Failed" : "Recovered after Error",
						properties: n
					} }
				}, a ? a.run(performance.measure.bind(performance, "Recovered", e)) : performance.measure("Recovered", e);
			}
		}
		function lr(e, t, n, r) {
			!xg || t <= e || (r ? r.run(console.timeStamp.bind(console, "Errored", e, t, H, V, "error")) : console.timeStamp("Errored", e, t, H, V, "error"));
		}
		function ur(e, t, n, r) {
			!xg || t <= e || (r ? r.run(console.timeStamp.bind(console, n, e, t, H, V, "secondary-light")) : console.timeStamp(n, e, t, H, V, "secondary-light"));
		}
		function dr(e, t, n, r, i) {
			if (xg && !(t <= e)) {
				for (var a = [], o = 0; o < n.length; o++) {
					var s = n[o].value;
					a.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "error",
						track: H,
						trackGroup: V,
						tooltipText: r ? "Remaining Effects Errored" : "Commit Errored",
						properties: a
					} }
				}, i ? i.run(performance.measure.bind(performance, "Errored", e)) : performance.measure("Errored", e);
			}
		}
		function fr(e, t, n) {
			!xg || t <= e || (n ? n.run(console.timeStamp.bind(console, "Animating", e, t, H, V, "secondary-dark")) : console.timeStamp("Animating", e, t, H, V, "secondary-dark"));
		}
		function pr() {
			for (var e = Mg, t = Ng = Mg = 0; t < e;) {
				var n = jg[t];
				jg[t++] = null;
				var r = jg[t];
				jg[t++] = null;
				var i = jg[t];
				jg[t++] = null;
				var a = jg[t];
				if (jg[t++] = null, r !== null && i !== null) {
					var o = r.pending;
					o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
				}
				a !== 0 && _r(n, i, a);
			}
		}
		function mr(e, t, n, r) {
			jg[Mg++] = e, jg[Mg++] = t, jg[Mg++] = n, jg[Mg++] = r, Ng |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
		}
		function hr(e, t, n, r) {
			return mr(e, t, n, r), vr(e);
		}
		function gr(e, t) {
			return mr(e, null, null, t), vr(e);
		}
		function _r(e, t, n) {
			e.lanes |= n;
			var r = e.alternate;
			r !== null && (r.lanes |= n);
			for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & kg || (i = !0)), e = a, a = a.return;
			return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Fp(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
		}
		function vr(e) {
			if (Kx > Gx) throw Zx = Kx = 0, Qx = qx = null, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
			Zx > Xx && (Zx = 0, Qx = null, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")), e.alternate === null && e.flags & 4098 && ql(e);
			for (var t = e, n = t.return; n !== null;) t.alternate === null && t.flags & 4098 && ql(e), t = n, n = t.return;
			return t.tag === 3 ? t.stateNode : null;
		}
		function yr(e) {
			if (Fg === null) return e;
			var t = Fg(e);
			return t === void 0 ? e : t.current;
		}
		function br(e) {
			if (Fg === null) return e;
			var t = Fg(e);
			return t === void 0 ? e != null && typeof e.render == "function" && (t = yr(e.render), e.render !== t) ? (t = {
				$$typeof: Rf,
				render: t
			}, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
		}
		function xr(e, t) {
			if (Fg === null) return !1;
			var n = e.elementType;
			t = t.type;
			var r = !1, i = typeof t == "object" && t ? t.$$typeof : null;
			switch (e.tag) {
				case 1:
					typeof t == "function" && (r = !0);
					break;
				case 0:
					(typeof t == "function" || i === Hf) && (r = !0);
					break;
				case 11:
					(i === Rf || i === Hf) && (r = !0);
					break;
				case 14:
				case 15:
					(i === Vf || i === Hf) && (r = !0);
					break;
				default: return !1;
			}
			return !!(r && (e = Fg(n), e !== void 0 && e === Fg(t)));
		}
		function Sr(e) {
			Fg !== null && typeof WeakSet == "function" && (Ig === null && (Ig = /* @__PURE__ */ new WeakSet()), Ig.add(e));
		}
		function Cr(e, t, n) {
			do {
				var r = e, i = r.alternate, a = r.child, o = r.sibling, s = r.tag;
				r = r.type;
				var c = null;
				switch (s) {
					case 0:
					case 15:
					case 1:
						c = r;
						break;
					case 11: c = r.render;
				}
				if (Fg === null) throw Error("Expected resolveFamily to be set during hot reload.");
				var l = !1;
				if (r = !1, c !== null && (c = Fg(c), c !== void 0 && (n.has(c) ? r = !0 : t.has(c) && (s === 1 ? r = !0 : l = !0))), Ig !== null && (Ig.has(e) || i !== null && Ig.has(i)) && (r = !0), r && (e._debugNeedsRemount = !0), (r || l) && (i = gr(e, 2), i !== null && al(i, e, 2)), a === null || r || Cr(a, t, n), o === null) break;
				e = o;
			} while (1);
		}
		function wr(e, t, n, r) {
			this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Vg || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
		}
		function Tr(e) {
			return e = e.prototype, !(!e || !e.isReactComponent);
		}
		function Er(e, t) {
			var n = e.alternate;
			switch (n === null ? (n = m(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugOwner = e._debugOwner, n._debugStack = e._debugStack, n._debugTask = e._debugTask, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null, n.actualDuration = -0, n.actualStartTime = -1.1), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugInfo = e._debugInfo, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
				case 0:
				case 15:
					n.type = yr(e.type);
					break;
				case 1:
					n.type = yr(e.type);
					break;
				case 11: n.type = br(e.type);
			}
			return n;
		}
		function Dr(e, t) {
			e.flags &= 65011714;
			var n = e.alternate;
			return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration), e;
		}
		function Or(e, t, n, r, i, a) {
			var o = 0, s = e;
			if (typeof e == "function") Tr(e) && (o = 1), s = yr(s);
			else if (typeof e == "string") o = T(), o = Wd(e, n, o) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
			else a: switch (e) {
				case Uf: return t = m(31, n, t, i), t.elementType = Uf, t.lanes = a, t;
				case Nf: return Ar(n.children, i, a, t);
				case Pf:
					o = 8, i |= Rg, i |= zg;
					break;
				case Ff: return e = n, r = i, typeof e.id != "string" && console.error("Profiler must specify an \"id\" of type `string` as a prop. Received the type `%s` instead.", typeof e.id), t = m(12, e, t, r | W), t.elementType = Ff, t.lanes = a, t.stateNode = {
					effectDuration: 0,
					passiveEffectDuration: 0
				}, t;
				case zf: return t = m(13, n, t, i), t.elementType = zf, t.lanes = a, t;
				case Bf: return t = m(19, n, t, i), t.elementType = Bf, t.lanes = a, t;
				default:
					if (typeof e == "object" && e) switch (e.$$typeof) {
						case Lf:
							o = 10;
							break a;
						case If:
							o = 9;
							break a;
						case Rf:
							o = 11, s = br(s);
							break a;
						case Vf:
							o = 14;
							break a;
						case Hf:
							o = 16, s = null;
							break a;
					}
					s = "", (e === void 0 || typeof e == "object" && e && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? n = "null" : qf(e) ? n = "array" : e !== void 0 && e.$$typeof === jf ? (n = "<" + (S(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : n = typeof e, (o = r ? ae(r) : null) && (s += "\n\nCheck the render method of `" + o + "`."), o = 29, n = Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (n + "." + s)), s = null;
			}
			return t = m(o, n, t, i), t.elementType = e, t.type = s, t.lanes = a, t._debugOwner = r, t;
		}
		function kr(e, t, n) {
			return t = Or(e.type, e.key, e.props, e._owner, t, n), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
		}
		function Ar(e, t, n, r) {
			return e = m(7, e, r, t), e.lanes = n, e;
		}
		function jr(e, t, n) {
			return e = m(6, e, null, t), e.lanes = n, e;
		}
		function Mr(e) {
			var t = m(18, null, null, U);
			return t.stateNode = e, t;
		}
		function Nr(e, t, n) {
			return t = m(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation
			}, t;
		}
		function Pr(e, t) {
			if (typeof e == "object" && e) {
				var n = Ug.get(e);
				return n === void 0 ? (t = {
					value: e,
					source: t,
					stack: be(t)
				}, Ug.set(e, t), t) : n;
			}
			return {
				value: e,
				source: t,
				stack: be(t)
			};
		}
		function Fr(e, t) {
			Vr(), Wg[Gg++] = qg, Wg[Gg++] = Kg, Kg = e, qg = t;
		}
		function Ir(e, t, n) {
			Vr(), Jg[Yg++] = Zg, Jg[Yg++] = Qg, Jg[Yg++] = Xg, Xg = e;
			var r = Zg;
			e = Qg;
			var i = 32 - Fp(r) - 1;
			r &= ~(1 << i), n += 1;
			var a = 32 - Fp(t) + i;
			if (30 < a) {
				var o = i - i % 5;
				a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Zg = 1 << 32 - Fp(t) + i | n << i | r, Qg = a + e;
			} else Zg = 1 << a | n << i | r, Qg = e;
		}
		function Lr(e) {
			Vr(), e.return !== null && (Fr(e, 1), Ir(e, 1, 0));
		}
		function Rr(e) {
			for (; e === Kg;) Kg = Wg[--Gg], Wg[Gg] = null, qg = Wg[--Gg], Wg[Gg] = null;
			for (; e === Xg;) Xg = Jg[--Yg], Jg[Yg] = null, Qg = Jg[--Yg], Jg[Yg] = null, Zg = Jg[--Yg], Jg[Yg] = null;
		}
		function zr() {
			return Vr(), Xg === null ? null : {
				id: Zg,
				overflow: Qg
			};
		}
		function Br(e, t) {
			Vr(), Jg[Yg++] = Zg, Jg[Yg++] = Qg, Jg[Yg++] = Xg, Zg = t.id, Qg = t.overflow, Xg = e;
		}
		function Vr() {
			G || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
		}
		function Hr(e, t) {
			if (e.return === null) {
				if (n_ === null) n_ = {
					fiber: e,
					children: [],
					serverProps: void 0,
					serverTail: [],
					distanceFromLeaf: t
				};
				else {
					if (n_.fiber !== e) throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");
					n_.distanceFromLeaf > t && (n_.distanceFromLeaf = t);
				}
				return n_;
			}
			var n = Hr(e.return, t + 1).children;
			return 0 < n.length && n[n.length - 1].fiber === e ? (n = n[n.length - 1], n.distanceFromLeaf > t && (n.distanceFromLeaf = t), n) : (t = {
				fiber: e,
				children: [],
				serverProps: void 0,
				serverTail: [],
				distanceFromLeaf: t
			}, n.push(t), t);
		}
		function Ur() {
			G && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
		}
		function Wr(e, t) {
			t_ || (e = Hr(e, 0), e.serverProps = null, t !== null && (t = yd(t), e.serverTail.push(t)));
		}
		function Gr(e) {
			var t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : !1, n = "", r = n_;
			throw r !== null && (n_ = null, n = Wt(r)), Zr(Pr(Error("Hydration failed because the server rendered " + (t ? "text" : "HTML") + " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + n), e)), a_;
		}
		function Kr(e) {
			var t = e.stateNode, n = e.type, r = e.memoizedProps;
			switch (t[Kp] = e, t[qp] = r, _u(n, r), n) {
				case "dialog":
					L("cancel", t), L("close", t);
					break;
				case "iframe":
				case "object":
				case "embed":
					L("load", t);
					break;
				case "video":
				case "audio":
					for (n = 0; n < fS.length; n++) L(fS[n], t);
					break;
				case "source":
					L("error", t);
					break;
				case "img":
				case "image":
				case "link":
					L("error", t), L("load", t);
					break;
				case "details":
					L("toggle", t);
					break;
				case "input":
					at("input", r), L("invalid", t), vt(t, r), bt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
					break;
				case "option":
					St(t, r);
					break;
				case "select":
					at("select", r), L("invalid", t), Tt(t, r);
					break;
				case "textarea": at("textarea", r), L("invalid", t), Et(t, r), Ot(t, r.value, r.defaultValue, r.children);
			}
			n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Cu(t.textContent, n) ? (r.popover != null && (L("beforetoggle", t), L("toggle", t)), r.onScroll != null && L("scroll", t), r.onScrollEnd != null && L("scrollend", t), r.onClick != null && (t.onclick = un), t = !0) : t = !1, t || Gr(e, !0);
		}
		function qr(e) {
			for ($g = e.return; $g;) switch ($g.tag) {
				case 5:
				case 31:
				case 13:
					i_ = !1;
					return;
				case 27:
				case 3:
					i_ = !0;
					return;
				default: $g = $g.return;
			}
		}
		function Jr(e) {
			if (e !== $g) return !1;
			if (!G) return qr(e), G = !0, !1;
			var t = e.tag, n;
			if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Uu(e.type, e.memoizedProps)), n = !n), n && e_) {
				for (n = e_; n;) {
					var r = Hr(e, 0), i = yd(n);
					r.serverTail.push(i), n = i.type === "Suspense" ? xd(n) : vd(n.nextSibling);
				}
				Gr(e);
			}
			if (qr(e), t === 13) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				e_ = xd(e);
			} else if (t === 31) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				e_ = xd(e);
			} else t === 27 ? (t = e_, ed(e.type) ? (e = nC, nC = null, e_ = e) : e_ = t) : e_ = $g ? vd(e.stateNode.nextSibling) : null;
			return !0;
		}
		function Yr() {
			e_ = $g = null, t_ = G = !1;
		}
		function Xr() {
			var e = r_;
			return e !== null && (mx === null ? mx = e : mx.push.apply(mx, e), r_ = null), e;
		}
		function Zr(e) {
			r_ === null ? r_ = [e] : r_.push(e);
		}
		function Qr() {
			var e = n_;
			if (e !== null) {
				n_ = null;
				for (var t = Wt(e); 0 < e.children.length;) e = e.children[0];
				E(e.fiber, function() {
					console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", t);
				});
			}
		}
		function $r() {
			u_ = l_ = null, d_ = !1;
		}
		function ei(e, t, n) {
			ce(o_, t._currentValue, e), t._currentValue = n, ce(s_, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== c_ && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = c_;
		}
		function ti(e, t) {
			e._currentValue = o_.current;
			var n = s_.current;
			se(s_, t), e._currentRenderer = n, se(o_, t);
		}
		function ni(e, t, n) {
			for (; e !== null;) {
				var r = e.alternate;
				if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
				e = e.return;
			}
			e !== n && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
		}
		function ri(e, t, n, r) {
			var i = e.child;
			for (i !== null && (i.return = e); i !== null;) {
				var a = i.dependencies;
				if (a !== null) {
					var o = i.child;
					a = a.firstContext;
					a: for (; a !== null;) {
						var s = a;
						a = i;
						for (var c = 0; c < t.length; c++) if (s.context === t[c]) {
							a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), ni(a.return, n, e), r || (o = null);
							break a;
						}
						a = s.next;
					}
				} else if (i.tag === 18) {
					if (o = i.return, o === null) throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");
					o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), ni(o, n, e), o = null;
				} else o = i.child;
				if (o !== null) o.return = i;
				else for (o = i; o !== null;) {
					if (o === e) {
						o = null;
						break;
					}
					if (i = o.sibling, i !== null) {
						i.return = o.return, o = i;
						break;
					}
					o = o.return;
				}
				i = o;
			}
		}
		function ii(e, t, n, r) {
			e = null;
			for (var i = t, a = !1; i !== null;) {
				if (!a) {
					if (i.flags & 524288) a = !0;
					else if (i.flags & 262144) break;
				}
				if (i.tag === 10) {
					var o = i.alternate;
					if (o === null) throw Error("Should have a current fiber. This is a bug in React.");
					if (o = o.memoizedProps, o !== null) {
						var s = i.type;
						Wh(i.pendingProps.value, o.value) || (e === null ? e = [s] : e.push(s));
					}
				} else if (i === np.current) {
					if (o = i.alternate, o === null) throw Error("Should have a current fiber. This is a bug in React.");
					o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [bC] : e.push(bC));
				}
				i = i.return;
			}
			e !== null && ri(t, e, n, r), t.flags |= 262144;
		}
		function ai(e) {
			for (e = e.firstContext; e !== null;) {
				if (!Wh(e.context._currentValue, e.memoizedValue)) return !0;
				e = e.next;
			}
			return !1;
		}
		function oi(e) {
			l_ = e, u_ = null, e = e.dependencies, e !== null && (e.firstContext = null);
		}
		function si(e) {
			return d_ && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), li(l_, e);
		}
		function ci(e, t) {
			return l_ === null && oi(e), li(e, t);
		}
		function li(e, t) {
			var n = t._currentValue;
			if (t = {
				context: t,
				memoizedValue: n,
				next: null
			}, u_ === null) {
				if (e === null) throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
				u_ = t, e.dependencies = {
					lanes: 0,
					firstContext: t,
					_debugThenableState: null
				}, e.flags |= 524288;
			} else u_ = u_.next = t;
			return n;
		}
		function ui() {
			return {
				controller: new f_(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function di(e) {
			e.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."), e.refCount++;
		}
		function fi(e) {
			e.refCount--, 0 > e.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."), e.refCount === 0 && p_(m_, function() {
				e.controller.abort();
			});
		}
		function pi(e, t, n) {
			e & 127 ? 0 > A_ && (A_ = g_(), j_ = __(t), N_ = t, n != null && (P_ = C(n)), (Z & (Fb | Ib)) !== Pb && (O_ = !0, M_ = v_), e = Ku(), t = Gu(), e !== L_ || t !== I_ ? L_ = -1.1 : t !== null && (M_ = v_), F_ = e, I_ = t) : e & 4194048 && 0 > V_ && (V_ = g_(), U_ = __(t), W_ = t, n != null && (G_ = C(n)), 0 > B_) && (e = Ku(), t = Gu(), (e !== J_ || t !== q_) && (J_ = -1.1), K_ = e, q_ = t);
		}
		function mi(e) {
			if (0 > A_) {
				A_ = g_(), j_ = e._debugTask == null ? null : e._debugTask, (Z & (Fb | Ib)) !== Pb && (M_ = v_);
				var t = Ku(), n = Gu();
				t !== L_ || n !== I_ ? L_ = -1.1 : n !== null && (M_ = v_), F_ = t, I_ = n;
			}
			0 > V_ && (V_ = g_(), U_ = e._debugTask == null ? null : e._debugTask, 0 > B_) && (e = Ku(), t = Gu(), (e !== J_ || t !== q_) && (J_ = -1.1), K_ = e, q_ = t);
		}
		function hi() {
			var e = T_;
			return T_ = 0, e;
		}
		function gi(e) {
			var t = T_;
			return T_ = e, t;
		}
		function _i(e) {
			var t = T_;
			return T_ += e, t;
		}
		function vi() {
			q = K = -1.1;
		}
		function yi() {
			var e = K;
			return K = -1.1, e;
		}
		function bi(e) {
			0 <= e && (K = e);
		}
		function xi() {
			var e = E_;
			return E_ = -0, e;
		}
		function Si(e) {
			0 <= e && (E_ = e);
		}
		function Ci() {
			var e = D_;
			return D_ = null, e;
		}
		function wi() {
			var e = O_;
			return O_ = !1, e;
		}
		function Ti(e) {
			w_ = g_(), 0 > e.actualStartTime && (e.actualStartTime = w_);
		}
		function Ei(e) {
			if (0 <= w_) {
				var t = g_() - w_;
				e.actualDuration += t, e.selfBaseDuration = t, w_ = -1;
			}
		}
		function Di(e) {
			if (0 <= w_) {
				var t = g_() - w_;
				e.actualDuration += t, w_ = -1;
			}
		}
		function Oi() {
			if (0 <= w_) {
				var e = g_(), t = e - w_;
				w_ = -1, T_ += t, E_ += t, q = e;
			}
		}
		function ki(e) {
			D_ === null && (D_ = []), D_.push(e), C_ === null && (C_ = []), C_.push(e);
		}
		function Ai() {
			w_ = g_(), 0 > K && (K = w_);
		}
		function ji(e) {
			for (var t = e.child; t;) e.actualDuration += t.actualDuration, t = t.sibling;
		}
		function Mi(e, t) {
			if (iv === null) {
				var n = iv = [];
				av = 0, ov = ru(), sv = {
					status: "pending",
					value: void 0,
					then: function(e) {
						n.push(e);
					}
				};
			}
			return av++, t.then(Ni, Ni), t;
		}
		function Ni() {
			if (--av === 0 && (-1 < V_ || (B_ = -1.1), iv !== null)) {
				sv !== null && (sv.status = "fulfilled");
				var e = iv;
				iv = null, ov = 0, sv = null;
				for (var t = 0; t < e.length; t++) (0, e[t])();
			}
		}
		function Pi(e, t) {
			var n = [], r = {
				status: "pending",
				value: null,
				reason: null,
				then: function(e) {
					n.push(e);
				}
			};
			return e.then(function() {
				r.status = "fulfilled", r.value = t;
				for (var e = 0; e < n.length; e++) (0, n[e])(t);
			}, function(e) {
				for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
			}), r;
		}
		function Fi() {
			var e = lv.current;
			return e === null ? Wb.pooledCache : e;
		}
		function Ii(e, t) {
			t === null ? ce(lv, lv.current, e) : ce(lv, t.pool, e);
		}
		function Li() {
			var e = Fi();
			return e === null ? null : {
				parent: h_._currentValue,
				pool: e
			};
		}
		function Ri() {
			return {
				didWarnAboutUncachedPromise: !1,
				thenables: []
			};
		}
		function zi(e) {
			return e = e.status, e === "fulfilled" || e === "rejected";
		}
		function Bi(e, t, n) {
			B.actQueue !== null && (B.didUsePromise = !0);
			var r = e.thenables;
			if (n = r[n], n === void 0 ? r.push(t) : n !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), t.then(un, un), t = n), t._debugInfo === void 0) {
				e = performance.now(), r = t.displayName;
				var i = {
					name: typeof r == "string" ? r : "Promise",
					start: e,
					end: e,
					value: t
				};
				t._debugInfo = [{ awaited: i }], t.status !== "fulfilled" && t.status !== "rejected" && (e = function() {
					i.end = performance.now();
				}, t.then(e, e));
			}
			switch (t.status) {
				case "fulfilled": return t.value;
				case "rejected": throw e = t.reason, Ui(e), e;
				default:
					if (typeof t.status == "string") t.then(un, un);
					else {
						if (e = Wb, e !== null && 100 < e.shellSuspendCounter) throw Error("An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
						e = t, e.status = "pending", e.then(function(e) {
							if (t.status === "pending") {
								var n = t;
								n.status = "fulfilled", n.value = e;
							}
						}, function(e) {
							if (t.status === "pending") {
								var n = t;
								n.status = "rejected", n.reason = e;
							}
						});
					}
					switch (t.status) {
						case "fulfilled": return t.value;
						case "rejected": throw e = t.reason, Ui(e), e;
					}
					throw Hv = t, Uv = !0, Rv;
			}
		}
		function Vi(e) {
			try {
				return Lv(e);
			} catch (e) {
				throw typeof e == "object" && e && typeof e.then == "function" ? (Hv = e, Uv = !0, Rv) : e;
			}
		}
		function Hi() {
			if (Hv === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
			var e = Hv;
			return Hv = null, Uv = !1, e;
		}
		function Ui(e) {
			if (e === Rv || e === Bv) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
		}
		function D(e) {
			var t = J;
			return e != null && (J = t === null ? e : t.concat(e)), t;
		}
		function Wi() {
			var e = J;
			if (e != null) {
				for (var t = e.length - 1; 0 <= t; t--) if (e[t].name != null) {
					var n = e[t].debugTask;
					if (n != null) return n;
				}
			}
			return null;
		}
		function O(e, t, n) {
			for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
				var a = r[i];
				if (a !== "children" && a !== "key") {
					t === null && (t = kr(e, n.mode, 0), t._debugInfo = J, t.return = n), E(t, function(e) {
						console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", e);
					}, a);
					break;
				}
			}
		}
		function Gi(e) {
			var t = Gv;
			return Gv += 1, Wv === null && (Wv = Ri()), Bi(Wv, e, t);
		}
		function Ki(e, t) {
			t = t.props.ref, e.ref = t === void 0 ? null : t;
		}
		function qi(e, t) {
			throw t.$$typeof === Af ? Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.") : (e = Object.prototype.toString.call(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."));
		}
		function Ji(e, t) {
			var n = Wi();
			n === null ? qi(e, t) : n.run(qi.bind(null, e, t));
		}
		function Yi(e, t) {
			var n = C(e) || "Component";
			Yv[n] || (Yv[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", t, t, t) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", t, t, n, t, n));
		}
		function Xi(e, t) {
			var n = Wi();
			n === null ? Yi(e, t) : n.run(Yi.bind(null, e, t));
		}
		function Zi(e, t) {
			var n = C(e) || "Component";
			Xv[n] || (Xv[n] = !0, t = String(t), e.tag === 3 ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", t) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", n, t, n));
		}
		function Qi(e, t) {
			var n = Wi();
			n === null ? Zi(e, t) : n.run(Zi.bind(null, e, t));
		}
		function $i(e) {
			function t(t, n) {
				if (e) {
					var r = t.deletions;
					r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
				}
			}
			function n(n, r) {
				if (!e) return null;
				for (; r !== null;) t(n, r), r = r.sibling;
				return null;
			}
			function r(e) {
				for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
				return t;
			}
			function i(e, t) {
				return e = Er(e, t), e.index = 0, e.sibling = null, e;
			}
			function a(t, n, r) {
				return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
			}
			function o(t) {
				return e && t.alternate === null && (t.flags |= 67108866), t;
			}
			function s(e, t, n, r) {
				return t === null || t.tag !== 6 ? (t = jr(n, e.mode, r), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = J, t) : (t = i(t, n), t.return = e, t._debugInfo = J, t);
			}
			function c(e, t, n, r) {
				var a = n.type;
				return a === Nf ? (t = u(e, t, n.props.children, r, n.key), O(n, t, e), t) : t !== null && (t.elementType === a || xr(t, n) || typeof a == "object" && a && a.$$typeof === Hf && Vi(a) === t.type) ? (t = i(t, n.props), Ki(t, n), t.return = e, t._debugOwner = n._owner, t._debugInfo = J, t) : (t = kr(n, e.mode, r), Ki(t, n), t.return = e, t._debugInfo = J, t);
			}
			function l(e, t, n, r) {
				return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Nr(n, e.mode, r), t.return = e, t._debugInfo = J, t) : (t = i(t, n.children || []), t.return = e, t._debugInfo = J, t);
			}
			function u(e, t, n, r, a) {
				return t === null || t.tag !== 7 ? (t = Ar(n, e.mode, r, a), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = J, t) : (t = i(t, n), t.return = e, t._debugInfo = J, t);
			}
			function d(e, t, n) {
				if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = jr("" + t, e.mode, n), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = J, t;
				if (typeof t == "object" && t) {
					switch (t.$$typeof) {
						case jf: return n = kr(t, e.mode, n), Ki(n, t), n.return = e, e = D(t._debugInfo), n._debugInfo = J, J = e, n;
						case Mf: return t = Nr(t, e.mode, n), t.return = e, t._debugInfo = J, t;
						case Hf:
							var r = D(t._debugInfo);
							return t = Vi(t), e = d(e, t, n), J = r, e;
					}
					if (qf(t) || ie(t)) return n = Ar(t, e.mode, n, null), n.return = e, n._debugOwner = e, n._debugTask = e._debugTask, e = D(t._debugInfo), n._debugInfo = J, J = e, n;
					if (typeof t.then == "function") return r = D(t._debugInfo), e = d(e, Gi(t), n), J = r, e;
					if (t.$$typeof === Lf) return d(e, ci(e, t), n);
					Ji(e, t);
				}
				return typeof t == "function" && Xi(e, t), typeof t == "symbol" && Qi(e, t), null;
			}
			function p(e, t, n, r) {
				var i = t === null ? null : t.key;
				if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? s(e, t, "" + n, r) : null;
				if (typeof n == "object" && n) {
					switch (n.$$typeof) {
						case jf: return n.key === i ? (i = D(n._debugInfo), e = c(e, t, n, r), J = i, e) : null;
						case Mf: return n.key === i ? l(e, t, n, r) : null;
						case Hf: return i = D(n._debugInfo), n = Vi(n), e = p(e, t, n, r), J = i, e;
					}
					if (qf(n) || ie(n)) return i === null ? (i = D(n._debugInfo), e = u(e, t, n, r, null), J = i, e) : null;
					if (typeof n.then == "function") return i = D(n._debugInfo), e = p(e, t, Gi(n), r), J = i, e;
					if (n.$$typeof === Lf) return p(e, t, ci(e, n), r);
					Ji(e, n);
				}
				return typeof n == "function" && Xi(e, n), typeof n == "symbol" && Qi(e, n), null;
			}
			function h(e, t, n, r, i) {
				if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, s(t, e, "" + r, i);
				if (typeof r == "object" && r) {
					switch (r.$$typeof) {
						case jf: return n = e.get(r.key === null ? n : r.key) || null, e = D(r._debugInfo), t = c(t, n, r, i), J = e, t;
						case Mf: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
						case Hf:
							var a = D(r._debugInfo);
							return r = Vi(r), t = h(e, t, n, r, i), J = a, t;
					}
					if (qf(r) || ie(r)) return n = e.get(n) || null, e = D(r._debugInfo), t = u(t, n, r, i, null), J = e, t;
					if (typeof r.then == "function") return a = D(r._debugInfo), t = h(e, t, n, Gi(r), i), J = a, t;
					if (r.$$typeof === Lf) return h(e, t, n, ci(t, r), i);
					Ji(t, r);
				}
				return typeof r == "function" && Xi(t, r), typeof r == "symbol" && Qi(t, r), null;
			}
			function g(e, t, n, r) {
				if (typeof n != "object" || !n) return r;
				switch (n.$$typeof) {
					case jf:
					case Mf:
						f(e, t, n);
						var i = n.key;
						if (typeof i != "string") break;
						if (r === null) {
							r = /* @__PURE__ */ new Set(), r.add(i);
							break;
						}
						if (!r.has(i)) {
							r.add(i);
							break;
						}
						E(t, function() {
							console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", i);
						});
						break;
					case Hf: n = Vi(n), g(e, t, n, r);
				}
				return r;
			}
			function _(i, o, s, c) {
				for (var l = null, u = null, f = null, m = o, _ = o = 0, v = null; m !== null && _ < s.length; _++) {
					m.index > _ ? (v = m, m = null) : v = m.sibling;
					var y = p(i, m, s[_], c);
					if (y === null) {
						m === null && (m = v);
						break;
					}
					l = g(i, y, s[_], l), e && m && y.alternate === null && t(i, m), o = a(y, o, _), f === null ? u = y : f.sibling = y, f = y, m = v;
				}
				if (_ === s.length) return n(i, m), G && Fr(i, _), u;
				if (m === null) {
					for (; _ < s.length; _++) m = d(i, s[_], c), m !== null && (l = g(i, m, s[_], l), o = a(m, o, _), f === null ? u = m : f.sibling = m, f = m);
					return G && Fr(i, _), u;
				}
				for (m = r(m); _ < s.length; _++) v = h(m, i, _, s[_], c), v !== null && (l = g(i, v, s[_], l), e && v.alternate !== null && m.delete(v.key === null ? _ : v.key), o = a(v, o, _), f === null ? u = v : f.sibling = v, f = v);
				return e && m.forEach(function(e) {
					return t(i, e);
				}), G && Fr(i, _), u;
			}
			function v(i, o, s, c) {
				if (s == null) throw Error("An iterable object provided no iterator.");
				for (var l = null, u = null, f = o, m = o = 0, _ = null, v = null, y = s.next(); f !== null && !y.done; m++, y = s.next()) {
					f.index > m ? (_ = f, f = null) : _ = f.sibling;
					var b = p(i, f, y.value, c);
					if (b === null) {
						f === null && (f = _);
						break;
					}
					v = g(i, b, y.value, v), e && f && b.alternate === null && t(i, f), o = a(b, o, m), u === null ? l = b : u.sibling = b, u = b, f = _;
				}
				if (y.done) return n(i, f), G && Fr(i, m), l;
				if (f === null) {
					for (; !y.done; m++, y = s.next()) f = d(i, y.value, c), f !== null && (v = g(i, f, y.value, v), o = a(f, o, m), u === null ? l = f : u.sibling = f, u = f);
					return G && Fr(i, m), l;
				}
				for (f = r(f); !y.done; m++, y = s.next()) _ = h(f, i, m, y.value, c), _ !== null && (v = g(i, _, y.value, v), e && _.alternate !== null && f.delete(_.key === null ? m : _.key), o = a(_, o, m), u === null ? l = _ : u.sibling = _, u = _);
				return e && f.forEach(function(e) {
					return t(i, e);
				}), G && Fr(i, m), l;
			}
			function y(e, r, a, s) {
				if (typeof a == "object" && a && a.type === Nf && a.key === null && (O(a, null, e), a = a.props.children), typeof a == "object" && a) {
					switch (a.$$typeof) {
						case jf:
							var c = D(a._debugInfo);
							a: {
								for (var l = a.key; r !== null;) {
									if (r.key === l) {
										if (l = a.type, l === Nf) {
											if (r.tag === 7) {
												n(e, r.sibling), s = i(r, a.props.children), s.return = e, s._debugOwner = a._owner, s._debugInfo = J, O(a, s, e), e = s;
												break a;
											}
										} else if (r.elementType === l || xr(r, a) || typeof l == "object" && l && l.$$typeof === Hf && Vi(l) === r.type) {
											n(e, r.sibling), s = i(r, a.props), Ki(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = J, e = s;
											break a;
										}
										n(e, r);
										break;
									} else t(e, r);
									r = r.sibling;
								}
								a.type === Nf ? (s = Ar(a.props.children, e.mode, s, a.key), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = J, O(a, s, e), e = s) : (s = kr(a, e.mode, s), Ki(s, a), s.return = e, s._debugInfo = J, e = s);
							}
							return e = o(e), J = c, e;
						case Mf:
							a: {
								for (c = a, a = c.key; r !== null;) {
									if (r.key === a) if (r.tag === 4 && r.stateNode.containerInfo === c.containerInfo && r.stateNode.implementation === c.implementation) {
										n(e, r.sibling), s = i(r, c.children || []), s.return = e, e = s;
										break a;
									} else {
										n(e, r);
										break;
									}
									else t(e, r);
									r = r.sibling;
								}
								s = Nr(c, e.mode, s), s.return = e, e = s;
							}
							return o(e);
						case Hf: return c = D(a._debugInfo), a = Vi(a), e = y(e, r, a, s), J = c, e;
					}
					if (qf(a)) return c = D(a._debugInfo), e = _(e, r, a, s), J = c, e;
					if (ie(a)) {
						if (c = D(a._debugInfo), l = ie(a), typeof l != "function") throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
						var u = l.call(a);
						return u === a ? (e.tag !== 0 || Object.prototype.toString.call(e.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(u) !== "[object Generator]") && (qv || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), qv = !0) : a.entries !== l || Kv || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Kv = !0), e = v(e, r, u, s), J = c, e;
					}
					if (typeof a.then == "function") return c = D(a._debugInfo), e = y(e, r, Gi(a), s), J = c, e;
					if (a.$$typeof === Lf) return y(e, r, ci(e, a), s);
					Ji(e, a);
				}
				return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (c = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), s = i(r, c), s.return = e, e = s) : (n(e, r), s = jr(c, e.mode, s), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = J, e = s), o(e)) : (typeof a == "function" && Xi(e, a), typeof a == "symbol" && Qi(e, a), n(e, r));
			}
			return function(e, t, n, r) {
				var i = J;
				J = null;
				try {
					Gv = 0;
					var a = y(e, t, n, r);
					return Wv = null, a;
				} catch (t) {
					if (t === Rv || t === Bv) throw t;
					var o = m(29, t, null, e.mode);
					o.lanes = r, o.return = e;
					var s = o._debugInfo = J;
					if (o._debugOwner = e._debugOwner, o._debugTask = e._debugTask, s != null) {
						for (var c = s.length - 1; 0 <= c; c--) if (typeof s[c].stack == "string") {
							o._debugOwner = s[c], o._debugTask = s[c].debugTask;
							break;
						}
					}
					return o;
				} finally {
					J = i;
				}
			};
		}
		function ea(e, t) {
			var n = qf(e);
			return e = !n && typeof ie(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", n, t, n), !1) : !0;
		}
		function ta(e) {
			e.updateQueue = {
				baseState: e.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: {
					pending: null,
					lanes: 0,
					hiddenCallbacks: null
				},
				callbacks: null
			};
		}
		function na(e, t) {
			e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				callbacks: null
			});
		}
		function ra(e) {
			return {
				lane: e,
				tag: $v,
				payload: null,
				callback: null,
				next: null
			};
		}
		function ia(e, t, n) {
			var r = e.updateQueue;
			if (r === null) return null;
			if (r = r.shared, ay === r && !iy) {
				var i = C(e);
				console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", i), iy = !0;
			}
			return (Z & Fb) === Pb ? (mr(e, r, t, n), vr(e)) : (i = r.pending, i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = vr(e), _r(e, null, n), t);
		}
		function aa(e, t, n) {
			if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Ue(e, n);
			}
		}
		function oa(e, t) {
			var n = e.updateQueue, r = e.alternate;
			if (r !== null && (r = r.updateQueue, n === r)) {
				var i = null, a = null;
				if (n = n.firstBaseUpdate, n !== null) {
					do {
						var o = {
							lane: n.lane,
							tag: n.tag,
							payload: n.payload,
							callback: null,
							next: null
						};
						a === null ? i = a = o : a = a.next = o, n = n.next;
					} while (n !== null);
					a === null ? i = a = t : a = a.next = t;
				} else i = a = t;
				n = {
					baseState: r.baseState,
					firstBaseUpdate: i,
					lastBaseUpdate: a,
					shared: r.shared,
					callbacks: r.callbacks
				}, e.updateQueue = n;
				return;
			}
			e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
		}
		function sa() {
			if (oy) {
				var e = sv;
				if (e !== null) throw e;
			}
		}
		function ca(e, t, n, r) {
			oy = !1;
			var i = e.updateQueue;
			ry = !1, ay = i.shared;
			var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
			if (s !== null) {
				i.shared.pending = null;
				var c = s, l = c.next;
				c.next = null, o === null ? a = l : o.next = l, o = c;
				var u = e.alternate;
				u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
			}
			if (a !== null) {
				var d = i.baseState;
				o = 0, u = l = c = null, s = a;
				do {
					var f = s.lane & -536870913, p = f !== s.lane;
					if (p ? ($ & f) === f : (r & f) === f) {
						f !== 0 && f === ov && (oy = !0), u !== null && (u = u.next = {
							lane: 0,
							tag: s.tag,
							payload: s.payload,
							callback: null,
							next: null
						});
						a: {
							f = e;
							var m = s, h = t, g = n;
							switch (m.tag) {
								case ey:
									if (m = m.payload, typeof m == "function") {
										d_ = !0;
										var _ = m.call(g, d, h);
										if (f.mode & Rg) {
											Me(!0);
											try {
												m.call(g, d, h);
											} finally {
												Me(!1);
											}
										}
										d_ = !1, d = _;
										break a;
									}
									d = m;
									break a;
								case ny: f.flags = f.flags & -65537 | 128;
								case $v:
									if (_ = m.payload, typeof _ == "function") {
										if (d_ = !0, m = _.call(g, d, h), f.mode & Rg) {
											Me(!0);
											try {
												_.call(g, d, h);
											} finally {
												Me(!1);
											}
										}
										d_ = !1;
									} else m = _;
									if (m == null) break a;
									d = z({}, d, m);
									break a;
								case ty: ry = !0;
							}
						}
						f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
					} else p = {
						lane: f,
						tag: s.tag,
						payload: s.payload,
						callback: s.callback,
						next: null
					}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
					if (s = s.next, s === null) {
						if (s = i.shared.pending, s === null) break;
						p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
					}
				} while (1);
				u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), cx |= o, e.lanes = o, e.memoizedState = d;
			}
			ay = null;
		}
		function la(e, t) {
			if (typeof e != "function") throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + e);
			e.call(t);
		}
		function ua(e, t) {
			var n = e.shared.hiddenCallbacks;
			if (n !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++) la(n[e], t);
		}
		function da(e, t) {
			var n = e.callbacks;
			if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) la(n[e], t);
		}
		function fa(e, t) {
			var n = ox;
			ce(cy, n, e), ce(sy, t, e), ox = n | t.baseLanes;
		}
		function pa(e) {
			ce(cy, ox, e), ce(sy, sy.current, e);
		}
		function ma(e) {
			ox = cy.current, se(sy, e), se(cy, e);
		}
		function ha(e) {
			var t = e.alternate;
			ce(py, py.current & dy, e), ce(ly, e, e), uy === null && (t === null || sy.current !== null || t.memoizedState !== null) && (uy = e);
		}
		function ga(e) {
			ce(py, py.current, e), ce(ly, e, e), uy === null && (uy = e);
		}
		function _a(e) {
			e.tag === 22 ? (ce(py, py.current, e), ce(ly, e, e), uy === null && (uy = e)) : va(e);
		}
		function va(e) {
			ce(py, py.current, e), ce(ly, ly.current, e);
		}
		function ya(e) {
			se(ly, e), uy === e && (uy = null), se(py, e);
		}
		function ba(e) {
			for (var t = e; t !== null;) {
				if (t.tag === 13) {
					var n = t.memoizedState;
					if (n !== null && (n = n.dehydrated, n === null || hd(n) || gd(n))) return t;
				} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
					if (t.flags & 128) return t;
				} else if (t.child !== null) {
					t.child.return = t, t = t.child;
					continue;
				}
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return null;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
			return null;
		}
		function k() {
			var e = X;
			Fy === null ? Fy = [e] : Fy.push(e);
		}
		function A() {
			var e = X;
			if (Fy !== null && (Iy++, Fy[Iy] !== e)) {
				var t = C(Y);
				if (!by.has(t) && (by.add(t), Fy !== null)) {
					for (var n = "", r = 0; r <= Iy; r++) {
						var i = Fy[r], a = r === Iy ? e : i;
						for (i = r + 1 + ". " + i; 30 > i.length;) i += " ";
						i += a + "\n", n += i;
					}
					console.error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", t, n);
				}
			}
		}
		function xa(e) {
			e == null || qf(e) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", X, typeof e);
		}
		function Sa() {
			var e = C(Y);
			Cy.has(e) || (Cy.add(e), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", e));
		}
		function Ca() {
			throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
		}
		function wa(e, t) {
			if (Ly) return !1;
			if (t === null) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", X), !1;
			e.length !== t.length && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", X, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
			for (var n = 0; n < t.length && n < e.length; n++) if (!Wh(e[n], t[n])) return !1;
			return !0;
		}
		function Ta(e, t, n, r, i, a) {
			wy = a, Y = t, Fy = e === null ? null : e._debugHookTypes, Iy = -1, Ly = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (a = C(Y), Sy.has(a) || (Sy.add(a), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", a === null ? "An unknown Component" : "<" + a + ">"))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, B.H = e !== null && e.memoizedState !== null ? Vy : Fy === null ? zy : By, ky = a = (t.mode & Rg) !== U;
			var o = xv(n, r, i);
			if (ky = !1, Oy && (o = Da(t, n, r, i)), a) {
				Me(!0);
				try {
					o = Da(t, n, r, i);
				} finally {
					Me(!1);
				}
			}
			return Ea(e, t), o;
		}
		function Ea(e, t) {
			t._debugHookTypes = Fy, t.dependencies === null ? My !== null && (t.dependencies = {
				lanes: 0,
				firstContext: null,
				_debugThenableState: My
			}) : t.dependencies._debugThenableState = My, B.H = Ry;
			var n = Ty !== null && Ty.next !== null;
			if (wy = 0, Fy = X = Ey = Ty = Y = null, Iy = -1, e !== null && (e.flags & 65011712) != (t.flags & 65011712) && console.error("Internal React error: Expected static flag was missing. Please notify the React team."), Dy = !1, jy = 0, My = null, n) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
			e === null || sb || (e = e.dependencies, e !== null && ai(e) && (sb = !0)), Uv ? (Uv = !1, e = !0) : e = !1, e && (t = C(t) || "Unknown", xy.has(t) || Sy.has(t) || (xy.add(t), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
		}
		function Da(e, t, n, r) {
			Y = e;
			var i = 0;
			do {
				if (Oy && (My = null), jy = 0, Oy = !1, i >= Py) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
				if (i += 1, Ly = !1, Ey = Ty = null, e.updateQueue != null) {
					var a = e.updateQueue;
					a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
				}
				Iy = -1, B.H = Hy, a = xv(t, n, r);
			} while (Oy);
			return a;
		}
		function Oa() {
			var e = B.H, t = e.useState()[0];
			return t = typeof t.then == "function" ? Pa(t) : t, e = e.useState()[0], (Ty === null ? null : Ty.memoizedState) !== e && (Y.flags |= 1024), t;
		}
		function ka() {
			var e = Ay !== 0;
			return Ay = 0, e;
		}
		function Aa(e, t, n) {
			t.updateQueue = e.updateQueue, t.flags = (t.mode & zg) === U ? t.flags & -2053 : t.flags & -402655237, e.lanes &= ~n;
		}
		function ja(e) {
			if (Dy) {
				for (e = e.memoizedState; e !== null;) {
					var t = e.queue;
					t !== null && (t.pending = null), e = e.next;
				}
				Dy = !1;
			}
			wy = 0, Fy = Ey = Ty = Y = null, Iy = -1, X = null, Oy = !1, jy = Ay = 0, My = null;
		}
		function Ma() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return Ey === null ? Y.memoizedState = Ey = e : Ey = Ey.next = e, Ey;
		}
		function j() {
			if (Ty === null) {
				var e = Y.alternate;
				e = e === null ? null : e.memoizedState;
			} else e = Ty.next;
			var t = Ey === null ? Y.memoizedState : Ey.next;
			if (t !== null) Ey = t, Ty = e;
			else {
				if (e === null) throw Y.alternate === null ? Error("Update hook called on initial render. This is likely a bug in React. Please file an issue.") : Error("Rendered more hooks than during the previous render.");
				Ty = e, e = {
					memoizedState: Ty.memoizedState,
					baseState: Ty.baseState,
					baseQueue: Ty.baseQueue,
					queue: Ty.queue,
					next: null
				}, Ey === null ? Y.memoizedState = Ey = e : Ey = Ey.next = e;
			}
			return Ey;
		}
		function Na() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function Pa(e) {
			var t = jy;
			return jy += 1, My === null && (My = Ri()), e = Bi(My, e, t), t = Y, (Ey === null ? t.memoizedState : Ey.next) === null && (t = t.alternate, B.H = t !== null && t.memoizedState !== null ? Vy : zy), e;
		}
		function Fa(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return Pa(e);
				if (e.$$typeof === Lf) return si(e);
			}
			throw Error("An unsupported type was passed to use(): " + String(e));
		}
		function Ia(e) {
			var t = null, n = Y.updateQueue;
			if (n !== null && (t = n.memoCache), t == null) {
				var r = Y.alternate;
				r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
					data: r.data.map(function(e) {
						return e.slice();
					}),
					index: 0
				})));
			}
			if (t ??= {
				data: [],
				index: 0
			}, n === null && (n = Na(), Y.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Ly) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Wf;
			else n.length !== e && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", n.length, e);
			return t.index++, n;
		}
		function La(e, t) {
			return typeof t == "function" ? t(e) : t;
		}
		function Ra(e, t, n) {
			var r = Ma();
			if (n !== void 0) {
				var i = n(t);
				if (ky) {
					Me(!0);
					try {
						n(t);
					} finally {
						Me(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ko.bind(null, Y, e), [r.memoizedState, e];
		}
		function za(e) {
			return Ba(j(), Ty, e);
		}
		function Ba(e, t, n) {
			var r = e.queue;
			if (r === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			r.lastRenderedReducer = n;
			var i = e.baseQueue, a = r.pending;
			if (a !== null) {
				if (i !== null) {
					var o = i.next;
					i.next = a.next, a.next = o;
				}
				t.baseQueue !== i && console.error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), t.baseQueue = i = a, r.pending = null;
			}
			if (a = e.baseState, i === null) e.memoizedState = a;
			else {
				t = i.next;
				var s = o = null, c = null, l = t, u = !1;
				do {
					var d = l.lane & -536870913;
					if (d === l.lane ? (wy & d) === d : ($ & d) === d) {
						var f = l.revertLane;
						if (f === 0) c !== null && (c = c.next = {
							lane: 0,
							revertLane: 0,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}), d === ov && (u = !0);
						else if ((wy & f) === f) {
							l = l.next, f === ov && (u = !0);
							continue;
						} else d = {
							lane: 0,
							revertLane: l.revertLane,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}, c === null ? (s = c = d, o = a) : c = c.next = d, Y.lanes |= f, cx |= f;
						d = l.action, ky && n(a, d), a = l.hasEagerState ? l.eagerState : n(a, d);
					} else f = {
						lane: d,
						revertLane: l.revertLane,
						gesture: l.gesture,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					}, c === null ? (s = c = f, o = a) : c = c.next = f, Y.lanes |= d, cx |= d;
					l = l.next;
				} while (l !== null && l !== t);
				if (c === null ? o = a : c.next = s, !Wh(a, e.memoizedState) && (sb = !0, u && (n = sv, n !== null))) throw n;
				e.memoizedState = a, e.baseState = o, e.baseQueue = c, r.lastRenderedState = a;
			}
			return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
		}
		function Va(e) {
			var t = j(), n = t.queue;
			if (n === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			n.lastRenderedReducer = e;
			var r = n.dispatch, i = n.pending, a = t.memoizedState;
			if (i !== null) {
				n.pending = null;
				var o = i = i.next;
				do
					a = e(a, o.action), o = o.next;
				while (o !== i);
				Wh(a, t.memoizedState) || (sb = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
			}
			return [a, r];
		}
		function Ha(e, t, n) {
			var r = Y, i = Ma();
			if (G) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				var a = n();
				yy || a === n() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), yy = !0);
			} else {
				if (a = t(), yy || (n = t(), Wh(a, n) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), yy = !0)), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				$ & 127 || Wa(r, t, a);
			}
			return i.memoizedState = a, n = {
				value: a,
				getSnapshot: t
			}, i.queue = n, vo(Ka.bind(null, r, n, e), [e]), r.flags |= 2048, mo(hy | vy, { destroy: void 0 }, Ga.bind(null, r, n, a, t), null), a;
		}
		function Ua(e, t, n) {
			var r = Y, i = j(), a = G;
			if (a) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				n = n();
			} else if (n = t(), !yy) {
				var o = t();
				Wh(n, o) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), yy = !0);
			}
			if ((o = !Wh((Ty || i).memoizedState, n)) && (i.memoizedState = n, sb = !0), i = i.queue, _o(2048, vy, Ka.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || Ey !== null && Ey.memoizedState.tag & hy) {
				if (r.flags |= 2048, mo(hy | vy, { destroy: void 0 }, Ga.bind(null, r, i, n, t), null), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				a || wy & 127 || Wa(r, t, n);
			}
			return n;
		}
		function Wa(e, t, n) {
			e.flags |= 16384, e = {
				getSnapshot: t,
				value: n
			}, t = Y.updateQueue, t === null ? (t = Na(), Y.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
		}
		function Ga(e, t, n, r) {
			t.value = n, t.getSnapshot = r, qa(t) && Ja(e);
		}
		function Ka(e, t, n) {
			return n(function() {
				qa(t) && (pi(2, "updateSyncExternalStore()", e), Ja(e));
			});
		}
		function qa(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !Wh(e, n);
			} catch {
				return !0;
			}
		}
		function Ja(e) {
			var t = gr(e, 2);
			t !== null && al(t, e, 2);
		}
		function Ya(e) {
			var t = Ma();
			if (typeof e == "function") {
				var n = e;
				if (e = n(), ky) {
					Me(!0);
					try {
						n();
					} finally {
						Me(!1);
					}
				}
			}
			return t.memoizedState = t.baseState = e, t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: La,
				lastRenderedState: e
			}, t;
		}
		function Xa(e) {
			e = Ya(e);
			var t = e.queue, n = qo.bind(null, Y, t);
			return t.dispatch = n, [e.memoizedState, n];
		}
		function Za(e) {
			var t = Ma();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Yo.bind(null, Y, !0, n), n.dispatch = t, [e, t];
		}
		function Qa(e, t) {
			return $a(j(), Ty, e, t);
		}
		function $a(e, t, n, r) {
			return e.baseState = n, Ba(e, Ty, typeof r == "function" ? r : La);
		}
		function eo(e, t) {
			var n = j();
			return Ty === null ? (n.baseState = e, [e, n.queue.dispatch]) : $a(n, Ty, e, t);
		}
		function to(e, t, n, r, i) {
			if (Xo(e)) throw Error("Cannot update form state while rendering.");
			if (e = t.action, e !== null) {
				var a = {
					payload: i,
					action: e,
					next: null,
					isTransition: !0,
					status: "pending",
					value: null,
					reason: null,
					listeners: [],
					then: function(e) {
						a.listeners.push(e);
					}
				};
				B.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, no(t, a)) : (a.next = n.next, t.pending = n.next = a);
			}
		}
		function no(e, t) {
			var n = t.action, r = t.payload, i = e.state;
			if (t.isTransition) {
				var a = B.T, o = {};
				o._updatedFibers = /* @__PURE__ */ new Set(), B.T = o;
				try {
					var s = n(i, r), c = B.S;
					c !== null && c(o, s), ro(e, t, s);
				} catch (n) {
					ao(e, t, n);
				} finally {
					a !== null && o.types !== null && (a.types !== null && a.types !== o.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), a.types = o.types), B.T = a, a === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
				}
			} else try {
				o = n(i, r), ro(e, t, o);
			} catch (n) {
				ao(e, t, n);
			}
		}
		function ro(e, t, n) {
			typeof n == "object" && n && typeof n.then == "function" ? (B.asyncTransitions++, n.then(Po, Po), n.then(function(n) {
				io(e, t, n);
			}, function(n) {
				return ao(e, t, n);
			}), t.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : io(e, t, n);
		}
		function io(e, t, n) {
			t.status = "fulfilled", t.value = n, oo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, no(e, n)));
		}
		function ao(e, t, n) {
			var r = e.pending;
			if (e.pending = null, r !== null) {
				r = r.next;
				do
					t.status = "rejected", t.reason = n, oo(t), t = t.next;
				while (t !== r);
			}
			e.action = null;
		}
		function oo(e) {
			e = e.listeners;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
		function so(e, t) {
			return t;
		}
		function co(e, t) {
			if (G) {
				var n = Wb.formState;
				if (n !== null) {
					a: {
						var r = Y;
						if (G) {
							if (e_) {
								b: {
									for (var i = e_, a = i_; i.nodeType !== 8;) {
										if (!a) {
											i = null;
											break b;
										}
										if (i = vd(i.nextSibling), i === null) {
											i = null;
											break b;
										}
									}
									a = i.data, i = a === zS || a === BS ? i : null;
								}
								if (i) {
									e_ = vd(i.nextSibling), r = i.data === zS;
									break a;
								}
							}
							Gr(r);
						}
						r = !1;
					}
					r && (t = n[0]);
				}
			}
			return n = Ma(), n.memoizedState = n.baseState = t, r = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: so,
				lastRenderedState: t
			}, n.queue = r, n = qo.bind(null, Y, r), r.dispatch = n, r = Ya(!1), a = Yo.bind(null, Y, !1, r.queue), r = Ma(), i = {
				state: t,
				dispatch: null,
				action: e,
				pending: null
			}, r.queue = i, n = to.bind(null, Y, i, a, n), i.dispatch = n, r.memoizedState = e, [
				t,
				n,
				!1
			];
		}
		function lo(e) {
			return uo(j(), Ty, e);
		}
		function uo(e, t, n) {
			if (t = Ba(e, t, so)[0], e = za(La)[0], typeof t == "object" && t && typeof t.then == "function") try {
				var r = Pa(t);
			} catch (e) {
				throw e === Rv ? Bv : e;
			}
			else r = t;
			t = j();
			var i = t.queue, a = i.dispatch;
			return n !== t.memoizedState && (Y.flags |= 2048, mo(hy | vy, { destroy: void 0 }, fo.bind(null, i, n), null)), [
				r,
				a,
				e
			];
		}
		function fo(e, t) {
			e.action = t;
		}
		function po(e) {
			var t = j(), n = Ty;
			if (n !== null) return uo(t, n, e);
			j(), t = t.memoizedState, n = j();
			var r = n.queue.dispatch;
			return n.memoizedState = e, [
				t,
				r,
				!1
			];
		}
		function mo(e, t, n, r) {
			return e = {
				tag: e,
				create: n,
				deps: r,
				inst: t,
				next: null
			}, t = Y.updateQueue, t === null && (t = Na(), Y.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
		}
		function ho(e) {
			var t = Ma();
			return e = { current: e }, t.memoizedState = e;
		}
		function go(e, t, n, r) {
			var i = Ma();
			Y.flags |= e, i.memoizedState = mo(hy | t, { destroy: void 0 }, n, r === void 0 ? null : r);
		}
		function _o(e, t, n, r) {
			var i = j();
			r = r === void 0 ? null : r;
			var a = i.memoizedState.inst;
			Ty !== null && r !== null && wa(r, Ty.memoizedState.deps) ? i.memoizedState = mo(t, a, n, r) : (Y.flags |= e, i.memoizedState = mo(hy | t, a, n, r));
		}
		function vo(e, t) {
			(Y.mode & zg) === U ? go(8390656, vy, e, t) : go(276826112, vy, e, t);
		}
		function yo(e) {
			Y.flags |= 4;
			var t = Y.updateQueue;
			if (t === null) t = Na(), Y.updateQueue = t, t.events = [e];
			else {
				var n = t.events;
				n === null ? t.events = [e] : n.push(e);
			}
		}
		function bo(e) {
			var t = Ma(), n = { impl: e };
			return t.memoizedState = n, function() {
				if ((Z & Fb) !== Pb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return n.impl.apply(void 0, arguments);
			};
		}
		function M(e) {
			var t = j().memoizedState;
			return yo({
				ref: t,
				nextImpl: e
			}), function() {
				if ((Z & Fb) !== Pb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return t.impl.apply(void 0, arguments);
			};
		}
		function xo(e, t) {
			var n = 4194308;
			return (Y.mode & zg) !== U && (n |= 134217728), go(n, _y, e, t);
		}
		function So(e, t) {
			if (typeof t == "function") {
				e = e();
				var n = t(e);
				return function() {
					typeof n == "function" ? n() : t(null);
				};
			}
			if (t != null) return t.hasOwnProperty("current") || console.error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(t).join(", ") + "}"), e = e(), t.current = e, function() {
				t.current = null;
			};
		}
		function Co(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]);
			var r = 4194308;
			(Y.mode & zg) !== U && (r |= 134217728), go(r, _y, So.bind(null, t, e), n);
		}
		function wo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]), _o(4, _y, So.bind(null, t, e), n);
		}
		function To(e, t) {
			return Ma().memoizedState = [e, t === void 0 ? null : t], e;
		}
		function Eo(e, t) {
			var n = j();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			return t !== null && wa(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
		}
		function Do(e, t) {
			var n = Ma();
			t = t === void 0 ? null : t;
			var r = e();
			if (ky) {
				Me(!0);
				try {
					e();
				} finally {
					Me(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function Oo(e, t) {
			var n = j();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			if (t !== null && wa(t, r[1])) return r[0];
			if (r = e(), ky) {
				Me(!0);
				try {
					e();
				} finally {
					Me(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function ko(e, t) {
			return Mo(Ma(), e, t);
		}
		function Ao(e, t) {
			return No(j(), Ty.memoizedState, e, t);
		}
		function jo(e, t) {
			var n = j();
			return Ty === null ? Mo(n, e, t) : No(n, Ty.memoizedState, e, t);
		}
		function Mo(e, t, n) {
			return n === void 0 || wy & 1073741824 && !($ & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = il(), Y.lanes |= e, cx |= e, n);
		}
		function No(e, t, n, r) {
			return Wh(n, t) ? n : sy.current === null ? !(wy & 42) || wy & 1073741824 && !($ & 261930) ? (sb = !0, e.memoizedState = n) : (e = il(), Y.lanes |= e, cx |= e, t) : (e = Mo(e, n, r), Wh(e, t) || (sb = !0), e);
		}
		function Po() {
			B.asyncTransitions--;
		}
		function Fo(e, t, n, r, i) {
			var a = Jf.p;
			Jf.p = a !== 0 && a < Hp ? a : Hp;
			var o = B.T, s = {};
			s._updatedFibers = /* @__PURE__ */ new Set(), B.T = s, Yo(e, !1, t, n);
			try {
				var c = i(), l = B.S;
				if (l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function") {
					B.asyncTransitions++, c.then(Po, Po);
					var u = Pi(c, r);
					Jo(e, t, u, rl(e));
				} else Jo(e, t, r, rl(e));
			} catch (n) {
				Jo(e, t, {
					then: function() {},
					status: "rejected",
					reason: n
				}, rl(e));
			} finally {
				Jf.p = a, o !== null && s.types !== null && (o.types !== null && o.types !== s.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), o.types = s.types), B.T = o, o === null && s._updatedFibers && (e = s._updatedFibers.size, s._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
			}
		}
		function Io(e, t, n, r) {
			if (e.tag !== 5) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
			var i = Lo(e).queue;
			mi(e), Fo(e, i, t, yC, n === null ? u : function() {
				return Ro(e), n(r);
			});
		}
		function Lo(e) {
			var t = e.memoizedState;
			if (t !== null) return t;
			t = {
				memoizedState: yC,
				baseState: yC,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: La,
					lastRenderedState: yC
				},
				next: null
			};
			var n = {};
			return t.next = {
				memoizedState: n,
				baseState: n,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: La,
					lastRenderedState: n
				},
				next: null
			}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
		}
		function Ro(e) {
			B.T === null && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
			var t = Lo(e);
			t.next === null && (t = e.alternate.memoizedState), Jo(e, t.next.queue, {}, rl(e));
		}
		function zo() {
			var e = Ya(!1);
			return e = Fo.bind(null, Y, e.queue, !0, !1), Ma().memoizedState = e, [!1, e];
		}
		function Bo() {
			var e = za(La)[0], t = j().memoizedState;
			return [typeof e == "boolean" ? e : Pa(e), t];
		}
		function Vo() {
			var e = Va(La)[0], t = j().memoizedState;
			return [typeof e == "boolean" ? e : Pa(e), t];
		}
		function Ho() {
			return si(bC);
		}
		function Uo() {
			var e = Ma(), t = Wb.identifierPrefix;
			if (G) {
				var n = Qg, r = Zg;
				n = (r & ~(1 << 32 - Fp(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Ay++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Ny++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		}
		function Wo() {
			return Ma().memoizedState = Go.bind(null, Y);
		}
		function Go(e, t) {
			for (var n = e.return; n !== null;) {
				switch (n.tag) {
					case 24:
					case 3:
						var r = rl(n), i = ra(r), a = ia(n, i, r);
						a !== null && (pi(r, "refresh()", e), al(a, n, r), aa(a, n, r)), e = ui(), t != null && a !== null && console.error("The seed argument is not enabled outside experimental channels."), i.payload = { cache: e };
						return;
				}
				n = n.return;
			}
		}
		function Ko(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = rl(e);
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			Xo(e) ? Zo(t, i) : (i = hr(e, t, i, r), i !== null && (pi(r, "dispatch()", e), al(i, e, r), Qo(i, t, r)));
		}
		function qo(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = rl(e), Jo(e, t, n, r) && pi(r, "setState()", e);
		}
		function Jo(e, t, n, r) {
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (Xo(e)) Zo(t, i);
			else {
				var a = e.alternate;
				if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) {
					var o = B.H;
					B.H = Wy;
					try {
						var s = t.lastRenderedState, c = a(s, n);
						if (i.hasEagerState = !0, i.eagerState = c, Wh(c, s)) return mr(e, t, i, 0), Wb === null && pr(), !1;
					} catch {} finally {
						B.H = o;
					}
				}
				if (n = hr(e, t, i, r), n !== null) return al(n, e, r), Qo(n, t, r), !0;
			}
			return !1;
		}
		function Yo(e, t, n, r) {
			if (B.T === null && ov === 0 && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."), r = {
				lane: 2,
				revertLane: ru(),
				gesture: null,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, Xo(e)) {
				if (t) throw Error("Cannot update optimistic state while rendering.");
				console.error("Cannot call startTransition while rendering.");
			} else t = hr(e, n, r, 2), t !== null && (pi(2, "setOptimistic()", e), al(t, e, 2));
		}
		function Xo(e) {
			var t = e.alternate;
			return e === Y || t !== null && t === Y;
		}
		function Zo(e, t) {
			Oy = Dy = !0;
			var n = e.pending;
			n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
		}
		function Qo(e, t, n) {
			if (n & 4194048) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Ue(e, n);
			}
		}
		function $o(e) {
			if (e !== null && typeof e != "function") {
				var t = String(e);
				nb.has(t) || (nb.add(t), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", e));
			}
		}
		function es(e, t, n, r) {
			var i = e.memoizedState, a = n(r, i);
			if (e.mode & Rg) {
				Me(!0);
				try {
					a = n(r, i);
				} finally {
					Me(!1);
				}
			}
			a === void 0 && (t = S(t) || "Component", Qy.has(t) || (Qy.add(t), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t))), i = a == null ? i : z({}, i, a), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
		}
		function ts(e, t, n, r, i, a, o) {
			var s = e.stateNode;
			if (typeof s.shouldComponentUpdate == "function") {
				if (n = s.shouldComponentUpdate(r, a, o), e.mode & Rg) {
					Me(!0);
					try {
						n = s.shouldComponentUpdate(r, a, o);
					} finally {
						Me(!1);
					}
				}
				return n === void 0 && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", S(t) || "Component"), n;
			}
			return t.prototype && t.prototype.isPureReactComponent ? !zn(n, r) || !zn(i, a) : !0;
		}
		function ns(e, t, n, r) {
			var i = t.state;
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== i && (e = C(e) || "Component", qy.has(e) || (qy.add(e), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", e)), rb.enqueueReplaceState(t, t.state, null));
		}
		function rs(e, t) {
			var n = t;
			if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
			if (e = e.defaultProps) for (var i in n === t && (n = z({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
			return n;
		}
		function is(e) {
			fg(e), console.warn("%s\n\n%s\n", ib ? "An error occurred in the <" + ib + "> component." : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
		}
		function as(e) {
			var t = ib ? "The above error occurred in the <" + ib + "> component." : "The above error occurred in one of your React components.", n = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((ab || "Anonymous") + ".");
			if (typeof e == "object" && e && typeof e.environmentName == "string") {
				var r = e.environmentName;
				e = [
					"%o\n\n%s\n\n%s\n",
					e,
					t,
					n
				].slice(0), typeof e[0] == "string" ? e.splice(0, 1, xC + " " + e[0], SC, wC + r + wC, CC) : e.splice(0, 0, xC, SC, wC + r + wC, CC), e.unshift(console), r = TC.apply(console.error, e), r();
			} else console.error("%o\n\n%s\n\n%s\n", e, t, n);
		}
		function os(e) {
			fg(e);
		}
		function ss(e, t) {
			try {
				ib = t.source ? C(t.source) : null, ab = null;
				var n = t.value;
				if (B.actQueue !== null) B.thrownErrors.push(n);
				else {
					var r = e.onUncaughtError;
					r(n, { componentStack: t.stack });
				}
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function cs(e, t, n) {
			try {
				ib = n.source ? C(n.source) : null, ab = C(t);
				var r = e.onCaughtError;
				r(n.value, {
					componentStack: n.stack,
					errorBoundary: t.tag === 1 ? t.stateNode : null
				});
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function ls(e, t, n) {
			return n = ra(n), n.tag = ny, n.payload = { element: null }, n.callback = function() {
				E(t.source, ss, e, t);
			}, n;
		}
		function us(e) {
			return e = ra(e), e.tag = ny, e;
		}
		function ds(e, t, n, r) {
			var i = n.type.getDerivedStateFromError;
			if (typeof i == "function") {
				var a = r.value;
				e.payload = function() {
					return i(a);
				}, e.callback = function() {
					Sr(n), E(r.source, cs, t, n, r);
				};
			}
			var o = n.stateNode;
			o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
				Sr(n), E(r.source, cs, t, n, r), typeof i != "function" && (Cx === null ? Cx = new Set([this]) : Cx.add(this)), kv(this, r), typeof i == "function" || !(n.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", C(n) || "Unknown");
			});
		}
		function fs(e, t, n, r, i) {
			if (n.flags |= 32768, Pp && Jl(e, i), typeof r == "object" && r && typeof r.then == "function") {
				if (t = n.alternate, t !== null && ii(t, n, i, !0), G && (t_ = !0), n = ly.current, n !== null) {
					switch (n.tag) {
						case 31:
						case 13: return uy === null ? yl() : n.alternate === null && sx === Lb && (sx = Bb), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Vv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), zl(e, r, i)), !1;
						case 22: return n.flags |= 65536, r === Vv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
							transitions: null,
							markerInstances: null,
							retryQueue: new Set([r])
						}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), zl(e, r, i)), !1;
					}
					throw Error("Unexpected Suspense handler tag (" + n.tag + "). This is a bug in React.");
				}
				return zl(e, r, i), yl(), !1;
			}
			if (G) return t_ = !0, t = ly.current, t === null ? (r !== a_ && Zr(Pr(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", { cause: r }), n)), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Pr(r, n), i = ls(e.stateNode, r, i), oa(e, i), sx !== Vb && (sx = zb)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== a_ && Zr(Pr(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", { cause: r }), n))), !1;
			var a = Pr(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", { cause: r }), n);
			if (px === null ? px = [a] : px.push(a), sx !== Vb && (sx = zb), t === null) return !0;
			r = Pr(r, n), n = t;
			do {
				switch (n.tag) {
					case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = ls(n.stateNode, r, e), oa(n, e), !1;
					case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (Cx === null || !Cx.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = us(i), ds(i, e, n, r), oa(n, i), !1;
				}
				n = n.return;
			} while (n !== null);
			return !1;
		}
		function ps(e, t, n, r) {
			t.child = e === null ? Qv(t, null, n, r) : Zv(t, e.child, n, r);
		}
		function ms(e, t, n, r, i) {
			n = n.render;
			var a = t.ref;
			if ("ref" in r) {
				var o = {};
				for (var s in r) s !== "ref" && (o[s] = r[s]);
			} else o = r;
			return oi(t), r = Ta(e, t, n, o, a, i), s = ka(), e !== null && !sb ? (Aa(e, t, i), Rs(e, t, i)) : (G && s && Lr(t), t.flags |= 1, ps(e, t, r, i), t.child);
		}
		function hs(e, t, n, r, i) {
			if (e === null) {
				var a = n.type;
				return typeof a == "function" && !Tr(a) && a.defaultProps === void 0 && n.compare === null ? (n = yr(a), t.tag = 15, t.type = n, Os(t, a), gs(e, t, n, r, i)) : (e = Or(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
			}
			if (a = e.child, !zs(e, i)) {
				var o = a.memoizedProps;
				if (n = n.compare, n = n === null ? zn : n, n(o, r) && e.ref === t.ref) return Rs(e, t, i);
			}
			return t.flags |= 1, e = Er(a, r), e.ref = t.ref, e.return = t, t.child = e;
		}
		function gs(e, t, n, r, i) {
			if (e !== null) {
				var a = e.memoizedProps;
				if (zn(a, r) && e.ref === t.ref && t.type === e.type) if (sb = !1, t.pendingProps = r = a, zs(e, i)) e.flags & 131072 && (sb = !0);
				else return t.lanes = e.lanes, Rs(e, t, i);
			}
			return ws(e, t, n, r, i);
		}
		function _s(e, t, n, r) {
			var i = r.children, a = e === null ? null : e.memoizedState;
			if (e === null && t.stateNode === null && (t.stateNode = {
				_visibility: kg,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), r.mode === "hidden") {
				if (t.flags & 128) {
					if (a = a === null ? n : a.baseLanes | n, e !== null) {
						for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
						r = i & ~a;
					} else r = 0, t.child = null;
					return ys(e, t, a, n, r);
				}
				if (n & 536870912) t.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, e !== null && Ii(t, a === null ? null : a.cachePool), a === null ? pa(t) : fa(t, a), _a(t);
				else return r = t.lanes = 536870912, ys(e, t, a === null ? n : a.baseLanes | n, n, r);
			} else a === null ? (e !== null && Ii(t, null), pa(t), va(t)) : (Ii(t, a.cachePool), fa(t, a), va(t), t.memoizedState = null);
			return ps(e, t, i, n), t.child;
		}
		function vs(e, t) {
			return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
				_visibility: kg,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), t.sibling;
		}
		function ys(e, t, n, r, i) {
			var a = Fi();
			return a = a === null ? null : {
				parent: h_._currentValue,
				pool: a
			}, t.memoizedState = {
				baseLanes: n,
				cachePool: a
			}, e !== null && Ii(t, null), pa(t), _a(t), e !== null && ii(e, t, r, !0), t.childLanes = i, null;
		}
		function bs(e, t) {
			var n = t.hidden;
			return n !== void 0 && console.error("<Activity> doesn't accept a hidden prop. Use mode=\"hidden\" instead.\n- <Activity %s>\n+ <Activity %s>", !0 === n ? "hidden" : !1 === n ? "hidden={false}" : "hidden={...}", n ? "mode=\"hidden\"" : "mode=\"visible\""), t = Ns({
				mode: t.mode,
				children: t.children
			}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
		}
		function xs(e, t, n) {
			return Zv(t, e.child, null, n), e = bs(t, t.pendingProps), e.flags |= 2, ya(t), t.memoizedState = null, e;
		}
		function Ss(e, t, n) {
			var r = t.pendingProps, i = (t.flags & 128) != 0;
			if (t.flags &= -129, e === null) {
				if (G) {
					if (r.mode === "hidden") return e = bs(t, r), t.lanes = 536870912, vs(null, e);
					if (ga(t), (e = e_) ? (n = md(e, i_), n = n !== null && n.data === kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: zr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Mr(n), r.return = t, t.child = r, $g = t, e_ = null)) : n = null, n === null) throw Wr(t, e), Gr(t);
					return t.lanes = 536870912, null;
				}
				return bs(t, r);
			}
			var a = e.memoizedState;
			if (a !== null) {
				var o = a.dehydrated;
				if (ga(t), i) if (t.flags & 256) t.flags &= -257, t = xs(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
				else if (Ur(), n & 536870912 && vl(t), sb || ii(e, t, n, !1), i = (n & e.childLanes) !== 0, sb || i) {
					if (r = Wb, r !== null && (o = We(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, gr(e, o), al(r, e, o), ob;
					yl(), t = xs(e, t, n);
				} else e = a.treeContext, e_ = vd(o.nextSibling), $g = t, G = !0, r_ = null, t_ = !1, n_ = null, i_ = !1, e !== null && Br(t, e), t = bs(t, r), t.flags |= 4096;
				return t;
			}
			return a = e.child, r = {
				mode: r.mode,
				children: r.children
			}, n & 536870912 && (n & e.lanes) !== 0 && vl(t), e = Er(a, r), e.ref = t.ref, t.child = e, e.return = t, e;
		}
		function Cs(e, t) {
			var n = t.ref;
			if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
			else {
				if (typeof n != "function" && typeof n != "object") throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
				(e === null || e.ref !== n) && (t.flags |= 4194816);
			}
		}
		function ws(e, t, n, r, i) {
			if (n.prototype && typeof n.prototype.render == "function") {
				var a = S(n) || "Unknown";
				cb[a] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a, a), cb[a] = !0);
			}
			return t.mode & Rg && uv.recordLegacyContextWarning(t, null), e === null && (Os(t, t.type), n.contextTypes && (a = S(n) || "Unknown", ub[a] || (ub[a] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", a)))), oi(t), n = Ta(e, t, n, r, void 0, i), r = ka(), e !== null && !sb ? (Aa(e, t, i), Rs(e, t, i)) : (G && r && Lr(t), t.flags |= 1, ps(e, t, n, i), t.child);
		}
		function Ts(e, t, n, r, i, a) {
			return oi(t), Iy = -1, Ly = e !== null && e.type !== t.type, t.updateQueue = null, n = Da(t, r, n, i), Ea(e, t), r = ka(), e !== null && !sb ? (Aa(e, t, a), Rs(e, t, a)) : (G && r && Lr(t), t.flags |= 1, ps(e, t, n, a), t.child);
		}
		function Es(e, t, n, r, i) {
			switch (s(t)) {
				case !1:
					var a = t.stateNode, o = new t.type(t.memoizedProps, a.context).state;
					a.updater.enqueueSetState(a, o, null);
					break;
				case !0:
					t.flags |= 128, t.flags |= 65536, a = Error("Simulated error coming from DevTools");
					var c = i & -i;
					if (t.lanes |= c, o = Wb, o === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
					c = us(c), ds(c, o, t, Pr(a, t)), oa(t, c);
			}
			if (oi(t), t.stateNode === null) {
				if (o = Pg, a = n.contextType, "contextType" in n && a !== null && (a === void 0 || a.$$typeof !== Lf) && !tb.has(n) && (tb.add(n), c = a === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof a == "object" ? a.$$typeof === If ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(a).join(", ") + "}." : " However, it is set to a " + typeof a + ".", console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", S(n) || "Component", c)), typeof a == "object" && a && (o = si(a)), a = new n(r, o), t.mode & Rg) {
					Me(!0);
					try {
						a = new n(r, o);
					} finally {
						Me(!1);
					}
				}
				if (o = t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = rb, t.stateNode = a, a._reactInternals = t, a._reactInternalInstance = Ky, typeof n.getDerivedStateFromProps == "function" && o === null && (o = S(n) || "Component", Jy.has(o) || (Jy.add(o), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", o, a.state === null ? "null" : "undefined", o))), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function") {
					var l = c = o = null;
					if (typeof a.componentWillMount == "function" && !0 !== a.componentWillMount.__suppressDeprecationWarning ? o = "componentWillMount" : typeof a.UNSAFE_componentWillMount == "function" && (o = "UNSAFE_componentWillMount"), typeof a.componentWillReceiveProps == "function" && !0 !== a.componentWillReceiveProps.__suppressDeprecationWarning ? c = "componentWillReceiveProps" : typeof a.UNSAFE_componentWillReceiveProps == "function" && (c = "UNSAFE_componentWillReceiveProps"), typeof a.componentWillUpdate == "function" && !0 !== a.componentWillUpdate.__suppressDeprecationWarning ? l = "componentWillUpdate" : typeof a.UNSAFE_componentWillUpdate == "function" && (l = "UNSAFE_componentWillUpdate"), o !== null || c !== null || l !== null) {
						a = S(n) || "Component";
						var u = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
						Xy.has(a) || (Xy.add(a), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", a, u, o === null ? "" : "\n  " + o, c === null ? "" : "\n  " + c, l === null ? "" : "\n  " + l));
					}
				}
				a = t.stateNode, o = S(n) || "Component", a.render || (n.prototype && typeof n.prototype.render == "function" ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", o) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", o)), !a.getInitialState || a.getInitialState.isReactClassApproved || a.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), a.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), n.childContextTypes && !eb.has(n) && (eb.add(n), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", o)), n.contextTypes && !$y.has(n) && ($y.add(n), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", o)), typeof a.componentShouldUpdate == "function" && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), n.prototype && n.prototype.isPureReactComponent && a.shouldComponentUpdate !== void 0 && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", S(n) || "A pure component"), typeof a.componentDidUnmount == "function" && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof a.componentDidReceiveProps == "function" && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof a.componentWillRecieveProps == "function" && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof a.UNSAFE_componentWillRecieveProps == "function" && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o), c = a.props !== r, a.props !== void 0 && c && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o), a.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof a.getSnapshotBeforeUpdate != "function" || typeof a.componentDidUpdate == "function" || Yy.has(n) || (Yy.add(n), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", S(n))), typeof a.getDerivedStateFromProps == "function" && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof a.getDerivedStateFromError == "function" && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof n.getSnapshotBeforeUpdate == "function" && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o), (c = a.state) && (typeof c != "object" || qf(c)) && console.error("%s.state: must be set to an object or null", o), typeof a.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o), a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ta(t), o = n.contextType, a.context = typeof o == "object" && o ? si(o) : Pg, a.state === r && (o = S(n) || "Component", Zy.has(o) || (Zy.add(o), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o))), t.mode & Rg && uv.recordLegacyContextWarning(t, a), uv.recordUnsafeLifecycleWarnings(t, a), a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (es(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", C(t) || "Component"), rb.enqueueReplaceState(a, a.state, null)), ca(t, r, a, i), sa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zg) !== U && (t.flags |= 134217728), a = !0;
			} else if (e === null) {
				a = t.stateNode;
				var d = t.memoizedProps;
				c = rs(n, d), a.props = c;
				var f = a.context;
				l = n.contextType, o = Pg, typeof l == "object" && l && (o = si(l)), u = n.getDerivedStateFromProps, l = typeof u == "function" || typeof a.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, l || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (d || f !== o) && ns(t, a, r, o), ry = !1;
				var p = t.memoizedState;
				a.state = p, ca(t, r, a, i), sa(), f = t.memoizedState, d || p !== f || ry ? (typeof u == "function" && (es(t, n, u, r), f = t.memoizedState), (c = ry || ts(t, n, c, r, p, f, o)) ? (l || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zg) !== U && (t.flags |= 134217728)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zg) !== U && (t.flags |= 134217728), t.memoizedProps = r, t.memoizedState = f), a.props = r, a.state = f, a.context = o, a = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zg) !== U && (t.flags |= 134217728), a = !1);
			} else {
				a = t.stateNode, na(e, t), o = t.memoizedProps, l = rs(n, o), a.props = l, u = t.pendingProps, p = a.context, f = n.contextType, c = Pg, typeof f == "object" && f && (c = si(f)), d = n.getDerivedStateFromProps, (f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== u || p !== c) && ns(t, a, r, c), ry = !1, p = t.memoizedState, a.state = p, ca(t, r, a, i), sa();
				var m = t.memoizedState;
				o !== u || p !== m || ry || e !== null && e.dependencies !== null && ai(e.dependencies) ? (typeof d == "function" && (es(t, n, d, r), m = t.memoizedState), (l = ry || ts(t, n, l, r, p, m, c) || e !== null && e.dependencies !== null && ai(e.dependencies)) ? (f || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, m, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, m, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), a.props = r, a.state = m, a.context = c, a = l) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
			}
			if (c = a, Cs(e, t), o = (t.flags & 128) != 0, c || o) {
				if (c = t.stateNode, we(t), o && typeof n.getDerivedStateFromError != "function") n = null, w_ = -1;
				else if (n = Cv(c), t.mode & Rg) {
					Me(!0);
					try {
						Cv(c);
					} finally {
						Me(!1);
					}
				}
				t.flags |= 1, e !== null && o ? (t.child = Zv(t, e.child, null, i), t.child = Zv(t, null, n, i)) : ps(e, t, n, i), t.memoizedState = c.state, e = t.child;
			} else e = Rs(e, t, i);
			return i = t.stateNode, a && i.props !== r && (fb || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", C(t) || "a component"), fb = !0), e;
		}
		function Ds(e, t, n, r) {
			return Yr(), t.flags |= 256, ps(e, t, n, r), t.child;
		}
		function Os(e, t) {
			t && t.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", t.displayName || t.name || "Component"), typeof t.getDerivedStateFromProps == "function" && (e = S(t) || "Unknown", db[e] || (console.error("%s: Function components do not support getDerivedStateFromProps.", e), db[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = S(t) || "Unknown", lb[t] || (console.error("%s: Function components do not support contextType.", t), lb[t] = !0));
		}
		function ks(e) {
			return {
				baseLanes: e,
				cachePool: Li()
			};
		}
		function As(e, t, n) {
			return e = e === null ? 0 : e.childLanes & ~n, t && (e |= dx), e;
		}
		function js(e, t, n) {
			var r, i = t.pendingProps;
			o(t) && (t.flags |= 128);
			var a = !1, s = (t.flags & 128) != 0;
			if ((r = s) || (r = e !== null && e.memoizedState === null ? !1 : (py.current & fy) !== 0), r && (a = !0, t.flags &= -129), r = (t.flags & 32) != 0, t.flags &= -33, e === null) {
				if (G) {
					if (a ? ha(t) : va(t), (e = e_) ? (n = md(e, i_), n = n !== null && n.data !== kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: zr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Mr(n), r.return = t, t.child = r, $g = t, e_ = null)) : n = null, n === null) throw Wr(t, e), Gr(t);
					return gd(n) ? t.lanes = 32 : t.lanes = 536870912, null;
				}
				var c = i.children;
				if (i = i.fallback, a) {
					va(t);
					var l = t.mode;
					return c = Ns({
						mode: "hidden",
						children: c
					}, l), i = Ar(i, l, n, null), c.return = t, i.return = t, c.sibling = i, t.child = c, i = t.child, i.memoizedState = ks(n), i.childLanes = As(e, r, n), t.memoizedState = hb, vs(null, i);
				}
				return ha(t), Ms(t, c);
			}
			var u = e.memoizedState;
			if (u !== null) {
				var d = u.dehydrated;
				if (d !== null) {
					if (s) t.flags & 256 ? (ha(t), t.flags &= -257, t = Ps(e, t, n)) : t.memoizedState === null ? (va(t), c = i.fallback, l = t.mode, i = Ns({
						mode: "visible",
						children: i.children
					}, l), c = Ar(c, l, n, null), c.flags |= 2, i.return = t, c.return = t, i.sibling = c, t.child = i, Zv(t, e.child, null, n), i = t.child, i.memoizedState = ks(n), i.childLanes = As(e, r, n), t.memoizedState = hb, t = vs(null, i)) : (va(t), t.child = e.child, t.flags |= 128, t = null);
					else if (ha(t), Ur(), n & 536870912 && vl(t), gd(d)) {
						if (r = d.nextSibling && d.nextSibling.dataset, r) {
							c = r.dgst;
							var f = r.msg;
							l = r.stck;
							var p = r.cstck;
						}
						a = f, r = c, i = l, d = p, c = a, l = d, c = Error(c || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), c.stack = i || "", c.digest = r, r = l === void 0 ? null : l, i = {
							value: c,
							source: null,
							stack: r
						}, typeof r == "string" && Ug.set(c, i), Zr(i), t = Ps(e, t, n);
					} else if (sb || ii(e, t, n, !1), r = (n & e.childLanes) !== 0, sb || r) {
						if (r = Wb, r !== null && (i = We(r, n), i !== 0 && i !== u.retryLane)) throw u.retryLane = i, gr(e, i), al(r, e, i), ob;
						hd(d) || yl(), t = Ps(e, t, n);
					} else hd(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = u.treeContext, e_ = vd(d.nextSibling), $g = t, G = !0, r_ = null, t_ = !1, n_ = null, i_ = !1, e !== null && Br(t, e), t = Ms(t, i.children), t.flags |= 4096);
					return t;
				}
			}
			return a ? (va(t), c = i.fallback, l = t.mode, p = e.child, d = p.sibling, i = Er(p, {
				mode: "hidden",
				children: i.children
			}), i.subtreeFlags = p.subtreeFlags & 65011712, d === null ? (c = Ar(c, l, n, null), c.flags |= 2) : c = Er(d, c), c.return = t, i.return = t, i.sibling = c, t.child = i, vs(null, i), i = t.child, c = e.child.memoizedState, c === null ? c = ks(n) : (l = c.cachePool, l === null ? l = Li() : (p = h_._currentValue, l = l.parent === p ? l : {
				parent: p,
				pool: p
			}), c = {
				baseLanes: c.baseLanes | n,
				cachePool: l
			}), i.memoizedState = c, i.childLanes = As(e, r, n), t.memoizedState = hb, vs(e.child, i)) : (u !== null && (n & 62914560) === n && (n & e.lanes) !== 0 && vl(t), ha(t), n = e.child, e = n.sibling, n = Er(n, {
				mode: "visible",
				children: i.children
			}), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n);
		}
		function Ms(e, t) {
			return t = Ns({
				mode: "visible",
				children: t
			}, e.mode), t.return = e, e.child = t;
		}
		function Ns(e, t) {
			return e = m(22, e, null, t), e.lanes = 0, e;
		}
		function Ps(e, t, n) {
			return Zv(t, e.child, null, n), e = Ms(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
		}
		function Fs(e, t, n) {
			e.lanes |= t;
			var r = e.alternate;
			r !== null && (r.lanes |= t), ni(e.return, t, n);
		}
		function Is(e, t, n, r, i, a) {
			var o = e.memoizedState;
			o === null ? e.memoizedState = {
				isBackwards: t,
				rendering: null,
				renderingStartTime: 0,
				last: r,
				tail: n,
				tailMode: i,
				treeForkCount: a
			} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
		}
		function Ls(e, t, n) {
			var r = t.pendingProps, i = r.revealOrder, a = r.tail, o = r.children, s = py.current;
			if ((r = (s & fy) !== 0) ? (s = s & dy | fy, t.flags |= 128) : s &= dy, ce(py, s, t), s = i ?? "null", i !== "forwards" && i !== "unstable_legacy-backwards" && i !== "together" && i !== "independent" && !pb[s]) if (pb[s] = !0, i == null) console.error("The default for the <SuspenseList revealOrder=\"...\"> prop is changing. To be future compatible you must explictly specify either \"independent\" (the current default), \"together\", \"forwards\" or \"legacy_unstable-backwards\".");
			else if (i === "backwards") console.error("The rendering order of <SuspenseList revealOrder=\"backwards\"> is changing. To be future compatible you must specify revealOrder=\"legacy_unstable-backwards\" instead.");
			else if (typeof i == "string") switch (i.toLowerCase()) {
				case "together":
				case "forwards":
				case "backwards":
				case "independent":
					console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. Use lowercase \"%s\" instead.", i, i.toLowerCase());
					break;
				case "forward":
				case "backward":
					console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use \"%ss\" instead.", i, i.toLowerCase());
					break;
				default: console.error("\"%s\" is not a supported revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			}
			else console.error("%s is not a supported value for revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			s = a ?? "null", mb[s] || (a == null ? (i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && (mb[s] = !0, console.error("The default for the <SuspenseList tail=\"...\"> prop is changing. To be future compatible you must explictly specify either \"visible\" (the current default), \"collapsed\" or \"hidden\".")) : a !== "visible" && a !== "collapsed" && a !== "hidden" ? (mb[s] = !0, console.error("\"%s\" is not a supported value for tail on <SuspenseList />. Did you mean \"visible\", \"collapsed\" or \"hidden\"?", a)) : i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && (mb[s] = !0, console.error("<SuspenseList tail=\"%s\" /> is only valid if revealOrder is \"forwards\" or \"backwards\". Did you mean to specify revealOrder=\"forwards\"?", a)));
			a: if ((i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && o != null && !1 !== o) if (qf(o)) {
				for (s = 0; s < o.length; s++) if (!ea(o[s], s)) break a;
			} else if (s = ie(o), typeof s == "function") {
				if (s = s.call(o)) for (var c = s.next(), l = 0; !c.done; c = s.next()) {
					if (!ea(c.value, l)) break a;
					l++;
				}
			} else console.error("A single row was passed to a <SuspenseList revealOrder=\"%s\" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?", i);
			if (ps(e, t, o, n), G ? (Vr(), o = qg) : o = 0, !r && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && Fs(e, n, t);
				else if (e.tag === 19) Fs(e, n, t);
				else if (e.child !== null) {
					e.child.return = e, e = e.child;
					continue;
				}
				if (e === t) break a;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) break a;
					e = e.return;
				}
				e.sibling.return = e.return, e = e.sibling;
			}
			switch (i) {
				case "forwards":
					for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ba(e) === null && (i = n), n = n.sibling;
					n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Is(t, !1, i, n, a, o);
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (n = null, i = t.child, t.child = null; i !== null;) {
						if (e = i.alternate, e !== null && ba(e) === null) {
							t.child = i;
							break;
						}
						e = i.sibling, i.sibling = n, n = i, i = e;
					}
					Is(t, !0, n, null, a, o);
					break;
				case "together":
					Is(t, !1, null, null, void 0, o);
					break;
				default: t.memoizedState = null;
			}
			return t.child;
		}
		function Rs(e, t, n) {
			if (e !== null && (t.dependencies = e.dependencies), w_ = -1, cx |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
				if (ii(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
			if (e !== null && t.child !== e.child) throw Error("Resuming work not yet implemented.");
			if (t.child !== null) {
				for (e = t.child, n = Er(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Er(e, e.pendingProps), n.return = t;
				n.sibling = null;
			}
			return t.child;
		}
		function zs(e, t) {
			return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && ai(e))) : !0;
		}
		function Bs(e, t, n) {
			switch (t.tag) {
				case 3:
					ue(t, t.stateNode.containerInfo), ei(t, h_, e.memoizedState.cache), Yr();
					break;
				case 27:
				case 5:
					de(t);
					break;
				case 4:
					ue(t, t.stateNode.containerInfo);
					break;
				case 10:
					ei(t, t.type, t.memoizedProps.value);
					break;
				case 12:
					(n & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
					var r = t.stateNode;
					r.effectDuration = -0, r.passiveEffectDuration = -0;
					break;
				case 31:
					if (t.memoizedState !== null) return t.flags |= 128, ga(t), null;
					break;
				case 13:
					if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ha(t), e = Rs(e, t, n), e === null ? null : e.sibling) : js(e, t, n) : (ha(t), t.flags |= 128, null);
					ha(t);
					break;
				case 19:
					var i = (e.flags & 128) != 0;
					if (r = (n & t.childLanes) !== 0, r ||= (ii(e, t, n, !1), (n & t.childLanes) !== 0), i) {
						if (r) return Ls(e, t, n);
						t.flags |= 128;
					}
					if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ce(py, py.current, t), r) break;
					return null;
				case 22: return t.lanes = 0, _s(e, t, n, t.pendingProps);
				case 24: ei(t, h_, e.memoizedState.cache);
			}
			return Rs(e, t, n);
		}
		function Vs(e, t, n) {
			if (t._debugNeedsRemount && e !== null) {
				n = Or(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes), n._debugStack = t._debugStack, n._debugTask = t._debugTask;
				var r = t.return;
				if (r === null) throw Error("Cannot swap the root fiber.");
				if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, n._debugInfo = t._debugInfo, t === r.child) r.child = n;
				else {
					var i = r.child;
					if (i === null) throw Error("Expected parent to have a child.");
					for (; i.sibling !== t;) if (i = i.sibling, i === null) throw Error("Expected to find the previous sibling.");
					i.sibling = n;
				}
				return t = r.deletions, t === null ? (r.deletions = [e], r.flags |= 16) : t.push(e), n.flags |= 2, n;
			}
			if (e !== null) if (e.memoizedProps !== t.pendingProps || t.type !== e.type) sb = !0;
			else {
				if (!zs(e, n) && !(t.flags & 128)) return sb = !1, Bs(e, t, n);
				sb = !!(e.flags & 131072);
			}
			else sb = !1, (r = G) && (Vr(), r = (t.flags & 1048576) != 0), r && (r = t.index, Vr(), Ir(t, qg, r));
			switch (t.lanes = 0, t.tag) {
				case 16:
					a: if (r = t.pendingProps, e = Vi(t.elementType), t.type = e, typeof e == "function") Tr(e) ? (r = rs(e, r), t.tag = 1, t.type = e = yr(e), t = Es(null, t, e, r, n)) : (t.tag = 0, Os(t, e), t.type = e = yr(e), t = ws(null, t, e, r, n));
					else {
						if (e != null) {
							if (i = e.$$typeof, i === Rf) {
								t.tag = 11, t.type = e = br(e), t = ms(null, t, e, r, n);
								break a;
							} else if (i === Vf) {
								t.tag = 14, t = hs(null, t, e, r, n);
								break a;
							}
						}
						throw t = "", typeof e == "object" && e && e.$$typeof === Hf && (t = " Did you wrap a component in React.lazy() more than once?"), n = S(e) || e, Error("Element type is invalid. Received a promise that resolves to: " + n + ". Lazy element type must resolve to a class or function." + t);
					}
					return t;
				case 0: return ws(e, t, t.type, t.pendingProps, n);
				case 1: return r = t.type, i = rs(r, t.pendingProps), Es(e, t, r, i, n);
				case 3:
					a: {
						if (ue(t, t.stateNode.containerInfo), e === null) throw Error("Should have a current fiber. This is a bug in React.");
						r = t.pendingProps;
						var a = t.memoizedState;
						i = a.element, na(e, t), ca(t, r, null, n);
						var o = t.memoizedState;
						if (r = o.cache, ei(t, h_, r), r !== a.cache && ri(t, [h_], n, !0), sa(), r = o.element, a.isDehydrated) if (a = {
							element: r,
							isDehydrated: !1,
							cache: o.cache
						}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
							t = Ds(e, t, r, n);
							break a;
						} else if (r !== i) {
							i = Pr(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t), Zr(i), t = Ds(e, t, r, n);
							break a;
						} else {
							switch (e = t.stateNode.containerInfo, e.nodeType) {
								case 9:
									e = e.body;
									break;
								default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
							}
							for (e_ = vd(e.firstChild), $g = t, G = !0, r_ = null, t_ = !1, n_ = null, i_ = !0, n = Qv(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
						}
						else {
							if (Yr(), r === i) {
								t = Rs(e, t, n);
								break a;
							}
							ps(e, t, r, n);
						}
						t = t.child;
					}
					return t;
				case 26: return Cs(e, t), e === null ? (n = jd(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : G || (n = t.type, e = t.pendingProps, r = le(tp.current), r = Bu(r).createElement(n), r[Kp] = t, r[qp] = e, Eu(r, n, e), nt(r), t.stateNode = r) : t.memoizedState = jd(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
				case 27: return de(t), e === null && G && (r = le(tp.current), i = T(), r = t.stateNode = Ed(t.type, t.pendingProps, r, i, !1), t_ || (i = Iu(r, t.type, t.pendingProps, i), i !== null && (Hr(t, 0).serverProps = i)), $g = t, i_ = !0, i = e_, ed(t.type) ? (nC = i, e_ = vd(r.firstChild)) : e_ = i), ps(e, t, t.pendingProps.children, n), Cs(e, t), e === null && (t.flags |= 4194304), t.child;
				case 5: return e === null && G && (a = T(), r = Xt(t.type, a.ancestorInfo), i = e_, (o = !i) || (o = fd(i, t.type, t.pendingProps, i_), o === null ? a = !1 : (t.stateNode = o, t_ || (a = Iu(o, t.type, t.pendingProps, a), a !== null && (Hr(t, 0).serverProps = a)), $g = t, e_ = vd(o.firstChild), i_ = !1, a = !0), o = !a), o && (r && Wr(t, i), Gr(t))), de(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Uu(i, a) ? r = null : o !== null && Uu(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = Ta(e, t, Oa, null, null, n), bC._currentValue = i), Cs(e, t), ps(e, t, r, n), t.child;
				case 6: return e === null && G && (n = t.pendingProps, e = T(), r = e.ancestorInfo.current, n = r == null ? !0 : Zt(n, r.tag, e.ancestorInfo.implicitRootScope), e = e_, (r = !e) || (r = pd(e, t.pendingProps, i_), r === null ? r = !1 : (t.stateNode = r, $g = t, e_ = null, r = !0), r = !r), r && (n && Wr(t, e), Gr(t))), null;
				case 13: return js(e, t, n);
				case 4: return ue(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Zv(t, null, r, n) : ps(e, t, r, n), t.child;
				case 11: return ms(e, t, t.type, t.pendingProps, n);
				case 7: return ps(e, t, t.pendingProps, n), t.child;
				case 8: return ps(e, t, t.pendingProps.children, n), t.child;
				case 12: return t.flags |= 4, t.flags |= 2048, r = t.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, ps(e, t, t.pendingProps.children, n), t.child;
				case 10: return r = t.type, i = t.pendingProps, a = i.value, "value" in i || gb || (gb = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), ei(t, r, a), ps(e, t, i.children, n), t.child;
				case 9: return i = t.type._context, r = t.pendingProps.children, typeof r != "function" && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), oi(t), i = si(i), r = xv(r, i, void 0), t.flags |= 1, ps(e, t, r, n), t.child;
				case 14: return hs(e, t, t.type, t.pendingProps, n);
				case 15: return gs(e, t, t.type, t.pendingProps, n);
				case 19: return Ls(e, t, n);
				case 31: return Ss(e, t, n);
				case 22: return _s(e, t, n, t.pendingProps);
				case 24: return oi(t), r = si(h_), e === null ? (i = Fi(), i === null && (i = Wb, a = ui(), i.pooledCache = a, di(a), a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
					parent: r,
					cache: i
				}, ta(t), ei(t, h_, i)) : ((e.lanes & n) !== 0 && (na(e, t), ca(t, null, null, n), sa()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, ei(t, h_, r), r !== i.cache && ri(t, [h_], n, !0)) : (i = {
					parent: r,
					cache: r
				}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), ei(t, h_, r))), ps(e, t, t.pendingProps.children, n), t.child;
				case 29: throw t.pendingProps;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Hs(e) {
			e.flags |= 4;
		}
		function Us(e, t, n, r, i) {
			if ((t = (e.mode & Bg) !== U) && (t = !1), t) {
				if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
				else if (hl()) e.flags |= 8192;
				else throw Hv = Vv, zv;
			} else e.flags &= -16777217;
		}
		function Ws(e, t) {
			if (t.type !== "stylesheet" || (t.state.loading & sC) !== rC) e.flags &= -16777217;
			else if (e.flags |= 16777216, !Gd(t)) if (hl()) e.flags |= 8192;
			else throw Hv = Vv, zv;
		}
		function Gs(e, t) {
			t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Re(), e.lanes |= t, fx |= t);
		}
		function Ks(e, t) {
			if (!G) switch (e.tailMode) {
				case "hidden":
					t = e.tail;
					for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
					n === null ? e.tail = null : n.sibling = null;
					break;
				case "collapsed":
					n = e.tail;
					for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
					r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
			}
		}
		function qs(e) {
			var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
			if (t) if ((e.mode & W) !== U) {
				for (var i = e.selfBaseDuration, a = e.child; a !== null;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 65011712, r |= a.flags & 65011712, i += a.treeBaseDuration, a = a.sibling;
				e.treeBaseDuration = i;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
			else if ((e.mode & W) !== U) {
				i = e.actualDuration, a = e.selfBaseDuration;
				for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, i += o.actualDuration, a += o.treeBaseDuration, o = o.sibling;
				e.actualDuration = i, e.treeBaseDuration = a;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
			return e.subtreeFlags |= r, e.childLanes = n, t;
		}
		function Js(e, t, n) {
			var r = t.pendingProps;
			switch (Rr(t), t.tag) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return qs(t), null;
				case 1: return qs(t), null;
				case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ti(h_, t), w(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Jr(t) ? (Qr(), Hs(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Xr())), qs(t), null;
				case 26:
					var i = t.type, a = t.memoizedState;
					return e === null ? (Hs(t), a === null ? (qs(t), Us(t, i, null, r, n)) : (qs(t), Ws(t, a))) : a ? a === e.memoizedState ? (qs(t), t.flags &= -16777217) : (Hs(t), qs(t), Ws(t, a)) : (e = e.memoizedProps, e !== r && Hs(t), qs(t), Us(t, i, e, r, n)), null;
				case 27:
					if (fe(t), n = le(tp.current), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Hs(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return qs(t), null;
						}
						e = T(), Jr(t) ? Kr(t, e) : (e = Ed(i, r, n, e, !0), t.stateNode = e, Hs(t));
					}
					return qs(t), null;
				case 5:
					if (fe(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Hs(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return qs(t), null;
						}
						var o = T();
						if (Jr(t)) Kr(t, o);
						else {
							switch (a = le(tp.current), Xt(i, o.ancestorInfo), o = o.context, a = Bu(a), o) {
								case WS:
									a = a.createElementNS(Im, i);
									break;
								case GS:
									a = a.createElementNS(Fm, i);
									break;
								default: switch (i) {
									case "svg":
										a = a.createElementNS(Im, i);
										break;
									case "math":
										a = a.createElementNS(Fm, i);
										break;
									case "script":
										a = a.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
										break;
									case "select":
										a = typeof r.is == "string" ? a.createElement("select", { is: r.is }) : a.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
										break;
									default: a = typeof r.is == "string" ? a.createElement(i, { is: r.is }) : a.createElement(i), i.indexOf("-") === -1 && (i !== i.toLowerCase() && console.error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", i), Object.prototype.toString.call(a) !== "[object HTMLUnknownElement]" || _p.call(JS, i) || (JS[i] = !0, console.error("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", i)));
								}
							}
							a[Kp] = t, a[qp] = r;
							a: for (o = t.child; o !== null;) {
								if (o.tag === 5 || o.tag === 6) a.appendChild(o.stateNode);
								else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
									o.child.return = o, o = o.child;
									continue;
								}
								if (o === t) break a;
								for (; o.sibling === null;) {
									if (o.return === null || o.return === t) break a;
									o = o.return;
								}
								o.sibling.return = o.return, o = o.sibling;
							}
							t.stateNode = a;
							a: switch (Eu(a, i, r), i) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									r = !!r.autoFocus;
									break a;
								case "img":
									r = !0;
									break a;
								default: r = !1;
							}
							r && Hs(t);
						}
					}
					return qs(t), Us(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
				case 6:
					if (e && t.stateNode != null) e.memoizedProps !== r && Hs(t);
					else {
						if (typeof r != "string" && t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
						if (e = le(tp.current), n = T(), Jr(t)) {
							if (e = t.stateNode, n = t.memoizedProps, i = !t_, r = null, a = $g, a !== null) switch (a.tag) {
								case 3:
									i && (i = bd(e, n, r), i !== null && (Hr(t, 0).serverProps = i));
									break;
								case 27:
								case 5: r = a.memoizedProps, i && (i = bd(e, n, r), i !== null && (Hr(t, 0).serverProps = i));
							}
							e[Kp] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Cu(e.nodeValue, n)), e || Gr(t, !0);
						} else i = n.ancestorInfo.current, i != null && Zt(r, i.tag, n.ancestorInfo.implicitRootScope), e = Bu(e).createTextNode(r), e[Kp] = t, t.stateNode = e;
					}
					return qs(t), null;
				case 31:
					if (n = t.memoizedState, e === null || e.memoizedState !== null) {
						if (r = Jr(t), n !== null) {
							if (e === null) {
								if (!r) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
								e[Kp] = t, qs(t), (t.mode & W) !== U && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							} else Qr(), Yr(), !(t.flags & 128) && (n = t.memoizedState = null), t.flags |= 4, qs(t), (t.mode & W) !== U && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							e = !1;
						} else n = Xr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
						if (!e) return t.flags & 256 ? (ya(t), t) : (ya(t), null);
						if (t.flags & 128) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
					}
					return qs(t), null;
				case 13:
					if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
						if (i = r, a = Jr(t), i !== null && i.dehydrated !== null) {
							if (e === null) {
								if (!a) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
								a[Kp] = t, qs(t), (t.mode & W) !== U && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							} else Qr(), Yr(), !(t.flags & 128) && (i = t.memoizedState = null), t.flags |= 4, qs(t), (t.mode & W) !== U && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							i = !1;
						} else i = Xr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
						if (!i) return t.flags & 256 ? (ya(t), t) : (ya(t), null);
					}
					return ya(t), t.flags & 128 ? (t.lanes = n, (t.mode & W) !== U && ji(t), t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Gs(t, t.updateQueue), qs(t), (t.mode & W) !== U && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
				case 4: return w(t), e === null && uu(t.stateNode.containerInfo), qs(t), null;
				case 10: return ti(t.type, t), qs(t), null;
				case 19:
					if (se(py, t), r = t.memoizedState, r === null) return qs(t), null;
					if (i = (t.flags & 128) != 0, a = r.rendering, a === null) if (i) Ks(r, !1);
					else {
						if (sx !== Lb || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (a = ba(e), a !== null) {
								for (t.flags |= 128, Ks(r, !1), e = a.updateQueue, t.updateQueue = e, Gs(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Dr(n, e), n = n.sibling;
								return ce(py, py.current & dy | fy, t), G && Fr(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Sp() > yx && (t.flags |= 128, i = !0, Ks(r, !1), t.lanes = 4194304);
					}
					else {
						if (!i) if (e = ba(a), e !== null) {
							if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Gs(t, e), Ks(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !G) return qs(t), null;
						} else 2 * Sp() - r.renderingStartTime > yx && n !== 536870912 && (t.flags |= 128, i = !0, Ks(r, !1), t.lanes = 4194304);
						r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
					}
					return r.tail === null ? (qs(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Sp(), e.sibling = null, n = py.current, n = i ? n & dy | fy : n & dy, ce(py, n, t), G && Fr(t, r.treeForkCount), e);
				case 22:
				case 23: return ya(t), ma(t), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (qs(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : qs(t), n = t.updateQueue, n !== null && Gs(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && se(lv, t), null;
				case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ti(h_, t), qs(t), null;
				case 25: return null;
				case 30: return null;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Ys(e, t) {
			switch (Rr(t), t.tag) {
				case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & W) !== U && ji(t), t) : null;
				case 3: return ti(h_, t), w(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
				case 26:
				case 27:
				case 5: return fe(t), null;
				case 31:
					if (t.memoizedState !== null) {
						if (ya(t), t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Yr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & W) !== U && ji(t), t) : null;
				case 13:
					if (ya(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
						if (t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Yr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & W) !== U && ji(t), t) : null;
				case 19: return se(py, t), null;
				case 4: return w(t), null;
				case 10: return ti(t.type, t), null;
				case 22:
				case 23: return ya(t), ma(t), e !== null && se(lv, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & W) !== U && ji(t), t) : null;
				case 24: return ti(h_, t), null;
				case 25: return null;
				default: return null;
			}
		}
		function Xs(e, t) {
			switch (Rr(t), t.tag) {
				case 3:
					ti(h_, t), w(t);
					break;
				case 26:
				case 27:
				case 5:
					fe(t);
					break;
				case 4:
					w(t);
					break;
				case 31:
					t.memoizedState !== null && ya(t);
					break;
				case 13:
					ya(t);
					break;
				case 19:
					se(py, t);
					break;
				case 10:
					ti(t.type, t);
					break;
				case 22:
				case 23:
					ya(t), ma(t), e !== null && se(lv, t);
					break;
				case 24: ti(h_, t);
			}
		}
		function Zs(e) {
			return (e.mode & W) !== U;
		}
		function Qs(e, t) {
			Zs(e) ? (Ai(), ec(t, e), Oi()) : ec(t, e);
		}
		function $s(e, t, n) {
			Zs(e) ? (Ai(), tc(n, e, t), Oi()) : tc(n, e, t);
		}
		function ec(e, t) {
			try {
				var n = t.updateQueue, r = n === null ? null : n.lastEffect;
				if (r !== null) {
					var i = r.next;
					n = i;
					do {
						if ((n.tag & e) === e && (r = void 0, (e & gy) !== my && ($x = !0), r = E(t, Nv, n), (e & gy) !== my && ($x = !1), r !== void 0 && typeof r != "function")) {
							var a = void 0;
							a = (n.tag & _y) === 0 ? (n.tag & gy) === 0 ? "useEffect" : "useInsertionEffect" : "useLayoutEffect";
							var o = void 0;
							o = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? "\n\nIt looks like you wrote " + a + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + a + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + r, E(t, function(e, t) {
								console.error("%s must not return anything besides a function, which is used for clean-up.%s", e, t);
							}, a, o);
						}
						n = n.next;
					} while (n !== i);
				}
			} catch (e) {
				N(t, t.return, e);
			}
		}
		function tc(e, t, n) {
			try {
				var r = t.updateQueue, i = r === null ? null : r.lastEffect;
				if (i !== null) {
					var a = i.next;
					r = a;
					do {
						if ((r.tag & e) === e) {
							var o = r.inst, s = o.destroy;
							s !== void 0 && (o.destroy = void 0, (e & gy) !== my && ($x = !0), i = t, E(i, Fv, i, n, s), (e & gy) !== my && ($x = !1));
						}
						r = r.next;
					} while (r !== a);
				}
			} catch (e) {
				N(t, t.return, e);
			}
		}
		function nc(e, t) {
			Zs(e) ? (Ai(), ec(t, e), Oi()) : ec(t, e);
		}
		function rc(e, t, n) {
			Zs(e) ? (Ai(), tc(n, e, t), Oi()) : tc(n, e, t);
		}
		function ic(e) {
			var t = e.updateQueue;
			if (t !== null) {
				var n = e.stateNode;
				e.type.defaultProps || "ref" in e.memoizedProps || fb || (n.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", C(e) || "instance"), n.state !== e.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", C(e) || "instance"));
				try {
					E(e, da, t, n);
				} catch (t) {
					N(e, e.return, t);
				}
			}
		}
		function ac(e, t, n) {
			return e.getSnapshotBeforeUpdate(t, n);
		}
		function oc(e, t) {
			var n = t.memoizedProps, r = t.memoizedState;
			t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || fb || (t.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", C(e) || "instance"), t.state !== e.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", C(e) || "instance"));
			try {
				var i = rs(e.type, n), a = E(e, ac, t, i, r);
				n = _b, a !== void 0 || n.has(e.type) || (n.add(e.type), E(e, function() {
					console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", C(e));
				})), t.__reactInternalSnapshotBeforeUpdate = a;
			} catch (t) {
				N(e, e.return, t);
			}
		}
		function sc(e, t, n) {
			n.props = rs(e.type, e.memoizedProps), n.state = e.memoizedState, Zs(e) ? (Ai(), E(e, jv, e, t, n), Oi()) : E(e, jv, e, t, n);
		}
		function cc(e) {
			var t = e.ref;
			if (t !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var n = e.stateNode;
						break;
					case 30:
						n = e.stateNode;
						break;
					default: n = e.stateNode;
				}
				if (typeof t == "function") if (Zs(e)) try {
					Ai(), e.refCleanup = t(n);
				} finally {
					Oi();
				}
				else e.refCleanup = t(n);
				else typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", C(e)), t.current = n;
			}
		}
		function lc(e, t) {
			try {
				E(e, cc, e);
			} catch (n) {
				N(e, t, n);
			}
		}
		function uc(e, t) {
			var n = e.ref, r = e.refCleanup;
			if (n !== null) if (typeof r == "function") try {
				if (Zs(e)) try {
					Ai(), E(e, r);
				} finally {
					Oi(e);
				}
				else E(e, r);
			} catch (n) {
				N(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				if (Zs(e)) try {
					Ai(), E(e, n, null);
				} finally {
					Oi(e);
				}
				else E(e, n, null);
			} catch (n) {
				N(e, t, n);
			}
			else n.current = null;
		}
		function dc(e, t, n, r) {
			var i = e.memoizedProps, a = i.id, o = i.onCommit;
			i = i.onRender, t = t === null ? "mount" : "update", nv && (t = "nested-update"), typeof i == "function" && i(a, t, e.actualDuration, e.treeBaseDuration, e.actualStartTime, n), typeof o == "function" && o(a, t, r, n);
		}
		function fc(e, t, n, r) {
			var i = e.memoizedProps;
			e = i.id, i = i.onPostCommit, t = t === null ? "mount" : "update", nv && (t = "nested-update"), typeof i == "function" && i(e, t, r, n);
		}
		function pc(e) {
			var t = e.type, n = e.memoizedProps, r = e.stateNode;
			try {
				E(e, Ju, r, t, n, e);
			} catch (t) {
				N(e, e.return, t);
			}
		}
		function mc(e, t, n) {
			try {
				E(e, Xu, e.stateNode, e.type, n, t, e);
			} catch (t) {
				N(e, e.return, t);
			}
		}
		function hc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ed(e.type) || e.tag === 4;
		}
		function gc(e) {
			a: for (;;) {
				for (; e.sibling === null;) {
					if (e.return === null || hc(e.return)) return null;
					e = e.return;
				}
				for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
					if (e.tag === 27 && ed(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
					e.child.return = e, e = e.child;
				}
				if (!(e.flags & 2)) return e.stateNode;
			}
		}
		function _c(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? ($u(n), (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t)) : ($u(n), t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = un));
			else if (r !== 4 && (r === 27 && ed(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (_c(e, t, n), e = e.sibling; e !== null;) _c(e, t, n), e = e.sibling;
		}
		function vc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
			else if (r !== 4 && (r === 27 && ed(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (vc(e, t, n), e = e.sibling; e !== null;) vc(e, t, n), e = e.sibling;
		}
		function yc(e) {
			for (var t, n = e.return; n !== null;) {
				if (hc(n)) {
					t = n;
					break;
				}
				n = n.return;
			}
			if (t == null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
			switch (t.tag) {
				case 27:
					t = t.stateNode, n = gc(e), vc(e, n, t);
					break;
				case 5:
					n = t.stateNode, t.flags & 32 && (Zu(n), t.flags &= -33), t = gc(e), vc(e, t, n);
					break;
				case 3:
				case 4:
					t = t.stateNode.containerInfo, n = gc(e), _c(e, n, t);
					break;
				default: throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
			}
		}
		function bc(e) {
			var t = e.stateNode, n = e.memoizedProps;
			try {
				E(e, Dd, e.type, n, t, e);
			} catch (t) {
				N(e, e.return, t);
			}
		}
		function xc(e, t) {
			return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 ? e.memoizedState.isDehydrated && (t.flags & 256) == 0 : !1;
		}
		function Sc(e, t) {
			if (e = e.containerInfo, KS = LC, e = Un(e), Wn(e)) {
				if ("selectionStart" in e) var n = {
					start: e.selectionStart,
					end: e.selectionEnd
				};
				else a: {
					n = (n = e.ownerDocument) && n.defaultView || window;
					var r = n.getSelection && n.getSelection();
					if (r && r.rangeCount !== 0) {
						n = r.anchorNode;
						var i = r.anchorOffset, a = r.focusNode;
						r = r.focusOffset;
						try {
							n.nodeType, a.nodeType;
						} catch {
							n = null;
							break a;
						}
						var o = 0, s = -1, c = -1, l = 0, u = 0, d = e, f = null;
						b: for (;;) {
							for (var p; d !== n || i !== 0 && d.nodeType !== 3 || (s = o + i), d !== a || r !== 0 && d.nodeType !== 3 || (c = o + r), d.nodeType === 3 && (o += d.nodeValue.length), (p = d.firstChild) !== null;) f = d, d = p;
							for (;;) {
								if (d === e) break b;
								if (f === n && ++l === i && (s = o), f === a && ++u === r && (c = o), (p = d.nextSibling) !== null) break;
								d = f, f = d.parentNode;
							}
							d = p;
						}
						n = s === -1 || c === -1 ? null : {
							start: s,
							end: c
						};
					} else n = null;
				}
				n ||= {
					start: 0,
					end: 0
				};
			} else n = null;
			for (qS = {
				focusedElem: e,
				selectionRange: n
			}, LC = !1, Sb = t; Sb !== null;) if (t = Sb, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Sb = e;
			else for (; Sb !== null;) {
				switch (e = t = Sb, n = e.alternate, i = e.flags, e.tag) {
					case 0:
						if (i & 4 && (e = e.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
						break;
					case 11:
					case 15: break;
					case 1:
						i & 1024 && n !== null && oc(e, n);
						break;
					case 3:
						if (i & 1024) {
							if (e = e.stateNode.containerInfo, n = e.nodeType, n === 9) dd(e);
							else if (n === 1) switch (e.nodeName) {
								case "HEAD":
								case "HTML":
								case "BODY":
									dd(e);
									break;
								default: e.textContent = "";
							}
						}
						break;
					case 5:
					case 26:
					case 27:
					case 6:
					case 4:
					case 17: break;
					default: if (i & 1024) throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
				}
				if (e = t.sibling, e !== null) {
					e.return = t.return, Sb = e;
					break;
				}
				Sb = t.return;
			}
		}
		function Cc(e, t, n) {
			var r = yi(), i = xi(), a = Ci(), o = wi(), s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Fc(e, n), s & 4 && Qs(n, _y | hy);
					break;
				case 1:
					if (Fc(e, n), s & 4) if (e = n.stateNode, t === null) n.type.defaultProps || "ref" in n.memoizedProps || fb || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", C(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", C(n) || "instance")), Zs(n) ? (Ai(), E(n, Tv, n, e), Oi()) : E(n, Tv, n, e);
					else {
						var c = rs(n.type, t.memoizedProps);
						t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || fb || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", C(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", C(n) || "instance")), Zs(n) ? (Ai(), E(n, Dv, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate), Oi()) : E(n, Dv, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate);
					}
					s & 64 && ic(n), s & 512 && lc(n, n.return);
					break;
				case 3:
					if (t = hi(), Fc(e, n), s & 64 && (s = n.updateQueue, s !== null)) {
						if (c = null, n.child !== null) switch (n.child.tag) {
							case 27:
							case 5:
								c = n.child.stateNode;
								break;
							case 1: c = n.child.stateNode;
						}
						try {
							E(n, da, s, c);
						} catch (e) {
							N(n, n.return, e);
						}
					}
					e.effectDuration += gi(t);
					break;
				case 27: t === null && s & 4 && bc(n);
				case 26:
				case 5:
					if (Fc(e, n), t === null) {
						if (s & 4) pc(n);
						else if (s & 64) {
							e = n.type, t = n.memoizedProps, c = n.stateNode;
							try {
								E(n, Yu, c, e, t, n);
							} catch (e) {
								N(n, n.return, e);
							}
						}
					}
					s & 512 && lc(n, n.return);
					break;
				case 12:
					if (s & 4) {
						s = hi(), Fc(e, n), e = n.stateNode, e.effectDuration += _i(s);
						try {
							E(n, dc, n, t, x_, e.effectDuration);
						} catch (e) {
							N(n, n.return, e);
						}
					} else Fc(e, n);
					break;
				case 31:
					Fc(e, n), s & 4 && Dc(e, n);
					break;
				case 13:
					Fc(e, n), s & 4 && Oc(e, n), s & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = Hl.bind(null, n), _d(e, s))));
					break;
				case 22:
					if (s = n.memoizedState !== null || vb, !s) {
						t = t !== null && t.memoizedState !== null || yb, c = vb;
						var l = yb;
						vb = s, (yb = t) && !l ? (zc(e, n, (n.subtreeFlags & 8772) != 0), (n.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && tr(n, K, q)) : Fc(e, n), vb = c, yb = l;
					}
					break;
				case 30: break;
				default: Fc(e, n);
			}
			(n.mode & W) !== U && 0 <= K && 0 <= q && ((O_ || .05 < E_) && ir(n, K, q, E_, D_), n.alternate === null && n.return !== null && n.return.alternate !== null && .05 < q - K && (xc(n.return.alternate, n.return) || er(n, K, q, "Mount"))), bi(r), Si(i), D_ = a, O_ = o;
		}
		function wc(e) {
			var t = e.alternate;
			t !== null && (e.alternate = null, wc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ze(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
		}
		function Tc(e, t, n) {
			for (n = n.child; n !== null;) Ec(e, t, n), n = n.sibling;
		}
		function Ec(e, t, n) {
			if (Mp && typeof Mp.onCommitFiberUnmount == "function") try {
				Mp.onCommitFiberUnmount(jp, n);
			} catch (e) {
				Np || (Np = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			var r = yi(), i = xi(), a = Ci(), o = wi();
			switch (n.tag) {
				case 26:
					yb || uc(n, t), Tc(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (e = n.stateNode, e.parentNode.removeChild(e));
					break;
				case 27:
					yb || uc(n, t);
					var s = Tb, c = Eb;
					ed(n.type) && (Tb = n.stateNode, Eb = !1), Tc(e, t, n), E(n, Od, n.stateNode), Tb = s, Eb = c;
					break;
				case 5: yb || uc(n, t);
				case 6:
					if (s = Tb, c = Eb, Tb = null, Tc(e, t, n), Tb = s, Eb = c, Tb !== null) if (Eb) try {
						E(n, nd, Tb, n.stateNode);
					} catch (e) {
						N(n, t, e);
					}
					else try {
						E(n, td, Tb, n.stateNode);
					} catch (e) {
						N(n, t, e);
					}
					break;
				case 18:
					Tb !== null && (Eb ? (e = Tb, rd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Sf(e)) : rd(Tb, n.stateNode));
					break;
				case 4:
					s = Tb, c = Eb, Tb = n.stateNode.containerInfo, Eb = !0, Tc(e, t, n), Tb = s, Eb = c;
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					tc(gy, n, t), yb || $s(n, t, _y), Tc(e, t, n);
					break;
				case 1:
					yb || (uc(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function" && sc(n, t, s)), Tc(e, t, n);
					break;
				case 21:
					Tc(e, t, n);
					break;
				case 22:
					yb = (s = yb) || n.memoizedState !== null, Tc(e, t, n), yb = s;
					break;
				default: Tc(e, t, n);
			}
			(n.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(n, K, q, E_, D_), bi(r), Si(i), D_ = a, O_ = o;
		}
		function Dc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
				e = e.dehydrated;
				try {
					E(t, wd, e);
				} catch (e) {
					N(t, t.return, e);
				}
			}
		}
		function Oc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
				E(t, Td, e);
			} catch (e) {
				N(t, t.return, e);
			}
		}
		function kc(e) {
			switch (e.tag) {
				case 31:
				case 13:
				case 19:
					var t = e.stateNode;
					return t === null && (t = e.stateNode = new xb()), t;
				case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new xb()), t;
				default: throw Error("Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React.");
			}
		}
		function Ac(e, t) {
			var n = kc(e);
			t.forEach(function(t) {
				if (!n.has(t)) {
					if (n.add(t), Pp) if (Cb !== null && wb !== null) Jl(wb, Cb);
					else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
					var r = Ul.bind(null, e, t);
					t.then(r, r);
				}
			});
		}
		function jc(e, t) {
			var n = t.deletions;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = e, a = t, o = n[r], s = yi(), c = a;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 27:
							if (ed(c.type)) {
								Tb = c.stateNode, Eb = !1;
								break a;
							}
							break;
						case 5:
							Tb = c.stateNode, Eb = !1;
							break a;
						case 3:
						case 4:
							Tb = c.stateNode.containerInfo, Eb = !0;
							break a;
					}
					c = c.return;
				}
				if (Tb === null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
				Ec(i, a, o), Tb = null, Eb = !1, (o.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && er(o, K, q, "Unmount"), bi(s), i = o, a = i.alternate, a !== null && (a.return = null), i.return = null;
			}
			if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Mc(t, e), t = t.sibling;
		}
		function Mc(e, t) {
			var n = yi(), r = xi(), i = Ci(), a = wi(), o = e.alternate, s = e.flags;
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					jc(t, e), Nc(e), s & 4 && (tc(gy | hy, e, e.return), ec(gy | hy, e), $s(e, e.return, _y | hy));
					break;
				case 1:
					if (jc(t, e), Nc(e), s & 512 && (yb || o === null || uc(o, o.return)), s & 64 && vb && (s = e.updateQueue, s !== null && (o = s.callbacks, o !== null))) {
						var c = s.shared.hiddenCallbacks;
						s.shared.hiddenCallbacks = c === null ? o : c.concat(o);
					}
					break;
				case 26:
					if (c = Db, jc(t, e), Nc(e), s & 512 && (yb || o === null || uc(o, o.return)), s & 4) {
						var l = o === null ? null : o.memoizedState;
						if (s = e.memoizedState, o === null) if (s === null) if (e.stateNode === null) {
							a: {
								s = e.type, o = e.memoizedProps, c = c.ownerDocument || c;
								b: switch (s) {
									case "title":
										l = c.getElementsByTagName("title")[0], (!l || l[$p] || l[Kp] || l.namespaceURI === Im || l.hasAttribute("itemprop")) && (l = c.createElement(s), c.head.insertBefore(l, c.querySelector("head > title"))), Eu(l, s, o), l[Kp] = e, nt(l), s = l;
										break a;
									case "link":
										var u = Hd("link", "href", c).get(s + (o.href || ""));
										if (u) {
											for (var d = 0; d < u.length; d++) if (l = u[d], l.getAttribute("href") === (o.href == null || o.href === "" ? null : o.href) && l.getAttribute("rel") === (o.rel == null ? null : o.rel) && l.getAttribute("title") === (o.title == null ? null : o.title) && l.getAttribute("crossorigin") === (o.crossOrigin == null ? null : o.crossOrigin)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), Eu(l, s, o), c.head.appendChild(l);
										break;
									case "meta":
										if (u = Hd("meta", "content", c).get(s + (o.content || ""))) {
											for (d = 0; d < u.length; d++) if (l = u[d], Oe(o.content, "content"), l.getAttribute("content") === (o.content == null ? null : "" + o.content) && l.getAttribute("name") === (o.name == null ? null : o.name) && l.getAttribute("property") === (o.property == null ? null : o.property) && l.getAttribute("http-equiv") === (o.httpEquiv == null ? null : o.httpEquiv) && l.getAttribute("charset") === (o.charSet == null ? null : o.charSet)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), Eu(l, s, o), c.head.appendChild(l);
										break;
									default: throw Error("getNodesForType encountered a type it did not expect: \"" + s + "\". This is a bug in React.");
								}
								l[Kp] = e, nt(l), s = l;
							}
							e.stateNode = s;
						} else Ud(c, e.type, e.stateNode);
						else e.stateNode = Rd(c, s, e.memoizedProps);
						else l === s ? s === null && e.stateNode !== null && mc(e, e.memoizedProps, o.memoizedProps) : (l === null ? o.stateNode !== null && (o = o.stateNode, o.parentNode.removeChild(o)) : l.count--, s === null ? Ud(c, e.type, e.stateNode) : Rd(c, s, e.memoizedProps));
					}
					break;
				case 27:
					jc(t, e), Nc(e), s & 512 && (yb || o === null || uc(o, o.return)), o !== null && s & 4 && mc(e, e.memoizedProps, o.memoizedProps);
					break;
				case 5:
					if (jc(t, e), Nc(e), s & 512 && (yb || o === null || uc(o, o.return)), e.flags & 32) {
						c = e.stateNode;
						try {
							E(e, Zu, c);
						} catch (t) {
							N(e, e.return, t);
						}
					}
					s & 4 && e.stateNode != null && (c = e.memoizedProps, mc(e, c, o === null ? c : o.memoizedProps)), s & 1024 && (bb = !0, e.type !== "form" && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
					break;
				case 6:
					if (jc(t, e), Nc(e), s & 4) {
						if (e.stateNode === null) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
						s = e.memoizedProps, o = o === null ? s : o.memoizedProps, c = e.stateNode;
						try {
							E(e, Qu, c, o, s);
						} catch (t) {
							N(e, e.return, t);
						}
					}
					break;
				case 3:
					if (c = hi(), fC = null, l = Db, Db = kd(t.containerInfo), jc(t, e), Db = l, Nc(e), s & 4 && o !== null && o.memoizedState.isDehydrated) try {
						E(e, Cd, t.containerInfo);
					} catch (t) {
						N(e, e.return, t);
					}
					bb && (bb = !1, Pc(e)), t.effectDuration += gi(c);
					break;
				case 4:
					s = Db, Db = kd(e.stateNode.containerInfo), jc(t, e), Nc(e), Db = s;
					break;
				case 12:
					s = hi(), jc(t, e), Nc(e), e.stateNode.effectDuration += _i(s);
					break;
				case 31:
					jc(t, e), Nc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ac(e, s)));
					break;
				case 13:
					jc(t, e), Nc(e), e.child.flags & 8192 && e.memoizedState !== null != (o !== null && o.memoizedState !== null) && (gx = Sp()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ac(e, s)));
					break;
				case 22:
					c = e.memoizedState !== null;
					var f = o !== null && o.memoizedState !== null, p = vb, m = yb;
					if (vb = p || c, yb = m || f, jc(t, e), yb = m, vb = p, f && !c && !p && !m && (e.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && tr(e, K, q), Nc(e), s & 8192) a: for (t = e.stateNode, t._visibility = c ? t._visibility & ~kg : t._visibility | kg, !c || o === null || f || vb || yb || (Lc(e), (e.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && er(e, K, q, "Disconnect")), o = null, t = e;;) {
						if (t.tag === 5 || t.tag === 26) {
							if (o === null) {
								f = o = t;
								try {
									l = f.stateNode, c ? E(f, od, l) : E(f, ld, f.stateNode, f.memoizedProps);
								} catch (e) {
									N(f, f.return, e);
								}
							}
						} else if (t.tag === 6) {
							if (o === null) {
								f = t;
								try {
									u = f.stateNode, c ? E(f, sd, u) : E(f, ud, u, f.memoizedProps);
								} catch (e) {
									N(f, f.return, e);
								}
							}
						} else if (t.tag === 18) {
							if (o === null) {
								f = t;
								try {
									d = f.stateNode, c ? E(f, ad, d) : E(f, cd, f.stateNode);
								} catch (e) {
									N(f, f.return, e);
								}
							}
						} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
							t.child.return = t, t = t.child;
							continue;
						}
						if (t === e) break a;
						for (; t.sibling === null;) {
							if (t.return === null || t.return === e) break a;
							o === t && (o = null), t = t.return;
						}
						o === t && (o = null), t.sibling.return = t.return, t = t.sibling;
					}
					s & 4 && (s = e.updateQueue, s !== null && (o = s.retryQueue, o !== null && (s.retryQueue = null, Ac(e, o))));
					break;
				case 19:
					jc(t, e), Nc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ac(e, s)));
					break;
				case 30: break;
				case 21: break;
				default: jc(t, e), Nc(e);
			}
			(e.mode & W) !== U && 0 <= K && 0 <= q && ((O_ || .05 < E_) && ir(e, K, q, E_, D_), e.alternate === null && e.return !== null && e.return.alternate !== null && .05 < q - K && (xc(e.return.alternate, e.return) || er(e, K, q, "Mount"))), bi(n), Si(r), D_ = i, O_ = a;
		}
		function Nc(e) {
			var t = e.flags;
			if (t & 2) {
				try {
					E(e, yc, e);
				} catch (t) {
					N(e, e.return, t);
				}
				e.flags &= -3;
			}
			t & 4096 && (e.flags &= -4097);
		}
		function Pc(e) {
			if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
				var t = e;
				Pc(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
			}
		}
		function Fc(e, t) {
			if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) Cc(e, t.alternate, t), t = t.sibling;
		}
		function Ic(e) {
			var t = yi(), n = xi(), r = Ci(), i = wi();
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					$s(e, e.return, _y), Lc(e);
					break;
				case 1:
					uc(e, e.return);
					var a = e.stateNode;
					typeof a.componentWillUnmount == "function" && sc(e, e.return, a), Lc(e);
					break;
				case 27: E(e, Od, e.stateNode);
				case 26:
				case 5:
					uc(e, e.return), Lc(e);
					break;
				case 22:
					e.memoizedState === null && Lc(e);
					break;
				case 30:
					Lc(e);
					break;
				default: Lc(e);
			}
			(e.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(e, K, q, E_, D_), bi(t), Si(n), D_ = r, O_ = i;
		}
		function Lc(e) {
			for (e = e.child; e !== null;) Ic(e), e = e.sibling;
		}
		function Rc(e, t, n, r) {
			var i = yi(), a = xi(), o = Ci(), s = wi(), c = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					zc(e, n, r), Qs(n, _y);
					break;
				case 1:
					if (zc(e, n, r), t = n.stateNode, typeof t.componentDidMount == "function" && E(n, Tv, n, t), t = n.updateQueue, t !== null) {
						e = n.stateNode;
						try {
							E(n, ua, t, e);
						} catch (e) {
							N(n, n.return, e);
						}
					}
					r && c & 64 && ic(n), lc(n, n.return);
					break;
				case 27: bc(n);
				case 26:
				case 5:
					zc(e, n, r), r && t === null && c & 4 && pc(n), lc(n, n.return);
					break;
				case 12:
					if (r && c & 4) {
						c = hi(), zc(e, n, r), r = n.stateNode, r.effectDuration += _i(c);
						try {
							E(n, dc, n, t, x_, r.effectDuration);
						} catch (e) {
							N(n, n.return, e);
						}
					} else zc(e, n, r);
					break;
				case 31:
					zc(e, n, r), r && c & 4 && Dc(e, n);
					break;
				case 13:
					zc(e, n, r), r && c & 4 && Oc(e, n);
					break;
				case 22:
					n.memoizedState === null && zc(e, n, r), lc(n, n.return);
					break;
				case 30: break;
				default: zc(e, n, r);
			}
			(n.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(n, K, q, E_, D_), bi(i), Si(a), D_ = o, O_ = s;
		}
		function zc(e, t, n) {
			for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) Rc(e, t.alternate, t, n), t = t.sibling;
		}
		function Bc(e, t) {
			var n = null;
			e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && di(e), n != null && fi(n));
		}
		function Vc(e, t) {
			e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (di(t), e != null && fi(e));
		}
		function Hc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (t = t.child; t !== null;) {
				var a = t.sibling;
				Uc(e, t, n, r, a === null ? i : a.actualStartTime), t = a;
			}
		}
		function Uc(e, t, n, r, i) {
			var a = yi(), o = xi(), s = Ci(), c = wi(), l = Cg, u = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(t.mode & W) !== U && 0 < t.actualStartTime && t.flags & 1 && nr(t, t.actualStartTime, i, Ob, n), Hc(e, t, n, r, i), u & 2048 && nc(t, vy | hy);
					break;
				case 1:
					(t.mode & W) !== U && 0 < t.actualStartTime && (t.flags & 128 ? rr(t, t.actualStartTime, i, []) : t.flags & 1 && nr(t, t.actualStartTime, i, Ob, n)), Hc(e, t, n, r, i);
					break;
				case 3:
					var d = hi(), f = Ob;
					Ob = t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) == 0, Hc(e, t, n, r, i), Ob = f, u & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), r = t.memoizedState.cache, r !== n && (di(r), n != null && fi(n))), e.passiveEffectDuration += gi(d);
					break;
				case 12:
					if (u & 2048) {
						u = hi(), Hc(e, t, n, r, i), e = t.stateNode, e.passiveEffectDuration += _i(u);
						try {
							E(t, fc, t, t.alternate, x_, e.passiveEffectDuration);
						} catch (e) {
							N(t, t.return, e);
						}
					} else Hc(e, t, n, r, i);
					break;
				case 31:
					u = Ob, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d !== null && f === null ? (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Ob = !1, d = d.hydrationErrors, d !== null && rr(t, t.actualStartTime, i, d)) : Ob = !0) : Ob = !1, Hc(e, t, n, r, i), Ob = u;
					break;
				case 13:
					u = Ob, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d === null || d.dehydrated === null || f !== null && f.dehydrated !== null ? Ob = !1 : (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Ob = !1, d = d.hydrationErrors, d !== null && rr(t, t.actualStartTime, i, d)) : Ob = !0), Hc(e, t, n, r, i), Ob = u;
					break;
				case 23: break;
				case 22:
					f = t.stateNode, d = t.alternate, t.memoizedState === null ? f._visibility & Ag ? Hc(e, t, n, r, i) : (f._visibility |= Ag, Wc(e, t, n, r, (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), i), (t.mode & W) === U || Ob || (e = t.actualStartTime, 0 <= e && .05 < i - e && tr(t, e, i), 0 <= K && 0 <= q && .05 < q - K && tr(t, K, q))) : f._visibility & Ag ? Hc(e, t, n, r, i) : Kc(e, t, n, r, i), u & 2048 && Bc(d, t);
					break;
				case 24:
					Hc(e, t, n, r, i), u & 2048 && Vc(t.alternate, t);
					break;
				default: Hc(e, t, n, r, i);
			}
			(t.mode & W) !== U && ((e = !Ob && t.alternate === null && t.return !== null && t.return.alternate !== null) && (n = t.actualStartTime, 0 <= n && .05 < i - n && er(t, n, i, "Mount")), 0 <= K && 0 <= q && ((O_ || .05 < E_) && ir(t, K, q, E_, D_), e && .05 < q - K && er(t, K, q, "Mount"))), bi(a), Si(o), D_ = s, O_ = c, Cg = l;
		}
		function Wc(e, t, n, r, i, a) {
			for (i &&= (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), t = t.child; t !== null;) {
				var o = t.sibling;
				Gc(e, t, n, r, i, o === null ? a : o.actualStartTime), t = o;
			}
		}
		function Gc(e, t, n, r, i, a) {
			var o = yi(), s = xi(), c = Ci(), l = wi(), u = Cg;
			i && (t.mode & W) !== U && 0 < t.actualStartTime && t.flags & 1 && nr(t, t.actualStartTime, a, Ob, n);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					Wc(e, t, n, r, i, a), nc(t, vy);
					break;
				case 23: break;
				case 22:
					var f = t.stateNode;
					t.memoizedState === null ? (f._visibility |= Ag, Wc(e, t, n, r, i, a)) : f._visibility & Ag ? Wc(e, t, n, r, i, a) : Kc(e, t, n, r, a), i && d & 2048 && Bc(t.alternate, t);
					break;
				case 24:
					Wc(e, t, n, r, i, a), i && d & 2048 && Vc(t.alternate, t);
					break;
				default: Wc(e, t, n, r, i, a);
			}
			(t.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(t, K, q, E_, D_), bi(o), Si(s), D_ = c, O_ = l, Cg = u;
		}
		function Kc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (var a = t.child; a !== null;) {
				t = a.sibling;
				var o = e, s = n, c = r, l = t === null ? i : t.actualStartTime, u = Cg;
				(a.mode & W) !== U && 0 < a.actualStartTime && a.flags & 1 && nr(a, a.actualStartTime, l, Ob, s);
				var d = a.flags;
				switch (a.tag) {
					case 22:
						Kc(o, a, s, c, l), d & 2048 && Bc(a.alternate, a);
						break;
					case 24:
						Kc(o, a, s, c, l), d & 2048 && Vc(a.alternate, a);
						break;
					default: Kc(o, a, s, c, l);
				}
				Cg = u, a = t;
			}
		}
		function qc(e, t, n) {
			if (e.subtreeFlags & kb) for (e = e.child; e !== null;) Jc(e, t, n), e = e.sibling;
		}
		function Jc(e, t, n) {
			switch (e.tag) {
				case 26:
					qc(e, t, n), e.flags & kb && e.memoizedState !== null && Kd(n, Db, e.memoizedState, e.memoizedProps);
					break;
				case 5:
					qc(e, t, n);
					break;
				case 3:
				case 4:
					var r = Db;
					Db = kd(e.stateNode.containerInfo), qc(e, t, n), Db = r;
					break;
				case 22:
					e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = kb, kb = 16777216, qc(e, t, n), kb = r) : qc(e, t, n));
					break;
				default: qc(e, t, n);
			}
		}
		function Yc(e) {
			var t = e.alternate;
			if (t !== null && (e = t.child, e !== null)) {
				t.child = null;
				do
					t = e.sibling, e.sibling = null, e = t;
				while (e !== null);
			}
		}
		function Xc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = yi();
					Sb = r, el(r, e), (r.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && er(r, K, q, "Unmount"), bi(i);
				}
				Yc(e);
			}
			if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Zc(e), e = e.sibling;
		}
		function Zc(e) {
			var t = yi(), n = xi(), r = Ci(), i = wi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Xc(e), e.flags & 2048 && rc(e, e.return, vy | hy);
					break;
				case 3:
					var a = hi();
					Xc(e), e.stateNode.passiveEffectDuration += gi(a);
					break;
				case 12:
					a = hi(), Xc(e), e.stateNode.passiveEffectDuration += _i(a);
					break;
				case 22:
					a = e.stateNode, e.memoizedState !== null && a._visibility & Ag && (e.return === null || e.return.tag !== 13) ? (a._visibility &= ~Ag, Qc(e), (e.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && er(e, K, q, "Disconnect")) : Xc(e);
					break;
				default: Xc(e);
			}
			(e.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(e, K, q, E_, D_), bi(t), Si(n), O_ = i, D_ = r;
		}
		function Qc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = yi();
					Sb = r, el(r, e), (r.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && er(r, K, q, "Unmount"), bi(i);
				}
				Yc(e);
			}
			for (e = e.child; e !== null;) $c(e), e = e.sibling;
		}
		function $c(e) {
			var t = yi(), n = xi(), r = Ci(), i = wi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					rc(e, e.return, vy), Qc(e);
					break;
				case 22:
					var a = e.stateNode;
					a._visibility & Ag && (a._visibility &= ~Ag, Qc(e));
					break;
				default: Qc(e);
			}
			(e.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(e, K, q, E_, D_), bi(t), Si(n), O_ = i, D_ = r;
		}
		function el(e, t) {
			for (; Sb !== null;) {
				var n = Sb, r = n, i = t, a = yi(), o = xi(), s = Ci(), c = wi();
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						rc(r, i, vy);
						break;
					case 23:
					case 22:
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (i = r.memoizedState.cachePool.pool, i != null && di(i));
						break;
					case 24: fi(r.memoizedState.cache);
				}
				if ((r.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(r, K, q, E_, D_), bi(a), Si(o), O_ = c, D_ = s, r = n.child, r !== null) r.return = n, Sb = r;
				else a: for (n = e; Sb !== null;) {
					if (r = Sb, a = r.sibling, o = r.return, wc(r), r === n) {
						Sb = null;
						break a;
					}
					if (a !== null) {
						a.return = o, Sb = a;
						break a;
					}
					Sb = o;
				}
			}
		}
		function tl() {
			Mb.forEach(function(e) {
				return e();
			});
		}
		function nl() {
			var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
			return e || B.actQueue === null || console.error("The current testing environment is not configured to support act(...)"), e;
		}
		function rl(e) {
			if ((Z & Fb) !== Pb && $ !== 0) return $ & -$;
			var t = B.T;
			return t === null ? Ye() : (t._updatedFibers ||= /* @__PURE__ */ new Set(), t._updatedFibers.add(e), ru());
		}
		function il() {
			if (dx === 0) if (!($ & 536870912) || G) {
				var e = zp;
				zp <<= 1, !(zp & 3932160) && (zp = 262144), dx = e;
			} else dx = 536870912;
			return e = ly.current, e !== null && (e.flags |= 32), dx;
		}
		function al(e, t, n) {
			if ($x && console.error("useInsertionEffect must not schedule updates."), Jx && (Yx = !0), (e === Wb && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) && (pl(e, 0), ll(e, $, dx, !1)), Be(e, n), (Z & Fb) !== Pb && e === Wb) {
				if (gp) switch (t.tag) {
					case 0:
					case 11:
					case 15:
						e = Q && C(Q) || "Unknown", nS.has(e) || (nS.add(e), t = C(t) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", t, e, e));
						break;
					case 1: tS ||= (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), !0);
				}
			} else Pp && Ke(e, t, n), Xl(t), e === Wb && ((Z & Fb) === Pb && (lx |= n), sx === Vb && ll(e, $, dx, !1)), P(e);
		}
		function ol(e, t, n) {
			if ((Z & (Fb | Ib)) !== Pb) throw Error("Should not already be working.");
			if ($ !== 0 && Q !== null) {
				var r = Q, i = Sp();
				switch (ev) {
					case Jb:
					case qb:
						var a = tv;
						xg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Suspended", a, i, Sg, void 0, "primary-light")) : console.timeStamp("Suspended", a, i, Sg, void 0, "primary-light"));
						break;
					case ex:
						a = tv, xg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Action", a, i, Sg, void 0, "primary-light")) : console.timeStamp("Action", a, i, Sg, void 0, "primary-light"));
						break;
					default: xg && (r = i - tv, 3 > r || console.timeStamp("Blocked", tv, i, Sg, void 0, 5 > r ? "primary-light" : 10 > r ? "primary" : 100 > r ? "primary-dark" : "error"));
				}
			}
			a = (n = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Ie(e, t)) ? Sl(e, t) : bl(e, t, !0);
			var o = n;
			do {
				if (a === Lb) {
					ix && !n && ll(e, t, 0, !1), t = tx, tv = g_(), ev = t;
					break;
				} else {
					if (r = Sp(), i = e.current.alternate, o && !cl(i)) {
						$n(t), i = b_, a = r, !xg || a <= i || (Sx ? Sx.run(console.timeStamp.bind(console, "Teared Render", i, a, H, V, "error")) : console.timeStamp("Teared Render", i, a, H, V, "error")), fl(t, r), a = bl(e, t, !1), o = !1;
						continue;
					}
					if (a === zb) {
						if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
						else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
						if (s !== 0) {
							$n(t), lr(b_, r, t, Sx), fl(t, r), t = s;
							a: {
								r = e, a = o, o = px;
								var c = r.current.memoizedState.isDehydrated;
								if (c && (pl(r, s).flags |= 256), s = bl(r, s, !1), s !== zb) {
									if (ax && !c) {
										r.errorRecoveryDisabledLanes |= a, lx |= a, a = Vb;
										break a;
									}
									r = mx, mx = o, r !== null && (mx === null ? mx = r : mx.push.apply(mx, r));
								}
								a = s;
							}
							if (o = !1, a !== zb) continue;
							r = Sp();
						}
					}
					if (a === Rb) {
						$n(t), lr(b_, r, t, Sx), fl(t, r), pl(e, 0), ll(e, t, 0, !0);
						break;
					}
					a: {
						switch (n = e, a) {
							case Lb:
							case Rb: throw Error("Root did not complete. This is a bug in React.");
							case Vb: if ((t & 4194048) !== t) break;
							case Hb:
								$n(t), or(b_, r, t, Sx), fl(t, r), i = t, i & 127 ? R_ = r : i & 4194048 && (Y_ = r), ll(n, t, dx, !rx);
								break a;
							case zb:
								mx = null;
								break;
							case Bb:
							case Ub: break;
							default: throw Error("Unknown root exit status.");
						}
						if (B.actQueue !== null) Al(n, i, t, mx, xx, hx, dx, lx, fx, a, null, null, b_, r);
						else {
							if ((t & 62914560) === t && (o = gx + vx - Sp(), 10 < o)) {
								if (ll(n, t, dx, !rx), Fe(n, 0, !0) !== 0) break a;
								Lx = t, n.timeoutHandle = ZS(sl.bind(null, n, i, mx, xx, hx, t, dx, lx, fx, rx, a, "Throttled", b_, r), o);
								break a;
							}
							sl(n, i, mx, xx, hx, t, dx, lx, fx, rx, a, null, b_, r);
						}
					}
				}
				break;
			} while (1);
			P(e);
		}
		function sl(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.timeoutHandle = $S;
			var m = t.subtreeFlags, h = null;
			if ((m & 8192 || (m & 16785408) == 16785408) && (h = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: un
			}, Jc(t, a, h), m = (a & 62914560) === a ? gx - Sp() : (a & 4194048) === a ? _x - Sp() : 0, m = qd(h, m), m !== null)) {
				Lx = a, e.cancelPendingCommit = m(Al.bind(null, e, t, a, n, r, i, o, s, c, u, h, h.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < h.count ? 0 < h.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : h.imgCount === 1 ? "Suspended on an Image" : 0 < h.imgCount ? "Suspended on Images" : null, f, p)), ll(e, a, o, !l);
				return;
			}
			Al(e, t, a, n, r, i, o, s, c, u, h, d, f, p);
		}
		function cl(e) {
			for (var t = e;;) {
				var n = t.tag;
				if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!Wh(a(), i)) return !1;
					} catch {
						return !1;
					}
				}
				if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
				else {
					if (t === e) break;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) return !0;
						t = t.return;
					}
					t.sibling.return = t.return, t = t.sibling;
				}
			}
			return !0;
		}
		function ll(e, t, n, r) {
			t &= ~ux, t &= ~lx, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
			for (var i = t; 0 < i;) {
				var a = 31 - Fp(i), o = 1 << a;
				r[a] = -1, i &= ~o;
			}
			n !== 0 && He(e, n, t);
		}
		function ul() {
			return (Z & (Fb | Ib)) === Pb ? (F(0, !1), !1) : !0;
		}
		function dl() {
			if (Q !== null) {
				if (tx === Gb) var e = Q.return;
				else e = Q, $r(), ja(e), Wv = null, Gv = 0, e = Q;
				for (; e !== null;) Xs(e.alternate, e), e = e.return;
				Q = null;
			}
		}
		function fl(e, t) {
			e & 127 && (k_ = t), e & 4194048 && (z_ = t), e & 62914560 && (X_ = t), e & 2080374784 && (Z_ = t);
		}
		function pl(e, t) {
			xg && (console.timeStamp("Blocking Track", .003, .003, "Blocking", V, "primary-light"), console.timeStamp("Transition Track", .003, .003, "Transition", V, "primary-light"), console.timeStamp("Suspense Track", .003, .003, "Suspense", V, "primary-light"), console.timeStamp("Idle Track", .003, .003, "Idle", V, "primary-light"));
			var n = b_;
			if (b_ = g_(), $ !== 0 && 0 < n) {
				if ($n($), sx === Bb || sx === Vb) or(n, b_, t, Sx);
				else {
					var r = b_, i = Sx;
					if (xg && !(r <= n)) {
						var a = (t & 738197653) === t ? "tertiary-dark" : "primary-dark", o = (t & 536870912) === t ? "Prewarm" : (t & 201326741) === t ? "Interrupted Hydration" : "Interrupted Render";
						i ? i.run(console.timeStamp.bind(console, o, n, r, H, V, a)) : console.timeStamp(o, n, r, H, V, a);
					}
				}
				fl($, b_);
			}
			if (n = Sx, Sx = null, t & 127) {
				Sx = j_, i = 0 <= A_ && A_ < k_ ? k_ : A_, r = 0 <= F_ && F_ < k_ ? k_ : F_, a = 0 <= r ? r : 0 <= i ? i : b_, 0 <= R_ ? ($n(2), sr(R_, a, t, n)) : Q_ & 127 && ($n(2), fr(k_, a, $_)), n = i;
				var s = r, c = I_, l = 0 < L_, u = M_ === v_, d = M_ === y_;
				if (i = b_, r = j_, a = N_, o = P_, xg) {
					if (H = "Blocking", 0 < n ? n > i && (n = i) : n = i, 0 < s ? s > n && (s = n) : s = n, c !== null && n > s) {
						var f = l ? "secondary-light" : "warning";
						r ? r.run(console.timeStamp.bind(console, l ? "Consecutive" : "Event: " + c, s, n, H, V, f)) : console.timeStamp(l ? "Consecutive" : "Event: " + c, s, n, H, V, f);
					}
					i > n && (s = u ? "error" : (t & 738197653) === t ? "tertiary-light" : "primary-light", u = d ? "Promise Resolved" : u ? "Cascading Update" : 5 < i - n ? "Update Blocked" : "Update", d = [], o != null && d.push(["Component name", o]), a != null && d.push(["Method name", a]), n = {
						start: n,
						end: i,
						detail: { devtools: {
							properties: d,
							track: H,
							trackGroup: V,
							color: s
						} }
					}, r ? r.run(performance.measure.bind(performance, u, n)) : performance.measure(u, n));
				}
				A_ = -1.1, M_ = 0, P_ = N_ = null, R_ = -1.1, L_ = F_, F_ = -1.1, k_ = g_();
			}
			if (t & 4194048 && (Sx = U_, i = 0 <= B_ && B_ < z_ ? z_ : B_, n = 0 <= V_ && V_ < z_ ? z_ : V_, r = 0 <= K_ && K_ < z_ ? z_ : K_, a = 0 <= r ? r : 0 <= n ? n : b_, 0 <= Y_ ? ($n(256), sr(Y_, a, t, Sx)) : Q_ & 4194048 && ($n(256), fr(z_, a, $_)), d = r, s = q_, c = 0 < J_, l = H_ === y_, a = b_, r = U_, o = W_, u = G_, xg && (H = "Transition", 0 < n ? n > a && (n = a) : n = a, 0 < i ? i > n && (i = n) : i = n, 0 < d ? d > i && (d = i) : d = i, i > d && s !== null && (f = c ? "secondary-light" : "warning", r ? r.run(console.timeStamp.bind(console, c ? "Consecutive" : "Event: " + s, d, i, H, V, f)) : console.timeStamp(c ? "Consecutive" : "Event: " + s, d, i, H, V, f)), n > i && (r ? r.run(console.timeStamp.bind(console, "Action", i, n, H, V, "primary-dark")) : console.timeStamp("Action", i, n, H, V, "primary-dark")), a > n && (i = l ? "Promise Resolved" : 5 < a - n ? "Update Blocked" : "Update", d = [], u != null && d.push(["Component name", u]), o != null && d.push(["Method name", o]), n = {
				start: n,
				end: a,
				detail: { devtools: {
					properties: d,
					track: H,
					trackGroup: V,
					color: "primary-light"
				} }
			}, r ? r.run(performance.measure.bind(performance, i, n)) : performance.measure(i, n))), V_ = B_ = -1.1, H_ = 0, Y_ = -1.1, J_ = K_, K_ = -1.1, z_ = g_()), t & 62914560 && Q_ & 62914560 && ($n(4194304), fr(X_, b_, $_)), t & 2080374784 && Q_ & 2080374784 && ($n(268435456), fr(Z_, b_, $_)), n = e.timeoutHandle, n !== $S && (e.timeoutHandle = $S, QS(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Lx = 0, dl(), Wb = e, Q = n = Er(e.current, null), $ = t, tx = Gb, nx = null, rx = !1, ix = Ie(e, t), ax = !1, sx = Lb, fx = dx = ux = lx = cx = 0, mx = px = null, hx = !1, t & 8 && (t |= t & 32), r = e.entangledLanes, r !== 0) for (e = e.entanglements, r &= t; 0 < r;) i = 31 - Fp(r), a = 1 << i, t |= e[i], r &= ~a;
			return ox = t, pr(), e = ug(), 1e3 < e - cg && (B.recentlyCreatedOwnerStacks = 0, cg = e), uv.discardPendingWarnings(), n;
		}
		function ml(e, t) {
			Y = null, B.H = Ry, B.getCurrentStack = null, gp = !1, hp = null, t === Rv || t === Bv ? (t = Hi(), tx = Jb) : t === zv ? (t = Hi(), tx = Yb) : tx = t === ob ? $b : typeof t == "object" && t && typeof t.then == "function" ? Zb : Kb, nx = t;
			var n = Q;
			n === null ? (sx = Rb, ss(e, Pr(t, e.current))) : n.mode & W && Ei(n);
		}
		function hl() {
			var e = ly.current;
			return e === null ? !0 : ($ & 4194048) === $ ? uy === null : ($ & 62914560) === $ || $ & 536870912 ? e === uy : !1;
		}
		function gl() {
			var e = B.H;
			return B.H = Ry, e === null ? Ry : e;
		}
		function _l() {
			var e = B.A;
			return B.A = Ab, e;
		}
		function vl(e) {
			Sx === null && (Sx = e._debugTask == null ? null : e._debugTask);
		}
		function yl() {
			sx = Vb, rx || ($ & 4194048) !== $ && ly.current !== null || (ix = !0), !(cx & 134217727) && !(lx & 134217727) || Wb === null || ll(Wb, $, dx, !1);
		}
		function bl(e, t, n) {
			var r = Z;
			Z |= Fb;
			var i = gl(), a = _l();
			if (Wb !== e || $ !== t) {
				if (Pp) {
					var o = e.memoizedUpdaters;
					0 < o.size && (Jl(e, $), o.clear()), qe(e, t);
				}
				xx = null, pl(e, t);
			}
			t = !1, o = sx;
			a: do
				try {
					if (tx !== Gb && Q !== null) {
						var s = Q, c = nx;
						switch (tx) {
							case $b:
								dl(), o = Hb;
								break a;
							case Jb:
							case qb:
							case ex:
							case Zb:
								ly.current === null && (t = !0);
								var l = tx;
								if (tx = Gb, nx = null, Dl(e, s, c, l), n && ix) {
									o = Lb;
									break a;
								}
								break;
							default: l = tx, tx = Gb, nx = null, Dl(e, s, c, l);
						}
					}
					xl(), o = sx;
					break;
				} catch (t) {
					ml(e, t);
				}
			while (1);
			return t && e.shellSuspendCounter++, $r(), Z = r, B.H = i, B.A = a, Q === null && (Wb = null, $ = 0, pr()), o;
		}
		function xl() {
			for (; Q !== null;) wl(Q);
		}
		function Sl(e, t) {
			var n = Z;
			Z |= Fb;
			var r = gl(), i = _l();
			if (Wb !== e || $ !== t) {
				if (Pp) {
					var a = e.memoizedUpdaters;
					0 < a.size && (Jl(e, $), a.clear()), qe(e, t);
				}
				xx = null, yx = Sp() + bx, pl(e, t);
			} else ix = Ie(e, t);
			a: do
				try {
					if (tx !== Gb && Q !== null) b: switch (t = Q, a = nx, tx) {
						case Kb:
							tx = Gb, nx = null, Dl(e, t, a, Kb);
							break;
						case qb:
						case ex:
							if (zi(a)) {
								tx = Gb, nx = null, Tl(t);
								break;
							}
							t = function() {
								tx !== qb && tx !== ex || Wb !== e || (tx = Qb), P(e);
							}, a.then(t, t);
							break a;
						case Jb:
							tx = Qb;
							break a;
						case Yb:
							tx = Xb;
							break a;
						case Qb:
							zi(a) ? (tx = Gb, nx = null, Tl(t)) : (tx = Gb, nx = null, Dl(e, t, a, Qb));
							break;
						case Xb:
							var o = null;
							switch (Q.tag) {
								case 26: o = Q.memoizedState;
								case 5:
								case 27:
									var s = Q;
									if (o ? Gd(o) : s.stateNode.complete) {
										tx = Gb, nx = null;
										var c = s.sibling;
										if (c !== null) Q = c;
										else {
											var l = s.return;
											l === null ? Q = null : (Q = l, Ol(l));
										}
										break b;
									}
									break;
								default: console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.");
							}
							tx = Gb, nx = null, Dl(e, t, a, Xb);
							break;
						case Zb:
							tx = Gb, nx = null, Dl(e, t, a, Zb);
							break;
						case $b:
							dl(), sx = Hb;
							break a;
						default: throw Error("Unexpected SuspendedReason. This is a bug in React.");
					}
					B.actQueue === null ? Cl() : xl();
					break;
				} catch (t) {
					ml(e, t);
				}
			while (1);
			return $r(), B.H = r, B.A = i, Z = n, Q === null ? (Wb = null, $ = 0, pr(), sx) : Lb;
		}
		function Cl() {
			for (; Q !== null && !bp();) wl(Q);
		}
		function wl(e) {
			var t = e.alternate;
			(e.mode & W) === U ? t = E(e, Vs, t, e, ox) : (Ti(e), t = E(e, Vs, t, e, ox), Ei(e)), e.memoizedProps = e.pendingProps, t === null ? Ol(e) : Q = t;
		}
		function Tl(e) {
			var t = E(e, El, e);
			e.memoizedProps = e.pendingProps, t === null ? Ol(e) : Q = t;
		}
		function El(e) {
			var t = e.alternate, n = (e.mode & W) !== U;
			switch (n && Ti(e), e.tag) {
				case 15:
				case 0:
					t = Ts(t, e, e.pendingProps, e.type, void 0, $);
					break;
				case 11:
					t = Ts(t, e, e.pendingProps, e.type.render, e.ref, $);
					break;
				case 5: ja(e);
				default: Xs(t, e), e = Q = Dr(e, ox), t = Vs(t, e, ox);
			}
			return n && Ei(e), t;
		}
		function Dl(e, t, n, r) {
			$r(), ja(t), Wv = null, Gv = 0;
			var i = t.return;
			try {
				if (fs(e, i, t, n, $)) {
					sx = Rb, ss(e, Pr(n, e.current)), Q = null;
					return;
				}
			} catch (t) {
				if (i !== null) throw Q = i, t;
				sx = Rb, ss(e, Pr(n, e.current)), Q = null;
				return;
			}
			t.flags & 32768 ? (G || r === Kb ? e = !0 : ix || $ & 536870912 ? e = !1 : (rx = e = !0, (r === qb || r === ex || r === Jb || r === Zb) && (r = ly.current, r !== null && r.tag === 13 && (r.flags |= 16384))), kl(t, e)) : Ol(t);
		}
		function Ol(e) {
			var t = e;
			do {
				if (t.flags & 32768) {
					kl(t, rx);
					return;
				}
				var n = t.alternate;
				if (e = t.return, Ti(t), n = E(t, Js, n, t, ox), (t.mode & W) !== U && Di(t), n !== null) {
					Q = n;
					return;
				}
				if (t = t.sibling, t !== null) {
					Q = t;
					return;
				}
				Q = t = e;
			} while (t !== null);
			sx === Lb && (sx = Ub);
		}
		function kl(e, t) {
			do {
				var n = Ys(e.alternate, e);
				if (n !== null) {
					n.flags &= 32767, Q = n;
					return;
				}
				if ((e.mode & W) !== U) {
					Di(e), n = e.actualDuration;
					for (var r = e.child; r !== null;) n += r.actualDuration, r = r.sibling;
					e.actualDuration = n;
				}
				if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
					Q = e;
					return;
				}
				Q = e = n;
			} while (e !== null);
			sx = Hb, Q = null;
		}
		function Al(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.cancelPendingCommit = null;
			do
				Il();
			while (Px !== Ox);
			if (uv.flushLegacyContextWarning(), uv.flushPendingUnsafeLifecycleWarnings(), (Z & (Fb | Ib)) !== Pb) throw Error("Should not already be working.");
			if ($n(n), l === zb ? lr(f, p, n, Sx) : r === null ? ar(f, p, n, Sx) : cr(f, p, n, r, t !== null && t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) != 0, Sx), t !== null) {
				if (n === 0 && console.error("finishedLanes should not be empty during a commit. This is a bug in React."), t === e.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
				if (a = t.lanes | t.childLanes, a |= Ng, Ve(e, n, a, o, s, c), e === Wb && (Q = Wb = null, $ = 0), Ix = t, Fx = e, Lx = n, Rx = a, Bx = i, Vx = r, zx = p, Hx = d, Ux = wx, Wx = null, t.actualDuration !== 0 || t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Yl(Ep, function() {
					return XS = window.event, Ux === wx && (Ux = Ex), Ll(), null;
				})) : (e.callbackNode = null, e.callbackPriority = 0), C_ = null, x_ = g_(), d !== null && ur(p, x_, d, Sx), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
					r = B.T, B.T = null, i = Jf.p, Jf.p = Vp, o = Z, Z |= Ib;
					try {
						Sc(e, t, n);
					} finally {
						Z = o, Jf.p = i, B.T = r;
					}
				}
				Px = kx, jl(), Ml(), Nl();
			}
		}
		function jl() {
			if (Px === kx) {
				Px = Ox;
				var e = Fx, t = Ix, n = Lx, r = (t.flags & 13878) != 0;
				if (t.subtreeFlags & 13878 || r) {
					r = B.T, B.T = null;
					var i = Jf.p;
					Jf.p = Vp;
					var a = Z;
					Z |= Ib;
					try {
						Cb = n, wb = e, vi(), Mc(t, e), wb = Cb = null, n = qS;
						var o = Un(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
						if (o !== s && s && s.ownerDocument && Hn(s.ownerDocument.documentElement, s)) {
							if (c !== null && Wn(s)) {
								var l = c.start, u = c.end;
								if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
								else {
									var d = s.ownerDocument || document, f = d && d.defaultView || window;
									if (f.getSelection) {
										var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
										!p.extend && h > g && (o = g, g = h, h = o);
										var _ = Vn(s, h), v = Vn(s, g);
										if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
											var y = d.createRange();
											y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
										}
									}
								}
							}
							for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
								element: p,
								left: p.scrollLeft,
								top: p.scrollTop
							});
							for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
								var b = d[s];
								b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
							}
						}
						LC = !!KS, qS = KS = null;
					} finally {
						Z = a, Jf.p = i, B.T = r;
					}
				}
				e.current = t, Px = Ax;
			}
		}
		function Ml() {
			if (Px === Ax) {
				Px = Ox;
				var e = Wx;
				if (e !== null) {
					x_ = g_();
					var t = S_, n = x_;
					!xg || n <= t || ($_ ? $_.run(console.timeStamp.bind(console, e, t, n, H, V, "secondary-light")) : console.timeStamp(e, t, n, H, V, "secondary-light"));
				}
				e = Fx, t = Ix, n = Lx;
				var r = (t.flags & 8772) != 0;
				if (t.subtreeFlags & 8772 || r) {
					r = B.T, B.T = null;
					var i = Jf.p;
					Jf.p = Vp;
					var a = Z;
					Z |= Ib;
					try {
						Cb = n, wb = e, vi(), Cc(e, t.alternate, t), wb = Cb = null;
					} finally {
						Z = a, Jf.p = i, B.T = r;
					}
				}
				e = zx, t = Hx, S_ = g_(), e = t === null ? e : x_, t = S_, n = Ux === Tx, r = Sx, C_ === null ? !xg || t <= e || (r ? r.run(console.timeStamp.bind(console, n ? "Commit Interrupted View Transition" : "Commit", e, t, H, V, n ? "error" : "secondary-dark")) : console.timeStamp(n ? "Commit Interrupted View Transition" : "Commit", e, t, H, V, n ? "error" : "secondary-dark")) : dr(e, t, C_, !1, r), Px = jx;
			}
		}
		function Nl() {
			if (Px === Mx || Px === jx) {
				if (Px === Mx) {
					var e = S_;
					S_ = g_();
					var t = S_, n = Ux === Tx;
					!xg || t <= e || ($_ ? $_.run(console.timeStamp.bind(console, n ? "Interrupted View Transition" : "Starting Animation", e, t, H, V, n ? "error" : "secondary-light")) : console.timeStamp(n ? "Interrupted View Transition" : "Starting Animation", e, t, H, V, n ? " error" : "secondary-light")), Ux !== Tx && (Ux = Dx);
				}
				Px = Ox, xp(), e = Fx;
				var r = Ix;
				t = Lx, n = Vx;
				var i = r.actualDuration !== 0 || (r.subtreeFlags & 10256) != 0 || (r.flags & 10256) != 0;
				i ? Px = Nx : (Px = Ox, Ix = Fx = null, Fl(e, e.pendingLanes), Zx = 0, Qx = null);
				var a = e.pendingLanes;
				if (a === 0 && (Cx = null), i || Kl(e), a = Je(t), r = r.stateNode, Mp && typeof Mp.onCommitFiberRoot == "function") try {
					var o = (r.current.flags & 128) == 128;
					switch (a) {
						case Vp:
							var s = wp;
							break;
						case Hp:
							s = Tp;
							break;
						case Up:
							s = Ep;
							break;
						case Wp:
							s = Op;
							break;
						default: s = Ep;
					}
					Mp.onCommitFiberRoot(jp, r, s, o);
				} catch (e) {
					Np || (Np = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				if (Pp && e.memoizedUpdaters.clear(), tl(), n !== null) {
					o = B.T, s = Jf.p, Jf.p = Vp, B.T = null;
					try {
						var c = e.onRecoverableError;
						for (r = 0; r < n.length; r++) {
							var l = n[r], u = Pl(l.stack);
							E(l.source, c, l.value, u);
						}
					} finally {
						B.T = o, Jf.p = s;
					}
				}
				Lx & 3 && Il(), P(e), a = e.pendingLanes, t & 261930 && a & 42 ? (rv = !0, e === qx ? Kx++ : (Kx = 0, qx = e)) : Kx = 0, i || fl(t, S_), F(0, !1);
			}
		}
		function Pl(e) {
			return e = { componentStack: e }, Object.defineProperty(e, "digest", { get: function() {
				console.error("You are accessing \"digest\" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.");
			} }), e;
		}
		function Fl(e, t) {
			(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, fi(t)));
		}
		function Il() {
			return jl(), Ml(), Nl(), Ll();
		}
		function Ll() {
			if (Px !== Nx) return !1;
			var e = Fx, t = Rx;
			Rx = 0;
			var n = Je(Lx), r = Up === 0 || Up > n ? Up : n;
			n = B.T;
			var i = Jf.p;
			try {
				Jf.p = r, B.T = null;
				var a = Bx;
				Bx = null, r = Fx;
				var o = Lx;
				if (Px = Ox, Ix = Fx = null, Lx = 0, (Z & (Fb | Ib)) !== Pb) throw Error("Cannot flush passive effects while already rendering.");
				$n(o), Jx = !0, Yx = !1;
				var s = 0;
				if (C_ = null, s = Sp(), Ux === Dx) fr(S_, s, $_);
				else {
					var c = S_, l = s, u = Ux === Ex;
					!xg || l <= c || (Sx ? Sx.run(console.timeStamp.bind(console, u ? "Waiting for Paint" : "Waiting", c, l, H, V, "secondary-light")) : console.timeStamp(u ? "Waiting for Paint" : "Waiting", c, l, H, V, "secondary-light"));
				}
				c = Z, Z |= Ib;
				var d = r.current;
				vi(), Zc(d);
				var f = r.current;
				d = zx, vi(), Uc(r, f, o, a, d), Kl(r), Z = c;
				var p = Sp();
				if (f = s, d = Sx, C_ === null ? !xg || p <= f || (d ? d.run(console.timeStamp.bind(console, "Remaining Effects", f, p, H, V, "secondary-dark")) : console.timeStamp("Remaining Effects", f, p, H, V, "secondary-dark")) : dr(f, p, C_, !0, d), fl(o, p), F(0, !1), Yx ? r === Qx ? Zx++ : (Zx = 0, Qx = r) : Zx = 0, Yx = Jx = !1, Mp && typeof Mp.onPostCommitFiberRoot == "function") try {
					Mp.onPostCommitFiberRoot(jp, r);
				} catch (e) {
					Np || (Np = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				var m = r.current.stateNode;
				return m.effectDuration = 0, m.passiveEffectDuration = 0, !0;
			} finally {
				Jf.p = i, B.T = n, Fl(e, t);
			}
		}
		function Rl(e, t, n) {
			t = Pr(n, t), ki(t), t = ls(e.stateNode, t, 2), e = ia(e, t, 2), e !== null && (Be(e, 2), P(e));
		}
		function N(e, t, n) {
			if ($x = !1, e.tag === 3) Rl(e, e, n);
			else {
				for (; t !== null;) {
					if (t.tag === 3) {
						Rl(t, e, n);
						return;
					}
					if (t.tag === 1) {
						var r = t.stateNode;
						if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Cx === null || !Cx.has(r))) {
							e = Pr(n, e), ki(e), n = us(2), r = ia(t, n, 2), r !== null && (ds(n, r, t, e), Be(r, 2), P(r));
							return;
						}
					}
					t = t.return;
				}
				console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", n);
			}
		}
		function zl(e, t, n) {
			var r = e.pingCache;
			if (r === null) {
				r = e.pingCache = new Nb();
				var i = /* @__PURE__ */ new Set();
				r.set(t, i);
			} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
			i.has(n) || (ax = !0, i.add(n), r = Bl.bind(null, e, t, n), Pp && Jl(e, n), t.then(r, r));
		}
		function Bl(e, t, n) {
			var r = e.pingCache;
			r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, n & 127 ? 0 > A_ && (k_ = A_ = g_(), j_ = __("Promise Resolved"), M_ = y_) : n & 4194048 && 0 > V_ && (z_ = V_ = g_(), U_ = __("Promise Resolved"), H_ = y_), nl() && B.actQueue === null && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"), Wb === e && ($ & n) === n && (sx === Vb || sx === Bb && ($ & 62914560) === $ && Sp() - gx < vx ? (Z & Fb) === Pb && pl(e, 0) : ux |= n, fx === $ && (fx = 0)), P(e);
		}
		function Vl(e, t) {
			t === 0 && (t = Re()), e = gr(e, t), e !== null && (Be(e, t), P(e));
		}
		function Hl(e) {
			var t = e.memoizedState, n = 0;
			t !== null && (n = t.retryLane), Vl(e, n);
		}
		function Ul(e, t) {
			var n = 0;
			switch (e.tag) {
				case 31:
				case 13:
					var r = e.stateNode, i = e.memoizedState;
					i !== null && (n = i.retryLane);
					break;
				case 19:
					r = e.stateNode;
					break;
				case 22:
					r = e.stateNode._retryCache;
					break;
				default: throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
			}
			r !== null && r.delete(t), Vl(e, n);
		}
		function Wl(e, t, n) {
			if (t.subtreeFlags & 67117056) for (t = t.child; t !== null;) {
				var r = e, i = t, a = i.type === Pf;
				a = n || a, i.tag === 22 ? i.memoizedState === null && (a && i.flags & 8192 ? E(i, Gl, r, i) : i.subtreeFlags & 67108864 && E(i, Wl, r, i, a)) : i.flags & 67108864 ? a && E(i, Gl, r, i) : Wl(r, i, a), t = t.sibling;
			}
		}
		function Gl(e, t) {
			Me(!0);
			try {
				Ic(t), $c(t), Rc(e, t.alternate, t, !1), Gc(e, t, 0, null, !1, 0);
			} finally {
				Me(!1);
			}
		}
		function Kl(e) {
			var t = !0;
			e.current.mode & (Rg | zg) || (t = !1), Wl(e, e.current, t);
		}
		function ql(e) {
			if ((Z & Fb) === Pb) {
				var t = e.tag;
				if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
					if (t = C(e) || "ReactComponent", eS !== null) {
						if (eS.has(t)) return;
						eS.add(t);
					} else eS = new Set([t]);
					E(e, function() {
						console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
					});
				}
			}
		}
		function Jl(e, t) {
			Pp && e.memoizedUpdaters.forEach(function(n) {
				Ke(e, n, t);
			});
		}
		function Yl(e, t) {
			var n = B.actQueue;
			return n === null ? vp(e, t) : (n.push(t), rS);
		}
		function Xl(e) {
			nl() && B.actQueue === null && E(e, function() {
				console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", C(e));
			});
		}
		function P(e) {
			e !== aS && e.next === null && (aS === null ? iS = aS = e : aS = aS.next = e), cS = !0, B.actQueue === null ? oS || (oS = !0, nu()) : sS || (sS = !0, nu());
		}
		function F(e, t) {
			if (!lS && cS) {
				lS = !0;
				do
					for (var n = !1, r = iS; r !== null;) {
						if (!t) if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - Fp(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, eu(r, a));
						} else a = $, a = Fe(r, r === Wb ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== $S), !(a & 3) || Ie(r, a) || (n = !0, eu(r, a));
						r = r.next;
					}
				while (n);
				lS = !1;
			}
		}
		function I() {
			XS = window.event, Zl();
		}
		function Zl() {
			cS = sS = oS = !1;
			var e = 0;
			uS !== 0 && Wu() && (e = uS);
			for (var t = Sp(), n = null, r = iS; r !== null;) {
				var i = r.next, a = Ql(r, t);
				a === 0 ? (r.next = null, n === null ? iS = i : n.next = i, i === null && (aS = n)) : (n = r, (e !== 0 || a & 3) && (cS = !0)), r = i;
			}
			Px !== Ox && Px !== Nx || F(e, !1), uS !== 0 && (uS = 0);
		}
		function Ql(e, t) {
			for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
				var o = 31 - Fp(a), s = 1 << o, c = i[o];
				c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Le(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
			}
			if (t = Wb, n = $, n = Fe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r = e.callbackNode, n === 0 || e === t && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) return r !== null && tu(r), e.callbackNode = null, e.callbackPriority = 0;
			if (!(n & 3) || Ie(e, n)) {
				if (t = n & -n, t !== e.callbackPriority || B.actQueue !== null && r !== dS) tu(r);
				else return t;
				switch (Je(n)) {
					case Vp:
					case Hp:
						n = Tp;
						break;
					case Up:
						n = Ep;
						break;
					case Wp:
						n = Op;
						break;
					default: n = Ep;
				}
				return r = $l.bind(null, e), B.actQueue === null ? n = vp(n, r) : (B.actQueue.push(r), n = dS), e.callbackPriority = t, e.callbackNode = n, t;
			}
			return r !== null && tu(r), e.callbackPriority = 2, e.callbackNode = null, 2;
		}
		function $l(e, t) {
			if (rv = nv = !1, XS = window.event, Px !== Ox && Px !== Nx) return e.callbackNode = null, e.callbackPriority = 0, null;
			var n = e.callbackNode;
			if (Ux === wx && (Ux = Ex), Il() && e.callbackNode !== n) return null;
			var r = $;
			return r = Fe(e, e === Wb ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r === 0 ? null : (ol(e, r, t), Ql(e, Sp()), e.callbackNode != null && e.callbackNode === n ? $l.bind(null, e) : null);
		}
		function eu(e, t) {
			if (Il()) return null;
			nv = rv, rv = !1, ol(e, t, !0);
		}
		function tu(e) {
			e !== dS && e !== null && yp(e);
		}
		function nu() {
			B.actQueue !== null && B.actQueue.push(function() {
				return Zl(), null;
			}), tC(function() {
				(Z & (Fb | Ib)) === Pb ? Zl() : vp(wp, I);
			});
		}
		function ru() {
			if (uS === 0) {
				var e = ov;
				e === 0 && (e = Rp, Rp <<= 1, !(Rp & 261888) && (Rp = 256)), uS = e;
			}
			return uS;
		}
		function iu(e) {
			return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (Oe(e, "action"), ln("" + e));
		}
		function au(e, t) {
			var n = t.ownerDocument.createElement("input");
			return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
		}
		function ou(e, t, n, r, i) {
			if (t === "submit" && n && n.stateNode === i) {
				var a = iu((i[qp] || null).action), o = r.submitter;
				o && (t = (t = o[qp] || null) ? iu(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
				var s = new sh("action", "action", null, r, i);
				e.push({
					event: s,
					listeners: [{
						instance: null,
						listener: function() {
							if (r.defaultPrevented) {
								if (uS !== 0) {
									var e = o ? au(i, o) : new FormData(i), t = {
										pending: !0,
										data: e,
										method: i.method,
										action: a
									};
									Object.freeze(t), Io(n, t, null, e);
								}
							} else typeof a == "function" && (s.preventDefault(), e = o ? au(i, o) : new FormData(i), t = {
								pending: !0,
								data: e,
								method: i.method,
								action: a
							}, Object.freeze(t), Io(n, t, a, e));
						},
						currentTarget: i
					}]
				});
			}
		}
		function su(e, t, n) {
			e.currentTarget = n;
			try {
				t(e);
			} catch (e) {
				fg(e);
			}
			e.currentTarget = null;
		}
		function cu(e, t) {
			t = (t & 4) != 0;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				a: {
					var i = void 0, a = r.event;
					if (r = r.listeners, t) for (var o = r.length - 1; 0 <= o; o--) {
						var s = r[o], c = s.instance, l = s.currentTarget;
						if (s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? su(a, s, l) : E(c, su, a, s, l), i = c;
					}
					else for (o = 0; o < r.length; o++) {
						if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? su(a, s, l) : E(c, su, a, s, l), i = c;
					}
				}
			}
		}
		function L(e, t) {
			pS.has(e) || console.error("Did not expect a listenToNonDelegatedEvent() call for \"%s\". This is a bug in React. Please file an issue.", e);
			var n = t[Yp];
			n === void 0 && (n = t[Yp] = /* @__PURE__ */ new Set());
			var r = e + "__bubble";
			n.has(r) || (du(t, e, 2, !1), n.add(r));
		}
		function lu(e, t, n) {
			pS.has(e) && !t && console.error("Did not expect a listenToNativeEvent() call for \"%s\" in the bubble phase. This is a bug in React. Please file an issue.", e);
			var r = 0;
			t && (r |= 4), du(n, e, r, t);
		}
		function uu(e) {
			if (!e[mS]) {
				e[mS] = !0, em.forEach(function(t) {
					t !== "selectionchange" && (pS.has(t) || lu(t, !1, e), lu(t, !0, e));
				});
				var t = e.nodeType === 9 ? e : e.ownerDocument;
				t === null || t[mS] || (t[mS] = !0, lu("selectionchange", !1, t));
			}
		}
		function du(e, t, n, r) {
			switch (ff(t)) {
				case Vp:
					var i = sf;
					break;
				case Hp:
					i = cf;
					break;
				default: i = lf;
			}
			n = i.bind(null, t, n, e), i = void 0, !th || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
				capture: !0,
				passive: i
			}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
		}
		function fu(e, t, n, r, i) {
			var a = r;
			if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
				if (r === null) return;
				var o = r.tag;
				if (o === 3 || o === 4) {
					var s = r.stateNode.containerInfo;
					if (s === i) break;
					if (o === 4) for (o = r.return; o !== null;) {
						var c = o.tag;
						if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
						o = o.return;
					}
					for (; s !== null;) {
						if (o = Qe(s), o === null) return;
						if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
							r = a = o;
							continue a;
						}
						s = s.parentNode;
					}
				}
				r = r.return;
			}
			pn(function() {
				var r = a, i = dn(n), o = [];
				a: {
					var s = og.get(e);
					if (s !== void 0) {
						var c = sh, l = e;
						switch (e) {
							case "keypress": if (gn(n) === 0) break a;
							case "keydown":
							case "keyup":
								c = wh;
								break;
							case "focusin":
								l = "focus", c = gh;
								break;
							case "focusout":
								l = "blur", c = gh;
								break;
							case "beforeblur":
							case "afterblur":
								c = gh;
								break;
							case "click": if (n.button === 2) break a;
							case "auxclick":
							case "dblclick":
							case "mousedown":
							case "mousemove":
							case "mouseup":
							case "mouseout":
							case "mouseover":
							case "contextmenu":
								c = mh;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								c = hh;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								c = Eh;
								break;
							case $h:
							case eg:
							case tg:
								c = _h;
								break;
							case ag:
								c = Dh;
								break;
							case "scroll":
							case "scrollend":
								c = lh;
								break;
							case "wheel":
								c = Oh;
								break;
							case "copy":
							case "cut":
							case "paste":
								c = vh;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								c = Th;
								break;
							case "toggle":
							case "beforetoggle": c = kh;
						}
						var u = (t & 4) != 0, d = !u && (e === "scroll" || e === "scrollend"), f = u ? s === null ? null : s + "Capture" : s;
						u = [];
						for (var p = r, m; p !== null;) {
							var h = p;
							if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = mn(p, f), h != null && u.push(pu(p, h, m))), d) break;
							p = p.return;
						}
						0 < u.length && (s = new c(s, l, null, n, i), o.push({
							event: s,
							listeners: u
						}));
					}
				}
				if (!(t & 7)) {
					a: {
						if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Xm && (l = n.relatedTarget || n.fromElement) && (Qe(l) || l[Jp])) break a;
						if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Qe(l) : null, l !== null && (d = b(l), u = l.tag, l !== d || u !== 5 && u !== 27 && u !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
							if (u = mh, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = Th, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : et(c), m = l == null ? s : et(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, Qe(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
								for (u = hu, f = c, p = l, m = 0, h = f; h; h = u(h)) m++;
								h = 0;
								for (var g = p; g; g = u(g)) h++;
								for (; 0 < m - h;) f = u(f), m--;
								for (; 0 < h - m;) p = u(p), h--;
								for (; m--;) {
									if (f === p || p !== null && f === p.alternate) {
										u = f;
										break b;
									}
									f = u(f), p = u(p);
								}
								u = null;
							}
							else u = null;
							c !== null && gu(o, s, c, u, !1), l !== null && d !== null && gu(o, d, l, u, !0);
						}
					}
					a: {
						if (s = r ? et(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var _ = jn;
						else if (En(s)) if (Uh) _ = Ln;
						else {
							_ = Fn;
							var v = Pn;
						}
						else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && nn(r.elementType) && (_ = jn) : _ = In;
						if (_ &&= _(e, r)) {
							On(o, _, n, i);
							break a;
						}
						v && v(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && xt(s, "number", s.value);
					}
					switch (v = r ? et(r) : window, e) {
						case "focusin":
							(En(v) || v.contentEditable === "true") && (Kh = v, qh = r, Jh = null);
							break;
						case "focusout":
							Jh = qh = Kh = null;
							break;
						case "mousedown":
							Yh = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							Yh = !1, Gn(o, n, i);
							break;
						case "selectionchange": if (Gh) break;
						case "keydown":
						case "keyup": Gn(o, n, i);
					}
					var y;
					if (Mh) b: {
						switch (e) {
							case "compositionstart":
								var x = "onCompositionStart";
								break b;
							case "compositionend":
								x = "onCompositionEnd";
								break b;
							case "compositionupdate":
								x = "onCompositionUpdate";
								break b;
						}
						x = void 0;
					}
					else zh ? Sn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === jh && (x = "onCompositionStart");
					x && (Fh && n.locale !== "ko" && (zh || x !== "onCompositionStart" ? x === "onCompositionEnd" && zh && (y = hn()) : (rh = i, ih = "value" in rh ? rh.value : rh.textContent, zh = !0)), v = mu(r, x), 0 < v.length && (x = new yh(x, e, null, n, i), o.push({
						event: x,
						listeners: v
					}), y ? x.data = y : (y = Cn(n), y !== null && (x.data = y)))), (y = Ph ? wn(e, n) : Tn(e, n)) && (x = mu(r, "onBeforeInput"), 0 < x.length && (v = new bh("onBeforeInput", "beforeinput", null, n, i), o.push({
						event: v,
						listeners: x
					}), v.data = y)), ou(o, e, r, n, i);
				}
				cu(o, t);
			});
		}
		function pu(e, t, n) {
			return {
				instance: e,
				listener: t,
				currentTarget: n
			};
		}
		function mu(e, t) {
			for (var n = t + "Capture", r = []; e !== null;) {
				var i = e, a = i.stateNode;
				if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = mn(e, n), i != null && r.unshift(pu(e, i, a)), i = mn(e, t), i != null && r.push(pu(e, i, a))), e.tag === 3) return r;
				e = e.return;
			}
			return [];
		}
		function hu(e) {
			if (e === null) return null;
			do
				e = e.return;
			while (e && e.tag !== 5 && e.tag !== 27);
			return e || null;
		}
		function gu(e, t, n, r, i) {
			for (var a = t._reactName, o = []; n !== null && n !== r;) {
				var s = n, c = s.alternate, l = s.stateNode;
				if (s = s.tag, c !== null && c === r) break;
				s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = mn(n, a), l != null && o.unshift(pu(n, l, c))) : i || (l = mn(n, a), l != null && o.push(pu(n, l, c)))), n = n.return;
			}
			o.length !== 0 && e.push({
				event: t,
				listeners: o
			});
		}
		function _u(e, t) {
			on(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Um || (Um = !0, e === "select" && t.multiple ? console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
			var n = {
				registrationNameDependencies: tm,
				possibleRegistrationNames: nm
			};
			nn(e) || typeof t.is == "string" || cn(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
		}
		function vu(e, t, n, r) {
			t !== n && (n = Su(n), Su(t) !== n && (r[e] = t));
		}
		function yu(e, t, n) {
			t.forEach(function(t) {
				n[Ou(t)] = t === "style" ? ku(e) : e.getAttribute(t);
			});
		}
		function bu(e, t) {
			!1 === t ? console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
		}
		function xu(e, t) {
			return e = e.namespaceURI === Fm || e.namespaceURI === Im ? e.ownerDocument.createElementNS(e.namespaceURI, e.tagName) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
		}
		function Su(e) {
			return Ee(e) && (console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.", Te(e)), De(e)), (typeof e == "string" ? e : "" + e).replace(CS, "\n").replace(wS, "");
		}
		function Cu(e, t) {
			return t = Su(t), Su(e) === t;
		}
		function wu(e, t, n, r, i, a) {
			switch (n) {
				case "children":
					typeof r == "string" ? (Zt(r, t, !1), t === "body" || t === "textarea" && r === "" || Qt(e, r)) : (typeof r == "number" || typeof r == "bigint") && (Zt("" + r, t, !1), t !== "body" && Qt(e, "" + r));
					break;
				case "className":
					lt(e, "class", r);
					break;
				case "tabIndex":
					lt(e, "tabindex", r);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					lt(e, n, r);
					break;
				case "style":
					tn(e, r, a);
					break;
				case "data": if (t !== "object") {
					lt(e, "data", r);
					break;
				}
				case "src":
				case "href":
					if (r === "" && (t !== "a" || n !== "href")) {
						console.error(n === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", n, n), e.removeAttribute(n);
						break;
					}
					if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					Oe(r, n), r = ln("" + r), e.setAttribute(n, r);
					break;
				case "action":
				case "formAction":
					if (r != null && (t === "form" ? n === "formAction" ? console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>.") : typeof r == "function" && (i.encType == null && i.method == null || bS || (bS = !0, console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")), i.target == null || yS || (yS = !0, console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))) : t === "input" || t === "button" ? n === "action" ? console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>.") : t !== "input" || i.type === "submit" || i.type === "image" || _S ? t !== "button" || i.type == null || i.type === "submit" || _S ? typeof r == "function" && (i.name == null || vS || (vS = !0, console.error("Cannot specify a \"name\" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.")), i.formEncType == null && i.formMethod == null || bS || (bS = !0, console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")), i.formTarget == null || yS || (yS = !0, console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))) : (_S = !0, console.error("A button can only specify a formAction along with type=\"submit\" or no type.")) : (_S = !0, console.error("An input can only specify a formAction along with type=\"submit\" or type=\"image\".")) : console.error(n === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>.")), typeof r == "function") {
						e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
						break;
					} else typeof a == "function" && (n === "formAction" ? (t !== "input" && wu(e, t, "name", i.name, i, null), wu(e, t, "formEncType", i.formEncType, i, null), wu(e, t, "formMethod", i.formMethod, i, null), wu(e, t, "formTarget", i.formTarget, i, null)) : (wu(e, t, "encType", i.encType, i, null), wu(e, t, "method", i.method, i, null), wu(e, t, "target", i.target, i, null)));
					if (r == null || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					Oe(r, n), r = ln("" + r), e.setAttribute(n, r);
					break;
				case "onClick":
					r != null && (typeof r != "function" && bu(n, r), e.onclick = un);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && bu(n, r), L("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && bu(n, r), L("scrollend", e));
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							e.innerHTML = n;
						}
					}
					break;
				case "multiple":
					e.multiple = r && typeof r != "function" && typeof r != "symbol";
					break;
				case "muted":
					e.muted = r && typeof r != "function" && typeof r != "symbol";
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": break;
				case "autoFocus": break;
				case "xlinkHref":
					if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
						e.removeAttribute("xlink:href");
						break;
					}
					Oe(r, n), n = ln("" + r), e.setAttributeNS(TS, "xlink:href", n);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					r != null && typeof r != "function" && typeof r != "symbol" ? (Oe(r, n), e.setAttribute(n, "" + r)) : e.removeAttribute(n);
					break;
				case "inert": r !== "" || SS[n] || (SS[n] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", n));
				case "allowFullScreen":
				case "async":
				case "autoPlay":
				case "controls":
				case "default":
				case "defer":
				case "disabled":
				case "disablePictureInPicture":
				case "disableRemotePlayback":
				case "formNoValidate":
				case "hidden":
				case "loop":
				case "noModule":
				case "noValidate":
				case "open":
				case "playsInline":
				case "readOnly":
				case "required":
				case "reversed":
				case "scoped":
				case "seamless":
				case "itemScope":
					r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
					break;
				case "capture":
				case "download":
					!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? (Oe(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (Oe(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "rowSpan":
				case "start":
					r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : (Oe(r, n), e.setAttribute(n, r));
					break;
				case "popover":
					L("beforetoggle", e), L("toggle", e), ct(e, "popover", r);
					break;
				case "xlinkActuate":
					ut(e, TS, "xlink:actuate", r);
					break;
				case "xlinkArcrole":
					ut(e, TS, "xlink:arcrole", r);
					break;
				case "xlinkRole":
					ut(e, TS, "xlink:role", r);
					break;
				case "xlinkShow":
					ut(e, TS, "xlink:show", r);
					break;
				case "xlinkTitle":
					ut(e, TS, "xlink:title", r);
					break;
				case "xlinkType":
					ut(e, TS, "xlink:type", r);
					break;
				case "xmlBase":
					ut(e, ES, "xml:base", r);
					break;
				case "xmlLang":
					ut(e, ES, "xml:lang", r);
					break;
				case "xmlSpace":
					ut(e, ES, "xml:space", r);
					break;
				case "is":
					a != null && console.error("Cannot update the \"is\" prop after it has been initialized."), ct(e, "is", r);
					break;
				case "innerText":
				case "textContent": break;
				case "popoverTarget": xS || typeof r != "object" || !r || (xS = !0, console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.", r));
				default: !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N" ? (n = rn(n), ct(e, n, r)) : tm.hasOwnProperty(n) && r != null && typeof r != "function" && bu(n, r);
			}
		}
		function Tu(e, t, n, r, i, a) {
			switch (n) {
				case "style":
					tn(e, r, a);
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							e.innerHTML = n;
						}
					}
					break;
				case "children":
					typeof r == "string" ? Qt(e, r) : (typeof r == "number" || typeof r == "bigint") && Qt(e, "" + r);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && bu(n, r), L("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && bu(n, r), L("scrollend", e));
					break;
				case "onClick":
					r != null && (typeof r != "function" && bu(n, r), e.onclick = un);
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref": break;
				case "innerText":
				case "textContent": break;
				default: if (tm.hasOwnProperty(n)) r != null && typeof r != "function" && bu(n, r);
				else a: {
					if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[qp] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
						typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
						break a;
					}
					n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : ct(e, n, r);
				}
			}
		}
		function Eu(e, t, n) {
			switch (_u(t, n), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "img":
					L("error", e), L("load", e);
					var r = !1, i = !1, a;
					for (a in n) if (n.hasOwnProperty(a)) {
						var o = n[a];
						if (o != null) switch (a) {
							case "src":
								r = !0;
								break;
							case "srcSet":
								i = !0;
								break;
							case "children":
							case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							default: wu(e, t, a, o, n, null);
						}
					}
					i && wu(e, t, "srcSet", n.srcSet, n, null), r && wu(e, t, "src", n.src, n, null);
					return;
				case "input":
					at("input", n), L("invalid", e);
					var s = a = o = i = null, c = null, l = null;
					for (r in n) if (n.hasOwnProperty(r)) {
						var u = n[r];
						if (u != null) switch (r) {
							case "name":
								i = u;
								break;
							case "type":
								o = u;
								break;
							case "checked":
								c = u;
								break;
							case "defaultChecked":
								l = u;
								break;
							case "value":
								a = u;
								break;
							case "defaultValue":
								s = u;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (u != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: wu(e, t, r, u, n, null);
						}
					}
					vt(e, n), bt(e, a, s, c, l, o, i, !1);
					return;
				case "select":
					for (i in at("select", n), L("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (s = n[i], s != null)) switch (i) {
						case "value":
							a = s;
							break;
						case "defaultValue":
							o = s;
							break;
						case "multiple": r = s;
						default: wu(e, t, i, s, n, null);
					}
					Tt(e, n), t = a, n = o, e.multiple = !!r, t == null ? n != null && wt(e, !!r, n, !0) : wt(e, !!r, t, !1);
					return;
				case "textarea":
					for (o in at("textarea", n), L("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (s = n[o], s != null)) switch (o) {
						case "value":
							r = s;
							break;
						case "defaultValue":
							i = s;
							break;
						case "children":
							a = s;
							break;
						case "dangerouslySetInnerHTML":
							if (s != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: wu(e, t, o, s, n, null);
					}
					Et(e, n), Ot(e, r, i, a);
					return;
				case "option":
					for (c in St(e, n), n) if (n.hasOwnProperty(c) && (r = n[c], r != null)) switch (c) {
						case "selected":
							e.selected = r && typeof r != "function" && typeof r != "symbol";
							break;
						default: wu(e, t, c, r, n, null);
					}
					return;
				case "dialog":
					L("beforetoggle", e), L("toggle", e), L("cancel", e), L("close", e);
					break;
				case "iframe":
				case "object":
					L("load", e);
					break;
				case "video":
				case "audio":
					for (r = 0; r < fS.length; r++) L(fS[r], e);
					break;
				case "image":
					L("error", e), L("load", e);
					break;
				case "details":
					L("toggle", e);
					break;
				case "embed":
				case "source":
				case "link": L("error", e), L("load", e);
				case "area":
				case "base":
				case "br":
				case "col":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "track":
				case "wbr":
				case "menuitem":
					for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
						default: wu(e, t, l, r, n, null);
					}
					return;
				default: if (nn(t)) {
					for (u in n) n.hasOwnProperty(u) && (r = n[u], r !== void 0 && Tu(e, t, u, r, n, void 0));
					return;
				}
			}
			for (s in n) n.hasOwnProperty(s) && (r = n[s], r != null && wu(e, t, s, r, n, null));
		}
		function Du(e, t, n, r) {
			switch (_u(t, r), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "input":
					var i = null, a = null, o = null, s = null, c = null, l = null, u = null;
					for (p in n) {
						var d = n[p];
						if (n.hasOwnProperty(p) && d != null) switch (p) {
							case "checked": break;
							case "value": break;
							case "defaultValue": c = d;
							default: r.hasOwnProperty(p) || wu(e, t, p, null, r, d);
						}
					}
					for (var f in r) {
						var p = r[f];
						if (d = n[f], r.hasOwnProperty(f) && (p != null || d != null)) switch (f) {
							case "type":
								a = p;
								break;
							case "name":
								i = p;
								break;
							case "checked":
								l = p;
								break;
							case "defaultChecked":
								u = p;
								break;
							case "value":
								o = p;
								break;
							case "defaultValue":
								s = p;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (p != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: p !== d && wu(e, t, f, p, r, d);
						}
					}
					t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, t || !r || gS || (console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), gS = !0), !t || r || hS || (console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), hS = !0), yt(e, o, s, c, l, u, a, i);
					return;
				case "select":
					for (a in p = o = s = f = null, n) if (c = n[a], n.hasOwnProperty(a) && c != null) switch (a) {
						case "value": break;
						case "multiple": p = c;
						default: r.hasOwnProperty(a) || wu(e, t, a, null, r, c);
					}
					for (i in r) if (a = r[i], c = n[i], r.hasOwnProperty(i) && (a != null || c != null)) switch (i) {
						case "value":
							f = a;
							break;
						case "defaultValue":
							s = a;
							break;
						case "multiple": o = a;
						default: a !== c && wu(e, t, i, a, r, c);
					}
					r = s, t = o, n = p, f == null ? !!n != !!t && (r == null ? wt(e, !!t, t ? [] : "", !1) : wt(e, !!t, r, !0)) : wt(e, !!t, f, !1);
					return;
				case "textarea":
					for (s in p = f = null, n) if (i = n[s], n.hasOwnProperty(s) && i != null && !r.hasOwnProperty(s)) switch (s) {
						case "value": break;
						case "children": break;
						default: wu(e, t, s, null, r, i);
					}
					for (o in r) if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
						case "value":
							f = i;
							break;
						case "defaultValue":
							p = i;
							break;
						case "children": break;
						case "dangerouslySetInnerHTML":
							if (i != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: i !== a && wu(e, t, o, i, r, a);
					}
					Dt(e, f, p);
					return;
				case "option":
					for (var m in n) if (f = n[m], n.hasOwnProperty(m) && f != null && !r.hasOwnProperty(m)) switch (m) {
						case "selected":
							e.selected = !1;
							break;
						default: wu(e, t, m, null, r, f);
					}
					for (c in r) if (f = r[c], p = n[c], r.hasOwnProperty(c) && f !== p && (f != null || p != null)) switch (c) {
						case "selected":
							e.selected = f && typeof f != "function" && typeof f != "symbol";
							break;
						default: wu(e, t, c, f, r, p);
					}
					return;
				case "img":
				case "link":
				case "area":
				case "base":
				case "br":
				case "col":
				case "embed":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "source":
				case "track":
				case "wbr":
				case "menuitem":
					for (var h in n) f = n[h], n.hasOwnProperty(h) && f != null && !r.hasOwnProperty(h) && wu(e, t, h, null, r, f);
					for (l in r) if (f = r[l], p = n[l], r.hasOwnProperty(l) && f !== p && (f != null || p != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML":
							if (f != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							break;
						default: wu(e, t, l, f, r, p);
					}
					return;
				default: if (nn(t)) {
					for (var g in n) f = n[g], n.hasOwnProperty(g) && f !== void 0 && !r.hasOwnProperty(g) && Tu(e, t, g, void 0, r, f);
					for (u in r) f = r[u], p = n[u], !r.hasOwnProperty(u) || f === p || f === void 0 && p === void 0 || Tu(e, t, u, f, r, p);
					return;
				}
			}
			for (var _ in n) f = n[_], n.hasOwnProperty(_) && f != null && !r.hasOwnProperty(_) && wu(e, t, _, null, r, f);
			for (d in r) f = r[d], p = n[d], !r.hasOwnProperty(d) || f === p || f == null && p == null || wu(e, t, d, f, r, p);
		}
		function Ou(e) {
			switch (e) {
				case "class": return "className";
				case "for": return "htmlFor";
				default: return e;
			}
		}
		function ku(e) {
			var t = {};
			e = e.style;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				t[r] = e.getPropertyValue(r);
			}
			return t;
		}
		function Au(e, t, n) {
			if (t != null && typeof t != "object") console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			else {
				var r, i = r = "", a;
				for (a in t) if (t.hasOwnProperty(a)) {
					var o = t[a];
					o != null && typeof o != "boolean" && o !== "" && (a.indexOf("--") === 0 ? (ke(o, a), r += i + a + ":" + ("" + o).trim()) : typeof o != "number" || o === 0 || Pm.has(a) ? (ke(o, a), r += i + a.replace(wm, "-$1").toLowerCase().replace(Tm, "-ms-") + ":" + ("" + o).trim()) : r += i + a.replace(wm, "-$1").toLowerCase().replace(Tm, "-ms-") + ":" + o + "px", i = ";");
				}
				r ||= null, t = e.getAttribute("style"), t !== r && (r = Su(r), Su(t) !== r && (n.style = ku(e)));
			}
		}
		function ju(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (Oe(r, t), e === "" + r) return;
			}
			vu(t, e, r, a);
		}
		function Mu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) {
				switch (typeof r) {
					case "function":
					case "symbol": return;
				}
				if (!r) return;
			} else switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (r) return;
			}
			vu(t, e, r, a);
		}
		function Nu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (Oe(r, n), e === "" + r) return;
			}
			vu(t, e, r, a);
		}
		function Pu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
				default: if (isNaN(r)) return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (!isNaN(r) && (Oe(r, t), e === "" + r)) return;
			}
			vu(t, e, r, a);
		}
		function Fu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (Oe(r, t), n = ln("" + r), e === n) return;
			}
			vu(t, e, r, a);
		}
		function Iu(e, t, n, r) {
			for (var i = {}, a = /* @__PURE__ */ new Set(), o = e.attributes, s = 0; s < o.length; s++) switch (o[s].name.toLowerCase()) {
				case "value": break;
				case "checked": break;
				case "selected": break;
				default: a.add(o[s].name);
			}
			if (nn(t)) {
				for (var c in n) if (n.hasOwnProperty(c)) {
					var l = n[c];
					if (l != null) {
						if (tm.hasOwnProperty(c)) typeof l != "function" && bu(c, l);
						else if (!0 !== n.suppressHydrationWarning) switch (c) {
							case "children":
								typeof l != "string" && typeof l != "number" || vu("children", e.textContent, l, i);
								continue;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "defaultValue":
							case "defaultChecked":
							case "innerHTML":
							case "ref": continue;
							case "dangerouslySetInnerHTML":
								o = e.innerHTML, l = l ? l.__html : void 0, l != null && (l = xu(e, l), vu(c, o, l, i));
								continue;
							case "style":
								a.delete(c), Au(e, l, i);
								continue;
							case "offsetParent":
							case "offsetTop":
							case "offsetLeft":
							case "offsetWidth":
							case "offsetHeight":
							case "isContentEditable":
							case "outerText":
							case "outerHTML":
								a.delete(c.toLowerCase()), console.error("Assignment to read-only property will result in a no-op: `%s`", c);
								continue;
							case "className":
								a.delete("class"), o = st(e, "class", l), vu("className", o, l, i);
								continue;
							default: r.context === US && t !== "svg" && t !== "math" ? a.delete(c.toLowerCase()) : a.delete(c), o = st(e, c, l), vu(c, o, l, i);
						}
					}
				}
			} else for (l in n) if (n.hasOwnProperty(l) && (c = n[l], c != null)) {
				if (tm.hasOwnProperty(l)) typeof c != "function" && bu(l, c);
				else if (!0 !== n.suppressHydrationWarning) switch (l) {
					case "children":
						typeof c != "string" && typeof c != "number" || vu("children", e.textContent, c, i);
						continue;
					case "suppressContentEditableWarning":
					case "suppressHydrationWarning":
					case "value":
					case "checked":
					case "selected":
					case "defaultValue":
					case "defaultChecked":
					case "innerHTML":
					case "ref": continue;
					case "dangerouslySetInnerHTML":
						o = e.innerHTML, c = c ? c.__html : void 0, c != null && (c = xu(e, c), o !== c && (i[l] = { __html: o }));
						continue;
					case "className":
						ju(e, l, "class", c, a, i);
						continue;
					case "tabIndex":
						ju(e, l, "tabindex", c, a, i);
						continue;
					case "style":
						a.delete(l), Au(e, c, i);
						continue;
					case "multiple":
						a.delete(l), vu(l, e.multiple, c, i);
						continue;
					case "muted":
						a.delete(l), vu(l, e.muted, c, i);
						continue;
					case "autoFocus":
						a.delete("autofocus"), vu(l, e.autofocus, c, i);
						continue;
					case "data": if (t !== "object") {
						a.delete(l), o = e.getAttribute("data"), vu(l, o, c, i);
						continue;
					}
					case "src":
					case "href":
						if (!(c !== "" || t === "a" && l === "href" || t === "object" && l === "data")) {
							console.error(l === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", l, l);
							continue;
						}
						Fu(e, l, l, c, a, i);
						continue;
					case "action":
					case "formAction":
						if (o = e.getAttribute(l), typeof c == "function") {
							a.delete(l.toLowerCase()), l === "formAction" ? (a.delete("name"), a.delete("formenctype"), a.delete("formmethod"), a.delete("formtarget")) : (a.delete("enctype"), a.delete("method"), a.delete("target"));
							continue;
						} else if (o === DS) {
							a.delete(l.toLowerCase()), vu(l, "function", c, i);
							continue;
						}
						Fu(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "xlinkHref":
						Fu(e, l, "xlink:href", c, a, i);
						continue;
					case "contentEditable":
						Nu(e, l, "contenteditable", c, a, i);
						continue;
					case "spellCheck":
						Nu(e, l, "spellcheck", c, a, i);
						continue;
					case "draggable":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
						Nu(e, l, l, c, a, i);
						continue;
					case "allowFullScreen":
					case "async":
					case "autoPlay":
					case "controls":
					case "default":
					case "defer":
					case "disabled":
					case "disablePictureInPicture":
					case "disableRemotePlayback":
					case "formNoValidate":
					case "hidden":
					case "loop":
					case "noModule":
					case "noValidate":
					case "open":
					case "playsInline":
					case "readOnly":
					case "required":
					case "reversed":
					case "scoped":
					case "seamless":
					case "itemScope":
						Mu(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "capture":
					case "download":
						a: {
							s = e;
							var u = o = l, d = i;
							if (a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol": break a;
								default: if (!1 === c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol": break;
								case "boolean":
									if (!0 === c && s === "") break a;
									break;
								default: if (Oe(c, o), s === "" + c) break a;
							}
							vu(o, s, c, d);
						}
						continue;
					case "cols":
					case "rows":
					case "size":
					case "span":
						a: {
							if (s = e, u = o = l, d = i, a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol":
								case "boolean": break a;
								default: if (isNaN(c) || 1 > c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol":
								case "boolean": break;
								default: if (!(isNaN(c) || 1 > c) && (Oe(c, o), s === "" + c)) break a;
							}
							vu(o, s, c, d);
						}
						continue;
					case "rowSpan":
						Pu(e, l, "rowspan", c, a, i);
						continue;
					case "start":
						Pu(e, l, l, c, a, i);
						continue;
					case "xHeight":
						ju(e, l, "x-height", c, a, i);
						continue;
					case "xlinkActuate":
						ju(e, l, "xlink:actuate", c, a, i);
						continue;
					case "xlinkArcrole":
						ju(e, l, "xlink:arcrole", c, a, i);
						continue;
					case "xlinkRole":
						ju(e, l, "xlink:role", c, a, i);
						continue;
					case "xlinkShow":
						ju(e, l, "xlink:show", c, a, i);
						continue;
					case "xlinkTitle":
						ju(e, l, "xlink:title", c, a, i);
						continue;
					case "xlinkType":
						ju(e, l, "xlink:type", c, a, i);
						continue;
					case "xmlBase":
						ju(e, l, "xml:base", c, a, i);
						continue;
					case "xmlLang":
						ju(e, l, "xml:lang", c, a, i);
						continue;
					case "xmlSpace":
						ju(e, l, "xml:space", c, a, i);
						continue;
					case "inert":
						c !== "" || SS[l] || (SS[l] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", l)), Mu(e, l, l, c, a, i);
						continue;
					default: if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") {
						s = rn(l), o = !1, r.context === US && t !== "svg" && t !== "math" ? a.delete(s.toLowerCase()) : (u = l.toLowerCase(), u = Rm.hasOwnProperty(u) && Rm[u] || null, u !== null && u !== l && (o = !0, a.delete(u)), a.delete(s));
						a: if (u = e, d = s, s = c, ot(d)) if (u.hasAttribute(d)) u = u.getAttribute(d), Oe(s, d), s = u === "" + s ? s : u;
						else {
							switch (typeof s) {
								case "function":
								case "symbol": break a;
								case "boolean": if (u = d.toLowerCase().slice(0, 5), u !== "data-" && u !== "aria-") break a;
							}
							s = s === void 0 ? void 0 : null;
						}
						else s = void 0;
						o || vu(l, s, c, i);
					}
				}
			}
			return 0 < a.size && !0 !== n.suppressHydrationWarning && yu(e, a, i), Object.keys(i).length === 0 ? null : i;
		}
		function Lu(e, t) {
			switch (e.length) {
				case 0: return "";
				case 1: return e[0];
				case 2: return e[0] + " " + t + " " + e[1];
				default: return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
			}
		}
		function Ru(e) {
			switch (e) {
				case "css":
				case "script":
				case "font":
				case "img":
				case "image":
				case "input":
				case "link": return !0;
				default: return !1;
			}
		}
		function zu() {
			if (typeof performance.getEntriesByType == "function") {
				for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
					var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
					if (a && s && Ru(o)) {
						for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
							var c = n[r], l = c.startTime;
							if (l > s) break;
							var u = c.transferSize, d = c.initiatorType;
							u && Ru(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
						}
						if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
					}
				}
				if (0 < e) return t / e / 1e6;
			}
			return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
		}
		function Bu(e) {
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Vu(e) {
			switch (e) {
				case Im: return WS;
				case Fm: return GS;
				default: return US;
			}
		}
		function Hu(e, t) {
			if (e === US) switch (t) {
				case "svg": return WS;
				case "math": return GS;
				default: return US;
			}
			return e === WS && t === "foreignObject" ? US : e;
		}
		function Uu(e, t) {
			return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
		}
		function Wu() {
			var e = window.event;
			return e && e.type === "popstate" ? e === YS ? !1 : (YS = e, !0) : (YS = null, !1);
		}
		function Gu() {
			var e = window.event;
			return e && e !== XS ? e.type : null;
		}
		function Ku() {
			var e = window.event;
			return e && e !== XS ? e.timeStamp : -1.1;
		}
		function qu(e) {
			setTimeout(function() {
				throw e;
			});
		}
		function Ju(e, t, n) {
			switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && e.focus();
					break;
				case "img": n.src ? e.src = n.src : n.srcSet && (e.srcset = n.srcSet);
			}
		}
		function Yu() {}
		function Xu(e, t, n, r) {
			Du(e, t, n, r), e[qp] = r;
		}
		function Zu(e) {
			Qt(e, "");
		}
		function Qu(e, t, n) {
			e.nodeValue = n;
		}
		function $u(e) {
			if (!e.__reactWarnedAboutChildrenConflict) {
				var t = e[qp] || null;
				if (t !== null) {
					var n = $e(e);
					n !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, E(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"children\" text content using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, E(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"dangerouslySetInnerHTML\" using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})));
				}
			}
		}
		function ed(e) {
			return e === "head";
		}
		function td(e, t) {
			e.removeChild(t);
		}
		function nd(e, t) {
			(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
		}
		function rd(e, t) {
			var n = t, r = 0;
			do {
				var i = n.nextSibling;
				if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === MS || n === AS) {
					if (r === 0) {
						e.removeChild(i), Sf(t);
						return;
					}
					r--;
				} else if (n === jS || n === NS || n === PS || n === FS || n === kS) r++;
				else if (n === IS) Od(e.ownerDocument.documentElement);
				else if (n === RS) {
					n = e.ownerDocument.head, Od(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[$p] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === LS && Od(e.ownerDocument.body);
				n = i;
			} while (n);
			Sf(t);
		}
		function id(e, t) {
			var n = e;
			e = 0;
			do {
				var r = n.nextSibling;
				if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === MS) {
					if (e === 0) break;
					e--;
				} else n !== jS && n !== NS && n !== PS && n !== FS || e++;
				n = r;
			} while (n);
		}
		function ad(e) {
			id(e, !0);
		}
		function od(e) {
			e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
		}
		function sd(e) {
			e.nodeValue = "";
		}
		function cd(e) {
			id(e, !1);
		}
		function ld(e, t) {
			t = t[HS], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
		}
		function ud(e, t) {
			e.nodeValue = t;
		}
		function dd(e) {
			var t = e.firstChild;
			for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
				var n = t;
				switch (t = t.nextSibling, n.nodeName) {
					case "HTML":
					case "HEAD":
					case "BODY":
						dd(n), Ze(n);
						continue;
					case "SCRIPT":
					case "STYLE": continue;
					case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
				}
				e.removeChild(n);
			}
		}
		function fd(e, t, n, r) {
			for (; e.nodeType === 1;) {
				var i = n;
				if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
					if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
				} else if (!r) if (t === "input" && e.type === "hidden") {
					Oe(i.name, "name");
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
				else if (!e[$p]) switch (t) {
					case "meta":
						if (!e.hasAttribute("itemprop")) break;
						return e;
					case "link":
						if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
						return e;
					case "style":
						if (e.hasAttribute("data-precedence")) break;
						return e;
					case "script":
						if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
						return e;
					default: return e;
				}
				if (e = vd(e.nextSibling), e === null) break;
			}
			return null;
		}
		function pd(e, t, n) {
			if (t === "") return null;
			for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = vd(e.nextSibling), e === null)) return null;
			return e;
		}
		function md(e, t) {
			for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = vd(e.nextSibling), e === null)) return null;
			return e;
		}
		function hd(e) {
			return e.data === NS || e.data === PS;
		}
		function gd(e) {
			return e.data === FS || e.data === NS && e.ownerDocument.readyState !== VS;
		}
		function _d(e, t) {
			var n = e.ownerDocument;
			if (e.data === PS) e._reactRetry = t;
			else if (e.data !== NS || n.readyState !== VS) t();
			else {
				var r = function() {
					t(), n.removeEventListener("DOMContentLoaded", r);
				};
				n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
			}
		}
		function vd(e) {
			for (; e != null; e = e.nextSibling) {
				var t = e.nodeType;
				if (t === 1 || t === 3) break;
				if (t === 8) {
					if (t = e.data, t === jS || t === FS || t === NS || t === PS || t === kS || t === zS || t === BS) break;
					if (t === MS || t === AS) return null;
				}
			}
			return e;
		}
		function yd(e) {
			if (e.nodeType === 1) {
				for (var t = e.nodeName.toLowerCase(), n = {}, r = e.attributes, i = 0; i < r.length; i++) {
					var a = r[i];
					n[Ou(a.name)] = a.name.toLowerCase() === "style" ? ku(e) : a.value;
				}
				return {
					type: t,
					props: n
				};
			}
			return e.nodeType === 8 ? e.data === kS ? {
				type: "Activity",
				props: {}
			} : {
				type: "Suspense",
				props: {}
			} : e.nodeValue;
		}
		function bd(e, t, n) {
			return n === null || !0 !== n[OS] ? (e.nodeValue === t ? e = null : (t = Su(t), e = Su(e.nodeValue) === t ? null : e.nodeValue), e) : null;
		}
		function xd(e) {
			e = e.nextSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === MS || n === AS) {
						if (t === 0) return vd(e.nextSibling);
						t--;
					} else n !== jS && n !== FS && n !== NS && n !== PS && n !== kS || t++;
				}
				e = e.nextSibling;
			}
			return null;
		}
		function Sd(e) {
			e = e.previousSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === jS || n === FS || n === NS || n === PS || n === kS) {
						if (t === 0) return e;
						t--;
					} else n !== MS && n !== AS || t++;
				}
				e = e.previousSibling;
			}
			return null;
		}
		function Cd(e) {
			Sf(e);
		}
		function wd(e) {
			Sf(e);
		}
		function Td(e) {
			Sf(e);
		}
		function Ed(e, t, n, r, i) {
			switch (i && Xt(e, r.ancestorInfo), t = Bu(n), e) {
				case "html":
					if (e = t.documentElement, !e) throw Error("React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "head":
					if (e = t.head, !e) throw Error("React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "body":
					if (e = t.body, !e) throw Error("React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				default: throw Error("resolveSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
		}
		function Dd(e, t, n, r) {
			if (!n[Jp] && $e(n)) {
				var i = n.tagName.toLowerCase();
				console.error("You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.", i, i, i);
			}
			switch (e) {
				case "html":
				case "head":
				case "body": break;
				default: console.error("acquireSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
			for (i = n.attributes; i.length;) n.removeAttributeNode(i[0]);
			Eu(n, e, t), n[Kp] = r, n[qp] = t;
		}
		function Od(e) {
			for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
			Ze(e);
		}
		function kd(e) {
			return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Ad(e, t, n) {
			var r = dC;
			if (r && typeof t == "string" && t) {
				var i = _t(t);
				i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), lC.has(i) || (lC.add(i), e = {
					rel: e,
					crossOrigin: n,
					href: t
				}, r.querySelector(i) === null && (t = r.createElement("link"), Eu(t, "link", e), nt(t), r.head.appendChild(t)));
			}
		}
		function jd(e, t, n, r) {
			var i = (i = tp.current) ? kd(i) : null;
			if (!i) throw Error("\"resourceRoot\" was expected to exist. This is a bug in React.");
			switch (e) {
				case "meta":
				case "title": return null;
				case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = R(n.href), t = tt(i).hoistableStyles, r = t.get(n), r || (r = {
					type: "style",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				case "link":
					if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
						e = R(n.href);
						var a = tt(i).hoistableStyles, o = a.get(e);
						if (!o && (i = i.ownerDocument || i, o = {
							type: "stylesheet",
							instance: null,
							count: 0,
							state: {
								loading: rC,
								preload: null
							}
						}, a.set(e, o), (a = i.querySelector(Nd(e))) && !a._p && (o.instance = a, o.state.loading = iC | sC), !cC.has(e))) {
							var s = {
								rel: "preload",
								as: "style",
								href: n.href,
								crossOrigin: n.crossOrigin,
								integrity: n.integrity,
								media: n.media,
								hrefLang: n.hrefLang,
								referrerPolicy: n.referrerPolicy
							};
							cC.set(e, s), a || Fd(i, e, s, o.state);
						}
						if (t && r === null) throw n = "\n\n  - " + Md(t) + "\n  + " + Md(n), Error("Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
						return o;
					}
					if (t && r !== null) throw n = "\n\n  - " + Md(t) + "\n  + " + Md(n), Error("Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
					return null;
				case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Id(n), t = tt(i).hoistableScripts, r = t.get(n), r || (r = {
					type: "script",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				default: throw Error("getResource encountered a type it did not expect: \"" + e + "\". this is a bug in React.");
			}
		}
		function Md(e) {
			var t = 0, n = "<link";
			return typeof e.rel == "string" ? (t++, n += " rel=\"" + e.rel + "\"") : _p.call(e, "rel") && (t++, n += " rel=\"" + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + "\""), typeof e.href == "string" ? (t++, n += " href=\"" + e.href + "\"") : _p.call(e, "href") && (t++, n += " href=\"" + (e.href === null ? "null" : "invalid type " + typeof e.href) + "\""), typeof e.precedence == "string" ? (t++, n += " precedence=\"" + e.precedence + "\"") : _p.call(e, "precedence") && (t++, n += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (n += " ..."), n + " />";
		}
		function R(e) {
			return "href=\"" + _t(e) + "\"";
		}
		function Nd(e) {
			return "link[rel=\"stylesheet\"][" + e + "]";
		}
		function Pd(e) {
			return z({}, e, {
				"data-precedence": e.precedence,
				precedence: null
			});
		}
		function Fd(e, t, n, r) {
			e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = iC : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
				return r.loading |= iC;
			}), t.addEventListener("error", function() {
				return r.loading |= aC;
			}), Eu(t, "link", n), nt(t), e.head.appendChild(t));
		}
		function Id(e) {
			return "[src=\"" + _t(e) + "\"]";
		}
		function Ld(e) {
			return "script[async]" + e;
		}
		function Rd(e, t, n) {
			if (t.count++, t.instance === null) switch (t.type) {
				case "style":
					var r = e.querySelector("style[data-href~=\"" + _t(n.href) + "\"]");
					if (r) return t.instance = r, nt(r), r;
					var i = z({}, n, {
						"data-href": n.href,
						"data-precedence": n.precedence,
						href: null,
						precedence: null
					});
					return r = (e.ownerDocument || e).createElement("style"), nt(r), Eu(r, "style", i), zd(r, n.precedence, e), t.instance = r;
				case "stylesheet":
					i = R(n.href);
					var a = e.querySelector(Nd(i));
					if (a) return t.state.loading |= sC, t.instance = a, nt(a), a;
					r = Pd(n), (i = cC.get(i)) && Bd(r, i), a = (e.ownerDocument || e).createElement("link"), nt(a);
					var o = a;
					return o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Eu(a, "link", r), t.state.loading |= sC, zd(a, n.precedence, e), t.instance = a;
				case "script": return a = Id(n.src), (i = e.querySelector(Ld(a))) ? (t.instance = i, nt(i), i) : (r = n, (i = cC.get(a)) && (r = z({}, n), Vd(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), nt(i), Eu(i, "link", r), e.head.appendChild(i), t.instance = i);
				case "void": return null;
				default: throw Error("acquireResource encountered a resource type it did not expect: \"" + t.type + "\". this is a bug in React.");
			}
			else t.type === "stylesheet" && (t.state.loading & sC) === rC && (r = t.instance, t.state.loading |= sC, zd(r, n.precedence, e));
			return t.instance;
		}
		function zd(e, t, n) {
			for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
				var s = r[o];
				if (s.dataset.precedence === t) a = s;
				else if (a !== i) break;
			}
			a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
		}
		function Bd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
		}
		function Vd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
		}
		function Hd(e, t, n) {
			if (fC === null) {
				var r = /* @__PURE__ */ new Map(), i = fC = /* @__PURE__ */ new Map();
				i.set(n, r);
			} else i = fC, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
			if (r.has(e)) return r;
			for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
				var a = n[i];
				if (!(a[$p] || a[Kp] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== Im) {
					var o = a.getAttribute(t) || "";
					o = e + o;
					var s = r.get(o);
					s ? s.push(a) : r.set(o, [a]);
				}
			}
			return r;
		}
		function Ud(e, t, n) {
			e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
		}
		function Wd(e, t, n) {
			var r = !n.ancestorInfo.containerTagInScope;
			if (n.context === WS || t.itemProp != null) return !r || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error("Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.", e, e), !1;
			switch (e) {
				case "meta":
				case "title": return !0;
				case "style":
					if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
						r && console.error("Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel=\"stylesheet\" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence=\"default\"` and `href=\"some unique resource identifier\"`.");
						break;
					}
					return !0;
				case "link":
					if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
						if (t.rel === "stylesheet" && typeof t.precedence == "string") {
							e = t.href;
							var i = t.onError, a = t.disabled;
							n = [], t.onLoad && n.push("`onLoad`"), i && n.push("`onError`"), a != null && n.push("`disabled`"), i = Lu(n, "and"), i += n.length === 1 ? " prop" : " props", a = n.length === 1 ? "an " + i : "the " + i, n.length && console.error("React encountered a <link rel=\"stylesheet\" href=\"%s\" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.", e, a, i);
						}
						r && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error("Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag") : (t.onError || t.onLoad) && console.error("Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."));
						break;
					}
					switch (t.rel) {
						case "stylesheet": return e = t.precedence, t = t.disabled, typeof e != "string" && r && console.error("Cannot render a <link rel=\"stylesheet\" /> outside the main document without knowing its precedence. Consider adding precedence=\"default\" or moving it into the root <head> tag."), typeof e == "string" && t == null;
						default: return !0;
					}
				case "script":
					if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
						r && (e ? t.onLoad || t.onError ? console.error("Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async=\"\" or moving it into the root <head> tag."));
						break;
					}
					return !0;
				case "noscript":
				case "template": r && console.error("Cannot render <%s> outside the main document. Try moving it into the root <head> tag.", e);
			}
			return !1;
		}
		function Gd(e) {
			return !(e.type === "stylesheet" && (e.state.loading & oC) === rC);
		}
		function Kd(e, t, n, r) {
			if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && (n.state.loading & sC) === rC) {
				if (n.instance === null) {
					var i = R(r.href), a = t.querySelector(Nd(i));
					if (a) {
						t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jd.bind(e), t.then(e, e)), n.state.loading |= sC, n.instance = a, nt(a);
						return;
					}
					a = t.ownerDocument || t, r = Pd(r), (i = cC.get(i)) && Bd(r, i), a = a.createElement("link"), nt(a);
					var o = a;
					o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Eu(a, "link", r), n.instance = a;
				}
				e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & oC) === rC && (e.count++, n = Jd.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
			}
		}
		function qd(e, t) {
			return e.stylesheets && e.count === 0 && Yd(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
				var r = setTimeout(function() {
					if (e.stylesheets && Yd(e, e.stylesheets), e.unsuspend) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, pC + t);
				0 < e.imgBytes && gC === 0 && (gC = 125 * zu() * hC);
				var i = setTimeout(function() {
					if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Yd(e, e.stylesheets), e.unsuspend)) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, (e.imgBytes > gC ? 50 : mC) + t);
				return e.unsuspend = n, function() {
					e.unsuspend = null, clearTimeout(r), clearTimeout(i);
				};
			} : null;
		}
		function Jd() {
			if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
				if (this.stylesheets) Yd(this, this.stylesheets);
				else if (this.unsuspend) {
					var e = this.unsuspend;
					this.unsuspend = null, e();
				}
			}
		}
		function Yd(e, t) {
			e.stylesheets = null, e.unsuspend !== null && (e.count++, vC = /* @__PURE__ */ new Map(), t.forEach(Xd, e), vC = null, Jd.call(e));
		}
		function Xd(e, t) {
			if (!(t.state.loading & sC)) {
				var n = vC.get(e);
				if (n) var r = n.get(_C);
				else {
					n = /* @__PURE__ */ new Map(), vC.set(e, n);
					for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
						var o = i[a];
						(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
					}
					r && n.set(_C, r);
				}
				i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(_C, i), n.set(o, i), this.count++, r = Jd.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= sC;
			}
		}
		function Zd(e, t, n, r, i, a, o, s, c) {
			for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = $S, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ze(0), this.hiddenUpdates = ze(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
			this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
		}
		function Qd(e, t, n, r, i, a, o, s, c, l, u, d) {
			return e = new Zd(e, t, n, o, c, l, u, d, s), t = Lg, !0 === a && (t |= Rg | zg), t |= W, a = m(3, null, null, t), e.current = a, a.stateNode = e, t = ui(), di(t), e.pooledCache = t, di(t), a.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: t
			}, ta(a), e;
		}
		function $d(e) {
			return e ? (e = Pg, e) : Pg;
		}
		function ef(e, t, n, r, i, a) {
			if (Mp && typeof Mp.onScheduleFiberRoot == "function") try {
				Mp.onScheduleFiberRoot(jp, r, n);
			} catch (e) {
				Np || (Np = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			i = $d(i), r.context === null ? r.context = i : r.pendingContext = i, gp && hp !== null && !EC && (EC = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", C(hp) || "Unknown")), r = ra(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", a), r.callback = a), n = ia(e, r, t), n !== null && (pi(t, "root.render()", null), al(n, e, t), aa(n, e, t));
		}
		function tf(e, t) {
			if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
				var n = e.retryLane;
				e.retryLane = n !== 0 && n < t ? n : t;
			}
		}
		function nf(e, t) {
			tf(e, t), (e = e.alternate) && tf(e, t);
		}
		function rf(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = gr(e, 67108864);
				t !== null && al(t, e, 67108864), nf(e, 67108864);
			}
		}
		function af(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = rl(e);
				t = Ge(t);
				var n = gr(e, t);
				n !== null && al(n, e, t), nf(e, t);
			}
		}
		function of() {
			return hp;
		}
		function sf(e, t, n, r) {
			var i = B.T;
			B.T = null;
			var a = Jf.p;
			try {
				Jf.p = Vp, lf(e, t, n, r);
			} finally {
				Jf.p = a, B.T = i;
			}
		}
		function cf(e, t, n, r) {
			var i = B.T;
			B.T = null;
			var a = Jf.p;
			try {
				Jf.p = Hp, lf(e, t, n, r);
			} finally {
				Jf.p = a, B.T = i;
			}
		}
		function lf(e, t, n, r) {
			if (LC) {
				var i = uf(r);
				if (i === null) fu(e, t, r, RC, n), pf(e, r);
				else if (hf(i, e, t, n, r)) r.stopPropagation();
				else if (pf(e, r), t & 4 && -1 < KC.indexOf(e)) {
					for (; i !== null;) {
						var a = $e(i);
						if (a !== null) switch (a.tag) {
							case 3:
								if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
									var o = Pe(a.pendingLanes);
									if (o !== 0) {
										var s = a;
										for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
											var c = 1 << 31 - Fp(o);
											s.entanglements[1] |= c, o &= ~c;
										}
										P(a), (Z & (Fb | Ib)) === Pb && (yx = Sp() + bx, F(0, !1));
									}
								}
								break;
							case 31:
							case 13: s = gr(a, 2), s !== null && al(s, a, 2), ul(), nf(a, 2);
						}
						if (a = uf(r), a === null && fu(e, t, r, RC, n), a === i) break;
						i = a;
					}
					i !== null && r.stopPropagation();
				} else fu(e, t, r, null, n);
			}
		}
		function uf(e) {
			return e = dn(e), df(e);
		}
		function df(e) {
			if (RC = null, e = Qe(e), e !== null) {
				var t = b(e);
				if (t === null) e = null;
				else {
					var n = t.tag;
					if (n === 13) {
						if (e = x(t), e !== null) return e;
						e = null;
					} else if (n === 31) {
						if (e = ee(t), e !== null) return e;
						e = null;
					} else if (n === 3) {
						if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
						e = null;
					} else t !== e && (e = null);
				}
			}
			return RC = e, null;
		}
		function ff(e) {
			switch (e) {
				case "beforetoggle":
				case "cancel":
				case "click":
				case "close":
				case "contextmenu":
				case "copy":
				case "cut":
				case "auxclick":
				case "dblclick":
				case "dragend":
				case "dragstart":
				case "drop":
				case "focusin":
				case "focusout":
				case "input":
				case "invalid":
				case "keydown":
				case "keypress":
				case "keyup":
				case "mousedown":
				case "mouseup":
				case "paste":
				case "pause":
				case "play":
				case "pointercancel":
				case "pointerdown":
				case "pointerup":
				case "ratechange":
				case "reset":
				case "resize":
				case "seeked":
				case "submit":
				case "toggle":
				case "touchcancel":
				case "touchend":
				case "touchstart":
				case "volumechange":
				case "change":
				case "selectionchange":
				case "textInput":
				case "compositionstart":
				case "compositionend":
				case "compositionupdate":
				case "beforeblur":
				case "afterblur":
				case "beforeinput":
				case "blur":
				case "fullscreenchange":
				case "focus":
				case "hashchange":
				case "popstate":
				case "select":
				case "selectstart": return Vp;
				case "drag":
				case "dragenter":
				case "dragexit":
				case "dragleave":
				case "dragover":
				case "mousemove":
				case "mouseout":
				case "mouseover":
				case "pointermove":
				case "pointerout":
				case "pointerover":
				case "scroll":
				case "touchmove":
				case "wheel":
				case "mouseenter":
				case "mouseleave":
				case "pointerenter":
				case "pointerleave": return Hp;
				case "message": switch (Cp()) {
					case wp: return Vp;
					case Tp: return Hp;
					case Ep:
					case Dp: return Up;
					case Op: return Wp;
					default: return Up;
				}
				default: return Up;
			}
		}
		function pf(e, t) {
			switch (e) {
				case "focusin":
				case "focusout":
					BC = null;
					break;
				case "dragenter":
				case "dragleave":
					VC = null;
					break;
				case "mouseover":
				case "mouseout":
					HC = null;
					break;
				case "pointerover":
				case "pointerout":
					UC.delete(t.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture": WC.delete(t.pointerId);
			}
		}
		function mf(e, t, n, r, i, a) {
			return e === null || e.nativeEvent !== a ? (e = {
				blockedOn: t,
				domEventName: n,
				eventSystemFlags: r,
				nativeEvent: a,
				targetContainers: [i]
			}, t !== null && (t = $e(t), t !== null && rf(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
		}
		function hf(e, t, n, r, i) {
			switch (t) {
				case "focusin": return BC = mf(BC, e, t, n, r, i), !0;
				case "dragenter": return VC = mf(VC, e, t, n, r, i), !0;
				case "mouseover": return HC = mf(HC, e, t, n, r, i), !0;
				case "pointerover":
					var a = i.pointerId;
					return UC.set(a, mf(UC.get(a) || null, e, t, n, r, i)), !0;
				case "gotpointercapture": return a = i.pointerId, WC.set(a, mf(WC.get(a) || null, e, t, n, r, i)), !0;
			}
			return !1;
		}
		function gf(e) {
			var t = Qe(e.target);
			if (t !== null) {
				var n = b(t);
				if (n !== null) {
					if (t = n.tag, t === 13) {
						if (t = x(n), t !== null) {
							e.blockedOn = t, Xe(e.priority, function() {
								af(n);
							});
							return;
						}
					} else if (t === 31) {
						if (t = ee(n), t !== null) {
							e.blockedOn = t, Xe(e.priority, function() {
								af(n);
							});
							return;
						}
					} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
						e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
						return;
					}
				}
			}
			e.blockedOn = null;
		}
		function _f(e) {
			if (e.blockedOn !== null) return !1;
			for (var t = e.targetContainers; 0 < t.length;) {
				var n = uf(e.nativeEvent);
				if (n === null) {
					n = e.nativeEvent;
					var r = new n.constructor(n.type, n), i = r;
					Xm !== null && console.error("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Xm = i, n.target.dispatchEvent(r), Xm === null && console.error("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Xm = null;
				} else return t = $e(n), t !== null && rf(t), e.blockedOn = n, !1;
				t.shift();
			}
			return !0;
		}
		function vf(e, t, n) {
			_f(e) && n.delete(t);
		}
		function yf() {
			zC = !1, BC !== null && _f(BC) && (BC = null), VC !== null && _f(VC) && (VC = null), HC !== null && _f(HC) && (HC = null), UC.forEach(vf), WC.forEach(vf);
		}
		function bf(e, t) {
			e.blockedOn === t && (e.blockedOn = null, zC || (zC = !0, Df.unstable_scheduleCallback(Df.unstable_NormalPriority, yf)));
		}
		function xf(e) {
			qC !== e && (qC = e, Df.unstable_scheduleCallback(Df.unstable_NormalPriority, function() {
				qC === e && (qC = null);
				for (var t = 0; t < e.length; t += 3) {
					var n = e[t], r = e[t + 1], i = e[t + 2];
					if (typeof r != "function") {
						if (df(r || n) === null) continue;
						break;
					}
					var a = $e(n);
					a !== null && (e.splice(t, 3), t -= 3, n = {
						pending: !0,
						data: i,
						method: n.method,
						action: r
					}, Object.freeze(n), Io(a, n, r, i));
				}
			}));
		}
		function Sf(e) {
			function t(t) {
				return bf(t, e);
			}
			BC !== null && bf(BC, e), VC !== null && bf(VC, e), HC !== null && bf(HC, e), UC.forEach(t), WC.forEach(t);
			for (var n = 0; n < GC.length; n++) {
				var r = GC[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
			for (; 0 < GC.length && (n = GC[0], n.blockedOn === null);) gf(n), n.blockedOn === null && GC.shift();
			if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
				var i = n[r], a = n[r + 1], o = i[qp] || null;
				if (typeof a == "function") o || xf(n);
				else if (o) {
					var s = null;
					if (a && a.hasAttribute("formAction")) {
						if (i = a, o = a[qp] || null) s = o.formAction;
						else if (df(i) !== null) continue;
					} else s = o.action;
					typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), xf(n);
				}
			}
		}
		function Cf() {
			function e(e) {
				e.canIntercept && e.info === "react-transition" && e.intercept({
					handler: function() {
						return new Promise(function(e) {
							return i = e;
						});
					},
					focusReset: "manual",
					scroll: "manual"
				});
			}
			function t() {
				i !== null && (i(), i = null), r || setTimeout(n, 20);
			}
			function n() {
				if (!r && !navigation.transition) {
					var e = navigation.currentEntry;
					e && e.url != null && navigation.navigate(e.url, {
						state: e.getState(),
						info: "react-transition",
						history: "replace"
					});
				}
			}
			if (typeof navigation == "object") {
				var r = !1, i = null;
				return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
					r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
				};
			}
		}
		function wf(e) {
			this._internalRoot = e;
		}
		function Tf(e) {
			this._internalRoot = e;
		}
		function Ef(e) {
			e[Jp] && (e._reactRootContainer ? console.error("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : console.error("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var Df = y(), Of = d("react"), kf = d("react-dom"), z = Object.assign, Af = Symbol.for("react.element"), jf = Symbol.for("react.transitional.element"), Mf = Symbol.for("react.portal"), Nf = Symbol.for("react.fragment"), Pf = Symbol.for("react.strict_mode"), Ff = Symbol.for("react.profiler"), If = Symbol.for("react.consumer"), Lf = Symbol.for("react.context"), Rf = Symbol.for("react.forward_ref"), zf = Symbol.for("react.suspense"), Bf = Symbol.for("react.suspense_list"), Vf = Symbol.for("react.memo"), Hf = Symbol.for("react.lazy"), Uf = Symbol.for("react.activity"), Wf = Symbol.for("react.memo_cache_sentinel"), Gf = Symbol.iterator, Kf = Symbol.for("react.client.reference"), qf = Array.isArray, B = Of.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Jf = kf.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Yf = Object.freeze({
			pending: !1,
			data: null,
			method: null,
			action: null
		}), Xf = [], Zf = [], Qf = -1, $f = oe(null), ep = oe(null), tp = oe(null), np = oe(null), rp = 0, ip, ap, op, sp, cp, lp, up;
		pe.__reactDisabledLog = !0;
		var dp, fp, pp = !1, mp = new (typeof WeakMap == "function" ? WeakMap : Map)(), hp = null, gp = !1, _p = Object.prototype.hasOwnProperty, vp = Df.unstable_scheduleCallback, yp = Df.unstable_cancelCallback, bp = Df.unstable_shouldYield, xp = Df.unstable_requestPaint, Sp = Df.unstable_now, Cp = Df.unstable_getCurrentPriorityLevel, wp = Df.unstable_ImmediatePriority, Tp = Df.unstable_UserBlockingPriority, Ep = Df.unstable_NormalPriority, Dp = Df.unstable_LowPriority, Op = Df.unstable_IdlePriority, kp = Df.log, Ap = Df.unstable_setDisableYieldValue, jp = null, Mp = null, Np = !1, Pp = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Fp = Math.clz32 ? Math.clz32 : Ne, Ip = Math.log, Lp = Math.LN2, Rp = 256, zp = 262144, Bp = 4194304, Vp = 2, Hp = 8, Up = 32, Wp = 268435456, Gp = Math.random().toString(36).slice(2), Kp = "__reactFiber$" + Gp, qp = "__reactProps$" + Gp, Jp = "__reactContainer$" + Gp, Yp = "__reactEvents$" + Gp, Xp = "__reactListeners$" + Gp, Zp = "__reactHandles$" + Gp, Qp = "__reactResources$" + Gp, $p = "__reactMarker$" + Gp, em = /* @__PURE__ */ new Set(), tm = {}, nm = {}, rm = {
			button: !0,
			checkbox: !0,
			image: !0,
			hidden: !0,
			radio: !0,
			reset: !0,
			submit: !0
		}, im = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), am = {}, om = {}, sm = /[\n"\\]/g, cm = !1, lm = !1, um = !1, dm = !1, fm = !1, pm = !1, mm = ["value", "defaultValue"], hm = !1, gm = /["'&<>\n\t]|^\s|\s$/, _m = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(" "), vm = "applet caption html table td th marquee object template foreignObject desc title".split(" "), ym = vm.concat(["button"]), bm = "dd dt li option optgroup p rp rt".split(" "), xm = {
			current: null,
			formTag: null,
			aTagInScope: null,
			buttonTagInScope: null,
			nobrTagInScope: null,
			pTagInButtonScope: null,
			listItemTagAutoclosing: null,
			dlItemTagAutoclosing: null,
			containerTagInScope: null,
			implicitRootScope: !1
		}, Sm = {}, Cm = {
			animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(" "),
			background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(" "),
			backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
			border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(" "),
			borderBlockEnd: [
				"borderBlockEndColor",
				"borderBlockEndStyle",
				"borderBlockEndWidth"
			],
			borderBlockStart: [
				"borderBlockStartColor",
				"borderBlockStartStyle",
				"borderBlockStartWidth"
			],
			borderBottom: [
				"borderBottomColor",
				"borderBottomStyle",
				"borderBottomWidth"
			],
			borderColor: [
				"borderBottomColor",
				"borderLeftColor",
				"borderRightColor",
				"borderTopColor"
			],
			borderImage: [
				"borderImageOutset",
				"borderImageRepeat",
				"borderImageSlice",
				"borderImageSource",
				"borderImageWidth"
			],
			borderInlineEnd: [
				"borderInlineEndColor",
				"borderInlineEndStyle",
				"borderInlineEndWidth"
			],
			borderInlineStart: [
				"borderInlineStartColor",
				"borderInlineStartStyle",
				"borderInlineStartWidth"
			],
			borderLeft: [
				"borderLeftColor",
				"borderLeftStyle",
				"borderLeftWidth"
			],
			borderRadius: [
				"borderBottomLeftRadius",
				"borderBottomRightRadius",
				"borderTopLeftRadius",
				"borderTopRightRadius"
			],
			borderRight: [
				"borderRightColor",
				"borderRightStyle",
				"borderRightWidth"
			],
			borderStyle: [
				"borderBottomStyle",
				"borderLeftStyle",
				"borderRightStyle",
				"borderTopStyle"
			],
			borderTop: [
				"borderTopColor",
				"borderTopStyle",
				"borderTopWidth"
			],
			borderWidth: [
				"borderBottomWidth",
				"borderLeftWidth",
				"borderRightWidth",
				"borderTopWidth"
			],
			columnRule: [
				"columnRuleColor",
				"columnRuleStyle",
				"columnRuleWidth"
			],
			columns: ["columnCount", "columnWidth"],
			flex: [
				"flexBasis",
				"flexGrow",
				"flexShrink"
			],
			flexFlow: ["flexDirection", "flexWrap"],
			font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(" "),
			fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(" "),
			gap: ["columnGap", "rowGap"],
			grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(" "),
			gridArea: [
				"gridColumnEnd",
				"gridColumnStart",
				"gridRowEnd",
				"gridRowStart"
			],
			gridColumn: ["gridColumnEnd", "gridColumnStart"],
			gridColumnGap: ["columnGap"],
			gridGap: ["columnGap", "rowGap"],
			gridRow: ["gridRowEnd", "gridRowStart"],
			gridRowGap: ["rowGap"],
			gridTemplate: [
				"gridTemplateAreas",
				"gridTemplateColumns",
				"gridTemplateRows"
			],
			listStyle: [
				"listStyleImage",
				"listStylePosition",
				"listStyleType"
			],
			margin: [
				"marginBottom",
				"marginLeft",
				"marginRight",
				"marginTop"
			],
			marker: [
				"markerEnd",
				"markerMid",
				"markerStart"
			],
			mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(" "),
			maskPosition: ["maskPositionX", "maskPositionY"],
			outline: [
				"outlineColor",
				"outlineStyle",
				"outlineWidth"
			],
			overflow: ["overflowX", "overflowY"],
			padding: [
				"paddingBottom",
				"paddingLeft",
				"paddingRight",
				"paddingTop"
			],
			placeContent: ["alignContent", "justifyContent"],
			placeItems: ["alignItems", "justifyItems"],
			placeSelf: ["alignSelf", "justifySelf"],
			textDecoration: [
				"textDecorationColor",
				"textDecorationLine",
				"textDecorationStyle"
			],
			textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
			transition: [
				"transitionDelay",
				"transitionDuration",
				"transitionProperty",
				"transitionTimingFunction"
			],
			wordWrap: ["overflowWrap"]
		}, wm = /([A-Z])/g, Tm = /^ms-/, Em = /^(?:webkit|moz|o)[A-Z]/, Dm = /^-ms-/, Om = /-(.)/g, km = /;\s*$/, Am = {}, jm = {}, Mm = !1, Nm = !1, Pm = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Fm = "http://www.w3.org/1998/Math/MathML", Im = "http://www.w3.org/2000/svg", Lm = new Map([
			["acceptCharset", "accept-charset"],
			["htmlFor", "for"],
			["httpEquiv", "http-equiv"],
			["crossOrigin", "crossorigin"],
			["accentHeight", "accent-height"],
			["alignmentBaseline", "alignment-baseline"],
			["arabicForm", "arabic-form"],
			["baselineShift", "baseline-shift"],
			["capHeight", "cap-height"],
			["clipPath", "clip-path"],
			["clipRule", "clip-rule"],
			["colorInterpolation", "color-interpolation"],
			["colorInterpolationFilters", "color-interpolation-filters"],
			["colorProfile", "color-profile"],
			["colorRendering", "color-rendering"],
			["dominantBaseline", "dominant-baseline"],
			["enableBackground", "enable-background"],
			["fillOpacity", "fill-opacity"],
			["fillRule", "fill-rule"],
			["floodColor", "flood-color"],
			["floodOpacity", "flood-opacity"],
			["fontFamily", "font-family"],
			["fontSize", "font-size"],
			["fontSizeAdjust", "font-size-adjust"],
			["fontStretch", "font-stretch"],
			["fontStyle", "font-style"],
			["fontVariant", "font-variant"],
			["fontWeight", "font-weight"],
			["glyphName", "glyph-name"],
			["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
			["glyphOrientationVertical", "glyph-orientation-vertical"],
			["horizAdvX", "horiz-adv-x"],
			["horizOriginX", "horiz-origin-x"],
			["imageRendering", "image-rendering"],
			["letterSpacing", "letter-spacing"],
			["lightingColor", "lighting-color"],
			["markerEnd", "marker-end"],
			["markerMid", "marker-mid"],
			["markerStart", "marker-start"],
			["overlinePosition", "overline-position"],
			["overlineThickness", "overline-thickness"],
			["paintOrder", "paint-order"],
			["panose-1", "panose-1"],
			["pointerEvents", "pointer-events"],
			["renderingIntent", "rendering-intent"],
			["shapeRendering", "shape-rendering"],
			["stopColor", "stop-color"],
			["stopOpacity", "stop-opacity"],
			["strikethroughPosition", "strikethrough-position"],
			["strikethroughThickness", "strikethrough-thickness"],
			["strokeDasharray", "stroke-dasharray"],
			["strokeDashoffset", "stroke-dashoffset"],
			["strokeLinecap", "stroke-linecap"],
			["strokeLinejoin", "stroke-linejoin"],
			["strokeMiterlimit", "stroke-miterlimit"],
			["strokeOpacity", "stroke-opacity"],
			["strokeWidth", "stroke-width"],
			["textAnchor", "text-anchor"],
			["textDecoration", "text-decoration"],
			["textRendering", "text-rendering"],
			["transformOrigin", "transform-origin"],
			["underlinePosition", "underline-position"],
			["underlineThickness", "underline-thickness"],
			["unicodeBidi", "unicode-bidi"],
			["unicodeRange", "unicode-range"],
			["unitsPerEm", "units-per-em"],
			["vAlphabetic", "v-alphabetic"],
			["vHanging", "v-hanging"],
			["vIdeographic", "v-ideographic"],
			["vMathematical", "v-mathematical"],
			["vectorEffect", "vector-effect"],
			["vertAdvY", "vert-adv-y"],
			["vertOriginX", "vert-origin-x"],
			["vertOriginY", "vert-origin-y"],
			["wordSpacing", "word-spacing"],
			["writingMode", "writing-mode"],
			["xmlnsXlink", "xmlns:xlink"],
			["xHeight", "x-height"]
		]), Rm = {
			accept: "accept",
			acceptcharset: "acceptCharset",
			"accept-charset": "acceptCharset",
			accesskey: "accessKey",
			action: "action",
			allowfullscreen: "allowFullScreen",
			alt: "alt",
			as: "as",
			async: "async",
			autocapitalize: "autoCapitalize",
			autocomplete: "autoComplete",
			autocorrect: "autoCorrect",
			autofocus: "autoFocus",
			autoplay: "autoPlay",
			autosave: "autoSave",
			capture: "capture",
			cellpadding: "cellPadding",
			cellspacing: "cellSpacing",
			challenge: "challenge",
			charset: "charSet",
			checked: "checked",
			children: "children",
			cite: "cite",
			class: "className",
			classid: "classID",
			classname: "className",
			cols: "cols",
			colspan: "colSpan",
			content: "content",
			contenteditable: "contentEditable",
			contextmenu: "contextMenu",
			controls: "controls",
			controlslist: "controlsList",
			coords: "coords",
			crossorigin: "crossOrigin",
			dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
			data: "data",
			datetime: "dateTime",
			default: "default",
			defaultchecked: "defaultChecked",
			defaultvalue: "defaultValue",
			defer: "defer",
			dir: "dir",
			disabled: "disabled",
			disablepictureinpicture: "disablePictureInPicture",
			disableremoteplayback: "disableRemotePlayback",
			download: "download",
			draggable: "draggable",
			enctype: "encType",
			enterkeyhint: "enterKeyHint",
			fetchpriority: "fetchPriority",
			for: "htmlFor",
			form: "form",
			formmethod: "formMethod",
			formaction: "formAction",
			formenctype: "formEncType",
			formnovalidate: "formNoValidate",
			formtarget: "formTarget",
			frameborder: "frameBorder",
			headers: "headers",
			height: "height",
			hidden: "hidden",
			high: "high",
			href: "href",
			hreflang: "hrefLang",
			htmlfor: "htmlFor",
			httpequiv: "httpEquiv",
			"http-equiv": "httpEquiv",
			icon: "icon",
			id: "id",
			imagesizes: "imageSizes",
			imagesrcset: "imageSrcSet",
			inert: "inert",
			innerhtml: "innerHTML",
			inputmode: "inputMode",
			integrity: "integrity",
			is: "is",
			itemid: "itemID",
			itemprop: "itemProp",
			itemref: "itemRef",
			itemscope: "itemScope",
			itemtype: "itemType",
			keyparams: "keyParams",
			keytype: "keyType",
			kind: "kind",
			label: "label",
			lang: "lang",
			list: "list",
			loop: "loop",
			low: "low",
			manifest: "manifest",
			marginwidth: "marginWidth",
			marginheight: "marginHeight",
			max: "max",
			maxlength: "maxLength",
			media: "media",
			mediagroup: "mediaGroup",
			method: "method",
			min: "min",
			minlength: "minLength",
			multiple: "multiple",
			muted: "muted",
			name: "name",
			nomodule: "noModule",
			nonce: "nonce",
			novalidate: "noValidate",
			open: "open",
			optimum: "optimum",
			pattern: "pattern",
			placeholder: "placeholder",
			playsinline: "playsInline",
			poster: "poster",
			preload: "preload",
			profile: "profile",
			radiogroup: "radioGroup",
			readonly: "readOnly",
			referrerpolicy: "referrerPolicy",
			rel: "rel",
			required: "required",
			reversed: "reversed",
			role: "role",
			rows: "rows",
			rowspan: "rowSpan",
			sandbox: "sandbox",
			scope: "scope",
			scoped: "scoped",
			scrolling: "scrolling",
			seamless: "seamless",
			selected: "selected",
			shape: "shape",
			size: "size",
			sizes: "sizes",
			span: "span",
			spellcheck: "spellCheck",
			src: "src",
			srcdoc: "srcDoc",
			srclang: "srcLang",
			srcset: "srcSet",
			start: "start",
			step: "step",
			style: "style",
			summary: "summary",
			tabindex: "tabIndex",
			target: "target",
			title: "title",
			type: "type",
			usemap: "useMap",
			value: "value",
			width: "width",
			wmode: "wmode",
			wrap: "wrap",
			about: "about",
			accentheight: "accentHeight",
			"accent-height": "accentHeight",
			accumulate: "accumulate",
			additive: "additive",
			alignmentbaseline: "alignmentBaseline",
			"alignment-baseline": "alignmentBaseline",
			allowreorder: "allowReorder",
			alphabetic: "alphabetic",
			amplitude: "amplitude",
			arabicform: "arabicForm",
			"arabic-form": "arabicForm",
			ascent: "ascent",
			attributename: "attributeName",
			attributetype: "attributeType",
			autoreverse: "autoReverse",
			azimuth: "azimuth",
			basefrequency: "baseFrequency",
			baselineshift: "baselineShift",
			"baseline-shift": "baselineShift",
			baseprofile: "baseProfile",
			bbox: "bbox",
			begin: "begin",
			bias: "bias",
			by: "by",
			calcmode: "calcMode",
			capheight: "capHeight",
			"cap-height": "capHeight",
			clip: "clip",
			clippath: "clipPath",
			"clip-path": "clipPath",
			clippathunits: "clipPathUnits",
			cliprule: "clipRule",
			"clip-rule": "clipRule",
			color: "color",
			colorinterpolation: "colorInterpolation",
			"color-interpolation": "colorInterpolation",
			colorinterpolationfilters: "colorInterpolationFilters",
			"color-interpolation-filters": "colorInterpolationFilters",
			colorprofile: "colorProfile",
			"color-profile": "colorProfile",
			colorrendering: "colorRendering",
			"color-rendering": "colorRendering",
			contentscripttype: "contentScriptType",
			contentstyletype: "contentStyleType",
			cursor: "cursor",
			cx: "cx",
			cy: "cy",
			d: "d",
			datatype: "datatype",
			decelerate: "decelerate",
			descent: "descent",
			diffuseconstant: "diffuseConstant",
			direction: "direction",
			display: "display",
			divisor: "divisor",
			dominantbaseline: "dominantBaseline",
			"dominant-baseline": "dominantBaseline",
			dur: "dur",
			dx: "dx",
			dy: "dy",
			edgemode: "edgeMode",
			elevation: "elevation",
			enablebackground: "enableBackground",
			"enable-background": "enableBackground",
			end: "end",
			exponent: "exponent",
			externalresourcesrequired: "externalResourcesRequired",
			fill: "fill",
			fillopacity: "fillOpacity",
			"fill-opacity": "fillOpacity",
			fillrule: "fillRule",
			"fill-rule": "fillRule",
			filter: "filter",
			filterres: "filterRes",
			filterunits: "filterUnits",
			floodopacity: "floodOpacity",
			"flood-opacity": "floodOpacity",
			floodcolor: "floodColor",
			"flood-color": "floodColor",
			focusable: "focusable",
			fontfamily: "fontFamily",
			"font-family": "fontFamily",
			fontsize: "fontSize",
			"font-size": "fontSize",
			fontsizeadjust: "fontSizeAdjust",
			"font-size-adjust": "fontSizeAdjust",
			fontstretch: "fontStretch",
			"font-stretch": "fontStretch",
			fontstyle: "fontStyle",
			"font-style": "fontStyle",
			fontvariant: "fontVariant",
			"font-variant": "fontVariant",
			fontweight: "fontWeight",
			"font-weight": "fontWeight",
			format: "format",
			from: "from",
			fx: "fx",
			fy: "fy",
			g1: "g1",
			g2: "g2",
			glyphname: "glyphName",
			"glyph-name": "glyphName",
			glyphorientationhorizontal: "glyphOrientationHorizontal",
			"glyph-orientation-horizontal": "glyphOrientationHorizontal",
			glyphorientationvertical: "glyphOrientationVertical",
			"glyph-orientation-vertical": "glyphOrientationVertical",
			glyphref: "glyphRef",
			gradienttransform: "gradientTransform",
			gradientunits: "gradientUnits",
			hanging: "hanging",
			horizadvx: "horizAdvX",
			"horiz-adv-x": "horizAdvX",
			horizoriginx: "horizOriginX",
			"horiz-origin-x": "horizOriginX",
			ideographic: "ideographic",
			imagerendering: "imageRendering",
			"image-rendering": "imageRendering",
			in2: "in2",
			in: "in",
			inlist: "inlist",
			intercept: "intercept",
			k1: "k1",
			k2: "k2",
			k3: "k3",
			k4: "k4",
			k: "k",
			kernelmatrix: "kernelMatrix",
			kernelunitlength: "kernelUnitLength",
			kerning: "kerning",
			keypoints: "keyPoints",
			keysplines: "keySplines",
			keytimes: "keyTimes",
			lengthadjust: "lengthAdjust",
			letterspacing: "letterSpacing",
			"letter-spacing": "letterSpacing",
			lightingcolor: "lightingColor",
			"lighting-color": "lightingColor",
			limitingconeangle: "limitingConeAngle",
			local: "local",
			markerend: "markerEnd",
			"marker-end": "markerEnd",
			markerheight: "markerHeight",
			markermid: "markerMid",
			"marker-mid": "markerMid",
			markerstart: "markerStart",
			"marker-start": "markerStart",
			markerunits: "markerUnits",
			markerwidth: "markerWidth",
			mask: "mask",
			maskcontentunits: "maskContentUnits",
			maskunits: "maskUnits",
			mathematical: "mathematical",
			mode: "mode",
			numoctaves: "numOctaves",
			offset: "offset",
			opacity: "opacity",
			operator: "operator",
			order: "order",
			orient: "orient",
			orientation: "orientation",
			origin: "origin",
			overflow: "overflow",
			overlineposition: "overlinePosition",
			"overline-position": "overlinePosition",
			overlinethickness: "overlineThickness",
			"overline-thickness": "overlineThickness",
			paintorder: "paintOrder",
			"paint-order": "paintOrder",
			panose1: "panose1",
			"panose-1": "panose1",
			pathlength: "pathLength",
			patterncontentunits: "patternContentUnits",
			patterntransform: "patternTransform",
			patternunits: "patternUnits",
			pointerevents: "pointerEvents",
			"pointer-events": "pointerEvents",
			points: "points",
			pointsatx: "pointsAtX",
			pointsaty: "pointsAtY",
			pointsatz: "pointsAtZ",
			popover: "popover",
			popovertarget: "popoverTarget",
			popovertargetaction: "popoverTargetAction",
			prefix: "prefix",
			preservealpha: "preserveAlpha",
			preserveaspectratio: "preserveAspectRatio",
			primitiveunits: "primitiveUnits",
			property: "property",
			r: "r",
			radius: "radius",
			refx: "refX",
			refy: "refY",
			renderingintent: "renderingIntent",
			"rendering-intent": "renderingIntent",
			repeatcount: "repeatCount",
			repeatdur: "repeatDur",
			requiredextensions: "requiredExtensions",
			requiredfeatures: "requiredFeatures",
			resource: "resource",
			restart: "restart",
			result: "result",
			results: "results",
			rotate: "rotate",
			rx: "rx",
			ry: "ry",
			scale: "scale",
			security: "security",
			seed: "seed",
			shaperendering: "shapeRendering",
			"shape-rendering": "shapeRendering",
			slope: "slope",
			spacing: "spacing",
			specularconstant: "specularConstant",
			specularexponent: "specularExponent",
			speed: "speed",
			spreadmethod: "spreadMethod",
			startoffset: "startOffset",
			stddeviation: "stdDeviation",
			stemh: "stemh",
			stemv: "stemv",
			stitchtiles: "stitchTiles",
			stopcolor: "stopColor",
			"stop-color": "stopColor",
			stopopacity: "stopOpacity",
			"stop-opacity": "stopOpacity",
			strikethroughposition: "strikethroughPosition",
			"strikethrough-position": "strikethroughPosition",
			strikethroughthickness: "strikethroughThickness",
			"strikethrough-thickness": "strikethroughThickness",
			string: "string",
			stroke: "stroke",
			strokedasharray: "strokeDasharray",
			"stroke-dasharray": "strokeDasharray",
			strokedashoffset: "strokeDashoffset",
			"stroke-dashoffset": "strokeDashoffset",
			strokelinecap: "strokeLinecap",
			"stroke-linecap": "strokeLinecap",
			strokelinejoin: "strokeLinejoin",
			"stroke-linejoin": "strokeLinejoin",
			strokemiterlimit: "strokeMiterlimit",
			"stroke-miterlimit": "strokeMiterlimit",
			strokewidth: "strokeWidth",
			"stroke-width": "strokeWidth",
			strokeopacity: "strokeOpacity",
			"stroke-opacity": "strokeOpacity",
			suppresscontenteditablewarning: "suppressContentEditableWarning",
			suppresshydrationwarning: "suppressHydrationWarning",
			surfacescale: "surfaceScale",
			systemlanguage: "systemLanguage",
			tablevalues: "tableValues",
			targetx: "targetX",
			targety: "targetY",
			textanchor: "textAnchor",
			"text-anchor": "textAnchor",
			textdecoration: "textDecoration",
			"text-decoration": "textDecoration",
			textlength: "textLength",
			textrendering: "textRendering",
			"text-rendering": "textRendering",
			to: "to",
			transform: "transform",
			transformorigin: "transformOrigin",
			"transform-origin": "transformOrigin",
			typeof: "typeof",
			u1: "u1",
			u2: "u2",
			underlineposition: "underlinePosition",
			"underline-position": "underlinePosition",
			underlinethickness: "underlineThickness",
			"underline-thickness": "underlineThickness",
			unicode: "unicode",
			unicodebidi: "unicodeBidi",
			"unicode-bidi": "unicodeBidi",
			unicoderange: "unicodeRange",
			"unicode-range": "unicodeRange",
			unitsperem: "unitsPerEm",
			"units-per-em": "unitsPerEm",
			unselectable: "unselectable",
			valphabetic: "vAlphabetic",
			"v-alphabetic": "vAlphabetic",
			values: "values",
			vectoreffect: "vectorEffect",
			"vector-effect": "vectorEffect",
			version: "version",
			vertadvy: "vertAdvY",
			"vert-adv-y": "vertAdvY",
			vertoriginx: "vertOriginX",
			"vert-origin-x": "vertOriginX",
			vertoriginy: "vertOriginY",
			"vert-origin-y": "vertOriginY",
			vhanging: "vHanging",
			"v-hanging": "vHanging",
			videographic: "vIdeographic",
			"v-ideographic": "vIdeographic",
			viewbox: "viewBox",
			viewtarget: "viewTarget",
			visibility: "visibility",
			vmathematical: "vMathematical",
			"v-mathematical": "vMathematical",
			vocab: "vocab",
			widths: "widths",
			wordspacing: "wordSpacing",
			"word-spacing": "wordSpacing",
			writingmode: "writingMode",
			"writing-mode": "writingMode",
			x1: "x1",
			x2: "x2",
			x: "x",
			xchannelselector: "xChannelSelector",
			xheight: "xHeight",
			"x-height": "xHeight",
			xlinkactuate: "xlinkActuate",
			"xlink:actuate": "xlinkActuate",
			xlinkarcrole: "xlinkArcrole",
			"xlink:arcrole": "xlinkArcrole",
			xlinkhref: "xlinkHref",
			"xlink:href": "xlinkHref",
			xlinkrole: "xlinkRole",
			"xlink:role": "xlinkRole",
			xlinkshow: "xlinkShow",
			"xlink:show": "xlinkShow",
			xlinktitle: "xlinkTitle",
			"xlink:title": "xlinkTitle",
			xlinktype: "xlinkType",
			"xlink:type": "xlinkType",
			xmlbase: "xmlBase",
			"xml:base": "xmlBase",
			xmllang: "xmlLang",
			"xml:lang": "xmlLang",
			xmlns: "xmlns",
			"xml:space": "xmlSpace",
			xmlnsxlink: "xmlnsXlink",
			"xmlns:xlink": "xmlnsXlink",
			xmlspace: "xmlSpace",
			y1: "y1",
			y2: "y2",
			y: "y",
			ychannelselector: "yChannelSelector",
			z: "z",
			zoomandpan: "zoomAndPan"
		}, zm = {
			"aria-current": 0,
			"aria-description": 0,
			"aria-details": 0,
			"aria-disabled": 0,
			"aria-hidden": 0,
			"aria-invalid": 0,
			"aria-keyshortcuts": 0,
			"aria-label": 0,
			"aria-roledescription": 0,
			"aria-autocomplete": 0,
			"aria-checked": 0,
			"aria-expanded": 0,
			"aria-haspopup": 0,
			"aria-level": 0,
			"aria-modal": 0,
			"aria-multiline": 0,
			"aria-multiselectable": 0,
			"aria-orientation": 0,
			"aria-placeholder": 0,
			"aria-pressed": 0,
			"aria-readonly": 0,
			"aria-required": 0,
			"aria-selected": 0,
			"aria-sort": 0,
			"aria-valuemax": 0,
			"aria-valuemin": 0,
			"aria-valuenow": 0,
			"aria-valuetext": 0,
			"aria-atomic": 0,
			"aria-busy": 0,
			"aria-live": 0,
			"aria-relevant": 0,
			"aria-dropeffect": 0,
			"aria-grabbed": 0,
			"aria-activedescendant": 0,
			"aria-colcount": 0,
			"aria-colindex": 0,
			"aria-colspan": 0,
			"aria-controls": 0,
			"aria-describedby": 0,
			"aria-errormessage": 0,
			"aria-flowto": 0,
			"aria-labelledby": 0,
			"aria-owns": 0,
			"aria-posinset": 0,
			"aria-rowcount": 0,
			"aria-rowindex": 0,
			"aria-rowspan": 0,
			"aria-setsize": 0,
			"aria-braillelabel": 0,
			"aria-brailleroledescription": 0,
			"aria-colindextext": 0,
			"aria-rowindextext": 0
		}, Bm = {}, Vm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Hm = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Um = !1, Wm = {}, Gm = /^on./, Km = /^on[^A-Z]/, qm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Jm = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ym = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, Xm = null, Zm = null, Qm = null, $m = !1, eh = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), th = !1;
		if (eh) try {
			var nh = {};
			Object.defineProperty(nh, "passive", { get: function() {
				th = !0;
			} }), window.addEventListener("test", nh, nh), window.removeEventListener("test", nh, nh);
		} catch {
			th = !1;
		}
		var rh = null, ih = null, ah = null, oh = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function(e) {
				return e.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0
		}, sh = yn(oh), ch = z({}, oh, {
			view: 0,
			detail: 0
		}), lh = yn(ch), uh, dh, fh, ph = z({}, ch, {
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			pageX: 0,
			pageY: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			getModifierState: xn,
			button: 0,
			buttons: 0,
			relatedTarget: function(e) {
				return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
			},
			movementX: function(e) {
				return "movementX" in e ? e.movementX : (e !== fh && (fh && e.type === "mousemove" ? (uh = e.screenX - fh.screenX, dh = e.screenY - fh.screenY) : dh = uh = 0, fh = e), uh);
			},
			movementY: function(e) {
				return "movementY" in e ? e.movementY : dh;
			}
		}), mh = yn(ph), hh = yn(z({}, ph, { dataTransfer: 0 })), gh = yn(z({}, ch, { relatedTarget: 0 })), _h = yn(z({}, oh, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), vh = yn(z({}, oh, { clipboardData: function(e) {
			return "clipboardData" in e ? e.clipboardData : window.clipboardData;
		} })), yh = yn(z({}, oh, { data: 0 })), bh = yh, xh = {
			Esc: "Escape",
			Spacebar: " ",
			Left: "ArrowLeft",
			Up: "ArrowUp",
			Right: "ArrowRight",
			Down: "ArrowDown",
			Del: "Delete",
			Win: "OS",
			Menu: "ContextMenu",
			Apps: "ContextMenu",
			Scroll: "ScrollLock",
			MozPrintableKey: "Unidentified"
		}, Sh = {
			8: "Backspace",
			9: "Tab",
			12: "Clear",
			13: "Enter",
			16: "Shift",
			17: "Control",
			18: "Alt",
			19: "Pause",
			20: "CapsLock",
			27: "Escape",
			32: " ",
			33: "PageUp",
			34: "PageDown",
			35: "End",
			36: "Home",
			37: "ArrowLeft",
			38: "ArrowUp",
			39: "ArrowRight",
			40: "ArrowDown",
			45: "Insert",
			46: "Delete",
			112: "F1",
			113: "F2",
			114: "F3",
			115: "F4",
			116: "F5",
			117: "F6",
			118: "F7",
			119: "F8",
			120: "F9",
			121: "F10",
			122: "F11",
			123: "F12",
			144: "NumLock",
			145: "ScrollLock",
			224: "Meta"
		}, Ch = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey"
		}, wh = yn(z({}, ch, {
			key: function(e) {
				if (e.key) {
					var t = xh[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? (e = gn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Sh[e.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: xn,
			charCode: function(e) {
				return e.type === "keypress" ? gn(e) : 0;
			},
			keyCode: function(e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function(e) {
				return e.type === "keypress" ? gn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			}
		})), Th = yn(z({}, ph, {
			pointerId: 0,
			width: 0,
			height: 0,
			pressure: 0,
			tangentialPressure: 0,
			tiltX: 0,
			tiltY: 0,
			twist: 0,
			pointerType: 0,
			isPrimary: 0
		})), Eh = yn(z({}, ch, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: xn
		})), Dh = yn(z({}, oh, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), Oh = yn(z({}, ph, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		})), kh = yn(z({}, oh, {
			newState: 0,
			oldState: 0
		})), Ah = [
			9,
			13,
			27,
			32
		], jh = 229, Mh = eh && "CompositionEvent" in window, Nh = null;
		eh && "documentMode" in document && (Nh = document.documentMode);
		var Ph = eh && "TextEvent" in window && !Nh, Fh = eh && (!Mh || Nh && 8 < Nh && 11 >= Nh), Ih = 32, Lh = String.fromCharCode(Ih), Rh = !1, zh = !1, Bh = {
			color: !0,
			date: !0,
			datetime: !0,
			"datetime-local": !0,
			email: !0,
			month: !0,
			number: !0,
			password: !0,
			range: !0,
			search: !0,
			tel: !0,
			text: !0,
			time: !0,
			url: !0,
			week: !0
		}, Vh = null, Hh = null, Uh = !1;
		eh && (Uh = Dn("input") && (!document.documentMode || 9 < document.documentMode));
		var Wh = typeof Object.is == "function" ? Object.is : Rn, Gh = eh && "documentMode" in document && 11 >= document.documentMode, Kh = null, qh = null, Jh = null, Yh = !1, Xh = {
			animationend: Kn("Animation", "AnimationEnd"),
			animationiteration: Kn("Animation", "AnimationIteration"),
			animationstart: Kn("Animation", "AnimationStart"),
			transitionrun: Kn("Transition", "TransitionRun"),
			transitionstart: Kn("Transition", "TransitionStart"),
			transitioncancel: Kn("Transition", "TransitionCancel"),
			transitionend: Kn("Transition", "TransitionEnd")
		}, Zh = {}, Qh = {};
		eh && (Qh = document.createElement("div").style, "AnimationEvent" in window || (delete Xh.animationend.animation, delete Xh.animationiteration.animation, delete Xh.animationstart.animation), "TransitionEvent" in window || delete Xh.transitionend.transition);
		var $h = qn("animationend"), eg = qn("animationiteration"), tg = qn("animationstart"), ng = qn("transitionrun"), rg = qn("transitionstart"), ig = qn("transitioncancel"), ag = qn("transitionend"), og = /* @__PURE__ */ new Map(), sg = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
		sg.push("scrollEnd");
		var cg = 0;
		if (typeof performance == "object" && typeof performance.now == "function") var lg = performance, ug = function() {
			return lg.now();
		};
		else {
			var dg = Date;
			ug = function() {
				return dg.now();
			};
		}
		var fg = typeof reportError == "function" ? reportError : function(e) {
			if (typeof window == "object" && typeof window.ErrorEvent == "function") {
				var t = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
					error: e
				});
				if (!window.dispatchEvent(t)) return;
			} else if (typeof process == "object" && typeof process.emit == "function") {
				process.emit("uncaughtException", e);
				return;
			}
			console.error(e);
		}, pg = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.", mg = 0, hg = 1, gg = 2, _g = 3, vg = "–\xA0", yg = "+\xA0", bg = " \xA0", xg = typeof console < "u" && typeof console.timeStamp == "function" && typeof performance < "u" && typeof performance.measure == "function", Sg = "Components ⚛", V = "Scheduler ⚛", H = "Blocking", Cg = !1, wg = {
			color: "primary",
			properties: null,
			tooltipText: "",
			track: Sg
		}, Tg = {
			start: -0,
			end: -0,
			detail: { devtools: wg }
		}, Eg = ["Changed Props", ""], Dg = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.", Og = ["Changed Props", Dg], kg = 1, Ag = 2, jg = [], Mg = 0, Ng = 0, Pg = {};
		Object.freeze(Pg);
		var Fg = null, Ig = null, U = 0, Lg = 1, W = 2, Rg = 8, zg = 16, Bg = 32, Vg = !1;
		try {
			var Hg = Object.preventExtensions({});
			new Map([[Hg, null]]), new Set([Hg]);
		} catch {
			Vg = !0;
		}
		var Ug = /* @__PURE__ */ new WeakMap(), Wg = [], Gg = 0, Kg = null, qg = 0, Jg = [], Yg = 0, Xg = null, Zg = 1, Qg = "", $g = null, e_ = null, G = !1, t_ = !1, n_ = null, r_ = null, i_ = !1, a_ = Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), o_ = oe(null), s_ = oe(null), c_ = {}, l_ = null, u_ = null, d_ = !1, f_ = typeof AbortController < "u" ? AbortController : function() {
			var e = [], t = this.signal = {
				aborted: !1,
				addEventListener: function(t, n) {
					e.push(n);
				}
			};
			this.abort = function() {
				t.aborted = !0, e.forEach(function(e) {
					return e();
				});
			};
		}, p_ = Df.unstable_scheduleCallback, m_ = Df.unstable_NormalPriority, h_ = {
			$$typeof: Lf,
			Consumer: null,
			Provider: null,
			_currentValue: null,
			_currentValue2: null,
			_threadCount: 0,
			_currentRenderer: null,
			_currentRenderer2: null
		}, g_ = Df.unstable_now, __ = console.createTask ? console.createTask : function() {
			return null;
		}, v_ = 1, y_ = 2, b_ = -0, x_ = -0, S_ = -0, C_ = null, w_ = -1.1, T_ = -0, E_ = -0, K = -1.1, q = -1.1, D_ = null, O_ = !1, k_ = -0, A_ = -1.1, j_ = null, M_ = 0, N_ = null, P_ = null, F_ = -1.1, I_ = null, L_ = -1.1, R_ = -1.1, z_ = -0, B_ = -1.1, V_ = -1.1, H_ = 0, U_ = null, W_ = null, G_ = null, K_ = -1.1, q_ = null, J_ = -1.1, Y_ = -1.1, X_ = -0, Z_ = -0, Q_ = 0, $_ = null, ev = 0, tv = -1.1, nv = !1, rv = !1, iv = null, av = 0, ov = 0, sv = null, cv = B.S;
		B.S = function(e, t) {
			if (_x = Sp(), typeof t == "object" && t && typeof t.then == "function") {
				if (0 > B_ && 0 > V_) {
					B_ = g_();
					var n = Ku(), r = Gu();
					(n !== J_ || r !== q_) && (J_ = -1.1), K_ = n, q_ = r;
				}
				Mi(e, t);
			}
			cv !== null && cv(e, t);
		};
		var lv = oe(null), uv = {
			recordUnsafeLifecycleWarnings: function() {},
			flushPendingUnsafeLifecycleWarnings: function() {},
			recordLegacyContextWarning: function() {},
			flushLegacyContextWarning: function() {},
			discardPendingWarnings: function() {}
		}, dv = [], fv = [], pv = [], mv = [], hv = [], gv = [], _v = /* @__PURE__ */ new Set();
		uv.recordUnsafeLifecycleWarnings = function(e, t) {
			_v.has(e.type) || (typeof t.componentWillMount == "function" && !0 !== t.componentWillMount.__suppressDeprecationWarning && dv.push(e), e.mode & Rg && typeof t.UNSAFE_componentWillMount == "function" && fv.push(e), typeof t.componentWillReceiveProps == "function" && !0 !== t.componentWillReceiveProps.__suppressDeprecationWarning && pv.push(e), e.mode & Rg && typeof t.UNSAFE_componentWillReceiveProps == "function" && mv.push(e), typeof t.componentWillUpdate == "function" && !0 !== t.componentWillUpdate.__suppressDeprecationWarning && hv.push(e), e.mode & Rg && typeof t.UNSAFE_componentWillUpdate == "function" && gv.push(e));
		}, uv.flushPendingUnsafeLifecycleWarnings = function() {
			var e = /* @__PURE__ */ new Set();
			0 < dv.length && (dv.forEach(function(t) {
				e.add(C(t) || "Component"), _v.add(t.type);
			}), dv = []);
			var t = /* @__PURE__ */ new Set();
			0 < fv.length && (fv.forEach(function(e) {
				t.add(C(e) || "Component"), _v.add(e.type);
			}), fv = []);
			var n = /* @__PURE__ */ new Set();
			0 < pv.length && (pv.forEach(function(e) {
				n.add(C(e) || "Component"), _v.add(e.type);
			}), pv = []);
			var r = /* @__PURE__ */ new Set();
			0 < mv.length && (mv.forEach(function(e) {
				r.add(C(e) || "Component"), _v.add(e.type);
			}), mv = []);
			var i = /* @__PURE__ */ new Set();
			0 < hv.length && (hv.forEach(function(e) {
				i.add(C(e) || "Component"), _v.add(e.type);
			}), hv = []);
			var a = /* @__PURE__ */ new Set();
			if (0 < gv.length && (gv.forEach(function(e) {
				a.add(C(e) || "Component"), _v.add(e.type);
			}), gv = []), 0 < t.size) {
				var o = p(t);
				console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", o);
			}
			0 < r.size && (o = p(r), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", o)), 0 < a.size && (o = p(a), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", o)), 0 < e.size && (o = p(e), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < n.size && (o = p(n), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < i.size && (o = p(i), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o));
		};
		var vv = /* @__PURE__ */ new Map(), yv = /* @__PURE__ */ new Set();
		uv.recordLegacyContextWarning = function(e, t) {
			for (var n = null, r = e; r !== null;) r.mode & Rg && (n = r), r = r.return;
			n === null ? console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.") : !yv.has(e.type) && (r = vv.get(n), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (r === void 0 && (r = [], vv.set(n, r)), r.push(e));
		}, uv.flushLegacyContextWarning = function() {
			vv.forEach(function(e) {
				if (e.length !== 0) {
					var t = e[0], n = /* @__PURE__ */ new Set();
					e.forEach(function(e) {
						n.add(C(e) || "Component"), yv.add(e.type);
					});
					var r = p(n);
					E(t, function() {
						console.error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context", r);
					});
				}
			});
		}, uv.discardPendingWarnings = function() {
			dv = [], fv = [], pv = [], mv = [], hv = [], gv = [], vv = /* @__PURE__ */ new Map();
		};
		var bv = { react_stack_bottom_frame: function(e, t, n) {
			var r = gp;
			gp = !0;
			try {
				return e(t, n);
			} finally {
				gp = r;
			}
		} }, xv = bv.react_stack_bottom_frame.bind(bv), Sv = { react_stack_bottom_frame: function(e) {
			var t = gp;
			gp = !0;
			try {
				return e.render();
			} finally {
				gp = t;
			}
		} }, Cv = Sv.react_stack_bottom_frame.bind(Sv), wv = { react_stack_bottom_frame: function(e, t) {
			try {
				t.componentDidMount();
			} catch (t) {
				N(e, e.return, t);
			}
		} }, Tv = wv.react_stack_bottom_frame.bind(wv), Ev = { react_stack_bottom_frame: function(e, t, n, r, i) {
			try {
				t.componentDidUpdate(n, r, i);
			} catch (t) {
				N(e, e.return, t);
			}
		} }, Dv = Ev.react_stack_bottom_frame.bind(Ev), Ov = { react_stack_bottom_frame: function(e, t) {
			var n = t.stack;
			e.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		} }, kv = Ov.react_stack_bottom_frame.bind(Ov), Av = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n.componentWillUnmount();
			} catch (n) {
				N(e, t, n);
			}
		} }, jv = Av.react_stack_bottom_frame.bind(Av), Mv = { react_stack_bottom_frame: function(e) {
			var t = e.create;
			return e = e.inst, t = t(), e.destroy = t;
		} }, Nv = Mv.react_stack_bottom_frame.bind(Mv), Pv = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n();
			} catch (n) {
				N(e, t, n);
			}
		} }, Fv = Pv.react_stack_bottom_frame.bind(Pv), Iv = { react_stack_bottom_frame: function(e) {
			var t = e._init;
			return t(e._payload);
		} }, Lv = Iv.react_stack_bottom_frame.bind(Iv), Rv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), zv = Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), Bv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."), Vv = { then: function() {
			console.error("Internal React error: A listener was unexpectedly attached to a \"noop\" thenable. This is a bug in React. Please file an issue.");
		} }, Hv = null, Uv = !1, Wv = null, Gv = 0, J = null, Kv, qv = Kv = !1, Jv = {}, Yv = {}, Xv = {};
		f = function(e, t, n) {
			if (typeof n == "object" && n && n._store && (!n._store.validated && n.key == null || n._store.validated === 2)) {
				if (typeof n._store != "object") throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
				n._store.validated = 1;
				var r = C(e), i = r || "null";
				if (!Jv[i]) {
					Jv[i] = !0, n = n._owner, e = e._debugOwner;
					var a = "";
					e && typeof e.tag == "number" && (i = C(e)) && (a = "\n\nCheck the render method of `" + i + "`."), a || r && (a = "\n\nCheck the top-level render call using <" + r + ">.");
					var o = "";
					n != null && e !== n && (r = null, typeof n.tag == "number" ? r = C(n) : typeof n.name == "string" && (r = n.name), r && (o = " It was passed a child from " + r + ".")), E(t, function() {
						console.error("Each child in a list should have a unique \"key\" prop.%s%s See https://react.dev/link/warning-keys for more information.", a, o);
					});
				}
			}
		};
		var Zv = $i(!0), Qv = $i(!1), $v = 0, ey = 1, ty = 2, ny = 3, ry = !1, iy = !1, ay = null, oy = !1, sy = oe(null), cy = oe(0), ly = oe(null), uy = null, dy = 1, fy = 2, py = oe(0), my = 0, hy = 1, gy = 2, _y = 4, vy = 8, yy, by = /* @__PURE__ */ new Set(), xy = /* @__PURE__ */ new Set(), Sy = /* @__PURE__ */ new Set(), Cy = /* @__PURE__ */ new Set(), wy = 0, Y = null, Ty = null, Ey = null, Dy = !1, Oy = !1, ky = !1, Ay = 0, jy = 0, My = null, Ny = 0, Py = 25, X = null, Fy = null, Iy = -1, Ly = !1, Ry = {
			readContext: si,
			use: Fa,
			useCallback: Ca,
			useContext: Ca,
			useEffect: Ca,
			useImperativeHandle: Ca,
			useLayoutEffect: Ca,
			useInsertionEffect: Ca,
			useMemo: Ca,
			useReducer: Ca,
			useRef: Ca,
			useState: Ca,
			useDebugValue: Ca,
			useDeferredValue: Ca,
			useTransition: Ca,
			useSyncExternalStore: Ca,
			useId: Ca,
			useHostTransitionStatus: Ca,
			useFormState: Ca,
			useActionState: Ca,
			useOptimistic: Ca,
			useMemoCache: Ca,
			useCacheRefresh: Ca
		};
		Ry.useEffectEvent = Ca;
		var zy = null, By = null, Vy = null, Hy = null, Uy = null, Wy = null, Gy = null;
		zy = {
			readContext: function(e) {
				return si(e);
			},
			use: Fa,
			useCallback: function(e, t) {
				return X = "useCallback", k(), xa(t), To(e, t);
			},
			useContext: function(e) {
				return X = "useContext", k(), si(e);
			},
			useEffect: function(e, t) {
				return X = "useEffect", k(), xa(t), vo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", k(), xa(n), Co(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				X = "useInsertionEffect", k(), xa(t), go(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", k(), xa(t), xo(e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", k(), xa(t);
				var n = B.H;
				B.H = Uy;
				try {
					return Do(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", k();
				var r = B.H;
				B.H = Uy;
				try {
					return Ra(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function(e) {
				return X = "useRef", k(), ho(e);
			},
			useState: function(e) {
				X = "useState", k();
				var t = B.H;
				B.H = Uy;
				try {
					return Xa(e);
				} finally {
					B.H = t;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", k();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", k(), ko(e, t);
			},
			useTransition: function() {
				return X = "useTransition", k(), zo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", k(), Ha(e, t, n);
			},
			useId: function() {
				return X = "useId", k(), Uo();
			},
			useFormState: function(e, t) {
				return X = "useFormState", k(), Sa(), co(e, t);
			},
			useActionState: function(e, t) {
				return X = "useActionState", k(), co(e, t);
			},
			useOptimistic: function(e) {
				return X = "useOptimistic", k(), Za(e);
			},
			useHostTransitionStatus: Ho,
			useMemoCache: Ia,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", k(), Wo();
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", k(), bo(e);
			}
		}, By = {
			readContext: function(e) {
				return si(e);
			},
			use: Fa,
			useCallback: function(e, t) {
				return X = "useCallback", A(), To(e, t);
			},
			useContext: function(e) {
				return X = "useContext", A(), si(e);
			},
			useEffect: function(e, t) {
				return X = "useEffect", A(), vo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", A(), Co(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				X = "useInsertionEffect", A(), go(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", A(), xo(e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", A();
				var n = B.H;
				B.H = Uy;
				try {
					return Do(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", A();
				var r = B.H;
				B.H = Uy;
				try {
					return Ra(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function(e) {
				return X = "useRef", A(), ho(e);
			},
			useState: function(e) {
				X = "useState", A();
				var t = B.H;
				B.H = Uy;
				try {
					return Xa(e);
				} finally {
					B.H = t;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", A();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", A(), ko(e, t);
			},
			useTransition: function() {
				return X = "useTransition", A(), zo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", A(), Ha(e, t, n);
			},
			useId: function() {
				return X = "useId", A(), Uo();
			},
			useActionState: function(e, t) {
				return X = "useActionState", A(), co(e, t);
			},
			useFormState: function(e, t) {
				return X = "useFormState", A(), Sa(), co(e, t);
			},
			useOptimistic: function(e) {
				return X = "useOptimistic", A(), Za(e);
			},
			useHostTransitionStatus: Ho,
			useMemoCache: Ia,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", A(), Wo();
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", A(), bo(e);
			}
		}, Vy = {
			readContext: function(e) {
				return si(e);
			},
			use: Fa,
			useCallback: function(e, t) {
				return X = "useCallback", A(), Eo(e, t);
			},
			useContext: function(e) {
				return X = "useContext", A(), si(e);
			},
			useEffect: function(e, t) {
				X = "useEffect", A(), _o(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", A(), wo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return X = "useInsertionEffect", A(), _o(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", A(), _o(4, _y, e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", A();
				var n = B.H;
				B.H = Wy;
				try {
					return Oo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", A();
				var r = B.H;
				B.H = Wy;
				try {
					return za(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return X = "useRef", A(), j().memoizedState;
			},
			useState: function() {
				X = "useState", A();
				var e = B.H;
				B.H = Wy;
				try {
					return za(La);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", A();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", A(), Ao(e, t);
			},
			useTransition: function() {
				return X = "useTransition", A(), Bo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", A(), Ua(e, t, n);
			},
			useId: function() {
				return X = "useId", A(), j().memoizedState;
			},
			useFormState: function(e) {
				return X = "useFormState", A(), Sa(), lo(e);
			},
			useActionState: function(e) {
				return X = "useActionState", A(), lo(e);
			},
			useOptimistic: function(e, t) {
				return X = "useOptimistic", A(), Qa(e, t);
			},
			useHostTransitionStatus: Ho,
			useMemoCache: Ia,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", A(), j().memoizedState;
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", A(), M(e);
			}
		}, Hy = {
			readContext: function(e) {
				return si(e);
			},
			use: Fa,
			useCallback: function(e, t) {
				return X = "useCallback", A(), Eo(e, t);
			},
			useContext: function(e) {
				return X = "useContext", A(), si(e);
			},
			useEffect: function(e, t) {
				X = "useEffect", A(), _o(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", A(), wo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return X = "useInsertionEffect", A(), _o(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", A(), _o(4, _y, e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", A();
				var n = B.H;
				B.H = Gy;
				try {
					return Oo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", A();
				var r = B.H;
				B.H = Gy;
				try {
					return Va(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return X = "useRef", A(), j().memoizedState;
			},
			useState: function() {
				X = "useState", A();
				var e = B.H;
				B.H = Gy;
				try {
					return Va(La);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", A();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", A(), jo(e, t);
			},
			useTransition: function() {
				return X = "useTransition", A(), Vo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", A(), Ua(e, t, n);
			},
			useId: function() {
				return X = "useId", A(), j().memoizedState;
			},
			useFormState: function(e) {
				return X = "useFormState", A(), Sa(), po(e);
			},
			useActionState: function(e) {
				return X = "useActionState", A(), po(e);
			},
			useOptimistic: function(e, t) {
				return X = "useOptimistic", A(), eo(e, t);
			},
			useHostTransitionStatus: Ho,
			useMemoCache: Ia,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", A(), j().memoizedState;
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", A(), M(e);
			}
		}, Uy = {
			readContext: function(e) {
				return l(), si(e);
			},
			use: function(e) {
				return c(), Fa(e);
			},
			useCallback: function(e, t) {
				return X = "useCallback", c(), k(), To(e, t);
			},
			useContext: function(e) {
				return X = "useContext", c(), k(), si(e);
			},
			useEffect: function(e, t) {
				return X = "useEffect", c(), k(), vo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", c(), k(), Co(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				X = "useInsertionEffect", c(), k(), go(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", c(), k(), xo(e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", c(), k();
				var n = B.H;
				B.H = Uy;
				try {
					return Do(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", c(), k();
				var r = B.H;
				B.H = Uy;
				try {
					return Ra(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function(e) {
				return X = "useRef", c(), k(), ho(e);
			},
			useState: function(e) {
				X = "useState", c(), k();
				var t = B.H;
				B.H = Uy;
				try {
					return Xa(e);
				} finally {
					B.H = t;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", c(), k();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", c(), k(), ko(e, t);
			},
			useTransition: function() {
				return X = "useTransition", c(), k(), zo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", c(), k(), Ha(e, t, n);
			},
			useId: function() {
				return X = "useId", c(), k(), Uo();
			},
			useFormState: function(e, t) {
				return X = "useFormState", c(), k(), co(e, t);
			},
			useActionState: function(e, t) {
				return X = "useActionState", c(), k(), co(e, t);
			},
			useOptimistic: function(e) {
				return X = "useOptimistic", c(), k(), Za(e);
			},
			useMemoCache: function(e) {
				return c(), Ia(e);
			},
			useHostTransitionStatus: Ho,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", k(), Wo();
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", c(), k(), bo(e);
			}
		}, Wy = {
			readContext: function(e) {
				return l(), si(e);
			},
			use: function(e) {
				return c(), Fa(e);
			},
			useCallback: function(e, t) {
				return X = "useCallback", c(), A(), Eo(e, t);
			},
			useContext: function(e) {
				return X = "useContext", c(), A(), si(e);
			},
			useEffect: function(e, t) {
				X = "useEffect", c(), A(), _o(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", c(), A(), wo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return X = "useInsertionEffect", c(), A(), _o(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", c(), A(), _o(4, _y, e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", c(), A();
				var n = B.H;
				B.H = Wy;
				try {
					return Oo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", c(), A();
				var r = B.H;
				B.H = Wy;
				try {
					return za(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return X = "useRef", c(), A(), j().memoizedState;
			},
			useState: function() {
				X = "useState", c(), A();
				var e = B.H;
				B.H = Wy;
				try {
					return za(La);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", c(), A();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", c(), A(), Ao(e, t);
			},
			useTransition: function() {
				return X = "useTransition", c(), A(), Bo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", c(), A(), Ua(e, t, n);
			},
			useId: function() {
				return X = "useId", c(), A(), j().memoizedState;
			},
			useFormState: function(e) {
				return X = "useFormState", c(), A(), lo(e);
			},
			useActionState: function(e) {
				return X = "useActionState", c(), A(), lo(e);
			},
			useOptimistic: function(e, t) {
				return X = "useOptimistic", c(), A(), Qa(e, t);
			},
			useMemoCache: function(e) {
				return c(), Ia(e);
			},
			useHostTransitionStatus: Ho,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", A(), j().memoizedState;
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", c(), A(), M(e);
			}
		}, Gy = {
			readContext: function(e) {
				return l(), si(e);
			},
			use: function(e) {
				return c(), Fa(e);
			},
			useCallback: function(e, t) {
				return X = "useCallback", c(), A(), Eo(e, t);
			},
			useContext: function(e) {
				return X = "useContext", c(), A(), si(e);
			},
			useEffect: function(e, t) {
				X = "useEffect", c(), A(), _o(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", c(), A(), wo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return X = "useInsertionEffect", c(), A(), _o(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", c(), A(), _o(4, _y, e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", c(), A();
				var n = B.H;
				B.H = Wy;
				try {
					return Oo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", c(), A();
				var r = B.H;
				B.H = Wy;
				try {
					return Va(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return X = "useRef", c(), A(), j().memoizedState;
			},
			useState: function() {
				X = "useState", c(), A();
				var e = B.H;
				B.H = Wy;
				try {
					return Va(La);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", c(), A();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", c(), A(), jo(e, t);
			},
			useTransition: function() {
				return X = "useTransition", c(), A(), Vo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", c(), A(), Ua(e, t, n);
			},
			useId: function() {
				return X = "useId", c(), A(), j().memoizedState;
			},
			useFormState: function(e) {
				return X = "useFormState", c(), A(), po(e);
			},
			useActionState: function(e) {
				return X = "useActionState", c(), A(), po(e);
			},
			useOptimistic: function(e, t) {
				return X = "useOptimistic", c(), A(), eo(e, t);
			},
			useMemoCache: function(e) {
				return c(), Ia(e);
			},
			useHostTransitionStatus: Ho,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", A(), j().memoizedState;
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", c(), A(), M(e);
			}
		};
		var Ky = {}, qy = /* @__PURE__ */ new Set(), Jy = /* @__PURE__ */ new Set(), Yy = /* @__PURE__ */ new Set(), Xy = /* @__PURE__ */ new Set(), Zy = /* @__PURE__ */ new Set(), Qy = /* @__PURE__ */ new Set(), $y = /* @__PURE__ */ new Set(), eb = /* @__PURE__ */ new Set(), tb = /* @__PURE__ */ new Set(), nb = /* @__PURE__ */ new Set();
		Object.freeze(Ky);
		var rb = {
			enqueueSetState: function(e, t, n) {
				e = e._reactInternals;
				var r = rl(e), i = ra(r);
				i.payload = t, n != null && ($o(n), i.callback = n), t = ia(e, i, r), t !== null && (pi(r, "this.setState()", e), al(t, e, r), aa(t, e, r));
			},
			enqueueReplaceState: function(e, t, n) {
				e = e._reactInternals;
				var r = rl(e), i = ra(r);
				i.tag = ey, i.payload = t, n != null && ($o(n), i.callback = n), t = ia(e, i, r), t !== null && (pi(r, "this.replaceState()", e), al(t, e, r), aa(t, e, r));
			},
			enqueueForceUpdate: function(e, t) {
				e = e._reactInternals;
				var n = rl(e), r = ra(n);
				r.tag = ty, t != null && ($o(t), r.callback = t), t = ia(e, r, n), t !== null && (pi(n, "this.forceUpdate()", e), al(t, e, n), aa(t, e, n));
			}
		}, ib = null, ab = null, ob = Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."), sb = !1, cb = {}, lb = {}, ub = {}, db = {}, fb = !1, pb = {}, mb = {}, hb = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0,
			hydrationErrors: null
		}, gb = !1, _b = null;
		_b = /* @__PURE__ */ new Set();
		var vb = !1, yb = !1, bb = !1, xb = typeof WeakSet == "function" ? WeakSet : Set, Sb = null, Cb = null, wb = null, Tb = null, Eb = !1, Db = null, Ob = !1, kb = 8192, Ab = {
			getCacheForType: function(e) {
				var t = si(h_), n = t.data.get(e);
				return n === void 0 && (n = e(), t.data.set(e, n)), n;
			},
			cacheSignal: function() {
				return si(h_).controller.signal;
			},
			getOwner: function() {
				return hp;
			}
		};
		if (typeof Symbol == "function" && Symbol.for) {
			var jb = Symbol.for;
			jb("selector.component"), jb("selector.has_pseudo_class"), jb("selector.role"), jb("selector.test_id"), jb("selector.text");
		}
		var Mb = [], Nb = typeof WeakMap == "function" ? WeakMap : Map, Pb = 0, Fb = 2, Ib = 4, Lb = 0, Rb = 1, zb = 2, Bb = 3, Vb = 4, Hb = 6, Ub = 5, Z = Pb, Wb = null, Q = null, $ = 0, Gb = 0, Kb = 1, qb = 2, Jb = 3, Yb = 4, Xb = 5, Zb = 6, Qb = 7, $b = 8, ex = 9, tx = Gb, nx = null, rx = !1, ix = !1, ax = !1, ox = 0, sx = Lb, cx = 0, lx = 0, ux = 0, dx = 0, fx = 0, px = null, mx = null, hx = !1, gx = 0, _x = 0, vx = 300, yx = Infinity, bx = 500, xx = null, Sx = null, Cx = null, wx = 0, Tx = 1, Ex = 2, Dx = 3, Ox = 0, kx = 1, Ax = 2, jx = 3, Mx = 4, Nx = 5, Px = 0, Fx = null, Ix = null, Lx = 0, Rx = 0, zx = -0, Bx = null, Vx = null, Hx = null, Ux = wx, Wx = null, Gx = 50, Kx = 0, qx = null, Jx = !1, Yx = !1, Xx = 50, Zx = 0, Qx = null, $x = !1, eS = null, tS = !1, nS = /* @__PURE__ */ new Set(), rS = {}, iS = null, aS = null, oS = !1, sS = !1, cS = !1, lS = !1, uS = 0, dS = {};
		(function() {
			for (var e = 0; e < sg.length; e++) {
				var t = sg[e], n = t.toLowerCase();
				t = t[0].toUpperCase() + t.slice(1), Jn(n, "on" + t);
			}
			Jn($h, "onAnimationEnd"), Jn(eg, "onAnimationIteration"), Jn(tg, "onAnimationStart"), Jn("dblclick", "onDoubleClick"), Jn("focusin", "onFocus"), Jn("focusout", "onBlur"), Jn(ng, "onTransitionRun"), Jn(rg, "onTransitionStart"), Jn(ig, "onTransitionCancel"), Jn(ag, "onTransitionEnd");
		})(), it("onMouseEnter", ["mouseout", "mouseover"]), it("onMouseLeave", ["mouseout", "mouseover"]), it("onPointerEnter", ["pointerout", "pointerover"]), it("onPointerLeave", ["pointerout", "pointerover"]), rt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), rt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), rt("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]), rt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), rt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), rt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
		var fS = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), pS = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(fS)), mS = "_reactListening" + Math.random().toString(36).slice(2), hS = !1, gS = !1, _S = !1, vS = !1, yS = !1, bS = !1, xS = !1, SS = {}, CS = /\r\n?/g, wS = /\u0000|\uFFFD/g, TS = "http://www.w3.org/1999/xlink", ES = "http://www.w3.org/XML/1998/namespace", DS = "javascript:throw new Error('React form unexpectedly submitted.')", OS = "suppressHydrationWarning", kS = "&", AS = "/&", jS = "$", MS = "/$", NS = "$?", PS = "$~", FS = "$!", IS = "html", LS = "body", RS = "head", zS = "F!", BS = "F", VS = "loading", HS = "style", US = 0, WS = 1, GS = 2, KS = null, qS = null, JS = {
			dialog: !0,
			webview: !0
		}, YS = null, XS = void 0, ZS = typeof setTimeout == "function" ? setTimeout : void 0, QS = typeof clearTimeout == "function" ? clearTimeout : void 0, $S = -1, eC = typeof Promise == "function" ? Promise : void 0, tC = typeof queueMicrotask == "function" ? queueMicrotask : eC === void 0 ? ZS : function(e) {
			return eC.resolve(null).then(e).catch(qu);
		}, nC = null, rC = 0, iC = 1, aC = 2, oC = 3, sC = 4, cC = /* @__PURE__ */ new Map(), lC = /* @__PURE__ */ new Set(), uC = Jf.d;
		Jf.d = {
			f: function() {
				var e = uC.f(), t = ul();
				return e || t;
			},
			r: function(e) {
				var t = $e(e);
				t !== null && t.tag === 5 && t.type === "form" ? Ro(t) : uC.r(e);
			},
			D: function(e) {
				uC.D(e), Ad("dns-prefetch", e, null);
			},
			C: function(e, t) {
				uC.C(e, t), Ad("preconnect", e, t);
			},
			L: function(e, t, n) {
				uC.L(e, t, n);
				var r = dC;
				if (r && e && t) {
					var i = "link[rel=\"preload\"][as=\"" + _t(t) + "\"]";
					t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + _t(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + _t(n.imageSizes) + "\"]")) : i += "[href=\"" + _t(e) + "\"]";
					var a = i;
					switch (t) {
						case "style":
							a = R(e);
							break;
						case "script": a = Id(e);
					}
					cC.has(a) || (e = z({
						rel: "preload",
						href: t === "image" && n && n.imageSrcSet ? void 0 : e,
						as: t
					}, n), cC.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Nd(a)) || t === "script" && r.querySelector(Ld(a)) || (t = r.createElement("link"), Eu(t, "link", e), nt(t), r.head.appendChild(t)));
				}
			},
			m: function(e, t) {
				uC.m(e, t);
				var n = dC;
				if (n && e) {
					var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + _t(r) + "\"][href=\"" + _t(e) + "\"]", a = i;
					switch (r) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script": a = Id(e);
					}
					if (!cC.has(a) && (e = z({
						rel: "modulepreload",
						href: e
					}, t), cC.set(a, e), n.querySelector(i) === null)) {
						switch (r) {
							case "audioworklet":
							case "paintworklet":
							case "serviceworker":
							case "sharedworker":
							case "worker":
							case "script": if (n.querySelector(Ld(a))) return;
						}
						r = n.createElement("link"), Eu(r, "link", e), nt(r), n.head.appendChild(r);
					}
				}
			},
			X: function(e, t) {
				uC.X(e, t);
				var n = dC;
				if (n && e) {
					var r = tt(n).hoistableScripts, i = Id(e), a = r.get(i);
					a || (a = n.querySelector(Ld(i)), a || (e = z({
						src: e,
						async: !0
					}, t), (t = cC.get(i)) && Vd(e, t), a = n.createElement("script"), nt(a), Eu(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			},
			S: function(e, t, n) {
				uC.S(e, t, n);
				var r = dC;
				if (r && e) {
					var i = tt(r).hoistableStyles, a = R(e);
					t ||= "default";
					var o = i.get(a);
					if (!o) {
						var s = {
							loading: rC,
							preload: null
						};
						if (o = r.querySelector(Nd(a))) s.loading = iC | sC;
						else {
							e = z({
								rel: "stylesheet",
								href: e,
								"data-precedence": t
							}, n), (n = cC.get(a)) && Bd(e, n);
							var c = o = r.createElement("link");
							nt(c), Eu(c, "link", e), c._p = new Promise(function(e, t) {
								c.onload = e, c.onerror = t;
							}), c.addEventListener("load", function() {
								s.loading |= iC;
							}), c.addEventListener("error", function() {
								s.loading |= aC;
							}), s.loading |= sC, zd(o, t, r);
						}
						o = {
							type: "stylesheet",
							instance: o,
							count: 1,
							state: s
						}, i.set(a, o);
					}
				}
			},
			M: function(e, t) {
				uC.M(e, t);
				var n = dC;
				if (n && e) {
					var r = tt(n).hoistableScripts, i = Id(e), a = r.get(i);
					a || (a = n.querySelector(Ld(i)), a || (e = z({
						src: e,
						async: !0,
						type: "module"
					}, t), (t = cC.get(i)) && Vd(e, t), a = n.createElement("script"), nt(a), Eu(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			}
		};
		var dC = typeof document > "u" ? null : document, fC = null, pC = 6e4, mC = 800, hC = 500, gC = 0, _C = null, vC = null, yC = Yf, bC = {
			$$typeof: Lf,
			Provider: null,
			Consumer: null,
			_currentValue: yC,
			_currentValue2: yC,
			_threadCount: 0
		}, xC = "%c%s%c", SC = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", CC = "", wC = " ", TC = Function.prototype.bind, EC = !1, DC = null, OC = null, kC = null, AC = null, jC = null, MC = null, NC = null, PC = null, FC = null, IC = null;
		DC = function(e, r, i, a) {
			r = t(e, r), r !== null && (i = n(r.memoizedState, i, 0, a), r.memoizedState = i, r.baseState = i, e.memoizedProps = z({}, e.memoizedProps), i = gr(e, 2), i !== null && al(i, e, 2));
		}, OC = function(e, n, r) {
			n = t(e, n), n !== null && (r = a(n.memoizedState, r, 0), n.memoizedState = r, n.baseState = r, e.memoizedProps = z({}, e.memoizedProps), r = gr(e, 2), r !== null && al(r, e, 2));
		}, kC = function(e, n, i, a) {
			n = t(e, n), n !== null && (i = r(n.memoizedState, i, a), n.memoizedState = i, n.baseState = i, e.memoizedProps = z({}, e.memoizedProps), i = gr(e, 2), i !== null && al(i, e, 2));
		}, AC = function(e, t, r) {
			e.pendingProps = n(e.memoizedProps, t, 0, r), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = gr(e, 2), t !== null && al(t, e, 2);
		}, jC = function(e, t) {
			e.pendingProps = a(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = gr(e, 2), t !== null && al(t, e, 2);
		}, MC = function(e, t, n) {
			e.pendingProps = r(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = gr(e, 2), t !== null && al(t, e, 2);
		}, NC = function(e) {
			var t = gr(e, 2);
			t !== null && al(t, e, 2);
		}, PC = function(e) {
			var t = Re(), n = gr(e, t);
			n !== null && al(n, e, t);
		}, FC = function(e) {
			s = e;
		}, IC = function(e) {
			o = e;
		};
		var LC = !0, RC = null, zC = !1, BC = null, VC = null, HC = null, UC = /* @__PURE__ */ new Map(), WC = /* @__PURE__ */ new Map(), GC = [], KC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "), qC = null;
		if (Tf.prototype.render = wf.prototype.render = function(e) {
			var t = this._internalRoot;
			if (t === null) throw Error("Cannot update an unmounted root.");
			var n = arguments;
			typeof n[1] == "function" ? console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : v(n[1]) ? console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : n[1] !== void 0 && console.error("You passed a second argument to root.render(...) but it only accepts one argument."), n = e;
			var r = t.current;
			ef(r, rl(r), n, t, null, null);
		}, Tf.prototype.unmount = wf.prototype.unmount = function() {
			var e = arguments;
			if (typeof e[0] == "function" && console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."), e = this._internalRoot, e !== null) {
				this._internalRoot = null;
				var t = e.containerInfo;
				(Z & (Fb | Ib)) !== Pb && console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), ef(e.current, 2, null, e, null, null), ul(), t[Jp] = null;
			}
		}, Tf.prototype.unstable_scheduleHydration = function(e) {
			if (e) {
				var t = Ye();
				e = {
					blockedOn: null,
					target: e,
					priority: t
				};
				for (var n = 0; n < GC.length && t !== 0 && t < GC[n].priority; n++);
				GC.splice(n, 0, e), n === 0 && gf(e);
			}
		}, (function() {
			var e = Of.version;
			if (e !== "19.2.5") throw Error("Incompatible React versions: The \"react\" and \"react-dom\" packages must have the exact same version. Instead got:\n  - react:      " + (e + "\n  - react-dom:  19.2.5\nLearn more: https://react.dev/warnings/version-mismatch"));
		})(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"), Jf.findDOMNode = function(e) {
			var t = e._reactInternals;
			if (t === void 0) throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error("Argument appears to not be a ReactComponent. Keys: " + e));
			return e = ne(t), e = e === null ? null : re(e), e = e === null ? null : e.stateNode, e;
		}, !(function() {
			var e = {
				bundleType: 1,
				version: "19.2.5",
				rendererPackageName: "react-dom",
				currentDispatcherRef: B,
				reconcilerVersion: "19.2.5"
			};
			return e.overrideHookState = DC, e.overrideHookStateDeletePath = OC, e.overrideHookStateRenamePath = kC, e.overrideProps = AC, e.overridePropsDeletePath = jC, e.overridePropsRenamePath = MC, e.scheduleUpdate = NC, e.scheduleRetry = PC, e.setErrorHandler = FC, e.setSuspenseHandler = IC, e.scheduleRefresh = g, e.scheduleRoot = h, e.setRefreshHandler = _, e.getCurrentFiber = of, je(e);
		})() && eh && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
			var JC = window.location.protocol;
			/^(https?|file):$/.test(JC) && console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (JC === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""), "font-weight:bold");
		}
		e.createRoot = function(e, t) {
			if (!v(e)) throw Error("Target container is not a DOM element.");
			Ef(e);
			var n = !1, r = "", i = is, a = as, o = os;
			return t != null && (t.hydrate ? console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t && t.$$typeof === jf && console.error("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"), !0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Qd(e, 1, !1, null, null, n, r, null, i, a, o, Cf), e[Jp] = t.current, uu(e), new wf(t);
		}, e.hydrateRoot = function(e, t, n) {
			if (!v(e)) throw Error("Target container is not a DOM element.");
			Ef(e), t === void 0 && console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
			var r = !1, i = "", a = is, o = as, s = os, c = null;
			return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (c = n.formState)), t = Qd(e, 1, !0, t, n ?? null, r, i, c, a, o, s, Cf), t.context = $d(null), n = t.current, r = rl(n), r = Ge(r), i = ra(r), i.callback = null, ia(n, i, r), pi(r, "hydrateRoot()", null), n = r, t.current.lanes = n, Be(t, n), P(t), e[Jp] = t.current, uu(e), new Tf(t);
		}, e.version = "19.2.5", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), ee = /* @__PURE__ */ c(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = b()) : t.exports = x();
})), te = /* @__PURE__ */ c(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), ne = /* @__PURE__ */ c(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === C ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case ne: return "Suspense";
				case re: return "SuspenseList";
				case ae: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case ee: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case te:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case ie: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case S:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === S) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function a() {
			var e = oe.A;
			return e === null ? null : e.getOwner();
		}
		function o() {
			return Error("react-stack-top-frame");
		}
		function s(e) {
			if (se.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function c(e, t) {
			function n() {
				ue || (ue = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function l() {
			var e = t(this.type);
			return w[e] || (w[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function u(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: l
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, o, l, d) {
			var f = n.children;
			if (f !== void 0) if (o) if (ce(f)) {
				for (o = 0; o < f.length; o++) p(f[o]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (se.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				o = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", fe[f + o] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", o, f, m, f), fe[f + o] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), s(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && c(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), u(e, f, i, a(), l, d);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === S && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = d("react"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), ae = Symbol.for("react.activity"), C = Symbol.for("react.client.reference"), oe = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = Object.prototype.hasOwnProperty, ce = Array.isArray, le = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var ue, w = {}, T = h.react_stack_bottom_frame.bind(h, o)(), de = le(i(o)), fe = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > oe.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : T, r ? le(i(e)) : de);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > oe.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : T, r ? le(i(e)) : de);
		};
	})();
})), re = /* @__PURE__ */ c(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = te() : t.exports = ne();
})), ie = /* @__PURE__ */ u(ee()), S = re();
function ae(n, r, i) {
	function a(e) {
		let { el: r } = e;
		return t(() => n.done(), []), /* @__PURE__ */ (0, S.jsx)(S.Fragment, { children: r });
	}
	let o = e.createElement(r, i);
	return e.createElement(a, { el: o });
}
//#endregion
//#region src/hydrate.jsx
function C(t, n, r = {}) {
	return (0, ie.hydrateRoot)(t, e.createElement(n, r));
}
//#endregion
//#region src/main.js
function oe(e = {}) {
	let t = {}, n = {};
	function r(r, a, o) {
		let s = !!t[o], c;
		if (!r) return console.error("Error: Component is undefined"), !1;
		if (s && i(o), c = document.getElementById(o), !c) return console.error(`Can't find node with id: "${o}"`), !1;
		n[o] = {};
		let l, u = f(), d = f(), p = (e) => n[o] = e;
		if (c.innerHTML.trim()) l = C(c, r, {
			dependencies: e,
			data: a,
			setupUpdates: p
		}), setTimeout(() => u.done(), 1);
		else {
			l = ie.createRoot(c);
			let t = ae(u, r, {
				dependencies: e,
				data: a,
				setupUpdates: p
			});
			l.render(t);
		}
		return t[o] = l, u.onComplete(() => d.done(n[o])), d.promise;
	}
	function i(e) {
		return Object.keys(t).includes(e) ? (t[e].unmount(), delete t[e], delete n[e], !0) : !1;
	}
	function a(e) {
		return n[e] || (console.error(`App with id: "${e}" was not found.`), !1);
	}
	function o(e) {
		return !!t[e];
	}
	return {
		publish: r,
		destroy: i,
		getApp: a,
		has: o
	};
}
//#endregion
export { oe as default };
