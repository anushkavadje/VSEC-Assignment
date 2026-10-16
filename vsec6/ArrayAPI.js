const express = require("express");

const app = express();

app.use(express.json());

let employees = [
    {
        id: 101,
        name: "Manali",
        age: 21,
        salary: 25000
    },
    {
        id: 102,
        name: "Rahul",
        age: 22,
        salary: 28000
    }
];


// GET ALL EMPLOYEES
app.get("/employees", (req, res) => {
    res.json(employees);
});


// ADD EMPLOYEE
app.post("/employees", (req, res) => {

    const employee = req.body;

    employees.push(employee);

    res.status(201).json({
        message: "Employee added",
        employee: employee
    });
});


// GET ONE EMPLOYEE
app.get("/employees/:id", (req, res) => {

    const id = Number(req.params.id);

    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    res.json(employee);
});


// UPDATE EMPLOYEE
app.put("/employees/:id", (req, res) => {

    const id = Number(req.params.id);

    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    employee.name = req.body.name;
    employee.age = req.body.age;
    employee.salary = req.body.salary;

    res.json({
        message: "Employee updated",
        employee: employee
    });
});


// DELETE EMPLOYEE
app.delete("/employees/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    employees.splice(index, 1);

    res.json({
        message: "Employee deleted"
    });
});


app.listen(3000, () => {
    console.log("Array API running on port 3000");
});
