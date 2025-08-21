document.addEventListener('DOMContentLoaded', () => {
  const headerTarget = document.getElementById('header-placeholder');
  let headerFilePath = 'fragments/header.html';
  isIndex = window.location.pathname.includes("index");
  if(!isIndex) headerFilePath = '../fragments/header.html';

  if (headerTarget) {
    fetch(headerFilePath)
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
              window.location.href = `/src/main/resources/static/pages/searchResults.html?q=${encodeURIComponent(query)}`;
            }
          });
        }
      });
  }
});