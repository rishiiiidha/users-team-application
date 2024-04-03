const express = require("express");
const router = express.Router();
const Team = require("../models/team");


router.post("/api/teams", async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/api/teams", async (req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/api/teams/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).send("Team not found");
    res.json(team);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.put("/api/teams/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!team) return res.status(404).send("Team not found");
    res.json(team);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/api/teams/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).send("Team not found");
    res.send(`Team with ID ${req.params.id} has been successfully deleted`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
