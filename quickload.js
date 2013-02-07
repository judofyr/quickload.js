(function() {
  // domReady and loadScript is based on:
  // https://github.com/ded/domready
  // https://github.com/ded/script.js
  var doc = document
    , html = doc.documentElement
    , head = html.children[0]
    , hack = html.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , readyFns = [], listener
    , ready = 0

  function domReady(fn) {
    ready ? fn() : readyFns.push(fn);
  }

  function flush(f) {
    ready = 1;
    while (f = readyFns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener, false);
    flush();
  }, false);

  hack && doc.attachEvent(onreadystatechange, listener = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, listener);
      flush();
    }
  });

  // http://javascript.nwbox.com/IEContentLoaded/
  if (hack && self == top) {
    domReady = function(fn) {
      try {
        html.doScroll('left');
      } catch(e) {
        setTimeout(function() { domReady(fn) }, 50);
        return;
      }
      fn();
    }
  }

  function loadScript(path, fn) {
    var el = doc.createElement('script')
      , loaded = 0

    if (fn)
    el.onload = el.onerror = el[onreadystatechange] = function () {
      if (loaded || (el[readyState] && !(/^c|loade/.test(el[readyState])))) return;
      el.onload = el.onerror = el[onreadystatechange] = null;
      loaded = 1;
      fn();
    }

    el.async = 1;
    el.src = path;
    head.appendChild(el);
  }

  // https://github.com/judofyr/dep.js
  var dep;
  (dep=function(a){function e(b){var d=c[b];d?(c[b]=0,d()):a.load&&a.load(b)}var b=a.loaded={},c={},d={};return a.use=function(a,c){typeof a=="string"&&(a=[a]);var f=a.length+1,g,h=function(){--f==0&&c&&c()};h();while(g=a.shift())b[g]?h():((d[g]||(d[g]=[])).push(h),e(g))},a.define=function(f,g,h){c[f]=function(){a.use(g||[],function(){var a,c=d[f];b[f]=1,h&&h();while(a=c&&c.shift())a()})},d[f]&&e(f)},a})(dep);

  (quickload=function(ctx){
    dep(ctx);
    ctx.domReady = domReady;
    ctx.loadScript = loadScript;

    domReady(function() { ctx.define('dom') });

    var loading = {};
    var files = {};
    var assets = {};

    ctx.source = function(source) {
      var args = arguments;

      for (var i = 1; i < args.length; i++) {
        files[args[i]] = source;
      }
    };

    ctx.asset = function(name) {
      assets[name] = Array.prototype.slice.call(arguments, 1);
    };

    function loadAsset(name, list) {
      var now = list.shift();
      if (!now) return ctx.define(name);

      var left = now.length, path
        , done = function() {
            if (--left == 0) loadAsset(name, list);
          }

      while (path = now.shift()) {
        files[path] = path;
        ctx.use(path, done);
      }
    };

    ctx.load = function(name) {
      var value;

      if (loading[name]) return;
      loading[name] = 1;

      if (value = assets[name]) {
        loadAsset(name, value);
        return;
      }

      if (value = files[name]) {
        loadScript(value, function() {
          ctx.define(value);
        });
      }
    };

    ctx.module = function(name, deps, def) {
      var parts = name.split("."), part
        , lastPart = parts.pop()
        , base = ctx

      while (part = parts.shift()) {
        if (!base[part]) base[part] = {};
        base = base[part];
      }

      ctx.define(name, deps, function() {
        base[lastPart] = ctx[name] = ctx.module.setup(def);
      });
    };

    ctx.module.setup = function(def) {
      return (typeof def == 'function') ? def() : def;
    };

    return ctx;
  });
})();

