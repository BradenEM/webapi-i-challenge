// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

server.listen(4000, () => {
  console.log("Server is listening.");
});

server.get("/", (req, res) => {
  res.send("Hello from this page");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).end();
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => [
      res.status(500).json({ errorMessage: "The user could not be removed" })
    ]);
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const bodyInfo = req.body;

  db.update(id, bodyInfo)
    .then(updated => {
      if (updated) {
        res.status(200).json({ updated });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    });
});
