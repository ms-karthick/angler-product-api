module.exports = (sequelize, Sequelize, DataTypes) => {
    const Product = sequelize.define(
      "product", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          unique: true
        },
        code: {
          type: DataTypes.STRING,
          unique: true
        },
        category: {
          type: DataTypes.STRING
        },
        image: {
          type: DataTypes.BLOB("long"),
        },
        description: {
          type: DataTypes.STRING
        }
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );
  
    return Product;
  };