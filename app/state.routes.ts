import express from "express";
import mongodb from "mongodb";
import { collections } from "./database";

export const stateRouter = express.Router();
stateRouter.use(express.json());

stateRouter.get("/", async (req, res) => {
  try {
    const states = await collections.states.find({}).toArray();
    res.status(200).send(states);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

stateRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const state = await collections.states.findOne(query);

    if (state) {
      res.status(200).send(state);
    } else {
      res.status(404).send(`Failed to find an state: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an state: ID ${req?.params?.id}`);
  }
});
