
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import { getFirestore, collection, query, doc, setDoc, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZEyUjY-D2EUn7fcqw0Jo4ujWCGIH2a0Y",
    authDomain: "zootastic-y9.firebaseapp.com",
    databaseURL: "https://zootastic-y9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "zootastic-y9",
    storageBucket: "zootastic-y9.firebasestorage.app",
    messagingSenderId: "552575686216",
    appId: "1:552575686216:web:1b13c4032fe92ece63ea7d"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


onAuthStateChanged(auth, (user) => {
    if (user !== null) {

        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        console.log(`User is ed in", ${displayName}, ${email}`);
        console.log(user);
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;

        const pfpIcon = document.querySelectorAll(".profile-icon");
        const usernameDisplay = document.querySelectorAll(".usernameDisplay");

        pfpIcon.forEach((element) => {
            element.src = photoURL;
        });
        usernameDisplay.forEach((element) => {
            element.innerText = displayName;
        });
        if (pfpIcon) {
            pfpIcon.src = photoURL
        }

        const OutBtn = `<li><a class="dropdown-item" id="SignOutBtn" href="#" onclick="signOut(auth)">Sign Out</a></li>`;
        const DashboardBtn = document.title == "Home" ? `<li><a class="dropdown-item" id="DashboardBtn" href="Pages/dashboard.html"> Dashboard</a></li>`: `<li><a class="dropdown-item" id="DashboardBtn" href="dashboard.html"> Dashboard</a></li>`
        const dropdownMenu = document.querySelector(".dropdown-menu-end");
        if (dropdownMenu) {
            dropdownMenu.innerHTML += SignOutBtn;
            dropdownMenu.innerHTML += DashboardBtn;
        }
    }

    else {
    console.log("user is not logged in");
    }
})


if (document.title == "Sign Up") {
    SignUpPage();
}
if (document.title == "Sign In") {
    SignInPage();
}
if (document.title == "Dashboard") {
    DashboardPage();
}
if (document.title == "Feedback") {
    feedBackPage();
}
function DashboardPage() {
    function dashboardGreeting() {
        const usernameGreeting = document.getElementById("usernameGreeting");
        const timeOfDay = document.getElementById("timeOfDay");
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const displayName = user.displayName || "User";
                usernameGreeting.innerText = ` ${displayName}`;
            } else {
                window.location.href = "sign-in.html";
            }
        });
        const hours = new Date().getHours()
        switch (true) {
            case (hours >= 5 && hours < 12):
                timeOfDay.innerText = "Good Morning";
                break;
            case (hours >= 12 && hours < 17):
                timeOfDay.innerText = "Good Afternoon";
                break;
            case (hours >= 17 && hours < 21):
                timeOfDay.innerText = "Good Evening";
                break;
            default:
                timeOfDay.innerText = "Good Night";
                break;
        }
    }
    function parkCalculator() {
        const adultPrice = document.getElementById("adultPrice");
        const childPrice = document.getElementById("childPrice");
        const numberOfAdults = document.getElementById("numberOfAdults");
        const numberOfChildren = document.getElementById("numberOfChildren");
        const totalPrice = document.getElementById("totalPrice");
        adultPrice.addEventListener('input', calculate);
        childPrice.addEventListener('input', calculate);
        numberOfAdults.addEventListener('input', calculate);
        numberOfChildren.addEventListener('input', calculate);
        function calculate() {
            if (!adultPrice.value) adultPrice.value = 0;
            if (!childPrice.value) childPrice.value = 0;
            if (!numberOfAdults.value) numberOfAdults.value = 0;
            if (!numberOfChildren.value) numberOfChildren.value = 0;
            let total = (parseInt(adultPrice.value) * parseInt(numberOfAdults.value)) + (parseInt(childPrice.value) * parseInt(numberOfChildren.value));
            totalPrice.innerText = `Ks. ${total}`;
        }

        ;
    }
    function eventCalendar() {
        //get HTMLS and variables
        const currentDate = document.querySelector(".calendar-current-date");
        const prevNextIcons = document.querySelectorAll(".calendar-navigation span");
        const liDaysElement = document.querySelector(".calendar-dates"); // Renamed for clarity

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        // get dates
        let date = new Date();
        let currentMonth = date.getMonth();
        let currentYear = date.getFullYear();
        // const currentDay = date.getDate(); 

        // Todo & Event Management
        let clickedDay = null;
        let selectedDayElement = null;
        let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};

        // Get references to input fields for clearing them later
        const eventTitleInput = document.getElementById("event-title");
        const eventDetailsInput = document.getElementById("event-details");
        const eventList = document.querySelector(".event-list");
        const selectedDateText = document.getElementById("selected-date-text");
        const addBtn = document.getElementById("add-event-btn");


        function calendar() {
            let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
            currentDate.innerText = `${months[currentMonth]} ${currentYear}`
            let lastDateOfThisMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
            let LastDayOfThisMonth = new Date(currentYear, currentMonth, lastDateOfThisMonth).getDay();

            let daysHtml = "";

            // Days from previous month
            for (let i = firstDayOfMonth; i > 0; i--) {
                daysHtml += `<li class="pastMonth inactive"> ${lastDateOfLastMonth - i + 1} </li>`;
            }

            // Days of the current month
            for (let i = 1; i <= lastDateOfThisMonth; i++) {
                const dateKey = `${currentYear}-${currentMonth + 1}-${i}`

                let isToday = i === new Date().getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear() ? "active" : "";

                let highlightClass = (clickedDay === i && currentMonth === date.getMonth() && currentYear === date.getFullYear()) ? "highlight" : "";

                let hasEvent = events[dateKey] && events[dateKey].length > 0 ? "has-event" : "";

                daysHtml += `<li class="${isToday} ${highlightClass} ${hasEvent}" data-day="${i}">${i}</li>`;
            }

            for (let i = LastDayOfThisMonth; i < 6; i++) {
                daysHtml += `<li class="nextMonth inactive"> ${i + 1 - LastDayOfThisMonth} </li>`
            }

            liDaysElement.innerHTML = daysHtml;
            addClickListenersToDays();
        }

        calendar();

        prevNextIcons.forEach(icon => {
            icon.addEventListener("click", () => {

                icon.id === "calendar-next" ? currentMonth += 1 : currentMonth -= 1;

                if (currentMonth < 0 || currentMonth > 11) {
                    date = new Date(currentYear, currentMonth);
                    currentMonth = date.getMonth();
                    currentYear = date.getFullYear();
                } else {
                    date = new Date(currentYear, currentMonth);
                }

                clickedDay = null;
                selectedDayElement = null;
                const today = new Date();
                if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                    clickedDay = today.getDate();
                }

                calendar();
                updateEventList();
            });
        });

        function addClickListenersToDays() {
            const allDays = liDaysElement.querySelectorAll("li:not(.inactive)");
            allDays.forEach(li => {
                li.addEventListener('click', () => {
                    if (selectedDayElement) selectedDayElement.classList.remove("highlight");
                    selectedDayElement = li;
                    selectedDayElement.classList.add("highlight");
                    clickedDay = parseInt(li.getAttribute("data-day"))
                    updateEventList();
                })
            })
        }

        function saveEvents() {
            localStorage.setItem("calendarEvents", JSON.stringify(events));
            calendar();
            updateEventList();
        }

        function updateEventList() {
            const dateKey = clickedDay ? `${currentYear}-${currentMonth + 1}-${clickedDay}` : null;

            eventList.innerHTML = "";

            if (clickedDay) {
                selectedDateText.innerText = `${months[currentMonth]}, ${clickedDay}, ${currentYear}`
            } else {
                selectedDateText.innerText = 'Select a day';
            }


            if (dateKey && events[dateKey] && events[dateKey].length > 0) {
                events[dateKey].forEach((event, index) => {
                    let li = document.createElement("li");
                    li.innerHTML = ` 
            <strong>${event.title}</strong>
            <small>${event.details}</small>
            <span class="remove" data-index="${index}">&times;</span>`

                    eventList.appendChild(li);
                })
            } else if (clickedDay) {
                let li = document.createElement("li");
                li.innerHTML = `<small>No events for this day.</small>`;
                eventList.appendChild(li);
            }

            document.querySelectorAll(".remove").forEach((btn) => {
                btn.addEventListener("click", e => {
                    const index = e.target.getAttribute("data-index");
                    events[dateKey].splice(index, 1);
                    if (events[dateKey].length === 0) delete events[dateKey];
                    saveEvents();
                });
            });
        }

        updateEventList();

        addBtn.addEventListener("click", () => {
            if (!clickedDay) {
                alert("Please select a day to add an event.");
                return;
            }

            const dateKey = `${currentYear}-${currentMonth + 1}-${clickedDay}`;
            let title = eventTitleInput.value.trim(); // Use trimmed value
            let details = eventDetailsInput.value.trim();

            if (!title) {
                alert("Event title is required.");
                return;
            }

            if (!events[dateKey]) events[dateKey] = [];
            events[dateKey].push({ title, details });

            saveEvents();

            eventTitleInput.value = "";
            eventDetailsInput.value = "";
        })
    }


    document.getElementById('scrollToTopBtn').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' /* The key to an elegant, smooth scroll */
        });
    });

    dashboardGreeting();
    parkCalculator();
    eventCalendar();
}


