const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const signIn = document.getElementById("signin");
let registerForm = document.getElementById("registerForm");
let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");
let email = document.getElementById("email");
let password = document.getElementById("pass");
let welcome = document.getElementById("welcome");
let users = JSON.parse(localStorage.getItem("Users")) ?? [];
let UserSession = JSON.parse(localStorage.getItem("sessionUser"));

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});
loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (checkValid()) {
    addUser();
  }
});
function addUser() {
  let user = {
    name: userName.value,
    email: userEmail.value,
    pass: userPassword.value,
  };

  if (isExist(user) == true) {
    console.log("email is Already Exist ");
  } else {
    if (checkValid() == true) {
      users.push(user);
      console.log(user);
      container.classList.remove("active");
      onchange();
      clear();
    } else {
      console.log("error");
    }
  }
}
function onchange() {
  localStorage.setItem("Users", JSON.stringify(users));
}
function clear() {
  userName.value = null;
  userEmail.value = null;
  userPassword.value = null;
  userName.classList.remove("is-valid");
  userEmail.classList.remove("is-valid");
  userPassword.classList.remove("is-valid");
}
signIn.addEventListener("click", function () {
  if (email.value == "" || password.value == "") {
    let emptyField = document.getElementById("emptyField");
    emptyField.classList.remove("d-none");
    return false;
  }
  let invalidMail = document.getElementById("invalidMail");
  let invalidPass = document.getElementById("invalidPass");
  let newArr = users.filter((item) => {
    return item.email == email.value && item.pass == password.value;
  });
  localStorage.setItem("sessionUser", JSON.stringify(newArr));
  if (newArr.length != 0) {
    window.location.href = "welcome.html";
  } else {
    let err = users.filter((item) => {
      return item.email == email.value;
    });

    if (err.length == 0) {
      invalidMail.classList.remove("d-none");
    }
    if (err.length != 0) {
      invalidPass.classList.remove("d-none");
    }
  }
});


function isExist(user) {
  let accountExistMsg = document.getElementById("accountExistMsg");
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == user.email) {
      accountExistMsg.classList.replace("d-none", "d-block");
      return true;
    }
  }
  return false;
}

function welcomeUser() {
  let currentUser;
  for (let i = 0; i < UserSession.length; i++) {
    currentUser = UserSession[i];
  }
  document.getElementById("welcome").innerHTML = "Welcome " + currentUser.name;
}

function logout() {
  localStorage.removeItem("sessionUser");
}
function validationAllInputs(regex, element, alertMsg) {
  let pattern = regex;
  if (pattern.test(element.value) == true) {
    alertMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}
function checkValid() {
  if (
    validationAllInputs(
      /^[A-Za-z 0-9]{3,15}$/,
      userName,
      userName.nextElementSibling,
    ) == true &&
    validationAllInputs(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      userEmail,
      userEmail.nextElementSibling,
    ) == true &&
    validationAllInputs(
      /^[A-Za-z0-9]{5,20}$/,
      userPassword,
      userPassword.nextElementSibling,
    ) == true &&
    userName.value != "" &&
    userEmail.value != "" &&
    userPassword.value != ""
  ) {
    console.log("all Inputs Is Valid");
    return true;
  } else {
    console.log("Some thing wrong here");
    return false;
  }
}
