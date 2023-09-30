function addRow() {
  // Create new input fields
  const pricingTable = document.getElementById('pricingTable');
  const quantity = pricingTable.getAttribute('data-quantity');
  const price = pricingTable.getAttribute('data-price');
  const remove = pricingTable.getAttribute('data-remove')

  const newRow = document.createElement('div');
  newRow.classList.add('pricingRow');
  newRow.innerHTML = `
    <input type="number" placeholder="${quantity}" name="qty[]" required/>
    <input type="number" placeholder="${price}" name="price[]" required/>
    <button type="button" onclick="removeRow(this)">${remove}</button>
  `;
  // Append to the table
  document.getElementById('pricingTable').appendChild(newRow);
}

function removeRow(button) {
  // Remove this row of input fields
  const row = button.parentNode;
  row.parentNode.removeChild(row);
}
