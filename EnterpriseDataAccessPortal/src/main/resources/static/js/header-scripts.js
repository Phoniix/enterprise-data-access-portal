document.addEventListener('DOMContentLoaded', () => {
  const headerTarget = document.getElementById('header-placeholder');
  const filePath = 'fragments/header.html';
  const isIndex = window.location.pathname.includes('index.html');
  if(!isIndex) filePath = '../fragments/header.html';

  if (headerTarget) {
    fetch(filePath)
      .then(res => res.text())
      .then(html => {
        headerTarget.innerHTML = html;

        // Attach search submit logic after injection
        const searchForm = document.getElementById('search-form');
        if (searchForm) {
          searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = document.getElementById('search-input').value.trim();
            if (query) {
              window.location.href = `pages/searchResults.html?q=${encodeURIComponent(query)}`;
            }
          });
        }
      });
  }
});