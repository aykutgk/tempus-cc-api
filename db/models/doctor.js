module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: { model: 'Users', key: 'id' },
        },
    }, {
            timestamps: false,
        }
    );

    Doctor.associate = (models) => {
        Doctor.belongsTo(models.User, { foreignKey: 'userId' });
    };
    return Doctor;
};