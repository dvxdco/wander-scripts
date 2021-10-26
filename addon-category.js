window.addEventListener('load', function () {
	addonRows.forEach((row, index) => {
		const updateValue = () => {
			wanderAddons[currentPage][index] = {
				quantity: quantityDropdown.value,//#Item-Qty-Select
				date: dateDropdown.value,//#Item-Date-Select
				name: itemName.innerText,
				price: itemPrice.innerText,
				customizations: '',
				error: false
			};
		}
		const clearValue = () => {
			wanderAddons[currentPage][index] = null;
		}

		const refreshStorage = (decider) => {
			if (decider) {
				updateValue();
			} else {
				clearValue();
			}
			localStorage.setItem('wanderAddons', JSON.stringify(wanderAddons));
			updateDisplayCount();
		}

		let checkbox = row.querySelector('input[type="checkbox"]');
		let dateDropdown = row.querySelector('#Item-Date-Select');
		let itemName = row.querySelectorAll('.item-pricing .p2')[0];
		let itemPrice = row.querySelectorAll('.item-pricing .p2')[2];
		let quantityDropdown = row.querySelector('#Item-Qty-Select');
		if (itemName.innerText == "Cabana Rental") {
			trimSelectOptions(quantityDropdown, 2);
		} else if (itemName.innerText == "Hygge Hut Rental") {
			trimSelectOptions(quantityDropdown, 3);
		} else if (currentPage == "breakfast-boxes") {
			trimSelectOptions(quantityDropdown, 6);
		} else if (itemName.innerText == "Freshly Baked Croissant") {
			trimSelectOptions(quantityDropdown, 10);
		} else {
			trimSelectOptions(quantityDropdown);
		}

		let today = new Date();
		dateDropdown.min = today.getFullYear() + '-' + (today.getMonth()<10?'0':'') + today.getMonth() + '-' + (today.getDate()<10?'0':'') + today.getDate();

		if (wanderAddons[currentPage][index]) {
			if (checkbox.checked) {
				checkbox.checked = false;
			}
			checkbox.click();
			quantityDropdown.value = wanderAddons[currentPage][index].quantity;
			dateDropdown.value = wanderAddons[currentPage][index].date;
			updateDisplayCount();
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
	});
}, false);