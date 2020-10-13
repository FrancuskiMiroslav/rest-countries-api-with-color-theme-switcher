document.addEventListener('DOMContentLoaded', function () {
	let timer;
	let deleteFirstPhotoDelay;

	async function start() {
		try {
			const response = await fetch('https://dog.ceo/api/breeds/list/all');
			const data = await response.json();
			createBreedList(data.message);
		} catch (e) {
			console.log('There was a problem fetching the breed list.');
		}
	}

	start();

	function createBreedList(breedList) {
		document.getElementById('breed').innerHTML = `
  <select id="breeds">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList)
					.map(function (breed) {
						return `<option>${breed}</option>`;
					})
					.join('')}
      </select>
  `;

		let selectBreed = document.querySelector('#breeds');
		selectBreed.addEventListener('change', (e) => {
			async function loadByBreed() {
				if (e.target.value != 'Choose a dog breed') {
					const response = await fetch(
						`https://dog.ceo/api/breed/${e.target.value}/images`
					);
					const data = await response.json();
					createSlideshow(data.message);
				}
			}

			loadByBreed();
		});
	}

	function createSlideshow(images) {
		let currentPosition = 0;
		clearInterval(timer);
		clearTimeout(deleteFirstPhotoDelay);

		if (images.length > 1) {
			document.getElementById('slideshow').innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `;
			currentPosition += 2;
			if (images.length == 2) currentPosition = 0;
			timer = setInterval(nextSlide, 3000);
		} else {
			document.getElementById('slideshow').innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
  `;
		}

		function nextSlide() {
			document
				.getElementById('slideshow')
				.insertAdjacentHTML(
					'beforeend',
					`<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`
				);
			deleteFirstPhotoDelay = setTimeout(function () {
				document.querySelector('.slide').remove();
			}, 1000);
			if (currentPosition + 1 >= images.length) {
				currentPosition = 0;
			} else {
				currentPosition++;
			}
		}
	}
});
