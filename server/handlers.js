"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
require("dotenv").config(); //lightweight npm package that automatically loads environment variables.
const { MONGO_URI } = process.env; //  if the system has a PATH variable set, this will be made accessible to you through process.
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getNews = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option); // create a new client
  const { user_id } = req.query;
  // connect to the client
  try {
    await client.connect();
    const db = client.db("newsDb"); // connect to the database (database is provide as an argument to the funcation)

    if (user_id) {
      const allUserNews = await db
        .collection("news")
        .find({ posted_by: user_id })
        .sort({ created_date: -1 })
        .toArray();

      res.status(200).json({
        status: 200,
        data: allUserNews,
        message: "Successful",
      });
    } else {
      const allNews = await db
        .collection("news")
        .find()
        .sort({ created_date: -1 })
        .toArray();

      res.status(200).json({
        status: 200,
        data: allNews,
        message: "Successful",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: "No News",
    });
  }

  client.close(); // close the connection to the database server
};

const addNews = async (req, res) => {
  const { user_id } = req.query;
  const { title, description } = req.body;
  const newNews = {
    _id: uuidv4(),
    ...req.body,
    posted_by: user_id,
    created_date: new Date(),
    likes: [],
  };
  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db("newsDb");
    const news = await db.collection("news").insertOne(newNews);

    res.status(200).json({
      status: 200,
      message: "News successfully added",
      data: newNews,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "News not added",
    });

    client.close();
  }
};

const updateLikes = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { news_id, user_id, action } = req.query;

  await client.connect();
  const db = client.db("newsDb");
  const news = await db.collection("news").findOne({ _id: news_id });

  if (news) {
    if (action === "add") {
      const updateStatus = await db
        .collection("news")
        .updateOne({ _id: news_id }, { $push: { likes: user_id } });
    } else if (action === "remove") {
      const updateStatus = await db
        .collection("news")
        .updateOne({ _id: news_id }, { $pull: { likes: user_id } });
    } else {
      res.status(400).json({
        status: 400,
        message: "Action not specified",
      });
    }

    const updatedNews = await db.collection("news").findOne({ _id: news_id });

    res.status(200).json({
      status: 200,
      message: "Like updated",
      data: updatedNews,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: `News not Found`,
      data: news_id,
    });
  }
  client.close();
};

const deleteNews = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { news_id } = req.query;
  await client.connect();
  const db = client.db("newsDb");
  if (news_id) {
    const news = await db.collection("news").findOne({ _id: news_id });
    await db.collection("news").deleteOne({ _id: news_id });

    res.status(200).json({
      status: 200,
      message: "News Deleted",
    });
  } else {
    res.status(404).json({
      status: 404,
      message: `News not Found`,
      data: news_id,
    });
  }
  client.close();
};

const getUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { user_id } = req.query;
  await client.connect();
  const db = client.db("newsDb");
  const user = await db.collection("users").findOne({ user_id: user_id });
  if (user) {
    res.status(200).json({
      status: 200,
      message: "User Found",
      data: user,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: `User not Found`,
      data: user_id,
    });
  }
  client.close();
};

const updateProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { user_id } = req.query;
  const { username, given_name, family_name, address } = req.body;
  await client.connect();
  const db = client.db("newsDb");

  await db.collection("users").updateOne(
    { user_id: user_id },
    {
      $set: {
        ...req.body,
      },
    },
    { upsert: true }
  );

  const user = await db.collection("users").findOne({ user_id });
  res.status(200).json({
    status: 200,
    message: "Profile Updated",
    data: user,
  });

  client.close();
};

module.exports = {
  getNews,
  addNews,
  updateLikes,
  deleteNews,
  getUserById,
  updateProfile,
};
