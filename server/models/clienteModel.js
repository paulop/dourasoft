module.exports = (sequelize, Sequelize) => sequelize.define("cliente", {
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        endereco: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefone: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
);