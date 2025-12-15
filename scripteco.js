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

// slider
const container_suggest = document.querySelector(".container-suggest");
const container_suggestthird = document.querySelector(".container-suggestthird");
const container_suggestsec = document.querySelector(".container-suggestsec");
const container_suggestfourth = document.querySelector(".container-suggestfourth");
document.querySelector(".sliderst").addEventListener('input', (e)=>{
    // this is the function and e is the event/parameter
    container_suggest.style.setProperty('--position', `${e.target.value}%`);
    // this is to update the slider, image, and button because the og position we put was 50%
});
document.querySelector(".sliderthird").addEventListener('input', (el)=>{
    container_suggestthird.style.setProperty('--position', `${el.target.value}%`);
});
document.querySelector(".slidersec").addEventListener('input', (ele)=>{
    container_suggestsec.style.setProperty('--position', `${ele.target.value}%`);
});
document.querySelector(".sliderfourth").addEventListener('input', (elem)=>{
    container_suggestfourth.style.setProperty('--position', `${elem.target.value}%`);
});

// progress circle
let percent = document.getElementById("number");
let counter = 0;
// we wil be using setinterval to increase the value
setInterval(()=>{
    if (counter == 35){
        clearInterval();
    }
    else{
        counter+= 1;
        percent.innerHTML = counter + "%";
    }
}, 50);
// this is miliseconds 
// setting the limit to stop at the percent you set in css 
let percentage = document.getElementById("numbertwo");
let countertwo = 0;
// we wil be using setinterval to increase the value
setInterval(()=>{
    if (countertwo == 10){
        clearInterval();
    }
    else{
        countertwo+= 1;
        percentage.innerHTML = countertwo + "%";
    }
}, 150);

// quote changing with time
let day = new Date();
let quote_day = "";

switch(day.getDay()){

case 0:
    quote_day = "It is never late for anything. That goes the same for restoration";
    break;

case 1:
    quote_day ="We don't own the Earth, we belong to it"; 
    break;   

case 2:
    quote_day ="Remember the 3 Cs: Coexist, Conserve, Commit";
    break;

case 3:
    quote_day ="Imagine zoo parks have feelings just like us"; 
    break;

case 4:
    quote_day ="Restore, renew, revive, reclaim, redeem";
    break;  
                
case 5:
    quote_day ="Treat animals with love, treat zoos like doves"; 
    break;
            
case 6:
    quote_day ="The first step starts with us. We are organisms that can take action"
    break;
} 
document.querySelector(".text_quote_day").innerHTML = quote_day;

// quote transition animation 
let transition_quote = document.querySelector(".trans_quote");
let count = 0;

setTimeout(functionText, 1000);
// setinterval = repeatedly call function within the fixed time 

functionText();
    function functionText(){
    let quoteforquote = transition_quote.dataset.title;
    transition_quote.innerHTML = "";

    setInterval(runFunc, 2000);

    function runFunc(){
        if(count<quoteforquote.length){
            let creatingSpan = document.createElement("span");
            creatingSpan.setAttribute("class","animationOne");
            creatingSpan.innerHTML = quoteforquote.charAt(count); 
            // chartAt is a function 
            transition_quote.append(creatingSpan);
            count++;
        }
        else{
            setTimeout(function (){
            transition_quote.innerHTML = "";
            count = 0;
            }, 1000)
        }
    }
}
// bar graph using js 
// const xValues = ["Italy", "France", "Spain", "USA", "Argentina"]; 
// for x axis
// const yValues = [55, 49, 44, 24, 15];
// for y axis 
// const barColors = ["red", "green","blue","orange","brown"];
// diff colors for each bar 

// const ctx = document.getElementById("myChart");

// new Chart(ctx, {
//   type: "bar",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: barColors,
//       data: yValues
//     }]
//   },
//   options: {
//     plugins: {
//       legend: {display: false},
//       title: {
//         display: true,
//         text: "World Wine Production 2018",
//         font: {size: 16}
//       }
//     }
//   }
// });

// heart animation icon
let greyHeart = document.querySelector(".emoji-heart-og");
let fillHeart = document.querySelector(".emoji-heart-fill");
 
greyHeart.addEventListener("click", ()=>{
    fillHeart.classList.add("animation");
});
fillHeart.addEventListener("click", ()=>{
    fillHeart.classList.remove("animation");
});


// shopcart heart thing


