import express from "express";

const PORT = 3000;

const app = express();

const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT}`);
app.listen(3000, handleListening);
