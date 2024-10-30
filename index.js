import express from "express";
import dbconnection from "./database/connection.js";
import bootstrab from "./src/bootstrab.js";
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())
bootstrab(app, express);
dbconnection;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
