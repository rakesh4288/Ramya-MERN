import e from 'express';
import { collectionName, databaseConnection } from './dbConfig.js';
import cors from 'cors';
import { ObjectId } from 'mongodb';

const app = e();
app.use(e.json()); // this is a middleware to connect with server
app.use(cors());

// POST Employee API
app.post("/create-new-employee", async(req, resp) => {
    const db = await databaseConnection();
    const newCollection = await db.collection(collectionName);
    const result = await newCollection.insertOne(req.body);
    if(result){
        resp.send({
            message: "New Employee Created Successfully",
            success: true,
            result
        });
    } else {
        resp.send({
            message: "Not Able to Create New Employee",
            success: false,
            result
        });
    }
});

// GET Employee API
app.get("/all-employee", async(req, resp) => {
    const db = await databaseConnection();
    const newCollection = await db.collection(collectionName);
    const empList = await newCollection.find().toArray();
    if(empList){
        resp.send({
            message: "All Employee Fetched Successfully",
            success: true,
            empList
        });
    } else {
        resp.send({
            message: "Not Able to Fetch All Employee",
            success: false,
            empList
        });
    }
});

// DELETE Employee API
app.delete("/delete-employee/:id", async(req, resp) => {
    const db = await databaseConnection();
    const id = req.params.id;
    const newCollection = await db.collection(collectionName);
    const empList = await newCollection.deleteOne({_id: new ObjectId(id)});
    if(empList){
        resp.send({
            message: "Employee Deleted Successfully",
            success: true,
            empList
        });
    } else {
        resp.send({
            message: "Not Able to Delete Employee",
            success: false,
            empList
        });
    }
});

// GET ONE Employee API
app.get("/one-employee/:id", async(req, resp) => {
    const db = await databaseConnection();
    const id = req.params.id;
    const newCollection = await db.collection(collectionName);
    const empList = await newCollection.findOne({_id: new ObjectId(id)});
    if(empList){
        resp.send({
            message: "One Employee Fetched Successfully",
            success: true,
            empList
        });
    } else {
        resp.send({
            message: "Not Able to Fetch One Employee",
            success: false,
            empList
        });
    }
});


// UPDATE Employee API
app.put("/update-employee", async(req, resp) => {
    const db = await databaseConnection();
    const newCollection = await db.collection(collectionName);
    const {id, ...fields} = req.body;
    const updateRecord = {$set: fields}
    const result = await newCollection.updateOne({_id: new ObjectId(id)}, updateRecord);
    if(result){
        resp.send({
            message: "One Employee Record Updated Successfully",
            success: true,
            result
        });
    } else {
        resp.send({
            message: "Not Able to Update One Employee Record",
            success: false,
            result
        });
    }
});


// app.get("/", (req, resp) => {
//     resp.send({
//         message: 'Basic API Done',
//         success: true
//     });
// });

app.listen(3200);