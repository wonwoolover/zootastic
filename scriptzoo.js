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

// carousel
document.addEventListener("DOMContentLoaded", function () {
    try{
        const carousel = document.getElementById("animalCarousel");
        const pageText = document.getElementById("animalPage");

        carousel.addEventListener("slid.bs.carousel", function (event) {
            let index = event.to;           
            let total = event.target.querySelectorAll('.carousel-item').length;

            let current = String(index + 1).padStart(2, "0");
            let last = String(total).padStart(2, "0");

            pageText.textContent = `${current} / ${last}`;
        });
    }   
    catch(err){
       console.error("Uh oh! Error:",err);
    }
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
  "eco friendly": "Pages/eco_friendly.html",
  "eco-friendly": "Pages/eco_friendly.html",
  "ecofriendly": "Pages/eco_friendly.html",
  "eco-friendly practices": "Pages/eco_friendly.html",
  "feedback": "Pages/feedback.html",
  "feedbacks": "Pages/feedback.html",
  "about us": "Pages/about.html",
  "about": "Pages/about.html",
  "animals": "animals.html",

  "tiger": "Pages/tiger.html",
  "tigers": "Pages/tiger.html",
  "otter": "Pages/otter.html",
  "otters": "Pages/otter.html",
  "peacock": "Pages/peacock.html",
  "peacocks": "Pages/peacock.html",
  "zebra": "Pages/zebra.html",
  "zebras": "Pages/zebra.html",
  "bear": "Pages/bear.html",
  "bears": "Pages/bear.html",
  "deer": "Pages/deer.html",
  "deers": "Pages/deer.html",
  "snake": "Pages/snake.html",
  "snakes": "Pages/snake.html",
  "monkey": "Pages/monkey.html",
  "monkeys": "Pages/monkey.html",
  "elephant": "Pages/elephant.html",
  "elephants": "Pages/elephant.html",
  "camel": "Pages/camel.html",
  "camels": "Pages/camel.html",
  "hippo": "Pages/hippo.html",
  "hippos": "Pages/hippo.html",
  "crocodile": "Pages/crocodile.html",
  "crocodiles": "Pages/crocodile.html"
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





    