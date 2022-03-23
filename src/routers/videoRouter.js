import express from "express";
import { see, edit, upload, deleteVideo } from "../controllers/videoController";
const videoRouter = express.Router();

// /upload should be above /:id -> so that express cannot think /upload is not
// /:id(parameter) that {id : upload}.
videoRouter.get("/upload", upload);
videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;
