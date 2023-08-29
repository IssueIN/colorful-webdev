function addRow() {
  // Create new input fields
  const newRow = document.createElement('div');
  newRow.classList.add('pricingRow');
  newRow.innerHTML = `
    <input type="number" placeholder="Quantity" name="qty[]" />
    <input type="number" placeholder="Price" name="price[]" />
    <button type="button" onclick="removeRow(this)">Remove</button>
  `;
  // Append to the table
  document.getElementById('pricingTable').appendChild(newRow);
}

function removeRow(button) {
  // Remove this row of input fields
  const row = button.parentNode;
  row.parentNode.removeChild(row);
}
