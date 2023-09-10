import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const auth = getAuth();
const database = getDatabase();

const loginFunc = () => {
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((resolve) => {
      Swal.fire("successfully login");
      let uniqueId = auth.currentUser.uid;
      console.log(uniqueId);
      let adminReference = ref(database, "users/" + uniqueId);
      onValue(adminReference, (snapshot) => {
        let checkKey = snapshot.val().adminKey;
        console.log(snapshot.val().adminKey);
        if (checkKey == "admin") {
        Swal.fire("you are admin");
          window.location.href = "./adminDashBoard.html";
        } else {
          return;
        }
      });
    })
    .catch((error) => {
      alert("error");
      console.log(error);
    });
};
const loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", loginFunc);
document.querySelector("#signup").addEventListener("click", () => {
  window.location.href= "./index.html"
})
