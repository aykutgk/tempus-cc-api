module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: { model: 'Users', key: 'id' },
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        postalCode: {
            type: DataTypes.STRING,
        },
    }, {
            timestamps: false,
        }
    );

    Patient.associate = (models) => {
        Patient.belongsTo(models.User, { foreignKey: 'userId' });
    };
    return Patient;
};