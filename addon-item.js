// wait until window loads before making our changes
window.addEventListener('load', function () {
	// establish namespace and shortcut
	if (!window.WanderTheResort) {
		window.WanderTheResort = {};
	}
	let wtr = window.WanderTheResort;

	// iterate through rows
	wtr.addonRows?.forEach((row, index) => {
		let checkbox = row.querySelector('input[type="checkbox"]');
		let dateDropdown = row.querySelector('#Item-Date-Select');
		let dateStart = row.querySelector('.addon-date-start')?.innerText;
		let dateLimit = row.querySelector('.addon-date-limit')?.innerText;
		let customizationsTextarea = row.querySelector('.option-textarea');
		if (!customizationsTextarea) {
			customizationsTextarea = row.querySelector('.option-selections textarea');
		}
		let customizationsTextareaPlaceholder = row.querySelector('.textarea-placeholder');
		let customizationsTextareaActive = !customizationsTextarea.parentElement.classList.contains('w-condition-invisible')
		let itemName = row.querySelectorAll('.option-pricing .p2')[0];
		let itemPrice = row.querySelectorAll('.option-pricing .p2')[2];
		let quantityDropdown = row.querySelector('#Item-Qty-Select');
		let today = new Date();

		if (customizationsTextarea && customizationsTextareaPlaceholder) {
			customizationsTextarea.placeholder = customizationsTextareaPlaceholder.innerText;
		}

		const updateValue = () => {
			wtr.wanderAddons[wtr.currentPage][index] = {
				quantity: quantityDropdown.value,
				date: dateDropdown.value,
				name: itemName.innerText,
				price: itemPrice.innerText,
				customizations: customizationsTextarea.value,
				error: customizationsTextareaActive && customizationsTextarea.value === ''
			};
		}

		const clearValue = () => {
			wtr.wanderAddons[wtr.currentPage][index] = null;
		}

		const refreshStorage = (decider) => {
			if (decider) {
				updateValue();
			} else {
				clearValue();
			}
			localStorage.setItem('wanderAddons', JSON.stringify(wtr.wanderAddons));
			wtr.updateDisplayCount();
		}

		// trim select dropdowns to particular lengths for specific cases, all others to default
		if (itemName.innerText == "Cabana Rental") {
			wtr.trimSelectOptions(quantityDropdown, 2);
		} else if (itemName.innerText == "Hygge Hut Rental") {
			wtr.trimSelectOptions(quantityDropdown, 3);
		} else if (wtr.currentPage == "breakfast-boxes") {
			wtr.trimSelectOptions(quantityDropdown, 6);
		} else if (itemName.innerText == "Freshly Baked Croissant") {
			wtr.trimSelectOptions(quantityDropdown, 10);
		} else {
			wtr.trimSelectOptions(quantityDropdown);
		}

		// set minimum date, if available, or default to today
		if (dateStart) {
			dateDropdown.min = dateStart;
		} else {
			let month = today.getMonth() + 1;
			dateDropdown.min = today.getFullYear() + '-' + (month<10?'0':'') + month + '-' + (today.getDate()<10?'0':'') + today.getDate();
		}

		// set maximum date, if available
		if (dateLimit) {
			dateDropdown.max = dateLimit;
		}

		// update element to reflect localstorage
		if (wtr.wanderAddons[wtr.currentPage][index]) {
			if (checkbox.checked) {
				checkbox.checked = false;
			}
			checkbox.click();
			quantityDropdown.value = wtr.wanderAddons[wtr.currentPage][index].quantity;
			dateDropdown.value = wtr.wanderAddons[wtr.currentPage][index].date;
			customizationsTextarea.value = wtr.wanderAddons[wtr.currentPage][index].customizations;
			wtr.updateDisplayCount();
		}

		// listen for changes and update localstorage accordingly
		checkbox.addEventListener('change', e => {
			refreshStorage(e.srcElement.checked);
		});
		quantityDropdown.addEventListener('change', e => {
			refreshStorage(checkbox.checked);
		});
		dateDropdown.addEventListener('change', e => {
			refreshStorage(checkbox.checked);
		});
		customizationsTextarea.addEventListener('blur', e => {
			refreshStorage(checkbox.checked);
		});
	});
}, false);
