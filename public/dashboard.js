const API_URL = "/students";

async function loadStudents() {
    const response = await fetch(API_URL);
    const students = await response.json();

    console.log(students);
}

loadStudents();