const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("coronaupdateindia", "root", "", {
	host: "localhost",
	dialect: "mysql",
	prot: 3333,
	additional: {
		timestamps: false
	},
	tables: ["aboutcorona"]
});

auto.run(function(err) {
	if (err) throw err;
	console.log(auto.tables);
});
