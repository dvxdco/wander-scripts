window.addEventListener('load', function () {
	if (!window.WanderTheResort) {
		window.WanderTheResort = {};
	}
	let wtr = window.WanderTheResort;

	wtr.addonRows = document.querySelectorAll('#email-form .option-list-wrapper .w-dyn-item');
	wtr.currentPage = location.href.split('/')[location.href.split('/').length-1];
	wtr.totalCount = 0;
	wtr.hasErrors = false;
	wtr.wanderAddons = localStorage.getItem('wanderAddons');
	wtr.confirmationBar = document.querySelector('.confirmation-bar');
	wtr.confirmationText = wtr.confirmationBar.querySelector('.confirmation');
	wtr.confirmationButton = wtr.confirmationBar.querySelector('.cta');

	if (!wtr.wanderAddons) {
		wtr.wanderAddons = {};
	} else {
		wtr.wanderAddons = JSON.parse(wtr.wanderAddons);
	}
	if (!wtr.wanderAddons[wtr.currentPage]) {
		wtr.wanderAddons[wtr.currentPage] = [];
	}

	wtr.updateTotalCount = () => {
		let tempCount = 0;
		Object.entries(wtr.wanderAddons).forEach(([key, value], idx) => {
			if (value.length > 0) {
				tempCount += value.filter(item => item != null).length;
			}
		});
		wtr.totalCount = tempCount;
	}
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
	wtr.updateDisplayCount = () => {
		wtr.updateErrors();
		wtr.updateTotalCount();
		wtr.confirmationText.innerText = wtr.totalCount + ' selected';
		if (wtr.hasErrors) {
			wtr.confirmationText.innerText += ' - Please ensure details are filled out for selected items';
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