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
				console.log(country);

				const { name, population, region, capital, flag } = country;

				return `
					<div class="box">
						<div class="box__top">
							<img src="${flag}" alt="flag of a ${name}" />
						</div>

						<div class="box__bottom">
							<h3 class="box__title">${name}</h3>
							<ul class="box__info-list">
								<li class="box__info-list-item">
									<span class="box__info-list-item--bold">Populaiton:</span>
									${population}
								</li>
								<li class="box__info-list-item">
									<span class="box__info-list-item--bold">Region:</span> ${region}
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
});
