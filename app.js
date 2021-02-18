!function(t){var e={};function n(o){if(e[o])return e[o].exports;var l=e[o]={i:o,l:!1,exports:{}};return t[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var l in t)n.d(o,l,function(e){return t[e]}.bind(null,l));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="./src/js/main.js")}({"./src/js/main.js":function(t,e){document.addEventListener("DOMContentLoaded",(function(){window.addEventListener("load",(t=>{document.querySelector(".preload").classList.add("preload-finished")}));const t=document.getElementById("btnScrollToTop");t&&t.addEventListener("click",(t=>{window.scrollTo({top:0,left:0,behavior:"smooth"})}));const e=document.getElementById("header");window.addEventListener("scroll",(n=>{document.documentElement.scrollTop>0?(e.classList.add("sticky"),t.style.opacity=1):(e.classList.remove("sticky"),t.style.opacity=0)}));const n=document.getElementById("toggleThemeBtn");function o(t){localStorage.setItem("theme",t),document.documentElement.className=t}"theme-dark"===localStorage.getItem("theme")?(o("theme-dark"),n.innerText="Light Mode"):(o("theme-light"),n.innerText="Dark Mode"),n.addEventListener("click",(t=>{"theme-dark"===localStorage.getItem("theme")?(o("theme-light"),n.innerText="Dark Mode"):(o("theme-dark"),n.innerText="Light Mode")}));async function l(){const e=document.getElementById("countriesContainer");(await new Promise(((t,e)=>{fetch("https://restcountries.eu/rest/v2/all").then((t=>{if(!t.ok)throw Error(`${t.statusText} - ${t.url}`);return t.json()})).then((e=>t(e))).catch((t=>e(t)))}))).forEach((n=>{const{name:o,population:l,region:s,capital:a,flag:i,nativeName:r,subregion:c,topLevelDomain:d,currencies:m,languages:u,borders:g}=n;let p=document.createElement("div");p.classList.add("box"),p.classList.add("active"),p.innerHTML=`\n\t\t\t\t\t\t<div class="box__top">\n\t\t\t\t\t\t\t<img src="${i}" loading="lazy" alt="flag of a ${o}" />\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="box__bottom">\n\t\t\t\t\t\t\t<h3 class="box__title">${o}</h3>\n\t\t\t\t\t\t\t<ul class="box__info-list">\n\t\t\t\t\t\t\t\t<li class="box__info-list-item">\n\t\t\t\t\t\t\t\t\t<span class="box__info-list-item--bold">Populaiton:</span>\n\t\t\t\t\t\t\t\t\t${l}\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t<li class="box__info-list-item">\n\t\t\t\t\t\t\t\t\t<span class="box__info-list-item--bold">Region:</span> <b>${s}</b> \n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t<li class="box__info-list-item">\n\t\t\t\t\t\t\t\t\t<span class="box__info-list-item--bold">Capitol:</span> ${a}\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t`,e.appendChild(p),p.addEventListener("click",(e=>{const n=document.getElementById("modal-container");n.style.display="flex",t.style.opacity=0,n.innerHTML=`\n\t\t\t\t<div class="modal">\n\t\t\t\t\t\t<div class="modal__header">\n\t\t\t\t\t\t\t<button class="modal__btn" id="close-modal">\n\t\t\t\t\t\t\t\t<svg\n\t\t\t\t\t\t\t\t\taria-hidden="true"\n\t\t\t\t\t\t\t\t\tfocusable="false"\n\t\t\t\t\t\t\t\t\tdata-prefix="fas"\n\t\t\t\t\t\t\t\t\tdata-icon="arrow-left"\n\t\t\t\t\t\t\t\t\tclass="svg-inline--fa fa-arrow-left fa-w-14"\n\t\t\t\t\t\t\t\t\trole="img"\n\t\t\t\t\t\t\t\t\txmlns="http://www.w3.org/2000/svg"\n\t\t\t\t\t\t\t\t\tviewBox="0 0 448 512"\n\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t<path\n\t\t\t\t\t\t\t\t\t\tfill="currentColor"\n\t\t\t\t\t\t\t\t\t\td="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"\n\t\t\t\t\t\t\t\t\t></path></svg\n\t\t\t\t\t\t\t\t><span>Back</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="modal__container">\n\t\t\t\t\t\t\t<div class="modal__left">\n\t\t\t\t\t\t\t\t<img\n\t\t\t\t\t\t\t\t\tsrc="${i}"\n\t\t\t\t\t\t\t\t\tloading="lazy"\n\t\t\t\t\t\t\t\t\talt="flag of a ${o}"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="modal__right">\n\t\t\t\t\t\t\t\t<h2 class="modal__right-title">${o}</h2>\n\t\t\t\t\t\t\t\t<ul class="modal__right-list">\n\t\t\t\t\t\t\t\t\t<li class="modal__right-list-item">\n\t\t\t\t\t\t\t\t\t\t<strong>Native Name:</strong> <span>${r}</span>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li class="modal__right-list-item">\n\t\t\t\t\t\t\t\t\t\t<strong>Population:</strong> <span>${l}</span>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li class="modal__right-list-item">\n\t\t\t\t\t\t\t\t\t\t<strong>Region:</strong> <span>${s}</span>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li class="modal__right-list-item">\n\t\t\t\t\t\t\t\t\t\t<strong>Sub Region:</strong> <span>${c}</span>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li class="modal__right-list-item">\n\t\t\t\t\t\t\t\t\t\t<strong>Capital:</strong> <span>${a}</span>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li class="modal__right-list-item">\n\t\t\t\t\t\t\t\t\t\t<strong>Top Level Domain:</strong> <span>${d}</span>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li class="modal__right-list-item">\n\t\t\t\t\t\t\t\t\t\t<strong>Currencies:</strong> <span>${m.map((t=>t.name))}</span>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li class="modal__right-list-item">\n\t\t\t\t\t\t\t\t\t\t<strong>Languages:</strong> <span>${u.map((t=>t.name))}</span>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t<div class="modal__right-bottom">\n\t\t\t\t\t\t\t\t\t<p class="modal__right-bottom--text">\n\t\t\t\t\t\t\t\t\t\t<strong>Border countries:</strong>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t${g.map((t=>`<button class="modal__right-bottom-btn">${t}</button>`)).join("")}\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t`,"flex"===n.style.display&&(document.body.style.overflow="hidden",n.style.display="flex");document.getElementById("close-modal").addEventListener("click",(t=>{n.style.display="",document.body.style.overflowY="scroll"}))}))}))}l();let s=document.getElementById("searchInput");s.addEventListener("input",(function(t){let e=t.target.value.toUpperCase();document.querySelectorAll(".box").forEach((t=>{countryName=t.getElementsByTagName("h3")[0].innerText.toUpperCase(),t.classList.contains("active")&&countryName.indexOf(e)>-1?t.style.display="flex":t.style.display="none"}))}));document.getElementById("region").addEventListener("change",(t=>{const e=t.currentTarget.value.toUpperCase(),n=document.querySelectorAll(".box");s.value="",n.forEach((t=>{countryRegion=t.getElementsByTagName("b")[0].innerText.toUpperCase(),countryRegion.indexOf(e)>-1||"ALL"===e?(t.style.display="flex",t.classList.add("active")):(t.style.display="none",t.classList.remove("active"))}))}))}))}});