const express = require('express');

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// yoo welcome page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// In-memory database
 let students = [
    {
        id: 1,
        name: "Mobolaji Emmanuel",
        email: "mobolajioyeleye07@gmail.com",
        phone: "07040375621",
        homeAddress: "2, Engr Odesola str, Alagbado, Lagos",
        nextOfKin: {
            name: "Samuel Oyeleye",
            phone: "08037049305",
            relationship: "Father"
        },
        stateOfOrigin: "Ogun",
        localGovernment: "Alimosho",
        course: "Computer Science",
    },
    {
        id: 2,
        name: "Elizabeth Johnson",
        email: "eliza@gmail.com",
        phone: "08012345678",
        homeAddress: "12, Johnson str, Ikeja, Lagos",
        nextOfKin: {
            name: "francis Johnson",
            phone: "08098765432",
            relationship: "Father"
        },
        stateOfOrigin: "Lagos",
        localGovernment: "Alimosho",
        course: "Electrical Engineering",
    }
];


// Routes
app.post('/students', (req, res) => {
    const {
    name, 
    email, 
    phone, 
    homeAddress,
    nextOfKin, 
    stateOfOrigin,
    localGovernment,
    course,
    createdAt
} = req.body;

    const newStudent = {
        id: students.length + 1,
        name,
        email, 
        phone,
        homeAddress,
        nextOfKin,
        stateOfOrigin,
        localGovernment,
        course,
        createdAt
    }

    students.push(newStudent);
    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// Get all students
app.get('/students', (req, res) => {
    res.status(200).json(students);
});


// Get a student by ID
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
});

// Update a student by ID
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const {
        name, 
        email, 
        phone, 
        homeAddress,
        nextOfKin, 
        stateOfOrigin,
        localGovernment,
        course } = req.body;

    student.name = name || student.name;
    student.email = email || student.email;
    student.phone = phone || student.phone;
    student.homeAddress = homeAddress || student.homeAddress;
    student.nextOfKin = nextOfKin || student.nextOfKin;
    student.stateOfOrigin = stateOfOrigin || student.stateOfOrigin;
    student.localGovernment = localGovernment || student.localGovernment;
    student.course = course || student.course;

    res.json({
        message: "Student updated successfully",
        student
    });
})

// Delete a student by ID
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);

    res.json({ message: "Student deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
