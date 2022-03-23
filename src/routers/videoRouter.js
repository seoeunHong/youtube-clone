import express from "express";
import { see, edit, upload, deleteVideo } from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/upload", upload); // <- Order does not matter now because of Regular expression
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
