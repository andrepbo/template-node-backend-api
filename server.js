const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");
const app = express();
const data = [];

app.use(cors());
app.use(express.json());

app.get("/clients", (req, res) => res.json(data));

app.get("/client/:id", (req, res) => {
  const { id } = req.params;
  const client = data.find((cli) => cli.id == id);

  if (!client) return res.status(204).json();

  res.json(client);
});

app.post("/client", (req, res) => {
  const { name } = req.body;
  const newClient = { id: v4(), name };

  data.push(newClient);

  return res.status(201).json(newClient);
});

app.put("/client/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newClient = { id, name };
  const clientIndex = data.findIndex((client) => client.id === id);

  data[clientIndex] = newClient;

  return res.json(newClient);
});

app.delete("/client/:id", (req, res) => {
  const { id } = req.params;
  const clientIndex = data.findIndex((client) => client.id === id);

  data.splice(clientIndex, 1);

  res.status(204).send();
});

app.listen(3333, () => console.log("Server is running on port 3333"));
