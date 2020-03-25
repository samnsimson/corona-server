const CaseData = require("../models/casedata");
const AboutData = require("../models/aboutcorona");
const LineData = require("../models/linechart");
const moment = require("moment");

const getCaseData = async req => {
	const data = await CaseData.findAll({
		raw: true,
		attributes: [
			"state",
			[
				sequelize.literal(
					"COALESCE(activecases,0)+COALESCE(foreigncases,0)"
				),
				"activecases"
			],
			"curedcases",
			"deadcases",
			[
				sequelize.literal(
					"COALESCE(activecases,0)+COALESCE(foreigncases,0)+COALESCE(curedcases,0)+COALESCE(deadcases,0)"
				),
				"totalcases"
			]
		],
		order: [["state", "ASC"]]
	});

	let result = [];

	data.map(item => {
		let modifiedState = item.state.replace("Union Territory of ", "");
		item.state = modifiedState;
		result.push(item);
	});

	return result;
};

const sumData = async req => {
	const data = await CaseData.findAll({
		raw: true,
		attributes: [
			[sequelize.fn("sum", sequelize.col("activecases")), "Active Cases"],
			[
				sequelize.fn("sum", sequelize.col("foreigncases")),
				"Foreign Cases"
			],
			[sequelize.fn("sum", sequelize.col("curedcases")), "Cured Cases"],
			[sequelize.fn("sum", sequelize.col("deadcases")), "Dead Cases"]
		]
	});
	var output = Object.entries(data[0]).map(([key, value]) => ({
		key,
		value
	}));
	return output;
};

const getAboutCrona = async req => {
	const data = await AboutData.findAll({
		raw: true,
		attributes: ["description"]
	});
	return data;
};

const getLineChartData = async req => {
	const data = await LineData.findAll({
		raw: true
	});
	return data;
};

const cron_update_daily_count = async () => {
	let newdatatoday = [];
	let totalCount = 0;

	const data = await LineData.findAll({
		raw: true,
		limit: 2,
		attributes: ["day", "new", "total"],
		order: [["updatedAt", "DESC"]]
	});

	let todaysNew =
		data[0].total - data[1].total === 0
			? data[1].new
			: data[0].total - data[1].total;

	sumData().then(sumdata => {
		sumdata.map(data => {
			if (data.key == "Active Cases" || data.key == "Foreign Cases")
				totalCount += parseInt(data.value);
		});
		LineData.upsert({
			day: moment().format("MM-DD-YYYY"),
			new: todaysNew,
			total: totalCount
		}).then(res => {
			console.log(res);
		});
	});
};

module.exports = {
	getCaseData,
	sumData,
	getAboutCrona,
	getLineChartData,
	cron_update_daily_count
};
