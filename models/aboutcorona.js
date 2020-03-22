const Sequelize = require("sequelize");

module.exports = sequelize.define(
	"aboutcorona",
	{
		sno: {
			type: Sequelize.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING(11),
			allowNull: false,
			defaultValue: "aboutcorona",
			unique: true
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		updatedat: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
		}
	},
	{
		tableName: "aboutcorona",
		timestamps: false
	}
);
