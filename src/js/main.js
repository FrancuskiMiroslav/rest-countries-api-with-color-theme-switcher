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
});
