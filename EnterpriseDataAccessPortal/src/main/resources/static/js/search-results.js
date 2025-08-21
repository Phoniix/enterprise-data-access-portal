// Function to get params from searchResults.html url
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Same page Google API form submission/return logic.
document.addEventListener("DOMContentLoaded", function () {
  const query = getQueryParam("q");

  const resultsDiv = document.getElementById("search-results");

  const queryTextSpan = document.getElementById("search-query-text");

  if (queryTextSpan && query) {
    queryTextSpan.textContent = query;
  }
  
  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a valid, searchable value.</p>";
    return;
  }

  // Removed e.preventDefault() since it's not inside an event handler

  const apiKey = "AIzaSyDj1Xa36zYffFmyhzsWJuzQj9-cmsUJ4dk"; //MY API KEY
  const cx = "64f1378da13c24fb4"; //CXID
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(
    query
  )}`;

  // Fetch / Catch
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resultsDiv.innerHTML = ""; // Clears any previous search results
      if (data.items && data.items.length > 0) {

        data.items.forEach((item) => {
          // Leave this here to show the items we are getting, unless performance tanks
          console.log(item);
          resultsDiv.innerHTML += 
                    `<div class="search-result">
                        <a href="${item.link}" target="_blank" rel="noopener noreferrer"><h3>${item.title}</h3></a>
                        <p>${item.snippet}</p>
                    </div>
                `;
        });

      } else {
        resultsDiv.innerHTML = "<p>No results found.</p>";
      }
    })
    .catch((error) => {
      console.error("Search error: ", error);
      resultsDiv.innerHTML =
        "<p>There was an error loading search results. Please try again later.</p>";
    });
});
