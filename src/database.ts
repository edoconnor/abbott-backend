import * as mongodb from "mongodb";
import { State } from "./state";

export const collections: {
  states?: mongodb.Collection<State>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("test");
  await applySchemaValidation(db);

  const statesCollection = db.collection<State>("states");
  collections.states = statesCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "capital", "postal", "standard", "plates"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        capital: {
          bsonType: "string",
          description: "'position' is required and is a string",
        },
        postal: {
          bsonType: "string",
          description: "'position' is required and is a string",
        },
        standard: {
          bsonType: "string",
          description: "'position' is required and is a string",
        },
        plates: {
          bsonType: "string",
          description: "'position' is required and is a string",
        },
      },
    },
  };

  await db
    .command({
      collMod: "states",
      validator: jsonSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("states", { validator: jsonSchema });
      }
    });
}
