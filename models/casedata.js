const Sequelize = require("sequelize");

module.exports = sequelize.define(
	"casedata",
	{
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		sno: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			unique: true
		},
		state: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		activecases: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		},
		foreigncases: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		},
		curedcases: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		},
		deadcases: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		}
	},
	{
		tableName: "casedata",
		timestamps: false
	}
);
