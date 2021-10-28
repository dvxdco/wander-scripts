window.addEventListener('load', function () {
	// establish namespace and shortcut
	if (!window.WanderTheResort) {
		window.WanderTheResort = {};
	}
	let wtr = window.WanderTheResort;

	wtr.addonRows = document.querySelectorAll('#email-form .items .w-dyn-item');

	// iterate through rows
	wtr.addonRows?.forEach((row, index) => {
		let checkbox = row.querySelector('input[type="checkbox"]');
		let dateDropdown = row.querySelector('#Item-Date-Select');
		let itemName = row.querySelectorAll('.item-pricing .p2')[0];
		let itemPrice = row.querySelectorAll('.item-pricing .p2')[2];
		let quantityDropdown = row.querySelector('#Item-Qty-Select');
		let today = new Date();

		const updateValue = () => {
			wtr.wanderAddons[wtr.currentPage][index] = {
				quantity: quantityDropdown.value,
				date: dateDropdown.value,
				name: itemName.innerText,
				price: itemPrice.innerText,
				customizations: '',
				error: false
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

		// prevent choosing days before today
		dateDropdown.min = today.getFullYear() + '-' + (today.getMonth()<10?'0':'') + today.getMonth() + '-' + (today.getDate()<10?'0':'') + today.getDate();

		// update element to reflect localstorage
		if (wtr.wanderAddons[wtr.currentPage][index]) {
			if (checkbox.checked) {
				checkbox.checked = false;
			}
			checkbox.click();
			quantityDropdown.value = wtr.wanderAddons[wtr.currentPage][index].quantity;
			dateDropdown.value = wtr.wanderAddons[wtr.currentPage][index].date;
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
	});
}, false);