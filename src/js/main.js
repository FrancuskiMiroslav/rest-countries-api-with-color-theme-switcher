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

	const modalContainer = document.getElementById('modal-container');
	const modalBackBtn = document.getElementById('close-modal');

	console.log(modalContainer.style.display == 'none');

	/* if (modalContainer.style.display !== 'none') {
		document.body.style.overflowY = 'scroll';
	} else {
		document.body.style.overflowY = 'hidden';
	} */

	modalBackBtn.addEventListener('click', (e) => {
		modalContainer.style.display = 'none';
		document.body.style.overflow = 'scroll';
	});
});
