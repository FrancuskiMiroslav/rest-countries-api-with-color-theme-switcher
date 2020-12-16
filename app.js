/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', function () {
	const toggleThemeBtn = document.getElementById('toggleThemeBtn');

	// function to set a given theme/color-scheme
	function setTheme(themeName) {
		localStorage.setItem('theme', themeName);
		document.documentElement.className = themeName;
	}

	// function to toggle between light and dark theme
	function toggleTheme() {
		if (localStorage.getItem('theme') === 'theme-dark') {
			setTheme('theme-light');
			toggleThemeBtn.innerText = 'Dark Mode';
		} else {
			setTheme('theme-dark');
			toggleThemeBtn.innerText = 'Light Mode';
		}
	}

	// Immediately invoked function to set the theme on initial load
	(function () {
		if (localStorage.getItem('theme') === 'theme-dark') {
			setTheme('theme-dark');
			toggleThemeBtn.innerText = 'Light Mode';
		} else {
			setTheme('theme-light');
			toggleThemeBtn.innerText = 'Dark Mode';
		}
	})();

	toggleThemeBtn.addEventListener('click', (e) => {
		toggleTheme();
	});

	const countriesUrl = 'https://restcountries.eu/rest/v2/all';
	const countriesContainer = document.getElementById('countriesContainer');

	function getCountriesData() {
		return new Promise((resolve, reject) => {
			fetch(countriesUrl)
				.then((resp) => {
					if (!resp.ok) {
						throw Error(`${resp.statusText} - ${resp.url}`);
					}
					return resp.json();
				})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	async function displayCountriesNumbers() {
		const countriesList = await getCountriesData();

		countriesContainer.innerHTML = countriesList
			.map((country) => {
				const { name, population, region, capital, flag } = country;

				return `
					<div class="box active">
						<div class="box__top">
							<img src="${flag}" loading="lazy" alt="flag of a ${name}" />
						</div>

						<div class="box__bottom">
							<h3 class="box__title">${name}</h3>
							<ul class="box__info-list">
								<li class="box__info-list-item">
									<span class="box__info-list-item--bold">Populaiton:</span>
									${population}
								</li>
								<li class="box__info-list-item">
									<span class="box__info-list-item--bold">Region:</span> <b>${region}</b> 
								</li>
								<li class="box__info-list-item">
									<span class="box__info-list-item--bold">Capitol:</span> ${capital}
								</li>
							</ul>
						</div>
					</div>
					`;
			})
			.join('');
	}

	(function () {
		displayCountriesNumbers();
	})();

	let searchInput = document.getElementById('searchInput');

	searchInput.addEventListener('input', filterSearch);

	function filterSearch(e) {
		let inputValue = e.target.value.toUpperCase();
		const countries = document.querySelectorAll('.box');

		countries.forEach((country) => {
			countryName = country
				.getElementsByTagName('h3')[0]
				.innerText.toUpperCase();

			if (
				country.classList.contains('active') &&
				countryName.indexOf(inputValue) > -1
			) {
				country.style.display = 'flex';
			} else {
				country.style.display = 'none';
			}
		});
	}

	const regionSelect = document.getElementById('region');

	regionSelect.addEventListener('change', (e) => {
		const region = e.currentTarget.value.toUpperCase();
		const countries = document.querySelectorAll('.box');

		countries.forEach((country) => {
			countryRegion = country
				.getElementsByTagName('b')[0]
				.innerText.toUpperCase();

			if (countryRegion.indexOf(region) > -1) {
				country.style.display = 'flex';
				country.classList.add('active');
			} else if (region === 'ALL') {
				country.style.display = 'flex';
				country.classList.add('active');
			} else {
				country.style.display = 'none';
				country.classList.remove('active');
			}
		});
	});
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0JBQWdCLEtBQUssU0FBUztBQUNuRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVywwQ0FBMEM7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLLGtDQUFrQyxLQUFLO0FBQy9EOztBQUVBO0FBQ0EsZ0NBQWdDLEtBQUs7QUFDckM7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxxRUFBcUUsT0FBTztBQUM1RTtBQUNBO0FBQ0EsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGLENBQUMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvbWFpbi5qc1wiKTtcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IHRvZ2dsZVRoZW1lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZ2dsZVRoZW1lQnRuJyk7XG5cblx0Ly8gZnVuY3Rpb24gdG8gc2V0IGEgZ2l2ZW4gdGhlbWUvY29sb3Itc2NoZW1lXG5cdGZ1bmN0aW9uIHNldFRoZW1lKHRoZW1lTmFtZSkge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aGVtZScsIHRoZW1lTmFtZSk7XG5cdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTmFtZSA9IHRoZW1lTmFtZTtcblx0fVxuXG5cdC8vIGZ1bmN0aW9uIHRvIHRvZ2dsZSBiZXR3ZWVuIGxpZ2h0IGFuZCBkYXJrIHRoZW1lXG5cdGZ1bmN0aW9uIHRvZ2dsZVRoZW1lKCkge1xuXHRcdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWUnKSA9PT0gJ3RoZW1lLWRhcmsnKSB7XG5cdFx0XHRzZXRUaGVtZSgndGhlbWUtbGlnaHQnKTtcblx0XHRcdHRvZ2dsZVRoZW1lQnRuLmlubmVyVGV4dCA9ICdEYXJrIE1vZGUnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXRUaGVtZSgndGhlbWUtZGFyaycpO1xuXHRcdFx0dG9nZ2xlVGhlbWVCdG4uaW5uZXJUZXh0ID0gJ0xpZ2h0IE1vZGUnO1xuXHRcdH1cblx0fVxuXG5cdC8vIEltbWVkaWF0ZWx5IGludm9rZWQgZnVuY3Rpb24gdG8gc2V0IHRoZSB0aGVtZSBvbiBpbml0aWFsIGxvYWRcblx0KGZ1bmN0aW9uICgpIHtcblx0XHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RoZW1lJykgPT09ICd0aGVtZS1kYXJrJykge1xuXHRcdFx0c2V0VGhlbWUoJ3RoZW1lLWRhcmsnKTtcblx0XHRcdHRvZ2dsZVRoZW1lQnRuLmlubmVyVGV4dCA9ICdMaWdodCBNb2RlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2V0VGhlbWUoJ3RoZW1lLWxpZ2h0Jyk7XG5cdFx0XHR0b2dnbGVUaGVtZUJ0bi5pbm5lclRleHQgPSAnRGFyayBNb2RlJztcblx0XHR9XG5cdH0pKCk7XG5cblx0dG9nZ2xlVGhlbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdHRvZ2dsZVRoZW1lKCk7XG5cdH0pO1xuXG5cdGNvbnN0IGNvdW50cmllc1VybCA9ICdodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9hbGwnO1xuXHRjb25zdCBjb3VudHJpZXNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRyaWVzQ29udGFpbmVyJyk7XG5cblx0ZnVuY3Rpb24gZ2V0Q291bnRyaWVzRGF0YSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0ZmV0Y2goY291bnRyaWVzVXJsKVxuXHRcdFx0XHQudGhlbigocmVzcCkgPT4ge1xuXHRcdFx0XHRcdGlmICghcmVzcC5vaykge1xuXHRcdFx0XHRcdFx0dGhyb3cgRXJyb3IoYCR7cmVzcC5zdGF0dXNUZXh0fSAtICR7cmVzcC51cmx9YCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiByZXNwLmpzb24oKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHJlc29sdmUoZGF0YSkpXG5cdFx0XHRcdC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBmdW5jdGlvbiBkaXNwbGF5Q291bnRyaWVzTnVtYmVycygpIHtcblx0XHRjb25zdCBjb3VudHJpZXNMaXN0ID0gYXdhaXQgZ2V0Q291bnRyaWVzRGF0YSgpO1xuXG5cdFx0Y291bnRyaWVzQ29udGFpbmVyLmlubmVySFRNTCA9IGNvdW50cmllc0xpc3Rcblx0XHRcdC5tYXAoKGNvdW50cnkpID0+IHtcblx0XHRcdFx0Y29uc3QgeyBuYW1lLCBwb3B1bGF0aW9uLCByZWdpb24sIGNhcGl0YWwsIGZsYWcgfSA9IGNvdW50cnk7XG5cblx0XHRcdFx0cmV0dXJuIGBcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGFjdGl2ZVwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveF9fdG9wXCI+XG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiJHtmbGFnfVwiIGxvYWRpbmc9XCJsYXp5XCIgYWx0PVwiZmxhZyBvZiBhICR7bmFtZX1cIiAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3hfX2JvdHRvbVwiPlxuXHRcdFx0XHRcdFx0XHQ8aDMgY2xhc3M9XCJib3hfX3RpdGxlXCI+JHtuYW1lfTwvaDM+XG5cdFx0XHRcdFx0XHRcdDx1bCBjbGFzcz1cImJveF9faW5mby1saXN0XCI+XG5cdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwiYm94X19pbmZvLWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJib3hfX2luZm8tbGlzdC1pdGVtLS1ib2xkXCI+UG9wdWxhaXRvbjo8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQke3BvcHVsYXRpb259XG5cdFx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJib3hfX2luZm8tbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImJveF9faW5mby1saXN0LWl0ZW0tLWJvbGRcIj5SZWdpb246PC9zcGFuPiA8Yj4ke3JlZ2lvbn08L2I+IFxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwiYm94X19pbmZvLWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJib3hfX2luZm8tbGlzdC1pdGVtLS1ib2xkXCI+Q2FwaXRvbDo8L3NwYW4+ICR7Y2FwaXRhbH1cblx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0YDtcblx0XHRcdH0pXG5cdFx0XHQuam9pbignJyk7XG5cdH1cblxuXHQoZnVuY3Rpb24gKCkge1xuXHRcdGRpc3BsYXlDb3VudHJpZXNOdW1iZXJzKCk7XG5cdH0pKCk7XG5cblx0bGV0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaElucHV0Jyk7XG5cblx0c2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmaWx0ZXJTZWFyY2gpO1xuXG5cdGZ1bmN0aW9uIGZpbHRlclNlYXJjaChlKSB7XG5cdFx0bGV0IGlucHV0VmFsdWUgPSBlLnRhcmdldC52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuXHRcdGNvbnN0IGNvdW50cmllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib3gnKTtcblxuXHRcdGNvdW50cmllcy5mb3JFYWNoKChjb3VudHJ5KSA9PiB7XG5cdFx0XHRjb3VudHJ5TmFtZSA9IGNvdW50cnlcblx0XHRcdFx0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoMycpWzBdXG5cdFx0XHRcdC5pbm5lclRleHQudG9VcHBlckNhc2UoKTtcblxuXHRcdFx0aWYgKFxuXHRcdFx0XHRjb3VudHJ5LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykgJiZcblx0XHRcdFx0Y291bnRyeU5hbWUuaW5kZXhPZihpbnB1dFZhbHVlKSA+IC0xXG5cdFx0XHQpIHtcblx0XHRcdFx0Y291bnRyeS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y291bnRyeS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Y29uc3QgcmVnaW9uU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ2lvbicpO1xuXG5cdHJlZ2lvblNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuXHRcdGNvbnN0IHJlZ2lvbiA9IGUuY3VycmVudFRhcmdldC52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuXHRcdGNvbnN0IGNvdW50cmllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib3gnKTtcblxuXHRcdGNvdW50cmllcy5mb3JFYWNoKChjb3VudHJ5KSA9PiB7XG5cdFx0XHRjb3VudHJ5UmVnaW9uID0gY291bnRyeVxuXHRcdFx0XHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2InKVswXVxuXHRcdFx0XHQuaW5uZXJUZXh0LnRvVXBwZXJDYXNlKCk7XG5cblx0XHRcdGlmIChjb3VudHJ5UmVnaW9uLmluZGV4T2YocmVnaW9uKSA+IC0xKSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdFx0Y291bnRyeS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRcdH0gZWxzZSBpZiAocmVnaW9uID09PSAnQUxMJykge1xuXHRcdFx0XHRjb3VudHJ5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cdFx0XHRcdGNvdW50cnkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb3VudHJ5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdGNvdW50cnkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufSk7XG4iXSwicHJlRXhpc3RpbmdDb21tZW50IjoiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBaUxDSjNaV0p3WVdOck9pOHZMeTR2YzNKakwycHpMMjFoYVc0dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdFJRVUZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPenM3VVVGSFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNNRU5CUVRCRExHZERRVUZuUXp0UlFVTXhSVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJMSGRFUVVGM1JDeHJRa0ZCYTBJN1VVRkRNVVU3VVVGRFFTeHBSRUZCYVVRc1kwRkJZenRSUVVNdlJEczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFc2VVTkJRWGxETEdsRFFVRnBRenRSUVVNeFJTeG5TRUZCWjBnc2JVSkJRVzFDTEVWQlFVVTdVVUZEY2trN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN3eVFrRkJNa0lzTUVKQlFUQkNMRVZCUVVVN1VVRkRka1FzYVVOQlFXbERMR1ZCUVdVN1VVRkRhRVE3VVVGRFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFc2MwUkJRWE5FTEN0RVFVRXJSRHM3VVVGRmNrZzdVVUZEUVRzN08xRkJSMEU3VVVGRFFUczdPenM3T3pzN096czdPMEZEYkVaQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdRVUZEUVR0QlFVTkJPMEZCUTBFc1JVRkJSVHM3UVVGRlJqdEJRVU5CTzBGQlEwRXNSVUZCUlRzN1FVRkZSanRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3h4UWtGQmNVSXNaMEpCUVdkQ0xFdEJRVXNzVTBGQlV6dEJRVU51UkR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNWMEZCVnl3d1EwRkJNRU03TzBGQlJYSkVPMEZCUTBFN1FVRkRRVHRCUVVOQkxHMUNRVUZ0UWl4TFFVRkxMR3REUVVGclF5eExRVUZMTzBGQlF5OUVPenRCUVVWQk8wRkJRMEVzWjBOQlFXZERMRXRCUVVzN1FVRkRja003UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnp0QlFVTllPMEZCUTBFN1FVRkRRU3h4UlVGQmNVVXNUMEZCVHp0QlFVTTFSVHRCUVVOQk8wRkJRMEVzYlVWQlFXMUZPMEZCUTI1Rk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SlFVRkpPMEZCUTBvN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNSVUZCUlRzN1FVRkZSanM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVsQlFVazdRVUZEU2p0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEpRVUZKTzBGQlEwbzdRVUZEUVR0QlFVTkJMRWxCUVVrN1FVRkRTanRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZ3NSVUZCUlR0QlFVTkdMRU5CUVVNaUxDSm1hV3hsSWpvaU1tWTFZVFpoWlRoak5XWmlNemN6WWpVeE5XSXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJZ1hIUXZMeUJVYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSMllYSWdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN5QTlJSHQ5TzF4dVhHNGdYSFF2THlCVWFHVWdjbVZ4ZFdseVpTQm1kVzVqZEdsdmJseHVJRngwWm5WdVkzUnBiMjRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlodGIyUjFiR1ZKWkNrZ2UxeHVYRzRnWEhSY2RDOHZJRU5vWldOcklHbG1JRzF2WkhWc1pTQnBjeUJwYmlCallXTm9aVnh1SUZ4MFhIUnBaaWhwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYU2tnZTF4dUlGeDBYSFJjZEhKbGRIVnliaUJwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYUzVsZUhCdmNuUnpPMXh1SUZ4MFhIUjlYRzRnWEhSY2RDOHZJRU55WldGMFpTQmhJRzVsZHlCdGIyUjFiR1VnS0dGdVpDQndkWFFnYVhRZ2FXNTBieUIwYUdVZ1kyRmphR1VwWEc0Z1hIUmNkSFpoY2lCdGIyUjFiR1VnUFNCcGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFNBOUlIdGNiaUJjZEZ4MFhIUnBPaUJ0YjJSMWJHVkpaQ3hjYmlCY2RGeDBYSFJzT2lCbVlXeHpaU3hjYmlCY2RGeDBYSFJsZUhCdmNuUnpPaUI3ZlZ4dUlGeDBYSFI5TzF4dVhHNGdYSFJjZEM4dklFVjRaV04xZEdVZ2RHaGxJRzF2WkhWc1pTQm1kVzVqZEdsdmJseHVJRngwWEhSdGIyUjFiR1Z6VzIxdlpIVnNaVWxrWFM1allXeHNLRzF2WkhWc1pTNWxlSEJ2Y25SekxDQnRiMlIxYkdVc0lHMXZaSFZzWlM1bGVIQnZjblJ6TENCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktUdGNibHh1SUZ4MFhIUXZMeUJHYkdGbklIUm9aU0J0YjJSMWJHVWdZWE1nYkc5aFpHVmtYRzRnWEhSY2RHMXZaSFZzWlM1c0lEMGdkSEoxWlR0Y2JseHVJRngwWEhRdkx5QlNaWFIxY200Z2RHaGxJR1Y0Y0c5eWRITWdiMllnZEdobElHMXZaSFZzWlZ4dUlGeDBYSFJ5WlhSMWNtNGdiVzlrZFd4bExtVjRjRzl5ZEhNN1hHNGdYSFI5WEc1Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdWeklHOWlhbVZqZENBb1gxOTNaV0p3WVdOclgyMXZaSFZzWlhOZlh5bGNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJTQTlJRzF2WkhWc1pYTTdYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1NZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWek8xeHVYRzRnWEhRdkx5QmtaV1pwYm1VZ1oyVjBkR1Z5SUdaMWJtTjBhVzl1SUdadmNpQm9ZWEp0YjI1NUlHVjRjRzl5ZEhOY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WkNBOUlHWjFibU4wYVc5dUtHVjRjRzl5ZEhNc0lHNWhiV1VzSUdkbGRIUmxjaWtnZTF4dUlGeDBYSFJwWmlnaFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXZLR1Y0Y0c5eWRITXNJRzVoYldVcEtTQjdYRzRnWEhSY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUc1aGJXVXNJSHNnWlc1MWJXVnlZV0pzWlRvZ2RISjFaU3dnWjJWME9pQm5aWFIwWlhJZ2ZTazdYRzRnWEhSY2RIMWNiaUJjZEgwN1hHNWNiaUJjZEM4dklHUmxabWx1WlNCZlgyVnpUVzlrZFd4bElHOXVJR1Y0Y0c5eWRITmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNpQTlJR1oxYm1OMGFXOXVLR1Y0Y0c5eWRITXBJSHRjYmlCY2RGeDBhV1lvZEhsd1pXOW1JRk41YldKdmJDQWhQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWWdVM2x0WW05c0xuUnZVM1J5YVc1blZHRm5LU0I3WEc0Z1hIUmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lGTjViV0p2YkM1MGIxTjBjbWx1WjFSaFp5d2dleUIyWVd4MVpUb2dKMDF2WkhWc1pTY2dmU2s3WEc0Z1hIUmNkSDFjYmlCY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUNkZlgyVnpUVzlrZFd4bEp5d2dleUIyWVd4MVpUb2dkSEoxWlNCOUtUdGNiaUJjZEgwN1hHNWNiaUJjZEM4dklHTnlaV0YwWlNCaElHWmhhMlVnYm1GdFpYTndZV05sSUc5aWFtVmpkRnh1SUZ4MEx5OGdiVzlrWlNBbUlERTZJSFpoYkhWbElHbHpJR0VnYlc5a2RXeGxJR2xrTENCeVpYRjFhWEpsSUdsMFhHNGdYSFF2THlCdGIyUmxJQ1lnTWpvZ2JXVnlaMlVnWVd4c0lIQnliM0JsY25ScFpYTWdiMllnZG1Gc2RXVWdhVzUwYnlCMGFHVWdibk5jYmlCY2RDOHZJRzF2WkdVZ0ppQTBPaUJ5WlhSMWNtNGdkbUZzZFdVZ2QyaGxiaUJoYkhKbFlXUjVJRzV6SUc5aWFtVmpkRnh1SUZ4MEx5OGdiVzlrWlNBbUlEaDhNVG9nWW1Wb1lYWmxJR3hwYTJVZ2NtVnhkV2x5WlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTUwSUQwZ1puVnVZM1JwYjI0b2RtRnNkV1VzSUcxdlpHVXBJSHRjYmlCY2RGeDBhV1lvYlc5a1pTQW1JREVwSUhaaGJIVmxJRDBnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHloMllXeDFaU2s3WEc0Z1hIUmNkR2xtS0cxdlpHVWdKaUE0S1NCeVpYUjFjbTRnZG1Gc2RXVTdYRzRnWEhSY2RHbG1LQ2h0YjJSbElDWWdOQ2tnSmlZZ2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmIySnFaV04wSnlBbUppQjJZV3gxWlNBbUppQjJZV3gxWlM1ZlgyVnpUVzlrZFd4bEtTQnlaWFIxY200Z2RtRnNkV1U3WEc0Z1hIUmNkSFpoY2lCdWN5QTlJRTlpYW1WamRDNWpjbVZoZEdVb2JuVnNiQ2s3WEc0Z1hIUmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y2lodWN5azdYRzRnWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2h1Y3l3Z0oyUmxabUYxYkhRbkxDQjdJR1Z1ZFcxbGNtRmliR1U2SUhSeWRXVXNJSFpoYkhWbE9pQjJZV3gxWlNCOUtUdGNiaUJjZEZ4MGFXWW9iVzlrWlNBbUlESWdKaVlnZEhsd1pXOW1JSFpoYkhWbElDRTlJQ2R6ZEhKcGJtY25LU0JtYjNJb2RtRnlJR3RsZVNCcGJpQjJZV3gxWlNrZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWtLRzV6TENCclpYa3NJR1oxYm1OMGFXOXVLR3RsZVNrZ2V5QnlaWFIxY200Z2RtRnNkV1ZiYTJWNVhUc2dmUzVpYVc1a0tHNTFiR3dzSUd0bGVTa3BPMXh1SUZ4MFhIUnlaWFIxY200Z2JuTTdYRzRnWEhSOU8xeHVYRzRnWEhRdkx5Qm5aWFJFWldaaGRXeDBSWGh3YjNKMElHWjFibU4wYVc5dUlHWnZjaUJqYjIxd1lYUnBZbWxzYVhSNUlIZHBkR2dnYm05dUxXaGhjbTF2Ym5rZ2JXOWtkV3hsYzF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV1SUQwZ1puVnVZM1JwYjI0b2JXOWtkV3hsS1NCN1hHNGdYSFJjZEhaaGNpQm5aWFIwWlhJZ1BTQnRiMlIxYkdVZ0ppWWdiVzlrZFd4bExsOWZaWE5OYjJSMWJHVWdQMXh1SUZ4MFhIUmNkR1oxYm1OMGFXOXVJR2RsZEVSbFptRjFiSFFvS1NCN0lISmxkSFZ5YmlCdGIyUjFiR1ZiSjJSbFptRjFiSFFuWFRzZ2ZTQTZYRzRnWEhSY2RGeDBablZ1WTNScGIyNGdaMlYwVFc5a2RXeGxSWGh3YjNKMGN5Z3BJSHNnY21WMGRYSnVJRzF2WkhWc1pUc2dmVHRjYmlCY2RGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVrS0dkbGRIUmxjaXdnSjJFbkxDQm5aWFIwWlhJcE8xeHVJRngwWEhSeVpYUjFjbTRnWjJWMGRHVnlPMXh1SUZ4MGZUdGNibHh1SUZ4MEx5OGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtOGdQU0JtZFc1amRHbHZiaWh2WW1wbFkzUXNJSEJ5YjNCbGNuUjVLU0I3SUhKbGRIVnliaUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYjJKcVpXTjBMQ0J3Y205d1pYSjBlU2s3SUgwN1hHNWNiaUJjZEM4dklGOWZkMlZpY0dGamExOXdkV0pzYVdOZmNHRjBhRjlmWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbkFnUFNCY0lsd2lPMXh1WEc1Y2JpQmNkQzh2SUV4dllXUWdaVzUwY25rZ2JXOWtkV3hsSUdGdVpDQnlaWFIxY200Z1pYaHdiM0owYzF4dUlGeDBjbVYwZFhKdUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9YMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV6SUQwZ1hDSXVMM055WXk5cWN5OXRZV2x1TG1welhDSXBPMXh1SWl3aVpHOWpkVzFsYm5RdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnblJFOU5RMjl1ZEdWdWRFeHZZV1JsWkNjc0lHWjFibU4wYVc5dUlDZ3BJSHRjYmx4MFkyOXVjM1FnZEc5bloyeGxWR2hsYldWQ2RHNGdQU0JrYjJOMWJXVnVkQzVuWlhSRmJHVnRaVzUwUW5sSlpDZ25kRzluWjJ4bFZHaGxiV1ZDZEc0bktUdGNibHh1WEhRdkx5Qm1kVzVqZEdsdmJpQjBieUJ6WlhRZ1lTQm5hWFpsYmlCMGFHVnRaUzlqYjJ4dmNpMXpZMmhsYldWY2JseDBablZ1WTNScGIyNGdjMlYwVkdobGJXVW9kR2hsYldWT1lXMWxLU0I3WEc1Y2RGeDBiRzlqWVd4VGRHOXlZV2RsTG5ObGRFbDBaVzBvSjNSb1pXMWxKeXdnZEdobGJXVk9ZVzFsS1R0Y2JseDBYSFJrYjJOMWJXVnVkQzVrYjJOMWJXVnVkRVZzWlcxbGJuUXVZMnhoYzNOT1lXMWxJRDBnZEdobGJXVk9ZVzFsTzF4dVhIUjlYRzVjYmx4MEx5OGdablZ1WTNScGIyNGdkRzhnZEc5bloyeGxJR0psZEhkbFpXNGdiR2xuYUhRZ1lXNWtJR1JoY21zZ2RHaGxiV1ZjYmx4MFpuVnVZM1JwYjI0Z2RHOW5aMnhsVkdobGJXVW9LU0I3WEc1Y2RGeDBhV1lnS0d4dlkyRnNVM1J2Y21GblpTNW5aWFJKZEdWdEtDZDBhR1Z0WlNjcElEMDlQU0FuZEdobGJXVXRaR0Z5YXljcElIdGNibHgwWEhSY2RITmxkRlJvWlcxbEtDZDBhR1Z0WlMxc2FXZG9kQ2NwTzF4dVhIUmNkRngwZEc5bloyeGxWR2hsYldWQ2RHNHVhVzV1WlhKVVpYaDBJRDBnSjBSaGNtc2dUVzlrWlNjN1hHNWNkRngwZlNCbGJITmxJSHRjYmx4MFhIUmNkSE5sZEZSb1pXMWxLQ2QwYUdWdFpTMWtZWEpySnlrN1hHNWNkRngwWEhSMGIyZG5iR1ZVYUdWdFpVSjBiaTVwYm01bGNsUmxlSFFnUFNBblRHbG5hSFFnVFc5a1pTYzdYRzVjZEZ4MGZWeHVYSFI5WEc1Y2JseDBMeThnU1cxdFpXUnBZWFJsYkhrZ2FXNTJiMnRsWkNCbWRXNWpkR2x2YmlCMGJ5QnpaWFFnZEdobElIUm9aVzFsSUc5dUlHbHVhWFJwWVd3Z2JHOWhaRnh1WEhRb1puVnVZM1JwYjI0Z0tDa2dlMXh1WEhSY2RHbG1JQ2hzYjJOaGJGTjBiM0poWjJVdVoyVjBTWFJsYlNnbmRHaGxiV1VuS1NBOVBUMGdKM1JvWlcxbExXUmhjbXNuS1NCN1hHNWNkRngwWEhSelpYUlVhR1Z0WlNnbmRHaGxiV1V0WkdGeWF5Y3BPMXh1WEhSY2RGeDBkRzluWjJ4bFZHaGxiV1ZDZEc0dWFXNXVaWEpVWlhoMElEMGdKMHhwWjJoMElFMXZaR1VuTzF4dVhIUmNkSDBnWld4elpTQjdYRzVjZEZ4MFhIUnpaWFJVYUdWdFpTZ25kR2hsYldVdGJHbG5hSFFuS1R0Y2JseDBYSFJjZEhSdloyZHNaVlJvWlcxbFFuUnVMbWx1Ym1WeVZHVjRkQ0E5SUNkRVlYSnJJRTF2WkdVbk8xeHVYSFJjZEgxY2JseDBmU2tvS1R0Y2JseHVYSFIwYjJkbmJHVlVhR1Z0WlVKMGJpNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lDaGxLU0E5UGlCN1hHNWNkRngwZEc5bloyeGxWR2hsYldVb0tUdGNibHgwZlNrN1hHNWNibHgwWTI5dWMzUWdZMjkxYm5SeWFXVnpWWEpzSUQwZ0oyaDBkSEJ6T2k4dmNtVnpkR052ZFc1MGNtbGxjeTVsZFM5eVpYTjBMM1l5TDJGc2JDYzdYRzVjZEdOdmJuTjBJR052ZFc1MGNtbGxjME52Ym5SaGFXNWxjaUE5SUdSdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtLQ2RqYjNWdWRISnBaWE5EYjI1MFlXbHVaWEluS1R0Y2JseHVYSFJtZFc1amRHbHZiaUJuWlhSRGIzVnVkSEpwWlhORVlYUmhLQ2tnZTF4dVhIUmNkSEpsZEhWeWJpQnVaWGNnVUhKdmJXbHpaU2dvY21WemIyeDJaU3dnY21WcVpXTjBLU0E5UGlCN1hHNWNkRngwWEhSbVpYUmphQ2hqYjNWdWRISnBaWE5WY213cFhHNWNkRngwWEhSY2RDNTBhR1Z1S0NoeVpYTndLU0E5UGlCN1hHNWNkRngwWEhSY2RGeDBhV1lnS0NGeVpYTndMbTlyS1NCN1hHNWNkRngwWEhSY2RGeDBYSFIwYUhKdmR5QkZjbkp2Y2loZ0pIdHlaWE53TG5OMFlYUjFjMVJsZUhSOUlDMGdKSHR5WlhOd0xuVnliSDFnS1R0Y2JseDBYSFJjZEZ4MFhIUjlYRzVjZEZ4MFhIUmNkRngwY21WMGRYSnVJSEpsYzNBdWFuTnZiaWdwTzF4dVhIUmNkRngwWEhSOUtWeHVYSFJjZEZ4MFhIUXVkR2hsYmlnb1pHRjBZU2tnUFQ0Z2NtVnpiMngyWlNoa1lYUmhLU2xjYmx4MFhIUmNkRngwTG1OaGRHTm9LQ2hsY25JcElEMCtJSEpsYW1WamRDaGxjbklwS1R0Y2JseDBYSFI5S1R0Y2JseDBmVnh1WEc1Y2RHRnplVzVqSUdaMWJtTjBhVzl1SUdScGMzQnNZWGxEYjNWdWRISnBaWE5PZFcxaVpYSnpLQ2tnZTF4dVhIUmNkR052Ym5OMElHTnZkVzUwY21sbGMweHBjM1FnUFNCaGQyRnBkQ0JuWlhSRGIzVnVkSEpwWlhORVlYUmhLQ2s3WEc1Y2JseDBYSFJqYjNWdWRISnBaWE5EYjI1MFlXbHVaWEl1YVc1dVpYSklWRTFNSUQwZ1kyOTFiblJ5YVdWelRHbHpkRnh1WEhSY2RGeDBMbTFoY0Nnb1kyOTFiblJ5ZVNrZ1BUNGdlMXh1WEhSY2RGeDBYSFJqYjI1emRDQjdJRzVoYldVc0lIQnZjSFZzWVhScGIyNHNJSEpsWjJsdmJpd2dZMkZ3YVhSaGJDd2dabXhoWnlCOUlEMGdZMjkxYm5SeWVUdGNibHh1WEhSY2RGeDBYSFJ5WlhSMWNtNGdZRnh1WEhSY2RGeDBYSFJjZER4a2FYWWdZMnhoYzNNOVhDSmliM2dnWVdOMGFYWmxYQ0krWEc1Y2RGeDBYSFJjZEZ4MFhIUThaR2wySUdOc1lYTnpQVndpWW05NFgxOTBiM0JjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwUEdsdFp5QnpjbU05WENJa2UyWnNZV2Q5WENJZ2JHOWhaR2x1WnoxY0lteGhlbmxjSWlCaGJIUTlYQ0ptYkdGbklHOW1JR0VnSkh0dVlXMWxmVndpSUM4K1hHNWNkRngwWEhSY2RGeDBYSFE4TDJScGRqNWNibHh1WEhSY2RGeDBYSFJjZEZ4MFBHUnBkaUJqYkdGemN6MWNJbUp2ZUY5ZlltOTBkRzl0WENJK1hHNWNkRngwWEhSY2RGeDBYSFJjZER4b015QmpiR0Z6Y3oxY0ltSnZlRjlmZEdsMGJHVmNJajRrZTI1aGJXVjlQQzlvTXo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwUEhWc0lHTnNZWE56UFZ3aVltOTRYMTlwYm1adkxXeHBjM1JjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhROGJHa2dZMnhoYzNNOVhDSmliM2hmWDJsdVptOHRiR2x6ZEMxcGRHVnRYQ0krWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROGMzQmhiaUJqYkdGemN6MWNJbUp2ZUY5ZmFXNW1ieTFzYVhOMExXbDBaVzB0TFdKdmJHUmNJajVRYjNCMWJHRnBkRzl1T2p3dmMzQmhiajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZENSN2NHOXdkV3hoZEdsdmJuMWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUThMMnhwUGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZER4c2FTQmpiR0Z6Y3oxY0ltSnZlRjlmYVc1bWJ5MXNhWE4wTFdsMFpXMWNJajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER4emNHRnVJR05zWVhOelBWd2lZbTk0WDE5cGJtWnZMV3hwYzNRdGFYUmxiUzB0WW05c1pGd2lQbEpsWjJsdmJqbzhMM053WVc0K0lEeGlQaVI3Y21WbmFXOXVmVHd2WWo0Z1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFBDOXNhVDVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFE4YkdrZ1kyeGhjM005WENKaWIzaGZYMmx1Wm04dGJHbHpkQzFwZEdWdFhDSStYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFE4YzNCaGJpQmpiR0Z6Y3oxY0ltSnZlRjlmYVc1bWJ5MXNhWE4wTFdsMFpXMHRMV0p2YkdSY0lqNURZWEJwZEc5c09qd3ZjM0JoYmo0Z0pIdGpZWEJwZEdGc2ZWeHVYSFJjZEZ4MFhIUmNkRngwWEhSY2REd3ZiR2srWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRHd2ZFd3K1hHNWNkRngwWEhSY2RGeDBYSFE4TDJScGRqNWNibHgwWEhSY2RGeDBYSFE4TDJScGRqNWNibHgwWEhSY2RGeDBYSFJnTzF4dVhIUmNkRngwZlNsY2JseDBYSFJjZEM1cWIybHVLQ2NuS1R0Y2JseDBmVnh1WEc1Y2RDaG1kVzVqZEdsdmJpQW9LU0I3WEc1Y2RGeDBaR2x6Y0d4aGVVTnZkVzUwY21sbGMwNTFiV0psY25Nb0tUdGNibHgwZlNrb0tUdGNibHh1WEhSc1pYUWdjMlZoY21Ob1NXNXdkWFFnUFNCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2duYzJWaGNtTm9TVzV3ZFhRbktUdGNibHh1WEhSelpXRnlZMmhKYm5CMWRDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZHBibkIxZENjc0lHWnBiSFJsY2xObFlYSmphQ2s3WEc1Y2JseDBablZ1WTNScGIyNGdabWxzZEdWeVUyVmhjbU5vS0dVcElIdGNibHgwWEhSc1pYUWdhVzV3ZFhSV1lXeDFaU0E5SUdVdWRHRnlaMlYwTG5aaGJIVmxMblJ2VlhCd1pYSkRZWE5sS0NrN1hHNWNkRngwWTI5dWMzUWdZMjkxYm5SeWFXVnpJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNrRnNiQ2duTG1KdmVDY3BPMXh1WEc1Y2RGeDBZMjkxYm5SeWFXVnpMbVp2Y2tWaFkyZ29LR052ZFc1MGNua3BJRDArSUh0Y2JseDBYSFJjZEdOdmRXNTBjbmxPWVcxbElEMGdZMjkxYm5SeWVWeHVYSFJjZEZ4MFhIUXVaMlYwUld4bGJXVnVkSE5DZVZSaFowNWhiV1VvSjJnekp5bGJNRjFjYmx4MFhIUmNkRngwTG1sdWJtVnlWR1Y0ZEM1MGIxVndjR1Z5UTJGelpTZ3BPMXh1WEc1Y2RGeDBYSFJwWmlBb1hHNWNkRngwWEhSY2RHTnZkVzUwY25rdVkyeGhjM05NYVhOMExtTnZiblJoYVc1ektDZGhZM1JwZG1VbktTQW1KbHh1WEhSY2RGeDBYSFJqYjNWdWRISjVUbUZ0WlM1cGJtUmxlRTltS0dsdWNIVjBWbUZzZFdVcElENGdMVEZjYmx4MFhIUmNkQ2tnZTF4dVhIUmNkRngwWEhSamIzVnVkSEo1TG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FuWm14bGVDYzdYRzVjZEZ4MFhIUjlJR1ZzYzJVZ2UxeHVYSFJjZEZ4MFhIUmpiM1Z1ZEhKNUxuTjBlV3hsTG1ScGMzQnNZWGtnUFNBbmJtOXVaU2M3WEc1Y2RGeDBYSFI5WEc1Y2RGeDBmU2s3WEc1Y2RIMWNibHh1WEhSamIyNXpkQ0J5WldkcGIyNVRaV3hsWTNRZ1BTQmtiMk4xYldWdWRDNW5aWFJGYkdWdFpXNTBRbmxKWkNnbmNtVm5hVzl1SnlrN1hHNWNibHgwY21WbmFXOXVVMlZzWldOMExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyTm9ZVzVuWlNjc0lDaGxLU0E5UGlCN1hHNWNkRngwWTI5dWMzUWdjbVZuYVc5dUlEMGdaUzVqZFhKeVpXNTBWR0Z5WjJWMExuWmhiSFZsTG5SdlZYQndaWEpEWVhObEtDazdYRzVjZEZ4MFkyOXVjM1FnWTI5MWJuUnlhV1Z6SUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZja0ZzYkNnbkxtSnZlQ2NwTzF4dVhHNWNkRngwWTI5MWJuUnlhV1Z6TG1admNrVmhZMmdvS0dOdmRXNTBjbmtwSUQwK0lIdGNibHgwWEhSY2RHTnZkVzUwY25sU1pXZHBiMjRnUFNCamIzVnVkSEo1WEc1Y2RGeDBYSFJjZEM1blpYUkZiR1Z0Wlc1MGMwSjVWR0ZuVG1GdFpTZ25ZaWNwV3pCZFhHNWNkRngwWEhSY2RDNXBibTVsY2xSbGVIUXVkRzlWY0hCbGNrTmhjMlVvS1R0Y2JseHVYSFJjZEZ4MGFXWWdLR052ZFc1MGNubFNaV2RwYjI0dWFXNWtaWGhQWmloeVpXZHBiMjRwSUQ0Z0xURXBJSHRjYmx4MFhIUmNkRngwWTI5MWJuUnllUzV6ZEhsc1pTNWthWE53YkdGNUlEMGdKMlpzWlhnbk8xeHVYSFJjZEZ4MFhIUmpiM1Z1ZEhKNUxtTnNZWE56VEdsemRDNWhaR1FvSjJGamRHbDJaU2NwTzF4dVhIUmNkRngwZlNCbGJITmxJR2xtSUNoeVpXZHBiMjRnUFQwOUlDZEJURXduS1NCN1hHNWNkRngwWEhSY2RHTnZkVzUwY25rdWMzUjViR1V1WkdsemNHeGhlU0E5SUNkbWJHVjRKenRjYmx4MFhIUmNkRngwWTI5MWJuUnllUzVqYkdGemMweHBjM1F1WVdSa0tDZGhZM1JwZG1VbktUdGNibHgwWEhSY2RIMGdaV3h6WlNCN1hHNWNkRngwWEhSY2RHTnZkVzUwY25rdWMzUjViR1V1WkdsemNHeGhlU0E5SUNkdWIyNWxKenRjYmx4MFhIUmNkRngwWTI5MWJuUnllUzVqYkdGemMweHBjM1F1Y21WdGIzWmxLQ2RoWTNScGRtVW5LVHRjYmx4MFhIUmNkSDFjYmx4MFhIUjlLVHRjYmx4MGZTazdYRzU5S1R0Y2JpSmRMQ0p6YjNWeVkyVlNiMjkwSWpvaUluMD0ifQ==
