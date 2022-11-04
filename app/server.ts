import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { stateRouter } from "./state.routes";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

const PORT = process.env.PORT || 5200;

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use("/states", stateRouter);
    app.listen(process.env.PORT || 5200, () => {
      console.log("Server is on " + PORT);
    });
  })
  .catch((error) => console.error(error));
