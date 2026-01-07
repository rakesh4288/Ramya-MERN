// const { MongoClient }= require("mongodb");
import { MongoClient } from "mongodb";

const url ="mongodb+srv://rakeshshah4288_db_user:9nv0ehTMJDpu86C8@cluster0.7mbdsk9.mongodb.net/?appName=Cluster0";
const dbName = "node-project";
export const collectionName = "employeedb";
const client = new MongoClient(url);

export const databaseConnection = async () => {
    const connecting = await client.connect();
    return await connecting.db(dbName);
}