function SignUpPage() {

    //Form Elements
    const usernameInput = document.getElementById("usernameInput");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const pfpInput = document.getElementById("pfpInput");

    const usernameLabel = document.getElementById("usernameLabel");
    const emailLabel = document.getElementById("emailLabel");
    const passwordLabel = document.getElementById("passwordLabel");

    const usernamePreview = document.getElementById("usernamePreview");
    const emailPreview = document.getElementById("emailPreview");
    const pfpPreview = document.getElementById("pfpPreview")

    const submitBtn = document.getElementById("submitBtn");

    // functions
    function usernameCheck() {
        let nameValue = usernameInput.value;
        displayUsernamePreview();


        // validation
        if (!nameValue.match(/^[a-zA-Z][a-zA-Z0-9_]{4,19}$/)) {
            if (!nameValue.match(/^[a-zA-Z]/)) {
                usernameLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Must start with a letter`;
                usernameInput.classList.add("is-invalid");
                return false;
            }
            if (nameValue.length < 5 || nameValue.length > 20) {
                usernameLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Must be 5-20 characters`;
                usernameInput.classList.add("is-invalid");
                return false;
            }
            if (!nameValue.match(/^[a-zA-Z0-9_]+$/)) {
                usernameLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Only letters, numbers, and underscores allowed`;
                usernameInput.classList.add("is-invalid");
                return false;
            }
        }
        usernameLabel.innerHTML = `<i class="bi bi-check-square-fill"></i> Valid Username `;
        usernameInput.classList.remove("is-invalid");
        return true;
    }
    function emailCheck() {
        displayEmailPreview();
        //validation
        if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Invalid Email Format`;
            emailInput.classList.add("is-invalid");
            return false;
        }
        emailLabel.innerHTML = `<i class="bi bi-check-square-fill"></i> Valid Email`;
        emailInput.classList.remove("is-invalid");
        return true;
    }
    function passwordCheck() {
        // validation
        if (passwordInput.value.length < 8) {
            passwordLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Must be at least 8 characters`;
            passwordInput.classList.add("is-invalid");
            return false;
        }
        if (!passwordInput.value.match(/[A-Z]/)) {
            passwordLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Must contain at least one uppercase letter`;
            passwordInput.classList.add("is-invalid");
            return false;
        }
        passwordInput.classList.remove("is-invalid");
        passwordLabel.innerHTML = `<i class="bi bi-check-square-fill"></i> Valid Password`
        return true;
    }
    function pfpCheck() {
        displayPfpPreview();
    }


    // Display Functions
    function displayUsernamePreview() {
        if (!usernameInput.value) { usernamePreview.innerText = "Username"; return; };
        usernamePreview.innerText = usernameInput.value;
    }
    function displayEmailPreview() {
        if (!emailInput.value) { emailPreview.innerText = "placeholder@gmail.com"; return; };
        emailPreview.innerText = emailInput.value;
    }
    function displayPfpPreview() {
        if (pfpInput.files && pfpInput.files[0]) {
            pfpPreview.src = URL.createObjectURL(pfpInput.files[0]);
        } else {
            pfpPreview.src = document.title !== "Home" ? "../images6/pfinspo.jpg" : "images6/pfinspo.jpg";
        }
    }

    function validateForm() {
        // let isUsernameValid = usernameCheck();
        let isEmailValid = emailCheck();
        let isPasswordValid = passwordCheck();
        if (isEmailValid && isPasswordValid) {
            return true;
        }
    }
    function submitForm() {
        try {
            if (!validateForm()) {
                return false;
            }
            const email = emailInput.value;
            const password = passwordInput.value;
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                    window.location.href = "dashboard.html";
                    console.log(user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    displayToast(errorMessage);
                    // ..
                });
        }
        catch (error) {
            console.error("Error during sign up:", error);
        }
    }

    function displayToast(message) {
        const toast = `

        <div class="alert alert-danger m-4" role="alert">
          ${message}
        </div>`
        document.getElementById("sign-section").innerHTML += toast;
    }

    //Event Listeners
    usernameInput.addEventListener('keyup', usernameCheck);
    emailInput.addEventListener('keyup', emailCheck);
    passwordInput.addEventListener('keyup', passwordCheck);
    pfpInput.addEventListener('change', pfpCheck);

    displayUsernamePreview();
    displayEmailPreview();
    submitBtn.addEventListener('click', submitForm);



    const googleSignUp = document.getElementById("googleSignUp");

    googleSignUp.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                window.location.href = "dashboard.html";
                console.log(user);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    })


}

