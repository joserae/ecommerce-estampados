module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let columns = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        img: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        is_active: {
            type: dataTypes.STRING(11),
            allowNull: false,
        },
        created_date: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW,
            allowNull: false,
        },
        modified_date: {
            type: dataTypes.DATE,
        }
    };
    let config = {
        timestamps: false,
        underscore: true
    };

    const Product = sequelize.define(alias, columns, config);
    return Product;
}