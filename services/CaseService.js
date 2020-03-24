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

const cronJob = () => {
	sumData().then(res => {
		let sumArray = [];
		let newCaseToday = null;
		let yesterday = moment()
			.subtract(1, "days")
			.format("MM-DD-YYYY");
		res.map(item => {
			if (item.key == "Active Cases" || item.key == "Foreign Cases") {
				sumArray.push(item.value);
			}
		});
		let sum = sumArray.reduce((a, b) => {
			return parseInt(a) + parseInt(b);
		});
		let obj = {
			day: moment().format("MM-DD-YYYY"),
			total: sum
		};
		LineData.findOne({
			raw: true,
			where: {
				day: yesterday
			}
		})
			.then(function(entry) {
				newCaseToday = parseInt(sum) - parseInt(entry.total);
				if (newCaseToday == 0) {
					newCaseToday = entry.new;
				}
			})
			.then(function() {
				LineData.upsert({
					day: obj.day,
					new: newCaseToday,
					total: obj.total
				}).then(res => {
					console.log(moment().format());
				});
			});
	});
};

module.exports = {
	getCaseData,
	sumData,
	getAboutCrona,
	getLineChartData,
	cronJob
};
