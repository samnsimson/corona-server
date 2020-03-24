const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");

require("https").globalAgent.options.rejectUnauthorized = false;

var app = express();
app.use(cors());

const db = require("./connection/db");
const routes = require("./routes/apiroutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", routes);

// ****CRON JOB**** //
const services = require("./services/CaseService");
cron.schedule("15 * * * *", function() {
	services.cronJob();
});
// ****CRON JOB**** //

const PORT = process.env.PORT || 3333;

app.listen(PORT, function() {
	console.log(`server listening on port ${PORT}`);
});
