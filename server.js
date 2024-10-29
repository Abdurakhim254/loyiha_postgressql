import express from "express";
import {  userrouter } from "./routes/index.js";


const app = express() 

app.use(express.json())
app.use("/api/v1",userrouter)


app.listen(3001, () => {
    console.log("Server running on port 3001")
})