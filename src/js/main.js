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
