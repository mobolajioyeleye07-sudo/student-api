const API_URL = "http://localhost:4000/students";

const studentForm = document.getElementById("studentForm");
const studentsTableBody = document.getElementById("studentsTableBody");
const totalStudents = document.getElementById("totalStudents");
const totalCourses = document.getElementById("totalCourses")
let editingStudentId = null;

/* ===========================
   LOAD STUDENTS
=========================== */

async function getStudents() {

    try {

        const response = await fetch(API_URL);

        const students = await response.json();

        displayStudents(students);

    } catch (error) {

        console.error(error);

    }

}

/* ===========================
   DISPLAY STUDENTS
=========================== */

function displayStudents(students) {

    studentsTableBody.innerHTML = "";

    totalStudents.textContent = students.length;

    // Registered Today
const today = new Date().toDateString();

const registeredToday = students.filter(student => {
    if (!student.createdAt) return false;
    return new Date(student.createdAt).toDateString() === today;
});

todayStudents.textContent = registeredToday.length;

// Total Courses
const uniqueCourses = [...new Set(students.map(student => student.course))];

totalCourses.textContent = uniqueCourses.length;

    if (students.length === 0) {

        studentsTableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    No student records available.
                </td>
            </tr>
        `;

        return;

    }


    students.forEach(student => {

        studentsTableBody.innerHTML += `
            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.phone}</td>

                <td>${student.stateOfOrigin}</td>

                <td>${student.localGovernment}</td>

                <td>${student.course}</td>

                <td>
                    <button onclick="editStudent(${student.id})">
                        Edit
                    </button>

                    <button onclick="deleteStudent(${student.id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;

    });

}

async function editStudent(id) {

    const response = await fetch(API_URL);

    const students = await response.json();

    const student = students.find(student => student.id === id);

    if (!student) return;

    editingStudentId = id;

    document.getElementById("name").value = student.name;

    document.getElementById("email").value = student.email;

    document.getElementById("phone").value = student.phone;

    document.getElementById("homeAddress").value = student.homeAddress;

    document.getElementById("kinName").value = student.nextOfKin.name;

    document.getElementById("kinPhone").value = student.nextOfKin.phone;

    document.getElementById("relationship").value = student.nextOfKin.relationship;

    document.getElementById("stateOfOrigin").value = student.stateOfOrigin;

    document.getElementById("localGovernment").value = student.localGovernment;

    document.getElementById("course").value = student.course;

    document.getElementById("addStudentBtn").textContent = "Update Student";

    document.getElementById("registeredToday").textContent = students.length;

}



/* ===========================
   ADD STUDENT
=========================== */

studentForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const student = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        homeAddress: document.getElementById("homeAddress").value,

        nextOfKin: {

            name: document.getElementById("kinName").value,

            phone: document.getElementById("kinPhone").value,

            relationship: document.getElementById("relationship").value

        },

        stateOfOrigin: document.getElementById("stateOfOrigin").value,

        localGovernment: document.getElementById("localGovernment").value,

        course: document.getElementById("course").value,

        createdAt: new Date().toISOString()

    };

    if (editingStudentId === null) {

        await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });

    } else {

        await fetch(`${API_URL}/${editingStudentId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });

        editingStudentId = null;

        document.getElementById("addStudentBtn").textContent = "Add Student";

    }

    studentForm.reset();

    getStudents();

});

/* ===========================
   DELETE STUDENT
=========================== */

async function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    await getStudents();
}

/* ===========================
   START APP
=========================== */

getStudents();