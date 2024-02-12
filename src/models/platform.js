'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Platform extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Platform.init({
    platform_name: {
      type: DataTypes.STRING,
      primaryKey: true // Specify platform_name as the primary key
    }
  }, {
    sequelize,
    modelName: 'Platform',
  });

  return Platform;
};