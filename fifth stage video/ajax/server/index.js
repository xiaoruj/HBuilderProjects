const express = require("express");
const app = express();
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Mehtods", "GET,POST,PUT,DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", 36400);
  res.set("Access-Control-Allow-Credentials", true);
  if (req.method === "options") {
    res.end();
    return;
  }
  next();
});

app.get("/search", function (req, res) {
  res.json({
    code: 10000,
    data: [
      { name: "vue", url: "https://github.com/vuejs/vue" },
      { name: "vue-resource", url: "https://github.com/pagekit/vue-resource" },
    ],
  });
});

app.listen(3000, "localhost", (err) => {
  if (!err) console.log("服务器启动成功了，请访问 http://localhost:3000");
  else console.log(err);
});
