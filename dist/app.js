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
	window.addEventListener('load', (e) => {
		const preload = document.querySelector('.preload');

		preload.classList.add('preload-finished');
	});

	const btnScrollToTop = document.getElementById('btnScrollToTop');

	if (btnScrollToTop) {
		btnScrollToTop.addEventListener('click', (e) => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		});
	}

	const headerContainer = document.getElementById('header');

	window.addEventListener('scroll', (e) => {
		if (document.documentElement.scrollTop > 0) {
			headerContainer.classList.add('sticky');
			btnScrollToTop.style.opacity = 1;
		} else {
			headerContainer.classList.remove('sticky');
			btnScrollToTop.style.opacity = 0;
		}
	});

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

	const countriesUrl = 'https://restcountries.com/v3.1/all';

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
		const countriesContainer = document.getElementById('countriesContainer');
		const countriesList = await getCountriesData();

		countriesList.forEach(async (country) => {
			const {
				name,
				population,
				region,
				capital,
				flags,
				subregion,
				tld,
				currencies = 'not available',
				languages = 'not available',
				borders,
			} = Object(country);

			let countryEl = document.createElement('div');
			  
			let currencyName = await currencies[Object.getOwnPropertyNames(currencies || undefined || {})];
			let currencySymbol = await currencies[Object.getOwnPropertyNames(currencies || undefined || {})];

			let newLang = Object.entries(languages)[0];

			countryEl.classList.add('box');
			countryEl.classList.add('active');

			countryEl.innerHTML = `
						<div class="box__top">
							<img src="${flags.svg}" loading="lazy" alt="flag of a ${name.common}" />
						</div>

						<div class="box__bottom">
							<h3 class="box__title">${name.common}</h3>
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
					`;

			countriesContainer.appendChild(countryEl);

			countryEl.addEventListener('click', (e) => {
				const modalContainer = document.getElementById('modal-container');

				modalContainer.style.display = 'flex';
				btnScrollToTop.style.opacity = 0;

				modalContainer.innerHTML = `
				<div class="modal">
						<div class="modal__header">
							<button class="modal__btn" id="close-modal">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="arrow-left"
									class="svg-inline--fa fa-arrow-left fa-w-14"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
								>
									<path
										fill="currentColor"
										d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
									></path></svg
								><span>Back</span>
							</button>
						</div>

						<div class="modal__container">
							<div class="modal__left">
								<img
									src="${flags.svg}"
									loading="lazy"
									alt="flag of a ${name.common}"
								/>
							</div>
							<div class="modal__right">
								<h2 class="modal__right-title">${name.common}</h2>
								<ul class="modal__right-list">
									<li class="modal__right-list-item">
										<strong>Native Name:</strong> <span>${name.official}</span>
									</li>
									<li class="modal__right-list-item">
										<strong>Population:</strong> <span>${population}</span>
									</li>
									<li class="modal__right-list-item">
										<strong>Region:</strong> <span>${region}</span>
									</li>
									<li class="modal__right-list-item">
										<strong>Sub Region:</strong> <span>${subregion}</span>
									</li>
									<li class="modal__right-list-item">
										<strong>Capital:</strong> <span>${capital}</span>
									</li>
									<li class="modal__right-list-item">
										<strong>Top Level Domain:</strong> <span>${tld}</span>
									</li>
									<li class="modal__right-list-item">
										<strong>Currencies:</strong> <span>${currencyName.name}, ${currencySymbol.symbol}</span>
									</li>
									<li class="modal__right-list-item">
										<strong>Languages:</strong> <span>${newLang[0]} : ${newLang[1]}</span>
									</li>
								</ul>
								<div class="modal__right-bottom">
									<p class="modal__right-bottom--text">
										<strong>Border countries:</strong>
									</p>
									${borders ? borders
										.map((border) => {
											return `<button class="modal__right-bottom-btn">${border}</button>`;
										})
										.join('') : ''
									}
								</div>
							</div>
						</div>
					</div>
				`;

				if (modalContainer.style.display === 'flex') {
					document.body.style.overflow = 'hidden';
					modalContainer.style.display = 'flex';
				}

				const modalBackBtn = document.getElementById('close-modal');
				modalBackBtn.addEventListener('click', (e) => {
					modalContainer.style.display = '';
					document.body.style.overflowY = 'scroll';
				});
			});
		});
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

		searchInput.value = '';

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnQkFBZ0IsS0FBSyxTQUFTO0FBQ25EO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQSwrRkFBK0Y7QUFDL0YsaUdBQWlHOztBQUVqRzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVSxrQ0FBa0MsWUFBWTtBQUMzRTs7QUFFQTtBQUNBLGdDQUFnQyxZQUFZO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EscUVBQXFFLE9BQU87QUFDNUU7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFlBQVk7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRCxjQUFjO0FBQzlEO0FBQ0E7QUFDQSwrQ0FBK0MsV0FBVztBQUMxRDtBQUNBO0FBQ0EsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTtBQUNBLCtDQUErQyxVQUFVO0FBQ3pEO0FBQ0E7QUFDQSw0Q0FBNEMsUUFBUTtBQUNwRDtBQUNBO0FBQ0EscURBQXFELElBQUk7QUFDekQ7QUFDQTtBQUNBLCtDQUErQyxrQkFBa0IsSUFBSSxzQkFBc0I7QUFDM0Y7QUFDQTtBQUNBLDhDQUE4QyxXQUFXLEtBQUssV0FBVztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSw2REFBNkQsT0FBTztBQUNwRSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGLENBQUMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvbWFpbi5qc1wiKTtcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGUpID0+IHtcblx0XHRjb25zdCBwcmVsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWQnKTtcblxuXHRcdHByZWxvYWQuY2xhc3NMaXN0LmFkZCgncHJlbG9hZC1maW5pc2hlZCcpO1xuXHR9KTtcblxuXHRjb25zdCBidG5TY3JvbGxUb1RvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5TY3JvbGxUb1RvcCcpO1xuXG5cdGlmIChidG5TY3JvbGxUb1RvcCkge1xuXHRcdGJ0blNjcm9sbFRvVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdHdpbmRvdy5zY3JvbGxUbyh7XG5cdFx0XHRcdHRvcDogMCxcblx0XHRcdFx0bGVmdDogMCxcblx0XHRcdFx0YmVoYXZpb3I6ICdzbW9vdGgnLFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJyk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB7XG5cdFx0aWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPiAwKSB7XG5cdFx0XHRoZWFkZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3RpY2t5Jyk7XG5cdFx0XHRidG5TY3JvbGxUb1RvcC5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aGVhZGVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3N0aWNreScpO1xuXHRcdFx0YnRuU2Nyb2xsVG9Ub3Auc3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0fVxuXHR9KTtcblxuXHRjb25zdCB0b2dnbGVUaGVtZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGVUaGVtZUJ0bicpO1xuXG5cdC8vIGZ1bmN0aW9uIHRvIHNldCBhIGdpdmVuIHRoZW1lL2NvbG9yLXNjaGVtZVxuXHRmdW5jdGlvbiBzZXRUaGVtZSh0aGVtZU5hbWUpIHtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWUnLCB0aGVtZU5hbWUpO1xuXHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc05hbWUgPSB0aGVtZU5hbWU7XG5cdH1cblxuXHQvLyBmdW5jdGlvbiB0byB0b2dnbGUgYmV0d2VlbiBsaWdodCBhbmQgZGFyayB0aGVtZVxuXHRmdW5jdGlvbiB0b2dnbGVUaGVtZSgpIHtcblx0XHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RoZW1lJykgPT09ICd0aGVtZS1kYXJrJykge1xuXHRcdFx0c2V0VGhlbWUoJ3RoZW1lLWxpZ2h0Jyk7XG5cdFx0XHR0b2dnbGVUaGVtZUJ0bi5pbm5lclRleHQgPSAnRGFyayBNb2RlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2V0VGhlbWUoJ3RoZW1lLWRhcmsnKTtcblx0XHRcdHRvZ2dsZVRoZW1lQnRuLmlubmVyVGV4dCA9ICdMaWdodCBNb2RlJztcblx0XHR9XG5cdH1cblxuXHQvLyBJbW1lZGlhdGVseSBpbnZva2VkIGZ1bmN0aW9uIHRvIHNldCB0aGUgdGhlbWUgb24gaW5pdGlhbCBsb2FkXG5cdChmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZScpID09PSAndGhlbWUtZGFyaycpIHtcblx0XHRcdHNldFRoZW1lKCd0aGVtZS1kYXJrJyk7XG5cdFx0XHR0b2dnbGVUaGVtZUJ0bi5pbm5lclRleHQgPSAnTGlnaHQgTW9kZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNldFRoZW1lKCd0aGVtZS1saWdodCcpO1xuXHRcdFx0dG9nZ2xlVGhlbWVCdG4uaW5uZXJUZXh0ID0gJ0RhcmsgTW9kZSc7XG5cdFx0fVxuXHR9KSgpO1xuXG5cdHRvZ2dsZVRoZW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHR0b2dnbGVUaGVtZSgpO1xuXHR9KTtcblxuXHRjb25zdCBjb3VudHJpZXNVcmwgPSAnaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmNvbS92My4xL2FsbCc7XG5cblx0ZnVuY3Rpb24gZ2V0Q291bnRyaWVzRGF0YSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0ZmV0Y2goY291bnRyaWVzVXJsKVxuXHRcdFx0XHQudGhlbigocmVzcCkgPT4ge1xuXHRcdFx0XHRcdGlmICghcmVzcC5vaykge1xuXHRcdFx0XHRcdFx0dGhyb3cgRXJyb3IoYCR7cmVzcC5zdGF0dXNUZXh0fSAtICR7cmVzcC51cmx9YCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiByZXNwLmpzb24oKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHJlc29sdmUoZGF0YSkpXG5cdFx0XHRcdC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBmdW5jdGlvbiBkaXNwbGF5Q291bnRyaWVzTnVtYmVycygpIHtcblx0XHRjb25zdCBjb3VudHJpZXNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRyaWVzQ29udGFpbmVyJyk7XG5cdFx0Y29uc3QgY291bnRyaWVzTGlzdCA9IGF3YWl0IGdldENvdW50cmllc0RhdGEoKTtcblxuXHRcdGNvdW50cmllc0xpc3QuZm9yRWFjaChhc3luYyAoY291bnRyeSkgPT4ge1xuXHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRwb3B1bGF0aW9uLFxuXHRcdFx0XHRyZWdpb24sXG5cdFx0XHRcdGNhcGl0YWwsXG5cdFx0XHRcdGZsYWdzLFxuXHRcdFx0XHRzdWJyZWdpb24sXG5cdFx0XHRcdHRsZCxcblx0XHRcdFx0Y3VycmVuY2llcyA9ICdub3QgYXZhaWxhYmxlJyxcblx0XHRcdFx0bGFuZ3VhZ2VzID0gJ25vdCBhdmFpbGFibGUnLFxuXHRcdFx0XHRib3JkZXJzLFxuXHRcdFx0fSA9IE9iamVjdChjb3VudHJ5KTtcblxuXHRcdFx0bGV0IGNvdW50cnlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0ICBcblx0XHRcdGxldCBjdXJyZW5jeU5hbWUgPSBhd2FpdCBjdXJyZW5jaWVzW09iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbmNpZXMgfHwgdW5kZWZpbmVkIHx8IHt9KV07XG5cdFx0XHRsZXQgY3VycmVuY3lTeW1ib2wgPSBhd2FpdCBjdXJyZW5jaWVzW09iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbmNpZXMgfHwgdW5kZWZpbmVkIHx8IHt9KV07XG5cblx0XHRcdGxldCBuZXdMYW5nID0gT2JqZWN0LmVudHJpZXMobGFuZ3VhZ2VzKVswXTtcblxuXHRcdFx0Y291bnRyeUVsLmNsYXNzTGlzdC5hZGQoJ2JveCcpO1xuXHRcdFx0Y291bnRyeUVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG5cdFx0XHRjb3VudHJ5RWwuaW5uZXJIVE1MID0gYFxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveF9fdG9wXCI+XG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiJHtmbGFncy5zdmd9XCIgbG9hZGluZz1cImxhenlcIiBhbHQ9XCJmbGFnIG9mIGEgJHtuYW1lLmNvbW1vbn1cIiAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3hfX2JvdHRvbVwiPlxuXHRcdFx0XHRcdFx0XHQ8aDMgY2xhc3M9XCJib3hfX3RpdGxlXCI+JHtuYW1lLmNvbW1vbn08L2gzPlxuXHRcdFx0XHRcdFx0XHQ8dWwgY2xhc3M9XCJib3hfX2luZm8tbGlzdFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cImJveF9faW5mby1saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYm94X19pbmZvLWxpc3QtaXRlbS0tYm9sZFwiPlBvcHVsYWl0b246PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0JHtwb3B1bGF0aW9ufVxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwiYm94X19pbmZvLWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJib3hfX2luZm8tbGlzdC1pdGVtLS1ib2xkXCI+UmVnaW9uOjwvc3Bhbj4gPGI+JHtyZWdpb259PC9iPiBcblx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cImJveF9faW5mby1saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYm94X19pbmZvLWxpc3QtaXRlbS0tYm9sZFwiPkNhcGl0b2w6PC9zcGFuPiAke2NhcGl0YWx9XG5cdFx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdGA7XG5cblx0XHRcdGNvdW50cmllc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjb3VudHJ5RWwpO1xuXG5cdFx0XHRjb3VudHJ5RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0XHRjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1jb250YWluZXInKTtcblxuXHRcdFx0XHRtb2RhbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHRcdFx0XHRidG5TY3JvbGxUb1RvcC5zdHlsZS5vcGFjaXR5ID0gMDtcblxuXHRcdFx0XHRtb2RhbENvbnRhaW5lci5pbm5lckhUTUwgPSBgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsX19oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cIm1vZGFsX19idG5cIiBpZD1cImNsb3NlLW1vZGFsXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHN2Z1xuXHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdFx0XHRcdFx0XHRcdGZvY3VzYWJsZT1cImZhbHNlXCJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtcHJlZml4PVwiZmFzXCJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtaWNvbj1cImFycm93LWxlZnRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJzdmctaW5saW5lLS1mYSBmYS1hcnJvdy1sZWZ0IGZhLXctMTRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0cm9sZT1cImltZ1wiXG5cdFx0XHRcdFx0XHRcdFx0XHR4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcblx0XHRcdFx0XHRcdFx0XHRcdHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiXG5cdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHBhdGhcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZmlsbD1cImN1cnJlbnRDb2xvclwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGQ9XCJNMjU3LjUgNDQ1LjFsLTIyLjIgMjIuMmMtOS40IDkuNC0yNC42IDkuNC0zMy45IDBMNyAyNzNjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45TDIwMS40IDQ0LjdjOS40LTkuNCAyNC42LTkuNCAzMy45IDBsMjIuMiAyMi4yYzkuNSA5LjUgOS4zIDI1LS40IDM0LjNMMTM2LjYgMjE2SDQyNGMxMy4zIDAgMjQgMTAuNyAyNCAyNHYzMmMwIDEzLjMtMTAuNyAyNC0yNCAyNEgxMzYuNmwxMjAuNSAxMTQuOGM5LjggOS4zIDEwIDI0LjguNCAzNC4zelwiXG5cdFx0XHRcdFx0XHRcdFx0XHQ+PC9wYXRoPjwvc3ZnXG5cdFx0XHRcdFx0XHRcdFx0PjxzcGFuPkJhY2s8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbF9fY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbF9fbGVmdFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRcdFx0XHRcdHNyYz1cIiR7ZmxhZ3Muc3ZnfVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRsb2FkaW5nPVwibGF6eVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRhbHQ9XCJmbGFnIG9mIGEgJHtuYW1lLmNvbW1vbn1cIlxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWxfX3JpZ2h0XCI+XG5cdFx0XHRcdFx0XHRcdFx0PGgyIGNsYXNzPVwibW9kYWxfX3JpZ2h0LXRpdGxlXCI+JHtuYW1lLmNvbW1vbn08L2gyPlxuXHRcdFx0XHRcdFx0XHRcdDx1bCBjbGFzcz1cIm1vZGFsX19yaWdodC1saXN0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtb2RhbF9fcmlnaHQtbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+TmF0aXZlIE5hbWU6PC9zdHJvbmc+IDxzcGFuPiR7bmFtZS5vZmZpY2lhbH08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Ryb25nPlBvcHVsYXRpb246PC9zdHJvbmc+IDxzcGFuPiR7cG9wdWxhdGlvbn08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Ryb25nPlJlZ2lvbjo8L3N0cm9uZz4gPHNwYW4+JHtyZWdpb259PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cIm1vZGFsX19yaWdodC1saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHN0cm9uZz5TdWIgUmVnaW9uOjwvc3Ryb25nPiA8c3Bhbj4ke3N1YnJlZ2lvbn08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Ryb25nPkNhcGl0YWw6PC9zdHJvbmc+IDxzcGFuPiR7Y2FwaXRhbH08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Ryb25nPlRvcCBMZXZlbCBEb21haW46PC9zdHJvbmc+IDxzcGFuPiR7dGxkfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtb2RhbF9fcmlnaHQtbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+Q3VycmVuY2llczo8L3N0cm9uZz4gPHNwYW4+JHtjdXJyZW5jeU5hbWUubmFtZX0sICR7Y3VycmVuY3lTeW1ib2wuc3ltYm9sfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtb2RhbF9fcmlnaHQtbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+TGFuZ3VhZ2VzOjwvc3Ryb25nPiA8c3Bhbj4ke25ld0xhbmdbMF19IDogJHtuZXdMYW5nWzFdfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWxfX3JpZ2h0LWJvdHRvbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJtb2RhbF9fcmlnaHQtYm90dG9tLS10ZXh0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+Qm9yZGVyIGNvdW50cmllczo8L3N0cm9uZz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdCR7Ym9yZGVycyA/IGJvcmRlcnNcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm1hcCgoYm9yZGVyKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGA8YnV0dG9uIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWJvdHRvbS1idG5cIj4ke2JvcmRlcn08L2J1dHRvbj5gO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuam9pbignJykgOiAnJ1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRgO1xuXG5cdFx0XHRcdGlmIChtb2RhbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID09PSAnZmxleCcpIHtcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cdFx0XHRcdFx0bW9kYWxDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IG1vZGFsQmFja0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZS1tb2RhbCcpO1xuXHRcdFx0XHRtb2RhbEJhY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0XHRcdG1vZGFsQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0XHRkaXNwbGF5Q291bnRyaWVzTnVtYmVycygpO1xuXHR9KSgpO1xuXG5cdGxldCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2hJbnB1dCcpO1xuXG5cdHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZmlsdGVyU2VhcmNoKTtcblxuXHRmdW5jdGlvbiBmaWx0ZXJTZWFyY2goZSkge1xuXHRcdGxldCBpbnB1dFZhbHVlID0gZS50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKTtcblx0XHRjb25zdCBjb3VudHJpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm94Jyk7XG5cblx0XHRjb3VudHJpZXMuZm9yRWFjaCgoY291bnRyeSkgPT4ge1xuXHRcdFx0Y291bnRyeU5hbWUgPSBjb3VudHJ5XG5cdFx0XHRcdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDMnKVswXVxuXHRcdFx0XHQuaW5uZXJUZXh0LnRvVXBwZXJDYXNlKCk7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0Y291bnRyeS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpICYmXG5cdFx0XHRcdGNvdW50cnlOYW1lLmluZGV4T2YoaW5wdXRWYWx1ZSkgPiAtMVxuXHRcdFx0KSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IHJlZ2lvblNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdpb24nKTtcblxuXHRyZWdpb25TZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcblx0XHRjb25zdCByZWdpb24gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWUudG9VcHBlckNhc2UoKTtcblx0XHRjb25zdCBjb3VudHJpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm94Jyk7XG5cblx0XHRzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuXG5cdFx0Y291bnRyaWVzLmZvckVhY2goKGNvdW50cnkpID0+IHtcblx0XHRcdGNvdW50cnlSZWdpb24gPSBjb3VudHJ5XG5cdFx0XHRcdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYicpWzBdXG5cdFx0XHRcdC5pbm5lclRleHQudG9VcHBlckNhc2UoKTtcblxuXHRcdFx0aWYgKGNvdW50cnlSZWdpb24uaW5kZXhPZihyZWdpb24pID4gLTEpIHtcblx0XHRcdFx0Y291bnRyeS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHRcdFx0XHRjb3VudHJ5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdFx0fSBlbHNlIGlmIChyZWdpb24gPT09ICdBTEwnKSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdFx0Y291bnRyeS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0Y291bnRyeS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59KTtcbiJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFpTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDJwekwyMWhhVzR1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0UlFVRkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk96czdVVUZIUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPMUZCUTBFc01FTkJRVEJETEdkRFFVRm5RenRSUVVNeFJUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN1VVRkRRVHRSUVVOQkxIZEVRVUYzUkN4clFrRkJhMEk3VVVGRE1VVTdVVUZEUVN4cFJFRkJhVVFzWTBGQll6dFJRVU12UkRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEVzZVVOQlFYbERMR2xEUVVGcFF6dFJRVU14UlN4blNFRkJaMGdzYlVKQlFXMUNMRVZCUVVVN1VVRkRja2s3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRU3d5UWtGQk1rSXNNRUpCUVRCQ0xFVkJRVVU3VVVGRGRrUXNhVU5CUVdsRExHVkJRV1U3VVVGRGFFUTdVVUZEUVR0UlFVTkJPenRSUVVWQk8xRkJRMEVzYzBSQlFYTkVMQ3RFUVVFclJEczdVVUZGY2tnN1VVRkRRVHM3TzFGQlIwRTdVVUZEUVRzN096czdPenM3T3pzN08wRkRiRVpCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFVkJRVVU3TzBGQlJVWTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTVUZCU1R0QlFVTktMRWRCUVVjN1FVRkRTRHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CTzBGQlEwRTdRVUZEUVN4RlFVRkZPenRCUVVWR096dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN1FVRkRTRHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdRVUZEUVR0QlFVTkJMRVZCUVVVN08wRkJSVVk3UVVGRFFUdEJRVU5CTEVWQlFVVTdPMEZCUlVZN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMSEZDUVVGeFFpeG5Ra0ZCWjBJc1MwRkJTeXhUUVVGVE8wRkJRMjVFTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTVUZCU1RzN1FVRkZTanM3UVVGRlFTd3JSa0ZCSzBZN1FVRkRMMFlzYVVkQlFXbEhPenRCUVVWcVJ6czdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeHRRa0ZCYlVJc1ZVRkJWU3hyUTBGQmEwTXNXVUZCV1R0QlFVTXpSVHM3UVVGRlFUdEJRVU5CTEdkRFFVRm5ReXhaUVVGWk8wRkJRelZETzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjN1FVRkRXRHRCUVVOQk8wRkJRMEVzY1VWQlFYRkZMRTlCUVU4N1FVRkROVVU3UVVGRFFUdEJRVU5CTEcxRlFVRnRSVHRCUVVOdVJUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHZENRVUZuUWl4VlFVRlZPMEZCUXpGQ08wRkJRMEVzTUVKQlFUQkNMRmxCUVZrN1FVRkRkRU03UVVGRFFUdEJRVU5CTzBGQlEwRXNlVU5CUVhsRExGbEJRVms3UVVGRGNrUTdRVUZEUVR0QlFVTkJMR2RFUVVGblJDeGpRVUZqTzBGQlF6bEVPMEZCUTBFN1FVRkRRU3dyUTBGQkswTXNWMEZCVnp0QlFVTXhSRHRCUVVOQk8wRkJRMEVzTWtOQlFUSkRMRTlCUVU4N1FVRkRiRVE3UVVGRFFUdEJRVU5CTEN0RFFVRXJReXhWUVVGVk8wRkJRM3BFTzBGQlEwRTdRVUZEUVN3MFEwRkJORU1zVVVGQlVUdEJRVU53UkR0QlFVTkJPMEZCUTBFc2NVUkJRWEZFTEVsQlFVazdRVUZEZWtRN1FVRkRRVHRCUVVOQkxDdERRVUVyUXl4clFrRkJhMElzU1VGQlNTeHpRa0ZCYzBJN1FVRkRNMFk3UVVGRFFUdEJRVU5CTERoRFFVRTRReXhYUVVGWExFdEJRVXNzVjBGQlZ6dEJRVU42UlR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTzBGQlExZzdRVUZEUVN3MlJFRkJOa1FzVDBGQlR6dEJRVU53UlN4WFFVRlhPMEZCUTFnN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHdzU1VGQlNUdEJRVU5LTEVkQlFVYzdRVUZEU0RzN1FVRkZRVHRCUVVOQk8wRkJRMEVzUlVGQlJUczdRVUZGUmpzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFbEJRVWs3UVVGRFNqdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEpRVUZKTzBGQlEwbzdRVUZEUVR0QlFVTkJMRWxCUVVrN1FVRkRTanRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZ3NSVUZCUlR0QlFVTkdMRU5CUVVNaUxDSm1hV3hsSWpvaU5XRm1OV1V4TW1abVl6UTVOak0wWlRCaFpqZ3Vhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJZ1hIUXZMeUJVYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSMllYSWdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN5QTlJSHQ5TzF4dVhHNGdYSFF2THlCVWFHVWdjbVZ4ZFdseVpTQm1kVzVqZEdsdmJseHVJRngwWm5WdVkzUnBiMjRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlodGIyUjFiR1ZKWkNrZ2UxeHVYRzRnWEhSY2RDOHZJRU5vWldOcklHbG1JRzF2WkhWc1pTQnBjeUJwYmlCallXTm9aVnh1SUZ4MFhIUnBaaWhwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYU2tnZTF4dUlGeDBYSFJjZEhKbGRIVnliaUJwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYUzVsZUhCdmNuUnpPMXh1SUZ4MFhIUjlYRzRnWEhSY2RDOHZJRU55WldGMFpTQmhJRzVsZHlCdGIyUjFiR1VnS0dGdVpDQndkWFFnYVhRZ2FXNTBieUIwYUdVZ1kyRmphR1VwWEc0Z1hIUmNkSFpoY2lCdGIyUjFiR1VnUFNCcGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFNBOUlIdGNiaUJjZEZ4MFhIUnBPaUJ0YjJSMWJHVkpaQ3hjYmlCY2RGeDBYSFJzT2lCbVlXeHpaU3hjYmlCY2RGeDBYSFJsZUhCdmNuUnpPaUI3ZlZ4dUlGeDBYSFI5TzF4dVhHNGdYSFJjZEM4dklFVjRaV04xZEdVZ2RHaGxJRzF2WkhWc1pTQm1kVzVqZEdsdmJseHVJRngwWEhSdGIyUjFiR1Z6VzIxdlpIVnNaVWxrWFM1allXeHNLRzF2WkhWc1pTNWxlSEJ2Y25SekxDQnRiMlIxYkdVc0lHMXZaSFZzWlM1bGVIQnZjblJ6TENCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktUdGNibHh1SUZ4MFhIUXZMeUJHYkdGbklIUm9aU0J0YjJSMWJHVWdZWE1nYkc5aFpHVmtYRzRnWEhSY2RHMXZaSFZzWlM1c0lEMGdkSEoxWlR0Y2JseHVJRngwWEhRdkx5QlNaWFIxY200Z2RHaGxJR1Y0Y0c5eWRITWdiMllnZEdobElHMXZaSFZzWlZ4dUlGeDBYSFJ5WlhSMWNtNGdiVzlrZFd4bExtVjRjRzl5ZEhNN1hHNGdYSFI5WEc1Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdWeklHOWlhbVZqZENBb1gxOTNaV0p3WVdOclgyMXZaSFZzWlhOZlh5bGNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJTQTlJRzF2WkhWc1pYTTdYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1NZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWek8xeHVYRzRnWEhRdkx5QmtaV1pwYm1VZ1oyVjBkR1Z5SUdaMWJtTjBhVzl1SUdadmNpQm9ZWEp0YjI1NUlHVjRjRzl5ZEhOY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WkNBOUlHWjFibU4wYVc5dUtHVjRjRzl5ZEhNc0lHNWhiV1VzSUdkbGRIUmxjaWtnZTF4dUlGeDBYSFJwWmlnaFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXZLR1Y0Y0c5eWRITXNJRzVoYldVcEtTQjdYRzRnWEhSY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUc1aGJXVXNJSHNnWlc1MWJXVnlZV0pzWlRvZ2RISjFaU3dnWjJWME9pQm5aWFIwWlhJZ2ZTazdYRzRnWEhSY2RIMWNiaUJjZEgwN1hHNWNiaUJjZEM4dklHUmxabWx1WlNCZlgyVnpUVzlrZFd4bElHOXVJR1Y0Y0c5eWRITmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNpQTlJR1oxYm1OMGFXOXVLR1Y0Y0c5eWRITXBJSHRjYmlCY2RGeDBhV1lvZEhsd1pXOW1JRk41YldKdmJDQWhQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWWdVM2x0WW05c0xuUnZVM1J5YVc1blZHRm5LU0I3WEc0Z1hIUmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lGTjViV0p2YkM1MGIxTjBjbWx1WjFSaFp5d2dleUIyWVd4MVpUb2dKMDF2WkhWc1pTY2dmU2s3WEc0Z1hIUmNkSDFjYmlCY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUNkZlgyVnpUVzlrZFd4bEp5d2dleUIyWVd4MVpUb2dkSEoxWlNCOUtUdGNiaUJjZEgwN1hHNWNiaUJjZEM4dklHTnlaV0YwWlNCaElHWmhhMlVnYm1GdFpYTndZV05sSUc5aWFtVmpkRnh1SUZ4MEx5OGdiVzlrWlNBbUlERTZJSFpoYkhWbElHbHpJR0VnYlc5a2RXeGxJR2xrTENCeVpYRjFhWEpsSUdsMFhHNGdYSFF2THlCdGIyUmxJQ1lnTWpvZ2JXVnlaMlVnWVd4c0lIQnliM0JsY25ScFpYTWdiMllnZG1Gc2RXVWdhVzUwYnlCMGFHVWdibk5jYmlCY2RDOHZJRzF2WkdVZ0ppQTBPaUJ5WlhSMWNtNGdkbUZzZFdVZ2QyaGxiaUJoYkhKbFlXUjVJRzV6SUc5aWFtVmpkRnh1SUZ4MEx5OGdiVzlrWlNBbUlEaDhNVG9nWW1Wb1lYWmxJR3hwYTJVZ2NtVnhkV2x5WlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTUwSUQwZ1puVnVZM1JwYjI0b2RtRnNkV1VzSUcxdlpHVXBJSHRjYmlCY2RGeDBhV1lvYlc5a1pTQW1JREVwSUhaaGJIVmxJRDBnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHloMllXeDFaU2s3WEc0Z1hIUmNkR2xtS0cxdlpHVWdKaUE0S1NCeVpYUjFjbTRnZG1Gc2RXVTdYRzRnWEhSY2RHbG1LQ2h0YjJSbElDWWdOQ2tnSmlZZ2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmIySnFaV04wSnlBbUppQjJZV3gxWlNBbUppQjJZV3gxWlM1ZlgyVnpUVzlrZFd4bEtTQnlaWFIxY200Z2RtRnNkV1U3WEc0Z1hIUmNkSFpoY2lCdWN5QTlJRTlpYW1WamRDNWpjbVZoZEdVb2JuVnNiQ2s3WEc0Z1hIUmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y2lodWN5azdYRzRnWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2h1Y3l3Z0oyUmxabUYxYkhRbkxDQjdJR1Z1ZFcxbGNtRmliR1U2SUhSeWRXVXNJSFpoYkhWbE9pQjJZV3gxWlNCOUtUdGNiaUJjZEZ4MGFXWW9iVzlrWlNBbUlESWdKaVlnZEhsd1pXOW1JSFpoYkhWbElDRTlJQ2R6ZEhKcGJtY25LU0JtYjNJb2RtRnlJR3RsZVNCcGJpQjJZV3gxWlNrZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWtLRzV6TENCclpYa3NJR1oxYm1OMGFXOXVLR3RsZVNrZ2V5QnlaWFIxY200Z2RtRnNkV1ZiYTJWNVhUc2dmUzVpYVc1a0tHNTFiR3dzSUd0bGVTa3BPMXh1SUZ4MFhIUnlaWFIxY200Z2JuTTdYRzRnWEhSOU8xeHVYRzRnWEhRdkx5Qm5aWFJFWldaaGRXeDBSWGh3YjNKMElHWjFibU4wYVc5dUlHWnZjaUJqYjIxd1lYUnBZbWxzYVhSNUlIZHBkR2dnYm05dUxXaGhjbTF2Ym5rZ2JXOWtkV3hsYzF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV1SUQwZ1puVnVZM1JwYjI0b2JXOWtkV3hsS1NCN1hHNGdYSFJjZEhaaGNpQm5aWFIwWlhJZ1BTQnRiMlIxYkdVZ0ppWWdiVzlrZFd4bExsOWZaWE5OYjJSMWJHVWdQMXh1SUZ4MFhIUmNkR1oxYm1OMGFXOXVJR2RsZEVSbFptRjFiSFFvS1NCN0lISmxkSFZ5YmlCdGIyUjFiR1ZiSjJSbFptRjFiSFFuWFRzZ2ZTQTZYRzRnWEhSY2RGeDBablZ1WTNScGIyNGdaMlYwVFc5a2RXeGxSWGh3YjNKMGN5Z3BJSHNnY21WMGRYSnVJRzF2WkhWc1pUc2dmVHRjYmlCY2RGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVrS0dkbGRIUmxjaXdnSjJFbkxDQm5aWFIwWlhJcE8xeHVJRngwWEhSeVpYUjFjbTRnWjJWMGRHVnlPMXh1SUZ4MGZUdGNibHh1SUZ4MEx5OGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtOGdQU0JtZFc1amRHbHZiaWh2WW1wbFkzUXNJSEJ5YjNCbGNuUjVLU0I3SUhKbGRIVnliaUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYjJKcVpXTjBMQ0J3Y205d1pYSjBlU2s3SUgwN1hHNWNiaUJjZEM4dklGOWZkMlZpY0dGamExOXdkV0pzYVdOZmNHRjBhRjlmWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbkFnUFNCY0lsd2lPMXh1WEc1Y2JpQmNkQzh2SUV4dllXUWdaVzUwY25rZ2JXOWtkV3hsSUdGdVpDQnlaWFIxY200Z1pYaHdiM0owYzF4dUlGeDBjbVYwZFhKdUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9YMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV6SUQwZ1hDSXVMM055WXk5cWN5OXRZV2x1TG1welhDSXBPMXh1SWl3aVpHOWpkVzFsYm5RdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnblJFOU5RMjl1ZEdWdWRFeHZZV1JsWkNjc0lHWjFibU4wYVc5dUlDZ3BJSHRjYmx4MGQybHVaRzkzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJ4dllXUW5MQ0FvWlNrZ1BUNGdlMXh1WEhSY2RHTnZibk4wSUhCeVpXeHZZV1FnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1Y0hKbGJHOWhaQ2NwTzF4dVhHNWNkRngwY0hKbGJHOWhaQzVqYkdGemMweHBjM1F1WVdSa0tDZHdjbVZzYjJGa0xXWnBibWx6YUdWa0p5azdYRzVjZEgwcE8xeHVYRzVjZEdOdmJuTjBJR0owYmxOamNtOXNiRlJ2Vkc5d0lEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0oySjBibE5qY205c2JGUnZWRzl3SnlrN1hHNWNibHgwYVdZZ0tHSjBibE5qY205c2JGUnZWRzl3S1NCN1hHNWNkRngwWW5SdVUyTnliMnhzVkc5VWIzQXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25ZMnhwWTJzbkxDQW9aU2tnUFQ0Z2UxeHVYSFJjZEZ4MGQybHVaRzkzTG5OamNtOXNiRlJ2S0h0Y2JseDBYSFJjZEZ4MGRHOXdPaUF3TEZ4dVhIUmNkRngwWEhSc1pXWjBPaUF3TEZ4dVhIUmNkRngwWEhSaVpXaGhkbWx2Y2pvZ0ozTnRiMjkwYUNjc1hHNWNkRngwWEhSOUtUdGNibHgwWEhSOUtUdGNibHgwZlZ4dVhHNWNkR052Ym5OMElHaGxZV1JsY2tOdmJuUmhhVzVsY2lBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0Nkb1pXRmtaWEluS1R0Y2JseHVYSFIzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25jMk55YjJ4c0p5d2dLR1VwSUQwK0lIdGNibHgwWEhScFppQW9aRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MExuTmpjbTlzYkZSdmNDQStJREFwSUh0Y2JseDBYSFJjZEdobFlXUmxja052Ym5SaGFXNWxjaTVqYkdGemMweHBjM1F1WVdSa0tDZHpkR2xqYTNrbktUdGNibHgwWEhSY2RHSjBibE5qY205c2JGUnZWRzl3TG5OMGVXeGxMbTl3WVdOcGRIa2dQU0F4TzF4dVhIUmNkSDBnWld4elpTQjdYRzVjZEZ4MFhIUm9aV0ZrWlhKRGIyNTBZV2x1WlhJdVkyeGhjM05NYVhOMExuSmxiVzkyWlNnbmMzUnBZMnQ1SnlrN1hHNWNkRngwWEhSaWRHNVRZM0p2Ykd4VWIxUnZjQzV6ZEhsc1pTNXZjR0ZqYVhSNUlEMGdNRHRjYmx4MFhIUjlYRzVjZEgwcE8xeHVYRzVjZEdOdmJuTjBJSFJ2WjJkc1pWUm9aVzFsUW5SdUlEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0ozUnZaMmRzWlZSb1pXMWxRblJ1SnlrN1hHNWNibHgwTHk4Z1puVnVZM1JwYjI0Z2RHOGdjMlYwSUdFZ1oybDJaVzRnZEdobGJXVXZZMjlzYjNJdGMyTm9aVzFsWEc1Y2RHWjFibU4wYVc5dUlITmxkRlJvWlcxbEtIUm9aVzFsVG1GdFpTa2dlMXh1WEhSY2RHeHZZMkZzVTNSdmNtRm5aUzV6WlhSSmRHVnRLQ2QwYUdWdFpTY3NJSFJvWlcxbFRtRnRaU2s3WEc1Y2RGeDBaRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MExtTnNZWE56VG1GdFpTQTlJSFJvWlcxbFRtRnRaVHRjYmx4MGZWeHVYRzVjZEM4dklHWjFibU4wYVc5dUlIUnZJSFJ2WjJkc1pTQmlaWFIzWldWdUlHeHBaMmgwSUdGdVpDQmtZWEpySUhSb1pXMWxYRzVjZEdaMWJtTjBhVzl1SUhSdloyZHNaVlJvWlcxbEtDa2dlMXh1WEhSY2RHbG1JQ2hzYjJOaGJGTjBiM0poWjJVdVoyVjBTWFJsYlNnbmRHaGxiV1VuS1NBOVBUMGdKM1JvWlcxbExXUmhjbXNuS1NCN1hHNWNkRngwWEhSelpYUlVhR1Z0WlNnbmRHaGxiV1V0YkdsbmFIUW5LVHRjYmx4MFhIUmNkSFJ2WjJkc1pWUm9aVzFsUW5SdUxtbHVibVZ5VkdWNGRDQTlJQ2RFWVhKcklFMXZaR1VuTzF4dVhIUmNkSDBnWld4elpTQjdYRzVjZEZ4MFhIUnpaWFJVYUdWdFpTZ25kR2hsYldVdFpHRnlheWNwTzF4dVhIUmNkRngwZEc5bloyeGxWR2hsYldWQ2RHNHVhVzV1WlhKVVpYaDBJRDBnSjB4cFoyaDBJRTF2WkdVbk8xeHVYSFJjZEgxY2JseDBmVnh1WEc1Y2RDOHZJRWx0YldWa2FXRjBaV3g1SUdsdWRtOXJaV1FnWm5WdVkzUnBiMjRnZEc4Z2MyVjBJSFJvWlNCMGFHVnRaU0J2YmlCcGJtbDBhV0ZzSUd4dllXUmNibHgwS0daMWJtTjBhVzl1SUNncElIdGNibHgwWEhScFppQW9iRzlqWVd4VGRHOXlZV2RsTG1kbGRFbDBaVzBvSjNSb1pXMWxKeWtnUFQwOUlDZDBhR1Z0WlMxa1lYSnJKeWtnZTF4dVhIUmNkRngwYzJWMFZHaGxiV1VvSjNSb1pXMWxMV1JoY21zbktUdGNibHgwWEhSY2RIUnZaMmRzWlZSb1pXMWxRblJ1TG1sdWJtVnlWR1Y0ZENBOUlDZE1hV2RvZENCTmIyUmxKenRjYmx4MFhIUjlJR1ZzYzJVZ2UxeHVYSFJjZEZ4MGMyVjBWR2hsYldVb0ozUm9aVzFsTFd4cFoyaDBKeWs3WEc1Y2RGeDBYSFIwYjJkbmJHVlVhR1Z0WlVKMGJpNXBibTVsY2xSbGVIUWdQU0FuUkdGeWF5Qk5iMlJsSnp0Y2JseDBYSFI5WEc1Y2RIMHBLQ2s3WEc1Y2JseDBkRzluWjJ4bFZHaGxiV1ZDZEc0dVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnblkyeHBZMnNuTENBb1pTa2dQVDRnZTF4dVhIUmNkSFJ2WjJkc1pWUm9aVzFsS0NrN1hHNWNkSDBwTzF4dVhHNWNkR052Ym5OMElHTnZkVzUwY21sbGMxVnliQ0E5SUNkb2RIUndjem92TDNKbGMzUmpiM1Z1ZEhKcFpYTXVZMjl0TDNZekxqRXZZV3hzSnp0Y2JseHVYSFJtZFc1amRHbHZiaUJuWlhSRGIzVnVkSEpwWlhORVlYUmhLQ2tnZTF4dVhIUmNkSEpsZEhWeWJpQnVaWGNnVUhKdmJXbHpaU2dvY21WemIyeDJaU3dnY21WcVpXTjBLU0E5UGlCN1hHNWNkRngwWEhSbVpYUmphQ2hqYjNWdWRISnBaWE5WY213cFhHNWNkRngwWEhSY2RDNTBhR1Z1S0NoeVpYTndLU0E5UGlCN1hHNWNkRngwWEhSY2RGeDBhV1lnS0NGeVpYTndMbTlyS1NCN1hHNWNkRngwWEhSY2RGeDBYSFIwYUhKdmR5QkZjbkp2Y2loZ0pIdHlaWE53TG5OMFlYUjFjMVJsZUhSOUlDMGdKSHR5WlhOd0xuVnliSDFnS1R0Y2JseDBYSFJjZEZ4MFhIUjlYRzVjZEZ4MFhIUmNkRngwY21WMGRYSnVJSEpsYzNBdWFuTnZiaWdwTzF4dVhIUmNkRngwWEhSOUtWeHVYSFJjZEZ4MFhIUXVkR2hsYmlnb1pHRjBZU2tnUFQ0Z2NtVnpiMngyWlNoa1lYUmhLU2xjYmx4MFhIUmNkRngwTG1OaGRHTm9LQ2hsY25JcElEMCtJSEpsYW1WamRDaGxjbklwS1R0Y2JseDBYSFI5S1R0Y2JseDBmVnh1WEc1Y2RHRnplVzVqSUdaMWJtTjBhVzl1SUdScGMzQnNZWGxEYjNWdWRISnBaWE5PZFcxaVpYSnpLQ2tnZTF4dVhIUmNkR052Ym5OMElHTnZkVzUwY21sbGMwTnZiblJoYVc1bGNpQTlJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tDZGpiM1Z1ZEhKcFpYTkRiMjUwWVdsdVpYSW5LVHRjYmx4MFhIUmpiMjV6ZENCamIzVnVkSEpwWlhOTWFYTjBJRDBnWVhkaGFYUWdaMlYwUTI5MWJuUnlhV1Z6UkdGMFlTZ3BPMXh1WEc1Y2RGeDBZMjkxYm5SeWFXVnpUR2x6ZEM1bWIzSkZZV05vS0dGemVXNWpJQ2hqYjNWdWRISjVLU0E5UGlCN1hHNWNkRngwWEhSamIyNXpkQ0I3WEc1Y2RGeDBYSFJjZEc1aGJXVXNYRzVjZEZ4MFhIUmNkSEJ2Y0hWc1lYUnBiMjRzWEc1Y2RGeDBYSFJjZEhKbFoybHZiaXhjYmx4MFhIUmNkRngwWTJGd2FYUmhiQ3hjYmx4MFhIUmNkRngwWm14aFozTXNYRzVjZEZ4MFhIUmNkSE4xWW5KbFoybHZiaXhjYmx4MFhIUmNkRngwZEd4a0xGeHVYSFJjZEZ4MFhIUmpkWEp5Wlc1amFXVnpJRDBnSjI1dmRDQmhkbUZwYkdGaWJHVW5MRnh1WEhSY2RGeDBYSFJzWVc1bmRXRm5aWE1nUFNBbmJtOTBJR0YyWVdsc1lXSnNaU2NzWEc1Y2RGeDBYSFJjZEdKdmNtUmxjbk1zWEc1Y2RGeDBYSFI5SUQwZ1QySnFaV04wS0dOdmRXNTBjbmtwTzF4dVhHNWNkRngwWEhSc1pYUWdZMjkxYm5SeWVVVnNJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25aR2wySnlrN1hHNWNkRngwWEhRZ0lGeHVYSFJjZEZ4MGJHVjBJR04xY25KbGJtTjVUbUZ0WlNBOUlHRjNZV2wwSUdOMWNuSmxibU5wWlhOYlQySnFaV04wTG1kbGRFOTNibEJ5YjNCbGNuUjVUbUZ0WlhNb1kzVnljbVZ1WTJsbGN5QjhmQ0IxYm1SbFptbHVaV1FnZkh3Z2UzMHBYVHRjYmx4MFhIUmNkR3hsZENCamRYSnlaVzVqZVZONWJXSnZiQ0E5SUdGM1lXbDBJR04xY25KbGJtTnBaWE5iVDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVRtRnRaWE1vWTNWeWNtVnVZMmxsY3lCOGZDQjFibVJsWm1sdVpXUWdmSHdnZTMwcFhUdGNibHh1WEhSY2RGeDBiR1YwSUc1bGQweGhibWNnUFNCUFltcGxZM1F1Wlc1MGNtbGxjeWhzWVc1bmRXRm5aWE1wV3pCZE8xeHVYRzVjZEZ4MFhIUmpiM1Z1ZEhKNVJXd3VZMnhoYzNOTWFYTjBMbUZrWkNnblltOTRKeWs3WEc1Y2RGeDBYSFJqYjNWdWRISjVSV3d1WTJ4aGMzTk1hWE4wTG1Ga1pDZ25ZV04wYVhabEp5azdYRzVjYmx4MFhIUmNkR052ZFc1MGNubEZiQzVwYm01bGNraFVUVXdnUFNCZ1hHNWNkRngwWEhSY2RGeDBYSFE4WkdsMklHTnNZWE56UFZ3aVltOTRYMTkwYjNCY0lqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFBHbHRaeUJ6Y21NOVhDSWtlMlpzWVdkekxuTjJaMzFjSWlCc2IyRmthVzVuUFZ3aWJHRjZlVndpSUdGc2REMWNJbVpzWVdjZ2IyWWdZU0FrZTI1aGJXVXVZMjl0Ylc5dWZWd2lJQzgrWEc1Y2RGeDBYSFJjZEZ4MFhIUThMMlJwZGo1Y2JseHVYSFJjZEZ4MFhIUmNkRngwUEdScGRpQmpiR0Z6Y3oxY0ltSnZlRjlmWW05MGRHOXRYQ0krWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRHhvTXlCamJHRnpjejFjSW1KdmVGOWZkR2wwYkdWY0lqNGtlMjVoYldVdVkyOXRiVzl1ZlR3dmFETStYRzVjZEZ4MFhIUmNkRngwWEhSY2REeDFiQ0JqYkdGemN6MWNJbUp2ZUY5ZmFXNW1ieTFzYVhOMFhDSStYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBQR3hwSUdOc1lYTnpQVndpWW05NFgxOXBibVp2TFd4cGMzUXRhWFJsYlZ3aVBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQSE53WVc0Z1kyeGhjM005WENKaWIzaGZYMmx1Wm04dGJHbHpkQzFwZEdWdExTMWliMnhrWENJK1VHOXdkV3hoYVhSdmJqbzhMM053WVc0K1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUWtlM0J2Y0hWc1lYUnBiMjU5WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwUEM5c2FUNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUThiR2tnWTJ4aGMzTTlYQ0ppYjNoZlgybHVabTh0YkdsemRDMXBkR1Z0WENJK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUThjM0JoYmlCamJHRnpjejFjSW1KdmVGOWZhVzVtYnkxc2FYTjBMV2wwWlcwdExXSnZiR1JjSWo1U1pXZHBiMjQ2UEM5emNHRnVQaUE4WWo0a2UzSmxaMmx2Ym4wOEwySStJRnh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHd2YkdrK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFBHeHBJR05zWVhOelBWd2lZbTk0WDE5cGJtWnZMV3hwYzNRdGFYUmxiVndpUGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBITndZVzRnWTJ4aGMzTTlYQ0ppYjNoZlgybHVabTh0YkdsemRDMXBkR1Z0TFMxaWIyeGtYQ0krUTJGd2FYUnZiRG84TDNOd1lXNCtJQ1I3WTJGd2FYUmhiSDFjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFE4TDJ4cFBseHVYSFJjZEZ4MFhIUmNkRngwWEhROEwzVnNQbHh1WEhSY2RGeDBYSFJjZEZ4MFBDOWthWFkrWEc1Y2RGeDBYSFJjZEZ4MFlEdGNibHh1WEhSY2RGeDBZMjkxYm5SeWFXVnpRMjl1ZEdGcGJtVnlMbUZ3Y0dWdVpFTm9hV3hrS0dOdmRXNTBjbmxGYkNrN1hHNWNibHgwWEhSY2RHTnZkVzUwY25sRmJDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lDaGxLU0E5UGlCN1hHNWNkRngwWEhSY2RHTnZibk4wSUcxdlpHRnNRMjl1ZEdGcGJtVnlJRDBnWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9KMjF2WkdGc0xXTnZiblJoYVc1bGNpY3BPMXh1WEc1Y2RGeDBYSFJjZEcxdlpHRnNRMjl1ZEdGcGJtVnlMbk4wZVd4bExtUnBjM0JzWVhrZ1BTQW5abXhsZUNjN1hHNWNkRngwWEhSY2RHSjBibE5qY205c2JGUnZWRzl3TG5OMGVXeGxMbTl3WVdOcGRIa2dQU0F3TzF4dVhHNWNkRngwWEhSY2RHMXZaR0ZzUTI5dWRHRnBibVZ5TG1sdWJtVnlTRlJOVENBOUlHQmNibHgwWEhSY2RGeDBQR1JwZGlCamJHRnpjejFjSW0xdlpHRnNYQ0krWEc1Y2RGeDBYSFJjZEZ4MFhIUThaR2wySUdOc1lYTnpQVndpYlc5a1lXeGZYMmhsWVdSbGNsd2lQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUThZblYwZEc5dUlHTnNZWE56UFZ3aWJXOWtZV3hmWDJKMGJsd2lJR2xrUFZ3aVkyeHZjMlV0Ylc5a1lXeGNJajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFE4YzNablhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUmhjbWxoTFdocFpHUmxiajFjSW5SeWRXVmNJbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwWm05amRYTmhZbXhsUFZ3aVptRnNjMlZjSWx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFpHRjBZUzF3Y21WbWFYZzlYQ0ptWVhOY0lseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBaR0YwWVMxcFkyOXVQVndpWVhKeWIzY3RiR1ZtZEZ3aVhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUmpiR0Z6Y3oxY0luTjJaeTFwYm14cGJtVXRMV1poSUdaaExXRnljbTkzTFd4bFpuUWdabUV0ZHkweE5Gd2lYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFJ5YjJ4bFBWd2lhVzFuWENKY2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RIaHRiRzV6UFZ3aWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1kY0lseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBkbWxsZDBKdmVEMWNJakFnTUNBME5EZ2dOVEV5WENKY2JseDBYSFJjZEZ4MFhIUmNkRngwWEhRK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUThjR0YwYUZ4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUm1hV3hzUFZ3aVkzVnljbVZ1ZEVOdmJHOXlYQ0pjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFpEMWNJazB5TlRjdU5TQTBORFV1TVd3dE1qSXVNaUF5TWk0eVl5MDVMalFnT1M0MExUSTBMallnT1M0MExUTXpMamtnTUV3M0lESTNNMk10T1M0MExUa3VOQzA1TGpRdE1qUXVOaUF3TFRNekxqbE1NakF4TGpRZ05EUXVOMk01TGpRdE9TNDBJREkwTGpZdE9TNDBJRE16TGprZ01Hd3lNaTR5SURJeUxqSmpPUzQxSURrdU5TQTVMak1nTWpVdExqUWdNelF1TTB3eE16WXVOaUF5TVRaSU5ESTBZekV6TGpNZ01DQXlOQ0F4TUM0M0lESTBJREkwZGpNeVl6QWdNVE11TXkweE1DNDNJREkwTFRJMElESTBTREV6Tmk0MmJERXlNQzQxSURFeE5DNDRZemt1T0NBNUxqTWdNVEFnTWpRdU9DNDBJRE0wTGpONlhDSmNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRDQ4TDNCaGRHZytQQzl6ZG1kY2JseDBYSFJjZEZ4MFhIUmNkRngwWEhRK1BITndZVzQrUW1GamF6d3ZjM0JoYmo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwUEM5aWRYUjBiMjQrWEc1Y2RGeDBYSFJjZEZ4MFhIUThMMlJwZGo1Y2JseHVYSFJjZEZ4MFhIUmNkRngwUEdScGRpQmpiR0Z6Y3oxY0ltMXZaR0ZzWDE5amIyNTBZV2x1WlhKY0lqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFBHUnBkaUJqYkdGemN6MWNJbTF2WkdGc1gxOXNaV1owWENJK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFBHbHRaMXh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwYzNKalBWd2lKSHRtYkdGbmN5NXpkbWQ5WENKY2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RHeHZZV1JwYm1jOVhDSnNZWHA1WENKY2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RHRnNkRDFjSW1ac1lXY2diMllnWVNBa2UyNWhiV1V1WTI5dGJXOXVmVndpWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwTHo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwUEM5a2FYWStYRzVjZEZ4MFhIUmNkRngwWEhSY2REeGthWFlnWTJ4aGMzTTlYQ0p0YjJSaGJGOWZjbWxuYUhSY0lqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUThhRElnWTJ4aGMzTTlYQ0p0YjJSaGJGOWZjbWxuYUhRdGRHbDBiR1ZjSWo0a2UyNWhiV1V1WTI5dGJXOXVmVHd2YURJK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFBIVnNJR05zWVhOelBWd2liVzlrWVd4ZlgzSnBaMmgwTFd4cGMzUmNJajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER4c2FTQmpiR0Z6Y3oxY0ltMXZaR0ZzWDE5eWFXZG9kQzFzYVhOMExXbDBaVzFjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQSE4wY205dVp6NU9ZWFJwZG1VZ1RtRnRaVG84TDNOMGNtOXVaejRnUEhOd1lXNCtKSHR1WVcxbExtOW1abWxqYVdGc2ZUd3ZjM0JoYmo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REd3ZiR2srWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROGJHa2dZMnhoYzNNOVhDSnRiMlJoYkY5ZmNtbG5hSFF0YkdsemRDMXBkR1Z0WENJK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHh6ZEhKdmJtYytVRzl3ZFd4aGRHbHZiam84TDNOMGNtOXVaejRnUEhOd1lXNCtKSHR3YjNCMWJHRjBhVzl1ZlR3dmMzQmhiajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER3dmJHaytYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFE4YkdrZ1kyeGhjM005WENKdGIyUmhiRjlmY21sbmFIUXRiR2x6ZEMxcGRHVnRYQ0krWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REeHpkSEp2Ym1jK1VtVm5hVzl1T2p3dmMzUnliMjVuUGlBOGMzQmhiajRrZTNKbFoybHZibjA4TDNOd1lXNCtYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFE4TDJ4cFBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQR3hwSUdOc1lYTnpQVndpYlc5a1lXeGZYM0pwWjJoMExXeHBjM1F0YVhSbGJWd2lQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROGMzUnliMjVuUGxOMVlpQlNaV2RwYjI0NlBDOXpkSEp2Ym1jK0lEeHpjR0Z1UGlSN2MzVmljbVZuYVc5dWZUd3ZjM0JoYmo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REd3ZiR2srWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROGJHa2dZMnhoYzNNOVhDSnRiMlJoYkY5ZmNtbG5hSFF0YkdsemRDMXBkR1Z0WENJK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHh6ZEhKdmJtYytRMkZ3YVhSaGJEbzhMM04wY205dVp6NGdQSE53WVc0K0pIdGpZWEJwZEdGc2ZUd3ZjM0JoYmo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REd3ZiR2srWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROGJHa2dZMnhoYzNNOVhDSnRiMlJoYkY5ZmNtbG5hSFF0YkdsemRDMXBkR1Z0WENJK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHh6ZEhKdmJtYytWRzl3SUV4bGRtVnNJRVJ2YldGcGJqbzhMM04wY205dVp6NGdQSE53WVc0K0pIdDBiR1I5UEM5emNHRnVQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwUEM5c2FUNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHhzYVNCamJHRnpjejFjSW0xdlpHRnNYMTl5YVdkb2RDMXNhWE4wTFdsMFpXMWNJajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBITjBjbTl1Wno1RGRYSnlaVzVqYVdWek9qd3ZjM1J5YjI1blBpQThjM0JoYmo0a2UyTjFjbkpsYm1ONVRtRnRaUzV1WVcxbGZTd2dKSHRqZFhKeVpXNWplVk41YldKdmJDNXplVzFpYjJ4OVBDOXpjR0Z1UGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBDOXNhVDVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER4c2FTQmpiR0Z6Y3oxY0ltMXZaR0ZzWDE5eWFXZG9kQzFzYVhOMExXbDBaVzFjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQSE4wY205dVp6NU1ZVzVuZFdGblpYTTZQQzl6ZEhKdmJtYytJRHh6Y0dGdVBpUjdibVYzVEdGdVoxc3dYWDBnT2lBa2UyNWxkMHhoYm1kYk1WMTlQQzl6Y0dGdVBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQQzlzYVQ1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhROEwzVnNQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHhrYVhZZ1kyeGhjM005WENKdGIyUmhiRjlmY21sbmFIUXRZbTkwZEc5dFhDSStYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFE4Y0NCamJHRnpjejFjSW0xdlpHRnNYMTl5YVdkb2RDMWliM1IwYjIwdExYUmxlSFJjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQSE4wY205dVp6NUNiM0prWlhJZ1kyOTFiblJ5YVdWek9qd3ZjM1J5YjI1blBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQQzl3UGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MEpIdGliM0prWlhKeklEOGdZbTl5WkdWeWMxeHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFF1YldGd0tDaGliM0prWlhJcElEMCtJSHRjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUnlaWFIxY200Z1lEeGlkWFIwYjI0Z1kyeGhjM005WENKdGIyUmhiRjlmY21sbmFIUXRZbTkwZEc5dExXSjBibHdpUGlSN1ltOXlaR1Z5ZlR3dlluVjBkRzl1UG1BN1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkSDBwWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RDNXFiMmx1S0NjbktTQTZJQ2NuWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSOVhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFBDOWthWFkrWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRHd2WkdsMlBseHVYSFJjZEZ4MFhIUmNkRngwUEM5a2FYWStYRzVjZEZ4MFhIUmNkRngwUEM5a2FYWStYRzVjZEZ4MFhIUmNkR0E3WEc1Y2JseDBYSFJjZEZ4MGFXWWdLRzF2WkdGc1EyOXVkR0ZwYm1WeUxuTjBlV3hsTG1ScGMzQnNZWGtnUFQwOUlDZG1iR1Y0SnlrZ2UxeHVYSFJjZEZ4MFhIUmNkR1J2WTNWdFpXNTBMbUp2WkhrdWMzUjViR1V1YjNabGNtWnNiM2NnUFNBbmFHbGtaR1Z1Snp0Y2JseDBYSFJjZEZ4MFhIUnRiMlJoYkVOdmJuUmhhVzVsY2k1emRIbHNaUzVrYVhOd2JHRjVJRDBnSjJac1pYZ25PMXh1WEhSY2RGeDBYSFI5WEc1Y2JseDBYSFJjZEZ4MFkyOXVjM1FnYlc5a1lXeENZV05yUW5SdUlEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0oyTnNiM05sTFcxdlpHRnNKeWs3WEc1Y2RGeDBYSFJjZEcxdlpHRnNRbUZqYTBKMGJpNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lDaGxLU0E5UGlCN1hHNWNkRngwWEhSY2RGeDBiVzlrWVd4RGIyNTBZV2x1WlhJdWMzUjViR1V1WkdsemNHeGhlU0E5SUNjbk8xeHVYSFJjZEZ4MFhIUmNkR1J2WTNWdFpXNTBMbUp2WkhrdWMzUjViR1V1YjNabGNtWnNiM2RaSUQwZ0ozTmpjbTlzYkNjN1hHNWNkRngwWEhSY2RIMHBPMXh1WEhSY2RGeDBmU2s3WEc1Y2RGeDBmU2s3WEc1Y2RIMWNibHh1WEhRb1puVnVZM1JwYjI0Z0tDa2dlMXh1WEhSY2RHUnBjM0JzWVhsRGIzVnVkSEpwWlhOT2RXMWlaWEp6S0NrN1hHNWNkSDBwS0NrN1hHNWNibHgwYkdWMElITmxZWEpqYUVsdWNIVjBJRDBnWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9KM05sWVhKamFFbHVjSFYwSnlrN1hHNWNibHgwYzJWaGNtTm9TVzV3ZFhRdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmFXNXdkWFFuTENCbWFXeDBaWEpUWldGeVkyZ3BPMXh1WEc1Y2RHWjFibU4wYVc5dUlHWnBiSFJsY2xObFlYSmphQ2hsS1NCN1hHNWNkRngwYkdWMElHbHVjSFYwVm1Gc2RXVWdQU0JsTG5SaGNtZGxkQzUyWVd4MVpTNTBiMVZ3Y0dWeVEyRnpaU2dwTzF4dVhIUmNkR052Ym5OMElHTnZkVzUwY21sbGN5QTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNKQmJHd29KeTVpYjNnbktUdGNibHh1WEhSY2RHTnZkVzUwY21sbGN5NW1iM0pGWVdOb0tDaGpiM1Z1ZEhKNUtTQTlQaUI3WEc1Y2RGeDBYSFJqYjNWdWRISjVUbUZ0WlNBOUlHTnZkVzUwY25sY2JseDBYSFJjZEZ4MExtZGxkRVZzWlcxbGJuUnpRbmxVWVdkT1lXMWxLQ2RvTXljcFd6QmRYRzVjZEZ4MFhIUmNkQzVwYm01bGNsUmxlSFF1ZEc5VmNIQmxja05oYzJVb0tUdGNibHh1WEhSY2RGeDBhV1lnS0Z4dVhIUmNkRngwWEhSamIzVnVkSEo1TG1Oc1lYTnpUR2x6ZEM1amIyNTBZV2x1Y3lnbllXTjBhWFpsSnlrZ0ppWmNibHgwWEhSY2RGeDBZMjkxYm5SeWVVNWhiV1V1YVc1a1pYaFBaaWhwYm5CMWRGWmhiSFZsS1NBK0lDMHhYRzVjZEZ4MFhIUXBJSHRjYmx4MFhIUmNkRngwWTI5MWJuUnllUzV6ZEhsc1pTNWthWE53YkdGNUlEMGdKMlpzWlhnbk8xeHVYSFJjZEZ4MGZTQmxiSE5sSUh0Y2JseDBYSFJjZEZ4MFkyOTFiblJ5ZVM1emRIbHNaUzVrYVhOd2JHRjVJRDBnSjI1dmJtVW5PMXh1WEhSY2RGeDBmVnh1WEhSY2RIMHBPMXh1WEhSOVhHNWNibHgwWTI5dWMzUWdjbVZuYVc5dVUyVnNaV04wSUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvSjNKbFoybHZiaWNwTzF4dVhHNWNkSEpsWjJsdmJsTmxiR1ZqZEM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamFHRnVaMlVuTENBb1pTa2dQVDRnZTF4dVhIUmNkR052Ym5OMElISmxaMmx2YmlBOUlHVXVZM1Z5Y21WdWRGUmhjbWRsZEM1MllXeDFaUzUwYjFWd2NHVnlRMkZ6WlNncE8xeHVYSFJjZEdOdmJuTjBJR052ZFc1MGNtbGxjeUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSkJiR3dvSnk1aWIzZ25LVHRjYmx4dVhIUmNkSE5sWVhKamFFbHVjSFYwTG5aaGJIVmxJRDBnSnljN1hHNWNibHgwWEhSamIzVnVkSEpwWlhNdVptOXlSV0ZqYUNnb1kyOTFiblJ5ZVNrZ1BUNGdlMXh1WEhSY2RGeDBZMjkxYm5SeWVWSmxaMmx2YmlBOUlHTnZkVzUwY25sY2JseDBYSFJjZEZ4MExtZGxkRVZzWlcxbGJuUnpRbmxVWVdkT1lXMWxLQ2RpSnlsYk1GMWNibHgwWEhSY2RGeDBMbWx1Ym1WeVZHVjRkQzUwYjFWd2NHVnlRMkZ6WlNncE8xeHVYRzVjZEZ4MFhIUnBaaUFvWTI5MWJuUnllVkpsWjJsdmJpNXBibVJsZUU5bUtISmxaMmx2YmlrZ1BpQXRNU2tnZTF4dVhIUmNkRngwWEhSamIzVnVkSEo1TG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FuWm14bGVDYzdYRzVjZEZ4MFhIUmNkR052ZFc1MGNua3VZMnhoYzNOTWFYTjBMbUZrWkNnbllXTjBhWFpsSnlrN1hHNWNkRngwWEhSOUlHVnNjMlVnYVdZZ0tISmxaMmx2YmlBOVBUMGdKMEZNVENjcElIdGNibHgwWEhSY2RGeDBZMjkxYm5SeWVTNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0oyWnNaWGduTzF4dVhIUmNkRngwWEhSamIzVnVkSEo1TG1Oc1lYTnpUR2x6ZEM1aFpHUW9KMkZqZEdsMlpTY3BPMXh1WEhSY2RGeDBmU0JsYkhObElIdGNibHgwWEhSY2RGeDBZMjkxYm5SeWVTNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0oyNXZibVVuTzF4dVhIUmNkRngwWEhSamIzVnVkSEo1TG1Oc1lYTnpUR2x6ZEM1eVpXMXZkbVVvSjJGamRHbDJaU2NwTzF4dVhIUmNkRngwZlZ4dVhIUmNkSDBwTzF4dVhIUjlLVHRjYm4wcE8xeHVJbDBzSW5OdmRYSmpaVkp2YjNRaU9pSWlmUT09In0=
