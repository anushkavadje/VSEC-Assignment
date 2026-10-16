const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(express.json());

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

let employeeCollection;


// CONNECT TO DATABASE
async function connectMongoDB() {

    try {

        await client.connect();

        const db = client.db("companyDB");

        employeeCollection = db.collection("employees");

        console.log("MongoDB connected");

        app.listen(3001, () => {
            console.log("MongoDB API running on port 3001");
        });

    } catch (error) {

        console.log("Database connection error");

    }
}


// CREATE EMPLOYEE
app.post("/employees", async (req, res) => {

    try {

        const employee = req.body;

        const result = await employeeCollection.insertOne(employee);

        res.status(201).json({
            message: "Employee added",
            id: result.insertedId
        });

    } catch (error) {

        res.status(500).json({
            message: "Unable to add employee"
        });

    }
});


// GET ALL EMPLOYEES
app.get("/employees", async (req, res) => {

    try {

        const employees = await employeeCollection
            .find()
            .toArray();

        res.json(employees);

    } catch (error) {

        res.status(500).json({
            message: "Unable to fetch employees"
        });

    }
});


// GET ONE EMPLOYEE
app.get("/employees/:id", async (req, res) => {

    try {

        const id = new ObjectId(req.params.id);

        const employee = await employeeCollection.findOne({
            _id: id
        });

        if (!employee) {

            return res.status(404).json({
                message: "Employee not found"
            });

        }

        res.json(employee);

    } catch (error) {

        res.status(400).json({
            message: "Invalid ID"
        });

    }
});


// UPDATE EMPLOYEE
app.put("/employees/:id", async (req, res) => {

    try {

        const id = new ObjectId(req.params.id);

        const result = await employeeCollection.updateOne(
            { _id: id },
            {
                $set: {
                    name: req.body.name,
                    age: req.body.age,
                    salary: req.body.salary
                }
            }
        );

        if (result.matchedCount === 0) {

            return res.status(404).json({
                message: "Employee not found"
            });

        }

        res.json({
            message: "Employee updated"
        });

    } catch (error) {

        res.status(400).json({
            message: "Invalid ID"
        });

    }
});


// DELETE EMPLOYEE
app.delete("/employees/:id", async (req, res) => {

    try {

        const id = new ObjectId(req.params.id);

        const result = await employeeCollection.deleteOne({
            _id: id
        });

        if (result.deletedCount === 0) {

            return res.status(404).json({
                message: "Employee not found"
            });

        }

        res.json({
            message: "Employee deleted"
        });

    } catch (error) {

        res.status(400).json({
            message: "Invalid ID"
        });

    }
});


connectMongoDB();
