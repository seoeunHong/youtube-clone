import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 3000;

const app = express();
const logger = morgan("dev"); // return middleware

// Use middleware globally; Used for whole urls
app.use(logger);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/video", videoRouter);

const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
