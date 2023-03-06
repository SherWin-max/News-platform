const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const {
  getNews,
  addNews,
  updateLikes,
  deleteNews,
  getUserById,
  updateProfile,
} = require("./handlers");

const port = 8000;

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  // Nothing to modify above this line
  // ---------------------------------

  .get("/api/get-user", getUserById)
  .get("/api/get-news", getNews)

  .post("/api/add-news", addNews)
  //   .post("/api/create-user", createUser)

  .put("/api/update-likes", updateLikes)
  .put("/api/update-profile", updateProfile)

  .delete("/api/delete-news", deleteNews)

  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
