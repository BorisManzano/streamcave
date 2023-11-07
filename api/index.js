const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require("./routes/users");
const cors = require("cors");
const db = require("./config/db");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("Escuchando en el puerto 3001 🚀");
  });
});
