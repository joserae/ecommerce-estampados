module.exports = (sequelize, dataTypes) => {
    let alias = "Productcharacteristics";
    let columns = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },
        product_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        category_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        brand_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        genre_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        size_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        available_quantity: {
            type: dataTypes.INTEGER(11),
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

    const Productcharacteristics = sequelize.define(alias, columns, config);
    return Productcharacteristics;
}