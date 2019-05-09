module.exports = (sequelize, DataTypes) => {
    const DoctorPatient = sequelize.define('DoctorPatient', {
        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: { model: 'Users', key: 'id' },
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: { model: 'Users', key: 'id' },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {});

    DoctorPatient.associate = (models) => { };
    return DoctorPatient;
};