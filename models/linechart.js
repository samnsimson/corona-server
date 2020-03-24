const Sequelize = require("sequelize");

module.exports = sequelize.define(
	"linechart",
	{
		sno: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		day: {
			type: Sequelize.STRING(11),
			allowNull: false,
			unique: true
		},
		new: {
			type: Sequelize.INTEGER(11),
			allowNull: false
		},
		total: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			defaultValue: "0"
		},
		cured: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			defaultValue: "0"
		},
		dead: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			defaultValue: "0"
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
		}
	},
	{
		tableName: "linechart",
		timestamps: false
	}
);
