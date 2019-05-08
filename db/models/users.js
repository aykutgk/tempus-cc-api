module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1, // uniqueness. V4: is randomness
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.ENUM,
            values: ['doctor', 'patient'],
            defaultValue: 'patient',
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
    }, {});

    User.associate = (models) => {
        User.hasOne(models.Patient, { foreignKey: 'userId' });
        User.hasOne(models.Doctor, { foreignKey: 'userId' });
    };
    return User;
};