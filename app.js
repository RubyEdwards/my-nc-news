const express = require("express");
const { getEndpoints } = require("./controllers/api.controller");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticle,
  getArticleComments,
  postComment,
  patchArticle,
  deleteComment,
} = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");
const app = express();
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticle);
app.get("/api/articles/:article_id/comments", getArticleComments);

app.get("/api/users", getUsers);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "not found" });
});
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
