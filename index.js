const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
//SETTINGS
app.set("port", process.env.PORT || 4000);
//MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: true }));
//ROUTES
app.use(require("./routes/posts"));
//INITIALIZATIONS
db.sequelize.sync().then((req) => {
  app.listen(app.get("port"), () => {
    console.log(`Server on port`, app.get("port"));
  });
});

