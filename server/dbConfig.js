// const { MongoClient }= require("mongodb");
import { MongoClient } from "mongodb";


const dbName = "node-project";
export const collectionName = "employeedb";
const client = new MongoClient(url);

export const databaseConnection = async () => {
    const connecting = await client.connect();
    return await connecting.db(dbName);
}