const express = require("express");
const { myMiddleware } = require("./middlewares/looged.middleware.js");
const { connectDB } = require("./config/db.config.js");
const { PORT } = require("./config/env.config.js");


const app = express();


app.use(express.json()); //middleware
app.use(myMiddleware);
/////////////////////
const { userRouter } = require("./routes/user.route.js");
// const { notificationRouter } = require("./routes/notification.route.js");

const { ooprouter } = require("./routes/opportunities.route.js");



/////////////////////

//*--ROUTES--(path)//endpoints
app.use("/users", userRouter);
app.use("/opportunities", ooprouter);
// app.use("/notification", notificationRouter);









//*--CONNECT DB--
connectDB();

app.listen(PORT, () => {
  //logic
  console.log(`my app listening on port 5000 successfully`);
})