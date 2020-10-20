module.exports = (sequelize, Sequelize) => sequelize.define("produto", {
        codigo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descricao: {
            type: Sequelize.STRING
        },
        preco: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);