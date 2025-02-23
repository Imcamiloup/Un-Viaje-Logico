document.addEventListener("DOMContentLoaded", () => {
  const articles = Array.from(document.querySelectorAll(".tm-post"));
  const articlesContainer = document.getElementById("articles-container");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pagingNav = document.getElementById("paging-nav");

  if (!articlesContainer || !pagingNav) {
    console.error("No se encontraron los elementos necesarios en el DOM.");
    return;
  }

  const articlesPerPage = 4;
  let currentPage = 1;
  let filteredArticles = [...articles];

  const createPagination = () => {
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = "tm-paging-item" + (i === currentPage ? " active" : "");

      const a = document.createElement("a");
      a.href = "#";
      a.className = "mb-2 tm-btn tm-paging-link";
      a.textContent = i;
      a.addEventListener("click", (event) => {
        event.preventDefault();
        currentPage = i;
        displayArticles();
      });

      li.appendChild(a);
      fragment.appendChild(li);
    }

    pagingNav.innerHTML = "";
    pagingNav.appendChild(fragment);

    prevBtn.classList.toggle("disabled", currentPage === 1);
    nextBtn.classList.toggle("disabled", currentPage === totalPages || totalPages === 0);
  };

  const displayArticles = () => {
    articlesContainer.innerHTML = "";
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const articlesToShow = filteredArticles.slice(start, end);
    const fragment = document.createDocumentFragment();

    articlesToShow.forEach(article => fragment.appendChild(article));
    articlesContainer.appendChild(fragment);
    createPagination();
  };

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.toLowerCase().trim();

    filteredArticles = articles.filter(article => {
      const titleEl = article.querySelector(".tm-post-title");
      return titleEl && titleEl.textContent.toLowerCase().includes(query);
    });

    currentPage = 1;
    displayArticles();
  });

  prevBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayArticles();
    }
  });

  nextBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayArticles();
    }
  });

  displayArticles();
});
