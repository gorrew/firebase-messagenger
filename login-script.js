// Initialize Firebase
let config = {
    apiKey: "AIzaSyD8xzaxvu3ZfoZHkziiWO4GUecvb20t3oU",
    authDomain: "first-firebase-8a0b7.firebaseapp.com",
    databaseURL: "https://first-firebase-8a0b7.firebaseio.com",
    storageBucket: "first-firebase-8a0b7.appspot.com",
    messagingSenderId: "711306822483"
};
firebase.initializeApp(config);


let regUserName = document.getElementById('reg-user-name');
let regUserPassword = document.getElementById('reg-password');



function storeUsers() {
    localStorage.setItem('regUserName', regUserName.value);
    localStorage.setItem('regUserPassword', regUserPassword.value);
    regUserName.value = '';
    regUserPassword.value= '';
}
function checkUser() {
    let storedName = localStorage.getItem('regUserName');
    let storedPass = localStorage.getItem('regUserPassword');


    let userName = document.getElementById('userName-input');
    let userPassword = document.getElementById('password-input');

    if (userName.value == storedName && userPassword.value == storedPass) {
        window.location = 'chat-msg.html'
    }
    else {
        alert('Robert Glider hårt');
    }
}

    let regButton = document.getElementById('reg-button');
    let loginButton = document.getElementById('login-button');

    regButton.addEventListener('click', storeUsers);
    loginButton.addEventListener('click', checkUser);


