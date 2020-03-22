const express = require("express");
const router = express.Router();
const services = require("../services/services");

router.get("/", (req, res) => {
	services.getStatesData().then(data => {
		res.status(200).json(data);
	});
});

router.get("/cured", (req, res) => {
	services.getCuredData().then(data => {
		res.status(200).json(data);
	});
});

router.get("/dead", (req, res) => {
	services.getDeathData().then(data => {
		res.status(200).json(data);
	});
});

router.get("/all", (req, res) => {
	services.AllData().then(data => {
		res.status(200).json(data);
	});
});

router.get("/sum", (req, res) => {
	services.sumData().then(data => {
		res.status(200).json(data);
	});
});

module.exports = router;
