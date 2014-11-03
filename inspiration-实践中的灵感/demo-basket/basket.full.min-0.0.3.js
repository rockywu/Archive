/*!
* basket.js
* v0.3.0 - 2012-12-28
* http://addyosmani.github.com/basket.js
* (c) Addy Osmani; MIT License
* Created by: Addy Osmani, Sindre Sorhus, Andrée Hansson
* Contributors: Ironsjp, Mathias Bynens, Rick Waldron, Felipe Morais
* Uses rsvp.js, https://github.com/tildeio/rsvp.js
*/
(function(e){"use strict";function v(e,t){r.async(function(){e.trigger("promise:resolved",{detail:t}),e.isResolved=!0,e.resolvedValue=t})}function m(e,t){r.async(function(){e.trigger("promise:failed",{detail:t}),e.isRejected=!0,e.rejectedValue=t})}var t=typeof window!="undefined"?window:{},n=t.MutationObserver||t.WebKitMutationObserver,r,i;if(typeof process!="undefined"&&{}.toString.call(process)==="[object process]")i=function(e,t){process.nextTick(function(){e.call(t)})};else if(n){var s=[],o=new n(function(){var e=s.slice();s=[],e.forEach(function(e){var t=e[0],n=e[1];t.call(n)})}),u=document.createElement("div");o.observe(u,{attributes:!0}),i=function(e,t){s.push([e,t]),u.setAttribute("drainQueue","drainQueue")}}else i=function(e,t){setTimeout(function(){e.call(t)},1)};var a=function(e,t){this.type=e;for(var n in t){if(!t.hasOwnProperty(n))continue;this[n]=t[n]}},f=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n][0]===t)return n;return-1},l=function(e){var t=e._promiseCallbacks;return t||(t=e._promiseCallbacks={}),t},c={mixin:function(e){return e.on=this.on,e.off=this.off,e.trigger=this.trigger,e},on:function(e,t,n){var r=l(this),i,s;e=e.split(/\s+/),n=n||this;while(s=e.shift())i=r[s],i||(i=r[s]=[]),f(i,t)===-1&&i.push([t,n])},off:function(e,t){var n=l(this),r,i,s;e=e.split(/\s+/);while(i=e.shift()){if(!t){n[i]=[];continue}r=n[i],s=f(r,t),s!==-1&&r.splice(s,1)}},trigger:function(e,t){var n=l(this),r,i,s,o,u;if(r=n[e])for(var f=0,c=r.length;f<c;f++)i=r[f],s=i[0],o=i[1],typeof t!="object"&&(t={detail:t}),u=new a(e,t),s.call(o,u)}},h=function(){this.on("promise:resolved",function(e){this.trigger("success",{detail:e.detail})},this),this.on("promise:failed",function(e){this.trigger("error",{detail:e.detail})},this)},p=function(){},d=function(e,t,n,r){var i,s;if(n)try{i=n(r.detail)}catch(o){s=o}else i=r.detail;i instanceof h?i.then(function(e){t.resolve(e)},function(e){t.reject(e)}):n&&i?t.resolve(i):s?t.reject(s):t[e](i)};h.prototype={then:function(e,t){var n=new h;return this.isResolved&&r.async(function(){d("resolve",n,e,{detail:this.resolvedValue})},this),this.isRejected&&r.async(function(){d("reject",n,t,{detail:this.rejectedValue})},this),this.on("promise:resolved",function(t){d("resolve",n,e,t)}),this.on("promise:failed",function(e){d("reject",n,t,e)}),n},resolve:function(e){v(this,e),this.resolve=p,this.reject=p},reject:function(e){m(this,e),this.resolve=p,this.reject=p}},c.mixin(h.prototype),r={async:i,Promise:h,Event:a,EventTarget:c},e.RSVP=r})(window),function(e,t){"use strict";RSVP.all=function(e){var t,n=[],r=new RSVP.Promise,i=e.length,s=function(e){return function(t){o(e,t)}},o=function(e,t){n[e]=t,--i===0&&r.resolve(n)},u=function(e){r.reject(e)};for(t=0;t<i;t++)e[t].then(s(t),u);return r};var n=t.head||t.getElementsByTagName("head")[0],r="basket-",i=5e3,s=function(e,t){try{return localStorage.setItem(r+e,JSON.stringify(t)),!0}catch(n){if(n.name.toUpperCase().indexOf("QUOTA")>=0){var i,o=[];for(i in localStorage)i.indexOf(r)===0&&o.push(JSON.parse(localStorage[i]));if(o.length)return o.sort(function(e,t){return e.stamp-t.stamp}),basket.remove(o[0].key),s(e,t);return}return}},o=function(e){var t=new XMLHttpRequest,n=new RSVP.Promise;return t.open("GET",e),t.onreadystatechange=function(){t.readyState===4&&(t.status===200?n.resolve(t.responseText):n.reject(new Error(t.statusText)))},t.send(),n},u=function(e){return o(e.url).then(function(t){var n=f(e,t);return s(e.key,n),t})},a=function(e){var r=t.createElement("script");r.defer=!0,r.text=e,n.appendChild(r)},f=function(e,t){var n=+(new Date);return e.data=t,e.stamp=n,e.expire=n+(e.expire||i)*60*60*1e3,e},l=function(e){var t,n;if(!e.url)return;return e.key=e.key||e.url,t=basket.get(e.key),e.execute=e.execute!==!1,!t||t.expire- +(new Date)<0||e.unique!==t.unique?(e.unique&&(e.url+=(e.url.indexOf("?")>0?"&":"?")+"basket-unique="+e.unique),n=u(e)):(n=new RSVP.Promise,n.resolve(t.data)),e.execute?n.then(a):n};e.basket={require:function(){var e,t,n=[];for(e=0,t=arguments.length;e<t;e++)n.push(l(arguments[e]));return RSVP.all(n)},remove:function(e){return localStorage.removeItem(r+e),this},get:function(e){var t=localStorage.getItem(r+e);try{return JSON.parse(t||"false")}catch(n){return!1}},clear:function(e){var t,n,i=+(new Date);for(t in localStorage)n=t.split(r)[1],n&&(!e||this.get(n).expire<=i)&&this.remove(n);return this}},basket.clear(!0)}(this,document);