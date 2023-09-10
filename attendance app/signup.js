import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const auth = getAuth();
const database = getDatabase();

const signupFunc = () => {
  let firstName = document.querySelector("#firstName");
  let lastName = document.querySelector("#lastName");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let phone = document.querySelector("#phone")

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((resolve) => {
      let uniqueId = auth.currentUser.uid;
      localStorage.setItem("uid", uniqueId);
      let adminRef = ref(database, "users/" + uniqueId);
      let userObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        adminKey: "",
        uniqueId
      };
      set(adminRef, userObj).then((response) => {
        Swal.fire("successfully signup");
        window.location.pathname = "classSchedule.html"
      });
    })
      .catch((error) => {
        alert("error")
        console.log(error);
    }); 
};
let signupButton = document.querySelector("#signupButton");
signupButton.addEventListener("click", (event) => {
     event.preventDefault();
    signupFunc()
})
document.querySelector("#loginButton").addEventListener("click", () => [
  window.location.href = "./login.html"
])


