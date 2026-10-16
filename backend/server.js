
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const fs = require("fs");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, "..", "members.json");

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("MONGODB_URI is missing in your .env file.");
    process.exit(1);
}

const client = new MongoClient(uri);
let membersCollection;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

function readLocalMembers() {
    try {
        return JSON.parse(fs.readFileSync(dataFile, "utf8"));
    } catch {
        return [];
    }
}

function cleanMember(member) {
    if (!member) return member;
    const { _id, ...data } = member;
    return data;
}

app.get("/api/test", (req, res) => {
    res.json({ message: "Gym backend is working!" });
});

app.get("/api/members", async (req, res) => {
    try {
        const members = await membersCollection.find({}).toArray();
        res.json(members.map(cleanMember));
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Could not load members." });
    }
});

app.post("/api/members", async (req, res) => {
    try {
        const { name, email, plan } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof plan !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !plan.trim()
        ) {
            return res.status(400).json({
                message: "Please fill all fields."
            });
        }

        const member = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            plan: plan.trim(),
            registeredAt: new Date().toISOString()
        };

        await membersCollection.insertOne({
            ...member,
            _id: member.id
        });

        res.status(201).json({
            message: "Member registered successfully!",
            member
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Could not register member." });
    }
});

app.put("/api/members/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email, plan } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof plan !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !plan.trim()
        ) {
            return res.status(400).json({
                message: "Please fill all fields."
            });
        }

        const result = await membersCollection.updateOne(
            { _id: id },
            {
                $set: {
                    name: name.trim(),
                    email: email.trim(),
                    plan: plan.trim()
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Member not found." });
        }

        const updatedMember = await membersCollection.findOne({ _id: id });

        res.json({
            message: "Member updated successfully!",
            member: cleanMember(updatedMember)
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Could not update member." });
    }
});

app.delete("/api/members/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await membersCollection.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Member not found." });
        }

        res.json({ message: "Member deleted successfully!" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Could not delete member." });
    }
});

async function startServer() {
    try {
        await client.connect();

        const db = client.db("fitzone");
        membersCollection = db.collection("members");

        // Import existing JSON members only if MongoDB is empty.
        const count = await membersCollection.countDocuments();
        const localMembers = readLocalMembers();

        if (count === 0 && localMembers.length > 0) {
            await membersCollection.insertMany(
                localMembers.map(member => ({
                    ...member,
                    _id: member.id
                }))
            );
            console.log("Existing members copied to MongoDB.");
        }

        app.listen(PORT, () => {
            console.log(`Gym server running at http://localhost:${PORT}`);
            console.log("MongoDB connected successfully!");
        });
    } catch (error) {
        console.error("Could not connect to MongoDB:", error.message);
        console.log("Check your .env connection string and Atlas settings.");
        process.exit(1);
    }
}

startServer();
