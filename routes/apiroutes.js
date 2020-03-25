const express = require("express");
const router = express.Router();
const services = require("../services/CaseService");
const map = require("../json/states.json");

router.get("/", (req, res) => {
	services.getCaseData().then(data => {
		res.status(200).json(data);
	});
});

router.get("/sum", (req, res) => {
	services.sumData().then(data => {
		res.status(200).json(data);
	});
});

router.get("/intro", (req, res) => {
	services.getAboutCrona().then(data => {
		res.status(200).json(data);
	});
});

router.get("/linechart", (req, res) => {
	services.getLineChartData().then(data => {
		res.status(200).json(data);
	});
});

router.get("/new", (req, res) => {
	services.getNewCaseData().then(data => {
		res.status(200).json(data);
	});
});

module.exports = router;
