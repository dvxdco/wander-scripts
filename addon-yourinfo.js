window.addEventListener('load', function () {

  let wanderAddons = localStorage.getItem('wanderAddons');
  if (!wanderAddons) {
    wanderAddons = {};
  } else {
    wanderAddons = JSON.parse(wanderAddons);
  }
  let lineItemsContainer = document.querySelector('#wf-form-Addons-Form .item-summary .items');
  let detailsTextarea = document.querySelector('#wf-form-Addons-Form .item-summary #details');
  let lineItems = document.querySelectorAll('#wf-form-Addons-Form .item-summary .items .line-item');
  let clonedItem = lineItems[0].cloneNode(true);
  lineItems.forEach(lineItem => {
    lineItem.remove();
  })
  let wanderAddonsArr = Object.entries(wanderAddons);
  wanderAddonsArr = wanderAddonsArr.filter(([key, value], index) => {
    return value.length > 0;
  });
  let runningPrice = 0;
  let runningDetails = "";
  wanderAddonsArr.forEach(([key, value], index) => {
    if (value.length > 0) {
      value.forEach((addon, idx) => {
        if (addon) {
          let newClonedItem = clonedItem.cloneNode(true);
          let actualQuantity = (addon.quantity === ""?1:addon.quantity)
          newClonedItem.querySelectorAll('.p2')[0].innerText = actualQuantity + ' x ' + addon.name;
          let price = actualQuantity * addon.price;
          runningPrice += price;
          runningDetails += `${addon.quantity === ""?1:addon.quantity} x ${addon.name} - \$${price}<br />`;
          runningDetails += `${addon.date?'Date: '+addon.date+'<br />':''}`;
          runningDetails += `${addon.customizations?'Customizations:<br />'+addon.customizations:''}<br />`;
          newClonedItem.querySelectorAll('.p2')[1].innerText = "$" + price;
          if (index == 0) {
            newClonedItem.classList.toggle('first');
          }
          if (index == (wanderAddonsArr.length - 1) && idx == (value.length - 1)) {
            newClonedItem.classList.toggle('last');
          }
          lineItemsContainer.append(newClonedItem);
        }
      });
    }
  });
  let taxAmount = runningPrice * 0.13;
  let subTotalClonedItem = clonedItem.cloneNode(true);
  subTotalClonedItem.querySelectorAll('.p2')[0].innerText = "Sub-Total";
  subTotalClonedItem.querySelectorAll('.p2')[1].innerText = "$" + runningPrice;
  subTotalClonedItem.classList.toggle('subtotal');
  lineItemsContainer.append(subTotalClonedItem);

  let taxClonedItem = clonedItem.cloneNode(true);
  taxClonedItem.querySelectorAll('.p2')[0].innerText = "HST";
  taxClonedItem.querySelectorAll('.p2')[1].innerText = "$" + taxAmount.toFixed(2);
  taxClonedItem.classList.toggle('hst');
  lineItemsContainer.append(taxClonedItem);

  let totalClonedItem = clonedItem.cloneNode(true);
  totalClonedItem.querySelectorAll('.p2')[0].innerText = "Total";
  totalClonedItem.querySelectorAll('.p2')[1].innerText = "$" + (runningPrice + taxAmount).toFixed(2);
  totalClonedItem.classList.toggle('total');
  lineItemsContainer.append(totalClonedItem);

  runningDetails += `—<br />Sub-Total: \$${runningPrice}<br />HST: \$${taxAmount.toFixed(2)}<br />—<br /><strong>Total: \$${(runningPrice + taxAmount).toFixed(2)}</strong>`;
  detailsTextarea.value = runningDetails;

  // clear localstorage
  let submitButton = document.querySelector('#wf-form-Addons-Form #submit');
  submitButton.addEventListener('click', e => {
    localStorage.removeItem('wanderAddons');
  });
}, false);
