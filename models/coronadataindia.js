/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		"coronadataindia",
		{
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			sno: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
				unique: true
			},
			state: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			indiancases: {
				type: DataTypes.INTEGER(11),
				allowNull: true
			},
			foreigncases: {
				type: DataTypes.INTEGER(11),
				allowNull: true
			},
			cured: {
				type: DataTypes.INTEGER(11),
				allowNull: true
			},
			death: {
				type: DataTypes.INTEGER(11),
				allowNull: true
			}
		},
		{
			tableName: "coronadataindia",
			timestamps: false
		}
	);
};
