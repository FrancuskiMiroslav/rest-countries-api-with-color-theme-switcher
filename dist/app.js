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

	const countriesUrl = 'https://restcountries.eu/rest/v2/all';

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

		countriesList.forEach((country) => {
			const {
				name,
				population,
				region,
				capital,
				flag,
				nativeName,
				subregion,
				topLevelDomain,
				currencies,
				languages,
				borders,
			} = country;

			let countryEl = document.createElement('div');
			countryEl.classList.add('box');
			countryEl.classList.add('active');

			countryEl.innerHTML = `
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
									src="${flag}"
									loading="lazy"
									alt="flag of a ${name}"
								/>
							</div>
							<div class="modal__right">
								<h2 class="modal__right-title">${name}</h2>
								<ul class="modal__right-list">
									<li class="modal__right-list-item">
										<strong>Native Name:</strong> <span>${nativeName}</span>
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
										<strong>Top Level Domain:</strong> <span>${topLevelDomain}</span>
									</li>
									<li class="modal__right-list-item">
										<strong>Currencies:</strong> <span>${currencies.map((cur) => {
											return cur.name;
										})}</span>
									</li>
									<li class="modal__right-list-item">
										<strong>Languages:</strong> <span>${languages.map((lang) => {
											return lang.name;
										})}</span>
									</li>
								</ul>
								<div class="modal__right-bottom">
									<p class="modal__right-bottom--text">
										<strong>Border countries:</strong>
									</p>
									${borders
										.map((border) => {
											return `<button class="modal__right-bottom-btn">${border}</button>`;
										})
										.join('')}
									
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnQkFBZ0IsS0FBSyxTQUFTO0FBQ25EO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUssa0NBQWtDLEtBQUs7QUFDL0Q7O0FBRUE7QUFDQSxnQ0FBZ0MsS0FBSztBQUNyQztBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLHFFQUFxRSxPQUFPO0FBQzVFO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsS0FBSztBQUNyQjtBQUNBLDBCQUEwQixLQUFLO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxLQUFLO0FBQzlDO0FBQ0E7QUFDQSxnREFBZ0QsV0FBVztBQUMzRDtBQUNBO0FBQ0EsK0NBQStDLFdBQVc7QUFDMUQ7QUFDQTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQSwrQ0FBK0MsVUFBVTtBQUN6RDtBQUNBO0FBQ0EsNENBQTRDLFFBQVE7QUFDcEQ7QUFDQTtBQUNBLHFEQUFxRCxlQUFlO0FBQ3BFO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQSxXQUFXLEVBQUU7QUFDYjtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0EsV0FBVyxFQUFFO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsNkRBQTZELE9BQU87QUFDcEUsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGLENBQUMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvbWFpbi5qc1wiKTtcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGUpID0+IHtcblx0XHRjb25zdCBwcmVsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWQnKTtcblxuXHRcdHByZWxvYWQuY2xhc3NMaXN0LmFkZCgncHJlbG9hZC1maW5pc2hlZCcpO1xuXHR9KTtcblxuXHRjb25zdCBidG5TY3JvbGxUb1RvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5TY3JvbGxUb1RvcCcpO1xuXG5cdGlmIChidG5TY3JvbGxUb1RvcCkge1xuXHRcdGJ0blNjcm9sbFRvVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdHdpbmRvdy5zY3JvbGxUbyh7XG5cdFx0XHRcdHRvcDogMCxcblx0XHRcdFx0bGVmdDogMCxcblx0XHRcdFx0YmVoYXZpb3I6ICdzbW9vdGgnLFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJyk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB7XG5cdFx0aWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPiAwKSB7XG5cdFx0XHRoZWFkZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3RpY2t5Jyk7XG5cdFx0XHRidG5TY3JvbGxUb1RvcC5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aGVhZGVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3N0aWNreScpO1xuXHRcdFx0YnRuU2Nyb2xsVG9Ub3Auc3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0fVxuXHR9KTtcblxuXHRjb25zdCB0b2dnbGVUaGVtZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGVUaGVtZUJ0bicpO1xuXG5cdC8vIGZ1bmN0aW9uIHRvIHNldCBhIGdpdmVuIHRoZW1lL2NvbG9yLXNjaGVtZVxuXHRmdW5jdGlvbiBzZXRUaGVtZSh0aGVtZU5hbWUpIHtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWUnLCB0aGVtZU5hbWUpO1xuXHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc05hbWUgPSB0aGVtZU5hbWU7XG5cdH1cblxuXHQvLyBmdW5jdGlvbiB0byB0b2dnbGUgYmV0d2VlbiBsaWdodCBhbmQgZGFyayB0aGVtZVxuXHRmdW5jdGlvbiB0b2dnbGVUaGVtZSgpIHtcblx0XHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RoZW1lJykgPT09ICd0aGVtZS1kYXJrJykge1xuXHRcdFx0c2V0VGhlbWUoJ3RoZW1lLWxpZ2h0Jyk7XG5cdFx0XHR0b2dnbGVUaGVtZUJ0bi5pbm5lclRleHQgPSAnRGFyayBNb2RlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2V0VGhlbWUoJ3RoZW1lLWRhcmsnKTtcblx0XHRcdHRvZ2dsZVRoZW1lQnRuLmlubmVyVGV4dCA9ICdMaWdodCBNb2RlJztcblx0XHR9XG5cdH1cblxuXHQvLyBJbW1lZGlhdGVseSBpbnZva2VkIGZ1bmN0aW9uIHRvIHNldCB0aGUgdGhlbWUgb24gaW5pdGlhbCBsb2FkXG5cdChmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZScpID09PSAndGhlbWUtZGFyaycpIHtcblx0XHRcdHNldFRoZW1lKCd0aGVtZS1kYXJrJyk7XG5cdFx0XHR0b2dnbGVUaGVtZUJ0bi5pbm5lclRleHQgPSAnTGlnaHQgTW9kZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNldFRoZW1lKCd0aGVtZS1saWdodCcpO1xuXHRcdFx0dG9nZ2xlVGhlbWVCdG4uaW5uZXJUZXh0ID0gJ0RhcmsgTW9kZSc7XG5cdFx0fVxuXHR9KSgpO1xuXG5cdHRvZ2dsZVRoZW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHR0b2dnbGVUaGVtZSgpO1xuXHR9KTtcblxuXHRjb25zdCBjb3VudHJpZXNVcmwgPSAnaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvYWxsJztcblxuXHRmdW5jdGlvbiBnZXRDb3VudHJpZXNEYXRhKCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRmZXRjaChjb3VudHJpZXNVcmwpXG5cdFx0XHRcdC50aGVuKChyZXNwKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCFyZXNwLm9rKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBFcnJvcihgJHtyZXNwLnN0YXR1c1RleHR9IC0gJHtyZXNwLnVybH1gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3AuanNvbigpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4gcmVzb2x2ZShkYXRhKSlcblx0XHRcdFx0LmNhdGNoKChlcnIpID0+IHJlamVjdChlcnIpKTtcblx0XHR9KTtcblx0fVxuXG5cdGFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlDb3VudHJpZXNOdW1iZXJzKCkge1xuXHRcdGNvbnN0IGNvdW50cmllc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudHJpZXNDb250YWluZXInKTtcblx0XHRjb25zdCBjb3VudHJpZXNMaXN0ID0gYXdhaXQgZ2V0Q291bnRyaWVzRGF0YSgpO1xuXG5cdFx0Y291bnRyaWVzTGlzdC5mb3JFYWNoKChjb3VudHJ5KSA9PiB7XG5cdFx0XHRjb25zdCB7XG5cdFx0XHRcdG5hbWUsXG5cdFx0XHRcdHBvcHVsYXRpb24sXG5cdFx0XHRcdHJlZ2lvbixcblx0XHRcdFx0Y2FwaXRhbCxcblx0XHRcdFx0ZmxhZyxcblx0XHRcdFx0bmF0aXZlTmFtZSxcblx0XHRcdFx0c3VicmVnaW9uLFxuXHRcdFx0XHR0b3BMZXZlbERvbWFpbixcblx0XHRcdFx0Y3VycmVuY2llcyxcblx0XHRcdFx0bGFuZ3VhZ2VzLFxuXHRcdFx0XHRib3JkZXJzLFxuXHRcdFx0fSA9IGNvdW50cnk7XG5cblx0XHRcdGxldCBjb3VudHJ5RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdGNvdW50cnlFbC5jbGFzc0xpc3QuYWRkKCdib3gnKTtcblx0XHRcdGNvdW50cnlFbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuXHRcdFx0Y291bnRyeUVsLmlubmVySFRNTCA9IGBcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3hfX3RvcFwiPlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7ZmxhZ31cIiBsb2FkaW5nPVwibGF6eVwiIGFsdD1cImZsYWcgb2YgYSAke25hbWV9XCIgLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94X19ib3R0b21cIj5cblx0XHRcdFx0XHRcdFx0PGgzIGNsYXNzPVwiYm94X190aXRsZVwiPiR7bmFtZX08L2gzPlxuXHRcdFx0XHRcdFx0XHQ8dWwgY2xhc3M9XCJib3hfX2luZm8tbGlzdFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cImJveF9faW5mby1saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYm94X19pbmZvLWxpc3QtaXRlbS0tYm9sZFwiPlBvcHVsYWl0b246PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0JHtwb3B1bGF0aW9ufVxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwiYm94X19pbmZvLWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJib3hfX2luZm8tbGlzdC1pdGVtLS1ib2xkXCI+UmVnaW9uOjwvc3Bhbj4gPGI+JHtyZWdpb259PC9iPiBcblx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cImJveF9faW5mby1saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYm94X19pbmZvLWxpc3QtaXRlbS0tYm9sZFwiPkNhcGl0b2w6PC9zcGFuPiAke2NhcGl0YWx9XG5cdFx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdGA7XG5cblx0XHRcdGNvdW50cmllc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjb3VudHJ5RWwpO1xuXG5cdFx0XHRjb3VudHJ5RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0XHRjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1jb250YWluZXInKTtcblxuXHRcdFx0XHRtb2RhbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHRcdFx0XHRidG5TY3JvbGxUb1RvcC5zdHlsZS5vcGFjaXR5ID0gMDtcblxuXHRcdFx0XHRtb2RhbENvbnRhaW5lci5pbm5lckhUTUwgPSBgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsX19oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cIm1vZGFsX19idG5cIiBpZD1cImNsb3NlLW1vZGFsXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHN2Z1xuXHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdFx0XHRcdFx0XHRcdGZvY3VzYWJsZT1cImZhbHNlXCJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtcHJlZml4PVwiZmFzXCJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtaWNvbj1cImFycm93LWxlZnRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJzdmctaW5saW5lLS1mYSBmYS1hcnJvdy1sZWZ0IGZhLXctMTRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0cm9sZT1cImltZ1wiXG5cdFx0XHRcdFx0XHRcdFx0XHR4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcblx0XHRcdFx0XHRcdFx0XHRcdHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiXG5cdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHBhdGhcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZmlsbD1cImN1cnJlbnRDb2xvclwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGQ9XCJNMjU3LjUgNDQ1LjFsLTIyLjIgMjIuMmMtOS40IDkuNC0yNC42IDkuNC0zMy45IDBMNyAyNzNjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45TDIwMS40IDQ0LjdjOS40LTkuNCAyNC42LTkuNCAzMy45IDBsMjIuMiAyMi4yYzkuNSA5LjUgOS4zIDI1LS40IDM0LjNMMTM2LjYgMjE2SDQyNGMxMy4zIDAgMjQgMTAuNyAyNCAyNHYzMmMwIDEzLjMtMTAuNyAyNC0yNCAyNEgxMzYuNmwxMjAuNSAxMTQuOGM5LjggOS4zIDEwIDI0LjguNCAzNC4zelwiXG5cdFx0XHRcdFx0XHRcdFx0XHQ+PC9wYXRoPjwvc3ZnXG5cdFx0XHRcdFx0XHRcdFx0PjxzcGFuPkJhY2s8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbF9fY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbF9fbGVmdFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRcdFx0XHRcdHNyYz1cIiR7ZmxhZ31cIlxuXHRcdFx0XHRcdFx0XHRcdFx0bG9hZGluZz1cImxhenlcIlxuXHRcdFx0XHRcdFx0XHRcdFx0YWx0PVwiZmxhZyBvZiBhICR7bmFtZX1cIlxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWxfX3JpZ2h0XCI+XG5cdFx0XHRcdFx0XHRcdFx0PGgyIGNsYXNzPVwibW9kYWxfX3JpZ2h0LXRpdGxlXCI+JHtuYW1lfTwvaDI+XG5cdFx0XHRcdFx0XHRcdFx0PHVsIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWxpc3RcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cIm1vZGFsX19yaWdodC1saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHN0cm9uZz5OYXRpdmUgTmFtZTo8L3N0cm9uZz4gPHNwYW4+JHtuYXRpdmVOYW1lfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtb2RhbF9fcmlnaHQtbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+UG9wdWxhdGlvbjo8L3N0cm9uZz4gPHNwYW4+JHtwb3B1bGF0aW9ufTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtb2RhbF9fcmlnaHQtbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+UmVnaW9uOjwvc3Ryb25nPiA8c3Bhbj4ke3JlZ2lvbn08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Ryb25nPlN1YiBSZWdpb246PC9zdHJvbmc+IDxzcGFuPiR7c3VicmVnaW9ufTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtb2RhbF9fcmlnaHQtbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+Q2FwaXRhbDo8L3N0cm9uZz4gPHNwYW4+JHtjYXBpdGFsfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtb2RhbF9fcmlnaHQtbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+VG9wIExldmVsIERvbWFpbjo8L3N0cm9uZz4gPHNwYW4+JHt0b3BMZXZlbERvbWFpbn08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Ryb25nPkN1cnJlbmNpZXM6PC9zdHJvbmc+IDxzcGFuPiR7Y3VycmVuY2llcy5tYXAoKGN1cikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBjdXIubmFtZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSl9PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cIm1vZGFsX19yaWdodC1saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHN0cm9uZz5MYW5ndWFnZXM6PC9zdHJvbmc+IDxzcGFuPiR7bGFuZ3VhZ2VzLm1hcCgobGFuZykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBsYW5nLm5hbWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWxfX3JpZ2h0LWJvdHRvbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJtb2RhbF9fcmlnaHQtYm90dG9tLS10ZXh0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+Qm9yZGVyIGNvdW50cmllczo8L3N0cm9uZz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdCR7Ym9yZGVyc1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQubWFwKChib3JkZXIpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYDxidXR0b24gY2xhc3M9XCJtb2RhbF9fcmlnaHQtYm90dG9tLWJ0blwiPiR7Ym9yZGVyfTwvYnV0dG9uPmA7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5qb2luKCcnKX1cblx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRgO1xuXG5cdFx0XHRcdGlmIChtb2RhbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID09PSAnZmxleCcpIHtcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cdFx0XHRcdFx0bW9kYWxDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IG1vZGFsQmFja0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZS1tb2RhbCcpO1xuXHRcdFx0XHRtb2RhbEJhY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0XHRcdG1vZGFsQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0XHRkaXNwbGF5Q291bnRyaWVzTnVtYmVycygpO1xuXHR9KSgpO1xuXG5cdGxldCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2hJbnB1dCcpO1xuXG5cdHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZmlsdGVyU2VhcmNoKTtcblxuXHRmdW5jdGlvbiBmaWx0ZXJTZWFyY2goZSkge1xuXHRcdGxldCBpbnB1dFZhbHVlID0gZS50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKTtcblx0XHRjb25zdCBjb3VudHJpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm94Jyk7XG5cblx0XHRjb3VudHJpZXMuZm9yRWFjaCgoY291bnRyeSkgPT4ge1xuXHRcdFx0Y291bnRyeU5hbWUgPSBjb3VudHJ5XG5cdFx0XHRcdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDMnKVswXVxuXHRcdFx0XHQuaW5uZXJUZXh0LnRvVXBwZXJDYXNlKCk7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0Y291bnRyeS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpICYmXG5cdFx0XHRcdGNvdW50cnlOYW1lLmluZGV4T2YoaW5wdXRWYWx1ZSkgPiAtMVxuXHRcdFx0KSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IHJlZ2lvblNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdpb24nKTtcblxuXHRyZWdpb25TZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcblx0XHRjb25zdCByZWdpb24gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWUudG9VcHBlckNhc2UoKTtcblx0XHRjb25zdCBjb3VudHJpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm94Jyk7XG5cblx0XHRzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuXG5cdFx0Y291bnRyaWVzLmZvckVhY2goKGNvdW50cnkpID0+IHtcblx0XHRcdGNvdW50cnlSZWdpb24gPSBjb3VudHJ5XG5cdFx0XHRcdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYicpWzBdXG5cdFx0XHRcdC5pbm5lclRleHQudG9VcHBlckNhc2UoKTtcblxuXHRcdFx0aWYgKGNvdW50cnlSZWdpb24uaW5kZXhPZihyZWdpb24pID4gLTEpIHtcblx0XHRcdFx0Y291bnRyeS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHRcdFx0XHRjb3VudHJ5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdFx0fSBlbHNlIGlmIChyZWdpb24gPT09ICdBTEwnKSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdFx0Y291bnRyeS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0Y291bnRyeS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59KTtcbiJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFpTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDJwekwyMWhhVzR1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0UlFVRkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk96czdVVUZIUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPMUZCUTBFc01FTkJRVEJETEdkRFFVRm5RenRSUVVNeFJUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN1VVRkRRVHRSUVVOQkxIZEVRVUYzUkN4clFrRkJhMEk3VVVGRE1VVTdVVUZEUVN4cFJFRkJhVVFzWTBGQll6dFJRVU12UkRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEVzZVVOQlFYbERMR2xEUVVGcFF6dFJRVU14UlN4blNFRkJaMGdzYlVKQlFXMUNMRVZCUVVVN1VVRkRja2s3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRU3d5UWtGQk1rSXNNRUpCUVRCQ0xFVkJRVVU3VVVGRGRrUXNhVU5CUVdsRExHVkJRV1U3VVVGRGFFUTdVVUZEUVR0UlFVTkJPenRSUVVWQk8xRkJRMEVzYzBSQlFYTkVMQ3RFUVVFclJEczdVVUZGY2tnN1VVRkRRVHM3TzFGQlIwRTdVVUZEUVRzN096czdPenM3T3pzN08wRkRiRVpCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFVkJRVVU3TzBGQlJVWTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTVUZCU1R0QlFVTktMRWRCUVVjN1FVRkRTRHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CTzBGQlEwRTdRVUZEUVN4RlFVRkZPenRCUVVWR096dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN1FVRkRTRHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdRVUZEUVR0QlFVTkJMRVZCUVVVN08wRkJSVVk3UVVGRFFUdEJRVU5CTEVWQlFVVTdPMEZCUlVZN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMSEZDUVVGeFFpeG5Ra0ZCWjBJc1MwRkJTeXhUUVVGVE8wRkJRMjVFTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SlFVRkpPenRCUVVWS08wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc2JVSkJRVzFDTEV0QlFVc3NhME5CUVd0RExFdEJRVXM3UVVGREwwUTdPMEZCUlVFN1FVRkRRU3huUTBGQlowTXNTMEZCU3p0QlFVTnlRenRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTzBGQlExZzdRVUZEUVR0QlFVTkJMSEZGUVVGeFJTeFBRVUZQTzBGQlF6VkZPMEZCUTBFN1FVRkRRU3h0UlVGQmJVVTdRVUZEYmtVN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4blFrRkJaMElzUzBGQlN6dEJRVU55UWp0QlFVTkJMREJDUVVFd1FpeExRVUZMTzBGQlF5OUNPMEZCUTBFN1FVRkRRVHRCUVVOQkxIbERRVUY1UXl4TFFVRkxPMEZCUXpsRE8wRkJRMEU3UVVGRFFTeG5SRUZCWjBRc1YwRkJWenRCUVVNelJEdEJRVU5CTzBGQlEwRXNLME5CUVN0RExGZEJRVmM3UVVGRE1VUTdRVUZEUVR0QlFVTkJMREpEUVVFeVF5eFBRVUZQTzBGQlEyeEVPMEZCUTBFN1FVRkRRU3dyUTBGQkswTXNWVUZCVlR0QlFVTjZSRHRCUVVOQk8wRkJRMEVzTkVOQlFUUkRMRkZCUVZFN1FVRkRjRVE3UVVGRFFUdEJRVU5CTEhGRVFVRnhSQ3hsUVVGbE8wRkJRM0JGTzBGQlEwRTdRVUZEUVN3clEwRkJLME03UVVGREwwTTdRVUZEUVN4WFFVRlhMRVZCUVVVN1FVRkRZanRCUVVOQk8wRkJRMEVzT0VOQlFUaERPMEZCUXpsRE8wRkJRMEVzVjBGQlZ5eEZRVUZGTzBGQlEySTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ6dEJRVU5ZTzBGQlEwRXNOa1JCUVRaRUxFOUJRVTg3UVVGRGNFVXNWMEZCVnp0QlFVTllPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHdzU1VGQlNUdEJRVU5LTEVkQlFVYzdRVUZEU0RzN1FVRkZRVHRCUVVOQk8wRkJRMEVzUlVGQlJUczdRVUZGUmpzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFbEJRVWs3UVVGRFNqdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEpRVUZKTzBGQlEwbzdRVUZEUVR0QlFVTkJMRWxCUVVrN1FVRkRTanRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZ3NSVUZCUlR0QlFVTkdMRU5CUVVNaUxDSm1hV3hsSWpvaU4yVTJZelUwTm1NNE16bGtaREkwWlRBek16a3Vhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJZ1hIUXZMeUJVYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSMllYSWdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN5QTlJSHQ5TzF4dVhHNGdYSFF2THlCVWFHVWdjbVZ4ZFdseVpTQm1kVzVqZEdsdmJseHVJRngwWm5WdVkzUnBiMjRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlodGIyUjFiR1ZKWkNrZ2UxeHVYRzRnWEhSY2RDOHZJRU5vWldOcklHbG1JRzF2WkhWc1pTQnBjeUJwYmlCallXTm9aVnh1SUZ4MFhIUnBaaWhwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYU2tnZTF4dUlGeDBYSFJjZEhKbGRIVnliaUJwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYUzVsZUhCdmNuUnpPMXh1SUZ4MFhIUjlYRzRnWEhSY2RDOHZJRU55WldGMFpTQmhJRzVsZHlCdGIyUjFiR1VnS0dGdVpDQndkWFFnYVhRZ2FXNTBieUIwYUdVZ1kyRmphR1VwWEc0Z1hIUmNkSFpoY2lCdGIyUjFiR1VnUFNCcGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFNBOUlIdGNiaUJjZEZ4MFhIUnBPaUJ0YjJSMWJHVkpaQ3hjYmlCY2RGeDBYSFJzT2lCbVlXeHpaU3hjYmlCY2RGeDBYSFJsZUhCdmNuUnpPaUI3ZlZ4dUlGeDBYSFI5TzF4dVhHNGdYSFJjZEM4dklFVjRaV04xZEdVZ2RHaGxJRzF2WkhWc1pTQm1kVzVqZEdsdmJseHVJRngwWEhSdGIyUjFiR1Z6VzIxdlpIVnNaVWxrWFM1allXeHNLRzF2WkhWc1pTNWxlSEJ2Y25SekxDQnRiMlIxYkdVc0lHMXZaSFZzWlM1bGVIQnZjblJ6TENCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktUdGNibHh1SUZ4MFhIUXZMeUJHYkdGbklIUm9aU0J0YjJSMWJHVWdZWE1nYkc5aFpHVmtYRzRnWEhSY2RHMXZaSFZzWlM1c0lEMGdkSEoxWlR0Y2JseHVJRngwWEhRdkx5QlNaWFIxY200Z2RHaGxJR1Y0Y0c5eWRITWdiMllnZEdobElHMXZaSFZzWlZ4dUlGeDBYSFJ5WlhSMWNtNGdiVzlrZFd4bExtVjRjRzl5ZEhNN1hHNGdYSFI5WEc1Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdWeklHOWlhbVZqZENBb1gxOTNaV0p3WVdOclgyMXZaSFZzWlhOZlh5bGNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJTQTlJRzF2WkhWc1pYTTdYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1NZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWek8xeHVYRzRnWEhRdkx5QmtaV1pwYm1VZ1oyVjBkR1Z5SUdaMWJtTjBhVzl1SUdadmNpQm9ZWEp0YjI1NUlHVjRjRzl5ZEhOY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WkNBOUlHWjFibU4wYVc5dUtHVjRjRzl5ZEhNc0lHNWhiV1VzSUdkbGRIUmxjaWtnZTF4dUlGeDBYSFJwWmlnaFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXZLR1Y0Y0c5eWRITXNJRzVoYldVcEtTQjdYRzRnWEhSY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUc1aGJXVXNJSHNnWlc1MWJXVnlZV0pzWlRvZ2RISjFaU3dnWjJWME9pQm5aWFIwWlhJZ2ZTazdYRzRnWEhSY2RIMWNiaUJjZEgwN1hHNWNiaUJjZEM4dklHUmxabWx1WlNCZlgyVnpUVzlrZFd4bElHOXVJR1Y0Y0c5eWRITmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNpQTlJR1oxYm1OMGFXOXVLR1Y0Y0c5eWRITXBJSHRjYmlCY2RGeDBhV1lvZEhsd1pXOW1JRk41YldKdmJDQWhQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWWdVM2x0WW05c0xuUnZVM1J5YVc1blZHRm5LU0I3WEc0Z1hIUmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lGTjViV0p2YkM1MGIxTjBjbWx1WjFSaFp5d2dleUIyWVd4MVpUb2dKMDF2WkhWc1pTY2dmU2s3WEc0Z1hIUmNkSDFjYmlCY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUNkZlgyVnpUVzlrZFd4bEp5d2dleUIyWVd4MVpUb2dkSEoxWlNCOUtUdGNiaUJjZEgwN1hHNWNiaUJjZEM4dklHTnlaV0YwWlNCaElHWmhhMlVnYm1GdFpYTndZV05sSUc5aWFtVmpkRnh1SUZ4MEx5OGdiVzlrWlNBbUlERTZJSFpoYkhWbElHbHpJR0VnYlc5a2RXeGxJR2xrTENCeVpYRjFhWEpsSUdsMFhHNGdYSFF2THlCdGIyUmxJQ1lnTWpvZ2JXVnlaMlVnWVd4c0lIQnliM0JsY25ScFpYTWdiMllnZG1Gc2RXVWdhVzUwYnlCMGFHVWdibk5jYmlCY2RDOHZJRzF2WkdVZ0ppQTBPaUJ5WlhSMWNtNGdkbUZzZFdVZ2QyaGxiaUJoYkhKbFlXUjVJRzV6SUc5aWFtVmpkRnh1SUZ4MEx5OGdiVzlrWlNBbUlEaDhNVG9nWW1Wb1lYWmxJR3hwYTJVZ2NtVnhkV2x5WlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTUwSUQwZ1puVnVZM1JwYjI0b2RtRnNkV1VzSUcxdlpHVXBJSHRjYmlCY2RGeDBhV1lvYlc5a1pTQW1JREVwSUhaaGJIVmxJRDBnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHloMllXeDFaU2s3WEc0Z1hIUmNkR2xtS0cxdlpHVWdKaUE0S1NCeVpYUjFjbTRnZG1Gc2RXVTdYRzRnWEhSY2RHbG1LQ2h0YjJSbElDWWdOQ2tnSmlZZ2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmIySnFaV04wSnlBbUppQjJZV3gxWlNBbUppQjJZV3gxWlM1ZlgyVnpUVzlrZFd4bEtTQnlaWFIxY200Z2RtRnNkV1U3WEc0Z1hIUmNkSFpoY2lCdWN5QTlJRTlpYW1WamRDNWpjbVZoZEdVb2JuVnNiQ2s3WEc0Z1hIUmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y2lodWN5azdYRzRnWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2h1Y3l3Z0oyUmxabUYxYkhRbkxDQjdJR1Z1ZFcxbGNtRmliR1U2SUhSeWRXVXNJSFpoYkhWbE9pQjJZV3gxWlNCOUtUdGNiaUJjZEZ4MGFXWW9iVzlrWlNBbUlESWdKaVlnZEhsd1pXOW1JSFpoYkhWbElDRTlJQ2R6ZEhKcGJtY25LU0JtYjNJb2RtRnlJR3RsZVNCcGJpQjJZV3gxWlNrZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWtLRzV6TENCclpYa3NJR1oxYm1OMGFXOXVLR3RsZVNrZ2V5QnlaWFIxY200Z2RtRnNkV1ZiYTJWNVhUc2dmUzVpYVc1a0tHNTFiR3dzSUd0bGVTa3BPMXh1SUZ4MFhIUnlaWFIxY200Z2JuTTdYRzRnWEhSOU8xeHVYRzRnWEhRdkx5Qm5aWFJFWldaaGRXeDBSWGh3YjNKMElHWjFibU4wYVc5dUlHWnZjaUJqYjIxd1lYUnBZbWxzYVhSNUlIZHBkR2dnYm05dUxXaGhjbTF2Ym5rZ2JXOWtkV3hsYzF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV1SUQwZ1puVnVZM1JwYjI0b2JXOWtkV3hsS1NCN1hHNGdYSFJjZEhaaGNpQm5aWFIwWlhJZ1BTQnRiMlIxYkdVZ0ppWWdiVzlrZFd4bExsOWZaWE5OYjJSMWJHVWdQMXh1SUZ4MFhIUmNkR1oxYm1OMGFXOXVJR2RsZEVSbFptRjFiSFFvS1NCN0lISmxkSFZ5YmlCdGIyUjFiR1ZiSjJSbFptRjFiSFFuWFRzZ2ZTQTZYRzRnWEhSY2RGeDBablZ1WTNScGIyNGdaMlYwVFc5a2RXeGxSWGh3YjNKMGN5Z3BJSHNnY21WMGRYSnVJRzF2WkhWc1pUc2dmVHRjYmlCY2RGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVrS0dkbGRIUmxjaXdnSjJFbkxDQm5aWFIwWlhJcE8xeHVJRngwWEhSeVpYUjFjbTRnWjJWMGRHVnlPMXh1SUZ4MGZUdGNibHh1SUZ4MEx5OGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtOGdQU0JtZFc1amRHbHZiaWh2WW1wbFkzUXNJSEJ5YjNCbGNuUjVLU0I3SUhKbGRIVnliaUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYjJKcVpXTjBMQ0J3Y205d1pYSjBlU2s3SUgwN1hHNWNiaUJjZEM4dklGOWZkMlZpY0dGamExOXdkV0pzYVdOZmNHRjBhRjlmWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbkFnUFNCY0lsd2lPMXh1WEc1Y2JpQmNkQzh2SUV4dllXUWdaVzUwY25rZ2JXOWtkV3hsSUdGdVpDQnlaWFIxY200Z1pYaHdiM0owYzF4dUlGeDBjbVYwZFhKdUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9YMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV6SUQwZ1hDSXVMM055WXk5cWN5OXRZV2x1TG1welhDSXBPMXh1SWl3aVpHOWpkVzFsYm5RdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnblJFOU5RMjl1ZEdWdWRFeHZZV1JsWkNjc0lHWjFibU4wYVc5dUlDZ3BJSHRjYmx4MGQybHVaRzkzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJ4dllXUW5MQ0FvWlNrZ1BUNGdlMXh1WEhSY2RHTnZibk4wSUhCeVpXeHZZV1FnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1Y0hKbGJHOWhaQ2NwTzF4dVhHNWNkRngwY0hKbGJHOWhaQzVqYkdGemMweHBjM1F1WVdSa0tDZHdjbVZzYjJGa0xXWnBibWx6YUdWa0p5azdYRzVjZEgwcE8xeHVYRzVjZEdOdmJuTjBJR0owYmxOamNtOXNiRlJ2Vkc5d0lEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0oySjBibE5qY205c2JGUnZWRzl3SnlrN1hHNWNibHgwYVdZZ0tHSjBibE5qY205c2JGUnZWRzl3S1NCN1hHNWNkRngwWW5SdVUyTnliMnhzVkc5VWIzQXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25ZMnhwWTJzbkxDQW9aU2tnUFQ0Z2UxeHVYSFJjZEZ4MGQybHVaRzkzTG5OamNtOXNiRlJ2S0h0Y2JseDBYSFJjZEZ4MGRHOXdPaUF3TEZ4dVhIUmNkRngwWEhSc1pXWjBPaUF3TEZ4dVhIUmNkRngwWEhSaVpXaGhkbWx2Y2pvZ0ozTnRiMjkwYUNjc1hHNWNkRngwWEhSOUtUdGNibHgwWEhSOUtUdGNibHgwZlZ4dVhHNWNkR052Ym5OMElHaGxZV1JsY2tOdmJuUmhhVzVsY2lBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0Nkb1pXRmtaWEluS1R0Y2JseHVYSFIzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25jMk55YjJ4c0p5d2dLR1VwSUQwK0lIdGNibHgwWEhScFppQW9aRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MExuTmpjbTlzYkZSdmNDQStJREFwSUh0Y2JseDBYSFJjZEdobFlXUmxja052Ym5SaGFXNWxjaTVqYkdGemMweHBjM1F1WVdSa0tDZHpkR2xqYTNrbktUdGNibHgwWEhSY2RHSjBibE5qY205c2JGUnZWRzl3TG5OMGVXeGxMbTl3WVdOcGRIa2dQU0F4TzF4dVhIUmNkSDBnWld4elpTQjdYRzVjZEZ4MFhIUm9aV0ZrWlhKRGIyNTBZV2x1WlhJdVkyeGhjM05NYVhOMExuSmxiVzkyWlNnbmMzUnBZMnQ1SnlrN1hHNWNkRngwWEhSaWRHNVRZM0p2Ykd4VWIxUnZjQzV6ZEhsc1pTNXZjR0ZqYVhSNUlEMGdNRHRjYmx4MFhIUjlYRzVjZEgwcE8xeHVYRzVjZEdOdmJuTjBJSFJ2WjJkc1pWUm9aVzFsUW5SdUlEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0ozUnZaMmRzWlZSb1pXMWxRblJ1SnlrN1hHNWNibHgwTHk4Z1puVnVZM1JwYjI0Z2RHOGdjMlYwSUdFZ1oybDJaVzRnZEdobGJXVXZZMjlzYjNJdGMyTm9aVzFsWEc1Y2RHWjFibU4wYVc5dUlITmxkRlJvWlcxbEtIUm9aVzFsVG1GdFpTa2dlMXh1WEhSY2RHeHZZMkZzVTNSdmNtRm5aUzV6WlhSSmRHVnRLQ2QwYUdWdFpTY3NJSFJvWlcxbFRtRnRaU2s3WEc1Y2RGeDBaRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MExtTnNZWE56VG1GdFpTQTlJSFJvWlcxbFRtRnRaVHRjYmx4MGZWeHVYRzVjZEM4dklHWjFibU4wYVc5dUlIUnZJSFJ2WjJkc1pTQmlaWFIzWldWdUlHeHBaMmgwSUdGdVpDQmtZWEpySUhSb1pXMWxYRzVjZEdaMWJtTjBhVzl1SUhSdloyZHNaVlJvWlcxbEtDa2dlMXh1WEhSY2RHbG1JQ2hzYjJOaGJGTjBiM0poWjJVdVoyVjBTWFJsYlNnbmRHaGxiV1VuS1NBOVBUMGdKM1JvWlcxbExXUmhjbXNuS1NCN1hHNWNkRngwWEhSelpYUlVhR1Z0WlNnbmRHaGxiV1V0YkdsbmFIUW5LVHRjYmx4MFhIUmNkSFJ2WjJkc1pWUm9aVzFsUW5SdUxtbHVibVZ5VkdWNGRDQTlJQ2RFWVhKcklFMXZaR1VuTzF4dVhIUmNkSDBnWld4elpTQjdYRzVjZEZ4MFhIUnpaWFJVYUdWdFpTZ25kR2hsYldVdFpHRnlheWNwTzF4dVhIUmNkRngwZEc5bloyeGxWR2hsYldWQ2RHNHVhVzV1WlhKVVpYaDBJRDBnSjB4cFoyaDBJRTF2WkdVbk8xeHVYSFJjZEgxY2JseDBmVnh1WEc1Y2RDOHZJRWx0YldWa2FXRjBaV3g1SUdsdWRtOXJaV1FnWm5WdVkzUnBiMjRnZEc4Z2MyVjBJSFJvWlNCMGFHVnRaU0J2YmlCcGJtbDBhV0ZzSUd4dllXUmNibHgwS0daMWJtTjBhVzl1SUNncElIdGNibHgwWEhScFppQW9iRzlqWVd4VGRHOXlZV2RsTG1kbGRFbDBaVzBvSjNSb1pXMWxKeWtnUFQwOUlDZDBhR1Z0WlMxa1lYSnJKeWtnZTF4dVhIUmNkRngwYzJWMFZHaGxiV1VvSjNSb1pXMWxMV1JoY21zbktUdGNibHgwWEhSY2RIUnZaMmRzWlZSb1pXMWxRblJ1TG1sdWJtVnlWR1Y0ZENBOUlDZE1hV2RvZENCTmIyUmxKenRjYmx4MFhIUjlJR1ZzYzJVZ2UxeHVYSFJjZEZ4MGMyVjBWR2hsYldVb0ozUm9aVzFsTFd4cFoyaDBKeWs3WEc1Y2RGeDBYSFIwYjJkbmJHVlVhR1Z0WlVKMGJpNXBibTVsY2xSbGVIUWdQU0FuUkdGeWF5Qk5iMlJsSnp0Y2JseDBYSFI5WEc1Y2RIMHBLQ2s3WEc1Y2JseDBkRzluWjJ4bFZHaGxiV1ZDZEc0dVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnblkyeHBZMnNuTENBb1pTa2dQVDRnZTF4dVhIUmNkSFJ2WjJkc1pWUm9aVzFsS0NrN1hHNWNkSDBwTzF4dVhHNWNkR052Ym5OMElHTnZkVzUwY21sbGMxVnliQ0E5SUNkb2RIUndjem92TDNKbGMzUmpiM1Z1ZEhKcFpYTXVaWFV2Y21WemRDOTJNaTloYkd3bk8xeHVYRzVjZEdaMWJtTjBhVzl1SUdkbGRFTnZkVzUwY21sbGMwUmhkR0VvS1NCN1hHNWNkRngwY21WMGRYSnVJRzVsZHlCUWNtOXRhWE5sS0NoeVpYTnZiSFpsTENCeVpXcGxZM1FwSUQwK0lIdGNibHgwWEhSY2RHWmxkR05vS0dOdmRXNTBjbWxsYzFWeWJDbGNibHgwWEhSY2RGeDBMblJvWlc0b0tISmxjM0FwSUQwK0lIdGNibHgwWEhSY2RGeDBYSFJwWmlBb0lYSmxjM0F1YjJzcElIdGNibHgwWEhSY2RGeDBYSFJjZEhSb2NtOTNJRVZ5Y205eUtHQWtlM0psYzNBdWMzUmhkSFZ6VkdWNGRIMGdMU0FrZTNKbGMzQXVkWEpzZldBcE8xeHVYSFJjZEZ4MFhIUmNkSDFjYmx4MFhIUmNkRngwWEhSeVpYUjFjbTRnY21WemNDNXFjMjl1S0NrN1hHNWNkRngwWEhSY2RIMHBYRzVjZEZ4MFhIUmNkQzUwYUdWdUtDaGtZWFJoS1NBOVBpQnlaWE52YkhabEtHUmhkR0VwS1Z4dVhIUmNkRngwWEhRdVkyRjBZMmdvS0dWeWNpa2dQVDRnY21WcVpXTjBLR1Z5Y2lrcE8xeHVYSFJjZEgwcE8xeHVYSFI5WEc1Y2JseDBZWE41Ym1NZ1puVnVZM1JwYjI0Z1pHbHpjR3hoZVVOdmRXNTBjbWxsYzA1MWJXSmxjbk1vS1NCN1hHNWNkRngwWTI5dWMzUWdZMjkxYm5SeWFXVnpRMjl1ZEdGcGJtVnlJRDBnWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9KMk52ZFc1MGNtbGxjME52Ym5SaGFXNWxjaWNwTzF4dVhIUmNkR052Ym5OMElHTnZkVzUwY21sbGMweHBjM1FnUFNCaGQyRnBkQ0JuWlhSRGIzVnVkSEpwWlhORVlYUmhLQ2s3WEc1Y2JseDBYSFJqYjNWdWRISnBaWE5NYVhOMExtWnZja1ZoWTJnb0tHTnZkVzUwY25rcElEMCtJSHRjYmx4MFhIUmNkR052Ym5OMElIdGNibHgwWEhSY2RGeDBibUZ0WlN4Y2JseDBYSFJjZEZ4MGNHOXdkV3hoZEdsdmJpeGNibHgwWEhSY2RGeDBjbVZuYVc5dUxGeHVYSFJjZEZ4MFhIUmpZWEJwZEdGc0xGeHVYSFJjZEZ4MFhIUm1iR0ZuTEZ4dVhIUmNkRngwWEhSdVlYUnBkbVZPWVcxbExGeHVYSFJjZEZ4MFhIUnpkV0p5WldkcGIyNHNYRzVjZEZ4MFhIUmNkSFJ2Y0V4bGRtVnNSRzl0WVdsdUxGeHVYSFJjZEZ4MFhIUmpkWEp5Wlc1amFXVnpMRnh1WEhSY2RGeDBYSFJzWVc1bmRXRm5aWE1zWEc1Y2RGeDBYSFJjZEdKdmNtUmxjbk1zWEc1Y2RGeDBYSFI5SUQwZ1kyOTFiblJ5ZVR0Y2JseHVYSFJjZEZ4MGJHVjBJR052ZFc1MGNubEZiQ0E5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUW9KMlJwZGljcE8xeHVYSFJjZEZ4MFkyOTFiblJ5ZVVWc0xtTnNZWE56VEdsemRDNWhaR1FvSjJKdmVDY3BPMXh1WEhSY2RGeDBZMjkxYm5SeWVVVnNMbU5zWVhOelRHbHpkQzVoWkdRb0oyRmpkR2wyWlNjcE8xeHVYRzVjZEZ4MFhIUmpiM1Z1ZEhKNVJXd3VhVzV1WlhKSVZFMU1JRDBnWUZ4dVhIUmNkRngwWEhSY2RGeDBQR1JwZGlCamJHRnpjejFjSW1KdmVGOWZkRzl3WENJK1hHNWNkRngwWEhSY2RGeDBYSFJjZER4cGJXY2djM0pqUFZ3aUpIdG1iR0ZuZlZ3aUlHeHZZV1JwYm1jOVhDSnNZWHA1WENJZ1lXeDBQVndpWm14aFp5QnZaaUJoSUNSN2JtRnRaWDFjSWlBdlBseHVYSFJjZEZ4MFhIUmNkRngwUEM5a2FYWStYRzVjYmx4MFhIUmNkRngwWEhSY2REeGthWFlnWTJ4aGMzTTlYQ0ppYjNoZlgySnZkSFJ2YlZ3aVBseHVYSFJjZEZ4MFhIUmNkRngwWEhROGFETWdZMnhoYzNNOVhDSmliM2hmWDNScGRHeGxYQ0krSkh0dVlXMWxmVHd2YURNK1hHNWNkRngwWEhSY2RGeDBYSFJjZER4MWJDQmpiR0Z6Y3oxY0ltSnZlRjlmYVc1bWJ5MXNhWE4wWENJK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFBHeHBJR05zWVhOelBWd2lZbTk0WDE5cGJtWnZMV3hwYzNRdGFYUmxiVndpUGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBITndZVzRnWTJ4aGMzTTlYQ0ppYjNoZlgybHVabTh0YkdsemRDMXBkR1Z0TFMxaWIyeGtYQ0krVUc5d2RXeGhhWFJ2YmpvOEwzTndZVzQrWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhRa2UzQnZjSFZzWVhScGIyNTlYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBQQzlzYVQ1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhROGJHa2dZMnhoYzNNOVhDSmliM2hmWDJsdVptOHRiR2x6ZEMxcGRHVnRYQ0krWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROGMzQmhiaUJqYkdGemN6MWNJbUp2ZUY5ZmFXNW1ieTFzYVhOMExXbDBaVzB0TFdKdmJHUmNJajVTWldkcGIyNDZQQzl6Y0dGdVBpQThZajRrZTNKbFoybHZibjA4TDJJK0lGeHVYSFJjZEZ4MFhIUmNkRngwWEhSY2REd3ZiR2srWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwUEd4cElHTnNZWE56UFZ3aVltOTRYMTlwYm1adkxXeHBjM1F0YVhSbGJWd2lQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwUEhOd1lXNGdZMnhoYzNNOVhDSmliM2hmWDJsdVptOHRiR2x6ZEMxcGRHVnRMUzFpYjJ4a1hDSStRMkZ3YVhSdmJEbzhMM053WVc0K0lDUjdZMkZ3YVhSaGJIMWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUThMMnhwUGx4dVhIUmNkRngwWEhSY2RGeDBYSFE4TDNWc1BseHVYSFJjZEZ4MFhIUmNkRngwUEM5a2FYWStYRzVjZEZ4MFhIUmNkRngwWUR0Y2JseHVYSFJjZEZ4MFkyOTFiblJ5YVdWelEyOXVkR0ZwYm1WeUxtRndjR1Z1WkVOb2FXeGtLR052ZFc1MGNubEZiQ2s3WEc1Y2JseDBYSFJjZEdOdmRXNTBjbmxGYkM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUNobEtTQTlQaUI3WEc1Y2RGeDBYSFJjZEdOdmJuTjBJRzF2WkdGc1EyOXVkR0ZwYm1WeUlEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0oyMXZaR0ZzTFdOdmJuUmhhVzVsY2ljcE8xeHVYRzVjZEZ4MFhIUmNkRzF2WkdGc1EyOXVkR0ZwYm1WeUxuTjBlV3hsTG1ScGMzQnNZWGtnUFNBblpteGxlQ2M3WEc1Y2RGeDBYSFJjZEdKMGJsTmpjbTlzYkZSdlZHOXdMbk4wZVd4bExtOXdZV05wZEhrZ1BTQXdPMXh1WEc1Y2RGeDBYSFJjZEcxdlpHRnNRMjl1ZEdGcGJtVnlMbWx1Ym1WeVNGUk5UQ0E5SUdCY2JseDBYSFJjZEZ4MFBHUnBkaUJqYkdGemN6MWNJbTF2WkdGc1hDSStYRzVjZEZ4MFhIUmNkRngwWEhROFpHbDJJR05zWVhOelBWd2liVzlrWVd4ZlgyaGxZV1JsY2x3aVBseHVYSFJjZEZ4MFhIUmNkRngwWEhROFluVjBkRzl1SUdOc1lYTnpQVndpYlc5a1lXeGZYMkowYmx3aUlHbGtQVndpWTJ4dmMyVXRiVzlrWVd4Y0lqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUThjM1puWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSaGNtbGhMV2hwWkdSbGJqMWNJblJ5ZFdWY0lseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBabTlqZFhOaFlteGxQVndpWm1Gc2MyVmNJbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwWkdGMFlTMXdjbVZtYVhnOVhDSm1ZWE5jSWx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFpHRjBZUzFwWTI5dVBWd2lZWEp5YjNjdGJHVm1kRndpWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSamJHRnpjejFjSW5OMlp5MXBibXhwYm1VdExXWmhJR1poTFdGeWNtOTNMV3hsWm5RZ1ptRXRkeTB4TkZ3aVhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUnliMnhsUFZ3aWFXMW5YQ0pjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZEhodGJHNXpQVndpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWRjSWx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MGRtbGxkMEp2ZUQxY0lqQWdNQ0EwTkRnZ05URXlYQ0pjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFErWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROGNHRjBhRnh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSbWFXeHNQVndpWTNWeWNtVnVkRU52Ykc5eVhDSmNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwWkQxY0lrMHlOVGN1TlNBME5EVXVNV3d0TWpJdU1pQXlNaTR5WXkwNUxqUWdPUzQwTFRJMExqWWdPUzQwTFRNekxqa2dNRXczSURJM00yTXRPUzQwTFRrdU5DMDVMalF0TWpRdU5pQXdMVE16TGpsTU1qQXhMalFnTkRRdU4yTTVMalF0T1M0MElESTBMall0T1M0MElETXpMamtnTUd3eU1pNHlJREl5TGpKak9TNDFJRGt1TlNBNUxqTWdNalV0TGpRZ016UXVNMHd4TXpZdU5pQXlNVFpJTkRJMFl6RXpMak1nTUNBeU5DQXhNQzQzSURJMElESTBkak15WXpBZ01UTXVNeTB4TUM0M0lESTBMVEkwSURJMFNERXpOaTQyYkRFeU1DNDFJREV4TkM0NFl6a3VPQ0E1TGpNZ01UQWdNalF1T0M0MElETTBMak42WENKY2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RENDhMM0JoZEdnK1BDOXpkbWRjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFErUEhOd1lXNCtRbUZqYXp3dmMzQmhiajVjYmx4MFhIUmNkRngwWEhSY2RGeDBQQzlpZFhSMGIyNCtYRzVjZEZ4MFhIUmNkRngwWEhROEwyUnBkajVjYmx4dVhIUmNkRngwWEhSY2RGeDBQR1JwZGlCamJHRnpjejFjSW0xdlpHRnNYMTlqYjI1MFlXbHVaWEpjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwUEdScGRpQmpiR0Z6Y3oxY0ltMXZaR0ZzWDE5c1pXWjBYQ0krWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwUEdsdFoxeHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBjM0pqUFZ3aUpIdG1iR0ZuZlZ3aVhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUnNiMkZrYVc1blBWd2liR0Y2ZVZ3aVhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUmhiSFE5WENKbWJHRm5JRzltSUdFZ0pIdHVZVzFsZlZ3aVhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MEx6NWNibHgwWEhSY2RGeDBYSFJjZEZ4MFBDOWthWFkrWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRHhrYVhZZ1kyeGhjM005WENKdGIyUmhiRjlmY21sbmFIUmNJajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFE4YURJZ1kyeGhjM005WENKdGIyUmhiRjlmY21sbmFIUXRkR2wwYkdWY0lqNGtlMjVoYldWOVBDOW9NajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFE4ZFd3Z1kyeGhjM005WENKdGIyUmhiRjlmY21sbmFIUXRiR2x6ZEZ3aVBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQR3hwSUdOc1lYTnpQVndpYlc5a1lXeGZYM0pwWjJoMExXeHBjM1F0YVhSbGJWd2lQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROGMzUnliMjVuUGs1aGRHbDJaU0JPWVcxbE9qd3ZjM1J5YjI1blBpQThjM0JoYmo0a2UyNWhkR2wyWlU1aGJXVjlQQzl6Y0dGdVBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQQzlzYVQ1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REeHNhU0JqYkdGemN6MWNJbTF2WkdGc1gxOXlhV2RvZEMxc2FYTjBMV2wwWlcxY0lqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwUEhOMGNtOXVaejVRYjNCMWJHRjBhVzl1T2p3dmMzUnliMjVuUGlBOGMzQmhiajRrZTNCdmNIVnNZWFJwYjI1OVBDOXpjR0Z1UGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBDOXNhVDVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER4c2FTQmpiR0Z6Y3oxY0ltMXZaR0ZzWDE5eWFXZG9kQzFzYVhOMExXbDBaVzFjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQSE4wY205dVp6NVNaV2RwYjI0NlBDOXpkSEp2Ym1jK0lEeHpjR0Z1UGlSN2NtVm5hVzl1ZlR3dmMzQmhiajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER3dmJHaytYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFE4YkdrZ1kyeGhjM005WENKdGIyUmhiRjlmY21sbmFIUXRiR2x6ZEMxcGRHVnRYQ0krWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REeHpkSEp2Ym1jK1UzVmlJRkpsWjJsdmJqbzhMM04wY205dVp6NGdQSE53WVc0K0pIdHpkV0p5WldkcGIyNTlQQzl6Y0dGdVBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQQzlzYVQ1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REeHNhU0JqYkdGemN6MWNJbTF2WkdGc1gxOXlhV2RvZEMxc2FYTjBMV2wwWlcxY0lqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwUEhOMGNtOXVaejVEWVhCcGRHRnNPand2YzNSeWIyNW5QaUE4YzNCaGJqNGtlMk5oY0dsMFlXeDlQQzl6Y0dGdVBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQQzlzYVQ1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REeHNhU0JqYkdGemN6MWNJbTF2WkdGc1gxOXlhV2RvZEMxc2FYTjBMV2wwWlcxY0lqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwUEhOMGNtOXVaejVVYjNBZ1RHVjJaV3dnUkc5dFlXbHVPand2YzNSeWIyNW5QaUE4YzNCaGJqNGtlM1J2Y0V4bGRtVnNSRzl0WVdsdWZUd3ZjM0JoYmo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REd3ZiR2srWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROGJHa2dZMnhoYzNNOVhDSnRiMlJoYkY5ZmNtbG5hSFF0YkdsemRDMXBkR1Z0WENJK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHh6ZEhKdmJtYytRM1Z5Y21WdVkybGxjem84TDNOMGNtOXVaejRnUEhOd1lXNCtKSHRqZFhKeVpXNWphV1Z6TG0xaGNDZ29ZM1Z5S1NBOVBpQjdYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MGNtVjBkWEp1SUdOMWNpNXVZVzFsTzF4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUjlLWDA4TDNOd1lXNCtYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFE4TDJ4cFBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQR3hwSUdOc1lYTnpQVndpYlc5a1lXeGZYM0pwWjJoMExXeHBjM1F0YVhSbGJWd2lQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROGMzUnliMjVuUGt4aGJtZDFZV2RsY3pvOEwzTjBjbTl1Wno0Z1BITndZVzQrSkh0c1lXNW5kV0ZuWlhNdWJXRndLQ2hzWVc1bktTQTlQaUI3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBjbVYwZFhKdUlHeGhibWN1Ym1GdFpUdGNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwZlNsOVBDOXpjR0Z1UGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBDOXNhVDVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFE4TDNWc1BseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2REeGthWFlnWTJ4aGMzTTlYQ0p0YjJSaGJGOWZjbWxuYUhRdFltOTBkRzl0WENJK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUThjQ0JqYkdGemN6MWNJbTF2WkdGc1gxOXlhV2RvZEMxaWIzUjBiMjB0TFhSbGVIUmNJajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBITjBjbTl1Wno1Q2IzSmtaWElnWTI5MWJuUnlhV1Z6T2p3dmMzUnliMjVuUGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBDOXdQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwSkh0aWIzSmtaWEp6WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RDNXRZWEFvS0dKdmNtUmxjaWtnUFQ0Z2UxeHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFJjZEhKbGRIVnliaUJnUEdKMWRIUnZiaUJqYkdGemN6MWNJbTF2WkdGc1gxOXlhV2RvZEMxaWIzUjBiMjB0WW5SdVhDSStKSHRpYjNKa1pYSjlQQzlpZFhSMGIyNCtZRHRjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MGZTbGNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwTG1wdmFXNG9KeWNwZlZ4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFBDOWthWFkrWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRHd2WkdsMlBseHVYSFJjZEZ4MFhIUmNkRngwUEM5a2FYWStYRzVjZEZ4MFhIUmNkRngwUEM5a2FYWStYRzVjZEZ4MFhIUmNkR0E3WEc1Y2JseDBYSFJjZEZ4MGFXWWdLRzF2WkdGc1EyOXVkR0ZwYm1WeUxuTjBlV3hsTG1ScGMzQnNZWGtnUFQwOUlDZG1iR1Y0SnlrZ2UxeHVYSFJjZEZ4MFhIUmNkR1J2WTNWdFpXNTBMbUp2WkhrdWMzUjViR1V1YjNabGNtWnNiM2NnUFNBbmFHbGtaR1Z1Snp0Y2JseDBYSFJjZEZ4MFhIUnRiMlJoYkVOdmJuUmhhVzVsY2k1emRIbHNaUzVrYVhOd2JHRjVJRDBnSjJac1pYZ25PMXh1WEhSY2RGeDBYSFI5WEc1Y2JseDBYSFJjZEZ4MFkyOXVjM1FnYlc5a1lXeENZV05yUW5SdUlEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0oyTnNiM05sTFcxdlpHRnNKeWs3WEc1Y2RGeDBYSFJjZEcxdlpHRnNRbUZqYTBKMGJpNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lDaGxLU0E5UGlCN1hHNWNkRngwWEhSY2RGeDBiVzlrWVd4RGIyNTBZV2x1WlhJdWMzUjViR1V1WkdsemNHeGhlU0E5SUNjbk8xeHVYSFJjZEZ4MFhIUmNkR1J2WTNWdFpXNTBMbUp2WkhrdWMzUjViR1V1YjNabGNtWnNiM2RaSUQwZ0ozTmpjbTlzYkNjN1hHNWNkRngwWEhSY2RIMHBPMXh1WEhSY2RGeDBmU2s3WEc1Y2RGeDBmU2s3WEc1Y2RIMWNibHh1WEhRb1puVnVZM1JwYjI0Z0tDa2dlMXh1WEhSY2RHUnBjM0JzWVhsRGIzVnVkSEpwWlhOT2RXMWlaWEp6S0NrN1hHNWNkSDBwS0NrN1hHNWNibHgwYkdWMElITmxZWEpqYUVsdWNIVjBJRDBnWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9KM05sWVhKamFFbHVjSFYwSnlrN1hHNWNibHgwYzJWaGNtTm9TVzV3ZFhRdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmFXNXdkWFFuTENCbWFXeDBaWEpUWldGeVkyZ3BPMXh1WEc1Y2RHWjFibU4wYVc5dUlHWnBiSFJsY2xObFlYSmphQ2hsS1NCN1hHNWNkRngwYkdWMElHbHVjSFYwVm1Gc2RXVWdQU0JsTG5SaGNtZGxkQzUyWVd4MVpTNTBiMVZ3Y0dWeVEyRnpaU2dwTzF4dVhIUmNkR052Ym5OMElHTnZkVzUwY21sbGN5QTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNKQmJHd29KeTVpYjNnbktUdGNibHh1WEhSY2RHTnZkVzUwY21sbGN5NW1iM0pGWVdOb0tDaGpiM1Z1ZEhKNUtTQTlQaUI3WEc1Y2RGeDBYSFJqYjNWdWRISjVUbUZ0WlNBOUlHTnZkVzUwY25sY2JseDBYSFJjZEZ4MExtZGxkRVZzWlcxbGJuUnpRbmxVWVdkT1lXMWxLQ2RvTXljcFd6QmRYRzVjZEZ4MFhIUmNkQzVwYm01bGNsUmxlSFF1ZEc5VmNIQmxja05oYzJVb0tUdGNibHh1WEhSY2RGeDBhV1lnS0Z4dVhIUmNkRngwWEhSamIzVnVkSEo1TG1Oc1lYTnpUR2x6ZEM1amIyNTBZV2x1Y3lnbllXTjBhWFpsSnlrZ0ppWmNibHgwWEhSY2RGeDBZMjkxYm5SeWVVNWhiV1V1YVc1a1pYaFBaaWhwYm5CMWRGWmhiSFZsS1NBK0lDMHhYRzVjZEZ4MFhIUXBJSHRjYmx4MFhIUmNkRngwWTI5MWJuUnllUzV6ZEhsc1pTNWthWE53YkdGNUlEMGdKMlpzWlhnbk8xeHVYSFJjZEZ4MGZTQmxiSE5sSUh0Y2JseDBYSFJjZEZ4MFkyOTFiblJ5ZVM1emRIbHNaUzVrYVhOd2JHRjVJRDBnSjI1dmJtVW5PMXh1WEhSY2RGeDBmVnh1WEhSY2RIMHBPMXh1WEhSOVhHNWNibHgwWTI5dWMzUWdjbVZuYVc5dVUyVnNaV04wSUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvSjNKbFoybHZiaWNwTzF4dVhHNWNkSEpsWjJsdmJsTmxiR1ZqZEM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamFHRnVaMlVuTENBb1pTa2dQVDRnZTF4dVhIUmNkR052Ym5OMElISmxaMmx2YmlBOUlHVXVZM1Z5Y21WdWRGUmhjbWRsZEM1MllXeDFaUzUwYjFWd2NHVnlRMkZ6WlNncE8xeHVYSFJjZEdOdmJuTjBJR052ZFc1MGNtbGxjeUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSkJiR3dvSnk1aWIzZ25LVHRjYmx4dVhIUmNkSE5sWVhKamFFbHVjSFYwTG5aaGJIVmxJRDBnSnljN1hHNWNibHgwWEhSamIzVnVkSEpwWlhNdVptOXlSV0ZqYUNnb1kyOTFiblJ5ZVNrZ1BUNGdlMXh1WEhSY2RGeDBZMjkxYm5SeWVWSmxaMmx2YmlBOUlHTnZkVzUwY25sY2JseDBYSFJjZEZ4MExtZGxkRVZzWlcxbGJuUnpRbmxVWVdkT1lXMWxLQ2RpSnlsYk1GMWNibHgwWEhSY2RGeDBMbWx1Ym1WeVZHVjRkQzUwYjFWd2NHVnlRMkZ6WlNncE8xeHVYRzVjZEZ4MFhIUnBaaUFvWTI5MWJuUnllVkpsWjJsdmJpNXBibVJsZUU5bUtISmxaMmx2YmlrZ1BpQXRNU2tnZTF4dVhIUmNkRngwWEhSamIzVnVkSEo1TG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FuWm14bGVDYzdYRzVjZEZ4MFhIUmNkR052ZFc1MGNua3VZMnhoYzNOTWFYTjBMbUZrWkNnbllXTjBhWFpsSnlrN1hHNWNkRngwWEhSOUlHVnNjMlVnYVdZZ0tISmxaMmx2YmlBOVBUMGdKMEZNVENjcElIdGNibHgwWEhSY2RGeDBZMjkxYm5SeWVTNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0oyWnNaWGduTzF4dVhIUmNkRngwWEhSamIzVnVkSEo1TG1Oc1lYTnpUR2x6ZEM1aFpHUW9KMkZqZEdsMlpTY3BPMXh1WEhSY2RGeDBmU0JsYkhObElIdGNibHgwWEhSY2RGeDBZMjkxYm5SeWVTNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0oyNXZibVVuTzF4dVhIUmNkRngwWEhSamIzVnVkSEo1TG1Oc1lYTnpUR2x6ZEM1eVpXMXZkbVVvSjJGamRHbDJaU2NwTzF4dVhIUmNkRngwZlZ4dVhIUmNkSDBwTzF4dVhIUjlLVHRjYm4wcE8xeHVJbDBzSW5OdmRYSmpaVkp2YjNRaU9pSWlmUT09In0=
