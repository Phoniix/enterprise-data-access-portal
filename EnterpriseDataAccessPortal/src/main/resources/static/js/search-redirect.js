document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');

  if (form && input) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // prevent default form reload
      const query = input.value.trim();
      if (query) {
        window.location.href = `/templates/searchResults.html?q=${encodeURIComponent(query)}`;
      }
    });
  }
});