document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("faqSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const faqPosts = document.querySelectorAll(".faq-post");

  // Search Function
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    faqPosts.forEach(post => {
      const question = post.querySelector(".faq-question").innerText.toLowerCase();
      const answer = post.querySelector(".faq-answer").innerText.toLowerCase();
      post.style.display = (question.includes(query) || answer.includes(query)) ? "block" : "none";
    });
  });

  // Filter by Category
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      faqPosts.forEach(post => {
        const postCategory = post.querySelector(".faq-category").innerText;
        post.style.display = (category === "all" || postCategory === category) ? "block" : "none";
      });
    });
  });
});
