module.exports = (sequelize, Sequelize) => sequelize.define("produto_pedido", {
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        valorUnitario: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);