// wait until window loads before making our changes
window.addEventListener('load', function () {
	// establish namespace and shortcut
	if (!window.WanderTheResort) {
		window.WanderTheResort = {};
	}
	let wtr = window.WanderTheResort;

	wtr.addonRows = document.querySelectorAll('#email-form .option-list-wrapper .w-dyn-item');
	wtr.currentPage = location.href.split('/')[location.href.split('/').length-1];
	wtr.totalCount = 0;
	wtr.hasErrors = false;
	// cross page "cart" persistence
	wtr.wanderAddons = localStorage.getItem('wanderAddons');
	wtr.confirmationBar = document.querySelector('.confirmation-bar');
	wtr.confirmationText = wtr.confirmationBar.querySelector('.confirmation');
	wtr.confirmationButton = wtr.confirmationBar.querySelector('.cta');

	// parse or reset localstorage
	if (!wtr.wanderAddons) {
		wtr.wanderAddons = {};
	} else {
		wtr.wanderAddons = JSON.parse(wtr.wanderAddons);
	}
	if (!wtr.wanderAddons[wtr.currentPage]) {
		wtr.wanderAddons[wtr.currentPage] = [];
	}

	// count number of distinct items, ignores quantity
	wtr.updateTotalCount = () => {
		let tempCount = 0;
		Object.entries(wtr.wanderAddons).forEach(([key, value], idx) => {
			if (value.length > 0) {
				tempCount += value.filter(item => item != null).length;
			}
		});
		wtr.totalCount = tempCount;
	}

	// check for errors
	wtr.updateErrors = () => {
		let tempErrors = false;
		Object.entries(wtr.wanderAddons).forEach(([key, value], idx) => {
			value.forEach((v,i) => {
				if (v && v.error) {
					tempErrors = true;
				}
			});
		});
		wtr.hasErrors = tempErrors;
	}

	// update confirmation bar with newest information
	wtr.updateDisplayCount = () => {
		wtr.updateErrors();
		wtr.updateTotalCount();
		wtr.confirmationText.innerText = wtr.totalCount + ' selected';
		if (wtr.hasErrors) {
			wtr.confirmationText.innerText += ' - Complete all details on your selection to proceed';
			wtr.confirmationButton.classList.add('hidden');
		} else if (wtr.totalCount > 0) {
			wtr.confirmationButton.classList.remove('hidden');
		}
		if (wtr.totalCount > 0) {
			wtr.confirmationBar.style.opacity = 1;
			wtr.confirmationBar.style.display = 'flex'
		} else {
			wtr.confirmationBar.style.opacity = 0;
			wtr.confirmationBar.style.display = 'none'
		}
	}

	// remove unwanted option tags from select, ignores first item because empty value/decorative
	wtr.trimSelectOptions = (select, length = 4) => {
		let selectOptions = select.querySelectorAll('option');
		let optionsLength = selectOptions.length;
		for(let i = 1; i < optionsLength; i++) {
			if (i > length) {
				selectOptions[i].remove();
			}
		}
	}

	wtr.updateDisplayCount();

}, false);