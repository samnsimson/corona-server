const { Sequelize, Op } = require("sequelize");

// const sequelize = new Sequelize("coronaupdateindia", "root", "", {
// 	host: "localhost",
// 	dialect: "mysql"
// });

const sequelize = new Sequelize("harvea94_corona", "harvea94_sam", "W3lcome!", {
	host: "harvestsavepeople.in",
	dialect: "mysql"
});

sequelize.authenticate().then(function(err) {
	if (!err) console.log("database connected");
	else console.log("DB Connection err");
});

module.exports = sequelize;
global.sequelize = sequelize;
global.Op = Op;
