const Data = require("../models/Data");

const errorHandler = err => {
	console.log(err);
};

const getStatesData = async req => {
	const data = await Data.findAll({
		raw: true,
		attributes: [
			"state",
			"indiancases",
			"foreigncases",
			"cured",
			"death",
			[
				sequelize.literal(
					"(COALESCE(indiancases,0)+COALESCE(foreigncases,0))-COALESCE(cured,0)"
				),
				"totalcases"
			]
		],
		order: [["state", "ASC"]]
	});
	return data;
};

const getCuredData = async req => {
	const data = await Data.findAll({
		raw: true,
		attributes: ["state", "cured"],
		order: [["state", "ASC"]]
	});
	return data;
};

const getDeathData = async req => {
	const data = await Data.findAll({
		raw: true,
		attributes: ["state", "death"],
		order: [["state", "ASC"]]
	});
	return data;
};

const AllData = async req => {
	const data = await Data.findAll({
		raw: true,
		attributes: [
			"state",
			[
				sequelize.fn("sum", sequelize.col("indiancases")),
				"totalindiancases"
			],
			[
				sequelize.fn("sum", sequelize.col("foreigncases")),
				"totalforeigncases"
			],
			[sequelize.fn("sum", sequelize.col("cured")), "totalcuredcases"],
			[sequelize.fn("sum", sequelize.col("death")), "totaldeadcases"]
		],
		group: ["state"],
		order: [["state", "ASC"]]
	});
	return data;
};

const sumData = async req => {
	const data = await Data.findAll({
		raw: true,
		attributes: [
			[
				sequelize.fn("sum", sequelize.col("indiancases")),
				"totalindiancases"
			],
			[sequelize.fn("sum", sequelize.col("cured")), "totalcuredcases"],
			[sequelize.fn("sum", sequelize.col("death")), "totaldeadcases"]
		],
		order: [["state", "ASC"]]
	});
	return data;
};

module.exports = {
	getStatesData,
	getCuredData,
	getDeathData,
	AllData,
	sumData
};
