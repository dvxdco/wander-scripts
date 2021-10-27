window.addEventListener('load', function () {
	if (!window.WanderTheResort) {
		window.WanderTheResort = {};
	}
	let wtr = window.WanderTheResort;

	wtr.addonRows?.forEach((row, index) => {
		let checkbox = row.querySelector('input[type="checkbox"]');
		let dateDropdown = row.querySelector('#Item-Date-Select');
		let customizationsTextareaPlaceholder = row.querySelector('.textarea-placeholder');
		let customizationsTextarea = row.querySelector('.option-textarea');
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
				quantity: quantityDropdown.value,//#Item-Qty-Select
				date: dateDropdown.value,//#Item-Date-Select
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
		dateDropdown.min = today.getFullYear() + '-' + (today.getMonth()<10?'0':'') + today.getMonth() + '-' + (today.getDate()<10?'0':'') + today.getDate();
		
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
