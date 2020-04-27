const express = require("express");
const app = express();
// app.use((req, res, next) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Mehtods", "GET,POST,PUT,DELETE");
//   res.set("Access-Control-Allow-Headers", "Content-Type");
//   res.set("Access-Control-Max-Age", 36400);
//   res.set("Access-Control-Allow-Credentials", true);
//   if (req.method === "options") {
//     res.end();
//     return;
//   }
//   next();
// });

app.get("/search", function (req, res) {
  res.json({
    code: 10000,
    data: [
      { name: "vue", url: "https://github.com/vuejs/vue" },
      { name: "vue-resource", url: "https://github.com/pagekit/vue-resource" },
    ],
  });
});
app.get("/search/users", function (req, res) {
  res.json({
    items: [
      {
        login: "xpxiaoruj",
        html_url: "https://github.com/xiaoruj",
        avatar_url:
          "https://avatars3.githubusercontent.com/u/59227425?s=400&amp;u=3fe07e4135e2b2e4177c3dbbc93390d16aad661d&amp;v=4",
      },
      {
        login: "ruanyf",
        html_url: "https://github.com/ruanyf",
        avatar_url: "https://avatars2.githubusercontent.com/u/905434?s=460&v=4",
      },
      {
        login: "yyx990803",
        html_url: "https://github.com/yyx990803",
        avatar_url:
          "https://avatars3.githubusercontent.com/u/499550?s=460&u=de41ec9325e8a92e281b96a1514a0fd1cd81ad4a&v=4",
      },
      {
        login: "xpxiaoruj",
        html_url: "https://github.com/xiaoruj",
        avatar_url:
          "https://avatars3.githubusercontent.com/u/59227425?s=400&amp;u=3fe07e4135e2b2e4177c3dbbc93390d16aad661d&amp;v=4",
      },
      {
        login: "ruanyf",
        html_url: "https://github.com/ruanyf",
        avatar_url: "https://avatars2.githubusercontent.com/u/905434?s=460&v=4",
      },
      {
        login: "yyx990803",
        html_url: "https://github.com/yyx990803",
        avatar_url:
          "https://avatars3.githubusercontent.com/u/499550?s=460&u=de41ec9325e8a92e281b96a1514a0fd1cd81ad4a&v=4",
      },
      {
        login: "xpxiaoruj",
        html_url: "https://github.com/xiaoruj",
        avatar_url:
          "https://avatars3.githubusercontent.com/u/59227425?s=400&amp;u=3fe07e4135e2b2e4177c3dbbc93390d16aad661d&amp;v=4",
      },
      {
        login: "ruanyf",
        html_url: "https://github.com/ruanyf",
        avatar_url: "https://avatars2.githubusercontent.com/u/905434?s=460&v=4",
      },
      {
        login: "yyx990803",
        html_url: "https://github.com/yyx990803",
        avatar_url:
          "https://avatars3.githubusercontent.com/u/499550?s=460&u=de41ec9325e8a92e281b96a1514a0fd1cd81ad4a&v=4",
      },
    ],
  });
});

app.listen(3000, "localhost", (err) => {
  if (!err) console.log("服务器启动成功了，请访问 http://localhost:3000");
  else console.log(err);
});
