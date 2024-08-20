'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Surveries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'User'
      });
    }
  }

  Surveries.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
    },
    metadata: {
      type: DataTypes.JSON
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Surveries',
  });

  return Surveries;
};
