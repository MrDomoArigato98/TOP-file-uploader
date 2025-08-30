import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import passport from "passport";
import path from "node:path";
import { mountRoutes } from "./routes/routes.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
//Static assets
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

mountRoutes(app);

app.use((req, res, next) => {
  res.status(404);
  res.json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status);
  res.json({ error: err.message || "Server Error" });
});

export default app;