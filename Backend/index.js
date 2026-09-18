const express = require("express");
const cors = require("cors");
const { myMiddleware } = require("./middlewares/looged.middleware.js");
const { connectDB } = require("./config/db.config.js");
const { PORT } = require("./config/env.config.js");


const app = express();
app.use(cors());


app.use(express.json()); //middleware
app.use(cors());
app.use(myMiddleware);
/////////////////////
const { userRouter } = require("./routes/user.route.js");
const { notificationRouter } = require("./routes/notification.route.js");


const { ooprouter } = require("./routes/opportunities.route.js");

const { reviewRouter } = require("./routes/reviews.route.js");
const { reportRouter } = require("./routes/reports.route.js");
const { companyRouter } = require("./routes/companies.route.js");
const { skillRouter } = require("./routes/skills.route.js");
const { applicationRouter } = require("./routes/applications.route.js");

/////////////////////

//*--ROUTES--(path)//endpoints
app.use("/users", userRouter);
app.use("/opportunities", ooprouter);
app.use("/notifications", notificationRouter);
app.use("/reviews", reviewRouter);
app.use("/reports", reportRouter);
app.use("/companies", companyRouter);
app.use("/skills", skillRouter);
app.use("/applications", applicationRouter);
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
//*--CONNECT DB--
 connectDB();

app.listen(PORT, () => {
  //logic
  console.log(`my app listening on port 5000 successfully`);
});
