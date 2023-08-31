document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('input[name="search"]');
  const searchButton = document.querySelector('button[type="submit"]');
  
  searchButton.disabled = !searchInput.value.trim();
  
  searchInput.addEventListener('input', function() {
    searchButton.disabled = !this.value.trim();
  });
});
