const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("https").globalAgent.options.rejectUnauthorized = false;

var app = express();
app.use(cors());
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	next();
// });

const db = require("./connection/db");
const routes = require("./routes/apiroutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, function() {
	console.log(`server listening on port ${PORT}`);
});
