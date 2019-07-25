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
      res.status(500).json({ err });
    });
});

server.post("/api/users", (req, res) => {
  const bodyInfo = req.body;
  console.log(bodyInfo);

  db.insert(bodyInfo)
    .then(user => {
      res.status(303).json(user);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});
