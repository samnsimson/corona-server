const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("harvea94_corona", "harvea94_sam", "W3lcome!", {
	host: "harvestsavepeople.in",
	dialect: "mysql",
	additional: {
		timestamps: false
	},
	tables: ["linechart"]
});

auto.run(function(err) {
	if (err) throw err;
	console.log(auto.tables);
});
