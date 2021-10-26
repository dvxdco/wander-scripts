window.addEventListener('load', function () {
	let addonRows = document.querySelectorAll('#email-form .option-list-wrapper .w-dyn-item');
	let currentPage = location.href.split('/')[location.href.split('/').length-1];
	let totalCount = 0;
	let hasErrors = false;
	let wanderAddons = localStorage.getItem('wanderAddons');
	let confirmationBar = document.querySelector('.confirmation-bar');
	let confirmationText = confirmationBar.querySelector('.confirmation');
	let confirmationButton = confirmationBar.querySelector('.cta');

	if (!wanderAddons) {
		wanderAddons = {};
	} else {
		wanderAddons = JSON.parse(wanderAddons);
	}
	if (!wanderAddons[currentPage]) {
		wanderAddons[currentPage] = [];
	}

	const updateTotalCount = () => {
		let tempCount = 0;
		Object.entries(wanderAddons).forEach(([key, value], idx) => {
			if (value.length > 0) {
				tempCount += value.filter(item => item != null).length;
			}
		});
		totalCount = tempCount;
	}
	const updateErrors = () => {
		let tempErrors = false;
		Object.entries(wanderAddons).forEach(([key, value], idx) => {
			value.forEach((v,i) => {
				if (v && v.error) {
					tempErrors = true;
				}
			});
		});
		hasErrors = tempErrors;
	}
	const updateDisplayCount = () => {
		updateErrors();
		updateTotalCount();
		confirmationText.innerText = totalCount + ' selected';
		if (hasErrors) {
			confirmationText.innerText += ' - Please ensure details are filled out for selected items';
			confirmationButton.classList.add('hidden');
		} else if (totalCount > 0) {
			confirmationButton.classList.remove('hidden');
		}
		if (totalCount > 0) {
			confirmationBar.style.opacity = 1;
			confirmationBar.style.display = 'flex'
		} else {
			confirmationBar.style.opacity = 0;
			confirmationBar.style.display = 'none'
		}
	}

	const trimSelectOptions = (select, length = 4) => {
		let selectOptions = select.querySelectorAll('option');
		let optionsLength = selectOptions.length;
		for(let i = 1; i < optionsLength; i++) {
			if (i > length) {
				selectOptions[i].remove();
			}
		}
	}

	updateDisplayCount();

}, false);