// fading animation blah blah blah 
const BgArray = ["../images3/deermayphu.jpg", "../images3/deerthansin.jpg", "../images3/elephantthansin.jpg", "../images1/allele.jpg"];
const TextArray = ["", "", "", ""];
        
    function repeatBG(){
        let k = 0;
        for (let i = 0;i<BgArray.length;i++){
            setTimeout(()=>{
            document.getElementById("background").style.background = "url(" + BgArray[i] + ")"; 
            document.getElementById("background").style.backgroundSize = "cover";
            document.getElementById("background").classList.add("col-sm-12");
            

            if (k+1 === BgArray.length){
                setTimeout(()=>{repeatBG()}, 2000);
            }
            else{k++;}
            }, 3000 * i)
        }   
    }
repeatBG();

// toast message pop up
// function toastfun(){
    document.getElementById("liveToastBtn").onclick = function() {
        var toastElList = [].slice.call(document.querySelectorAll('.toast'))
        var toastList = toastElList.map(function(toastEl) {
            return new bootstrap.Toast(toastEl)
        })
        toastList.forEach(toast => toast.show())
    }
// }

// uploading section 
let message_error = document.getElementById("errormess");
function validateMessage(){
    const wordcount = (messagevalue) => {
        let words = (messagevalue.match(/\b\w+\b/g));
        // match searches the string using the regex regular expression 
        return words ? words.length : 0;
        // ternary operator else {return 0}
    }
    let messagevalue = document.getElementById("name").value;
    let require_message = 10;
    let remaining = require_message - wordcount(messagevalue);
    // wordcount is a function 

    console.log(wordcount(messagevalue))

    if(remaining > 0){
        message_error.innerHTML = `${remaining} words are still needed.`;
        return false
    }

    message_error.innerHTML = '<div class="row"><i class="bi bi-check-circle-fill col-lg-1" id="checkcheck"></i><p class="word_limit col-lg-10">You are within the word limit.</p></div>';
    return true
}

function validateSummit(){
    if(!validateMessage()){
        submit_error.innerHTML = "Your input values are invalid. Fix them first."
        return false
    }

    return true
}

const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("uploadedarea");
const nameInput = studentForm["name"];
const fileInput = document.getElementById("file_input");

const students = JSON.parse(localStorage.getItem("uploadedarea")) || [];

function addstudent(name, imageBase64) {
    const newStudent = { name, image: imageBase64 };
    students.push(newStudent);

    localStorage.setItem("uploadedarea", JSON.stringify(students));
    return newStudent;
}

function createStudentElement({name, image}) {
    const studentDiv = document.createElement('div');
    const studentName = document.createElement('h5');

    // const fileinputthing = document.createElement('img')
        
    studentName.innerHTML = "" + name;

    const file_img = document.createElement("img");
    file_img.src = image;  
    file_img.classList.add("img-fluid");
    file_img.classList.add("eco-image-border");

    studentDiv.append(studentName, file_img);
    studentList.append(studentDiv);

    studentList.classList.add("eco-card-border");
    studentList.classList.add("col-12");
    studentList.classList.add("col-lg-4");
    studentList.classList.add("col-md-6");
}

studentForm.onsubmit = e=>{
    e.preventDefault();
    // constructing combinators
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageBase64 = e.target.result;

        const newStudent = addstudent(
            nameInput.value,
            imageBase64
        );
        window.location.reload();
        createStudentElement(newStudent);
    };

    reader.readAsDataURL(file);
};
students.forEach(createStudentElement);

// drag and drop 
let list_suggest = document.getElementsByClassName("list-suggest");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");
let selected_suggest = null;

for (let list of list_suggest){
    // get the element and see that element in "selected_suggest"
    list.addEventListener("dragstart", function(){
        selected_suggest = this;
        // target is the img not list-suggest 
    });

    list.addEventListener("dragend", function () {
        selected_suggest = null;
    });
}

// for the right box (dragging left ro right)
// so it will prevent the default feature and will not block dropping 
rightBox.addEventListener("dragover", function(element){
    element.preventDefault();
});
leftBox.addEventListener("dragover", function(element){
    element.preventDefault();
});

// drop feature because we need to drop in the right box 
rightBox.addEventListener("drop", function(){
// add the selected element inside right box
if (selected_suggest){
    rightBox.appendChild(selected_suggest);
    }
});
// drop back to left 
leftBox.addEventListener("drop", function(){
    if (selected_suggest){
        leftBox.appendChild(selected_suggest);
    }
});


// active nav
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
                currentPath.includes("deer")
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