function SignInPage() {

    //Form Elements
    const usernameInput = document.getElementById("usernameInput");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    const usernameLabel = document.getElementById("usernameLabel");
    const emailLabel = document.getElementById("emailLabel");
    const passwordLabel = document.getElementById("passwordLabel");

    const usernamePreview = document.getElementById("usernamePreview");
    const emailPreview = document.getElementById("emailPreview");

    const submitBtn = document.getElementById("submitBtn");

    // functions
    function usernameCheck() {
        let nameValue = usernameInput.value;
        displayUsernamePreview();


        // validation
        if (!nameValue.match(/^[a-zA-Z][a-zA-Z0-9_]{4,19}$/)) {
            if (!nameValue.match(/^[a-zA-Z]/)) {
                usernameLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Must start with a letter`;
                usernameInput.classList.add("is-invalid");
                return false;
            }
            if (nameValue.length < 5 || nameValue.length > 20) {
                usernameLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Must be 5-20 characters`;
                usernameInput.classList.add("is-invalid");
                return false;
            }
            if (!nameValue.match(/^[a-zA-Z0-9_]+$/)) {
                usernameLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Only letters, numbers, and underscores allowed`;
                usernameInput.classList.add("is-invalid");
                return false;
            }
        }
        usernameLabel.innerHTML = `<i class="bi bi-check-square-fill"></i> Possible Username `;
        usernameInput.classList.remove("is-invalid");
        return true;
    }
    function emailCheck() {
        displayEmailPreview();
        //validation
        if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Invalid Email Format`;
            emailInput.classList.add("is-invalid");
            return false;
        }
        emailLabel.innerHTML = `<i class="bi bi-check-square-fill"></i> Possible Email`;
        emailInput.classList.remove("is-invalid");
        return true;
    }
    function passwordCheck() {
        // validation
        if (passwordInput.value.length < 8) {
            passwordLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Must be at least 8 characters`;
            passwordInput.classList.add("is-invalid");
            return false;
        }
        if (!passwordInput.value.match(/[A-Z]/)) {
            passwordLabel.innerHTML = `<i class="bi bi-x-octagon-fill"></i>  Must contain at least one uppercase letter`;
            passwordInput.classList.add("is-invalid");
            return false;
        }
        passwordInput.classList.remove("is-invalid");
        passwordLabel.innerHTML = `<i class="bi bi-check-square-fill"></i> Possible Password`
        return true;
    }
    function pfpCheck() {
        displayPfpPreview();
    }


    // Display Functions
    function displayUsernamePreview() {
        if (!usernameInput.value) { usernamePreview.innerText = "Welcome Back!"; return; };
        usernamePreview.innerText = usernameInput.value;
    }
    function displayEmailPreview() {
        if (!emailInput.value) { emailPreview.innerText = "It's nice to see you again"; return; };
        emailPreview.innerText = emailInput.value;
    }
    function displayPfpPreview() {
        if (pfpInput.files && pfpInput.files[0]) {
            pfpPreview.src = URL.createObjectURL(pfpInput.files[0]);
        } else {
            pfpPreview.src =  document.title !== "Home" ? "../images6/pfinspo.jpg" : "images6/pfinspo.jpg";
        }
    }

    function validateForm() {
        // let isUsernameValid = usernameCheck();
        let isEmailValid = emailCheck();
        let isPasswordValid = passwordCheck();
        if (isEmailValid && isPasswordValid) {
            return true;
        }
    }
    function submitForm() {
        try {
            if (!validateForm()) {
                return false;
            }
            const email = emailInput.value;
            const password = passwordInput.value;
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    window.location.href = "dashboard.html";
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    displayToast(errorMessage);
                });
        }
        catch (error) {
            console.error("Error during sign up:", error);
        }
    }

    function displayToast(message) {
        const toast = `

    <div class="alert alert-danger m-4" role="alert">
      ${message}
    </div>
    `
        document.getElementById("sign-section").innerHTML += toast;
    }

    //Event Listeners
    usernameInput.addEventListener('keyup', usernameCheck);
    emailInput.addEventListener('keyup', emailCheck);
    passwordInput.addEventListener('keyup', passwordCheck);

    displayUsernamePreview();
    displayEmailPreview();
    submitBtn.addEventListener('click', submitForm);



    const googleSignUp = document.getElementById("googleSignUp");

    googleSignUp.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                window.location.href = "dashboard.html";
                console.log(user);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    })

}

function feedBackPage() {
    onAuthStateChanged(auth, (user) => {
        if (user == null) {
            alert("You must be signed in to leave feedback.");
            window.location.href = "sign-up.html";
            return;
        }

        const displayName = user.displayName;
        const email = user.email;
        const uid = user.uid;
        const userFeedback = doc(db, `userFeedbacks/${user.uid}`);
        const submitFeedbackBtn = document.getElementById("submitFeedbackBtn");
        submitFeedbackBtn.addEventListener('click', submitFeedback);
        renderFeedback();

        async function writeFeedback(title, stars, comment) {
            // Write feedback to Firestore 
            const feedbackData = {
                username: displayName,
                profilePicture: user.photoURL,
                title: title,
                stars: stars,
                comment: comment,
                timestamp: new Date()
            };
            try {

                await setDoc(userFeedback, feedbackData, { merge: true });

            }
            catch (error) {
                console.error("Error writing feedback: ", error);
            }
        }
        async function renderFeedback() {
            // Render feedback from Firestore to HTML
            const feedbackContainer = document.getElementById("feedbackContainer");
            feedbackContainer.innerHTML = "";
            feedbackContainer.innerHTML = `   
        <div class=" col-lg-3 col-md-4 col-sm-11">
            <div class="card actual-review-card pt-4 p-2 shadow-lg h-100">
                <i class="bi bi-quote" id="start-quote"></i>
                <img src="" alt="" class="review-pfp placeholder">

                <div class="card-body mt-5 pt-5 h-100 text-center">
                    <span class="review-stars fs-4 placeholder">Loading...


                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>


                    </span>
                    <h4 class="fw-bold text-start col-10 placeholder"></h4>
                    <p class="review-p mb-3 fst-italic text-start col-12 placeholder"></p>
                    <h6 class="card-title text-start col-4 placeholder"></h6>
                </div>
            </div>


        </div>`;
            const reviews = await query(
                collection(db, 'userFeedbacks'),
                orderBy('timestamp')
            )

            const querySnapshot = await getDocs(reviews);
            feedbackContainer.innerHTML = "";
            querySnapshot.forEach((feedback) => {
                const feedbackData = feedback.data();
                let starsHTML = '';
                switch (feedbackData.stars) {
                    case 0:
                        starsHTML = `<i class="bi bi-star-fill empty-star"></i>
                                    <i class="bi bi-star-fill empty-star"></i>
                                    <i class="bi bi-star-fill empty-star"></i>
                                    <i class="bi bi-star-fill empty-star"></i>
                                    <i class="bi bi-star-fill empty-star"></i>`;
                        break
                    case 1:
                        starsHTML = `<i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill empty-star"></i>
                                    <i class="bi bi-star-fill empty-star"></i>
                                    <i class="bi bi-star-fill empty-star"></i>
                                    <i class="bi bi-star-fill empty-star"></i>`;
                        break;
                    case 2:
                        starsHTML = `<i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill empty-star"></i>
                                    <i class="bi bi-star-fill empty-star"></i>
                                    <i class="bi bi-star-fill empty-star"></i>`;
                        break;
                    case 3:
                        starsHTML = `<i class="bi bi-star-fill filled-star"></i>
                                    <i class="bi bi-star-fill filled-star"></i>
                                    <i class="bi bi-star-fill filled-star"></i>
                                    <i class="bi bi-star-fill empty-star"></i>
                                    <i class="bi bi-star-fill empty-star"></i>`;
                        break;
                    case 4:
                        starsHTML = `<i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill "></i>
                        <i class="bi bi-star-fill "></i>
                        <i class="bi bi-star-fill "></i>
                        <i class="bi bi-star-fill empty-star"></i>`;
                        break;
                    case 5:
                        starsHTML = `<i class="bi bi-star-fill "></i>
                        <i class="bi bi-star-fill "></i>
                        <i class="bi bi-star-fill "></i>
                        <i class="bi bi-star-fill "></i>
                        <i class="bi bi-star-fill "></i>`;
                        break;
                }
                const feedbackCard = `
                <div class=" col-lg-3 col-md-4 col-sm-11">
                    <div class="card actual-review-card pt-4 p-2 shadow-lg h-100">
                                        <i class="bi bi-quote" id="start-quote"></i>
                    <img src="${feedbackData.profilePicture}"
                        alt="" class="review-pfp">

                    <div class="card-body mt-5 pt-5 h-100 text-center">
                        <span class="review-stars fs-4">
                        ${starsHTML}
                        </span>
                        <h4 class="fw-bold text-start">${feedbackData.title}</h4>
                        <p class="review-p mb-3 fst-italic text-start">${feedbackData.comment}</p>
                        <h6 class="card-title text-start">- ${feedbackData.username}</h6>
                    </div>
                    </div>


                </div>
                `;
                console.log(feedbackData);
                feedbackContainer.innerHTML += feedbackCard;
            });


            calculateScore();
        }
        async function submitFeedback(e) {
            e.preventDefault();
            const title = document.getElementById("feedbackTitle").value;
            let stars = 0;
            if (document.getElementById("1Star").checked) stars = 1;
            if (document.getElementById("2Star").checked) stars = 2;
            if (document.getElementById("3Star").checked) stars = 3;
            if (document.getElementById("4Star").checked) stars = 4;
            if (document.getElementById("5Star").checked) stars = 5;
            const comment = document.getElementById("commentInput").value;
            await writeFeedback(title, stars, comment);
            await renderFeedback();
        }
        async function calculateScore() {
            const ratingAverage = document.getElementById("RatingAverage");
            const feedbackQuantity = document.getElementById("feedbackQuantity");
            const StarIndicators = {
                5: document.getElementById("5StarIndicator"),
                4: document.getElementById("4StarIndicator"),
                3: document.getElementById("3StarIndicator"),
                2: document.getElementById("2StarIndicator"),
                1: document.getElementById("1StarIndicator")
            }

            const starResults = {
                5: document.getElementById("5-star-results"),
                4: document.getElementById("4-star-results"),
                3: document.getElementById("3-star-results"),
                2: document.getElementById("2-star-results"),
                1: document.getElementById("1-star-results")
            }
            const starBars = {
                5: document.getElementById("5-star-bar"),
                4: document.getElementById("4-star-bar"),
                3: document.getElementById("3-star-bar"),
                2: document.getElementById("2-star-bar"),
                1: document.getElementById("1-star-bar")
            };

            const reviews = await query(
                collection(db, 'userFeedbacks'),
                orderBy('timestamp')
            )

            const querySnapshot = await getDocs(reviews);
            let totalStars = 0;
            let reviewCount = 0;
            let starCounts = {
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0
            };

            querySnapshot.forEach((feedback) => {
                const feedbackData = feedback.data();
                totalStars += feedbackData.stars;
                reviewCount += 1;
                starCounts[feedbackData.stars] += 1;
            });

            const averageRating = (totalStars / reviewCount).toFixed(1);
            ratingAverage.innerText = averageRating;
            feedbackQuantity.innerText = `${reviewCount}`;
            for (let star = 1; star <= 5; star++) {
                const percentage = reviewCount === 0 ? 0 : ((starCounts[star] / reviewCount) * 100).toFixed(0);
                starResults[star].innerText = `${percentage}%`;
                starBars[star].style.width = `${percentage}%`;
            }

        }
    });




}



