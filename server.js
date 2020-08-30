const express = require("express");
const cors = require("cors");
const app = express();
const data = require("./data.json");

app.use(cors());
app.use(express.json());

app.get("/clients", (req, res) => {
  res.json(data);
});

app.get("/clients/:id", (req, res) => {
  const { id } = req.params;
  const client = data.find((cli) => cli.id == id);

  if (!client) return res.status(204).json();

  res.json(client);
});

app.post("/clients", (req, res) => {
  const { name, email } = req.body;

  // save rotine

  res.json({ name, email });
});

app.put("/clients/:id", (req, res) => {
  const { id } = req.params;
  const client = data.find((cli) => cli.id == id);

  if (!client) return res.status(204).json();

  const { name } = req.body;

  client.name = name;

  res.json(client);
});

app.delete("/clients/:id", (req, res) => {
  const { id } = req.params;
  const clientsFiltered = data.filter((client) => client.id != id);

  res.json(clientsFiltered);
});

app.listen(3333, () => console.log("Server is running on port 3333"));
