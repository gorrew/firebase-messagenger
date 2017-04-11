let msgUl = document.getElementById('msg-ul');
let inputMsg = document.getElementById('input-msg');
let sendMsgButton = document.getElementById('send-msg');
let localUser = localStorage.getItem('regUserName');
let userId = 0;
let loginStatusBar = document.getElementById('login-status');


let config = {
    apiKey: "AIzaSyD8xzaxvu3ZfoZHkziiWO4GUecvb20t3oU",
    authDomain: "first-firebase-8a0b7.firebaseapp.com",
    databaseURL: "https://first-firebase-8a0b7.firebaseio.com",
    storageBucket: "first-firebase-8a0b7.appspot.com",
    messagingSenderId: "711306822483"
};
firebase.initializeApp(config);

let githubLogOut = () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}



loginStatusBar.innerHTML = `Du är inloggad som ${localStorage.regUserName}`;
let logOutBtn = document.createElement('button');
logOutBtn.innerHTML = 'Log out';
loginStatusBar.appendChild(logOutBtn);
logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('regUserName');
    localStorage.removeItem('regUserPassword');
    githubLogOut();
    window.location = 'index.html';
})




if(localUser === undefined ){
    let test = document.getElementById('test');
    test.innerHTML = '';
}

let sendMsg = () => {

    let time = new Date().toLocaleTimeString();


    let msg = {
        name: localUser,
        text: inputMsg.value,
        time: time,
        id: userId
    };

    firebase.database().ref('message/').push(msg);
    inputMsg.value = '';
};

inputMsg.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendMsg();
    }
})
sendMsgButton.addEventListener('click', sendMsg);

firebase.database().ref('message/').on('value', function (snapshot) {
    let allMessages = [];
    let dataObj = snapshot.val();
    msgUl.innerHTML = '';
    for (let obj in dataObj) {
        allMessages.push(dataObj[obj]);

        if (dataObj[obj].id !== undefined) {
            userId = dataObj[obj].id + 1;
        }
    }
    allMessages.sort(function (a, b) {
        return a.id - b.id;
    });
    allMessages.reverse();

    for (let obj in allMessages) {
        let message = allMessages[obj];
        let li = document.createElement('li');
        li.innerHTML = `${message.name}  -  ${message.time} <br> ${message.text}`;
        msgUl.appendChild(li);
    }
    console.log(allMessages);
});

