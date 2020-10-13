!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./src/js/main.js")}({"./src/js/main.js":function(e,t){document.addEventListener("DOMContentLoaded",(function(){let e,t;!async function(){try{const o=await fetch("https://dog.ceo/api/breeds/list/all"),r=await o.json();n=r.message,document.getElementById("breed").innerHTML=`\n  <select id="breeds">\n        <option>Choose a dog breed</option>\n        ${Object.keys(n).map((function(e){return`<option>${e}</option>`})).join("")}\n      </select>\n  `,document.querySelector("#breeds").addEventListener("change",(n=>{async function o(){if("Choose a dog breed"!=n.target.value){const o=await fetch(`https://dog.ceo/api/breed/${n.target.value}/images`);!function(n){let o=0;function r(){document.getElementById("slideshow").insertAdjacentHTML("beforeend",`<div class="slide" style="background-image: url('${n[o]}')"></div>`),t=setTimeout((function(){document.querySelector(".slide").remove()}),1e3),o+1>=n.length?o=0:o++}clearInterval(e),clearTimeout(t),n.length>1?(document.getElementById("slideshow").innerHTML=`\n  <div class="slide" style="background-image: url('${n[0]}')"></div>\n  <div class="slide" style="background-image: url('${n[1]}')"></div>\n  `,o+=2,2==n.length&&(o=0),e=setInterval(r,3e3)):document.getElementById("slideshow").innerHTML=`\n  <div class="slide" style="background-image: url('${n[0]}')"></div>\n  <div class="slide"></div>\n  `}((await o.json()).message)}}o()}))}catch(e){console.log("There was a problem fetching the breed list.")}var n}()}))}});