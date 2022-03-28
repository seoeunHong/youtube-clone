import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params;
  res.render("watch", { pageTitle: `Watching` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  res.render("edit", { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Uplaod Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title: title,
      description: description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    res.redirect("/");
  } catch (error) {
    res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
