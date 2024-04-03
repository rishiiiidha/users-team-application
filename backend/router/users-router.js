const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("../models/user");
const paginatedUsers = require("../middlewares/paginatedUsers");
const router = express.Router();
router.get("/api/users", async (req, res) => {
  try {
    let users = await User.find({});
    if (req.query.name) {
      const searchTerm = req.query.name.toLowerCase();
      users = users.filter((user) =>
        user.first_name.toLowerCase().includes(searchTerm)
      );
    }
    if (req.query.domain) {
      const searchTerm = req.query.domain.toLowerCase();
      users = users.filter((user) =>
        user.domain.toLowerCase().includes(searchTerm)
      );
    }

    if (req.query.gender) {
      const searchTerm = req.query.gender.toLowerCase();
      users = users.filter((user) => user.gender.toLowerCase() === searchTerm);
    }
    if (
      Boolean(req.query.available) !== undefined &&
      req.query.available != "null"
    ) {
      if (req.query.available === "true") {
        users = users.filter(
          (user) => user.available === Boolean(req.query.available)
        );
      } else if (req.query.available === "false") {
        users = users.filter(
          (user) => user.available !== Boolean(req.query.available)
        );
      }
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || users.length - 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < users.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.users = users.slice(startIndex, endIndex);
    res.send(results);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).send("user not found");
    res.json(user);
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    const user = new User();
    user.id = users.length + 1;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.gender = req.body.gender;
    user.avatar = req.body.avatar;
    user.domain = req.body.domain;
    user.available = req.body.available;
    await user.save();
    res.json(user);
  } catch (e) {
    res.send(e.message);
  }
});
router.put("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).send("user not found");
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.gender = req.body.gender;
    user.avatar = req.body.avatar;
    user.domain = req.body.domain;
    user.available = req.body.available;
    await user.save();
    res.json(user);
  } catch (e) {
    res.send(e.message);
  }
});
router.delete("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(`User with ID ${id} has been successfully deleted`);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
