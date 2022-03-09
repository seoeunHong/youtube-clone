import express from "express";
import morgan from "morgan";

const PORT = 3000;

const app = express();
const logger = morgan("dev"); // return middleware

// Use middleware globally; Used for whole urls
app.use(logger);

app.get("/", (req, res) => {
  return res.send("This is my / page");
});

const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
