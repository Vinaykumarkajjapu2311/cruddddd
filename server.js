const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// In-memory data (you can imagine this as a "fake database")
let users = [
  { id: 1, name: "Alice", email: "alice@gmail.com" },
  { id: 2, name: "Bob", email: "bob@gmail.com" },
];

// --- CREATE (POST) ---
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json({ message: "User added successfully", user: newUser });
});

// --- READ (GET all users) ---
app.get("/users", (req, res) => {
  res.json(users);
});

// --- READ (GET single user by id) ---
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// --- UPDATE (PATCH) ---
app.patch("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json({ message: "User updated successfully", user });
});

// --- DELETE ---
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  users.splice(userIndex, 1);
  res.json({ message: "User deleted successfully" });
});

// --- Run Server ---
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
