define("arale/switchable/0.9.12/const",[],function(a,b){var c="ui-switchable";b.UI_SWITCHABLE=c,b.NAV_CLASS=c+"-nav",b.CONTENT_CLASS=c+"-content",b.TRIGGER_CLASS=c+"-trigger",b.PANEL_CLASS=c+"-panel",b.ACTIVE_CLASS=c+"-active",b.PREV_BTN_CLASS=c+"-prev-btn",b.NEXT_BTN_CLASS=c+"-next-btn",b.DISABLED_BTN_CLASS=c+"-disabled-btn"}),define("arale/switchable/0.9.12/plugins/effects",["$"],function(a,b,c){var d=a("$"),e="scrollx",f="scrolly",g="fade";c.exports={isNeeded:function(){return"none"!==this.get("effect")},install:function(){var a=this.panels;a.show();var b=this.get("effect"),c=this.get("step");if(0===b.indexOf("scroll")){var f=this.content,i=a.eq(0);f.css("position","relative"),"static"===f.parent().css("position")&&f.parent().css("position","relative"),b===e&&(a.css("float","left"),f.width("9999px"));var j=this.get("viewSize");if(j[0]||(j[0]=i.outerWidth()*c,j[1]=i.outerHeight()*c,this.set("viewSize",j)),!j[0])throw Error("Please specify viewSize manually")}else if(b===g){var k=this.get("activeIndex"),l=k*c,m=l+c-1;a.each(function(a,b){var c=a>=l&&m>=a;d(b).css({opacity:c?1:0,position:"absolute",zIndex:c?9:1})})}this._switchPanel=function(a){var b=this.get("effect"),c=d.isFunction(b)?b:h[b];c.call(this,a)}}};var h={fade:function(a){if(this.get("step")>1)throw Error('Effect "fade" only supports step === 1');var b=a.fromPanels.eq(0),c=a.toPanels.eq(0),d=this.anim;if(d&&d.stop(!1,!0),c.css("opacity",1),b[0]){var e=this.get("duration"),f=this.get("easing"),g=this;this.anim=b.animate({opacity:0},e,f,function(){g.anim=null,c.css("zIndex",9),b.css("zIndex",1)})}else c.css("zIndex",9)},scroll:function(a){var b=this.get("effect")===e,c=this.get("viewSize")[b?0:1]*a.toIndex,d={};if(d[b?"left":"top"]=-c+"px",this.anim&&this.anim.stop(),a.fromIndex>-1){var f=this,g=this.get("duration"),h=this.get("easing");this.anim=this.content.animate(d,g,h,function(){f.anim=null})}else this.content.css(d)}};h[f]=h.scroll,h[e]=h.scroll,c.exports.Effects=h}),define("arale/switchable/0.9.12/plugins/autoplay",["$"],function(a,b,c){function e(a,b){function d(){d.stop(),c=setTimeout(a,b)}b=b||200;var c;return d.stop=function(){c&&(clearTimeout(c),c=0)},d}function g(a){var b=f.scrollTop(),c=b+f.height(),d=a.offset().top,e=d+a.height();return c>d&&e>b}var d=a("$");c.exports={attrs:{autoplay:!0,interval:5e3,pauseOnScroll:!0,pauseOnHover:!0},isNeeded:function(){return this.get("autoplay")},install:function(){function i(){j(),h.paused=!1,c=setInterval(function(){h.paused||h.next()},d)}function j(){c&&(clearInterval(c),c=null),h.paused=!0}var c,a=this.element,b="."+this.cid,d=this.get("interval"),h=this;i(),this.stop=j,this.start=i,this.get("pauseOnScroll")&&(this._scrollDetect=e(function(){h[g(a)?"start":"stop"]()}),f.on("scroll"+b,this._scrollDetect)),this.get("pauseOnHover")&&this.element.hover(j,i)},destroy:function(){var a="."+this.cid;this.stop(),this._scrollDetect&&(this._scrollDetect.stop(),f.off("scroll"+a))}};var f=d(window)}),define("arale/switchable/0.9.12/plugins/circular",["./effects","$"],function(a,b,c){function h(a,b,c){var e=this.get("step"),f=this.get("length"),g=a?f-1:0,h=g*e,i=(g+1)*e,j=a?c:-c*f,k=d(this.panels.get().slice(h,i));return k.css("position","relative"),k.css(b,-j+"px"),j}function i(a,b,c){var e=this.get("step"),f=this.get("length"),g=a?f-1:0,h=g*e,i=(g+1)*e,j=d(this.panels.get().slice(h,i));j.css("position",""),j.css(b,""),this.content.css(b,a?-c*(f-1):"")}var d=a("$"),e="scrollx",f="scrolly",g=a("./effects").Effects;c.exports={isNeeded:function(){var a=this.get("effect"),b=this.get("circular");return b&&(a===e||a===f)},install:function(){this.set("scrollType",this.get("effect")),this.set("effect","scrollCircular")}},g.scrollCircular=function(a){var b=a.toIndex,c=a.fromIndex,d=this.get("length"),f=this.get("_isNext"),g=0===c&&b===d-1&&!f,j=c===d-1&&0===b&&f,k=g||!j&&c>b,l=g||j,m=this.get("scrollType")===e,n=m?"left":"top",o=this.get("viewSize")[m?0:1],p=-o*b;this.anim&&this.anim.stop(!1,!0),l&&(p=h.call(this,k,n,o));var q={};if(q[n]=p+"px",c>-1){var r=this.get("duration"),s=this.get("easing"),t=this;this.anim=this.content.animate(q,r,s,function(){t.anim=null,l&&i.call(t,k,n,o)})}else this.content.css(q)}}),define("arale/switchable/0.9.12/plugins/multiple",[],function(a,b,c){c.exports={isNeeded:function(){return this.get("multiple")},methods:{switchTo:function(a){this._switchTo(a,a)},_switchTrigger:function(a){this.triggers.eq(a).toggleClass(this.get("activeTriggerClass"))},_triggerIsValid:function(){return!0},_switchPanel:function(a){a.toPanels.toggle()}}}}),define("arale/switchable/0.9.12/switchable",["./const","./plugins/effects","./plugins/autoplay","./plugins/circular","./plugins/multiple","$","arale/easing/1.0.0/easing","arale/widget/1.0.2/widget","arale/base/1.0.1/base","arale/class/1.0.0/class","arale/events/1.0.0/events"],function(a,b,c){function l(a,b,c){for(var e=d("<ul>"),f=0;a>f;f++){var g=f===b?c:"";d("<li>",{"class":g,html:f+1}).appendTo(e)}return e}var d=a("$");a("arale/easing/1.0.0/easing");var e=a("arale/widget/1.0.2/widget"),f=a("./const"),g=a("./plugins/effects"),h=a("./plugins/autoplay"),i=a("./plugins/circular"),j=a("./plugins/multiple"),k=e.extend({attrs:{triggers:{value:[],getter:function(a){return d(a)}},panels:{value:[],getter:function(a){return d(a)}},hasTriggers:!0,triggerType:"hover",delay:100,effect:"none",easing:"linear",duration:500,activeIndex:0,step:1,length:{readOnly:!0,getter:function(){return this.panels.length/this.get("step")}},viewSize:[],activeTriggerClass:f.ACTIVE_CLASS},setup:function(){this._parseRole(),this._initElement(),this._initPanels(),this._initTriggers(),this._initPlugins(),this.render()},_parseRole:function(a){if(a=a||this._getDatasetRole()){var b=this.get("triggers"),c=this.get("panels");0===b.length&&(a.trigger||a.nav)&&(b=a.trigger||a.nav.find("> *")),0===c.length&&(a.panel||a.content)&&(c=a.panel||a.content.find("> *")),this.set("triggers",b),this.set("panels",c)}},_getDatasetRole:function(a){var b=this.element,a=a||{},c=!1,e=["trigger","panel","nav","content"];return d.each(e,function(e,f){var g=d("[data-role="+f+"]",b);g.length&&(a[f]=g,c=!0)}),c?a:null},_initElement:function(){this.element.addClass(f.UI_SWITCHABLE)},_initPanels:function(){var a=this.panels=this.get("panels");if(0===a.length)throw Error("panels.length is ZERO");this.content=a.parent().addClass(f.CONTENT_CLASS),a.addClass(f.PANEL_CLASS)},_initTriggers:function(){var a=this.triggers=this.get("triggers");0===a.length&&this.get("hasTriggers")?(this.nav=l(this.get("length"),this.get("activeIndex"),this.get("activeTriggerClass")).appendTo(this.element),this.triggers=this.nav.children()):this.nav=a.parent(),this.triggers.addClass(f.TRIGGER_CLASS),this.nav.addClass(f.NAV_CLASS),this.triggers.each(function(a,b){d(b).data("value",a)}),this._bindTriggers()},_initPlugins:function(){this._plugins=[],this._plug(g),this._plug(h),this._plug(i),this._plug(j)},_bindTriggers:function(){function b(b){a._onFocusTrigger(b.type,d(this).data("value"))}function c(){clearTimeout(a._switchTimer)}var a=this;"click"===this.get("triggerType")?this.triggers.click(b):this.triggers.hover(b,c)},_onFocusTrigger:function(a,b){var c=this;"click"===a?this.switchTo(b):this._switchTimer=setTimeout(function(){c.switchTo(b)},this.get("delay"))},switchTo:function(a){return this.set("activeIndex",a),this},_onRenderActiveIndex:function(a,b){this._triggerIsValid(a,b)&&this._switchTo(a,b)},_switchTo:function(a,b){this.trigger("switch",a,b),this._switchTrigger(a,b),this._switchPanel(this._getPanelInfo(a,b)),this.trigger("switched",a,b)},_triggerIsValid:function(a,b){return a!==b},_switchTrigger:function(a,b){var c=this.triggers;1>c.length||(c.eq(b).removeClass(this.get("activeTriggerClass")),c.eq(a).addClass(this.get("activeTriggerClass")))},_switchPanel:function(a){a.fromPanels.hide(),a.toPanels.show()},_getPanelInfo:function(a,b){var f,g,c=this.panels.get(),e=this.get("step");if(b>-1){var h=b*e,i=(b+1)*e;f=c.slice(h,i)}return g=c.slice(a*e,(a+1)*e),{toIndex:a,fromIndex:b,toPanels:d(g),fromPanels:d(f)}},prev:function(){var a=this.get("activeIndex"),b=(a-1+this.get("length"))%this.get("length");this.switchTo(b)},next:function(){var a=this.get("activeIndex"),b=(a+1)%this.get("length");this.switchTo(b)},_plug:function(a){if(a.isNeeded.call(this)){var b=a.attrs,c=a.methods;if(b)for(var d in b)!b.hasOwnProperty(d)||d in this.attrs||this.set(d,b[d]);if(c)for(var e in c)c.hasOwnProperty(e)&&(this[e]=c[e]);a.install&&a.install.call(this),this._plugins.push(a)}},destroy:function(){d.each(this._plugins,function(a,b){b.destroy&&b.destroy.call(this)}),k.superclass.destroy.call(this)}});c.exports=k});