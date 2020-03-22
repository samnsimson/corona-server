const CaseData = require("../models/casedata");
const AboutData = require("../models/aboutcorona");

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

module.exports = {
	getCaseData,
	sumData,
	getAboutCrona
};
