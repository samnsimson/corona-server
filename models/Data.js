const Sequelize = require("sequelize");

module.exports = sequelize.define(
	"coronadataindia",
	{
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		state: {
			type: Sequelize.STRING(255),
			allowNull: true,
			unique: true
		},
		indiancases: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		},
		foreigncases: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		},
		cured: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		},
		death: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		}
	},
	{
		tableName: "coronadataindia",
		timestamps: false
	}
);
