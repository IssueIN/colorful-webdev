document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('input[name="search"]');
  const searchButton = document.querySelector('#search-button');
  
  searchButton.disabled = !searchInput.value.trim();
  
  searchInput.addEventListener('input', function() {
    searchButton.disabled = !this.value.trim();
  });
});
