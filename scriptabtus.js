// aboutus 
const btn = document.getElementById("readMoreBtn");
  const moreText = document.getElementById("moreText");

  btn.addEventListener("click", function() {
    if (moreText.style.display === "none") {
      moreText.style.display = "inline";
      btn.textContent = "READ LESS";
    } else {
      moreText.style.display = "none";
      btn.textContent = "READ MORE";
    }
  });
    const panels = document.querySelectorAll(".panel");
    panels.forEach(panel => {
      panel.addEventListener("click", () => {
        panels.forEach(p => p.classList.remove("active"));
        panel.classList.add("active");
      });
    });

    // for the search 
let search = document.querySelector(".actual-search");
let clear = document.querySelector(".clear");

search.onclick = function(){
    document.querySelector(".search-wrapper").classList.toggle('active');
}
clear.onclick = function(){
    document.getElementById("search-type").value = "";
}

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById("search-type");

const searchMap = {
  "eco friendly": "eco_friendly.html",
  "eco-friendly": "eco_friendly.html",
  "ecofriendly": "eco_friendly.html",
  "eco-friendly practices": "eco_friendly.html",
  "feedback": "feedback.html",
  "feedbacks": "feedback.html",
  "about us": "about.html",
  "about": "about.html",
  "animals": "animals.html",

  "tiger": "tiger.html",
  "tigers": "tiger.html",
  "otter": "otter.html",
  "otters": "otter.html",
  "peacock": "peacock.html",
  "peacocks": "peacock.html",
  "zebra": "zebra.html",
  "zebras": "zebra.html",
  "bear": "bear.html",
  "bears": "bear.html",
  "deer": "deer.html",
  "deers": "deer.html",
  "snake": "snake.html",
  "snakes": "snake.html",
  "monkey": "monkey.html",
  "monkeys": "monkey.html",
  "elephant": "elephant.html",
  "elephants": "elephant.html",
  "camel": "camel.html",
  "camels": "camel.html",
  "hippo": "hippo.html",
  "hippos": "hippo.html",
  "crocodile": "crocodile.html",
  "crocodiles": "crocodile.html"
};

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    if (searchMap[query]) {
      window.location.href = searchMap[query];
    } else {
      alert("No results found. Try searching animals or eco-friendly topics 🦁🌱");
    }
  }
});

const currentPath = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll(".my-link");

    navLinks.forEach(link => {
        const page = link.dataset.page;

        // HOME
        if (
            page === "home" &&
            (currentPath.endsWith("/") || currentPath.includes("index.html"))
        ) {
            link.classList.add("active-nav");
        }

        // ANIMALS (including sub-pages)
        if (
            page === "animals" &&
            (
                currentPath.includes("animals") ||
                currentPath.includes("tiger") ||
                currentPath.includes("otter") ||
                currentPath.includes("snake") ||
                currentPath.includes("peacock") ||
                currentPath.includes("bear") ||
                currentPath.includes("zebra") ||
                currentPath.includes("elephant") ||
                currentPath.includes("deer") ||
                currentPath.includes("camel") ||
                currentPath.includes("crocodile") ||
                currentPath.includes("monkey")
            )
        ) {
            link.classList.add("active-nav");
        }

        // ECO FRIENDLY
        if (page === "eco" && currentPath.includes("eco")) {
            link.classList.add("active-nav");
        }

        // FEEDBACK
        if (page === "feedback" && currentPath.includes("feedback")) {
            link.classList.add("active-nav");
        }

        // ABOUT
        if (page === "about" && currentPath.includes("about")) {
            link.classList.add("active-nav");
        }
    });