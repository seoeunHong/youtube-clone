import "./db";
import "./models/Video";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 3000;

const app = express();
const logger = morgan("dev"); // return middleware

// Html helper -> express uses pug to return html
app.set("view engine", "pug");

// Since we run server with package.json the default dir is .../youtube_clone
// If so, .../youtube_clone/views does not exist
// -> change the dir to /.../youtube_clone/src/views
app.set("views", process.cwd() + "/src/views");

// Use middleware globally; Used for whole urls
app.use(logger);

app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
  console.log(`✅ Server Listening on port http://localhost:${PORT} 💻`);
app.listen(PORT, handleListening);
