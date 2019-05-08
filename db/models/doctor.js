module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
        },
    }, {});

    Doctor.associate = (models) => {
        Doctor.belongsTo(models.User, { foreignKey: 'userId' });
    };
    return Doctor;
};