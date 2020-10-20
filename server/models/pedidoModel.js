module.exports = (sequelize, Sequelize) => sequelize.define("pedido", {
        data: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        status: {
            type: Sequelize.ENUM('Aberto', 'Entregue', 'Cancelado'),
            allowNull: false
        },
        valorTotal:{
            type: Sequelize.FLOAT,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);