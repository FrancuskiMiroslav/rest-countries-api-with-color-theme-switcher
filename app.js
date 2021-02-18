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

	window.addEventListener('scroll', (e) => {
		if (document.documentElement.scrollTop > 0) {
			btnScrollToTop.style.opacity = 1;
		} else {
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
										<strong>Currencies:</strong> <span>${currencies}</span>
									</li>
									<li class="modal__right-list-item">
										<strong>Languages:</strong> <span>${languages}</span>
									</li>
								</ul>
								<div class="modal__right-bottom">
									<p class="modal__right-bottom--text">
										<strong>Border countries:</strong>
									</p>
									<button class="modal__right-bottom-btn">France</button>
								</div>
							</div>
						</div>
					</div>
				`;
				/* if (modalContainer.style.display === '') {
					document.body.style.overflowY = 'scroll';
					modalContainer.style.display = 'flex';
				} else if (modalContainer.style.display === 'flex') {
					document.body.style.overflowY = 'hidden';
					modalContainer.style.display = '';
				} */

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQixLQUFLLFNBQVM7QUFDbkQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUssa0NBQWtDLEtBQUs7QUFDL0Q7O0FBRUE7QUFDQSxnQ0FBZ0MsS0FBSztBQUNyQztBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLHFFQUFxRSxPQUFPO0FBQzVFO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLEtBQUs7QUFDckI7QUFDQSwwQkFBMEIsS0FBSztBQUMvQjtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsS0FBSztBQUM5QztBQUNBO0FBQ0EsZ0RBQWdELFdBQVc7QUFDM0Q7QUFDQTtBQUNBLCtDQUErQyxXQUFXO0FBQzFEO0FBQ0E7QUFDQSwyQ0FBMkMsT0FBTztBQUNsRDtBQUNBO0FBQ0EsK0NBQStDLFVBQVU7QUFDekQ7QUFDQTtBQUNBLDRDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQSxxREFBcUQsZUFBZTtBQUNwRTtBQUNBO0FBQ0EsK0NBQStDLFdBQVc7QUFDMUQ7QUFDQTtBQUNBLDhDQUE4QyxVQUFVO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0YsQ0FBQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9tYWluLmpzXCIpO1xuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZSkgPT4ge1xuXHRcdGNvbnN0IHByZWxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZCcpO1xuXG5cdFx0cHJlbG9hZC5jbGFzc0xpc3QuYWRkKCdwcmVsb2FkLWZpbmlzaGVkJyk7XG5cdH0pO1xuXG5cdGNvbnN0IGJ0blNjcm9sbFRvVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blNjcm9sbFRvVG9wJyk7XG5cblx0aWYgKGJ0blNjcm9sbFRvVG9wKSB7XG5cdFx0YnRuU2Nyb2xsVG9Ub3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0d2luZG93LnNjcm9sbFRvKHtcblx0XHRcdFx0dG9wOiAwLFxuXHRcdFx0XHRsZWZ0OiAwLFxuXHRcdFx0XHRiZWhhdmlvcjogJ3Ntb290aCcsXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZSkgPT4ge1xuXHRcdGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID4gMCkge1xuXHRcdFx0YnRuU2Nyb2xsVG9Ub3Auc3R5bGUub3BhY2l0eSA9IDE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJ0blNjcm9sbFRvVG9wLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdH1cblx0fSk7XG5cblx0Y29uc3QgdG9nZ2xlVGhlbWVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9nZ2xlVGhlbWVCdG4nKTtcblxuXHQvLyBmdW5jdGlvbiB0byBzZXQgYSBnaXZlbiB0aGVtZS9jb2xvci1zY2hlbWVcblx0ZnVuY3Rpb24gc2V0VGhlbWUodGhlbWVOYW1lKSB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RoZW1lJywgdGhlbWVOYW1lKTtcblx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NOYW1lID0gdGhlbWVOYW1lO1xuXHR9XG5cblx0Ly8gZnVuY3Rpb24gdG8gdG9nZ2xlIGJldHdlZW4gbGlnaHQgYW5kIGRhcmsgdGhlbWVcblx0ZnVuY3Rpb24gdG9nZ2xlVGhlbWUoKSB7XG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZScpID09PSAndGhlbWUtZGFyaycpIHtcblx0XHRcdHNldFRoZW1lKCd0aGVtZS1saWdodCcpO1xuXHRcdFx0dG9nZ2xlVGhlbWVCdG4uaW5uZXJUZXh0ID0gJ0RhcmsgTW9kZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNldFRoZW1lKCd0aGVtZS1kYXJrJyk7XG5cdFx0XHR0b2dnbGVUaGVtZUJ0bi5pbm5lclRleHQgPSAnTGlnaHQgTW9kZSc7XG5cdFx0fVxuXHR9XG5cblx0Ly8gSW1tZWRpYXRlbHkgaW52b2tlZCBmdW5jdGlvbiB0byBzZXQgdGhlIHRoZW1lIG9uIGluaXRpYWwgbG9hZFxuXHQoZnVuY3Rpb24gKCkge1xuXHRcdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWUnKSA9PT0gJ3RoZW1lLWRhcmsnKSB7XG5cdFx0XHRzZXRUaGVtZSgndGhlbWUtZGFyaycpO1xuXHRcdFx0dG9nZ2xlVGhlbWVCdG4uaW5uZXJUZXh0ID0gJ0xpZ2h0IE1vZGUnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXRUaGVtZSgndGhlbWUtbGlnaHQnKTtcblx0XHRcdHRvZ2dsZVRoZW1lQnRuLmlubmVyVGV4dCA9ICdEYXJrIE1vZGUnO1xuXHRcdH1cblx0fSkoKTtcblxuXHR0b2dnbGVUaGVtZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0dG9nZ2xlVGhlbWUoKTtcblx0fSk7XG5cblx0Y29uc3QgY291bnRyaWVzVXJsID0gJ2h0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL2FsbCc7XG5cblx0ZnVuY3Rpb24gZ2V0Q291bnRyaWVzRGF0YSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0ZmV0Y2goY291bnRyaWVzVXJsKVxuXHRcdFx0XHQudGhlbigocmVzcCkgPT4ge1xuXHRcdFx0XHRcdGlmICghcmVzcC5vaykge1xuXHRcdFx0XHRcdFx0dGhyb3cgRXJyb3IoYCR7cmVzcC5zdGF0dXNUZXh0fSAtICR7cmVzcC51cmx9YCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiByZXNwLmpzb24oKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHJlc29sdmUoZGF0YSkpXG5cdFx0XHRcdC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBmdW5jdGlvbiBkaXNwbGF5Q291bnRyaWVzTnVtYmVycygpIHtcblx0XHRjb25zdCBjb3VudHJpZXNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRyaWVzQ29udGFpbmVyJyk7XG5cdFx0Y29uc3QgY291bnRyaWVzTGlzdCA9IGF3YWl0IGdldENvdW50cmllc0RhdGEoKTtcblxuXHRcdGNvdW50cmllc0xpc3QuZm9yRWFjaCgoY291bnRyeSkgPT4ge1xuXHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRwb3B1bGF0aW9uLFxuXHRcdFx0XHRyZWdpb24sXG5cdFx0XHRcdGNhcGl0YWwsXG5cdFx0XHRcdGZsYWcsXG5cdFx0XHRcdG5hdGl2ZU5hbWUsXG5cdFx0XHRcdHN1YnJlZ2lvbixcblx0XHRcdFx0dG9wTGV2ZWxEb21haW4sXG5cdFx0XHRcdGN1cnJlbmNpZXMsXG5cdFx0XHRcdGxhbmd1YWdlcyxcblx0XHRcdH0gPSBjb3VudHJ5O1xuXG5cdFx0XHRsZXQgY291bnRyeUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRjb3VudHJ5RWwuY2xhc3NMaXN0LmFkZCgnYm94Jyk7XG5cdFx0XHRjb3VudHJ5RWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cblx0XHRcdGNvdW50cnlFbC5pbm5lckhUTUwgPSBgXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94X190b3BcIj5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCIke2ZsYWd9XCIgbG9hZGluZz1cImxhenlcIiBhbHQ9XCJmbGFnIG9mIGEgJHtuYW1lfVwiIC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveF9fYm90dG9tXCI+XG5cdFx0XHRcdFx0XHRcdDxoMyBjbGFzcz1cImJveF9fdGl0bGVcIj4ke25hbWV9PC9oMz5cblx0XHRcdFx0XHRcdFx0PHVsIGNsYXNzPVwiYm94X19pbmZvLWxpc3RcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJib3hfX2luZm8tbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImJveF9faW5mby1saXN0LWl0ZW0tLWJvbGRcIj5Qb3B1bGFpdG9uOjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdCR7cG9wdWxhdGlvbn1cblx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cImJveF9faW5mby1saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYm94X19pbmZvLWxpc3QtaXRlbS0tYm9sZFwiPlJlZ2lvbjo8L3NwYW4+IDxiPiR7cmVnaW9ufTwvYj4gXG5cdFx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJib3hfX2luZm8tbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImJveF9faW5mby1saXN0LWl0ZW0tLWJvbGRcIj5DYXBpdG9sOjwvc3Bhbj4gJHtjYXBpdGFsfVxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdDwvdWw+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRgO1xuXG5cdFx0XHRjb3VudHJpZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoY291bnRyeUVsKTtcblxuXHRcdFx0Y291bnRyeUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdFx0Y29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtY29udGFpbmVyJyk7XG5cblx0XHRcdFx0bW9kYWxDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcblxuXHRcdFx0XHRtb2RhbENvbnRhaW5lci5pbm5lckhUTUwgPSBgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsX19oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cIm1vZGFsX19idG5cIiBpZD1cImNsb3NlLW1vZGFsXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHN2Z1xuXHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdFx0XHRcdFx0XHRcdGZvY3VzYWJsZT1cImZhbHNlXCJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtcHJlZml4PVwiZmFzXCJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtaWNvbj1cImFycm93LWxlZnRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJzdmctaW5saW5lLS1mYSBmYS1hcnJvdy1sZWZ0IGZhLXctMTRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0cm9sZT1cImltZ1wiXG5cdFx0XHRcdFx0XHRcdFx0XHR4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcblx0XHRcdFx0XHRcdFx0XHRcdHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiXG5cdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHBhdGhcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZmlsbD1cImN1cnJlbnRDb2xvclwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGQ9XCJNMjU3LjUgNDQ1LjFsLTIyLjIgMjIuMmMtOS40IDkuNC0yNC42IDkuNC0zMy45IDBMNyAyNzNjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45TDIwMS40IDQ0LjdjOS40LTkuNCAyNC42LTkuNCAzMy45IDBsMjIuMiAyMi4yYzkuNSA5LjUgOS4zIDI1LS40IDM0LjNMMTM2LjYgMjE2SDQyNGMxMy4zIDAgMjQgMTAuNyAyNCAyNHYzMmMwIDEzLjMtMTAuNyAyNC0yNCAyNEgxMzYuNmwxMjAuNSAxMTQuOGM5LjggOS4zIDEwIDI0LjguNCAzNC4zelwiXG5cdFx0XHRcdFx0XHRcdFx0XHQ+PC9wYXRoPjwvc3ZnXG5cdFx0XHRcdFx0XHRcdFx0PjxzcGFuPkJhY2s8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbF9fY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbF9fbGVmdFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRcdFx0XHRcdHNyYz1cIiR7ZmxhZ31cIlxuXHRcdFx0XHRcdFx0XHRcdFx0bG9hZGluZz1cImxhenlcIlxuXHRcdFx0XHRcdFx0XHRcdFx0YWx0PVwiZmxhZyBvZiBhICR7bmFtZX1cIlxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWxfX3JpZ2h0XCI+XG5cdFx0XHRcdFx0XHRcdFx0PGgyIGNsYXNzPVwibW9kYWxfX3JpZ2h0LXRpdGxlXCI+JHtuYW1lfTwvaDI+XG5cdFx0XHRcdFx0XHRcdFx0PHVsIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWxpc3RcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cIm1vZGFsX19yaWdodC1saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHN0cm9uZz5OYXRpdmUgTmFtZTo8L3N0cm9uZz4gPHNwYW4+JHtuYXRpdmVOYW1lfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtb2RhbF9fcmlnaHQtbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+UG9wdWxhdGlvbjo8L3N0cm9uZz4gPHNwYW4+JHtwb3B1bGF0aW9ufTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtb2RhbF9fcmlnaHQtbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+UmVnaW9uOjwvc3Ryb25nPiA8c3Bhbj4ke3JlZ2lvbn08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Ryb25nPlN1YiBSZWdpb246PC9zdHJvbmc+IDxzcGFuPiR7c3VicmVnaW9ufTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtb2RhbF9fcmlnaHQtbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+Q2FwaXRhbDo8L3N0cm9uZz4gPHNwYW4+JHtjYXBpdGFsfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtb2RhbF9fcmlnaHQtbGlzdC1pdGVtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdHJvbmc+VG9wIExldmVsIERvbWFpbjo8L3N0cm9uZz4gPHNwYW4+JHt0b3BMZXZlbERvbWFpbn08L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Ryb25nPkN1cnJlbmNpZXM6PC9zdHJvbmc+IDxzcGFuPiR7Y3VycmVuY2llc308L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibW9kYWxfX3JpZ2h0LWxpc3QtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Ryb25nPkxhbmd1YWdlczo8L3N0cm9uZz4gPHNwYW4+JHtsYW5ndWFnZXN9PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbF9fcmlnaHQtYm90dG9tXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cIm1vZGFsX19yaWdodC1ib3R0b20tLXRleHRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHN0cm9uZz5Cb3JkZXIgY291bnRyaWVzOjwvc3Ryb25nPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cIm1vZGFsX19yaWdodC1ib3R0b20tYnRuXCI+RnJhbmNlPC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdGA7XG5cdFx0XHRcdC8qIGlmIChtb2RhbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID09PSAnJykge1xuXHRcdFx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XG5cdFx0XHRcdFx0bW9kYWxDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdFx0fSBlbHNlIGlmIChtb2RhbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID09PSAnZmxleCcpIHtcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xuXHRcdFx0XHRcdG1vZGFsQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHRcdFx0fSAqL1xuXG5cdFx0XHRcdGNvbnN0IG1vZGFsQmFja0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZS1tb2RhbCcpO1xuXHRcdFx0XHRtb2RhbEJhY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0XHRcdG1vZGFsQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0XHRkaXNwbGF5Q291bnRyaWVzTnVtYmVycygpO1xuXHR9KSgpO1xuXG5cdGxldCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2hJbnB1dCcpO1xuXG5cdHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZmlsdGVyU2VhcmNoKTtcblxuXHRmdW5jdGlvbiBmaWx0ZXJTZWFyY2goZSkge1xuXHRcdGxldCBpbnB1dFZhbHVlID0gZS50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKTtcblx0XHRjb25zdCBjb3VudHJpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm94Jyk7XG5cblx0XHRjb3VudHJpZXMuZm9yRWFjaCgoY291bnRyeSkgPT4ge1xuXHRcdFx0Y291bnRyeU5hbWUgPSBjb3VudHJ5XG5cdFx0XHRcdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDMnKVswXVxuXHRcdFx0XHQuaW5uZXJUZXh0LnRvVXBwZXJDYXNlKCk7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0Y291bnRyeS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpICYmXG5cdFx0XHRcdGNvdW50cnlOYW1lLmluZGV4T2YoaW5wdXRWYWx1ZSkgPiAtMVxuXHRcdFx0KSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IHJlZ2lvblNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdpb24nKTtcblxuXHRyZWdpb25TZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcblx0XHRjb25zdCByZWdpb24gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWUudG9VcHBlckNhc2UoKTtcblx0XHRjb25zdCBjb3VudHJpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm94Jyk7XG5cblx0XHRzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuXG5cdFx0Y291bnRyaWVzLmZvckVhY2goKGNvdW50cnkpID0+IHtcblx0XHRcdGNvdW50cnlSZWdpb24gPSBjb3VudHJ5XG5cdFx0XHRcdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYicpWzBdXG5cdFx0XHRcdC5pbm5lclRleHQudG9VcHBlckNhc2UoKTtcblxuXHRcdFx0aWYgKGNvdW50cnlSZWdpb24uaW5kZXhPZihyZWdpb24pID4gLTEpIHtcblx0XHRcdFx0Y291bnRyeS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHRcdFx0XHRjb3VudHJ5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdFx0fSBlbHNlIGlmIChyZWdpb24gPT09ICdBTEwnKSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdFx0Y291bnRyeS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0Y291bnRyeS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59KTtcbiJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFpTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDJwekwyMWhhVzR1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0UlFVRkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk96czdVVUZIUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPMUZCUTBFc01FTkJRVEJETEdkRFFVRm5RenRSUVVNeFJUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN1VVRkRRVHRSUVVOQkxIZEVRVUYzUkN4clFrRkJhMEk3VVVGRE1VVTdVVUZEUVN4cFJFRkJhVVFzWTBGQll6dFJRVU12UkRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEVzZVVOQlFYbERMR2xEUVVGcFF6dFJRVU14UlN4blNFRkJaMGdzYlVKQlFXMUNMRVZCUVVVN1VVRkRja2s3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRU3d5UWtGQk1rSXNNRUpCUVRCQ0xFVkJRVVU3VVVGRGRrUXNhVU5CUVdsRExHVkJRV1U3VVVGRGFFUTdVVUZEUVR0UlFVTkJPenRSUVVWQk8xRkJRMEVzYzBSQlFYTkVMQ3RFUVVFclJEczdVVUZGY2tnN1VVRkRRVHM3TzFGQlIwRTdVVUZEUVRzN096czdPenM3T3pzN08wRkRiRVpCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFVkJRVVU3TzBGQlJVWTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTVUZCU1R0QlFVTktMRWRCUVVjN1FVRkRTRHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN1FVRkRRVHRCUVVOQkxFVkJRVVU3TzBGQlJVWTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN1FVRkRRVHRCUVVOQk8wRkJRMEVzUlVGQlJUczdRVUZGUmp0QlFVTkJPMEZCUTBFc1JVRkJSVHM3UVVGRlJqczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzY1VKQlFYRkNMR2RDUVVGblFpeExRVUZMTEZOQlFWTTdRVUZEYmtRN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hKUVVGSk96dEJRVVZLTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzYlVKQlFXMUNMRXRCUVVzc2EwTkJRV3RETEV0QlFVczdRVUZETDBRN08wRkJSVUU3UVVGRFFTeG5RMEZCWjBNc1MwRkJTenRCUVVOeVF6dEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhPMEZCUTFnN1FVRkRRVHRCUVVOQkxIRkZRVUZ4UlN4UFFVRlBPMEZCUXpWRk8wRkJRMEU3UVVGRFFTeHRSVUZCYlVVN1FVRkRia1U3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1owSkJRV2RDTEV0QlFVczdRVUZEY2tJN1FVRkRRU3d3UWtGQk1FSXNTMEZCU3p0QlFVTXZRanRCUVVOQk8wRkJRMEU3UVVGRFFTeDVRMEZCZVVNc1MwRkJTenRCUVVNNVF6dEJRVU5CTzBGQlEwRXNaMFJCUVdkRUxGZEJRVmM3UVVGRE0wUTdRVUZEUVR0QlFVTkJMQ3REUVVFclF5eFhRVUZYTzBGQlF6RkVPMEZCUTBFN1FVRkRRU3d5UTBGQk1rTXNUMEZCVHp0QlFVTnNSRHRCUVVOQk8wRkJRMEVzSzBOQlFTdERMRlZCUVZVN1FVRkRla1E3UVVGRFFUdEJRVU5CTERSRFFVRTBReXhSUVVGUk8wRkJRM0JFTzBGQlEwRTdRVUZEUVN4eFJFRkJjVVFzWlVGQlpUdEJRVU53UlR0QlFVTkJPMEZCUTBFc0swTkJRU3RETEZkQlFWYzdRVUZETVVRN1FVRkRRVHRCUVVOQkxEaERRVUU0UXl4VlFVRlZPMEZCUTNoRU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEVzUzBGQlN6czdRVUZGVER0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFRDeEpRVUZKTzBGQlEwb3NSMEZCUnp0QlFVTklPenRCUVVWQk8wRkJRMEU3UVVGRFFTeEZRVUZGT3p0QlFVVkdPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzU1VGQlNUdEJRVU5LTzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVsQlFVazdRVUZEU2p0QlFVTkJPMEZCUTBFc1NVRkJTVHRCUVVOS08wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdRVUZEU0N4RlFVRkZPMEZCUTBZc1EwRkJReUlzSW1acGJHVWlPaUl4TW1Wa1l6Rm1aalkyTUdZNE1HUTRNR1E0T0M1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaUJjZEM4dklGUm9aU0J0YjJSMWJHVWdZMkZqYUdWY2JpQmNkSFpoY2lCcGJuTjBZV3hzWldSTmIyUjFiR1Z6SUQwZ2UzMDdYRzVjYmlCY2RDOHZJRlJvWlNCeVpYRjFhWEpsSUdaMWJtTjBhVzl1WEc0Z1hIUm1kVzVqZEdsdmJpQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLRzF2WkhWc1pVbGtLU0I3WEc1Y2JpQmNkRngwTHk4Z1EyaGxZMnNnYVdZZ2JXOWtkV3hsSUdseklHbHVJR05oWTJobFhHNGdYSFJjZEdsbUtHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZEtTQjdYRzRnWEhSY2RGeDBjbVYwZFhKdUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtVjRjRzl5ZEhNN1hHNGdYSFJjZEgxY2JpQmNkRngwTHk4Z1EzSmxZWFJsSUdFZ2JtVjNJRzF2WkhWc1pTQW9ZVzVrSUhCMWRDQnBkQ0JwYm5SdklIUm9aU0JqWVdOb1pTbGNiaUJjZEZ4MGRtRnlJRzF2WkhWc1pTQTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRJRDBnZTF4dUlGeDBYSFJjZEdrNklHMXZaSFZzWlVsa0xGeHVJRngwWEhSY2RHdzZJR1poYkhObExGeHVJRngwWEhSY2RHVjRjRzl5ZEhNNklIdDlYRzRnWEhSY2RIMDdYRzVjYmlCY2RGeDBMeThnUlhobFkzVjBaU0IwYUdVZ2JXOWtkV3hsSUdaMWJtTjBhVzl1WEc0Z1hIUmNkRzF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbU5oYkd3b2JXOWtkV3hsTG1WNGNHOXlkSE1zSUcxdlpIVnNaU3dnYlc5a2RXeGxMbVY0Y0c5eWRITXNJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThwTzF4dVhHNGdYSFJjZEM4dklFWnNZV2NnZEdobElHMXZaSFZzWlNCaGN5QnNiMkZrWldSY2JpQmNkRngwYlc5a2RXeGxMbXdnUFNCMGNuVmxPMXh1WEc0Z1hIUmNkQzh2SUZKbGRIVnliaUIwYUdVZ1pYaHdiM0owY3lCdlppQjBhR1VnYlc5a2RXeGxYRzRnWEhSY2RISmxkSFZ5YmlCdGIyUjFiR1V1Wlhod2IzSjBjenRjYmlCY2RIMWNibHh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaWE1nYjJKcVpXTjBJQ2hmWDNkbFluQmhZMnRmYlc5a2RXeGxjMTlmS1Z4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV0SUQwZ2JXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdVZ1kyRmphR1ZjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVZeUE5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdSbFptbHVaU0JuWlhSMFpYSWdablZ1WTNScGIyNGdabTl5SUdoaGNtMXZibmtnWlhod2IzSjBjMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWtJRDBnWm5WdVkzUnBiMjRvWlhod2IzSjBjeXdnYm1GdFpTd2daMlYwZEdWeUtTQjdYRzRnWEhSY2RHbG1LQ0ZmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG04b1pYaHdiM0owY3l3Z2JtRnRaU2twSUh0Y2JpQmNkRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dibUZ0WlN3Z2V5QmxiblZ0WlhKaFlteGxPaUIwY25WbExDQm5aWFE2SUdkbGRIUmxjaUI5S1R0Y2JpQmNkRngwZlZ4dUlGeDBmVHRjYmx4dUlGeDBMeThnWkdWbWFXNWxJRjlmWlhOTmIyUjFiR1VnYjI0Z1pYaHdiM0owYzF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV5SUQwZ1puVnVZM1JwYjI0b1pYaHdiM0owY3lrZ2UxeHVJRngwWEhScFppaDBlWEJsYjJZZ1UzbHRZbTlzSUNFOVBTQW5kVzVrWldacGJtVmtKeUFtSmlCVGVXMWliMnd1ZEc5VGRISnBibWRVWVdjcElIdGNiaUJjZEZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnVTNsdFltOXNMblJ2VTNSeWFXNW5WR0ZuTENCN0lIWmhiSFZsT2lBblRXOWtkV3hsSnlCOUtUdGNiaUJjZEZ4MGZWeHVJRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dKMTlmWlhOTmIyUjFiR1VuTENCN0lIWmhiSFZsT2lCMGNuVmxJSDBwTzF4dUlGeDBmVHRjYmx4dUlGeDBMeThnWTNKbFlYUmxJR0VnWm1GclpTQnVZVzFsYzNCaFkyVWdiMkpxWldOMFhHNGdYSFF2THlCdGIyUmxJQ1lnTVRvZ2RtRnNkV1VnYVhNZ1lTQnRiMlIxYkdVZ2FXUXNJSEpsY1hWcGNtVWdhWFJjYmlCY2RDOHZJRzF2WkdVZ0ppQXlPaUJ0WlhKblpTQmhiR3dnY0hKdmNHVnlkR2xsY3lCdlppQjJZV3gxWlNCcGJuUnZJSFJvWlNCdWMxeHVJRngwTHk4Z2JXOWtaU0FtSURRNklISmxkSFZ5YmlCMllXeDFaU0IzYUdWdUlHRnNjbVZoWkhrZ2JuTWdiMkpxWldOMFhHNGdYSFF2THlCdGIyUmxJQ1lnT0h3eE9pQmlaV2hoZG1VZ2JHbHJaU0J5WlhGMWFYSmxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuUWdQU0JtZFc1amRHbHZiaWgyWVd4MVpTd2diVzlrWlNrZ2UxeHVJRngwWEhScFppaHRiMlJsSUNZZ01Ta2dkbUZzZFdVZ1BTQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLSFpoYkhWbEtUdGNiaUJjZEZ4MGFXWW9iVzlrWlNBbUlEZ3BJSEpsZEhWeWJpQjJZV3gxWlR0Y2JpQmNkRngwYVdZb0tHMXZaR1VnSmlBMEtTQW1KaUIwZVhCbGIyWWdkbUZzZFdVZ1BUMDlJQ2R2WW1wbFkzUW5JQ1ltSUhaaGJIVmxJQ1ltSUhaaGJIVmxMbDlmWlhOTmIyUjFiR1VwSUhKbGRIVnliaUIyWVd4MVpUdGNiaUJjZEZ4MGRtRnlJRzV6SUQwZ1QySnFaV04wTG1OeVpXRjBaU2h1ZFd4c0tUdGNiaUJjZEZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXlLRzV6S1R0Y2JpQmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHNXpMQ0FuWkdWbVlYVnNkQ2NzSUhzZ1pXNTFiV1Z5WVdKc1pUb2dkSEoxWlN3Z2RtRnNkV1U2SUhaaGJIVmxJSDBwTzF4dUlGeDBYSFJwWmlodGIyUmxJQ1lnTWlBbUppQjBlWEJsYjJZZ2RtRnNkV1VnSVQwZ0ozTjBjbWx1WnljcElHWnZjaWgyWVhJZ2EyVjVJR2x1SUhaaGJIVmxLU0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1Rb2JuTXNJR3RsZVN3Z1puVnVZM1JwYjI0b2EyVjVLU0I3SUhKbGRIVnliaUIyWVd4MVpWdHJaWGxkT3lCOUxtSnBibVFvYm5Wc2JDd2dhMlY1S1NrN1hHNGdYSFJjZEhKbGRIVnliaUJ1Y3p0Y2JpQmNkSDA3WEc1Y2JpQmNkQzh2SUdkbGRFUmxabUYxYkhSRmVIQnZjblFnWm5WdVkzUnBiMjRnWm05eUlHTnZiWEJoZEdsaWFXeHBkSGtnZDJsMGFDQnViMjR0YUdGeWJXOXVlU0J0YjJSMWJHVnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtNGdQU0JtZFc1amRHbHZiaWh0YjJSMWJHVXBJSHRjYmlCY2RGeDBkbUZ5SUdkbGRIUmxjaUE5SUcxdlpIVnNaU0FtSmlCdGIyUjFiR1V1WDE5bGMwMXZaSFZzWlNBL1hHNGdYSFJjZEZ4MFpuVnVZM1JwYjI0Z1oyVjBSR1ZtWVhWc2RDZ3BJSHNnY21WMGRYSnVJRzF2WkhWc1pWc25aR1ZtWVhWc2RDZGRPeUI5SURwY2JpQmNkRngwWEhSbWRXNWpkR2x2YmlCblpYUk5iMlIxYkdWRmVIQnZjblJ6S0NrZ2V5QnlaWFIxY200Z2JXOWtkV3hsT3lCOU8xeHVJRngwWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtUW9aMlYwZEdWeUxDQW5ZU2NzSUdkbGRIUmxjaWs3WEc0Z1hIUmNkSEpsZEhWeWJpQm5aWFIwWlhJN1hHNGdYSFI5TzF4dVhHNGdYSFF2THlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd4Y2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YnlBOUlHWjFibU4wYVc5dUtHOWlhbVZqZEN3Z2NISnZjR1Z5ZEhrcElIc2djbVYwZFhKdUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbXBsWTNRc0lIQnliM0JsY25SNUtUc2dmVHRjYmx4dUlGeDBMeThnWDE5M1pXSndZV05yWDNCMVlteHBZMTl3WVhSb1gxOWNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNDQTlJRndpWENJN1hHNWNibHh1SUZ4MEx5OGdURzloWkNCbGJuUnllU0J0YjJSMWJHVWdZVzVrSUhKbGRIVnliaUJsZUhCdmNuUnpYRzRnWEhSeVpYUjFjbTRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHloZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuTWdQU0JjSWk0dmMzSmpMMnB6TDIxaGFXNHVhbk5jSWlrN1hHNGlMQ0prYjJOMWJXVnVkQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RFVDAxRGIyNTBaVzUwVEc5aFpHVmtKeXdnWm5WdVkzUnBiMjRnS0NrZ2UxeHVYSFIzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25iRzloWkNjc0lDaGxLU0E5UGlCN1hHNWNkRngwWTI5dWMzUWdjSEpsYkc5aFpDQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5NXdjbVZzYjJGa0p5azdYRzVjYmx4MFhIUndjbVZzYjJGa0xtTnNZWE56VEdsemRDNWhaR1FvSjNCeVpXeHZZV1F0Wm1sdWFYTm9aV1FuS1R0Y2JseDBmU2s3WEc1Y2JseDBZMjl1YzNRZ1luUnVVMk55YjJ4c1ZHOVViM0FnUFNCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2duWW5SdVUyTnliMnhzVkc5VWIzQW5LVHRjYmx4dVhIUnBaaUFvWW5SdVUyTnliMnhzVkc5VWIzQXBJSHRjYmx4MFhIUmlkRzVUWTNKdmJHeFViMVJ2Y0M1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUNobEtTQTlQaUI3WEc1Y2RGeDBYSFIzYVc1a2IzY3VjMk55YjJ4c1ZHOG9lMXh1WEhSY2RGeDBYSFIwYjNBNklEQXNYRzVjZEZ4MFhIUmNkR3hsWm5RNklEQXNYRzVjZEZ4MFhIUmNkR0psYUdGMmFXOXlPaUFuYzIxdmIzUm9KeXhjYmx4MFhIUmNkSDBwTzF4dVhIUmNkSDBwTzF4dVhIUjlYRzVjYmx4MGQybHVaRzkzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjNOamNtOXNiQ2NzSUNobEtTQTlQaUI3WEc1Y2RGeDBhV1lnS0dSdlkzVnRaVzUwTG1SdlkzVnRaVzUwUld4bGJXVnVkQzV6WTNKdmJHeFViM0FnUGlBd0tTQjdYRzVjZEZ4MFhIUmlkRzVUWTNKdmJHeFViMVJ2Y0M1emRIbHNaUzV2Y0dGamFYUjVJRDBnTVR0Y2JseDBYSFI5SUdWc2MyVWdlMXh1WEhSY2RGeDBZblJ1VTJOeWIyeHNWRzlVYjNBdWMzUjViR1V1YjNCaFkybDBlU0E5SURBN1hHNWNkRngwZlZ4dVhIUjlLVHRjYmx4dVhIUmpiMjV6ZENCMGIyZG5iR1ZVYUdWdFpVSjBiaUE5SUdSdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtLQ2QwYjJkbmJHVlVhR1Z0WlVKMGJpY3BPMXh1WEc1Y2RDOHZJR1oxYm1OMGFXOXVJSFJ2SUhObGRDQmhJR2RwZG1WdUlIUm9aVzFsTDJOdmJHOXlMWE5qYUdWdFpWeHVYSFJtZFc1amRHbHZiaUJ6WlhSVWFHVnRaU2gwYUdWdFpVNWhiV1VwSUh0Y2JseDBYSFJzYjJOaGJGTjBiM0poWjJVdWMyVjBTWFJsYlNnbmRHaGxiV1VuTENCMGFHVnRaVTVoYldVcE8xeHVYSFJjZEdSdlkzVnRaVzUwTG1SdlkzVnRaVzUwUld4bGJXVnVkQzVqYkdGemMwNWhiV1VnUFNCMGFHVnRaVTVoYldVN1hHNWNkSDFjYmx4dVhIUXZMeUJtZFc1amRHbHZiaUIwYnlCMGIyZG5iR1VnWW1WMGQyVmxiaUJzYVdkb2RDQmhibVFnWkdGeWF5QjBhR1Z0WlZ4dVhIUm1kVzVqZEdsdmJpQjBiMmRuYkdWVWFHVnRaU2dwSUh0Y2JseDBYSFJwWmlBb2JHOWpZV3hUZEc5eVlXZGxMbWRsZEVsMFpXMG9KM1JvWlcxbEp5a2dQVDA5SUNkMGFHVnRaUzFrWVhKckp5a2dlMXh1WEhSY2RGeDBjMlYwVkdobGJXVW9KM1JvWlcxbExXeHBaMmgwSnlrN1hHNWNkRngwWEhSMGIyZG5iR1ZVYUdWdFpVSjBiaTVwYm01bGNsUmxlSFFnUFNBblJHRnlheUJOYjJSbEp6dGNibHgwWEhSOUlHVnNjMlVnZTF4dVhIUmNkRngwYzJWMFZHaGxiV1VvSjNSb1pXMWxMV1JoY21zbktUdGNibHgwWEhSY2RIUnZaMmRzWlZSb1pXMWxRblJ1TG1sdWJtVnlWR1Y0ZENBOUlDZE1hV2RvZENCTmIyUmxKenRjYmx4MFhIUjlYRzVjZEgxY2JseHVYSFF2THlCSmJXMWxaR2xoZEdWc2VTQnBiblp2YTJWa0lHWjFibU4wYVc5dUlIUnZJSE5sZENCMGFHVWdkR2hsYldVZ2IyNGdhVzVwZEdsaGJDQnNiMkZrWEc1Y2RDaG1kVzVqZEdsdmJpQW9LU0I3WEc1Y2RGeDBhV1lnS0d4dlkyRnNVM1J2Y21GblpTNW5aWFJKZEdWdEtDZDBhR1Z0WlNjcElEMDlQU0FuZEdobGJXVXRaR0Z5YXljcElIdGNibHgwWEhSY2RITmxkRlJvWlcxbEtDZDBhR1Z0WlMxa1lYSnJKeWs3WEc1Y2RGeDBYSFIwYjJkbmJHVlVhR1Z0WlVKMGJpNXBibTVsY2xSbGVIUWdQU0FuVEdsbmFIUWdUVzlrWlNjN1hHNWNkRngwZlNCbGJITmxJSHRjYmx4MFhIUmNkSE5sZEZSb1pXMWxLQ2QwYUdWdFpTMXNhV2RvZENjcE8xeHVYSFJjZEZ4MGRHOW5aMnhsVkdobGJXVkNkRzR1YVc1dVpYSlVaWGgwSUQwZ0owUmhjbXNnVFc5a1pTYzdYRzVjZEZ4MGZWeHVYSFI5S1NncE8xeHVYRzVjZEhSdloyZHNaVlJvWlcxbFFuUnVMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMk5zYVdOckp5d2dLR1VwSUQwK0lIdGNibHgwWEhSMGIyZG5iR1ZVYUdWdFpTZ3BPMXh1WEhSOUtUdGNibHh1WEhSamIyNXpkQ0JqYjNWdWRISnBaWE5WY213Z1BTQW5hSFIwY0hNNkx5OXlaWE4wWTI5MWJuUnlhV1Z6TG1WMUwzSmxjM1F2ZGpJdllXeHNKenRjYmx4dVhIUm1kVzVqZEdsdmJpQm5aWFJEYjNWdWRISnBaWE5FWVhSaEtDa2dlMXh1WEhSY2RISmxkSFZ5YmlCdVpYY2dVSEp2YldselpTZ29jbVZ6YjJ4MlpTd2djbVZxWldOMEtTQTlQaUI3WEc1Y2RGeDBYSFJtWlhSamFDaGpiM1Z1ZEhKcFpYTlZjbXdwWEc1Y2RGeDBYSFJjZEM1MGFHVnVLQ2h5WlhOd0tTQTlQaUI3WEc1Y2RGeDBYSFJjZEZ4MGFXWWdLQ0Z5WlhOd0xtOXJLU0I3WEc1Y2RGeDBYSFJjZEZ4MFhIUjBhSEp2ZHlCRmNuSnZjaWhnSkh0eVpYTndMbk4wWVhSMWMxUmxlSFI5SUMwZ0pIdHlaWE53TG5WeWJIMWdLVHRjYmx4MFhIUmNkRngwWEhSOVhHNWNkRngwWEhSY2RGeDBjbVYwZFhKdUlISmxjM0F1YW5OdmJpZ3BPMXh1WEhSY2RGeDBYSFI5S1Z4dVhIUmNkRngwWEhRdWRHaGxiaWdvWkdGMFlTa2dQVDRnY21WemIyeDJaU2hrWVhSaEtTbGNibHgwWEhSY2RGeDBMbU5oZEdOb0tDaGxjbklwSUQwK0lISmxhbVZqZENobGNuSXBLVHRjYmx4MFhIUjlLVHRjYmx4MGZWeHVYRzVjZEdGemVXNWpJR1oxYm1OMGFXOXVJR1JwYzNCc1lYbERiM1Z1ZEhKcFpYTk9kVzFpWlhKektDa2dlMXh1WEhSY2RHTnZibk4wSUdOdmRXNTBjbWxsYzBOdmJuUmhhVzVsY2lBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0NkamIzVnVkSEpwWlhORGIyNTBZV2x1WlhJbktUdGNibHgwWEhSamIyNXpkQ0JqYjNWdWRISnBaWE5NYVhOMElEMGdZWGRoYVhRZ1oyVjBRMjkxYm5SeWFXVnpSR0YwWVNncE8xeHVYRzVjZEZ4MFkyOTFiblJ5YVdWelRHbHpkQzVtYjNKRllXTm9LQ2hqYjNWdWRISjVLU0E5UGlCN1hHNWNkRngwWEhSamIyNXpkQ0I3WEc1Y2RGeDBYSFJjZEc1aGJXVXNYRzVjZEZ4MFhIUmNkSEJ2Y0hWc1lYUnBiMjRzWEc1Y2RGeDBYSFJjZEhKbFoybHZiaXhjYmx4MFhIUmNkRngwWTJGd2FYUmhiQ3hjYmx4MFhIUmNkRngwWm14aFp5eGNibHgwWEhSY2RGeDBibUYwYVhabFRtRnRaU3hjYmx4MFhIUmNkRngwYzNWaWNtVm5hVzl1TEZ4dVhIUmNkRngwWEhSMGIzQk1aWFpsYkVSdmJXRnBiaXhjYmx4MFhIUmNkRngwWTNWeWNtVnVZMmxsY3l4Y2JseDBYSFJjZEZ4MGJHRnVaM1ZoWjJWekxGeHVYSFJjZEZ4MGZTQTlJR052ZFc1MGNuazdYRzVjYmx4MFhIUmNkR3hsZENCamIzVnVkSEo1Uld3Z1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0Nka2FYWW5LVHRjYmx4MFhIUmNkR052ZFc1MGNubEZiQzVqYkdGemMweHBjM1F1WVdSa0tDZGliM2duS1R0Y2JseDBYSFJjZEdOdmRXNTBjbmxGYkM1amJHRnpjMHhwYzNRdVlXUmtLQ2RoWTNScGRtVW5LVHRjYmx4dVhIUmNkRngwWTI5MWJuUnllVVZzTG1sdWJtVnlTRlJOVENBOUlHQmNibHgwWEhSY2RGeDBYSFJjZER4a2FYWWdZMnhoYzNNOVhDSmliM2hmWDNSdmNGd2lQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUThhVzFuSUhOeVl6MWNJaVI3Wm14aFozMWNJaUJzYjJGa2FXNW5QVndpYkdGNmVWd2lJR0ZzZEQxY0ltWnNZV2NnYjJZZ1lTQWtlMjVoYldWOVhDSWdMejVjYmx4MFhIUmNkRngwWEhSY2REd3ZaR2wyUGx4dVhHNWNkRngwWEhSY2RGeDBYSFE4WkdsMklHTnNZWE56UFZ3aVltOTRYMTlpYjNSMGIyMWNJajVjYmx4MFhIUmNkRngwWEhSY2RGeDBQR2d6SUdOc1lYTnpQVndpWW05NFgxOTBhWFJzWlZ3aVBpUjdibUZ0WlgwOEwyZ3pQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUThkV3dnWTJ4aGMzTTlYQ0ppYjNoZlgybHVabTh0YkdsemRGd2lQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHhzYVNCamJHRnpjejFjSW1KdmVGOWZhVzVtYnkxc2FYTjBMV2wwWlcxY0lqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHh6Y0dGdUlHTnNZWE56UFZ3aVltOTRYMTlwYm1adkxXeHBjM1F0YVhSbGJTMHRZbTlzWkZ3aVBsQnZjSFZzWVdsMGIyNDZQQzl6Y0dGdVBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBKSHR3YjNCMWJHRjBhVzl1ZlZ4dVhIUmNkRngwWEhSY2RGeDBYSFJjZER3dmJHaytYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBQR3hwSUdOc1lYTnpQVndpWW05NFgxOXBibVp2TFd4cGMzUXRhWFJsYlZ3aVBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQSE53WVc0Z1kyeGhjM005WENKaWIzaGZYMmx1Wm04dGJHbHpkQzFwZEdWdExTMWliMnhrWENJK1VtVm5hVzl1T2p3dmMzQmhiajRnUEdJK0pIdHlaV2RwYjI1OVBDOWlQaUJjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFE4TDJ4cFBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2REeHNhU0JqYkdGemN6MWNJbUp2ZUY5ZmFXNW1ieTFzYVhOMExXbDBaVzFjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REeHpjR0Z1SUdOc1lYTnpQVndpWW05NFgxOXBibVp2TFd4cGMzUXRhWFJsYlMwdFltOXNaRndpUGtOaGNHbDBiMnc2UEM5emNHRnVQaUFrZTJOaGNHbDBZV3g5WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwUEM5c2FUNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFBDOTFiRDVjYmx4MFhIUmNkRngwWEhSY2REd3ZaR2wyUGx4dVhIUmNkRngwWEhSY2RHQTdYRzVjYmx4MFhIUmNkR052ZFc1MGNtbGxjME52Ym5SaGFXNWxjaTVoY0hCbGJtUkRhR2xzWkNoamIzVnVkSEo1Uld3cE8xeHVYRzVjZEZ4MFhIUmpiM1Z1ZEhKNVJXd3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25ZMnhwWTJzbkxDQW9aU2tnUFQ0Z2UxeHVYSFJjZEZ4MFhIUmpiMjV6ZENCdGIyUmhiRU52Ym5SaGFXNWxjaUE5SUdSdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtLQ2R0YjJSaGJDMWpiMjUwWVdsdVpYSW5LVHRjYmx4dVhIUmNkRngwWEhSdGIyUmhiRU52Ym5SaGFXNWxjaTV6ZEhsc1pTNWthWE53YkdGNUlEMGdKMlpzWlhnbk8xeHVYRzVjZEZ4MFhIUmNkRzF2WkdGc1EyOXVkR0ZwYm1WeUxtbHVibVZ5U0ZSTlRDQTlJR0JjYmx4MFhIUmNkRngwUEdScGRpQmpiR0Z6Y3oxY0ltMXZaR0ZzWENJK1hHNWNkRngwWEhSY2RGeDBYSFE4WkdsMklHTnNZWE56UFZ3aWJXOWtZV3hmWDJobFlXUmxjbHdpUGx4dVhIUmNkRngwWEhSY2RGeDBYSFE4WW5WMGRHOXVJR05zWVhOelBWd2liVzlrWVd4ZlgySjBibHdpSUdsa1BWd2lZMnh2YzJVdGJXOWtZV3hjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhROGMzWm5YRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFJoY21saExXaHBaR1JsYmoxY0luUnlkV1ZjSWx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFptOWpkWE5oWW14bFBWd2labUZzYzJWY0lseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBaR0YwWVMxd2NtVm1hWGc5WENKbVlYTmNJbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwWkdGMFlTMXBZMjl1UFZ3aVlYSnliM2N0YkdWbWRGd2lYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFJqYkdGemN6MWNJbk4yWnkxcGJteHBibVV0TFdaaElHWmhMV0Z5Y205M0xXeGxablFnWm1FdGR5MHhORndpWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSeWIyeGxQVndpYVcxblhDSmNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkSGh0Ykc1elBWd2lhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtZGNJbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwZG1sbGQwSnZlRDFjSWpBZ01DQTBORGdnTlRFeVhDSmNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUStYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFE4Y0dGMGFGeHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFJtYVd4c1BWd2lZM1Z5Y21WdWRFTnZiRzl5WENKY2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBaRDFjSWsweU5UY3VOU0EwTkRVdU1Xd3RNakl1TWlBeU1pNHlZeTA1TGpRZ09TNDBMVEkwTGpZZ09TNDBMVE16TGprZ01FdzNJREkzTTJNdE9TNDBMVGt1TkMwNUxqUXRNalF1TmlBd0xUTXpMamxNTWpBeExqUWdORFF1TjJNNUxqUXRPUzQwSURJMExqWXRPUzQwSURNekxqa2dNR3d5TWk0eUlESXlMakpqT1M0MUlEa3VOU0E1TGpNZ01qVXRMalFnTXpRdU0wd3hNell1TmlBeU1UWklOREkwWXpFekxqTWdNQ0F5TkNBeE1DNDNJREkwSURJMGRqTXlZekFnTVRNdU15MHhNQzQzSURJMExUSTBJREkwU0RFek5pNDJiREV5TUM0MUlERXhOQzQ0WXprdU9DQTVMak1nTVRBZ01qUXVPQzQwSURNMExqTjZYQ0pjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZEQ0OEwzQmhkR2crUEM5emRtZGNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUStQSE53WVc0K1FtRmphend2YzNCaGJqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFBDOWlkWFIwYjI0K1hHNWNkRngwWEhSY2RGeDBYSFE4TDJScGRqNWNibHh1WEhSY2RGeDBYSFJjZEZ4MFBHUnBkaUJqYkdGemN6MWNJbTF2WkdGc1gxOWpiMjUwWVdsdVpYSmNJajVjYmx4MFhIUmNkRngwWEhSY2RGeDBQR1JwZGlCamJHRnpjejFjSW0xdlpHRnNYMTlzWldaMFhDSStYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBQR2x0WjF4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MGMzSmpQVndpSkh0bWJHRm5mVndpWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSc2IyRmthVzVuUFZ3aWJHRjZlVndpWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSaGJIUTlYQ0ptYkdGbklHOW1JR0VnSkh0dVlXMWxmVndpWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwTHo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwUEM5a2FYWStYRzVjZEZ4MFhIUmNkRngwWEhSY2REeGthWFlnWTJ4aGMzTTlYQ0p0YjJSaGJGOWZjbWxuYUhSY0lqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUThhRElnWTJ4aGMzTTlYQ0p0YjJSaGJGOWZjbWxuYUhRdGRHbDBiR1ZjSWo0a2UyNWhiV1Y5UEM5b01qNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUThkV3dnWTJ4aGMzTTlYQ0p0YjJSaGJGOWZjbWxuYUhRdGJHbHpkRndpUGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBHeHBJR05zWVhOelBWd2liVzlrWVd4ZlgzSnBaMmgwTFd4cGMzUXRhWFJsYlZ3aVBseHVYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFE4YzNSeWIyNW5QazVoZEdsMlpTQk9ZVzFsT2p3dmMzUnliMjVuUGlBOGMzQmhiajRrZTI1aGRHbDJaVTVoYldWOVBDOXpjR0Z1UGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBDOXNhVDVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER4c2FTQmpiR0Z6Y3oxY0ltMXZaR0ZzWDE5eWFXZG9kQzFzYVhOMExXbDBaVzFjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQSE4wY205dVp6NVFiM0IxYkdGMGFXOXVPand2YzNSeWIyNW5QaUE4YzNCaGJqNGtlM0J2Y0hWc1lYUnBiMjU5UEM5emNHRnVQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwUEM5c2FUNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHhzYVNCamJHRnpjejFjSW0xdlpHRnNYMTl5YVdkb2RDMXNhWE4wTFdsMFpXMWNJajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBITjBjbTl1Wno1U1pXZHBiMjQ2UEM5emRISnZibWMrSUR4emNHRnVQaVI3Y21WbmFXOXVmVHd2YzNCaGJqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHd2YkdrK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUThiR2tnWTJ4aGMzTTlYQ0p0YjJSaGJGOWZjbWxuYUhRdGJHbHpkQzFwZEdWdFhDSStYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER4emRISnZibWMrVTNWaUlGSmxaMmx2YmpvOEwzTjBjbTl1Wno0Z1BITndZVzQrSkh0emRXSnlaV2RwYjI1OVBDOXpjR0Z1UGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBDOXNhVDVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER4c2FTQmpiR0Z6Y3oxY0ltMXZaR0ZzWDE5eWFXZG9kQzFzYVhOMExXbDBaVzFjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQSE4wY205dVp6NURZWEJwZEdGc09qd3ZjM1J5YjI1blBpQThjM0JoYmo0a2UyTmhjR2wwWVd4OVBDOXpjR0Z1UGx4dVhIUmNkRngwWEhSY2RGeDBYSFJjZEZ4MFBDOXNhVDVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER4c2FTQmpiR0Z6Y3oxY0ltMXZaR0ZzWDE5eWFXZG9kQzFzYVhOMExXbDBaVzFjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeDBQSE4wY205dVp6NVViM0FnVEdWMlpXd2dSRzl0WVdsdU9qd3ZjM1J5YjI1blBpQThjM0JoYmo0a2UzUnZjRXhsZG1Wc1JHOXRZV2x1ZlR3dmMzQmhiajVjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER3dmJHaytYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFE4YkdrZ1kyeGhjM005WENKdGIyUmhiRjlmY21sbmFIUXRiR2x6ZEMxcGRHVnRYQ0krWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REeHpkSEp2Ym1jK1EzVnljbVZ1WTJsbGN6bzhMM04wY205dVp6NGdQSE53WVc0K0pIdGpkWEp5Wlc1amFXVnpmVHd2YzNCaGJqNWNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHd2YkdrK1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFhIUThiR2tnWTJ4aGMzTTlYQ0p0YjJSaGJGOWZjbWxuYUhRdGJHbHpkQzFwZEdWdFhDSStYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFJjZER4emRISnZibWMrVEdGdVozVmhaMlZ6T2p3dmMzUnliMjVuUGlBOGMzQmhiajRrZTJ4aGJtZDFZV2RsYzMwOEwzTndZVzQrWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROEwyeHBQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRHd2ZFd3K1hHNWNkRngwWEhSY2RGeDBYSFJjZEZ4MFBHUnBkaUJqYkdGemN6MWNJbTF2WkdGc1gxOXlhV2RvZEMxaWIzUjBiMjFjSWo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhSY2REeHdJR05zWVhOelBWd2liVzlrWVd4ZlgzSnBaMmgwTFdKdmRIUnZiUzB0ZEdWNGRGd2lQbHh1WEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROGMzUnliMjVuUGtKdmNtUmxjaUJqYjNWdWRISnBaWE02UEM5emRISnZibWMrWEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhROEwzQStYRzVjZEZ4MFhIUmNkRngwWEhSY2RGeDBYSFE4WW5WMGRHOXVJR05zWVhOelBWd2liVzlrWVd4ZlgzSnBaMmgwTFdKdmRIUnZiUzFpZEc1Y0lqNUdjbUZ1WTJVOEwySjFkSFJ2Ymo1Y2JseDBYSFJjZEZ4MFhIUmNkRngwWEhROEwyUnBkajVjYmx4MFhIUmNkRngwWEhSY2RGeDBQQzlrYVhZK1hHNWNkRngwWEhSY2RGeDBYSFE4TDJScGRqNWNibHgwWEhSY2RGeDBYSFE4TDJScGRqNWNibHgwWEhSY2RGeDBZRHRjYmx4MFhIUmNkRngwTHlvZ2FXWWdLRzF2WkdGc1EyOXVkR0ZwYm1WeUxuTjBlV3hsTG1ScGMzQnNZWGtnUFQwOUlDY25LU0I3WEc1Y2RGeDBYSFJjZEZ4MFpHOWpkVzFsYm5RdVltOWtlUzV6ZEhsc1pTNXZkbVZ5Wm14dmQxa2dQU0FuYzJOeWIyeHNKenRjYmx4MFhIUmNkRngwWEhSdGIyUmhiRU52Ym5SaGFXNWxjaTV6ZEhsc1pTNWthWE53YkdGNUlEMGdKMlpzWlhnbk8xeHVYSFJjZEZ4MFhIUjlJR1ZzYzJVZ2FXWWdLRzF2WkdGc1EyOXVkR0ZwYm1WeUxuTjBlV3hsTG1ScGMzQnNZWGtnUFQwOUlDZG1iR1Y0SnlrZ2UxeHVYSFJjZEZ4MFhIUmNkR1J2WTNWdFpXNTBMbUp2WkhrdWMzUjViR1V1YjNabGNtWnNiM2RaSUQwZ0oyaHBaR1JsYmljN1hHNWNkRngwWEhSY2RGeDBiVzlrWVd4RGIyNTBZV2x1WlhJdWMzUjViR1V1WkdsemNHeGhlU0E5SUNjbk8xeHVYSFJjZEZ4MFhIUjlJQ292WEc1Y2JseDBYSFJjZEZ4MFkyOXVjM1FnYlc5a1lXeENZV05yUW5SdUlEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0oyTnNiM05sTFcxdlpHRnNKeWs3WEc1Y2RGeDBYSFJjZEcxdlpHRnNRbUZqYTBKMGJpNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lDaGxLU0E5UGlCN1hHNWNkRngwWEhSY2RGeDBiVzlrWVd4RGIyNTBZV2x1WlhJdWMzUjViR1V1WkdsemNHeGhlU0E5SUNjbk8xeHVYSFJjZEZ4MFhIUmNkR1J2WTNWdFpXNTBMbUp2WkhrdWMzUjViR1V1YjNabGNtWnNiM2RaSUQwZ0ozTmpjbTlzYkNjN1hHNWNkRngwWEhSY2RIMHBPMXh1WEhSY2RGeDBmU2s3WEc1Y2RGeDBmU2s3WEc1Y2RIMWNibHh1WEhRb1puVnVZM1JwYjI0Z0tDa2dlMXh1WEhSY2RHUnBjM0JzWVhsRGIzVnVkSEpwWlhOT2RXMWlaWEp6S0NrN1hHNWNkSDBwS0NrN1hHNWNibHgwYkdWMElITmxZWEpqYUVsdWNIVjBJRDBnWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9KM05sWVhKamFFbHVjSFYwSnlrN1hHNWNibHgwYzJWaGNtTm9TVzV3ZFhRdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmFXNXdkWFFuTENCbWFXeDBaWEpUWldGeVkyZ3BPMXh1WEc1Y2RHWjFibU4wYVc5dUlHWnBiSFJsY2xObFlYSmphQ2hsS1NCN1hHNWNkRngwYkdWMElHbHVjSFYwVm1Gc2RXVWdQU0JsTG5SaGNtZGxkQzUyWVd4MVpTNTBiMVZ3Y0dWeVEyRnpaU2dwTzF4dVhIUmNkR052Ym5OMElHTnZkVzUwY21sbGN5QTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNKQmJHd29KeTVpYjNnbktUdGNibHh1WEhSY2RHTnZkVzUwY21sbGN5NW1iM0pGWVdOb0tDaGpiM1Z1ZEhKNUtTQTlQaUI3WEc1Y2RGeDBYSFJqYjNWdWRISjVUbUZ0WlNBOUlHTnZkVzUwY25sY2JseDBYSFJjZEZ4MExtZGxkRVZzWlcxbGJuUnpRbmxVWVdkT1lXMWxLQ2RvTXljcFd6QmRYRzVjZEZ4MFhIUmNkQzVwYm01bGNsUmxlSFF1ZEc5VmNIQmxja05oYzJVb0tUdGNibHh1WEhSY2RGeDBhV1lnS0Z4dVhIUmNkRngwWEhSamIzVnVkSEo1TG1Oc1lYTnpUR2x6ZEM1amIyNTBZV2x1Y3lnbllXTjBhWFpsSnlrZ0ppWmNibHgwWEhSY2RGeDBZMjkxYm5SeWVVNWhiV1V1YVc1a1pYaFBaaWhwYm5CMWRGWmhiSFZsS1NBK0lDMHhYRzVjZEZ4MFhIUXBJSHRjYmx4MFhIUmNkRngwWTI5MWJuUnllUzV6ZEhsc1pTNWthWE53YkdGNUlEMGdKMlpzWlhnbk8xeHVYSFJjZEZ4MGZTQmxiSE5sSUh0Y2JseDBYSFJjZEZ4MFkyOTFiblJ5ZVM1emRIbHNaUzVrYVhOd2JHRjVJRDBnSjI1dmJtVW5PMXh1WEhSY2RGeDBmVnh1WEhSY2RIMHBPMXh1WEhSOVhHNWNibHgwWTI5dWMzUWdjbVZuYVc5dVUyVnNaV04wSUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvSjNKbFoybHZiaWNwTzF4dVhHNWNkSEpsWjJsdmJsTmxiR1ZqZEM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamFHRnVaMlVuTENBb1pTa2dQVDRnZTF4dVhIUmNkR052Ym5OMElISmxaMmx2YmlBOUlHVXVZM1Z5Y21WdWRGUmhjbWRsZEM1MllXeDFaUzUwYjFWd2NHVnlRMkZ6WlNncE8xeHVYSFJjZEdOdmJuTjBJR052ZFc1MGNtbGxjeUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSkJiR3dvSnk1aWIzZ25LVHRjYmx4dVhIUmNkSE5sWVhKamFFbHVjSFYwTG5aaGJIVmxJRDBnSnljN1hHNWNibHgwWEhSamIzVnVkSEpwWlhNdVptOXlSV0ZqYUNnb1kyOTFiblJ5ZVNrZ1BUNGdlMXh1WEhSY2RGeDBZMjkxYm5SeWVWSmxaMmx2YmlBOUlHTnZkVzUwY25sY2JseDBYSFJjZEZ4MExtZGxkRVZzWlcxbGJuUnpRbmxVWVdkT1lXMWxLQ2RpSnlsYk1GMWNibHgwWEhSY2RGeDBMbWx1Ym1WeVZHVjRkQzUwYjFWd2NHVnlRMkZ6WlNncE8xeHVYRzVjZEZ4MFhIUnBaaUFvWTI5MWJuUnllVkpsWjJsdmJpNXBibVJsZUU5bUtISmxaMmx2YmlrZ1BpQXRNU2tnZTF4dVhIUmNkRngwWEhSamIzVnVkSEo1TG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FuWm14bGVDYzdYRzVjZEZ4MFhIUmNkR052ZFc1MGNua3VZMnhoYzNOTWFYTjBMbUZrWkNnbllXTjBhWFpsSnlrN1hHNWNkRngwWEhSOUlHVnNjMlVnYVdZZ0tISmxaMmx2YmlBOVBUMGdKMEZNVENjcElIdGNibHgwWEhSY2RGeDBZMjkxYm5SeWVTNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0oyWnNaWGduTzF4dVhIUmNkRngwWEhSamIzVnVkSEo1TG1Oc1lYTnpUR2x6ZEM1aFpHUW9KMkZqZEdsMlpTY3BPMXh1WEhSY2RGeDBmU0JsYkhObElIdGNibHgwWEhSY2RGeDBZMjkxYm5SeWVTNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0oyNXZibVVuTzF4dVhIUmNkRngwWEhSamIzVnVkSEo1TG1Oc1lYTnpUR2x6ZEM1eVpXMXZkbVVvSjJGamRHbDJaU2NwTzF4dVhIUmNkRngwZlZ4dVhIUmNkSDBwTzF4dVhIUjlLVHRjYm4wcE8xeHVJbDBzSW5OdmRYSmpaVkp2YjNRaU9pSWlmUT09In0=
