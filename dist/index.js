/*!
 * vinc-slider v0.0.1
 * (c) Wadday Hassan
 * Released under the MIT License.
 */
'use strict';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'VincSlider',
  data: function data() {
    return {
      currentSlide: 1,
      isPreviousSlide: false,
      isFirstLoad: true,
      timer: null,
      slides: [{
        headlineFirstLine: "The",
        headlineSecondLine: "Water villas",
        bgImg: "https://cache.marriott.com/marriottassets/marriott/MLEWH/mlewh-wow-oceanhaven-1800-hor-wide.jpg"
      }, {
        headlineFirstLine: "Fly",
        headlineSecondLine: "in Maldives",
        bgImg: "https://www.telegraph.co.uk/content/dam/Travel/2016/November/maldives%20anantara%201.jpg"
      }, {
        headlineFirstLine: "Beautiful",
        headlineSecondLine: "Beach",
        bgImg: "https://i.ytimg.com/vi/P9Z6okLJDv0/maxresdefault.jpg"
      }]
    };
  },
  // computed: {
  //   currentItem: function() {
  //     return this.slides[Math.abs(this.currentSlide) % this.slides.length]
  //   }
  // },
  mounted: function mounted() {
    this.startSlide();
  },
  methods: {
    updateSlide: function updateSlide(index) {
      clearInterval(this.timer);
      index < this.currentSlide ? this.isPreviousSlide = true : this.isPreviousSlide = false;
      this.currentSlide = index;
      this.isFirstLoad = false;
      this.setTimer();
    },
    next: function next() {
      if (this.currentSlide === this.slides.length) {
        this.updateSlide(1);
      } else {
        this.updateSlide(this.currentSlide + 1);
      } // clearInterval(this.timer)
      // if (this.currentSlide === this.slides.length) {
      //   this.currentSlide = 1
      // } else {
      //   this.currentSlide += 1
      // }
      // this.isFirstLoad = false;
      // this.isPreviousSlide = false
      // this.setTimer()

    },
    setTimer: function setTimer() {
      this.timer = setInterval(this.next, 5000);
    },
    startSlide: function startSlide() {
      this.timer = setInterval(this.next, 5000);
      var productRotatorSlide = document.getElementById("wrap");
      var startX = 0;
      var endX = 0;
      productRotatorSlide.addEventListener("touchstart", function (event) {
        return startX = event.touches[0].pageX;
      });
      productRotatorSlide.addEventListener("touchmove", function (event) {
        return endX = event.touches[0].pageX;
      });
      productRotatorSlide.addEventListener("touchend", function (event) {
        var threshold = startX - endX;

        if (threshold < 150 && 0 < this.currentSlide) {
          this.currentSlide -= 1;
        }

        if (threshold > -150 && this.currentSlide < this.slides.length - 1) {
          this.currentSlide += 1;
        }
      }.bind(this));
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "wrapper",
    "class": {
      'is-previous': _vm.isPreviousSlide,
      'first-load': _vm.isFirstLoad
    },
    attrs: {
      "id": "wrap"
    }
  }, [_vm._l(_vm.slides, function (slide, index) {
    return _c('div', {
      staticClass: "slide-wrapper",
      "class": {
        active: index + 1 === _vm.currentSlide
      },
      style: {
        'z-index': _vm.slides.length - index + 1,
        'background-image': 'url(' + slide.bgImg + ')'
      }
    }, [_c('div', {
      staticClass: "slide-inner"
    }, [_c('div', {
      staticClass: "slide-bg-text"
    }, [_c('p', [_vm._v(_vm._s(slide.headlineFirstLine))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(slide.headlineSecondLine))])]), _vm._v(" "), _c('div', {
      staticClass: "slide-content"
    }, [_c('h1', {
      staticClass: "slide-content-text"
    }, [_c('p', [_vm._v(_vm._s(slide.headlineFirstLine))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(slide.headlineSecondLine))])]), _vm._v(" "), _c('a', {
      staticClass: "slide-content-cta"
    }, [_vm._v("Call To Action")])])])]);
  }), _vm._v(" "), _c('div', {
    staticClass: "pagination-container"
  }, _vm._l(_vm.slides, function (slide, index) {
    return _c('span', {
      staticClass: "pagination-item",
      "class": {
        active: index + 1 === _vm.currentSlide
      },
      on: {
        "click": function click($event) {
          return _vm.updateSlide(index + 1);
        }
      }
    });
  }), 0)], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-03d4a85a_0", {
    source: ".slide-content-cta,.slide-side-text{text-transform:uppercase;color:#fff;letter-spacing:.12rem;font-size:.7rem;line-height:1}[v-cloak]{opacity:0}body{cursor:default}body ::selection{background-color:rgba(46,49,52,.7);color:#f5f5f1}body ::-moz-selection{background-color:rgba(46,49,52,.7);color:#f5f5f1}.wrapper{height:calc(100vh - 50px);min-height:36rem;position:relative}@media (max-width:630px){.wrapper{height:100vh;min-height:0}}.slide-wrapper{background-size:cover;height:100%;background-position:center center;position:absolute;width:100%;background-blend-mode:darken}.slide-wrapper:nth-child(1){background-color:rgba(115,129,153,.4)}.slide-wrapper:nth-child(1):before{background-color:rgba(115,129,153,.25)}.slide-wrapper:nth-child(1) .slide-content-text{text-shadow:2px 5px 45px rgba(85,96,113,.25)}.slide-wrapper:nth-child(2){background-color:rgba(144,171,184,.7)}.slide-wrapper:nth-child(2):before{background-color:rgba(144,171,184,.3)}.slide-wrapper:nth-child(2) .slide-content-text{text-shadow:2px 5px 45px rgba(121,142,152,.2)}.slide-wrapper:nth-child(3){background-color:rgba(86,125,156,.5)}.slide-wrapper:nth-child(3):before{background-color:rgba(86,125,156,.2)}.slide-wrapper:nth-child(3) .slide-content-text{text-shadow:2px 5px 55px rgba(57,83,103,.4)}.slide-wrapper:before{content:\"\";position:absolute;width:100%;height:100%;z-index:1}.slide-inner{position:relative;z-index:2;height:100%;overflow:hidden}.slide-bg-text{color:#000;font-size:42vh;line-height:.8;opacity:.03;font-weight:900;margin-top:-4rem;position:absolute;top:50%;left:5vw;transform:translateY(-50%)}.slide-bg-text>p:last-child{padding-left:4rem}.slide-content{color:#fff;margin-top:5rem;position:absolute;top:50%;left:calc(13vw + (.7) * 48vh);transform:translateY(-50%);display:flex;flex-direction:column}@media (max-width:1000px){.slide-content{left:calc(13vw + 1rem)}}@media (max-height:730px){.slide-content{top:30%;transform:translateY(-30%);left:calc(9vw + (.7) * 16vw)}}.slide-content-text{@apply tracking-wider text-7xl font-light;line-height:.87;will-change:auto}@media (max-height:790px){.slide-content-text{font-size:7rem}}@media (max-width:1150px){.slide-content-text{font-size:7rem}}@media (max-width:840px){.slide-content-text{font-size:5.5rem}}@media (max-width:630px){.slide-content-text{margin-bottom:5.5rem}}@media (max-width:500px){.slide-content-text{font-size:3.5rem}}.slide-content-text>p:last-child{padding-left:3rem}.slide-content-cta{cursor:pointer;align-self:flex-start;margin-top:4.5rem;margin-left:calc((.3) * 48vh + 4.5rem);padding:.9rem 2.2rem;border-left:1px solid #fff;border-right:1px solid #fff;transition:.18s ease-in-out;font-weight:700}@media (max-width:1000px){.slide-content-cta{background-color:rgba(255,255,255,.3);padding-top:1.2rem;padding-bottom:1.2rem}}@media (max-width:630px){.slide-content-cta{display:none}}.slide-content-cta:hover{color:#000;background-color:#fff}.slide-side-text{position:absolute;left:calc(13vw - 3rem);writing-mode:vertical-rl;top:calc((50% - (62vh / 2)) + (5vh / 2))}@media (max-height:790px){.slide-side-text{left:calc(9vw - 3rem);top:calc((50% - (20vw / 2)) + (5vh / 2))}}@media (max-height:730px){.slide-side-text{top:calc((40% - (20vw / 2)) + (5vh / 2))}}.slide-side-text>span:first-child{font-weight:700}.slide-side-text:after{content:\"\";width:1px;background-color:#fff;height:40px;display:block;position:absolute;top:calc(100% + 25px);left:50%;transform:translateX(-50%)}.pagination-container{position:absolute;z-index:200;display:flex;flex-direction:column;align-items:flex-end;right:2rem;top:50%;transform:translateY(-50%)}@media (max-width:920px){.pagination-container{display:none}}.pagination-item{width:10px;height:20px;border-radius:100px;background-color:rgba(255,255,255,.6);transition:.18s ease-in-out}.pagination-item+.pagination-item{margin-top:1rem}.pagination-item.active{background-color:#fff;position:relative;width:10px}.pagination-item:not(.active){cursor:pointer}.pagination-item:not(.active):hover{background-color:#fff;width:30px}@keyframes slideLeft{from{transform:translateX(0)}to{transform:translateX(-100%)}}@keyframes slideRight{from{transform:translateX(-100%)}to{transform:translateX(0)}}@keyframes cutTextUp{from{clip-path:inset(0 0 -10% 0)}to{clip-path:inset(0 0 100% 0)}}@keyframes cutTextDown{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(-10% 0 -20% 0);opacity:1}}@keyframes cutTextDownFromTop{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 -30% 0);opacity:1}}@keyframes rectMovement{0%{transform:translateX(0) rotate(0) translateY(-50%)}60%{opacity:1}100%{transform:translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-50%);opacity:0}}@media (max-height:730px){@keyframes rectMovement{0%{transform:translateX(0) rotate(0) translateY(-30%)}60%{opacity:1}100%{transform:translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-30%);opacity:0}}}@keyframes rectMovementFromRight{0%{transform:translateX(calc(48vh)) rotate(12deg) translateY(-50%);opacity:0}60%{opacity:1}100%{transform:translateX(0) rotate(0) translateY(-50%);opacity:1}}60%{opacity:1}100%{transform:translateX(0) rotate(0) translateY(-30%);opacity:1}40%{opacity:1}100%{transform:translateX(0) rotate(0) translateY(-50%);opacity:1}40%{opacity:1}100%{transform:translateX(0) rotate(0) translateY(-30%);opacity:1}to{opacity:1}.slide-wrapper:not(.active){animation-delay:.5s;animation-name:slideLeft;animation-duration:.9s;animation-timing-function:cubic-bezier(.18,.54,.52,.93);pointer-events:none}.slide-wrapper:not(.active) .slide-content-text>p,.slide-wrapper:not(.active) .slide-side-text{animation-name:cutTextUp;animation-duration:.5s;animation-timing-function:ease-out}.slide-wrapper:not(.active) .slide-rect{animation-name:rectMovement;animation-duration:.5s;animation-timing-function:ease;animation-fill-mode:forwards}.slide-wrapper.active{transition-delay:0s;opacity:1}.slide-wrapper.active .slide-content-text>p{opacity:0;animation-delay:.8s;animation-name:cutTextDown;animation-duration:.5s;animation-timing-function:ease;animation-fill-mode:forwards}.slide-wrapper.active .slide-rect{opacity:0;animation-name:rectMovementFromRight;animation-duration:.45s;animation-timing-function:ease;animation-fill-mode:forwards;animation-delay:.9s}.is-previous .slide-wrapper:not(.active){animation:none}.is-previous .slide-wrapper:not(.active) .slide-rect{animation:none}.is-previous .slide-wrapper.active{transform:translateX(-100%);animation-fill-mode:forwards;animation-delay:.5s;animation-name:slideRight;animation-duration:.8s;animation-timing-function:cubic-bezier(.18,.54,.52,.93)}.is-previous .slide-wrapper.active .slide-rect{opacity:0;animation-name:rectMovementRight;animation-duration:.5s;animation-timing-function:ease-out;animation-fill-mode:forwards;animation-delay:.9s}.first-load .controls-container,.first-load .slide-wrapper.active .slide-content-cta,.first-load .slide-wrapper.active .slide-rect,.first-load .slide-wrapper.active .slide-side-text{opacity:0;animation-name:fadeIn;animation-delay:.3s;animation-duration:.3s;animation-fill-mode:forwards;animation-timing-function:ease-in}.first-load .slide-wrapper.active .slide-content-text>p{animation-name:fadeIn;animation-delay:.5s;animation-duration:.7s}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

var VincSlider = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, browser, undefined);

var index = {
  install: function install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("vinc-slider", VincSlider);
  }
};

module.exports = index;
