document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    const apiKey = 0 //MY API KEY
    const cx = 0 //CXID
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('search-results');
            resultsDiv.innerHTML = ""; // Clears any previous search results
            if(data.items) {
                data.items.forEach(item => {
                    resultsDiv.innerHTML += 
                    `<div class="search-result">
                        <a href="${item.link}" target="_blank"><h3>${item.title}<h3></a>
                        <p>${item.snippet}</p>
                    </div>
                `;
                });
            } else {
                resultsDiv.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(error => {
            console.error('Search error: ', error);
        });
});