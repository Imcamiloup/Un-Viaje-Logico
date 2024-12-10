document.addEventListener("DOMContentLoaded", function () {
  const articles = document.querySelectorAll(".tm-post");
  const articlesContainer = document.getElementById("articles-container");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pagingNav = document.getElementById("paging-nav");
  const articlesPerPage = 3;
  let currentPage = 1;
  let filteredArticles = Array.from(articles);

  function displayArticles(page) {
    articlesContainer.innerHTML = "";
    const start = (page - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const articlesToShow = filteredArticles.slice(start, end);

    articlesToShow.forEach((article) => {
      articlesContainer.appendChild(article);
    });

    updatePagination();
  }

  function updatePagination() {
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    pagingNav.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.classList.add("tm-paging-item");
      if (i === currentPage) {
        li.classList.add("active");
      }
      const a = document.createElement("a");
      a.href = "#";
      a.classList.add("mb-2", "tm-btn", "tm-paging-link");
      a.textContent = i;
      a.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = i;
        displayArticles(currentPage);
      });
      li.appendChild(a);
      pagingNav.appendChild(li);
    }

    prevBtn.classList.toggle("disabled", currentPage === 1);
    nextBtn.classList.toggle("disabled", currentPage === totalPages);
  }

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const query = searchInput.value.toLowerCase();
    filteredArticles = Array.from(articles).filter((article) => {
      const title = article
        .querySelector(".tm-post-title")
        .textContent.toLowerCase();
      return title.includes(query);
    });
    currentPage = 1;
    displayArticles(currentPage);
  });

  prevBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayArticles(currentPage);
    }
  });

  nextBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayArticles(currentPage);
    }
  });

  displayArticles(currentPage);
});
