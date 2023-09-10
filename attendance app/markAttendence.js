import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  onValue,
  push,
  update,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const auth = getAuth();
const database = getDatabase();
let webDev = document.querySelector(".webdev");
let AI = document.querySelector(".AI");
let graphicDesigning = document.querySelector(".graphicDesigning");
let videoEditing = document.querySelector(".videoEditing");
let digitalMarketing = document.querySelector(".digitalMarketing");
let returnBtn = document.querySelector(".returnBtn");
let courseTitle = document.querySelector(".courseTitle");
let date = document.querySelector(".date");
let clickKey;
let showStudents = document.querySelector(".showStudents");

date.innerHTML = `${new Date().getDate()} -${new Date().getMonth()}-${new Date().getYear()}`;

const showStudentsFunc = () => {
  console.log(clickKey);
  let studentsList = [];
  let studRef = ref(database, "students/");
  onValue(studRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      console.log(childSnapshot.val());
      let key = childSnapshot.key;
      if (childSnapshot.val().chooseCourse == clickKey) {
        let studentInfo = {
          name: childSnapshot.val().studentName,
          course: childSnapshot.val().courseName,
          batchNo: childSnapshot.val().batchNo,
          key,
        };
        studentsList.push(studentInfo);
        let studentTable = document.createElement("table");
        studentTable.classList.add("studentTable");
        let studentRow = document.createElement("tr");
        let studentNameCell = document.createElement("td");
        studentNameCell.classList.add("student-name-cell"); // Add class for styling
        let batchNoCell = document.createElement("td");
        let attendanceCell = document.createElement("td");
        attendanceCell.classList.add("attendance-cell"); // Add class for styling
        let actionCell = document.createElement("td");
        actionCell.classList.add("action-cell"); // Add class for styling

        // Giving values
        courseTitle.innerHTML = `Students Enrolled in: ${clickKey}`;
        batchNoCell.innerHTML = `Batch No: <strong>${studentInfo.batchNo}</strong>`;
        studentNameCell.innerHTML = `<strong>${studentInfo.name}</strong>`;

        let attendanceSelect = document.createElement("select");
        attendanceSelect.classList.add("attendance-select");
        attendanceSelect.innerHTML = `
        <select class="select-box">
        <option value="" disabled selected>Attendence</option>
          <option value="P">Present</option>
          <option value="A">Absent</option>
          <option value="L">Leave</option>
          </select>
        `;

        let submitBtn = document.createElement("button");
        submitBtn.innerText = "Save";
        submitBtn.classList.add("submitBtn"); // Add class for styling
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit Student Info";
        editBtn.classList.add("editBtn"); // Add class for styling

        // Append elements to table row
        attendanceCell.appendChild(attendanceSelect);
        actionCell.appendChild(submitBtn);
        actionCell.appendChild(editBtn);

        studentRow.appendChild(studentNameCell);
        studentRow.appendChild(batchNoCell);
        studentRow.appendChild(attendanceCell);
        studentRow.appendChild(actionCell);
        showStudents.appendChild(studentRow);

        submitBtn.addEventListener("click", () => {
          let uniqueRef = ref(database, "students/" + key);
          if (attendanceSelect.value === "v") {
            Swal.fire("Please select attendance status.");
          } else {
            let obj = {
              studentStatus: attendanceSelect.value,
              date: `${new Date().getDate()} -${new Date().getMonth()}-${new Date().getYear()}`,
            };
            update(uniqueRef, obj).then((resolve) => {
              Swal.fire("Attendance saved successfully.");
            });
          }
        });

        editBtn.addEventListener("click", () => {
          let studKey = document.createElement("p");
          studKey.classList.add("student-key"); // Add class for styling
          let editInfoWork = document.querySelector(".editInfoWork");
          studKey.innerText = key;
          editInfoWork.style.display = "flex";

          let done = document.querySelector(".done");
          done.addEventListener("click", () => {
            let name = document.querySelector("#name").value;
            let batchNo = document.querySelector("#batchNo").value;
            let chooseCourse = document.querySelector("#chooseCourse").value;
            if (!name || !batchNo || !chooseCourse) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Kindly fill all fields.",
              });
            } else {
              let newRef = ref(database, "students/" + studKey.innerText);
              let newObj = {
                studentName: name,
                batchNo,
                chooseCourse,
              };
              update(newRef, newObj).then((resolve) => {
                Swal.fire("Student information updated successfully.");
                editInfoWork.style.display = "none";
                window.location.reload();
              });
            }
          });
        });
      }
    });
  });
};
webDev.addEventListener("click", () => {
  showStudents.innerHTML = "";
  clickKey = "Web Development";
  showStudentsFunc();
});
AI.addEventListener("click", () => {
  showStudents.innerHTML = "";
  clickKey = "AI";
  showStudentsFunc();
});
digitalMarketing.addEventListener("click", () => {
  showStudents.innerHTML = "";
  clickKey = "Digital Marketing";
  showStudentsFunc();
});
videoEditing.addEventListener("click", () => {
  showStudents.innerHTML = "";
  clickKey = "Video Editing";
  showStudentsFunc();
});
graphicDesigning.addEventListener("click", () => {
  showStudents.innerHTML = "";
  clickKey = "Graphic Designing";
  showStudentsFunc();
});
returnBtn.addEventListener("click", () => {
  window.location.href = "./adminDashBoard.html";
});
let createStudent = document.querySelector(".createStudent");
createStudent.addEventListener("click", () => {
  window.location.href = "./createStudent.html";
});
